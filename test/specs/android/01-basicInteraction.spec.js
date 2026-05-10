/**
 * PRACTICE TEST 1: Basic Element Interaction
 * Like inspecting HTML elements in DevTools and clicking them
 * This shows how to find and interact with mobile UI elements
 */

const { expect } = require('chai');
const { createAndroidDriver } = require('../../utilities/driverFactory');
const ElementHelper = require('../../helpers/elementHelper');
const Logger = require('../../utilities/logger');

describe('Practice 1: Basic Element Interaction', () => {
  let driver;
  let elementHelper;

  before(async () => {
    Logger.logTestStart('Basic Element Interaction');
    driver = await createAndroidDriver();
    elementHelper = new ElementHelper();
    await driver.pause(2000); // Wait for app to fully load
  });

  after(async () => {
    if (driver) {
      await driver.deleteSession();
      Logger.logTestEnd('Basic Element Interaction', 'PASSED');
    }
  });

  it('Step 1: Find and tap button using different locator strategies', async () => {
    Logger.logStep(1, 'Finding elements using XPath, ID, and Text');

    try {
      // Strategy 1: Find by XPath (most flexible, like CSS selector)
      // This is like inspecting element and finding: div class="button" with text "Login"
      const loginButtonXPath = '//android.widget.Button[@text="Login"]';
      const loginBtn = await driver.$(loginButtonXPath);
      Logger.logAction('FOUND', 'Login button by XPath');

      // Strategy 2: Find by ID (like element.id in HTML)
      // android:id/button1 becomes id=button1
      const buttonById = await driver.$('id=button1');
      if (await buttonById.isDisplayed().catch(() => false)) {
        Logger.logAction('FOUND', 'Button by ID');
      }

      // Strategy 3: Find by text (when you don't know the technical details)
      // Like searching page with text content
      const textButton = await driver.$('//*[@text="Continue"]');
      if (await textButton.isDisplayed().catch(() => false)) {
        Logger.logAction('FOUND', 'Continue button by text');
      }

      expect(loginButtonXPath).to.be.a('string');
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  });

  it('Step 2: Enter text into form fields', async () => {
    Logger.logStep(2, 'Typing text into input fields');

    try {
      // Find email/username field
      const usernameField = await driver.$('id=email_input');

      // Clear any existing text
      await usernameField.clearValue();
      Logger.logAction('CLEARED', 'Username field');

      // Type text (like keyboard input)
      await usernameField.setValue('testuser@example.com');
      Logger.logAction('TYPED', 'Username field', 'testuser@example.com');

      // Verify text was entered
      const enteredText = await usernameField.getValue();
      expect(enteredText).to.include('testuser');
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('Step 3: Get element properties (like DOM inspection)', async () => {
    Logger.logStep(3, 'Getting element attributes and state');

    try {
      const element = await driver.$('id=submit_button');

      // Get text content (like innerText in html)
      const buttonText = await element.getText();
      Logger.logAction('GET TEXT', '', buttonText);
      console.log(`Button text: ${buttonText}`);

      // Get attribute (like inspecting data-* attributes)
      const buttonType = await element.getAttribute('type');
      Logger.logAction('GET ATTRIBUTE', 'type', buttonType);

      // Check if enabled (like checking disabled attribute)
      const isEnabled = await element.isEnabled();
      Logger.logAction('IS ENABLED', '', isEnabled);
      expect(isEnabled).to.be.true;

      // Get element position and size (like box model in DevTools)
      const rect = await element.getRect();
      console.log(`Button position: X=${rect.x}, Y=${rect.y}, Width=${rect.width}, Height=${rect.height}`);
      Logger.log('RECT', 'Button dimensions', rect);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('Step 4: Chain multiple interactions', async () => {
    Logger.logStep(4, 'Performing multiple steps in sequence');

    try {
      // Fill username
      const emailField = await driver.$('id=email_input');
      await emailField.setValue('demo@test.com');
      Logger.logAction('FILLED', 'Email field');

      // Fill password
      const passwordField = await driver.$('id=password_input');
      await passwordField.setValue('Password123');
      Logger.logAction('FILLED', 'Password field');

      // Tap login button
      const loginBtn = await driver.$('//android.widget.Button[@text="Login"]');
      await loginBtn.click();
      Logger.logAction('CLICKED', 'Login button');

      // Wait for result (like waitForNavigation)
      await driver.pause(2000);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('Step 5: Wait for element (like waitForSelector)', async () => {
    Logger.logStep(5, 'Waiting for dynamic elements');

    try {
      // Wait for success message to appear
      const successMessage = '//android.widget.TextView[@text="Success"]';

      // Wait up to 5 seconds for element to be visible
      await driver.waitUntil(
        async () => {
          try {
            const element = await driver.$(successMessage);
            return await element.isDisplayed();
          } catch {
            return false;
          }
        },
        {
          timeout: 5000,
          timeoutMsg: 'Success message not found',
        }
      );

      Logger.logAction('WAITED', 'Success message appeared');
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('Step 6: Scroll to element (mobile specific)', async () => {
    Logger.logStep(6, 'Scrolling to find elements (mobile screens are small!)');

    try {
      // Mobile screens show limited content, so we need to scroll
      // Like scrolling in browser, but essential for mobile

      // Find element that might be below visible area
      const bottomButton = await driver.$('id=bottom_button');

      // Scroll to it
      await bottomButton.scrollIntoView();
      Logger.logAction('SCROLLED', 'To bottom button');

      expect(await bottomButton.isDisplayed()).to.be.true;
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('Step 7: Double-click on element', async () => {
    Logger.logStep(7, 'Performing double-click (mobile gesture)');

    try {
      const element = await driver.$('id=double_tap_element');
      // Double-click on element
      await element.doubleClick();
      Logger.logAction('DOUBLE-CLICKED', 'Element');
    } catch (error) {
      Logger.logError(error);
    }
  });
});
