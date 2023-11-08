import { BaseException } from 'src/application/shared/base.exception';

export class MedicalRecordNotFound extends BaseException {
  constructor() {
    super('Medical record with given id not found!');
  }
}
