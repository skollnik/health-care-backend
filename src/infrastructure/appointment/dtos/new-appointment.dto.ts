import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AppointmentStatus } from 'src/domain/appointment/appointment-status.enum';

export class NewAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  doctorId: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}
