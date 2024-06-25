import { Router } from 'express';
import { EstudanteController } from './Estudante.controller';

const routes_estudante = Router();
const controller = new EstudanteController();

const BASE_PATH = '/estudantes';

routes_estudante.post(BASE_PATH, controller.create);
routes_estudante.put(`${BASE_PATH}/:id`, controller.update);
routes_estudante.get(BASE_PATH, controller.get);
routes_estudante.get(`${BASE_PATH}/:id`, controller.findOne);
routes_estudante.delete(`${BASE_PATH}/:id`, controller.delete);

export { routes_estudante };
