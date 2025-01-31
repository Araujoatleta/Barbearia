import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carregar as variáveis de ambiente
dotenv.config();

// Criação da instância do Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/barbershop.db',
});

export default sequelize;  // Exporte como padrão
