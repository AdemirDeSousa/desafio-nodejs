import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateVehicleDto {
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
  @IsIn(['carro', 'moto'])
  @ApiProperty()
  type: string;
}
