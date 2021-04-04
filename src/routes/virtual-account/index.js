const express = require('express');
const { createVirtualAccount, getVirtualAccount } = require('../../controllers/virtual-account');

const router = express.Router();

router.post('/', createVirtualAccount);
router.get('/:id', getVirtualAccount);

module.exports = router