const userRouter = require('express').Router()
const UserController = require('../controllers/user.controller')
userRouter.post('/', UserController.createUser)
// userRouter.get('/')

module.exports = userRouter
