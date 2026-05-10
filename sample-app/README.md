# Sample App Information

This folder would contain:

## Android
- `android-demo.apk` - Sample Android app for testing

## iOS  
- `ios-demo.app` - Sample iOS app for testing

## Getting Sample Apps

### Option 1: Use Official Appium Sample Apps
```bash
# Download and place here
# Android: https://github.com/appium/appium/releases/download/v2.0.0/ApiDemos-debug.apk
# iOS: https://github.com/appium/appium/releases/download/v2.0.0/TestApp.ipa
```

### Option 2: Use Contact App (Pre-installed)
Update capabilities to use built-in app:
```javascript
// For testing with built-in apps
app: undefined,  // Don't specify app
appPackage: 'com.android.contacts',
appActivity: 'com.android.contacts.DialtactsContactsEntryActivity'
```

### Option 3: Build Your Own Test App
Create a simple Android app and build APK to test locally.

## Default Test Apps (No Install Needed)

For learning, you can test built-in apps:

### Android Built-ins:
- Calculator: `com.google.android.calculator`
- Settings: `com.android.settings`
- Contacts: `com.android.contacts`
- Messages: `com.android.mms`

### Example: Test Calculator App
```javascript
// In capabilities.js
const androidCapabilities = {
  platformName: 'Android',
  automationName: 'UiAutomator2',
  deviceName: 'emulator-5554',
  platformVersion: '14',
  appPackage: 'com.google.android.calculator',
  appActivity: '.Calculator',
  // No need for 'app' path since it's built-in
};
```

Then test it:
```javascript
// Click 5
await driver.$('//android.widget.Button[@text="5"]').click();

// Click +
await driver.$('//android.widget.Button[@text="+"]').click();

// Click 3
await driver.$('//android.widget.Button[@text="3"]').click();

// Click =
await driver.$('//android.widget.Button[@text="="]').click();

// Verify result
const result = await driver.$('//android.widget.EditText').getValue();
// Should show 8
```

## Recommended Sample Apps

1. **API Demos** - Official Android test app
2. **Contact Manager** - Test contact handling
3. **Calculator** - Simple math operations
4. **Settings** - Complex navigation
5. **Chrome** - Web testing on mobile browser

## How to Install Custom APK

```bash
# Place APK in this folder, then

# In capabilities.js, use relative path:
app: './sample-app/your-app.apk'

# Or full path
app: 'C:/Users/vaibh/Desktop/QA Engineer/Appium/sample-app/your-app.apk'
```

## For Learning: Use Built-in Apps!

For **practicing the basics**, don't bother with custom apps.  
Test these built-in Android apps first:

```bash
# Calculator
appPackage: 'com.google.android.calculator'
appActivity: '.Calculator'

# Settings  
appPackage: 'com.android.settings'
appActivity: '.Settings'

# Chrome (if you want web testing)
appPackage: 'com.android.chrome'
appActivity: 'com.google.android.apps.chrome.MainActivity'
```

This way you can focus on **learning Appium**, not setting up test apps!
