import db from '../config/db.js';

export async function createCounter({ name }) {
  const res = await db.query('INSERT INTO counters (name, created_at) VALUES ($1, now()) RETURNING *', [name]);
  return res.rows[0];
}

export async function listCounters() {
  const res = await db.query('SELECT * FROM counters ORDER BY id');
  return res.rows;
}
