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
    // INFO: Keep each step into specific variables for now;
    // Thus, in future we may make it easier to debug. add logs/metrics, and to test
    // Also, we can split each step into a separate function to provide more business logic

    // TODO: Get this from config settings
    const url = `https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data/github-ranking-${date}.csv`;

    // TODO: Provide caching mechanism to avoid calling this API multiple times or response same filtered data
    const config: AxiosRequestConfig = {
      baseURL: url,
      method: 'GET',
      params: {
        date,
        language,
        limit,
      },
    };

    try {
      const http = this.httpService.request(config);

      const response = await firstValueFrom(http.pipe(map((res) => res.data)));

      // TODO: Split this into a separate functions
      let repositories = await csv().fromString(response);

      if (!repositories) {
        throw new NotFoundException('Repositories not found');
      }

      if (language) {
        repositories = repositories.filter(
          (repo) => repo.language === language,
        );
      }

      if (limit && limit > 0) {
        repositories = repositories.slice(0, limit);
      }

      return {
        status: 'success',
        result: repositories,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch repositories');
    }
  }
}
