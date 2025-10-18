const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const { validateTicketRequest, validateQueueRequest } = require('./middleware/validation');

const PORT = 5000;

app.use(cors());
app.use(express.json());

let queues = [];
let ticketNumber = 1;

//customer features
//get digital ticket number
app.post('/ticket', validateTicketRequest, (req, res, next) => {
    try {
        const { queueId, customerName } = req.body;
        const queue = queues.find(q => q.id === queueId);
        if (!queue) throw { status: 404, message: 'Queue not found' };

        const ticket = {
            ticketNumber: ticketNumber++,
            name: customerName,
            position: queue.customers.length + 1
        };
        queue.customers.push(ticket);
        res.json(ticket);
    } catch (err) {
        next(err);
    }
});


//delete digital ticket
app.delete('/ticket/:ticketNumber', (req, res, next) => {
    try {
        const tNumber = parseInt(req.params.ticketNumber);
        let found = false;
        queues.forEach(q => {
            const index = q.customers.findIndex(c => c.ticketNumber === tNumber);
            if (index !== -1) {
                q.customers.splice(index, 1);
                found = true;
            }
        });
        if (!found) throw { status: 404, message: 'Ticket not found' };
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
});

//track real time queue positions
app.get('/queue/:queueId', (req, res, next) => {
    try {
        const queue = queues.find(q => q.id === parseInt(req.params.queueId));
        if (!queue) throw { status: 404, message: 'Queue not found' };
        res.json(queue.customers);
    } catch (err) {
        next(err);
    }
});


//Staff features
//create queue
app.post('/queues', auth, validateQueueRequest, (req, res, next) => {
    try {
        const { name } = req.body;
        const newQueue = { id: queues.length + 1, name, customers: [] };
        queues.push(newQueue);
        res.json(newQueue);
    } catch (err) {
        next(err);
    }
});

//delete queue
app.delete('/queues/:queueId', (req, res, next) => {
    try {
        const qId = parseInt(req.params.queueId);
        const index = queues.findIndex(q => q.id === qId);
        if (index === -1) throw { status: 404, message: 'Queue not found' };
        queues.splice(index, 1);
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
});

//view current queue status
app.get('/queues', (req, res, next) => {
    try {
        res.json(queues);
    } catch (err) {
        next(err);
    }
});

//call next customer
app.get('/next/:queueId', (req, res, next) => {
    try {
        const queue = queues.find(q => q.id === parseInt(req.params.queueId));
        if (!queue || queue.customers.length === 0)
            throw { status: 404, message: 'No customers in queue' };
        const nextCustomer = queue.customers.shift();
        queue.customers.forEach((c, i) => c.position = i + 1);
        res.json(nextCustomer);
    } catch (err) {
        next(err);
    }
});


//add test customers for demontration
app.post('/test-customers/:queueId', (req, res, next) => {
    try {
        const queue = queues.find(q => q.id === parseInt(req.params.queueId));
        if (!queue) throw { status: 404, message: 'Queue not found' };
        for (let i = 0; i < 5; i++) {
            queue.customers.push({
                ticketNumber: ticketNumber++,
                name: `TestCustomer${i + 1}`,
                position: queue.customers.length + 1
            });
        }
        res.json(queue.customers);
    } catch (err) {
        next(err);
    }
});

app.use(errorHandler);

// Start server
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));