const assert = require('node:assert/strict');
const test = require('node:test');
const MobileActions = require('../utils/mobileActions');

test('scrollDownUntilVisible checks visibility after the final allowed scroll', async () => {
  let scrollCount = 0;
  let visible = false;
  const expectedSelector = 'accessibility id:target';
  const driver = {
    async $(selector) {
      assert.equal(selector, expectedSelector);
      return { async isDisplayed() { return visible; } };
    },
    async getWindowRect() {
      return { width: 400, height: 800 };
    },
    async execute(command, options) {
      assert.equal(command, 'mobile: scrollGesture');
      assert.equal(options.direction, 'down');
      scrollCount += 1;
      if (scrollCount === 2) visible = true;
    },
  };

  const element = await new MobileActions(driver).scrollDownUntilVisible(expectedSelector, {
    maxScrolls: 2,
  });

  assert.equal(await element.isDisplayed(), true);
  assert.equal(scrollCount, 2);
});

test('scrollDownUntilVisible fails after the configured scroll limit', async () => {
  let scrollCount = 0;
  const driver = {
    async $() {
      return { async isDisplayed() { return false; } };
    },
    async getWindowRect() {
      return { width: 400, height: 800 };
    },
    async execute() {
      scrollCount += 1;
    },
  };

  await assert.rejects(
    new MobileActions(driver).scrollDownUntilVisible('accessibility id:missing', { maxScrolls: 1 }),
    /was not visible after 1 scrolls/
  );
  assert.equal(scrollCount, 1);
});
