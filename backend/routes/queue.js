import express from 'express';
import { serveNext } from '../controllers/queueController.js';
const router = express.Router();

router.post('/serve', serveNext);

export default router;
