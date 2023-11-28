import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import * as csv from 'csvtojson';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom, map } from 'rxjs';

import { HealthDto } from 'src/commons/dto';

@Injectable()
export class RepositoriesService {
  constructor(private httpService: HttpService) {}

  async getModuleHealth(): Promise<HealthDto> {
    return {
      status: 'success',
      timestamp: new Date().getTime(),
      message: 'Repositories module is working',
    };
  }

  async getTopRatedRepositories(date: string, language: string, limit: number) {
    const url = this.generateRequestUrl(date);

    const config = this.generateRequestConfig(url, { date, language, limit });

    try {
      // TODO: Provide caching mechanism to avoid calling this API multiple times or response same filtered data
      const http = this.httpService.request(config);

      const response = await firstValueFrom(http.pipe(map((res) => res.data)));

      const repositories = await this.parseCsv(response);

      if (!repositories) {
        throw new NotFoundException('Repositories not found');
      }

      const filteredRepositories = await this.filterAndLimitRepositories(
        repositories,
        language,
        limit,
      );

      return {
        status: 'success',
        result: filteredRepositories,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch repositories');
    }
  }

  // TODO: Get URL from config settings
  private generateRequestUrl(date: string): string {
    return `https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data/github-ranking-${date}.csv`;
  }

  // INFO: Here we generate the config for axios but later on we can use a custom http service
  private generateRequestConfig(url: string, params: any): AxiosRequestConfig {
    return { baseURL: url, method: 'GET', params };
  }

  // INFO: Here we encapsulate CSV usage, so later we can easily replace it with another library
  private async parseCsv(csvData: string): Promise<any[]> {
    return csv().fromString(csvData);
  }

  // INFO: Here we can run more complex logic to filter and limit the data, and provide more specific tests
  private async filterAndLimitRepositories(
    repositories: any[],
    language: string,
    limit: number,
  ): Promise<any[]> {
    if (language) {
      repositories = repositories.filter((repo) => repo.language === language);
    }

    if (limit && limit > 0) {
      repositories = repositories.slice(0, limit);
    }

    return repositories;
  }
}
