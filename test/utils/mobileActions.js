const fs = require('node:fs');
const path = require('node:path');

class MobileActions {
  constructor(driver) {
    this.driver = driver;
  }

  async resolveElement(selectorOrElement) {
    if (typeof selectorOrElement === 'string') {
      const element = await this.driver.$(selectorOrElement);
      await element.waitForDisplayed({ timeout: 15000 });
      return element;
    }

    await selectorOrElement.waitForDisplayed({ timeout: 15000 });
    return selectorOrElement;
  }

  async tap(selectorOrElement) {
    const element = await this.resolveElement(selectorOrElement);
    await element.click();
    return element;
  }

  async type(selectorOrElement, value, { clear = true, hideKeyboard = false } = {}) {
    const element = await this.resolveElement(selectorOrElement);

    if (clear) {
      await element.clearValue();
    }

    await element.setValue(value);

    if (hideKeyboard) {
      await this.hideKeyboardIfVisible();
    }

    return element;
  }

  async hideKeyboardIfVisible() {
    const isKeyboardShown = await this.driver.isKeyboardShown().catch(() => false);

    if (!isKeyboardShown) {
      return;
    }

    try {
      await this.driver.hideKeyboard();
    } catch (error) {
      await this.driver.back();
    }
  }

  async longPress(selectorOrElement, duration = 1000) {
    const element = await this.resolveElement(selectorOrElement);

    await this.driver.execute('mobile: longClickGesture', {
      elementId: element.elementId,
      duration,
    });
  }

  async doubleTap(selectorOrElement) {
    const element = await this.resolveElement(selectorOrElement);
    const rect = await element.getRect();

    await this.driver.execute('mobile: doubleClickGesture', {
      x: Math.round(rect.x + rect.width / 2),
      y: Math.round(rect.y + rect.height / 2),
    });
  }

  async swipeOnElement(selectorOrElement, direction = 'left', percent = 0.85) {
    const element = await this.resolveElement(selectorOrElement);

    await this.driver.execute('mobile: swipeGesture', {
      elementId: element.elementId,
      direction,
      percent,
    });
  }

  async scrollDownUntilVisible(selector, { maxScrolls = 6, percent = 0.85 } = {}) {
    for (let attempt = 0; attempt <= maxScrolls; attempt += 1) {
      const element = await this.driver.$(selector);
      if (await element.isDisplayed().catch(() => false)) {
        return element;
      }

      if (attempt === maxScrolls) {
        break;
      }

      const windowRect = await this.driver.getWindowRect();
      await this.driver.execute('mobile: scrollGesture', {
        left: 10,
        top: Math.round(windowRect.height * 0.2),
        width: Math.round(windowRect.width - 20),
        height: Math.round(windowRect.height * 0.6),
        direction: 'down',
        percent,
      });
    }

    throw new Error(`Element "${selector}" was not visible after ${maxScrolls} scrolls.`);
  }

  async waitForToast(text, timeout = 5000) {
    const selector = `//*[@text="${text}"]`;
    const element = await this.driver.$(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }

  async acceptNativeAlert(buttonText = 'OK') {
    const button = await this.driver.$(`//*[@text="${buttonText}"]`);
    await button.waitForDisplayed({ timeout: 10000 });
    await button.click();
  }

  async takeNamedScreenshot(name) {
    const safeName = name.replace(/[^a-z0-9-_]/gi, '_').toLowerCase();
    const screenshotsDir = path.join(process.cwd(), 'screenshots');
    fs.mkdirSync(screenshotsDir, { recursive: true });

    const filePath = path.join(screenshotsDir, `${safeName}.png`);
    const base64Image = await this.driver.takeScreenshot();
    fs.writeFileSync(filePath, base64Image, 'base64');

    return filePath;
  }
}

module.exports = MobileActions;
