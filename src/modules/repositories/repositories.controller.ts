import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

import { Response } from 'express';

import { RepositoriesService } from './repositories.service';

@Controller('repositories')
export class RepositoriesController {
  constructor(private repositoriesService: RepositoriesService) {}

  @Get()
  async getModuleHealth(@Res() res: Response) {
    const healthCheck = await this.repositoriesService.getModuleHealth();
    return res.status(HttpStatus.OK).send(healthCheck);
  }
}
