import { BaseException } from 'src/application/shared/base.exception';

export class MedicationNotFound extends BaseException {
  constructor() {
    super('Medication with given id not found!');
  }
}
