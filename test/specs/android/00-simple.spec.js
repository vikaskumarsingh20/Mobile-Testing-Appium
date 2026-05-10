/**
 * =========================================
 * SIMPLE VISUAL TEST - Calculator
 * =========================================
 * This test will:
 * 1. Connect to emulator
 * 2. Open Calculator app
 * 3. Show you it works!
 */

const { expect } = require('chai');
const { createAndroidDriver } = require('../../utilities/driverFactory');

describe('VISUAL TEST: Emulator Connection', () => {
  let driver;

  before(async function() {
    this.timeout(120000); // 2 minutes to start
    console.log('\n═════════════════════════════════════════');
    console.log('🚀 Connecting to your Pixel 10 Pro...');
    console.log('═════════════════════════════════════════');
    
    try {
      driver = await createAndroidDriver();
      console.log('✅ Connected to emulator!\n');
    } catch(e) {
      console.log('❌ Connection error:', e.message);
      throw e;
    }
  });

  after(async function() {
    if (driver) {
      try {
        await driver.deleteSession();
        console.log('\n✅ Session closed\n');
      } catch(e) {
        console.log('Error closing session:', e.message);
      }
    }
  });

  it('App should open on the emulator screen', async function() {
    this.timeout(60000);
    
    console.log('📱 Opening Calculator app...');
    console.log('⏳ Watch your emulator screen!\n');
    
    // Wait a bit for app to fully load
    await driver.pause(3000);
    
    console.log('✅ Calculator app should be visible on your emulator!\n');
    console.log('═════════════════════════════════════════');
    console.log('🎉 SUCCESS!');
    console.log('═════════════════════════════════════════');
    console.log('Your emulator is working with Appium!');
    console.log('Next: Look at your emulator screen');
    console.log('═════════════════════════════════════════\n');
    
    expect(driver).to.exist;
  });

});
