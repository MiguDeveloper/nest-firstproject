import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port);

  logger.log(`Servidor corriendo en: ${await app.getUrl()}`);
}
bootstrap();
