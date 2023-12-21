import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIOAdapter } from './infrastructure/sockets/socket-io.adapter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({ exposedHeaders: ['Content-Disposition'] });
  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));
  await app.listen(8080);
}
bootstrap();
