import { AggregateRoot } from '@nestjs/cqrs';

export class Medication extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
  ) {
    super();
  }

  static create({ id, name, description }: Partial<Medication>) {
    return new Medication(id, name, description);
  }
}
