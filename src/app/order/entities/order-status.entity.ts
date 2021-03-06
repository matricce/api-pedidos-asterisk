import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_status')
export class OrderStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.statusId)
  orders: OrderEntity[];
}
