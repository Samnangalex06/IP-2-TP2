import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipt.controller';
import { ReceiptsService } from './receipt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './receipt.entity';
import { NotificationsModule } from '../notifications/notifications/notifications.module';
@Module({
  imports: [TypeOrmModule.forFeature([Receipt]), NotificationsModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class ReceiptsModule {}
