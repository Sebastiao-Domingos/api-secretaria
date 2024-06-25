import { PrismaClient } from '@prisma/client';
import NotaRepository, { NotaCreateData, NotaData } from './Nota';
import { DeleteType } from '../../locality/pais/Pais';

const prisma = new PrismaClient();

export class NotaService implements NotaRepository {
  async add(data: NotaCreateData): Promise<NotaData> {
    return await prisma.nota
      .create({
        data,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async update(data: Partial<NotaCreateData>): Promise<NotaData> {
    return await prisma.nota
      .update({
        data: data,
        where: {
          id: data.id!,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async get(): Promise<NotaData[]> {
    return await prisma.nota
      .findMany()
      .then((response) => response)
      .catch((error) => error);
  }
  async find(id_pais: string): Promise<NotaData | null> {
    return prisma.nota
      .findUnique({
        where: {
          id: id_pais,
        },
        include: {
          disciplina: true,
          estudante: true,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async delete(id_pais: string): Promise<DeleteType | Error | any> {
    prisma.nota
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
