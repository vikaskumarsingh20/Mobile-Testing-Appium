const BasePage = require('../base.page');

class DragPage extends BasePage {
  constructor(driver) {
    super(driver, '~Drag-drop-screen');
  }

  get dragL1() {
    return this.driver.$('~drag-l1');
  }

  get dropL1() {
    return this.driver.$('~drop-l1');
  }

  get retryButton() {
    return this.driver.$('~button-Retry');
  }
}

module.exports = DragPage;
