import { Router } from 'express';
import { AdministradorController } from './Administrador.controller';

const routes_admin = Router();
const controller = new AdministradorController();

const BASE_PATH = '/administradores';

routes_admin.post(BASE_PATH, controller.create);
routes_admin.put(`${BASE_PATH}/:id`, controller.update);
routes_admin.get(BASE_PATH, controller.get);
routes_admin.get(`${BASE_PATH}/:id`, controller.findOne);
routes_admin.delete(`${BASE_PATH}/:id`, controller.delete);

export { routes_admin };
