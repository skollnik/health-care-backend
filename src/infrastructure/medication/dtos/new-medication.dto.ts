import { IsNotEmpty } from 'class-validator';

export class NewMedicationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
