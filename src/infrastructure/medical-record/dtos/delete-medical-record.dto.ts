import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteMedicalRecordDto {
  @IsNotEmpty()
  @IsNumber()
  medicalRecordId: number;
}
