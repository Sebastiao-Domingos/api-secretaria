import { PrismaClient } from '@prisma/client';
import CountyRepository, { CountyCreateData, CountyData } from './Municipio';
import { DeleteType } from '../pais/Pais';

const prisma = new PrismaClient();

export class CountyService implements CountyRepository {
  async add(data: CountyCreateData): Promise<CountyData> {
    return await prisma.municipio
      .create({
        data,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async update(data: Partial<CountyCreateData>): Promise<CountyData> {
    return await prisma.municipio
      .update({
        data: data,
        where: {
          id: data.id!,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }

  async get(): Promise<CountyData[]> {
    return await prisma.municipio
      .findMany()
      .then((response) => response)
      .catch((error) => error);
  }
  async find(id_provincia: string): Promise<CountyData | null> {
    return prisma.municipio
      .findUnique({
        where: {
          id: id_provincia,
        },
        include: {
          provincia: {
            include: {
              pais: true,
            },
          },
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async delete(id_provincia: string): Promise<DeleteType | Error | any> {
    prisma.municipio
      .delete({
        where: {
          id: id_provincia,
        },
      })
      .then((res) => {
        sms: 'Eliminado';
      })
      .catch((error) => error);
  }
}
