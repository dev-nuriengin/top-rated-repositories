import { Injectable } from '@nestjs/common';
import { HealthDto } from './commons/dto';

@Injectable()
export class AppService {
  health(): HealthDto {
    return {
      status: 200,
      timestamp: new Date().toISOString(),
      message: 'Welcome to Top Repositories API!',
    };
  }
}