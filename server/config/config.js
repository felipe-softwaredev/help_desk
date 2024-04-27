import { Sequelize } from 'sequelize';

import * as dotenv from 'dotenv';
dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY;

export const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  logging: false,
});

export const BCRYPT_WORK_FACTOR = 12;
