const BasePage = require('../base.page');

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver, '~Login-screen');
  }

  get loginContainerButton() {
    return this.driver.$('~button-login-container');
  }

  get signUpContainerButton() {
    return this.driver.$('~button-sign-up-container');
  }

  get loginButton() {
    return this.driver.$('~button-LOGIN');
  }

  get signUpButton() {
    return this.driver.$('~button-SIGN UP');
  }

  get emailInput() {
    return this.driver.$('~input-email');
  }

  get passwordInput() {
    return this.driver.$('~input-password');
  }

  get repeatPasswordInput() {
    return this.driver.$('~input-repeat-password');
  }

  get alertTitle() {
    return this.driver.$('*//android.widget.TextView[@resource-id="com.wdiodemoapp:id/alert_title"]');
  }

  get alertMessage() {
    return this.driver.$('*//android.widget.TextView[@resource-id="android:id/message"]');
  }

  async openLoginContainer() {
    await this.loginContainerButton.click();
  }

  async openSignUpContainer() {
    await this.signUpContainerButton.click();
  }

  async dismissKeyboardIfShown() {
    const isKeyboardShown = await this.driver.isKeyboardShown().catch(() => false);
    if (isKeyboardShown) {
      await this.screen.click();
    }
  }

  async login(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.dismissKeyboardIfShown();
    await this.loginButton.scrollIntoView({ scrollableElement: await this.screen });
    await this.loginButton.click();
  }

  async signUp(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.repeatPasswordInput.setValue(password);
    await this.dismissKeyboardIfShown();
    await this.signUpButton.scrollIntoView({ scrollableElement: await this.screen });
    await this.signUpButton.click();
  }

  async readNativeAlertText() {
    await this.alertTitle.waitForDisplayed({ timeout: 10000 });
    const title = await this.alertTitle.getText();
    const message = await this.alertMessage.getText();
    return `${title}\n${message}`;
  }

  async closeNativeAlert(buttonText = 'OK') {
    const button = await this.driver.$(`//*[@text="${buttonText}"]`);
    await button.waitForDisplayed({ timeout: 10000 });
    await button.click();
  }
}

module.exports = LoginPage;
