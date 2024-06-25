import { Router } from 'express';
import express from 'express';
import { routes_country } from '../entities/locality/pais/Pais.routes';
import { routes_province } from '../entities/locality/provincia/Provincia.routes';
import { routes_county } from '../entities/locality/municipios/Municipio.routes';
import { routes_admin } from '../entities/users/administrador/Administrador.routes';
import { routes_prof } from '../entities/users/professor/Professor.routes';
import { routes_estudante } from '../entities/users/estudante/Estudante.routes';
import { routes_course } from '../entities/instituitiion/curso/Curso.routes';
import { routes_disciplina } from '../entities/instituitiion/disciplina/Disciplina.routes';
import { routes_horario } from '../entities/instituitiion/horario/Horario.routes';
import { routes_matricula } from '../entities/instituitiion/matricula/Matricula.routes';
import { routes_nota } from '../entities/instituitiion/nota/Nota.routes';

const routes = Router();
routes.use(express.json());

//routes
routes.use(routes_country);
routes.use(routes_province);
routes.use(routes_county);
routes.use(routes_admin);
routes.use(routes_prof);
routes.use(routes_estudante);
routes.use(routes_course);
routes.use(routes_disciplina);
routes.use(routes_horario);
routes.use(routes_matricula);
routes.use(routes_nota);

export { routes };
