import { PrismaClient } from '@prisma/client';
import MatriculaRepository, {
  MatriculaCreateData,
  MatriculaData,
} from './Matricula';
import { DeleteType } from '../../locality/pais/Pais';

const prisma = new PrismaClient();

export class MatriculaService implements MatriculaRepository {
  async add(data: MatriculaCreateData): Promise<MatriculaData> {
    return await prisma.matricula
      .create({
        data,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async update(data: Partial<MatriculaCreateData>): Promise<MatriculaData> {
    return await prisma.matricula
      .update({
        data: data,
        where: {
          id: data.id!,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async get(): Promise<MatriculaData[]> {
    return await prisma.matricula
      .findMany()
      .then((response) => response)
      .catch((error) => error);
  }
  async find(id_pais: string): Promise<MatriculaData | null> {
    return prisma.matricula
      .findUnique({
        where: {
          id: id_pais,
        },
        include: {
          estudante: true,
          disciplina: true,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async delete(id_pais: string): Promise<DeleteType | Error | any> {
    prisma.matricula
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
