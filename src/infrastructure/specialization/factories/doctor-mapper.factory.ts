import { DoctorEntity, UserEntity } from '@prisma/client';
import { UserRole } from 'src/domain/auth/role.enum';
import { User } from 'src/domain/auth/user';
import { DoctorSpecialty } from 'src/domain/specialization/doctor-specialty.enum';
import { Doctor } from 'src/domain/specialization/model/doctor';
import { IEntityMapperFactory } from 'src/infrastructure/shared/factories/entity-mapper-factory.interface';

export class DoctorMapperFactory
  implements IEntityMapperFactory<DoctorEntity & { user?: UserEntity }, Doctor>
{
  doctorSpecialty = {
    CARDIOLOGY: DoctorSpecialty.CARDIOLOGY,
    DERMATOLOGY: DoctorSpecialty.DERMATOLOGY,
    ENDOCRINOLOGY: DoctorSpecialty.ENDOCRINOLOGY,
    GASTROENTEROLOGY: DoctorSpecialty.GASTROENTEROLOGY,
    HEMATOLOGY: DoctorSpecialty.HEMATOLOGY,
    NEUROLOGY: DoctorSpecialty.NEUROLOGY,
    OBSTETRICS_GYNECOLOGY: DoctorSpecialty.OBSTETRICS_GYNECOLOGY,
    ONCOLOGY: DoctorSpecialty.ONCOLOGY,
    OPHTHALMOLOGY: DoctorSpecialty.OPHTHALMOLOGY,
    ORTHOPEDICS: DoctorSpecialty.ORTHOPEDICS,
    OTOLARYNGOLOGY: DoctorSpecialty.OTOLARYNGOLOGY,
    PEDIATRICS: DoctorSpecialty.PEDIATRICS,
    PSYCHIATRY: DoctorSpecialty.PSYCHIATRY,
    RADIOLOGY: DoctorSpecialty.RADIOLOGY,
    UROLOGY: DoctorSpecialty.UROLOGY,
  };

  fromEntity({
    id,
    firstName,
    lastName,
    specialty,
    userId,
    user,
  }: DoctorEntity & { user?: UserEntity }): Doctor {
    const userMapped = user
      ? User.create({
          id: user.id,
          email: user.email,
          password: user.password,
          role: UserRole.DOCTOR,
        })
      : null;

    return Doctor.create({
      id,
      userId,
      firstName,
      lastName,
      specialty: this.doctorSpecialty[specialty],
      user: userMapped,
    });
  }
}
