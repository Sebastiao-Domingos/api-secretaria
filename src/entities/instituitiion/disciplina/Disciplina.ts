import { Curso, Disciplina, Horario } from '@prisma/client';
import { DeleteType } from '../../locality/pais/Pais';

export type DisciplinaCreateData = {} & Disciplina;

export type DisciplinaData = {
  curso: Curso;
  horarios: Horario[];
} & DisciplinaCreateData;

export default interface DisciplinaRepository {
  add: (data: DisciplinaCreateData) => Promise<DisciplinaData>;
  update: (data: Partial<DisciplinaCreateData>) => Promise<DisciplinaData>;
  get: () => Promise<DisciplinaData[]>;
  find: (id_pais: string) => Promise<DisciplinaData | null>;
  delete: (id_pais: string) => Promise<DeleteType | Error | null>;
}
