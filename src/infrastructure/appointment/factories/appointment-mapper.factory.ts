import {
  AppointmentEntity,
  DoctorEntity,
  MedicalRecordEntity,
  MedicationEntity,
  PatientEntity,
  UserEntity,
} from '@prisma/client';
import { AppointmentStatus } from 'src/domain/appointment/appointment-status.enum';
import { Appointment } from 'src/domain/appointment/model/appointment';
import { MedicalRecord } from 'src/domain/medical-record/model/medical-record';
import { Medication } from 'src/domain/medication/model/medication';
import { DoctorSpecialty } from 'src/domain/specialization/doctor-specialty.enum';
import { Gender } from 'src/domain/specialization/gender.enum';
import { Doctor } from 'src/domain/specialization/model/doctor';
import { Patient } from 'src/domain/specialization/model/patient';
import { IEntityMapperFactory } from 'src/infrastructure/shared/factories/entity-mapper-factory.interface';

type AppointmentEntityComplex = AppointmentEntity & {
  doctor?: DoctorEntity & { user?: UserEntity };
  patient?: PatientEntity & { user?: UserEntity };
  medicalRecord?: MedicalRecordEntity & { medications: MedicationEntity[] };
};

export class AppointmentMapperFactory
  implements IEntityMapperFactory<AppointmentEntityComplex, Appointment>
{
  appointmentStatus = {
    PENDING: AppointmentStatus.PENDING,
    CONFIRMED: AppointmentStatus.CONFIRMED,
    CANCELED: AppointmentStatus.CANCELED,
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
    doctorId,
    patientId,
    description,
    status,
    date,
    doctor,
    patient,
    medicalRecord,
  }: AppointmentEntityComplex): Appointment {
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

    const medicationsMapped = medicalRecord?.medications
      ? medicalRecord.medications.map((medication: MedicationEntity) =>
          Medication.create({
            id: medication.id,
            name: medication.name,
            description: medication.description,
          }),
        )
      : [];

    const medicalRecordMapped = medicalRecord
      ? MedicalRecord.create({
          id: medicalRecord.id,
          appointmentId: id,
          diagnosis: medicalRecord.diagnosis,
          medications: medicationsMapped,
        })
      : null;

    return Appointment.create({
      id,
      doctorId,
      patientId,
      description,
      status: this.appointmentStatus[status],
      doctor: doctorMapped,
      patient: patientMapped,
      date,
      medicalRecord: medicalRecordMapped,
    });
  }
}
