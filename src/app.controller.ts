import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthDto } from './commons/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): HealthDto {
    return this.appService.health();
  }
}