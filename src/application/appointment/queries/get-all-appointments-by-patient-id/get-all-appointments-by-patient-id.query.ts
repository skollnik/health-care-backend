import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllAppointmentsByPatientId } from './get-all-appointments-by-patient-id-query.handler';
import { APPOINTMENT_REPOSITORY } from '../../appointment.constants';
import { IAppointmentRepository } from 'src/domain/appointment/interfaces/appointment-repository.interface';

@QueryHandler(GetAllAppointmentsByPatientId)
export class GetAllAppointmentsByPatientIdHandler
  implements IQueryHandler<GetAllAppointmentsByPatientId>
{
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}
  async execute({ patientId }: GetAllAppointmentsByPatientId): Promise<any> {
    const appointments = await this.appointmentRepository.findAllByPatientId(
      patientId,
    );
    return appointments;
  }
}
