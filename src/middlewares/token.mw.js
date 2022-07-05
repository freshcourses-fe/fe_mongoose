const jwtService = require('../services/jwt.service');

module.exports.checkToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;

    const [authType, token] = authorization.split(' ');

    const verifiedToken = await jwtService.verifyAccessToken(token);

    console.log(verifiedToken);
    next();
  } catch (error) {
    next(error);
  }
};
