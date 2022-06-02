import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  exports: [OrderService],
  providers: [OrderService],
})
export class Order {}
