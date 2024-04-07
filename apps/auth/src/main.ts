import { BaseExceptionFilter, NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(CookieParser())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  const config = app.get(ConfigService)
  await app.listen(config.get("PORT_AUTH"));
}
bootstrap();
