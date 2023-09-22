import { Medication } from 'src/domain/medication/model/medication';

export class MedicationCreatedPresenter {
  public readonly id: number;
  public readonly name: string;
  public readonly description: string;
  constructor({ id, name, description }: Medication) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
