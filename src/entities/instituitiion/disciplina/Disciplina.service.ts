import { PrismaClient } from '@prisma/client';
import { DisciplinaCreateData, DisciplinaData } from './Disciplina';
import { DeleteType } from '../../locality/pais/Pais';
import DisciplinaRepository from './Disciplina';

const prisma = new PrismaClient();

export class DisciplinaService implements DisciplinaRepository {
  async add(data: DisciplinaCreateData): Promise<DisciplinaData> {
    return await prisma.disciplina
      .create({
        data,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async update(data: Partial<DisciplinaCreateData>): Promise<DisciplinaData> {
    return await prisma.disciplina
      .update({
        data: data,
        where: {
          id: data.id!,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async get(): Promise<DisciplinaData[]> {
    return await prisma.disciplina
      .findMany()
      .then((response) => response)
      .catch((error) => error);
  }
  async find(id_pais: string): Promise<DisciplinaData | null> {
    return prisma.disciplina
      .findUnique({
        where: {
          id: id_pais,
        },
        include: {
          curso: true,
          horarios: true,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async delete(id_pais: string): Promise<DeleteType | Error | any> {
    prisma.disciplina
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
