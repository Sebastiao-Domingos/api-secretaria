import { Administrador, Endereco, Professor } from '@prisma/client';
import { DeleteType } from '../../locality/pais/Pais';

export type ProfessorCreateData = {
  enderecos: Endereco[];
} & Professor;

export type ProfessorData = {
  endereco: Endereco[];
} & Professor;

export default interface ProfessorRepository {
  add: (data: ProfessorCreateData) => Promise<ProfessorData>;
  update: (data: Partial<ProfessorCreateData>) => Promise<ProfessorData>;
  get: () => Promise<ProfessorData[]>;
  find: (id_prof: string) => Promise<ProfessorData | null>;
  delete: (id_prof: string) => Promise<DeleteType | Error | null>;
}
