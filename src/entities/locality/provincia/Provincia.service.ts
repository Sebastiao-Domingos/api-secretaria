import { PrismaClient } from '@prisma/client';
import { ProvinceCreateData, ProvinceData } from './Provincia';
import ProvinceRepository from './Provincia';
import { DeleteType } from '../pais/Pais';

const prisma = new PrismaClient();

export class ProvinceService implements ProvinceRepository {
  async add(data: ProvinceCreateData): Promise<ProvinceData> {
    return await prisma.provincia
      .create({
        data,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async update(data: Partial<ProvinceCreateData>): Promise<ProvinceData> {
    return await prisma.provincia
      .update({
        data: data,
        where: {
          id: data.id!,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }

  async get(): Promise<ProvinceData[]> {
    return await prisma.provincia
      .findMany()
      .then((response) => response)
      .catch((error) => error);
  }
  async find(id_provincia: string): Promise<ProvinceData | null> {
    return prisma.provincia
      .findUnique({
        where: {
          id: id_provincia,
        },
        include: {
          municipios: true,
          pais: true,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async delete(id_provincia: string): Promise<DeleteType | Error | any> {
    prisma.provincia
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
