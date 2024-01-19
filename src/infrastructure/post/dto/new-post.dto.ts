import { IsNotEmpty } from 'class-validator';

export class NewPostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;
}
