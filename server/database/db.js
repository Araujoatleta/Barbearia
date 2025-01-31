// db.js
import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config(); // Configura as variáveis de ambiente

const dbUrl = process.env.DATABASE_URL;

// Carregar o caminho do banco de dados do arquivo .env
const dbPath = process.env.DATABASE_URL || './database/barbershop.db'; // A URL do banco de dados

// Obtendo o caminho absoluto para o diretório atual com 'import.meta.url'
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Criando a instância do Sequelize (ORM)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath  // O caminho para o banco de dados SQLite
});

// Garantir que o diretório de banco de dados exista
const dbDirectory = path.dirname(dbPath);
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
  console.log('Diretório de banco de dados criado.');
}

// Sincronizando a base de dados
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado com Sequelize!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados com Sequelize:', err);
  });

// Exportando a instância do Sequelize para uso posterior
export { sequelize };
