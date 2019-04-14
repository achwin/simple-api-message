const express = require('express');
const expressWs = require('express-ws')(express);
const router = express.Router();
const messages = require('../controllers/messages.controller.js');

// Send a message
router.post('/messages', messages.store);
// Get all sent message
router.get('/messages', messages.index);
// Websocket for display message when there are a new message
router.ws('/messages', messages.websocket);

module.exports = router;