require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/blockchain-transcript',
  JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
  EMAIL_HOST: process.env.EMAIL_HOST || '',
  EMAIL_PORT: process.env.EMAIL_PORT || '',
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
};
