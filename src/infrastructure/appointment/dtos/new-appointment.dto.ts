import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AppointmentStatus } from 'src/domain/appointment/appointment-status.enum';

export class NewAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  doctorId: number;

  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: AppointmentStatus;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}
