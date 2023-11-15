import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllAppointmentsQuery } from './get-all-appointments.query';
import { APPOINTMENT_REPOSITORY } from '../../appointment.constants';
import { IAppointmentRepository } from 'src/domain/appointment/interfaces/appointment-repository.interface';

@QueryHandler(GetAllAppointmentsQuery)
export class GetAllAppointmentsQueryHandler
  implements IQueryHandler<GetAllAppointmentsQuery>
{
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}
  async execute(): Promise<any> {
    const appointments = await this.appointmentRepository.findAll();
    return appointments;
  }
}
