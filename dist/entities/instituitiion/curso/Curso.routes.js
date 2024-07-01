"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes_course = void 0;
const express_1 = require("express");
const Curso_controller_1 = require("./Curso.controller");
const routes_course = (0, express_1.Router)();
exports.routes_course = routes_course;
const controller = new Curso_controller_1.CourseController();
const BASE_PATH = '/cursos';
routes_course.post(BASE_PATH, controller.create);
routes_course.put(`${BASE_PATH}/:id`, controller.update);
routes_course.get(BASE_PATH, controller.get);
routes_course.get(`${BASE_PATH}/:id`, controller.findOne);
routes_course.delete(`${BASE_PATH}/:id`, controller.delete);