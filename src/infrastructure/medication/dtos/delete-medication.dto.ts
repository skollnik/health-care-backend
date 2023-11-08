import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteMedicationDto {
  @IsNotEmpty()
  @IsNumber()
  medicationId: number;
}
