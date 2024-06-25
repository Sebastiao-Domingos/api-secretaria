import { Router } from 'express';
import { NotaController } from './Nota.controller';

const routes_nota = Router();
const controller = new NotaController();

const BASE_PATH = '/notas';

routes_nota.post(BASE_PATH, controller.create);
routes_nota.put(`${BASE_PATH}/:id`, controller.update);
routes_nota.get(BASE_PATH, controller.get);
routes_nota.get(`${BASE_PATH}/:id`, controller.findOne);
routes_nota.delete(`${BASE_PATH}/:id`, controller.delete);

export { routes_nota };
