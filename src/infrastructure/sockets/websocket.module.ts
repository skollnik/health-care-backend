import { Module } from '@nestjs/common';
import NotificationGateway from './notification.gateway';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [NotificationGateway],
  imports: [ConfigModule, AuthModule],
})
export class WebSocketModule {}
