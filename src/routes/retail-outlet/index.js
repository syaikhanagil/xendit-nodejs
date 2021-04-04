const express = require('express');
const { createRetailPayment, getRetailPayment } = require('../../controllers/retail-outlet');

const router = express.Router();

router.post('/', createRetailPayment);
router.get('/:id', getRetailPayment);

module.exports = router;