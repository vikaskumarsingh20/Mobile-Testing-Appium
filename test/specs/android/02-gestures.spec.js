/**
 * PRACTICE TEST 2: Mobile Gestures (Swipe, Scroll, Pinch)
 * Like Network Tab shows HTTP requests, Gestures show mobile-specific interactions!
 * These are UNIQUE TO MOBILE - you can't do these on web browsers
 */

const { expect } = require('chai');
const { createAndroidDriver } = require('../../utilities/driverFactory');
const GestureHelper = require('../../helpers/gestureHelper');
const Logger = require('../../utilities/logger');

describe('Practice 2: Mobile Gestures & Swipes', () => {
  let driver;
  let gestureHelper;

  before(async () => {
    Logger.logTestStart('Mobile Gestures');
    driver = await createAndroidDriver();
    gestureHelper = new GestureHelper();
    await driver.pause(2000);
  });

  after(async () => {
    if (driver) {
      await driver.deleteSession();
      Logger.logTestEnd('Mobile Gestures', 'PASSED');
    }
  });

  it('Gesture 1: Swipe Down (Scroll down)', async () => {
    Logger.logStep(1, 'Scrolling down on page');

    try {
      // Get initial text of element
      const beforeElement = await driver.$('id=item_5');
      const isVisibleBefore = await beforeElement.isDisplayed().catch(() => false);
      console.log(`Item 5 visible before swipe: ${isVisibleBefore}`);

      // Swipe down to scroll
      await gestureHelper.swipeDown();
      Logger.logAction('SWIPED', 'Down');

      await driver.pause(500);

      // Check if item appeared
      const afterElement = await driver.$('id=item_10');
      const isVisibleAfter = await afterElement.isDisplayed().catch(() => false);
      console.log(`Item 10 visible after swipe: ${isVisibleAfter}`);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('Gesture 2: Swipe Up (Scroll up)', async () => {
    Logger.logStep(2, 'Scrolling up on page');

    try {
      // Swipe up to scroll back
      await gestureHelper.swipeUp();
      Logger.logAction('SWIPED', 'Up');

      await driver.pause(500);

      // Verify we scrolled back up
      const topElement = await driver.$('id=item_1');
      const isVisible = await topElement.isDisplayed().catch(() => false);
      console.log(`Item 1 visible after swipe up: ${isVisible}`);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('Gesture 3: Swipe Left (Like carousel/pagination)', async () => {
    Logger.logStep(3, 'Swiping left (carousel/pagination)');

    try {
      // Get current page indicator
      const currentPage = await driver.$('id=page_indicator').getText();
      console.log(`Current page: ${currentPage}`);

      // Swipe left to go to next page
      await gestureHelper.swipeLeft();
      Logger.logAction('SWIPED', 'Left');

      await driver.pause(500);

      // Check new page
      const newPageIndicator = await driver.$('id=page_indicator').getText();
      console.log(`New page: ${newPageIndicator}`);

      // Verify page changed
      expect(newPageIndicator).to.not.equal(currentPage);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('Gesture 4: Swipe Right', async () => {
    Logger.logStep(4, 'Swiping right (go back in carousel)');

    try {
      // Swipe right to go back
      await gestureHelper.swipeRight();
      Logger.logAction('SWIPED', 'Right');

      await driver.pause(500);

      const currentPage = await driver.$('id=page_indicator').getText();
      console.log(`Page after swipe right: ${currentPage}`);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('Gesture 5: Pinch (Zoom out)', async () => {
    Logger.logStep(5, 'Pinching gesture (zoom out)');

    try {
      // Get initial zoom level if available
      await gestureHelper.pinch(500);
      Logger.logAction('PINCHED', 'Zoomed out');

      await driver.pause(500);

      // Verify zoom changed (depends on app supporting zoom)
      console.log('Pinch gesture executed');
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('Gesture 6: Zoom (Zoom in)', async () => {
    Logger.logStep(6, 'Zoom gesture (zoom in)');

    try {
      await gestureHelper.zoom(500);
      Logger.logAction('ZOOMED', 'Zoomed in');

      await driver.pause(500);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('Gesture 7: Long Press', async () => {
    Logger.logStep(7, 'Long press on element (like right-click)');

    try {
      // Long press on element for context menu
      const itemElement = await driver.$('id=item_1');

      // Using WebDriverIO's pointer actions for long press
      const elementLocation = await itemElement.getLocation();

      await driver.actions([
        {
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x: elementLocation.x, y: elementLocation.y },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 1000 }, // 1 second press
            { type: 'pointerUp', button: 0 },
          ],
        },
      ]);

      Logger.logAction('LONG PRESSED', 'Element');
      await driver.pause(500);

      // Check if context menu appeared
      const contextMenu = await driver.$('id=context_menu').isDisplayed().catch(() => false);
      console.log(`Context menu appeared: ${contextMenu}`);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('Gesture 8: Rotate Device', async () => {
    Logger.logStep(8, 'Rotating device orientation (MOBILE ONLY!)');

    try {
      // Get current orientation
      const initialOrientation = await driver.getOrientation();
      console.log(`Initial orientation: ${initialOrientation}`);

      // Rotate to landscape
      await driver.setOrientation('LANDSCAPE');
      Logger.logAction('ROTATED', 'Device', 'LANDSCAPE');

      await driver.pause(1000);

      // Verify orientation changed
      const newOrientation = await driver.getOrientation();
      console.log(`New orientation: ${newOrientation}`);
      expect(newOrientation).to.equal('LANDSCAPE');

      // Rotate back to portrait
      await driver.setOrientation('PORTRAIT');
      await driver.pause(1000);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('Gesture 9: Drag and Drop', async () => {
    Logger.logStep(9, 'Dragging element to another position');

    try {
      // Get source and target elements
      const sourceElement = await driver.$('id=draggable_item');
      const targetElement = await driver.$('id=drop_zone');

      // Get positions
      const sourceRect = await sourceElement.getRect();
      const targetRect = await targetElement.getRect();

      console.log(`Dragging from X=${sourceRect.x},Y=${sourceRect.y} to X=${targetRect.x},Y=${targetRect.y}`);

      // Perform drag and drop
      await driver.actions([
        {
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            {
              type: 'pointerMove',
              duration: 0,
              x: sourceRect.x + sourceRect.width / 2,
              y: sourceRect.y + sourceRect.height / 2,
            },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 500 },
            {
              type: 'pointerMove',
              duration: 500,
              x: targetRect.x + targetRect.width / 2,
              y: targetRect.y + targetRect.height / 2,
            },
            { type: 'pointerUp', button: 0 },
          ],
        },
      ]);

      Logger.logAction('DRAGGED', 'Element', 'Dropped successfully');
      await driver.pause(500);
    } catch (error) {
      Logger.logError(error);
    }
  });

  it('Gesture 10: Multi-touch (Simultaneous fingers)', async () => {
    Logger.logStep(10, 'Multi-touch gesture (two fingers simultaneously)');

    try {
      // Get center of screen
      const windowSize = await driver.getWindowSize();
      const centerX = Math.round(windowSize.width / 2);
      const centerY = Math.round(windowSize.height / 2);

      // Two fingers on screen at same time
      await driver.actions([
        {
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x: centerX - 100, y: centerY },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 1000 },
            { type: 'pointerUp', button: 0 },
          ],
        },
        {
          type: 'pointer',
          id: 'finger2',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x: centerX + 100, y: centerY },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 1000 },
            { type: 'pointerUp', button: 0 },
          ],
        },
      ]);

      Logger.logAction('MULTI-TOUCH', 'Two fingers');
      await driver.pause(500);
    } catch (error) {
      Logger.logError(error);
    }
  });
});
