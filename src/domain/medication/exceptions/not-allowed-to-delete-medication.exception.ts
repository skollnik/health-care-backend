import { BaseException } from 'src/application/shared/base.exception';

export class NotAllowedToDeleteMedicationException extends BaseException {
  constructor() {
    super('You are not authorized to do that!');
  }
}
