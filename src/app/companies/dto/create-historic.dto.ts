import { IsIn, IsNotEmpty, Length } from 'class-validator';

export class CreateHistoricDto {
  @IsNotEmpty()
  @Length(8)
  licensePlate: string;
}
