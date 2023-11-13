const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authentificationSecurity } = require('../middleware/authentificationSecurity.js');

router.get('/', authentificationSecurity('admin'), messageController.getAllMessages);
router.get('/', authentificationSecurity, messageController.getAllUserMessages);
router.get('/:id', authentificationSecurity('admin'), messageController.getMessageById);

router.post('/', messageController.createMessage);

router.delete('/:id', authentificationSecurity('admin'), messageController.deleteMessage);

module.exports = router;