import { Router } from 'express';
import { ProfessorController } from './Professor.controller';

const routes_prof = Router();
const controller = new ProfessorController();

const BASE_PATH = '/professores';

routes_prof.post(BASE_PATH, controller.create);
routes_prof.put(`${BASE_PATH}/:id`, controller.update);
routes_prof.get(BASE_PATH, controller.get);
routes_prof.get(`${BASE_PATH}/:id`, controller.findOne);
routes_prof.delete(`${BASE_PATH}/:id`, controller.delete);

export { routes_prof };
