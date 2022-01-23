import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as config from 'config';
import { setupSwagger } from './docs-swagger';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const grpcConfig = await config.get('grpc');

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'glovory',
      protoPath: ['address.proto', 'auth.proto'],
      loader: {
        includeDirs: [join(__dirname, 'protos')],
      },
      url: `${grpcConfig.host}:${grpcConfig.port}`,
    },
  });

  await app.startAllMicroservices();
  logger.log(`GRPC listening on ${grpcConfig.host}:${grpcConfig.port}`);

  await app.setGlobalPrefix('/api/v1');

  const serverConfig = await config.get('server');

  setupSwagger(app);

  const host = process.env.SERVER_HOST || serverConfig.host;
  const port = process.env.SERVER_PORT || serverConfig.port;

  await app.listen(port, host);
  logger.log(`Application listening on ${host} port ${port}`);
}
bootstrap();
