import { Router } from 'express';
import { CountryController } from './Pais.controller';

const routes_country = Router();
const controller = new CountryController();

const BASE_PATH = '/paises';

routes_country.post(BASE_PATH, controller.create);
routes_country.put(`${BASE_PATH}/:id`, controller.update);
routes_country.get(BASE_PATH, controller.get);
routes_country.get(`${BASE_PATH}/:id`, controller.findOne);
routes_country.delete(`${BASE_PATH}/:id`, controller.delete);

export { routes_country };
