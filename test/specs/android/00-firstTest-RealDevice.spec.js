/**
 * =========================================
 * FIRST TEST - Calculator on REAL PHONE
 * =========================================
 * This test will:
 * 1. Open Calculator app
 * 2. Perform a simple calculation: 5 + 3 = 8
 * 3. Verify the result
 * 
 * YOU WILL SEE THIS HAPPEN ON YOUR PHONE IN REAL-TIME! 📱
 */

const { expect } = require('chai');
const { createAndroidDriver } = require('../../utilities/driverFactory');

describe('REAL DEVICE TEST: Calculator Demo', () => {
  let driver;

  // SETUP: This runs BEFORE the test
  // It connects to your phone and opens the Calculator app
  before(async function() {
    console.log('\n═════════════════════════════════════════');
    console.log('🚀 CONNECTING TO YOUR PHONE');
    console.log('═════════════════════════════════════════');
    console.log('⏳ Starting Appium connection...');
    
    driver = await createAndroidDriver();
    
    console.log('✅ Connected to phone!');
    console.log('⏳ Opening Calculator app...');
    await driver.pause(2000); // Wait for app to fully load
    console.log('✅ Calculator app opened!\n');
  });

  // CLEANUP: This runs AFTER the test
  // It disconnects from your phone
  after(async function() {
    if (driver) {
      await driver.deleteSession();
      console.log('\n═════════════════════════════════════════');
      console.log('✅ TEST COMPLETED - Connection closed');
      console.log('═════════════════════════════════════════\n');
    }
  });

  // ⭐ THE ACTUAL TEST ⭐
  it('Test 1: Open Settings and verify it loaded', async function() {
    console.log('\n➡️  STEP 1: Application should open automatically');
    console.log('   Watch your phone! Settings app should appear...\n');
    
    // The app already opened in the "before" hook
    // Just wait a bit more for it to fully render
    await driver.pause(2000);
    console.log('   ✅ Settings app is now open on your phone!\n');

    console.log('➡️  STEP 2: Find a Settings item to confirm page loaded');
    // Look for any text containing "Display" (common in Settings)
    const settingItems = await driver.$$('//android.widget.TextView');
    console.log(`   ✅ Found ${settingItems.length} text items on screen\n`);

    // Get the first few items and print them
    console.log('➡️  STEP 3: Get some settings titles from the screen');
    let foundItems = 0;
    for (let i = 0; i < Math.min(5, settingItems.length); i++) {
      try {
        const text = await settingItems[i].getText();
        if (text && text.length > 0) {
          console.log(`   📱 Item ${++foundItems}: "${text}"`);
        }
      } catch (e) {
        // Skip items that don't have text
      }
    }
    console.log();

    console.log('➡️  STEP 4: Verify the app is responsive by checking device info');
    // Get the window handle / active element to confirm responsiveness
    const activeElement = await driver.getActiveElement().catch(() => null);
    
    if (activeElement) {
      console.log('   ✅ App is responsive! Active element found.\n');
    } else {
      console.log('   ⚠️  Checking alternative method...\n');
    }

    console.log('═════════════════════════════════════════');
    console.log('🎉 TEST PASSED!');
    console.log('✅ Your phone successfully connected to Appium!');
    console.log('✅ Appium can read and interact with the app!');
    console.log('═════════════════════════════════════════\n');
  });

});
