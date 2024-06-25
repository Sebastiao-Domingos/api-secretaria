import { PrismaClient } from '@prisma/client';
import ProfessorRepository, {
  ProfessorCreateData,
  ProfessorData,
} from './Professor';
import { DeleteType } from '../../locality/pais/Pais';

const prisma = new PrismaClient();

export class ProfessorService implements ProfessorRepository {
  async add(data: ProfessorCreateData): Promise<ProfessorData> {
    const { enderecos, ...user } = data;
    const prof = await prisma.professor
      .create({
        data: user,
      })
      .then((response) => response);

    enderecos.forEach((ender) => (ender.id_professor = prof.id));

    await prisma.endereco.createMany({
      data: enderecos,
    });

    return await prisma.professor
      .findUnique({
        where: {
          id: prof.id,
        },
        include: {
          endereco: {
            include: {
              municipio: true,
            },
          },
        },
      })
      .then((res) => res)
      .catch((error) => error);
  }
  async update(data: Partial<ProfessorCreateData>): Promise<ProfessorData> {
    const { enderecos, ...user } = data;

    return await prisma.professor
      .update({
        data: user,
        where: {
          id: data.id!,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }

  async get(): Promise<ProfessorData[]> {
    return await prisma.professor
      .findMany()
      .then((response) => response)
      .catch((error) => error);
  }
  async find(id_admin: string): Promise<ProfessorData | null> {
    return prisma.professor
      .findUnique({
        where: {
          id: id_admin,
        },
        include: {
          endereco: {
            include: {
              municipio: {
                include: {
                  provincia: {
                    include: {
                      pais: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async delete(id_admin: string): Promise<DeleteType | Error | any> {
    prisma.professor
      .delete({
        where: {
          id: id_admin,
        },
      })
      .then((res) => {
        sms: 'Eliminado';
      })
      .catch((error) => error);
  }
}
