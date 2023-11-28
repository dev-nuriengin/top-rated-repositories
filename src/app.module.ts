import { Module } from '@nestjs/common';

import { RepositoriesModule } from './modules/repositories/repositories.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [RepositoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
