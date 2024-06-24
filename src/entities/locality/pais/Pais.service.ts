import { PrismaClient } from '@prisma/client';
import CountryRepository, {
  CountryCreateData,
  CountryData,
  DeleteType,
} from './Pais';

const prisma = new PrismaClient();

export class CountryService implements CountryRepository {
  async add(data: CountryCreateData): Promise<CountryData> {
    return await prisma.pais
      .create({
        data,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async update(data: Partial<CountryCreateData>): Promise<CountryData> {
    return await prisma.pais
      .update({
        data: data,
        where: {
          id: data.id!,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async get(): Promise<CountryData[]> {
    return await prisma.pais
      .findMany()
      .then((response) => response)
      .catch((error) => error);
  }
  async find(id_pais: string): Promise<CountryData | null> {
    return prisma.pais
      .findUnique({
        where: {
          id: id_pais,
        },
        include: {
          provincias: {
            include: {
              municipios: true,
            },
          },
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async delete(id_pais: string): Promise<DeleteType | Error | any> {
    prisma.pais
      .delete({
        where: {
          id: id_pais,
        },
      })
      .then((res) => {
        sms: 'Eliminado';
      })
      .catch((error) => error);
  }
}
