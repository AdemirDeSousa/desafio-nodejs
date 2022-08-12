import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Length } from 'class-validator';

export class UpdateCompanyDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  qtdVacanciesMotorcycles: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  qtdVacanciesCars: number;
}
