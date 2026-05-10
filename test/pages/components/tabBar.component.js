class TabBarComponent {
  constructor(driver) {
    this.driver = driver;
  }

  async waitForShown() {
    await this.driver.$('~Home').waitForDisplayed({ timeout: 20000 });
  }

  async openHome() {
    await this.driver.$('~Home').click();
  }

  async openLogin() {
    await this.driver.$('~Login').click();
  }

  async openForms() {
    await this.driver.$('~Forms').click();
  }

  async openSwipe() {
    await this.driver.$('~Swipe').click();
  }

  async openDrag() {
    await this.driver.$('~Drag').click();
  }
}

module.exports = TabBarComponent;
