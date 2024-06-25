import { Router } from 'express';
import { HorarioController } from './Horario.controller';

const routes_horario = Router();
const controller = new HorarioController();

const BASE_PATH = '/horarios';

routes_horario.post(BASE_PATH, controller.create);
routes_horario.put(`${BASE_PATH}/:id`, controller.update);
routes_horario.get(BASE_PATH, controller.get);
routes_horario.get(`${BASE_PATH}/:id`, controller.findOne);
routes_horario.delete(`${BASE_PATH}/:id`, controller.delete);

export { routes_horario };
