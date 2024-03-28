import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging.interceptor';
import { GenderGuard } from 'gender.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new GenderGuard());
  app.useGlobalInterceptors(new LoggingInterceptor);
  await app.listen(3000);
}
bootstrap();
