const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/signUp', userController.createUser);
router.post('/:id/signIn', userController.LonInUser);
router.post('/:id/logOut', userController.logOutUser);
router.put('/:id/edit', userController.updateUser);
router.delete('/:id/delete', userController.deleteUser);




module.exports = router;