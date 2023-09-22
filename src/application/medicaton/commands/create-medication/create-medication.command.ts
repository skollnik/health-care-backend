export class CreateMedicationCommand {
  constructor(
    public readonly name: string,
    public readonly description: string,
  ) {}
}
