import { DeleteType } from '../pais/Pais';
import { ProvinceData } from '../provincia/Provincia';

export type CountyCreateData = {
  id?: string;
  nome: string;
  id_provincia: string;
};

export type CountyData = {
  provincia: ProvinceData;
} & CountyCreateData;

export default interface CountyRepository {
  add: (data: CountyCreateData) => Promise<CountyData>;
  update: (data: Partial<CountyCreateData>) => Promise<CountyData>;
  get: () => Promise<CountyData[]>;
  find: (id_pais: string) => Promise<CountyData | null>;
  delete: (id_pais: string) => Promise<DeleteType | Error | null>;
}
