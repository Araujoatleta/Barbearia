import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Caminho do banco de dados
const dbPath = path.join(__dirname, 'database', 'barbershop.db');
// Caminho do arquivo do schema
const schemaPath = path.join(__dirname, 'database', 'schema.sql');

// Inicializando o banco de dados
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Carregando e executando o esquema se o banco de dados for novo
if (!fs.existsSync(dbPath) || fs.statSync(dbPath).size === 0) {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema);
  console.log('Esquema do banco de dados inicializado');
}

export default db;
