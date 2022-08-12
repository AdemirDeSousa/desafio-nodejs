import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Length } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Length(14)
  @ApiProperty()
  cnpj: string;

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
