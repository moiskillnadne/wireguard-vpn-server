import 'reflect-metadata';
import express, { Request, Response } from 'express';

import { sequelize } from '~/database/config';
import { UserController, userCreationSchema } from '~/api/user';
import { serviceAutorization } from './core/middleware';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(serviceAutorization)

app.get('/healthcheck', (req, res) => {
  res.send('OK');
});

app.post('/authorize', async (req: Request, res: Response) => {
  const userController = new UserController(req, res);

  return userController.authorize();
});


app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
