import app from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// Attach to app for controllers to use
app.set('io', io);

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';
httpServer.listen(PORT, HOST, () => {
  console.log(`Backend server listening on ${HOST}:${PORT}`);
});
