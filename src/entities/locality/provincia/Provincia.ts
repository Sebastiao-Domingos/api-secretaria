import { CountryData as CountreData, DeleteType } from '../pais/Pais';

export type ProvinceCreateData = {
  id?: string;
  nome: string;
  id_pais: string;
};

export type ProvinceData = {
  pais: CountreData;
  municipios?: {
    id: string;
    nome: string;
  }[];
} & ProvinceCreateData;

export default interface ProvinceRepository {
  add: (data: ProvinceCreateData) => Promise<ProvinceData>;
  update: (data: Partial<ProvinceCreateData>) => Promise<ProvinceData>;
  get: () => Promise<ProvinceData[]>;
  find: (id_pais: string) => Promise<ProvinceData | null>;
  delete: (id_pais: string) => Promise<DeleteType | Error | null>;
}
