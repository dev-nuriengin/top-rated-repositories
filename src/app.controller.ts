import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { HealthDto } from './commons/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // INFO: This API can be used within monitoring tools to check the health of the application
  @Get()
  getHealth(): HealthDto {
    return this.appService.getHealth();
  }
}
