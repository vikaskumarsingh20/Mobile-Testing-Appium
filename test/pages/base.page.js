class BasePage {
  constructor(driver, screenSelector) {
    this.driver = driver;
    this.screenSelector = screenSelector;
  }

  get screen() {
    return this.driver.$(this.screenSelector);
  }

  async waitForDisplayed(isDisplayed = true) {
    await this.screen.waitForDisplayed({
      timeout: 20000,
      reverse: !isDisplayed,
    });
  }
}

module.exports = BasePage;
