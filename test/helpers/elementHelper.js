// Element Helper Functions
// This is like INSPECT + interactions in browser DevTools
// Instead of CSS selectors, Appium uses different locator strategies

class ElementHelper {
  /**
   * Find element by different locator strategies
   * Think of this like element inspection in DevTools
   */

  // XPath - Works like CSS/XPath in web
  async findByXpath(xpath) {
    // Example: //android.widget.Button[@text='Login']
    return await driver.$(`//${xpath}`);
  }

  // ID - Element's resource-id (Android) or accessibility-id
  async findById(id, isAccessibilityId = false) {
    if (isAccessibilityId) {
      return await driver.$(`~${id}`); // Accessibility ID
    }
    return await driver.$(`id=${id}`); // Resource ID
  }

  // Text - Find by visible text (like inspect element finds text)
  async findByText(text, isPartialMatch = false) {
    if (isPartialMatch) {
      return await driver.$(`//*[contains(@text, '${text}')]`);
    }
    return await driver.$(`//*[@text='${text}']`);
  }

  // Content Description - Element's content description
  async findByContentDesc(description) {
    return await driver.$(`//*[@content-desc='${description}']`);
  }

  // Android-specific: Class Name
  async findByClassName(className) {
    return await driver.$(`android.widget.${className}`);
  }

  /**
   * Tap/Click element
   * Mobile equivalent: Click
   */
  async tapElement(element) {
    await element.click();
  }

  /**
   * Double tap
   * Mobile specific
   */
  async doubleTap(element) {
    await element.doubleClick();
  }

  /**
   * Long press (like right-click)
   * Mobile specific
   */
  async longPress(element, duration = 1000) {
    await element.perform(function (browser) {
      browser.longPressAction({
        element: element.elementId,
        duration: duration,
      });
    });
  }

  /**
   * Input text
   * Mobile equivalent: Type
   */
  async inputText(element, text) {
    await element.setValue(text);
  }

  /**
   * Clear text field
   */
  async clearText(element) {
    await element.clearValue();
  }

  /**
   * Get text from element
   * Like inspect and get innerText
   */
  async getText(element) {
    return await element.getText();
  }

  /**
   * Get element attribute
   * Like inspecting element and checking attributes
   */
  async getAttribute(element, attributeName) {
    return await element.getAttribute(attributeName);
  }

  /**
   * Check if element is displayed
   */
  async isDisplayed(element) {
    return await element.isDisplayed();
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(element) {
    return await element.isEnabled();
  }

  /**
   * Wait for element to appear
   * Like waitForSelector in Playwright
   */
  async waitForElement(locator, timeout = 10000) {
    return await driver.$(locator).waitForDisplayed({
      timeout: timeout,
    });
  }

  /**
   * Scroll to element
   * Mobile specific - necessary because screen is small
   */
  async scrollToElement(element) {
    await element.scrollIntoView();
  }

  /**
   * Get element size and location
   * Like inspect and see box model
   */
  async getElementRect(element) {
    return await element.getRect();
  }
}

module.exports = ElementHelper;
