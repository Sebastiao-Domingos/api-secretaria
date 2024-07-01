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
exports.HorarioService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class HorarioService {
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.horario
                .create({
                data,
            })
                .then((response) => response)
                .catch((error) => error);
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.horario
                .update({
                data: data,
                where: {
                    id: data.id,
                },
            })
                .then((response) => response)
                .catch((error) => error);
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.horario
                .findMany()
                .then((response) => response)
                .catch((error) => error);
        });
    }
    find(id_pais) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.horario
                .findUnique({
                where: {
                    id: id_pais,
                },
                include: {
                    disciplina: true,
                },
            })
                .then((response) => response)
                .catch((error) => error);
        });
    }
    delete(id_pais) {
        return __awaiter(this, void 0, void 0, function* () {
            prisma.horario
                .delete({
                where: {
                    id: id_pais,
                },
            })
                .then((res) => {
                sms: 'Eliminado';
            })
                .catch((error) => error);
        });
    }
}
exports.HorarioService = HorarioService;
