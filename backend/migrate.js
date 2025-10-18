import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env') });

const { Client } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  DATABASE_URL
const url = new URL(process.env.DATABASE_URL);
const dbName = url.pathname.slice(1);
const adminUrl = process.env.DATABASE_URL.replace(`/${dbName}`, '/postgres');

async function runMigration() {
  let adminClient;
  let dbClient;
  try {
    // Connecting to postgres db and creating the target (db Migrating herte) db
    adminClient = new Client({ connectionString: adminUrl });
    await adminClient.connect();
    console.log('Connected to PostgreSQL admin db');

    // Create database if it doesn't exist
    try {
      await adminClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database ${dbName} created`);
    } catch (err) {
      if (err.code === '42P04') { // database already exists
        console.log(`Database ${dbName} already exists`);
      } else {
        throw err;
      }
    }

    await adminClient.end();

    // Now connect to the target db
    dbClient = new Client({ connectionString: process.env.DATABASE_URL });
    await dbClient.connect();
    console.log(`Connected to database ${dbName}`);

    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

    await dbClient.query(schemaSQL);
    console.log('Schema migration completed successfully');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    if (adminClient) await adminClient.end();
    if (dbClient) await dbClient.end();
  }
}

runMigration();