import {
  $Enums,
  DoctorEntity,
  PatientEntity,
  UserEntity,
} from '@prisma/client';
import { IEntityMapperFactory } from '../../shared/factories/entity-mapper-factory.interface';
import { User } from 'src/domain/auth/user';
import { UserRole } from 'src/domain/auth/role.enum';
import { Doctor } from 'src/domain/specialization/model/doctor';
import { Patient } from 'src/domain/specialization/model/patient';
import { Gender } from 'src/domain/specialization/gender.enum';
import { DoctorSpecialty } from 'src/domain/specialization/doctor-specialty.enum';

export class UserEntityMapperFactory
  implements
    IEntityMapperFactory<
      UserEntity & { doctor?: DoctorEntity; patient?: PatientEntity },
      User
    >
{
  userRoles = {
    ADMINISTRATOR: UserRole.ADMINISTRATOR,
    DOCTOR: UserRole.DOCTOR,
    PATIENT: UserRole.PATIENT,
  };

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

  gender = {
    MALE: Gender.MALE,
    FEMALE: Gender.FEMALE,
  };

  fromEntity({
    id,
    email,
    role,
    avatar,
    password,
    doctor,
    patient,
  }: UserEntity & {
    doctor?: DoctorEntity;
    patient?: PatientEntity;
  }): User {
    const doctorMapped = doctor
      ? Doctor.create({
          id: doctor.id,
          userId: doctor.userId,
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          specialty: this.doctorSpecialty[doctor.specialty],
        })
      : null;
    const patientMapped = patient
      ? Patient.create({
          id: patient.id,
          userId: patient.userId,
          firstName: patient.firstName,
          lastName: patient.lastName,
          gender: this.gender[patient.gender],
        })
      : null;

    return User.create({
      id,
      email,
      password,
      avatar,
      role: this.userRoles[role],
      doctor: doctorMapped,
      patient: patientMapped,
    });
  }
}
