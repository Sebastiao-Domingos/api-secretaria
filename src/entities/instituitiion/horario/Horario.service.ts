import { PrismaClient } from '@prisma/client';
import HorarioRepository, { HorarioCreateData, HorarioData } from './Horario';
import { DeleteType } from '../../locality/pais/Pais';

const prisma = new PrismaClient();

export class HorarioService implements HorarioRepository {
  async add(data: HorarioCreateData): Promise<HorarioData> {
    return await prisma.horario
      .create({
        data,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async update(data: Partial<HorarioCreateData>): Promise<HorarioData> {
    return await prisma.horario
      .update({
        data: data,
        where: {
          id: data.id!,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async get(): Promise<HorarioData[]> {
    return await prisma.horario
      .findMany()
      .then((response) => response)
      .catch((error) => error);
  }
  async find(id_pais: string): Promise<HorarioData | null> {
    return prisma.horario
      .findUnique({
        where: {
          id: id_pais,
        },
        include: {
          disciplina: true,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async delete(id_pais: string): Promise<DeleteType | Error | any> {
    prisma.horario
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
