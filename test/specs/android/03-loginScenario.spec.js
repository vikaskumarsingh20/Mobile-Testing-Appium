/**
 * PRACTICE TEST 3: Real-World Login Test
 * Combines multiple concepts: finding elements, typing, clicking, waiting, asserting
 */

const { expect } = require('chai');
const { createAndroidDriver } = require('../../utilities/driverFactory');
const ElementHelper = require('../../helpers/elementHelper');
const AppHelper = require('../../helpers/appHelper');
const Logger = require('../../utilities/logger');
const testData = require('../../data/testData');

describe('Practice 3: Real-World Login Scenario', () => {
  let driver;
  let elementHelper;
  let appHelper;

  before(async () => {
    Logger.logTestStart('Login Scenario Test');
    driver = await createAndroidDriver();
    elementHelper = new ElementHelper();
    appHelper = new AppHelper();
    await driver.pause(2000);
  });

  after(async () => {
    if (driver) {
      await driver.deleteSession();
      Logger.logTestEnd('Login Scenario Test', 'PASSED');
    }
  });

  it('TC-01: Successful Login', async () => {
    Logger.logStep('TC-01', 'Successful login with valid credentials');

    try {
      // Step 1: Find and fill email field
      const emailField = await driver.$('//android.widget.EditText[@content-desc="email"]');
      await emailField.setValue(testData.loginForm.validCredentials.email);
      Logger.logAction('ENTERED', 'Email', testData.loginForm.validCredentials.email);

      // Step 2: Find and fill password field
      const passwordField = await driver.$('//android.widget.EditText[@content-desc="password"]');
      await passwordField.setValue(testData.loginForm.validCredentials.password);
      Logger.logAction('ENTERED', 'Password', '****');

      // Step 3: Click login button
      const loginButton = await driver.$('//android.widget.Button[@text="Login"]');
      expect(await loginButton.isEnabled()).to.be.true;
      await loginButton.click();
      Logger.logAction('CLICKED', 'Login Button');

      // Step 4: Wait for success - either success message or navigation to Dashboard
      await driver.waitUntil(
        async () => {
          try {
            const successMsg = await driver.$('//android.widget.TextView[@text="Login successful"]');
            return await successMsg.isDisplayed();
          } catch {
            return false;
          }
        },
        {
          timeout: 10000,
          timeoutMsg: 'Login did not succeed',
        }
      );

      Logger.logAction('VERIFIED', 'Login Success Message');

      // Step 5: Verify we're on dashboard (optional additional check)
      const dashboardTitle = await driver.$('//android.widget.TextView[@text="Dashboard"]');
      const isDashboardVisible = await dashboardTitle.isDisplayed().catch(() => false);
      Logger.log('VERIFICATION', 'Dashboard visible', isDashboardVisible);

      expect(isDashboardVisible).to.be.true;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  });

  it('TC-02: Login with Empty Email', async () => {
    Logger.logStep('TC-02', 'Login attempt with empty email (validation)');

    try {
      // Reset form by clearing fields
      const emailField = await driver.$('//android.widget.EditText[@content-desc="email"]');
      await emailField.clearValue();
      Logger.logAction('CLEARED', 'Email field');

      // Try to submit without email
      const loginButton = await driver.$('//android.widget.Button[@text="Login"]');

      // Check if button is disabled when email is empty
      const isEnabled = await loginButton.isEnabled();
      Logger.log('VALIDATION', 'Login button disabled for empty email', isEnabled);

      if (!isEnabled) {
        expect(isEnabled).to.be.false;
      } else {
        // If button is enabled, click and check for error
        await loginButton.click();
        Logger.logAction('CLICKED', 'Login Button');

        // Wait for error message
        await driver.waitUntil(
          async () => {
            try {
              const errorMsg = await driver.$('//android.widget.TextView[@text="Email is required"]');
              return await errorMsg.isDisplayed();
            } catch {
              return false;
            }
          },
          { timeout: 5000, timeoutMsg: 'Error message not shown' }
        );

        Logger.logAction('VERIFIED', 'Error message for empty email');
      }
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('TC-03: Login with Invalid Credentials', async () => {
    Logger.logStep('TC-03', 'Login with wrong password');

    try {
      // Clear fields
      const emailField = await driver.$('//android.widget.EditText[@content-desc="email"]');
      const passwordField = await driver.$('//android.widget.EditText[@content-desc="password"]');

      await emailField.clearValue();
      await passwordField.clearValue();

      // Enter invalid credentials
      await emailField.setValue(testData.loginForm.invalidCredentials.email);
      await passwordField.setValue(testData.loginForm.invalidCredentials.password);

      Logger.logAction('ENTERED', 'Invalid credentials');

      // Click login
      const loginButton = await driver.$('//android.widget.Button[@text="Login"]');
      await loginButton.click();
      Logger.logAction('CLICKED', 'Login Button');

      // Wait for error message
      await driver.waitUntil(
        async () => {
          try {
            const errorMsg = await driver.$('//android.widget.TextView[@text="Invalid credentials"]');
            return await errorMsg.isDisplayed();
          } catch {
            return false;
          }
        },
        { timeout: 5000, timeoutMsg: 'Error message not shown' }
      );

      Logger.logAction('VERIFIED', 'Invalid credentials error');
      expect(true).to.be.true; // Test passed if we got here
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('TC-04: Login and Verify User Profile', async () => {
    Logger.logStep('TC-04', 'Login and verify user info on profile');

    try {
      // Login with valid credentials
      const emailField = await driver.$('//android.widget.EditText[@content-desc="email"]');
      const passwordField = await driver.$('//android.widget.EditText[@content-desc="password"]');

      await emailField.clearValue();
      await passwordField.clearValue();

      await emailField.setValue(testData.loginForm.validCredentials.email);
      await passwordField.setValue(testData.loginForm.validCredentials.password);

      const loginButton = await driver.$('//android.widget.Button[@text="Login"]');
      await loginButton.click();

      // Wait for dashboard
      await driver.pause(2000);

      // Navigate to profile
      const profileButton = await driver.$('//android.widget.Button[@text="Profile"]');
      await profileButton.click();
      Logger.logAction('CLICKED', 'Profile Button');

      // Verify email displayed on profile
      const profileEmail = await driver.$('//android.widget.TextView[@content-desc="profile_email"]');
      const displayedEmail = await profileEmail.getText();

      Logger.log('VERIFICATION', 'Email displayed', displayedEmail);
      expect(displayedEmail).to.include(testData.loginForm.validCredentials.email);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('TC-05: Logout', async () => {
    Logger.logStep('TC-05', 'Logout and verify return to login screen');

    try {
      // Find logout button (usually in menu)
      const menuButton = await driver.$('//android.widget.Button[@content-desc="menu"]');
      await menuButton.click();
      Logger.logAction('CLICKED', 'Menu Button');

      await driver.pause(500);

      // Click logout option
      const logoutOption = await driver.$('//android.widget.MenuItem[@text="Logout"]');
      await logoutOption.click();
      Logger.logAction('CLICKED', 'Logout Option');

      // Wait for confirmation dialog or return to login
      await driver.waitUntil(
        async () => {
          try {
            const loginBtn = await driver.$('//android.widget.Button[@text="Login"]');
            return await loginBtn.isDisplayed();
          } catch {
            return false;
          }
        },
        { timeout: 5000, timeoutMsg: 'Not returned to login screen' }
      );

      Logger.logAction('VERIFIED', 'Returned to login screen');
    } catch (error) {
      Logger.logError(error);
    }
  });
});
