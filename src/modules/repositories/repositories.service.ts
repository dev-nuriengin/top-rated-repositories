import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import * as csv from 'csvtojson';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom, map } from 'rxjs';

import { HealthDto } from 'src/commons/dto';

@Injectable()
export class RepositoriesService {
  constructor(private httpService: HttpService) { }

  async getModuleHealth(): Promise<HealthDto> {
    return {
      status: 'success',
      timestamp: new Date().getTime(),
      message: 'Repositories module is working',
    };
  }

  async getTopRatedRepositories(date: string, language: string, limit: number) {
    // TODO: Get this from config settings
    const url = `https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data/github-ranking-${date}.csv`;

    const config: AxiosRequestConfig = {
      baseURL: url,
      method: 'GET',
      params: {
        date,
        language,
        limit,
      },
    };

    // INFO: Keep each step into specific variables for now;
    // Thus, in future we may make it easier to debug. add logs/metrics, and to test
    // Also, we can split each step into a separate function to provide more business logic
    const http = this.httpService.request(config);

    const response = await firstValueFrom(http.pipe(map((res) => res.data)));

    // TODO: Filter "languages" and "limit" before converting to JSON
    const repositories = await csv().fromString(response);

    return repositories;
  }
}
