import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createOrderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsIn([1, 2, 3, 4, 5, 6])
  statusId: number;
}
