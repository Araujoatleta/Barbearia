import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config(); // Carregar variáveis de ambiente

import { Sequelize } from 'sequelize';

// Carregar o caminho do banco de dados do arquivo .env
const dbPath = process.env.DATABASE_URL;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath // O caminho para o banco de dados SQLite
});

export { sequelize };

// Obtendo o caminho absoluto para o diretório atual
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Caminho do banco de dados
const dbPathLocal = path.join(__dirname, 'database', 'barbershop.db');
// Caminho do arquivo do esquema SQL
const schemaPath = path.join(__dirname, 'database', 'schema.sql');

// Garantir que o diretório 'database' exista
const databaseDir = path.join(__dirname, 'database');
if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });  // Cria o diretório 'database' se não existir
  console.log('Diretório "database" criado.');
}

// Inicializando o banco de dados
const db = new Database(dbPathLocal);
db.pragma('journal_mode = WAL');  // Configuração de modo WAL (Write-Ahead Logging) para melhor performance

// Carregando e executando o esquema SQL se o banco de dados for novo
if (!fs.existsSync(dbPath) || fs.statSync(dbPath).size === 0) {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema);
  console.log('Esquema do banco de dados inicializado');
}

export default db;
