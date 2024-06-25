import { PrismaClient } from '@prisma/client';
import { HorarioService } from './Horario.service';
import { Request, Response } from 'express';
import { HorarioCreateData } from './Horario';
import { validate } from 'uuid';

const prisma = new PrismaClient();
const service = new HorarioService();
export class HorarioController {
  async create(request: Request, response: Response) {
    const data: HorarioCreateData = request.body;

    // const country = prisma.horario
    //   .findUnique({
    //     where: {
    //       sala : data.sala,
    //       dia_semana : data.dia_semana,
    //       hora_inicio : data.hora_inicio
    //     },
    //   })
    //   .then((response) => response);

    // if (country == null) {
    //   response.status(400).json('Já existe curso com este nome!');
    // }

    try {
      const res = await service.add(data).then((res) => res);

      response.status(201).json(res);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  async update(request: Request, response: Response) {
    const id: string = request.params.id;
    const data: Partial<HorarioCreateData> = request.body;

    if (!validate(id)) {
      response.status(401).json('Bad request');
    }

    const country = await prisma.horario
      .findUnique({
        where: {
          id,
        },
      })
      .then((res) => res);

    if (!country) {
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
      const countries = await service.get().then((res) => res);
      response.status(200).json(countries);
    } catch (error) {
      response.status(401).json(error);
    }
  }

  async findOne(request: Request, response: Response) {
    const id: string = request.params.id;
    try {
      const country = await service.find(id).then((res) => res);
      response.status(200).json(country);
    } catch (error) {
      response.status(404).json(error);
    }
  }

  async delete(request: Request, response: Response) {
    const id: string = request.params.id;

    if (!validate(id)) {
      response.status(401).json('Invalid ID');
    }

    const country = await prisma.horario.findUnique({
      where: {
        id,
      },
    });

    if (!country) {
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
