// database/db-sqlite.js (Arquivo separado para `better-sqlite3`)
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtendo o caminho absoluto para o diretório atual
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Caminho do banco de dados SQLite
const dbPath = process.env.DATABASE_URL || path.join(__dirname, 'database', 'barbershop.db');

// Garantir que o diretório de banco de dados exista
const dbDirectory = path.dirname(dbPath);
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
  console.log('Diretório de banco de dados criado.');
}

// Inicializando o banco com `better-sqlite3`
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');  // Configuração de modo WAL para melhor performance

export default db;
