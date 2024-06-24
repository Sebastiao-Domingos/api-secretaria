import { PrismaClient } from '@prisma/client';
import { ProvinceService } from './Provincia.service';
import { Request, Response } from 'express';
import { ProvinceCreateData } from './Provincia';
import { validate } from 'uuid';

const prisma = new PrismaClient();
const service = new ProvinceService();

export class ProvinceController {
  async create(request: Request, response: Response) {
    const data: ProvinceCreateData = request.body;

    const country = prisma.provincia
      .findUnique({
        where: {
          nome: data.nome,
        },
      })
      .then((response) => response);

    if (country == null) {
      response.status(400).json('Not found!');
    }

    try {
      const res = await service.add(data).then((res) => res);

      response.status(201).json(res);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  async update(request: Request, response: Response) {
    const id: string = request.params.id;
    const data: Partial<ProvinceCreateData> = request.body;

    if (!validate(id)) {
      response.status(401).json('Bad request');
    }

    const country = await prisma.provincia
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

    const country = await prisma.provincia.findUnique({
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
