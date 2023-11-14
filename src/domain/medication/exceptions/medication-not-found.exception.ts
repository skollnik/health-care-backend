import { BaseException } from 'src/application/shared/base.exception';

export class MedicationNotFoundException extends BaseException {
  constructor() {
    super('Medication with given id not found!');
  }
}
