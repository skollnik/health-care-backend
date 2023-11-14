import { AggregateRoot } from '@nestjs/cqrs';
import { MedicationNotFoundException } from '../exceptions/medication-not-found.exception';

export class Medication extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
  ) {
    super();
  }

  static throwIfNull(medication: Medication) {
    if (!medication) throw new MedicationNotFoundException();
  }

  static create({ id, name, description }: Partial<Medication>) {
    return new Medication(id, name, description);
  }
}
