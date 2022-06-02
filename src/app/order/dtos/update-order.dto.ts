import { IsIn, IsNumber, IsString } from 'class-validator';

export class updateOrderDto {
  @IsString()
  name?: string;

  @IsNumber()
  @IsIn([1, 2, 3, 4, 5, 6])
  statusId?: number;
}
