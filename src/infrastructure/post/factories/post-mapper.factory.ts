import { DoctorEntity, PostEntity } from '@prisma/client';
import { Post } from 'src/domain/post/model/post';
import { DoctorSpecialty } from 'src/domain/specialization/doctor-specialty.enum';
import { Doctor } from 'src/domain/specialization/model/doctor';
import { IEntityMapperFactory } from 'src/infrastructure/shared/factories/entity-mapper-factory.interface';

export class PostMapperFactory
  implements IEntityMapperFactory<PostEntity, Post>
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
    doctorId,
    doctor,
    imgUrl,
    title,
    body,
  }: PostEntity & {
    doctor?: DoctorEntity;
  }): Post {
    const doctorMapped = doctor
      ? Doctor.create({
          id: doctor.id,
          userId: doctor.userId,
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          specialty: this.doctorSpecialty[doctor.specialty],
        })
      : null;
    return Post.create({
      id,
      doctorId,
      doctor: doctorMapped,
      imgUrl,
      title,
      body,
    });
  }
}
