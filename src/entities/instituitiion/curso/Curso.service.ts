import { PrismaClient } from '@prisma/client';
import CursoRepository, { CourseCreateData, CourseData } from './Curso';
import { DeleteType } from '../../locality/pais/Pais';

const prisma = new PrismaClient();

export class CourseService implements CursoRepository {
  async add(data: CourseCreateData): Promise<CourseData> {
    return await prisma.curso
      .create({
        data,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async update(data: Partial<CourseCreateData>): Promise<CourseData> {
    return await prisma.curso
      .update({
        data: data,
        where: {
          id: data.id!,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async get(): Promise<CourseData[]> {
    return await prisma.curso
      .findMany()
      .then((response) => response)
      .catch((error) => error);
  }
  async find(id_pais: string): Promise<CourseData | null> {
    return prisma.curso
      .findUnique({
        where: {
          id: id_pais,
        },
        include: {
          disciplinas: true,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async delete(id_pais: string): Promise<DeleteType | Error | any> {
    prisma.curso
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
