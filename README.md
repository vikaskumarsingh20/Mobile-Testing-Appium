# Appium JavaScript Learning Workspace

This workspace is set up to help you learn Appium 2.x with JavaScript, WebdriverIO, and Mocha through practical Android automation.

The learning path is intentionally split into two kinds of practice:

- `Settings` app for your first "hello world" run on an emulator
- `My Demo App` for job-style flows like login, signup, forms, alerts, swipe, and drag-and-drop
- `ApiDemos` for raw native Android controls like checkboxes, radio buttons, dialogs, and long press

## What is in this repo

```text
Appium/
├─ apps/                       # APK files used for practice
├─ config/                     # Appium server + capabilities builders
├─ docs/                       # Full learning guide
├─ scripts/                    # APK download helpers
├─ test/
│  ├─ data/                    # Test users and sample data
│  ├─ pages/                   # Page objects
│  ├─ specs/learning/android/  # Beginner -> advanced practical specs
│  ├─ utilities/               # Driver factory
│  └─ utils/                   # Mobile helper methods
├─ .env.example                # Environment template
├─ package.json
└─ README.md
```

## Current first-priority commands

```bash
npm run doctor:android
npm run appium
npm run test:hello
npm run test:demo
npm run test:apidemos
```

## First run order

1. Install Java JDK and configure `JAVA_HOME`
2. Make sure Android Studio SDK tools are installed
3. Add `platform-tools` and `emulator` to `PATH`
4. Start an Android emulator
5. Verify with `adb devices`
6. Start Appium with `npm run appium`
7. Run the first visible test with `npm run test:hello`

## Learning guide

Open [docs/PRACTICAL_APPIUM_GUIDE.md](/C:/Users/vaibh/Desktop/QA%20Engineer/Appium/docs/PRACTICAL_APPIUM_GUIDE.md) for the full beginner-to-job-ready roadmap.

## Included APKs

- `apps/Android-MyDemoAppRN.1.3.0.build-244.apk`
- `apps/ApiDemos-debug.apk`

If you need to re-download them:

```bash
npm run download:apps
```

## Notes about your machine

- `Node.js` and local `Appium` packages are already installed in this workspace
- `adb.exe` is available locally, but your shell `PATH` still needs to include Android SDK tools for a smooth daily workflow
- `java` was not available in the shell when this workspace was checked, so fix that first before expecting Android sessions to start

## Good starting point

Run these in 3 terminals:

```bash
# Terminal 1
npm run appium

# Terminal 2
adb devices

# Terminal 3
npm run test:hello
```
