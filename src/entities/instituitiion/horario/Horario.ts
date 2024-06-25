import { Curso, Disciplina, Horario } from '@prisma/client';
import { DeleteType } from '../../locality/pais/Pais';

export type HorarioCreateData = {} & Horario;

export type HorarioData = {
  disciplina: Disciplina;
} & HorarioCreateData;

export default interface HorarioRepository {
  add: (data: HorarioCreateData) => Promise<HorarioData>;
  update: (data: Partial<HorarioCreateData>) => Promise<HorarioData>;
  get: () => Promise<HorarioData[]>;
  find: (id_pais: string) => Promise<HorarioData | null>;
  delete: (id_pais: string) => Promise<DeleteType | Error | null>;
}
