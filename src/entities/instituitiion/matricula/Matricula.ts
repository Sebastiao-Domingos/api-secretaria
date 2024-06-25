import { Matricula } from '@prisma/client';
import { DeleteType } from '../../locality/pais/Pais';

export type MatriculaCreateData = {} & Matricula;

export type MatriculaData = {} & MatriculaCreateData;

export default interface MatriculaRepository {
  add: (data: MatriculaCreateData) => Promise<MatriculaData>;
  update: (data: Partial<MatriculaCreateData>) => Promise<MatriculaData>;
  get: () => Promise<MatriculaData[]>;
  find: (id_pais: string) => Promise<MatriculaData | null>;
  delete: (id_pais: string) => Promise<DeleteType | Error | null>;
}
