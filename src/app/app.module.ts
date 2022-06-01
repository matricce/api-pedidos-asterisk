import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order/order.module';

@Module({
  controllers: [],
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(), Order],
  providers: [],
})
export class AppModule {}
