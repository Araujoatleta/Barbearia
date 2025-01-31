// db.js ou equivalente
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_URL // O caminho para o banco de dados SQLite
});

export default sequelize;
