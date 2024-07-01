require('dotenv').config();

import express, { Request, Response } from 'express';
import { routes } from './routes/routes.routes';

const app = express();
const port = process.env.PORT || 3333;

app.use(routes);
app.get('/teste', (req, res) => {
  res.send('ola como estas');
});
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});
app.listen(port, () => {
  console.log(`Rodando na porta : ${port}`);
});
