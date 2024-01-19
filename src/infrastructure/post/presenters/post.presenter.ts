import { Post } from 'src/domain/post/model/post';
import { Doctor } from 'src/domain/specialization/model/doctor';

export class PostPresenter {
  public readonly id: number;
  public readonly doctor: Doctor;
  public readonly imgUrl: string;
  public readonly title: string;
  public readonly body: string;
  constructor({ id, doctor, imgUrl, title, body }: Post) {
    this.id = id;
    this.doctor = doctor;
    this.imgUrl = imgUrl;
    this.title = title;
    this.body = body;
  }
}
