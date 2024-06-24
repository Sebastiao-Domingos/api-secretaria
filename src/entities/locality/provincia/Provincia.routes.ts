import { Router } from 'express';
import { ProvinceController } from './Provincia.controller';

const routes_province = Router();
const controller = new ProvinceController();

const BASE_PATH = '/provincias';

routes_province.post(BASE_PATH, controller.create);
routes_province.put(`${BASE_PATH}/:id`, controller.update);
routes_province.get(BASE_PATH, controller.get);
routes_province.get(`${BASE_PATH}/:id`, controller.findOne);
routes_province.delete(`${BASE_PATH}/:id`, controller.delete);

export { routes_province };
