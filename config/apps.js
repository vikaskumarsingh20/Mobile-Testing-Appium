const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const appsDir = path.join(process.cwd(), 'apps');

const appProfiles = {
  settings: {
    key: 'settings',
    friendlyName: 'Android Settings',
    description: 'Preinstalled app used for the first visible Appium run.',
    appPackage: process.env.ANDROID_SETTINGS_PACKAGE || 'com.android.settings',
    appActivity: process.env.ANDROID_SETTINGS_ACTIVITY || 'com.android.settings.Settings',
  },
  demo: {
    key: 'demo',
    friendlyName: 'Sauce Labs My Demo App',
    description: 'Best app in this workspace for login, signup, forms, swipe, and cart flows.',
    app: process.env.ANDROID_APP_PATH || path.join(appsDir, 'Android-MyDemoAppRN.1.3.0.build-244.apk'),
    appPackage: 'com.saucelabs.mydemoapp.rn',
    appActivity: 'com.saucelabs.mydemoapp.rn.MainActivity',
    appWaitActivity: 'com.saucelabs.mydemoapp.rn.MainActivity',
  },
  apidemos: {
    key: 'apidemos',
    friendlyName: 'ApiDemos',
    description: 'Official Appium sample app for native Android controls.',
    app: path.join(appsDir, 'ApiDemos-debug.apk'),
    appPackage: 'io.appium.android.apis',
    appActivity: 'io.appium.android.apis.ApiDemos',
    appWaitActivity: 'io.appium.android.apis.ApiDemos',
  },
};

function getAppProfile(profileName = 'settings') {
  const profile = appProfiles[profileName];

  if (!profile) {
    throw new Error(
      `Unknown app profile "${profileName}". Valid profiles: ${Object.keys(appProfiles).join(', ')}`
    );
  }

  return profile;
}

function ensureProfileIsReady(profileName = 'settings') {
  const profile = getAppProfile(profileName);

  if (profile.app && !fs.existsSync(profile.app)) {
    throw new Error(
      [
        `APK missing for profile "${profileName}".`,
        `Expected path: ${profile.app}`,
        'Fix it by running one of these commands:',
        'npm run download:apps',
        'npm run download:demoapp',
        'npm run download:apidemos',
      ].join('\n')
    );
  }

  return profile;
}

module.exports = {
  appsDir,
  appProfiles,
  getAppProfile,
  ensureProfileIsReady,
};
