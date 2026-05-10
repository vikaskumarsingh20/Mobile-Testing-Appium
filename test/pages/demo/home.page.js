const BasePage = require('../base.page');

class HomePage extends BasePage {
  constructor(driver) {
    super(driver, '~Home-screen');
  }
}

module.exports = HomePage;
