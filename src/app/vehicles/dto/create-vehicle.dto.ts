import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, Length } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @ApiProperty()
  brand: string;

  @IsNotEmpty()
  @ApiProperty()
  model: string;

  @IsNotEmpty()
  @ApiProperty()
  color: string;

  @IsNotEmpty()
  @Length(8)
  @ApiProperty()
  licensePlate: string;

  @IsNotEmpty()
  @IsIn(['carro', 'moto'])
  @ApiProperty()
  type: string;
}
