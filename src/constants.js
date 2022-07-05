const CONSTANTS = {
  DB_NAME: process.env.DB_NAME || 'test',
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/',
  JWT_SECRET : 'secret_key_12343532DFSL',
  JWT_EXPIRATION_TIME: '1m'
}

module.exports = CONSTANTS
