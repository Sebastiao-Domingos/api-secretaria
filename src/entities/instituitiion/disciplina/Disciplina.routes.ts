import { Router } from 'express';
import { DisciplinaController } from './Disciplina.controller';

const routes_disciplina = Router();
const controller = new DisciplinaController();

const BASE_PATH = '/disciplinas';

routes_disciplina.post(BASE_PATH, controller.create);
routes_disciplina.put(`${BASE_PATH}/:id`, controller.update);
routes_disciplina.get(BASE_PATH, controller.get);
routes_disciplina.get(`${BASE_PATH}/:id`, controller.findOne);
routes_disciplina.delete(`${BASE_PATH}/:id`, controller.delete);

export { routes_disciplina };
