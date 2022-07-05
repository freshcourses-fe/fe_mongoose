const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { JWT_SECRET, JWT_EXPIRATION_TIME } = require('../constants');

const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

const createToken = (payload, { expiresIn, secret }) =>
  jwtSign(payload, secret, { expiresIn });
  
const verifyToken = (token, secret) => jwtVerify(token, secret);

module.exports.createAccessToken = async payload =>
  await createToken(payload, {
    expiresIn: JWT_EXPIRATION_TIME,
    secret: JWT_SECRET,
  });


module.exports.verifyAccessToken = async token =>
  verifyToken(token, JWT_SECRET);
