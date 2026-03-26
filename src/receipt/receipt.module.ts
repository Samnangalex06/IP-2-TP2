import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipt.controller';
import { ReceiptsService } from './receipt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './receipt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt])],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class ReceiptsModule {}
