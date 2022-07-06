const createHttpError = require('http-errors');
const RefreshToken = require('../db/models/refreshTokens');
const User = require('../db/models/user');
const jwtService = require('./jwt.service');

module.exports.createSession = async user => {
  const tokenPair = await jwtService.generateTokenPair({
    userId: user._id,
    email: user.email,
  });

  await RefreshToken.create({
    token: tokenPair.refreshToken,
    userId: user._id,
  });

  return {
    user,
    tokenPair,
  };
};

module.exports.refreshSession = async refreshTokenInstance => {
  const user = await User.findById(refreshTokenInstance.userId);

  if (!user) {
    throw new createHttpError(404, 'User not found');
  }

  const tokenPair = await jwtService.generateTokenPair({
    userId: user._id,
    email: user.email,
  });

  await RefreshToken.findOneAndUpdate(
    { token: refreshTokenInstance.token },
    { token: tokenPair.refreshToken }
  );

  return {
    user,
    tokenPair,
  };
};
