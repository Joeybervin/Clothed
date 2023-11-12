const pool = require('../connection_db');
const error = require('../utils/handle500Error');

/**
 * Get all the messages
 * @param {object} req - Express request object
 * @param {object} res - Express response object
**/
exports.getAllMessages = async(req, res) => {
    pool.query('SELECT * FROM Messages', (err, result) => {
        if (err) {
            return error.handleDatabaseError(err, res);
        } else {
            return res.status(200).json(result);
        }
    });
};

/**
 * Retrieve a message by its ID
 * @param {object} req - Express request object
 * @param {object} res - Express response object
**/
exports.getMessageById = async(req, res) => {
    const messageId = req.params.messageId
    pool.query('SELECT * FROM Messages WHERE id = $1', [messageId], (err, result) => {
        if (err) {
            return error.handleDatabaseError(err, res);
        } else {
            return res.status(200).json(result);
        }
    });
};

/**
 * Create a new message
 * @param {object} req - Express request object
 * @param {object} res - Express response object
**/
exports.createMessage = async(req, res) => {

    const { title, message_subject, message, order_id, user_email } = req.body
    pool.query('INSERT INTO Messages (title, message_subject, message, order_id, user_email) WHERE VALUES ($1, $2, $3, $4, $5);',
    [title, message_subject, message, order_id, user_email], (err, result) => {
        if (err) {
            return error.handleDatabaseError(err, res);
        } else {
            return res.status(200).json(result);
        }
    });
};

/**
 * Delete a message by ID
 * @param {object} req - Express request object
 * @param {object} res - Express response object
**/
exports.deleteMessage = async(req, res) => {
    const messageId = req.params.id;
    pool.query('DELETE Messages WHERE id = $1;', [messageId], (err, result) => {
        if (err) {
            return error.handleDatabaseError(err, res);
        }
        return res.status(201).json({message: "Message supprimé"});
    })
};

