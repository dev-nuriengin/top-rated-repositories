import { Injectable } from '@nestjs/common';

import { HealthDto } from './commons/dto';

@Injectable()
export class AppService {
  async getHealth(): Promise<HealthDto> {
    return {
      status: 'success',
      timestamp: new Date().getTime(),
      message: 'Welcome to Top Repositories API!',
    };
  }
}
