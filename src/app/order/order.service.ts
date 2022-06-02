import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, lastValueFrom, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { updateOrderDto } from './dtos/update-order.dto';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  findAll(): Observable<OrderEntity[]> {
    return from(
      this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.statusId', 'status')
        .orderBy('order.id', 'ASC')
        .getMany(),
    );
  }

  findByID(id: string): Observable<OrderEntity> {
    id = id.trim();
    if (!id || !!id.match(/\D/)) {
      throw new NotFoundException();
    }

    return from(
      this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.statusId', 'status')
        .orderBy('order.id', 'ASC')
        .where('order.id = :id', { id })
        .getOne(),
    ).pipe(
      map(data => {
        if (!data) {
          throw new NotFoundException();
        }
        return data;
      }),
    );
  }

  async createOrder(body: OrderEntity): Promise<OrderEntity> {
    return await this.orderRepository.save(body);
  }

  async updateOrder(id: string, body: updateOrderDto): Promise<OrderEntity> {
    id = id.trim();
    if (!id || !!id.match(/\D/)) {
      throw new NotFoundException();
    }
    const dataToUpdate = await lastValueFrom(this.findByID(id));
    if (!dataToUpdate) {
      throw new NotFoundException();
    }
    if (body.name) {
      dataToUpdate.name = body.name;
    }
    if (body.statusId) {
      dataToUpdate.statusId.id = body.statusId;
    }
    dataToUpdate.updatedAt = new Date();
    await this.orderRepository.save(dataToUpdate);
    return await lastValueFrom(this.findByID(id));
  }
  async deleteOrder(id: string): Promise<OrderEntity> {
    id = id.trim();
    if (!id || !!id.match(/\D/)) {
      throw new NotFoundException();
    }
    const dataToDelete = await lastValueFrom(this.findByID(id));
    if (!dataToDelete) {
      throw new NotFoundException();
    }
    return await this.orderRepository.remove(dataToDelete);
  }
}
