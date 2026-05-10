const { expect } = require('chai');
const { createAndroidDriver } = require('../../../utilities/driverFactory');
const MobileActions = require('../../../utils/mobileActions');

describe('Lesson 04 - ApiDemos Native Android Controls', function () {
  let driver;
  let mobileActions;

  before(async function () {
    this.timeout(120000);
    driver = await createAndroidDriver({ appProfile: 'apidemos' });
    mobileActions = new MobileActions(driver);
  });

  after(async function () {
    if (driver) {
      await driver.deleteSession();
    }
  });

  it('handles checkbox and radio button controls', async function () {
    await mobileActions.tap('android=new UiSelector().text("Views")');
    await mobileActions.scrollDownUntilVisible('android=new UiSelector().text("Controls")');
    await mobileActions.tap('android=new UiSelector().text("Controls")');
    await mobileActions.tap('android=new UiSelector().text("1. Light Theme")');

    const checkbox1 = await driver.$('android=new UiSelector().text("Checkbox 1")');
    await checkbox1.click();

    const radioButton2 = await driver.$('android=new UiSelector().text("RadioButton 2")');
    await radioButton2.click();

    expect(await checkbox1.getAttribute('checked')).to.equal('true');
    expect(await radioButton2.getAttribute('checked')).to.equal('true');
  });

  it('opens a dialog and handles the alert buttons', async function () {
    await driver.activateApp('io.appium.android.apis');

    await mobileActions.tap('android=new UiSelector().text("App")');
    await mobileActions.tap('android=new UiSelector().text("Alert Dialogs")');
    await mobileActions.tap('android=new UiSelector().text("OK Cancel dialog with a message")');

    const okButton = await driver.$('android=new UiSelector().text("OK")');
    const cancelButton = await driver.$('android=new UiSelector().text("Cancel")');

    expect(await okButton.isDisplayed()).to.equal(true);
    expect(await cancelButton.isDisplayed()).to.equal(true);

    await cancelButton.click();
  });

  it('performs a long press on an expandable list item', async function () {
    await driver.activateApp('io.appium.android.apis');

    await mobileActions.tap('android=new UiSelector().text("Views")');
    await mobileActions.scrollDownUntilVisible('android=new UiSelector().text("Expandable Lists")');
    await mobileActions.tap('android=new UiSelector().text("Expandable Lists")');
    await mobileActions.tap('android=new UiSelector().text("1. Custom Adapter")');

    const peopleNames = await driver.$('android=new UiSelector().text("People Names")');
    await mobileActions.longPress(peopleNames, 1500);

    const sampleMenu = await driver.$('android=new UiSelector().text("Sample menu")');
    await sampleMenu.waitForDisplayed({ timeout: 10000 });
    expect(await sampleMenu.isDisplayed()).to.equal(true);
  });
});
