import { PrismaClient } from '@prisma/client';
import AdministradorRepository, {
  AdminCreateData,
  AdministradorData,
} from './Administrador';
import { DeleteType } from '../../locality/pais/Pais';

const prisma = new PrismaClient();

export class AdministradorService implements AdministradorRepository {
  async add(data: AdminCreateData): Promise<AdministradorData> {
    const { enderecos, ...user } = data;
    const admin = await prisma.administrador
      .create({
        data: user,
      })
      .then((response) => response);

    enderecos.forEach((ender) => (ender.id_administrador = admin.id));

    await prisma.endereco.createMany({
      data: enderecos,
    });

    return await prisma.administrador
      .findUnique({
        where: {
          id: admin.id,
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
  async update(data: Partial<AdminCreateData>): Promise<AdministradorData> {
    const { enderecos, ...user } = data;

    return await prisma.administrador
      .update({
        data: user,
        where: {
          id: data.id!,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }

  async get(): Promise<AdministradorData[]> {
    return await prisma.administrador
      .findMany()
      .then((response) => response)
      .catch((error) => error);
  }
  async find(id_admin: string): Promise<AdministradorData | null> {
    return prisma.administrador
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
    prisma.administrador
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
