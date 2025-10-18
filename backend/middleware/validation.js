const validateTicketRequest = (req, res, next) => {
    const { queueId, customerName } = req.body;

    if (typeof queueId !== 'number' || queueId <= 0) {
        return res.status(400).json({ error: 'Invalid queueId' });
    }

    if (!customerName || typeof customerName !== 'string') {
        return res.status(400).json({ error: 'Invalid customerName' });
    }

    next();
};

const validateQueueRequest = (req, res, next) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Queue name is required' });
    }

    next();
};

module.exports = {
    validateTicketRequest,
    validateQueueRequest
};
