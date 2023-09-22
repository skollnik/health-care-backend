import { Doctor } from '../model/doctor';

export interface IDoctorRepository {
  findById(id: number): Promise<Doctor>;
  findAll(): Promise<Doctor[]>;
}
