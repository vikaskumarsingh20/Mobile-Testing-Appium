const { expect } = require('chai');
const { createAndroidDriver } = require('../../../utilities/driverFactory');
const HomePage = require('../../../pages/demo/home.page');
const FormsPage = require('../../../pages/demo/forms.page');
const TabBarComponent = require('../../../pages/components/tabBar.component');
const LoginPage = require('../../../pages/demo/login.page');

describe('Lesson 02 - Demo App Forms, Switches, Dropdowns, and Alerts', function () {
  let driver;
  let homePage;
  let formsPage;
  let loginPage;
  let tabBar;

  before(async function () {
    this.timeout(120000);
    driver = await createAndroidDriver({ appProfile: 'demo' });
    homePage = new HomePage(driver);
    formsPage = new FormsPage(driver);
    loginPage = new LoginPage(driver);
    tabBar = new TabBarComponent(driver);
  });

  after(async function () {
    if (driver) {
      await driver.deleteSession();
    }
  });

  it('types into the form input and validates the result text', async function () {
    const sampleText = 'Appium practical learning';

    await homePage.waitForDisplayed();
    await tabBar.openForms();
    await formsPage.waitForDisplayed();
    await formsPage.textInput.setValue(sampleText);

    const resultText = await formsPage.textResult.getText();
    expect(resultText).to.include(sampleText);
  });

  it('toggles the switch and validates the state change', async function () {
    await tabBar.openForms();
    await formsPage.waitForDisplayed();

    const stateBefore = await formsPage.isSwitchOn();
    await formsPage.toggleSwitch();
    const stateAfter = await formsPage.isSwitchOn();

    expect(stateAfter).to.not.equal(stateBefore);
  });

  it('selects a dropdown value and validates the selected text', async function () {
    const option = 'webdriver.io is awesome';

    await tabBar.openForms();
    await formsPage.waitForDisplayed();
    await formsPage.openDropdown();
    await formsPage.selectDropdownValue(option);

    const selectedValue = await formsPage.getDropdownValue();
    expect(selectedValue).to.include(option);
  });

  it('opens and validates the active button alert', async function () {
    await tabBar.openForms();
    await formsPage.waitForDisplayed();
    await formsPage.openActiveButtonAlert();

    const alertText = await loginPage.readNativeAlertText();
    expect(alertText).to.include('This button is active');
    await loginPage.closeNativeAlert('OK');
  });
});
