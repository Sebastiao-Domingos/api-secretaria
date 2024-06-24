import express from 'express';
import { routes } from './routes/routes.routes';

const app = express();
const port = 3333;

app.use(routes);
app.get('/teste', (req, res) => {
  res.send('ola como estas');
});
app.listen(port, () => {
  console.log(`Rodando na porta : ${port}`);
});
