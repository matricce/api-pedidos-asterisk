import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatusEntity } from './order-status.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Generated()
  @Column({ unique: true, select: true })
  number: number;

  @ManyToOne(() => OrderStatusEntity, (statusId: OrderStatusEntity) => statusId.orders)
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  statusId: OrderStatusEntity;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @CreateDateColumn({
    nullable: true,
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
