import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const serverConfig = await config.get('server');

  const host = process.env.SERVER_HOST || serverConfig.host;
  const port = process.env.SERVER_PORT || serverConfig.port;

  await app.listen(port, host);
  logger.log(`Application listening on ${host} port ${port}`);
}
bootstrap();
