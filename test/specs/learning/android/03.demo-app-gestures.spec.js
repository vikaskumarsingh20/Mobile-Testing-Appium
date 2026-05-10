const { expect } = require('chai');
const { createAndroidDriver } = require('../../../utilities/driverFactory');
const HomePage = require('../../../pages/demo/home.page');
const SwipePage = require('../../../pages/demo/swipe.page');
const DragPage = require('../../../pages/demo/drag.page');
const TabBarComponent = require('../../../pages/components/tabBar.component');
const MobileActions = require('../../../utils/mobileActions');

describe('Lesson 03 - Demo App Gestures', function () {
  let driver;
  let homePage;
  let swipePage;
  let dragPage;
  let tabBar;
  let mobileActions;

  before(async function () {
    this.timeout(120000);
    driver = await createAndroidDriver({ appProfile: 'demo' });
    homePage = new HomePage(driver);
    swipePage = new SwipePage(driver);
    dragPage = new DragPage(driver);
    tabBar = new TabBarComponent(driver);
    mobileActions = new MobileActions(driver);
  });

  after(async function () {
    if (driver) {
      await driver.deleteSession();
    }
  });

  it('swipes the horizontal carousel', async function () {
    await homePage.waitForDisplayed();
    await tabBar.openSwipe();
    await swipePage.waitForDisplayed();

    const firstCardActiveBefore = await swipePage.isCardActive(await swipePage.firstCard);
    expect(firstCardActiveBefore).to.equal(true);

    await mobileActions.swipeOnElement(await swipePage.carousel, 'left');

    const secondCardActiveAfter = await swipePage.isCardActive(await swipePage.secondCard);
    expect(secondCardActiveAfter).to.equal(true);
  });

  it('scrolls vertically until the WebdriverIO logo is visible', async function () {
    await tabBar.openSwipe();
    await swipePage.waitForDisplayed();

    await swipePage.webdriverIoLogo.scrollIntoView({
      scrollableElement: await swipePage.screen,
      direction: 'up',
      maxScrolls: 5,
      percent: 0.99,
    });

    expect(await swipePage.webdriverIoLogo.isDisplayed()).to.equal(true);
  });

  it('drags one puzzle piece to its target', async function () {
    await tabBar.openDrag();
    await dragPage.waitForDisplayed();

    await (await dragPage.dragL1).dragAndDrop(await dragPage.dropL1);
    const screenshotPath = await mobileActions.takeNamedScreenshot('drag-piece-l1');
    console.log(`Saved screenshot: ${screenshotPath}`);
  });
});
