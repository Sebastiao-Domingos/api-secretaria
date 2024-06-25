import { Router } from 'express';
import { CourseController } from './Curso.controller';

const routes_course = Router();
const controller = new CourseController();

const BASE_PATH = '/cursos';

routes_course.post(BASE_PATH, controller.create);
routes_course.put(`${BASE_PATH}/:id`, controller.update);
routes_course.get(BASE_PATH, controller.get);
routes_course.get(`${BASE_PATH}/:id`, controller.findOne);
routes_course.delete(`${BASE_PATH}/:id`, controller.delete);

export { routes_course };
