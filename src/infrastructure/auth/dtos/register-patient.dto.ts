import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Gender } from 'src/domain/specialization/gender.enum';

export class RegisterPatientDto {
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
  gender: Gender;
}
