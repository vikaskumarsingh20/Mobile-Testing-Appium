// Device Helper Functions
// Handle device-level interactions like connecting, permissions, etc.

class DeviceHelper {
  /**
   * Get device window size
   * Useful for gesture calculations and responsive testing
   */
  async getWindowSize() {
    return await driver.getWindowSize();
  }

  /**
   * Get device resolution
   */
  async getDeviceInfo() {
    const info = {
      size: await driver.getWindowSize(),
      orientation: await driver.getOrientation(),
      model: await driver.executeScript('mobile: getDeviceInfo', []),
    };
    return info;
  }

  /**
   * Hide keyboard
   * Important after typing, some screens blocked by keyboard
   */
  async hideKeyboard() {
    try {
      await driver.hideKeyboard();
    } catch {
      // Keyboard might already be hidden
    }
  }

  /**
   * Show keyboard
   */
  async showKeyboard() {
    try {
      await driver.showKeyboard();
    } catch {
      // Keyboard might already be shown
    }
  }

  /**
   * Grant permission
   * Android: camera, location, contacts, etc.
   */
  async grantPermission(permissionName) {
    await driver.executeScript('mobile: grantPermission', [{ name: permissionName }]);
  }

  /**
   * Deny permission
   */
  async denyPermission(permissionName) {
    await driver.executeScript('mobile: denyPermission', [{ name: permissionName }]);
  }

  /**
   * Press device button (home, back, etc.)
   */
  async pressKeyCode(keyCode) {
    // Android specific
    // 66 = ENTER
    // 4 = BACK
    // 82 = MENU
    return await driver.pressKeyCode(keyCode);
  }

  /**
   * Press back button
   */
  async pressBack() {
    await this.pressKeyCode(4);
  }

  /**
   * Press home button
   */
  async pressHome() {
    await this.pressKeyCode(3);
  }

  /**
   * Get device time
   */
  async getDeviceTime() {
    return await driver.getDeviceTime();
  }

  /**
   * Get battery info
   * Useful for long test runs
   */
  async getBatteryInfo() {
    const battery = await driver.executeScript('mobile: batteryInfo', []);
    return battery;
  }

  /**
   * Check network connectivity
   */
  async getNetworkConnection() {
    const connection = await driver.getNetworkConnection();
    // 0 = Airplane Mode
    // 1 = WiFi
    // 2 = Data
    // 4 = WiFi + Data
    return connection;
  }

  /**
   * Set network connection
   */
  async setNetworkConnection(type) {
    // type: 0, 1, 2, 4
    await driver.setNetworkConnection(type);
  }

  /**
   * Disable network (airplane mode)
   */
  async disableNetwork() {
    await this.setNetworkConnection(0);
  }

  /**
   * Enable WiFi
   */
  async enableWiFi() {
    await this.setNetworkConnection(1);
  }

  /**
   * Enable mobile data
   */
  async enableMobileData() {
    await this.setNetworkConnection(2);
  }

  /**
   * Open notifications panel
   */
  async openNotifications() {
    await driver.openNotifications();
  }

  /**
   * Pull file from device
   * Useful for logs, screenshots, etc.
   */
  async pullFile(path) {
    return await driver.pullFile(path);
  }

  /**
   * Push file to device
   */
  async pushFile(path, base64Data) {
    await driver.pushFile(path, base64Data);
  }

  /**
   * Get system time
   */
  async getSystemTime() {
    return new Date().toString();
  }

  /**
   * Lock device
   */
  async lockDevice() {
    await driver.lock();
  }

  /**
   * Unlock device
   */
  async unlockDevice() {
    await driver.unlock();
  }

  /**
   * Is device locked
   */
  async isLocked() {
    return await driver.isLocked();
  }

  /**
   * Get available input methods
   */
  async getAvailableIMEEngines() {
    return await driver.getAvailableIMEEngines();
  }

  /**
   * Activate keyboard
   */
  async activateIMEEngine(engine) {
    await driver.activateIMEEngine(engine);
  }
}

module.exports = DeviceHelper;
