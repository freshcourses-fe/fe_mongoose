const router = require('express').Router();
const userRouter = require('./user.router');
const { checkAccessToken } = require('../middlewares/token.mw');
const MesagesController = require('../controllers/message.controller');

router.use('/users', userRouter);
router.get('/test', checkAccessToken, (req, res, next) => {
  res.send({ message: 'authorized users only route' });
});
router.get('/messages', MesagesController.getMesages);

module.exports = router;
