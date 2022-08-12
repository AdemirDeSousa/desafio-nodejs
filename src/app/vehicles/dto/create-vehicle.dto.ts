import { IsIn, IsNotEmpty, Length } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  @Length(8)
  licensePlate: string;

  @IsNotEmpty()
  @IsIn(['carro', 'moto'])
  type: string;
}
