const express = require('express');
const cors = require('cors');
const vaRoute = require('./src/routes/virtual-account');
const retailRoute = require('./src/routes/retail-outlet');
const invoiceRoute = require('./src/routes/invoice');
const qrisRoute = require('./src/routes/qris');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PATCH'],
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/va', vaRoute);
app.use('/retail', retailRoute);
app.use('/invoice', invoiceRoute);
app.use('/qris', qrisRoute);

app.listen(PORT, () => {
    console.log('====================================');
    console.log('APP Running on http://localhost:' + PORT);
    console.log('====================================');
})