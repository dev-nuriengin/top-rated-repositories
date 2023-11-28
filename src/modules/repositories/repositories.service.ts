import { Injectable } from '@nestjs/common';
import { HealthDto } from 'src/commons/dto';

@Injectable()
export class RepositoriesService {
  async getModuleHealth(): Promise<HealthDto> {
    return {
      status: 'success',
      timestamp: new Date().getTime(),
      message: 'Repositories module is working',
    };
  }
}
