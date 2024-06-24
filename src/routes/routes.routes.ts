import { Router } from 'express';
import express from 'express';
import { routes_country } from '../entities/locality/pais/Pais.routes';
import { routes_province } from '../entities/locality/provincia/Provincia.routes';
import { routes_county } from '../entities/locality/municipios/Municipio.routes';
import { routes_admin } from '../entities/users/administrador/Administrador.routes';

const routes = Router();
routes.use(express.json());

//routes
routes.use(routes_country);
routes.use(routes_province);
routes.use(routes_county);
routes.use(routes_admin);

export { routes };
