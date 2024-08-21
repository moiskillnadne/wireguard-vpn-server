import 'reflect-metadata';
import express, { Request, Response } from 'express';

import { sequelize } from './database/config';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/healthcheck', (req, res) => {
  res.send('OK');
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
