const router = require('express').Router();
const userRouter = require('./user.router');
const { checkToken } = require('../middlewares/token.mw');

router.use('/users', userRouter);
router.get('/test', checkToken, (req, res, next) => {
  res.send({ message: 'authorized users only route' });
});

module.exports = router;
