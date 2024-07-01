export type CountryCreateData = {
  id?: string;
  nome: string;
};

export type CountryData = {
  provincias?: {
    id: string;
    nome: string;
    municicpios?: {
      id: string;
      nome: string;
    }[];
  }[];
} & CountryCreateData;

export type DeleteType = {
  sms: string;
};

export default interface PaisRepository {
  add: (data: CountryCreateData) => Promise<CountryData>;
  update: (data: Partial<CountryCreateData>) => Promise<CountryData>;
  get: () => Promise<CountryData[]>;
  find: (id_pais: string) => Promise<CountryData | null>;
  delete: (id_pais: string) => Promise<DeleteType | Error | null>;
}
