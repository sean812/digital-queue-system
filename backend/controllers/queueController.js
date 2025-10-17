import * as Ticket from '../models/Ticket.js';

export async function serveNext(req, res) {
  try {
    const next = await Ticket.getNextTicket();
    if (!next) return res.status(404).json({ error: 'no waiting tickets' });
    const served = await Ticket.markServed(next.id, req.body.counter || '1');
    const io = req.app.get('io');
    io?.emit('ticket:served', served);
    res.json(served);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to serve next ticket' });
  }
}
