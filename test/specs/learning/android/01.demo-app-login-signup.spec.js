const { expect } = require('chai');
const { createAndroidDriver } = require('../../../utilities/driverFactory');
const accounts = require('../../../data/accounts');
const HomePage = require('../../../pages/demo/home.page');
const LoginPage = require('../../../pages/demo/login.page');
const TabBarComponent = require('../../../pages/components/tabBar.component');

describe('Lesson 01 - Demo App Login and Signup', function () {
  let driver;
  let homePage;
  let loginPage;
  let tabBar;

  before(async function () {
    this.timeout(120000);
    driver = await createAndroidDriver({ appProfile: 'demo' });
    homePage = new HomePage(driver);
    loginPage = new LoginPage(driver);
    tabBar = new TabBarComponent(driver);
  });

  after(async function () {
    if (driver) {
      await driver.deleteSession();
    }
  });

  it('logs in with valid credentials', async function () {
    await homePage.waitForDisplayed();
    await tabBar.openLogin();
    await loginPage.waitForDisplayed();
    await loginPage.openLoginContainer();
    await loginPage.login(accounts.demoAppUser.email, accounts.demoAppUser.password);

    const alertText = await loginPage.readNativeAlertText();
    console.log(`Login alert:\n${alertText}`);

    expect(alertText).to.include('Success');
    await loginPage.closeNativeAlert('OK');
  });

  it('signs up with valid credentials', async function () {
    await tabBar.openLogin();
    await loginPage.waitForDisplayed();
    await loginPage.openSignUpContainer();
    await loginPage.signUp(accounts.secondDemoUser.email, accounts.secondDemoUser.password);

    const alertText = await loginPage.readNativeAlertText();
    console.log(`Signup alert:\n${alertText}`);

    expect(alertText).to.include('Signed Up');
    await loginPage.closeNativeAlert('OK');
  });
});
