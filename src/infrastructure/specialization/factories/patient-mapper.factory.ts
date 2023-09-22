import { PatientEntity, UserEntity } from '@prisma/client';
import { UserRole } from 'src/domain/auth/role.enum';
import { User } from 'src/domain/auth/user';
import { Gender } from 'src/domain/specialization/gender.enum';
import { Patient } from 'src/domain/specialization/model/patient';
import { IEntityMapperFactory } from 'src/infrastructure/shared/factories/entity-mapper-factory.interface';

export class PatientMapperFactory
  implements
    IEntityMapperFactory<PatientEntity & { user?: UserEntity }, Patient>
{
  gender = {
    MALE: Gender.MALE,
    FEMALE: Gender.FEMALE,
  };

  fromEntity({
    id,
    userId,
    firstName,
    lastName,
    gender,
    user,
  }: PatientEntity & { user?: UserEntity }): Patient {
    const userMapped = user
      ? User.create({
          id: user.id,
          email: user.email,
          password: user.password,
          role: UserRole.PATIENT,
        })
      : null;

    return Patient.create({
      id,
      userId,
      firstName,
      lastName,
      gender: this.gender[gender],
      user: userMapped,
    });
  }
}
