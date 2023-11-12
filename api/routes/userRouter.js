const express = require('express');
const router = express.Router();
const { oneOf } = require('express-validator');
const userController = require('../controllers/userController');
const { signUpUserSchema, signInUserSchema, editProfilSchema } = require('../middleware/validators/userSchema.js');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

router.get('/:id/profile', userController.getUserProfileById);
router.post('/signUp', oneOf(signUpUserSchema), userController.signUpUser);
router.post('/:id/signIn',oneOf(signInUserSchema),  userController.signInUser);
router.post('/:id/logOut', userController.logOutUser);

router.put('/edit', oneOf(editProfilSchema), userController.updateUserMainInfos);

module.exports = router;