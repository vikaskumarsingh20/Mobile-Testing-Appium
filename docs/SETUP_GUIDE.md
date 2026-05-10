# 🔧 Appium + Android Setup Guide

## Complete Step-by-Step Setup

### Step 1: Verify Node.js Installation
```bash
# Check Node.js version (should be v16+)
node -v

# Check npm version
npm -v
```

---

### Step 2: Install Appium Server

Option A: **Global Installation (Recommended)**
```bash
# Install Appium server globally
npm install -g appium

# Install Android driver
appium driver install uiautomator2

# Verify installation
appium --version
```

Option B: **Project-Level Installation**
```bash
# In your project folder
npm install
```

---

### Step 3: Setup Android Emulator

#### Option 1: Using Android Studio (Easiest)

1. **Download Android Studio**
   - Go to https://developer.android.com/studio
   - Download and install

2. **Open Android Studio**
   - Click "AVD Manager" (Android Virtual Device Manager)
   - Click "Create Virtual Device"
   - Select device (e.g., "Pixel 5")
   - Select Android version (e.g., "Android 14")
   - Click "Finish"

3. **Start Emulator**
   ```bash
   # List available emulators
   emulator -list-avds

   # Start emulator (in background)
   emulator -avd <emulator_name> -writable-system &

   # Example:
   emulator -avd Pixel_5_API_31 -writable-system &
   ```

4. **Verify Emulator**
   ```bash
   # List connected devices
   adb devices

   # Output should show:
   # emulator-5554	device
   ```

#### Option 2: Using Command Line

```bash
# Create Android Virtual Device
sdkmanager "system-images;android-14;google_apis;x86_64"

# Create AVD
avdmanager create avd -n test-device -k "system-images;android-14;google_apis;x86_64"

# Start emulator
emulator -avd test-device
```

---

### Step 4: Install Required Tools

```bash
# Download Android SDK tools
# They're usually in: ~/Library/Android/sdk (Mac) or %ANDROID_HOME% (Windows)

# Or use Android Studio SDK Manager:
# - Preferences > Languages & Frameworks > Android SDK
# - Select SDK API level + Google APIs
```

---

### Step 5: Set Environment Variables (Windows)

1. **Open Environment Variables**
   - Right-click "This PC" > Properties
   - Click "Advanced system settings"
   - Click "Environment Variables" button

2. **Add Android Home Path**
   - Click "New"
   - Variable: `ANDROID_HOME`
   - Value: `C:\Users\<YourUsername>\AppData\Local\Android\Sdk`
   - Click OK

3. **Verify**
   ```bash
   # Open new PowerShell/CMD and test
   adb --version

   # Should output: Android Debug Bridge version
   ```

---

### Step 6: Configuration Files

Create `.env` file from `.envexample`:

```bash
# Copy example to .env
cd c:\Users\vaibh\Desktop\QA Engineer\Appium
cp .envexample .env
```

Edit `.env`:
```env
# Update with your emulator name
ANDROID_DEVICE_NAME=emulator-5554

# Keep others as default for now
APPIUM_HOST=127.0.0.1
APPIUM_PORT=4723
```

---

### Step 7: Install Project Dependencies

```bash
# Navigate to project
cd c:\Users\vaibh\Desktop\QA Engineer\Appium

# Install npm packages
npm install

# Verify installation
npx mocha --version
```

---

### Step 8: Test Setup

**Terminal 1: Start Appium Server**
```bash
# Start Appium
appium

# Wait for output:
# Appium server running on http://127.0.0.1:4723
```

**Terminal 2: Start Emulator** (if not already running)
```bash
# Start Android emulator
emulator -avd emulator-5554 &

# Verify device connected
adb devices
# Should output:
# emulator-5554	device
```

**Terminal 3: Run Tests**
```bash
# In project folder
npm test

# Or specific test
npm run test:android
```

---

## Troubleshooting

### Problem: "adb command not found"
```bash
# Solution: Add Android SDK tools to PATH
# Windows: Add C:\Users\<YourUsername>\AppData\Local\Android\Sdk\platform-tools to PATH
# Restart terminal after adding

# Verify
adb --version
```

### Problem: "Emulator not showing in adb devices"
```bash
# Restart adb daemon
adb kill-server
adb start-server

# List devices again
adb devices
```

### Problem: "Appium can't find app/device"
```bash
# Check capabilities in config/capabilities.js
# Ensure:
# - deviceName matches: adb devices output
# - platformVersion matches emulator's Android version
# - appPackage is correct
```

### Problem: "Tests timeout"
```javascript
// Increase timeout in test
it('Test name', async function() {
  this.timeout(60000); // 60 seconds
  // test code
});
```

### Problem: "Port 4723 already in use"
```bash
# Kill process using port
netstat -ano | findstr :4723
taskkill /PID <PID_NUMBER> /F

# Or use different port in config
```

---

## Quick Start Commands

```bash
# One-time setup (do this once)
npm install -g appium
appium driver install uiautomator2

# Every time you test (use 3 terminals)

# Terminal 1: Start Appium
appium

# Terminal 2: Start Emulator (if first time)
emulator -avd <emulator_name> &

# Verify device
adb devices

# Terminal 3: Run Tests
npm test
```

---

## Verify Everything Works

```bash
# Test 1: Node.js installed
node -v
# ✓ Should output: v16+

# Test 2: npm installed
npm -v
# ✓ Should output: 8+

# Test 3: Appium installed
appium --version
# ✓ Should output version

# Test 4: ADB installed
adb --version
# ✓ Should output: Android Debug Bridge version

# Test 5: Emulator connected
adb devices
# ✓ Should show: emulator-xxxx	device

# Test 6: Project dependencies installed
npm list appium
# ✓ Should show package versions

# You're ready! 🚀
```

---

## Common Commands Reference

```bash
# Appium
appium                              # Start server
appium --port 4724                  # Use different port
appium --log-level debug            # More verbose logging

# Android Debug Bridge (ADB)
adb devices                         # List connected devices
adb shell                           # Enter device shell
adb logcat                          # View device logs
adb reverse tcp:4723 tcp:4723      # Port forwarding
adb uninstall <package>            # Remove app
adb install <apk>                  # Install app

# Emulator
emulator -list-avds                 # List available emulators
emulator -avd <name>                # Start emulator
emulator -avd <name> -writable-system  # Writable system partition

# NPM
npm test                            # Run all tests
npm run test:android                # Run Android tests only
npm run test:report                 # Run with HTML report
npm run appium                      # Start Appium (from project)
```

---

## Environment Setup Checklist

- [ ] Node.js v16+ installed
- [ ] Appium server installed globally
- [ ] UIAutomator2 driver installed
- [ ] Android SDK installed
- [ ] Android Studio installed
- [ ] Emulator created (at least one AVD)
- [ ] ANDROID_HOME environment variable set
- [ ] Project npm packages installed
- [ ] `.env` file created
- [ ] Appium starts without errors
- [ ] Emulator connects (adb devices shows it)
- [ ] Tests run successfully

---

**Once everything checks ✓, you're ready to run the practice tests!**
