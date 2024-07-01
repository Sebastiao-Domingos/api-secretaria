"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorController = void 0;
const client_1 = require("@prisma/client");
const Professor_service_1 = require("./Professor.service");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
const service = new Professor_service_1.ProfessorService();
class ProfessorController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = request.body;
            try {
                const res = yield service.add(data).then((res) => res);
                response.status(201).json(res);
            }
            catch (error) {
                response.status(400).json(error);
            }
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const data = request.body;
            if (!(0, uuid_1.validate)(id)) {
                response.status(401).json('Bad request');
            }
            const province = yield prisma.professor
                .findUnique({
                where: {
                    id,
                },
            })
                .then((res) => res);
            if (!province) {
                response.status(404).json('Not found');
            }
            data.id = id;
            yield service
                .update(data)
                .then((res) => response.status(201).json(res))
                .catch((error) => response.status(401).json(error));
        });
    }
    get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const provinces = yield service.get().then((res) => res);
                response.status(200).json(provinces);
            }
            catch (error) {
                response.status(401).json(error);
            }
        });
    }
    findOne(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const province = yield service.find(id).then((res) => res);
                response.status(200).json(province);
            }
            catch (error) {
                response.status(404).json(error);
            }
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            if (!(0, uuid_1.validate)(id)) {
                response.status(401).json('Invalid ID');
            }
            const province = yield prisma.professor.findUnique({
                where: {
                    id,
                },
            });
            if (!province) {
                response.status(401).json('Bad request!');
            }
            try {
                const res = yield service.delete(id);
                response.status(200).json(res);
            }
            catch (error) {
                response.status(401).json(error);
            }
        });
    }
}
exports.ProfessorController = ProfessorController;
