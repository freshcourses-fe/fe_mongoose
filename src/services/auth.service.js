const jwtService = require('./jwt.service');

module.exports.createSession = async user => {
  const token = await jwtService.createAccessToken({
    userId: user._id,
    email: user.email,
  });

  return {
    user,
    token,
  };
};
