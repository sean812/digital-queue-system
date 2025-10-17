import * as Counter from '../models/Counter.js';

export async function createCounter(req, res) {
  try {
    const counter = await Counter.createCounter(req.body);
    res.status(201).json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to create counter' });
  }
}

export async function listCounters(req, res) {
  const counters = await Counter.listCounters();
  res.json(counters);
}
