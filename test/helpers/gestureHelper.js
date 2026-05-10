// Gesture Helper Functions
// Mobile-specific interactions (like Network Tab for mobile!)
// These are gestures you can't do with keyboard/mouse on web

class GestureHelper {
  /**
   * Swipe - Like dragging on mobile
   * Think: Network tab shows all requests, swipe shows all gestures
   */
  async swipe(startX, startY, endX, endY, duration = 500) {
    const performSwipe = new wd.TouchAction(driver);
    await performSwipe
      .press({ x: startX, y: startY })
      .wait(duration)
      .moveTo({ x: endX, y: endY })
      .release()
      .perform();
  }

  /**
   * Swipe up (scroll up)
   * Mobile page often longer than screen, so scroll needed
   */
  async swipeUp(startX = null, duration = 500) {
    const windowSize = await driver.getWindowSize();
    startX = startX || Math.round(windowSize.width / 2);
    const startY = Math.round(windowSize.height * 0.8);
    const endY = Math.round(windowSize.height * 0.2);

    await this.swipe(startX, startY, startX, endY, duration);
  }

  /**
   * Swipe down (scroll down)
   */
  async swipeDown(startX = null, duration = 500) {
    const windowSize = await driver.getWindowSize();
    startX = startX || Math.round(windowSize.width / 2);
    const startY = Math.round(windowSize.height * 0.2);
    const endY = Math.round(windowSize.height * 0.8);

    await this.swipe(startX, startY, startX, endY, duration);
  }

  /**
   * Swipe left
   */
  async swipeLeft(duration = 500) {
    const windowSize = await driver.getWindowSize();
    const startX = Math.round(windowSize.width * 0.8);
    const endX = Math.round(windowSize.width * 0.2);
    const startY = Math.round(windowSize.height / 2);

    await this.swipe(startX, startY, endX, startY, duration);
  }

  /**
   * Swipe right
   */
  async swipeRight(duration = 500) {
    const windowSize = await driver.getWindowSize();
    const startX = Math.round(windowSize.width * 0.2);
    const endX = Math.round(windowSize.width * 0.8);
    const startY = Math.round(windowSize.height / 2);

    await this.swipe(startX, startY, endX, startY, duration);
  }

  /**
   * Drag and drop
   * Mobile-specific gesture
   */
  async dragAndDrop(sourceElement, targetElement) {
    const sourceLocation = await sourceElement.getLocation();
    const targetLocation = await targetElement.getLocation();

    await this.swipe(
      sourceLocation.x,
      sourceLocation.y,
      targetLocation.x,
      targetLocation.y,
      1000
    );
  }

  /**
   * Multi-touch tap
   * Like Shift+Click or Ctrl+Click on web
   */
  async tapMultiple(positions) {
    // positions = [{x: 100, y: 200}, {x: 300, y: 400}]
    const performMultiTap = new wd.TouchAction(driver);
    positions.forEach((pos) => {
      performMultiTap.tap(pos);
    });
    await performMultiTap.perform();
  }

  /**
   * Pinch (zoom out)
   * Mobile-specific gesture
   */
  async pinch(duration = 1000) {
    const windowSize = await driver.getWindowSize();
    const centerX = Math.round(windowSize.width / 2);
    const centerY = Math.round(windowSize.height / 2);

    const finger1 = await new wd.TouchAction(driver)
      .press({ x: centerX - 100, y: centerY - 100 })
      .wait(100)
      .moveTo({ x: centerX, y: centerY })
      .release();

    const finger2 = await new wd.TouchAction(driver)
      .press({ x: centerX + 100, y: centerY + 100 })
      .wait(100)
      .moveTo({ x: centerX, y: centerY })
      .release();

    await driver.performTouchAction([finger1, finger2]);
  }

  /**
   * Zoom in
   * Mobile-pinch gesture inverse
   */
  async zoom(duration = 1000) {
    const windowSize = await driver.getWindowSize();
    const centerX = Math.round(windowSize.width / 2);
    const centerY = Math.round(windowSize.height / 2);

    const finger1 = await new wd.TouchAction(driver)
      .press({ x: centerX, y: centerY })
      .wait(100)
      .moveTo({ x: centerX - 100, y: centerY - 100 })
      .release();

    const finger2 = await new wd.TouchAction(driver)
      .press({ x: centerX, y: centerY })
      .wait(100)
      .moveTo({ x: centerX + 100, y: centerY + 100 })
      .release();

    await driver.performTouchAction([finger1, finger2]);
  }

  /**
   * Rotate device
   * Mobile-specific - web doesn't rotate!
   */
  async rotateDevice(orientation = 'LANDSCAPE') {
    // PORTRAIT or LANDSCAPE
    await driver.setOrientation(orientation);
  }

  /**
   * Get device orientation
   */
  async getOrientation() {
    return await driver.getOrientation();
  }

  /**
   * Shake device
   * Mobile-specific gesture
   */
  async shakeDevice() {
    await driver.shake();
  }
}

module.exports = GestureHelper;
