import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateVehicleDto {
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  @IsIn(['carro', 'moto'])
  type: string;
}
