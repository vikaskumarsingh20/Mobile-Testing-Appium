const { expect } = require('chai');
const { createAndroidDriver } = require('../../../utilities/driverFactory');

describe('Lesson 00 - Hello World with Android Settings', function () {
  let driver;

  before(async function () {
    this.timeout(120000);
    driver = await createAndroidDriver({ appProfile: 'settings' });
  });

  after(async function () {
    if (driver) {
      await driver.deleteSession();
    }
  });

  it('opens the Settings app so you can watch Appium control the emulator', async function () {
    this.timeout(120000);

    const activity = await driver.getCurrentActivity();
    const packageName = await driver.getCurrentPackage();

    console.log(`Current package: ${packageName}`);
    console.log(`Current activity: ${activity}`);

    expect(packageName).to.equal('com.android.settings');
    expect(activity.toLowerCase()).to.include('settings');
  });
});
