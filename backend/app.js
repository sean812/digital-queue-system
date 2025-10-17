import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ticketsRouter from './routes/tickets.js';
import queueRouter from './routes/queue.js';
import adminRouter from './routes/admin.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tickets', ticketsRouter);
app.use('/api/queue', queueRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => res.json({ status: 'ok' }));

export default app;
