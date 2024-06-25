import { Endereco, Estudante } from '@prisma/client';
import { DeleteType } from '../../locality/pais/Pais';

export type EstudanteCreateData = {
  enderecos: Endereco[];
} & Estudante;

export type EstudanteData = {
  endereco: Endereco[];
} & Estudante;

export default interface EstudanteRepository {
  add: (data: EstudanteCreateData) => Promise<EstudanteData>;
  update: (data: Partial<EstudanteCreateData>) => Promise<EstudanteData>;
  get: () => Promise<EstudanteData[]>;
  find: (id_est: string) => Promise<EstudanteData | null>;
  delete: (id_est: string) => Promise<DeleteType | Error | null>;
}
