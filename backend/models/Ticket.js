import db from '../config/db.js';

export async function createTicket({ service, name, phone }) {
  const client = await db.connect();
  try {
    const res = await client.query(
      `INSERT INTO tickets (service, name, phone, status, created_at)
       VALUES ($1, $2, $3, 'waiting', now()) RETURNING *`,
      [service, name, phone]
    );
    return res.rows[0];
  } finally {
    client.release();
  }
}

export async function getNextTicket() {
  const res = await db.query("SELECT * FROM tickets WHERE status='waiting' ORDER BY created_at ASC LIMIT 1");
  return res.rows[0];
}

export async function markServed(id, counter) {
  const res = await db.query("UPDATE tickets SET status='served', served_at=now(), counter=$2 WHERE id=$1 RETURNING *", [id, counter]);
  return res.rows[0];
}

export async function listTickets() {
  const res = await db.query('SELECT * FROM tickets ORDER BY created_at DESC LIMIT 100');
  return res.rows;
}
