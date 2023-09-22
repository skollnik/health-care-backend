import { Type } from '@nestjs/class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Medication } from 'src/domain/medication/model/medication';

export class NewMedicalRecordDto {
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @IsNotEmpty()
  @IsNumber()
  appointmentId: number;

  @IsNotEmpty()
  diagnosis: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Medication)
  medications?: Medication[];
}
