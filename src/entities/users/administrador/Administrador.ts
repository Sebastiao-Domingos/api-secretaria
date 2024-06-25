import { Administrador, Endereco } from '@prisma/client';
import { DeleteType } from '../../locality/pais/Pais';
import { CountyData } from '../../locality/municipios/Municipio';

export type EnderecoType = {
  id: string;
  distrito: string;
  rua: string;
  id_municipio: string;
  id_administrador?: string;
  id_professor?: string;
  id_estudante?: string;
  municipio?: CountyData;
};

export type AdminCreateData = {
  enderecos: Endereco[];
} & Administrador;

export type AdministradorData = {
  endereco: Endereco[];
} & Administrador;

export default interface AdministradorRepository {
  add: (data: AdminCreateData) => Promise<AdministradorData>;
  update: (data: Partial<AdminCreateData>) => Promise<AdministradorData>;
  get: () => Promise<AdministradorData[]>;
  find: (id_pais: string) => Promise<AdministradorData | null>;
  delete: (id_pais: string) => Promise<DeleteType | Error | null>;
}
