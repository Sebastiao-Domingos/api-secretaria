import { Curso, Estudante, Nota } from '@prisma/client';
import { DeleteType } from '../../locality/pais/Pais';

export type NotaCreateData = {} & Nota;

export type NotaData = {
  estudante: Estudante;
} & NotaCreateData;

export default interface NotaRepository {
  add: (data: NotaCreateData) => Promise<NotaData>;
  update: (data: Partial<NotaCreateData>) => Promise<NotaData>;
  get: () => Promise<NotaData[]>;
  find: (id_pais: string) => Promise<NotaData | null>;
  delete: (id_pais: string) => Promise<DeleteType | Error | null>;
}
