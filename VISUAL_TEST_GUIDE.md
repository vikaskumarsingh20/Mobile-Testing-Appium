# 🎬 Visual Mobile Testing Guide - Emulator Setup

## What We're Building

**A visual test you can WATCH execute on your laptop screen:**

```
📱 Emulator runs on your screen
   ↓ (App opens automatically)
   ↓ (Settings app appears)
   ↓ (Test reads screen items)
   ↓ (You see EVERYTHING!)
   ✅ Test passes
```

---

## Prerequisites ✅

- [x] Android Studio installed
- [ ] Android Emulator created (follow steps below)

---

## Step 1: Create Android Emulator (5 minutes)

### In Android Studio GUI:

1. **Click:** Tools → Device Manager
2. **Click:** Create Device (blue button)
3. **Select Phone:** Pixel 6 (or any recent Pixel phone)
4. **Click:** Next
5. **Select Release:** Android 14 (or higher)
6. **Click:** Next
7. **AVD Name:** Keep as default OR type `emulator-5554`
8. **Check:** Enable Performance: Graphics Acceleration (Hardware)
9. **Click:** Finish

**Wait for image download** (2-3 min) ✅

### Verify it was created:

```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:Path += ";$env:ANDROID_HOME\emulator"
emulator -list-avds
```

You should see your emulator listed.

---

## Step 2: Start Appium Server

**Terminal 1 - Appium Server:**

```powershell
cd "C:\Users\vaibh\Desktop\QA Engineer\Appium"

# Set Android SDK path from Android Studio
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:Path += ";$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\platform-tools"

# Start Appium
npm run appium
```

**Expected output:**
```
[Appium] Welcome to Appium v2.19.0
[Appium] Appium REST http interface listener started on http://0.0.0.0:4723
[Appium] Available drivers:
  - uiautomator2@2.45.1 (automationName 'UiAutomator2')
```

✅ **Keep this terminal open!**

---

## Step 3: Start Android Emulator

**Terminal 2 - Android Emulator:**

```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:Path += ";$env:ANDROID_HOME\emulator"

# Start emulator (use your emulator name - check from list-avds above)
emulator -avd <your_emulator_name> -show-kernel

# Example if you named it "Pixel_6_API_34":
# emulator -avd Pixel_6_API_34 -show-kernel
```

**You should see:** Android emulator window opening on your screen (takes 30-60 seconds)

**Wait for Android to fully boot** (you'll see home screen with app icons)

✅ **Keep this terminal open!**

---

## Step 4: Run Your Test

**Terminal 3 - Run Test:**

```powershell
cd "C:\Users\vaibh\Desktop\QA Engineer\Appium"

# Set same environment variables
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:Path += ";$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\platform-tools"

# Run the test
npm run test:android
```

---

## What You'll See

### Terminal Output:
```
  REAL DEVICE TEST: Calculator Demo

═════════════════════════════════════════
🚀 CONNECTING TO YOUR PHONE
═════════════════════════════════════════
✅ Connected to emulator!
✅ Settings app opened!

➡️  STEP 1: Find a Settings item to confirm page loaded
  ✅ Found 25 text items on screen

➡️  STEP 2: Get some settings titles from the screen
  📱 Item 1: "Display"
  📱 Item 2: "Sound & vibration"
  📱 Item 3: "Notifications"
  📱 Item 4: "Battery"
  📱 Item 5: "About phone"

═════════════════════════════════════════
🎉 TEST PASSED!
✅ Your emulator successfully connected to Appium!
✅ Appium can read and interact with the app!
═════════════════════════════════════════
```

### Emulator Screen:
- Settings app is open
- You watch screen changes happen in real-time
- **This is the MAGIC of Appium!** 📱

---

## Troubleshooting

### Issue: "Cannot find emulator"
**Solution:** 
```powershell
# Verify path is set
$env:ANDROID_HOME
# Should show: C:\Users\vaibh\AppData\Local\Android\Sdk

# List available emulators
emulator -list-avds
```

### Issue: "Emulator slower than expected"
**Solution:** Enable hardware acceleration in Android Studio > Device Manager > Edit > Advanced Settings > Graphics = Hardware

### Issue: "Test times out"
**Solution:** Emulator may still be loading. Wait 60 seconds after you see home screen before running tests.

---

## The Flow Explained

```
You                 Appium Server          Emulator
 ↓                      ↓                     ↓
Run npm test        Connects to         App Opens
                    emulator on 5554     
Find Settings   ←→  XPath search   ←→   Find element
                                        on screen
                                        
Reads text           Parses            Shares
from emulator        response          response
                                        
✅ Test Pass         Validates         Returns
                     assertions        elements
```

---

## Next Steps (After Successful First Test)

1. ✅ Run the visual test successfully (you're here!)
2. Modify test for different apps (WhatsApp, Gmail, etc.)
3. Add multiple test cases
4. Create test reports with screenshots
5. Run tests in CI/CD pipeline

---

## Key Differences You'll Notice

### Emulator vs Real Device

| Feature | Emulator | Real Device |
|---------|----------|------------|
| Speed | Slower (depends on PC) | Faster |
| Setup | Complex first time | Simple |
| Visual | Easy to watch | Need USB monitoring apps |
| Cost | Free | Device needed |
| **Learning** | **BEST!** | Good |

**For learning Appium:** Emulator is PERFECT! ⭐⭐⭐

---

## Commands Quick Reference

```powershell
# Set Android SDK
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:Path += ";$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\platform-tools"

# List emulators
emulator -list-avds

# Start emulator
emulator -avd <name>

# Start Appium
npm run appium

# Run tests
npm run test:android
npm run test:report     # With HTML report
```

---

## You've Got This! 🚀

Follow the steps in order and your first visual test will run perfectly!

Need help? Just let me know what terminal shows!
