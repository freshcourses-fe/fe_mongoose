const authRouter = require('express').Router();
const AuthController = require('../controllers/auth.controller');

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);

module.exports = authRouter;
