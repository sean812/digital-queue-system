import express from 'express';
import { createTicket, listTickets } from '../controllers/ticketController.js';
const router = express.Router();

router.post('/', createTicket);
router.get('/', listTickets);

export default router;
