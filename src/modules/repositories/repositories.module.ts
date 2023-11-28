import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RepositoriesController } from './repositories.controller';

import { RepositoriesService } from './repositories.service';

@Module({
  imports: [HttpModule],
  controllers: [RepositoriesController],
  providers: [RepositoriesService],
  exports: [RepositoriesService],
})
export class RepositoriesModule { }
