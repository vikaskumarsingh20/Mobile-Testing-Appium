require('dotenv').config();
const { ensureProfileIsReady } = require('./apps');

function toBoolean(value, defaultValue = false) {
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }

  return String(value).toLowerCase() === 'true';
}

function toNumber(value) {
  return value ? Number(value) : undefined;
}

function removeEmptyValues(object) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
}

function buildAndroidCapabilities({ appProfile = process.env.ANDROID_APP_PROFILE || 'settings', overrides = {} } = {}) {
  const profile = ensureProfileIsReady(appProfile);

  const baseCapabilities = {
    platformName: process.env.ANDROID_PLATFORM_NAME || 'Android',
    'appium:automationName': process.env.ANDROID_AUTOMATION_NAME || 'UiAutomator2',
    'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
    'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || undefined,
    'appium:udid': process.env.ANDROID_UDID || undefined,
    'appium:avd': process.env.ANDROID_AVD || undefined,
    'appium:noReset': toBoolean(process.env.ANDROID_NO_RESET, false),
    'appium:fullReset': toBoolean(process.env.ANDROID_FULL_RESET, false),
    'appium:newCommandTimeout': toNumber(process.env.ANDROID_NEW_COMMAND_TIMEOUT) || 240,
    'appium:autoGrantPermissions': true,
    'appium:ignoreHiddenApiPolicyError': true,
    'appium:disableWindowAnimation': true,
    'appium:app': profile.app,
    'appium:appPackage': profile.appPackage,
    'appium:appActivity': profile.appActivity,
    'appium:appWaitActivity': profile.appWaitActivity,
  };

  return removeEmptyValues({
    ...baseCapabilities,
    ...overrides,
  });
}

module.exports = {
  buildAndroidCapabilities,
};
