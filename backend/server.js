// Import express
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 5000;

// Middleware to handle JSON requests
app.use(express.json());

// In-memory storage (temporary for demonstration)
let queues = [];           // Each queue has {id, name, customers: []}
let ticketNumber = 1;      // Auto-increment ticket number

//customer features
//get digital ticket number
app.post('/ticket', (req, res) => {
    const { queueId, customerName } = req.body;
    const queue = queues.find(q => q.id === queueId);
    if (!queue) return res.status(404).json({ error: 'Queue not found' });

    const ticket = {
        ticketNumber: ticketNumber++,
        name: customerName,
        position: queue.customers.length + 1
    };
    queue.customers.push(ticket);
    res.json(ticket);
});

//delete digital ticket
app.delete('/ticket/:ticketNumber', (req, res) => {
    const tNumber = parseInt(req.params.ticketNumber);
    let found = false;
    queues.forEach(q => {
        const index = q.customers.findIndex(c => c.ticketNumber === tNumber);
        if (index !== -1) {
            q.customers.splice(index, 1);
            found = true;
        }
    });
    if (!found) return res.status(404).json({ error: 'Ticket not found' });
    res.json({ success: true });
});

//track real time queue positions
app.get('/queue/:queueId', (req, res) => {
    const queue = queues.find(q => q.id === parseInt(req.params.queueId));
    if (!queue) return res.status(404).json({ error: 'Queue not found' });
    res.json(queue.customers); // returns current customers with positions
});


//Staff features
//create queue
app.post('/queues', (req, res) =>{
    const {name} = req.body;
    const newQueue = {id: queues.length + 1, name, customers: []};
    queues.push(newQueue);
    res.json(newQueue)
 })
//delete queue
app.delete('/queues/:queueId', (req, res) => {
    const qId = parseInt(req.params.queueId);
    const index = queues.findIndex(q => q.id === qId);
    if (index === -1) return res.status(404).json({ error: 'Queue not found' });
    queues.splice(index, 1);
    res.json({ success: true });
});

//view current queue status
app.get('/queues', (req, res) => {
    //needs to get from database
    res.json(queues)
});
//call next customer
app.get('/next/:queueId', (req, res) => {
    const queue = queues.find(q => q.id === parseInt(req.params.queueId));
    if (!queue || queue.customers.length === 0)
        return res.status(404).json({ error: 'No customers in queue' });
    const nextCustomer = queue.customers.shift(); // remove first customer
    // update positions
    queue.customers.forEach((c, i) => c.position = i + 1);
    res.json(nextCustomer);
});

//add test customers for demontration
app.post('/test-customers/:queueId', (req, res) => {
    const queue = queues.find(q => q.id === parseInt(req.params.queueId));
    if (!queue) return res.status(404).json({ error: 'Queue not found' });

    for (let i = 0; i < 5; i++) {
        queue.customers.push({
            ticketNumber: ticketNumber++,
            name: `TestCustomer${i+1}`,
            position: queue.customers.length + 1
        });
    }
    res.json(queue.customers);
});

// Start server
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));