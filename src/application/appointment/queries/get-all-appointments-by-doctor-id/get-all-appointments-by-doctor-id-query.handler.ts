import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllAppointmentsByDoctorId } from './get-all-appointments-by-doctor-id.query';
import { APPOINTMENT_REPOSITORY } from '../../appointment.constants';
import { IAppointmentRepository } from 'src/domain/appointment/interfaces/appointment-repository.interface';

@QueryHandler(GetAllAppointmentsByDoctorId)
export class GetAllAppointmentsByDoctorIdHandler
  implements IQueryHandler<GetAllAppointmentsByDoctorId>
{
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}
  async execute({ doctorId }: GetAllAppointmentsByDoctorId): Promise<any> {
    const appointments = await this.appointmentRepository.findAllByDoctorId(
      doctorId,
    );
    return appointments;
  }
}
