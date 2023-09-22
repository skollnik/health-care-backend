import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { DoctorSpecialty } from 'src/domain/specialization/doctor-specialty.enum';

export class RegisterDoctorDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  specialty: DoctorSpecialty;
}
