import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { plusController } from './plus.controller';
import { plusService } from './plus.service';

@Module({
  imports: [],
  controllers: [AppController,plusController],
  providers: [AppService,plusService],
})
export class AppModule {}
