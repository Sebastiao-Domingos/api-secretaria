"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes_prof = void 0;
const express_1 = require("express");
const Professor_controller_1 = require("./Professor.controller");
const routes_prof = (0, express_1.Router)();
exports.routes_prof = routes_prof;
const controller = new Professor_controller_1.ProfessorController();
const BASE_PATH = '/professores';
routes_prof.post(BASE_PATH, controller.create);
routes_prof.put(`${BASE_PATH}/:id`, controller.update);
routes_prof.get(BASE_PATH, controller.get);
routes_prof.get(`${BASE_PATH}/:id`, controller.findOne);
routes_prof.delete(`${BASE_PATH}/:id`, controller.delete);
