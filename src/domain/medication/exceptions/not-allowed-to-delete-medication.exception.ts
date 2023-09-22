import { BaseException } from 'src/application/shared/base.exception';

export class NotAllowedToDeleteMedication extends BaseException {
  constructor() {
    super('You are not authorized to do that!');
  }
}
