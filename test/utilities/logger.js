// Logger Utility
// For better visibility into what's happening during tests
// Like console logs, but organized

class Logger {
  static log(category, message, data = null) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${category}] ${message}`);
    if (data) {
      console.log('Data:', JSON.stringify(data, null, 2));
    }
  }

  static logAction(action, element = '', value = '') {
    this.log('ACTION', `${action}${element ? ` on ${element}` : ''}${value ? ` with value: ${value}` : ''}`);
  }

  static logAssertion(condition, expected, actual) {
    this.log('ASSERTION', `${condition}: Expected [${expected}], Got [${actual}]`);
  }

  static logError(error) {
    this.log('ERROR', error.message);
    console.log(error.stack);
  }

  static logStep(stepNumber, description) {
    console.log(
      `\n${'='.repeat(80)}\n📍 STEP ${stepNumber}: ${description}\n${'='.repeat(80)}\n`
    );
  }

  static logTestStart(testName) {
    console.log(`\n${'*'.repeat(80)}\n🚀 TEST START: ${testName}\n${'*'.repeat(80)}\n`);
  }

  static logTestEnd(testName, status) {
    console.log(`\n${'*'.repeat(80)}\n✅ TEST END: ${testName} - ${status}\n${'*'.repeat(80)}\n`);
  }
}

module.exports = Logger;
