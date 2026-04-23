import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptsModule } from './receipt/receipt.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'sam12345',
      database: process.env.DB_NAME || 'receipts_db',
      autoLoadEntities: true,
      synchronize: true,
    }),

    ReceiptsModule,

    OrdersModule,

    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
