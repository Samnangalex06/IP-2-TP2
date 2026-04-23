import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsNumber()
  price: number;
}
