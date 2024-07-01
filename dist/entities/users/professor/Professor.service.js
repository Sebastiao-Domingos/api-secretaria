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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProfessorService {
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { enderecos } = data, user = __rest(data, ["enderecos"]);
            const prof = yield prisma.professor
                .create({
                data: user,
            })
                .then((response) => response);
            enderecos.forEach((ender) => (ender.id_professor = prof.id));
            yield prisma.endereco.createMany({
                data: enderecos,
            });
            return yield prisma.professor
                .findUnique({
                where: {
                    id: prof.id,
                },
                include: {
                    endereco: {
                        include: {
                            municipio: true,
                        },
                    },
                },
            })
                .then((res) => res)
                .catch((error) => error);
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { enderecos } = data, user = __rest(data, ["enderecos"]);
            return yield prisma.professor
                .update({
                data: user,
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
            return yield prisma.professor
                .findMany()
                .then((response) => response)
                .catch((error) => error);
        });
    }
    find(id_admin) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.professor
                .findUnique({
                where: {
                    id: id_admin,
                },
                include: {
                    endereco: {
                        include: {
                            municipio: {
                                include: {
                                    provincia: {
                                        include: {
                                            pais: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            })
                .then((response) => response)
                .catch((error) => error);
        });
    }
    delete(id_admin) {
        return __awaiter(this, void 0, void 0, function* () {
            prisma.professor
                .delete({
                where: {
                    id: id_admin,
                },
            })
                .then((res) => {
                sms: 'Eliminado';
            })
                .catch((error) => error);
        });
    }
}
exports.ProfessorService = ProfessorService;
