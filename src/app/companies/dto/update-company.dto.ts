import { IsInt, IsNotEmpty, Length } from 'class-validator';

export class UpdateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsInt()
  qtdVacanciesMotorcycles: number;

  @IsNotEmpty()
  @IsInt()
  qtdVacanciesCars: number;
}
