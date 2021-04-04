const express = require('express');
const { createQrCode, getQrCode, testQrisPreview } = require('../../controllers/qris');

const router = express.Router();

router.post('/', createQrCode);
router.get('/:external_id', getQrCode);
router.get('/test/:external_id', testQrisPreview);

module.exports = router;