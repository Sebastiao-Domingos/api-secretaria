import { Router } from 'express';
import { CountyController } from './Municipio.controller';

const routes_county = Router();
const controller = new CountyController();

const BASE_PATH = '/municipios';

routes_county.post(BASE_PATH, controller.create);
routes_county.put(`${BASE_PATH}/:id`, controller.update);
routes_county.get(BASE_PATH, controller.get);
routes_county.get(`${BASE_PATH}/:id`, controller.findOne);
routes_county.delete(`${BASE_PATH}/:id`, controller.delete);

export { routes_county };
