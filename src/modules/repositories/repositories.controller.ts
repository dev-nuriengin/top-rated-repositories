import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';

import { Response } from 'express';

import { RepositoriesService } from './repositories.service';

@Controller('repositories')
export class RepositoriesController {
  constructor(private repositoriesService: RepositoriesService) { }

  // INFO: This API can be used within monitoring tools to check the health of the module
  @Get()
  async getModuleHealth(@Res() res: Response) {
    const healthCheck = await this.repositoriesService.getModuleHealth();
    return res.status(HttpStatus.OK).send(healthCheck);
  }

  // INFO: We keep the API naming in a general context while today we request for Github but tomorrow we may request for Gitlab or Bitbucket.
  @Get('top-rated')
  getTopRatedRepositories(
    @Query('date') date: string,
    @Query('language') language: string,
    @Query('limit') limit: number,
  ) {
    return this.repositoriesService.getTopRatedRepositories(
      date,
      language,
      limit,
    );
  }
}
