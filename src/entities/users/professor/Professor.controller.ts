import { PrismaClient } from '@prisma/client';
import { ProfessorService } from './Professor.service';
import { Request, Response } from 'express';
import { ProfessorCreateData } from './Professor';
import { validate } from 'uuid';

const prisma = new PrismaClient();
const service = new ProfessorService();

export class ProfessorController {
  async create(request: Request, response: Response) {
    const data: ProfessorCreateData = request.body;

    try {
      const res = await service.add(data).then((res) => res);
      response.status(201).json(res);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  async update(request: Request, response: Response) {
    const id: string = request.params.id;
    const data: Partial<ProfessorCreateData> = request.body;

    if (!validate(id)) {
      response.status(401).json('Bad request');
    }

    const province = await prisma.professor
      .findUnique({
        where: {
          id,
        },
      })
      .then((res) => res);

    if (!province) {
      response.status(404).json('Not found');
    }

    data.id = id;

    await service
      .update(data)
      .then((res) => response.status(201).json(res))
      .catch((error) => response.status(401).json(error));
  }

  async get(request: Request, response: Response) {
    try {
      const provinces = await service.get().then((res) => res);
      response.status(200).json(provinces);
    } catch (error) {
      response.status(401).json(error);
    }
  }

  async findOne(request: Request, response: Response) {
    const id: string = request.params.id;

    try {
      const province = await service.find(id).then((res) => res);
      response.status(200).json(province);
    } catch (error) {
      response.status(404).json(error);
    }
  }

  async delete(request: Request, response: Response) {
    const id: string = request.params.id;

    if (!validate(id)) {
      response.status(401).json('Invalid ID');
    }

    const province = await prisma.professor.findUnique({
      where: {
        id,
      },
    });

    if (!province) {
      response.status(401).json('Bad request!');
    }

    try {
      const res = await service.delete(id);
      response.status(200).json(res);
    } catch (error) {
      response.status(401).json(error);
    }
  }
}
