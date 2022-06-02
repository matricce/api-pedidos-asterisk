import { IsNotEmpty } from 'class-validator';

export class getOrderByIdDto {
  @IsNotEmpty()
  id: string;
}
