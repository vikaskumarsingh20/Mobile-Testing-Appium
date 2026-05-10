require('dotenv').config();

const serverConfig = {
  protocol: 'http',
  host: process.env.APPIUM_HOST || '127.0.0.1',
  port: Number(process.env.APPIUM_PORT || 4723),
  path: process.env.APPIUM_BASE_PATH || '/',
};

module.exports = {
  serverConfig,
};
