const BasePage = require('../base.page');

class SwipePage extends BasePage {
  constructor(driver) {
    super(driver, '~Swipe-screen');
  }

  get carousel() {
    return this.driver.$('//*[@resource-id="Carousel"]');
  }

  get firstCard() {
    return this.driver.$('//*[@resource-id="__CAROUSEL_ITEM_0__"]');
  }

  get secondCard() {
    return this.driver.$('//*[@resource-id="__CAROUSEL_ITEM_1__"]');
  }

  get webdriverIoLogo() {
    return this.driver.$('~WebdriverIO logo');
  }

  async isCardActive(cardElement) {
    const rect = await cardElement.getRect();
    return rect.x === 0;
  }
}

module.exports = SwipePage;
