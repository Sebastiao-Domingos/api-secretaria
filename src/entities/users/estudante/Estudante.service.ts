import { PrismaClient } from '@prisma/client';
import EstudanteRepository, {
  EstudanteCreateData,
  EstudanteData,
} from './Estudante';
import { DeleteType } from '../../locality/pais/Pais';
import { error } from 'console';

const prisma = new PrismaClient();

export class EstudanteService implements EstudanteRepository {
  async add(data: EstudanteCreateData): Promise<EstudanteData> {
    const { enderecos, ...user } = data;
    const prof = await prisma.estudante
      .create({
        data: user,
      })
      .then((response) => response);

    enderecos.forEach((ender) => (ender.id_estudante = prof.id));

    await prisma.endereco.createMany({
      data: enderecos,
    });

    return await prisma.estudante
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
  async update(data: Partial<EstudanteCreateData>): Promise<EstudanteData> {
    const { enderecos, ...user } = data;

    return await prisma.estudante
      .update({
        data: user,
        where: {
          id: data.id!,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }

  async get(): Promise<EstudanteData[]> {
    return await prisma.estudante
      .findMany()
      .then((response) => response)
      .catch((error) => error);
  }
  async find(id_admin: string): Promise<EstudanteData | null> {
    return prisma.estudante
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
    prisma.estudante
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
