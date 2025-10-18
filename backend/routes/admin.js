import express from 'express';
import { createCounter, listCounters } from '../controllers/adminController.js';
const router = express.Router();

router.post('/counters', createCounter);
router.get('/counters', listCounters);

export default router;
