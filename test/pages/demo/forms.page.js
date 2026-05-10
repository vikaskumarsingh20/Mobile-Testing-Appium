const BasePage = require('../base.page');

class FormsPage extends BasePage {
  constructor(driver) {
    super(driver, '~Forms-screen');
  }

  get textInput() {
    return this.driver.$('~text-input');
  }

  get textResult() {
    return this.driver.$('~input-text-result');
  }

  get switch() {
    return this.driver.$('~switch');
  }

  get switchText() {
    return this.driver.$('~switch-text');
  }

  get dropdown() {
    return this.driver.$('~Dropdown');
  }

  get activeButton() {
    return this.driver.$('~button-Active');
  }

  get inactiveButton() {
    return this.driver.$('~button-Inactive');
  }

  async toggleSwitch() {
    await this.switch.click();
  }

  async isSwitchOn() {
    return (await this.switch.getAttribute('checked')) === 'true';
  }

  async openDropdown() {
    await this.dropdown.click();
  }

  async selectDropdownValue(value) {
    const option = await this.driver.$(`android=new UiSelector().text("${value}")`);
    await option.waitForDisplayed({ timeout: 10000 });
    await option.click();
  }

  async getDropdownValue() {
    return this.driver.$('//*[@content-desc="Dropdown"]//android.widget.EditText').getText();
  }

  async openActiveButtonAlert() {
    await this.activeButton.scrollIntoView({ maxScrolls: 2, scrollableElement: await this.screen });
    await this.activeButton.click();
  }
}

module.exports = FormsPage;
