import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderEntity } from './entities/order.entity';
import { createOrderDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';
import { getOrderByIdDto } from './dtos/get-order.dto';
import { updateOrderDto } from './dtos/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get('all')
  async getAllOrders() {
    return this.orderService.findAll();
  }
  @Get('/id/:id')
  async getOrders(@Param() params: getOrderByIdDto) {
    return this.orderService.findByID(params.id);
  }
  @Post()
  async createOrder(@Body() body: createOrderDto) {
    return this.orderService.createOrder(body as unknown as OrderEntity);
  }
  @Put('/id/:id')
  async updateOrder(@Param() params: getOrderByIdDto, @Body() body: updateOrderDto) {
    return this.orderService.updateOrder(params.id, body);
  }
  @Delete('/id/:id')
  async deleteOrder(@Param() params: getOrderByIdDto) {
    return this.orderService.deleteOrder(params.id);
  }
}
