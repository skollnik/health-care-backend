export class DeleteMedicationCommand {
  constructor(
    public readonly authorized: number,
    public readonly medicationId: number,
  ) {}
}
