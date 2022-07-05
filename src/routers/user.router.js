const userRouter = require('express').Router();
const UserController = require('../controllers/user.controller');
const authRouter = require('./auth.router');
userRouter.use('/auth', authRouter);

userRouter.get('/', UserController.getUsers);

userRouter.get('/:userId', UserController.getUser);
userRouter.put('/:userId', UserController.updateUser);
userRouter.delete('/:userId', UserController.deleteUser);

module.exports = userRouter;
