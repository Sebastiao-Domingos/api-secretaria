import { Curso } from '@prisma/client';
import { DeleteType } from '../../locality/pais/Pais';

export type CourseCreateData = {} & Curso;

export type CourseData = {} & CourseCreateData;

export default interface CursoRepository {
  add: (data: CourseCreateData) => Promise<CourseData>;
  update: (data: Partial<CourseCreateData>) => Promise<CourseData>;
  get: () => Promise<CourseData[]>;
  find: (id_pais: string) => Promise<CourseData | null>;
  delete: (id_pais: string) => Promise<DeleteType | Error | null>;
}
