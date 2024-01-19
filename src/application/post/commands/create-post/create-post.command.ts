export class CreatePostCommand {
  constructor(
    public readonly doctorId: number,
    public readonly file: any,
    public readonly title: string,
    public readonly body: string,
  ) {}
}
