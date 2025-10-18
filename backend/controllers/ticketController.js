import * as Ticket from '../models/Ticket.js';

export async function createTicket(req, res) {
  try {
    const ticket = await Ticket.createTicket(req.body);
    // notify via socket
    const io = req.app.get('io');
    io?.emit('ticket:created', ticket);
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to create ticket' });
  }
}

export async function listTickets(req, res) {
  const tickets = await Ticket.listTickets();
  res.json(tickets);
}
