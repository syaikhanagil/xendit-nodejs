const express = require('express');
const { createInvoice, getInvoice } = require('../../controllers/invoice');

const router = express.Router();

router.post('/', createInvoice);
router.get('/:id', getInvoice);

module.exports = router;