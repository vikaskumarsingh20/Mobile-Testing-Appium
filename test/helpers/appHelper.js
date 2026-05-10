// App Helper Functions
// Common methods for app interaction (like utilities in Cypress/Playwright)

class AppHelper {
  /**
   * Launch app by bundle ID (iOS) or package (Android)
   * @param {string} bundleId - Bundle ID or Package name
   */
  async launchApp(bundleId) {
    await driver.activateApp(bundleId);
  }

  /**
   * Close/Terminate app
   * @param {string} bundleId - Bundle ID or Package name
   */
  async closeApp(bundleId) {
    await driver.removeApp(bundleId);
  }

  /**
   * Reset app to initial state
   */
  async resetApp() {
    await driver.resetApp();
  }

  /**
   * Get app state
   * @returns {number} 0=not installed, 1=not running, 2=running in background, 4=running foreground
   */
  async getAppState(bundleId) {
    return await driver.queryAppState(bundleId);
  }

  /**
   * Wait for app to be in foreground
   */
  async waitForAppInForeground(bundleId, timeout = 10000) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const state = await this.getAppState(bundleId);
      if (state === 4) {
        return true;
      }
      await driver.pause(500);
    }
    throw new Error(`App not in foreground after ${timeout}ms`);
  }

  /**
   * Get app activity (Android only)
   */
  async getCurrentActivity() {
    return await driver.getCurrentActivity();
  }

  /**
   * Take screenshot
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    const screenshot = await driver.takeScreenshot();
    console.log(`Screenshot taken: ${name}`);
    return screenshot;
  }
}

module.exports = AppHelper;
