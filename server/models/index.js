import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Inicializando o sequelize com o banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',  // Ajuste o caminho conforme necessário
});

// Importando e definindo o modelo User passando o sequelize
import defineUser from './User.js';

const User = defineUser(sequelize); // Passando sequelize para o modelo User

// Exportando o sequelize e o modelo User
export { sequelize, User };
