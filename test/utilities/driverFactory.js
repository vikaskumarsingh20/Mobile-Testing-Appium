const wdio = require('webdriverio');
require('dotenv').config();
const { buildAndroidCapabilities } = require('../../config/capabilities');
const { serverConfig } = require('../../config/server');

function buildRemoteOptions(capabilities) {
  return {
    protocol: serverConfig.protocol,
    hostname: serverConfig.host,
    port: serverConfig.port,
    path: serverConfig.path,
    logLevel: process.env.WDIO_LOG_LEVEL || 'info',
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,
    capabilities,
  };
}

async function createAndroidDriver({ appProfile = process.env.ANDROID_APP_PROFILE || 'settings', capabilities = {} } = {}) {
  const finalCapabilities = buildAndroidCapabilities({
    appProfile,
    overrides: capabilities,
  });

  return wdio.remote(buildRemoteOptions(finalCapabilities));
}

async function createIOSDriver() {
  throw new Error(
    'iOS local execution is not supported on Windows. Use Android locally and move iOS to macOS or a cloud provider.'
  );
}

module.exports = {
  buildRemoteOptions,
  createAndroidDriver,
  createIOSDriver,
};
