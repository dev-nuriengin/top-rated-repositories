import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

import { Response } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // INFO: This API can be used within monitoring tools to check the health of the application
  @Get()
  async getHealth(@Res() res: Response) {
    const healthCheck = await this.appService.getHealth();
    return res.status(HttpStatus.OK).send(healthCheck);
  }
}
