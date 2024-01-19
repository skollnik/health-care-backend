import { AggregateRoot } from '@nestjs/cqrs';
import { Doctor } from 'src/domain/specialization/model/doctor';

export class Post extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly doctorId: number,
    public readonly doctor: Doctor,
    public readonly imgUrl: string,
    public readonly title: string,
    public readonly body: string,
  ) {
    super();
  }

  static create({ id, doctorId, doctor, imgUrl, title, body }: Partial<Post>) {
    return new Post(id, doctorId, doctor, imgUrl, title, body);
  }
}
