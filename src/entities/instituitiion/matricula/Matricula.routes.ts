import { Router } from 'express';
import { MatriculaController } from './Matricula.controller';

const routes_matricula = Router();
const controller = new MatriculaController();

const BASE_PATH = '/matriculas';

routes_matricula.post(BASE_PATH, controller.create);
routes_matricula.put(`${BASE_PATH}/:id`, controller.update);
routes_matricula.get(BASE_PATH, controller.get);
routes_matricula.get(`${BASE_PATH}/:id`, controller.findOne);
routes_matricula.delete(`${BASE_PATH}/:id`, controller.delete);

export { routes_matricula };
