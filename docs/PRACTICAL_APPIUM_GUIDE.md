# Practical Appium Guide

This guide is written for a QA Engineer who already knows JavaScript and web automation, but is new to mobile automation.

The goal is simple:

- become job-ready in Appium
- build real mobile automation projects
- see tests run visually on an Android emulator
- understand the framework patterns used in real teams

This workspace uses:

- Appium 2.x
- JavaScript
- WebdriverIO client
- Mocha
- Android emulator first

---

## Section 1 - Complete Environment Setup

### 1. Install Node.js

Why:

- Appium server runs on Node.js
- your test project uses npm packages

Verify:

```bash
node -v
npm -v
```

Expected output:

```bash
v22.x.x
10.x.x
```

### 2. Install Java JDK

Why:

- Android automation depends on Java-based Android tooling
- Appium Android sessions often fail if `java` is not available

Verify:

```bash
java -version
```

Expected output:

```bash
openjdk version "17.x.x"
```

### 3. Configure `JAVA_HOME`

Windows example:

```powershell
[System.Environment]::SetEnvironmentVariable('JAVA_HOME', 'C:\Program Files\Java\jdk-17', 'Machine')
```

Add `%JAVA_HOME%\bin` to `PATH`.

Verify:

```bash
echo %JAVA_HOME%
java -version
```

### 4. Install Appium globally

Modern Appium 2.x commands:

```bash
npm i -g appium
appium -v
appium setup mobile
appium driver list --installed
```

Why:

- `appium` starts the server
- `appium setup mobile` installs mobile extensions like `uiautomator2`

Expected output:

- Appium version printed
- `uiautomator2` listed as installed

### 5. Install Appium Doctor

There are two ways:

Current Appium 2.x standard:

```bash
appium driver doctor uiautomator2
```

Legacy standalone package:

```bash
npm i -g appium-doctor
appium-doctor --android
```

Recommendation:

- use `appium driver doctor uiautomator2` first
- use standalone `appium-doctor` only if your team already uses it

### 6. Install Android SDK dependencies

From Android Studio SDK Manager install:

- Android SDK Platform-Tools
- Android SDK Build-Tools
- Android Emulator
- one Android system image like Android 14 or 15

Add these to `PATH`:

```text
<android-sdk>\platform-tools
<android-sdk>\emulator
```

Useful verification:

```bash
adb version
emulator -list-avds
adb devices
```

### 7. Install Appium Inspector

Why:

- this is your mobile element inspection tool
- think of it as the mobile equivalent of DevTools + DOM inspector

After install:

1. start Appium server
2. open Inspector
3. set server URL to `http://127.0.0.1:4723`
4. add capabilities
5. start a session

### 8. Install VS Code extensions

Recommended:

- JavaScript and TypeScript Nightly or built-in JS support
- ESLint
- Prettier
- DotENV
- Markdown All in One
- GitLens

### Current folder structure in this workspace

```text
Appium/
├─ apps/
├─ config/
├─ docs/
├─ scripts/
├─ test/
│  ├─ data/
│  ├─ pages/
│  ├─ specs/learning/android/
│  ├─ utilities/
│  └─ utils/
├─ .env.example
└─ package.json
```

### Common setup issues and fixes

`java is not recognized`

- install JDK
- set `JAVA_HOME`
- reopen terminal

`adb is not recognized`

- add Android SDK `platform-tools` to `PATH`

`SessionNotCreatedException`

- run `appium driver list --installed`
- run `appium driver doctor uiautomator2`

`No connected devices`

- start emulator
- run `adb devices`

`404 /wd/hub`

- Appium 2.x default path is `/`
- use `APPIUM_BASE_PATH=/`

### Core concepts

Appium Server:

- a Node.js server that receives your WebDriver commands and sends them to the correct mobile driver

`adb`:

- Android Debug Bridge
- command-line tool to talk to Android emulators and real devices

UiAutomator2:

- the Android automation driver Appium uses to control native Android apps

Desired Capabilities:

- session configuration values that tell Appium what platform, device, driver, and app to use

Appium Inspector:

- a desktop tool to inspect native elements and validate locators

### Practice task

Run these until all succeed:

```bash
java -version
adb version
appium -v
appium driver list --installed
adb devices
```

### Interview Q&A

Q: What is Appium Server?

A: It is the command router between your test code and the mobile driver such as UiAutomator2 or XCUITest.

Q: What is `adb` used for?

A: Device communication, app install, logs, shell commands, and device detection.

---

## Section 2 - Create First Appium Project

### Create project folder

```bash
mkdir Appium
cd Appium
```

### Initialize Node.js project

```bash
npm init -y
```

Why:

- creates `package.json`
- stores dependencies and scripts

### Install dependencies

```bash
npm i webdriverio mocha chai dotenv axios
npm i -D appium appium-uiautomator2-driver mochawesome nodemon
```

What each dependency does:

- `webdriverio`: WebDriver client for Appium commands
- `mocha`: test runner
- `chai`: assertion library
- `dotenv`: environment variable loading
- `axios`: API calls for test data setup
- `appium`: local Appium server package
- `appium-uiautomator2-driver`: Android automation driver
- `mochawesome`: HTML report
- `nodemon`: rerun tests after file changes

### First practical flow in this repo

File:

- [test/specs/learning/android/00.hello-world.settings.spec.js](/C:/Users/vaibh/Desktop/QA%20Engineer/Appium/test/specs/learning/android/00.hello-world.settings.spec.js)

What it does:

1. starts an Appium session
2. opens Android Settings
3. prints package and activity
4. closes the session

### Commands to run

```bash
npm run appium
npm run test:hello
```

Expected output:

```bash
Current package: com.android.settings
Current activity: com.android.settings.Settings
```

### Why this is your "hello world"

In Playwright, your first script opens a browser page.

In Appium, your first script opens a device session and launches a mobile app.

---

## Section 3 - Connect Emulator and Devices

### Check connected emulator

```bash
adb devices
```

Expected output:

```bash
List of devices attached
emulator-5554    device
```

### Connect a real Android device

1. open phone Settings
2. tap Build Number 7 times
3. open Developer Options
4. enable USB debugging
5. connect USB
6. accept RSA prompt
7. run:

```bash
adb devices
```

### Desired capabilities in detail

`platformName`

- target platform
- example: `Android`

`appium:automationName`

- automation engine
- Android uses `UiAutomator2`

`appium:deviceName`

- logical device label
- emulator example: `Android Emulator`

`appium:platformVersion`

- Android version on the device

`appium:appPackage`

- Android package name for an already installed app

`appium:appActivity`

- launch activity for the app

### Working examples

Preinstalled Settings app:

```json
{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Android Emulator",
  "appium:appPackage": "com.android.settings",
  "appium:appActivity": "com.android.settings.Settings"
}
```

APK-based Demo App:

```json
{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Android Emulator",
  "appium:app": "C:\\path\\to\\Android-MyDemoAppRN.1.3.0.build-244.apk",
  "appium:appPackage": "com.saucelabs.mydemoapp.rn",
  "appium:appActivity": "com.saucelabs.mydemoapp.rn.MainActivity"
}
```

### Practice task

- start emulator
- verify it in `adb devices`
- run `npm run test:hello`

### Interview Q&A

Q: What is the difference between `app` and `appPackage/appActivity`?

A: `app` installs and launches an APK. `appPackage/appActivity` launches an app already installed on the device.

---

## Section 4 - Appium Inspector Practical

### How to connect

1. run `npm run appium`
2. open Appium Inspector
3. use server `http://127.0.0.1:4723`
4. paste capabilities
5. click Start Session

### Capability example for this workspace

```json
{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Android Emulator",
  "appium:app": "C:\\Users\\vaibh\\Desktop\\QA Engineer\\Appium\\apps\\Android-MyDemoAppRN.1.3.0.build-244.apk"
}
```

### Locators explained

`id`

- Android resource id
- example:

```js
await driver.$('id=com.example:id/login_button');
```

`accessibility id`

- maps to accessibility identifier on iOS
- maps to `content-desc` on Android
- example:

```js
await driver.$('~Login');
```

`xpath`

- works when other strategies are missing
- slower and more brittle

`className`

- element class such as `android.widget.Button`

`UiSelector` / Android UiAutomator

- Android-only powerful selector syntax

```js
await driver.$('android=new UiSelector().text("Login")');
await driver.$('android=new UiSelector().resourceId("com.example:id/login")');
```

### Best locator strategy

Fastest and most stable:

1. accessibility id
2. Android `resource-id`
3. Android UiSelector
4. XPath as last option

### Playwright comparison

Web:

- CSS
- text
- `data-testid`

Mobile:

- no DOM
- no CSS selectors
- you inspect the native accessibility tree

### Practice task

Inspect the `Login` tab in My Demo App and write:

- one accessibility id locator
- one Android UiSelector locator
- one XPath locator

### Interview Q&A

Q: Which locator strategy is preferred in Appium?

A: Accessibility id, because it is stable, readable, and cross-platform friendly.

---

## Section 5 - Beginner Practical Automation

These runnable files are already in this workspace:

- [test/specs/learning/android/01.demo-app-login-signup.spec.js](/C:/Users/vaibh/Desktop/QA%20Engineer/Appium/test/specs/learning/android/01.demo-app-login-signup.spec.js)
- [test/specs/learning/android/02.demo-app-forms-alerts.spec.js](/C:/Users/vaibh/Desktop/QA%20Engineer/Appium/test/specs/learning/android/02.demo-app-forms-alerts.spec.js)
- [test/specs/learning/android/03.demo-app-gestures.spec.js](/C:/Users/vaibh/Desktop/QA%20Engineer/Appium/test/specs/learning/android/03.demo-app-gestures.spec.js)
- [test/specs/learning/android/04.apidemos-controls.spec.js](/C:/Users/vaibh/Desktop/QA%20Engineer/Appium/test/specs/learning/android/04.apidemos-controls.spec.js)

### 1. Open app

Code:

```js
driver = await createAndroidDriver({ appProfile: 'demo' });
```

Expected:

- emulator opens My Demo App

### 2. Click button

```js
await driver.$('~Login').click();
```

### 3. Enter username

```js
await driver.$('~input-email').setValue('test@webdriver.io');
```

### 4. Enter password

```js
await driver.$('~input-password').setValue('Test1234!');
```

### 5. Login automation

```js
await driver.$('~button-login-container').click();
await driver.$('~input-email').setValue('test@webdriver.io');
await driver.$('~input-password').setValue('Test1234!');
await driver.$('~button-LOGIN').click();
```

Expected:

- native success alert appears

### 6. Signup automation

```js
await driver.$('~button-sign-up-container').click();
await driver.$('~input-email').setValue('qa.mobile@appium.dev');
await driver.$('~input-password').setValue('StrongPass123!');
await driver.$('~input-repeat-password').setValue('StrongPass123!');
await driver.$('~button-SIGN UP').click();
```

### 7. Forgot password flow

If your app has a button:

```js
await driver.$('~forgot-password').click();
await driver.$('~input-email').setValue('user@test.com');
await driver.$('~button-submit').click();
```

### 8. OTP field handling

```js
const otpFields = await driver.$$('android.widget.EditText');
await otpFields[0].setValue('1');
await otpFields[1].setValue('2');
await otpFields[2].setValue('3');
await otpFields[3].setValue('4');
```

### 9. Scroll vertically

```js
await driver.$('~WebdriverIO logo').scrollIntoView({
  direction: 'up',
  maxScrolls: 5,
});
```

### 10. Swipe horizontally

```js
await driver.execute('mobile: swipeGesture', {
  elementId: (await driver.$('//*[@resource-id="Carousel"]')).elementId,
  direction: 'left',
  percent: 0.85,
});
```

### 11. Long press

```js
await driver.execute('mobile: longClickGesture', {
  elementId: (await driver.$('android=new UiSelector().text("People Names")')).elementId,
  duration: 1500,
});
```

### 12. Double tap

```js
const el = await driver.$('~some-element');
const rect = await el.getRect();
await driver.execute('mobile: doubleClickGesture', {
  x: Math.round(rect.x + rect.width / 2),
  y: Math.round(rect.y + rect.height / 2),
});
```

### 13. Hide keyboard

```js
if (await driver.isKeyboardShown()) {
  await driver.hideKeyboard().catch(async () => driver.back());
}
```

### 14. Handle alerts

```js
const okButton = await driver.$('//*[@text="OK"]');
await okButton.click();
```

### 15. Handle dropdowns

```js
await driver.$('~Dropdown').click();
await driver.$('android=new UiSelector().text("webdriver.io is awesome")').click();
```

### 16. Handle checkboxes

```js
const checkbox = await driver.$('android=new UiSelector().text("Checkbox 1")');
await checkbox.click();
```

### 17. Handle radio buttons

```js
const radio = await driver.$('android=new UiSelector().text("RadioButton 2")');
await radio.click();
```

### 18. Validate toast messages

```js
const toast = await driver.$('//*[@text="Saved successfully"]');
await toast.waitForDisplayed({ timeout: 5000 });
```

### 19. Take screenshot

```js
const filePath = await mobileActions.takeNamedScreenshot('after-login');
```

### 20. Close app

```js
await driver.terminateApp('com.saucelabs.mydemoapp.rn');
```

### Best practices

- prefer accessibility id
- avoid raw `pause()` unless debugging
- reset app state intentionally
- build helper methods for repeated actions

### Mini assignment

Automate:

1. open My Demo App
2. go to Login tab
3. sign up
4. close alert
5. take screenshot

---

## Section 6 - Waits and Synchronization

Why tests fail:

- app loads slower than expected
- animation not completed
- keyboard hides elements
- API response delays

### Implicit wait

Avoid using large global implicit waits as your main strategy.

### Explicit wait

Best practical choice.

```js
await element.waitForDisplayed({ timeout: 10000 });
```

### `waitUntil`

Best for custom conditions:

```js
await driver.waitUntil(async () => {
  return (await driver.$('~Home-screen').isDisplayed().catch(() => false)) === true;
}, { timeout: 10000 });
```

### Best strategy

- explicit waits on important elements
- helper methods that wait before acting
- avoid fixed `pause()` except temporary debugging

### Practice task

Replace one `pause()` in your scripts with `waitForDisplayed()`.

---

## Section 7 - Assertions and Validations

Examples:

Verify login success:

```js
expect(alertText).to.include('Success');
```

Verify error message:

```js
expect(await errorMessage.getText()).to.equal('Email is required');
```

Verify navigation:

```js
expect(await driver.$('~Login-screen').isDisplayed()).to.equal(true);
```

Verify element visible:

```js
expect(await button.isDisplayed()).to.equal(true);
```

Verify text:

```js
expect(await resultLabel.getText()).to.include('Appium');
```

---

## Section 8 - Page Object Model Framework

Professional structure in this repo:

```text
test/
├─ data/
├─ pages/
│  ├─ base.page.js
│  ├─ components/
│  └─ demo/
├─ specs/learning/android/
├─ utilities/
└─ utils/
```

What each layer does:

- `pages`: screen locators + screen actions
- `specs`: business scenarios
- `utils`: reusable mobile helpers
- `data`: test accounts
- `config`: capabilities and server settings

Key files:

- [test/pages/base.page.js](/C:/Users/vaibh/Desktop/QA%20Engineer/Appium/test/pages/base.page.js)
- [test/pages/demo/login.page.js](/C:/Users/vaibh/Desktop/QA%20Engineer/Appium/test/pages/demo/login.page.js)
- [test/utils/mobileActions.js](/C:/Users/vaibh/Desktop/QA%20Engineer/Appium/test/utils/mobileActions.js)

### Practice task

Create a new page object for the cart screen in My Demo App.

---

## Section 9 - Practice APK Apps

### 1. ApiDemos

GitHub:

- [android-apidemos releases](https://github.com/appium/android-apidemos/releases)

Good for:

- buttons
- checkboxes
- radio buttons
- dialogs
- long press
- scroll

Beginner task:

- open `Views > Controls > 1. Light Theme`
- click a checkbox

Intermediate task:

- handle alert dialog buttons

Advanced task:

- long press `People Names` and validate contextual menu

### 2. Sauce Labs My Demo App

GitHub:

- [my-demo-app-rn releases](https://github.com/saucelabs/my-demo-app-rn/releases)

Good for:

- login
- signup
- forms
- ecommerce
- cart
- checkout
- swipe
- drag and drop

Beginner task:

- login and signup

Intermediate task:

- dropdown, alert, switch validations

Advanced task:

- add to cart and checkout flow with API-backed state assertions

### 3. Wikipedia Android App

GitHub:

- [Wikipedia Android repo](https://github.com/wikimedia/apps-android-wikipedia)

Good for:

- search
- keyboard handling
- screen navigation

Note:

- this repo is excellent for practice, but release APK retrieval is less direct than the first two apps

### 4. Open-source ecommerce ideas

- [FakeStoreDemoApp](https://github.com/daniruse/FakeStoreDemoApp)
- [Nearby Shops Android app](https://github.com/NearbyShops/Nearby-Shops-Android-app)

### 5. Banking-style practice apps

- [Vulnerable Bank Mobile](https://github.com/Commando-X/vuln-bank-mobile/)
- [Ivy Wallet](https://github.com/Ivy-Apps/ivy-wallet)

### 6. Food delivery style practice apps

- [Nearby Shops Android app](https://github.com/NearbyShops/Nearby-Shops-Android-app)
- [kotlin-food-delivery-app](https://github.com/kayaalpkoker/kotlin-food-delivery-app)

Advice:

- start with apps that already provide release APKs
- use `ApiDemos` and `My Demo App` first

---

## Section 10 - Advanced Appium

Topics to learn after basics:

- hybrid apps
- webview context switching
- real device testing
- parallel execution
- cloud execution
- BrowserStack
- LambdaTest
- Jenkins
- GitHub Actions
- Allure reporting
- screenshots and videos

### Hybrid app practical idea

```js
const contexts = await driver.getContexts();
console.log(contexts);
await driver.switchContext('WEBVIEW_com.example');
```

### Cloud execution idea

- move the same capabilities to BrowserStack or LambdaTest
- replace local server with cloud hub URL

---

## Section 11 - API + Mobile Automation

Real company pattern:

1. create data via API
2. open mobile app
3. validate UI with the created data
4. optionally verify backend state again

### Axios example

```js
const axios = require('axios');

const client = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
});

async function createUser() {
  const response = await client.post('/users', {
    email: 'mobile-user@test.com',
    password: 'Test1234!',
  });

  return response.data;
}
```

### Mobile + API flow example

```js
const user = await createUser();
await loginPage.login(user.email, user.password);
expect(await loginPage.readNativeAlertText()).to.include('Success');
```

### How to validate mobile API calls in practice

Best options:

1. validate backend state with direct API calls
2. use app logs or proxy tools like Charles / Proxyman
3. validate data persistence after UI action

Important difference vs Playwright:

- Appium does not give you Playwright-style network interception for native apps
- you validate API behavior indirectly or through backend/service checks

---

## Section 12 - Debugging and Error Handling

### How to debug failed tests

1. read Appium server logs
2. read stack trace
3. take screenshot
4. inspect current page source
5. check `adb logcat`

Useful commands:

```bash
adb logcat
adb devices
appium
```

Useful code:

```js
console.log(await driver.getPageSource());
const screenshot = await mobileActions.takeNamedScreenshot('failure-state');
```

### Common errors

`Session not created`

- Java missing
- wrong driver not installed
- invalid capabilities

`Element not found`

- wrong locator
- wrong screen
- timing issue

`Timeout issues`

- replace `pause()` with waits
- check slow emulator

`Emulator issues`

- device boot incomplete
- animations
- low memory

`Driver mismatch`

- installed driver version and capability mismatch

---

## Section 13 - Real-world Mini Projects

### Project 1 - Ecommerce App

Use `My Demo App`.

Scenarios:

- login
- search product
- open product
- add to cart
- checkout
- logout

Interview discussion:

- why POM
- how you stabilize cart assertions
- how you seed users and products

### Project 2 - Food Delivery App

Target flows:

- location permission
- restaurant selection
- menu browse
- add items
- place order

Discussion points:

- permissions handling
- GPS mocking
- flaky scrolling in long lists

### Project 3 - Banking App

Target flows:

- login
- balance check
- transfer
- transaction history

Discussion points:

- secure test data
- OTP handling
- API seeding
- masked data assertions

---

## Section 14 - 30 Day Roadmap

### Week 1 - Setup and Basics

Day 1:

- install Java
- verify `adb`, `appium`, `java`

Day 2:

- run emulator
- run `npm run test:hello`

Day 3:

- learn Inspector
- inspect My Demo App Home and Login tabs

Day 4:

- run login test

Day 5:

- run signup test

Day 6:

- practice locators only

Day 7:

- revise capabilities and device connection

### Week 2 - Practical Automation

Day 8:

- forms input validation

Day 9:

- switches and dropdowns

Day 10:

- native alert handling

Day 11:

- screenshot utility

Day 12:

- vertical scrolling

Day 13:

- horizontal swipe

Day 14:

- ApiDemos checkbox + radio + long press

### Week 3 - Framework Building

Day 15:

- page object design

Day 16:

- base page and helper utilities

Day 17:

- reusable waits

Day 18:

- test data files

Day 19:

- env config

Day 20:

- API utility with axios

Day 21:

- failure screenshots and logs

### Week 4 - Real Projects and Interview Prep

Day 22:

- ecommerce login

Day 23:

- add to cart

Day 24:

- checkout

Day 25:

- real device run

Day 26:

- CI/CD basics

Day 27:

- cloud execution research

Day 28:

- Appium interview questions

Day 29:

- mock project explanation

Day 30:

- build your own project from scratch

---

## Section 15 - Interview Preparation

### Common Appium questions

Q: How is mobile automation different from web automation?

A: There is no DOM for native apps, locator strategy depends on accessibility/native hierarchy, and gestures plus device state matter much more.

Q: Why use accessibility id first?

A: It is usually the most stable and works well across Android and iOS when teams expose good accessibility identifiers.

Q: How do you validate APIs in native mobile automation?

A: Usually with backend/API assertions, proxy tools, logs, or state validation. Native Appium does not provide Playwright-style request interception for all native traffic.

Q: How do you reduce flakiness?

A: Stable locators, explicit waits, emulator consistency, animation reduction, app state reset strategy, and reusable wrappers.

Q: How do you structure an Appium framework?

A: Config layer, driver factory, page objects, utilities, test data, scenario specs, reporting, and CI integration.

### JavaScript questions you should expect

- promises and async/await
- error handling with try/catch
- module structure
- environment variables
- reusable helper functions

---

## Section 16 - Best Practices

- keep locators readable and stable
- prefer accessibility id
- keep page objects focused on page behavior
- keep assertions in specs when possible
- use helpers for gestures and waits
- avoid random `pause()` calls
- save screenshots on failure
- separate emulator config from real-device config
- keep test data outside test logic

Common beginner mistakes:

- too much XPath
- direct duplicate locators everywhere
- no wait strategy
- mixing setup, business logic, and assertions in one giant file
- not understanding app reset behavior

What professionals do:

- environment-based config
- app profile switching
- clear failure logs
- reusable page objects
- backend data setup
- cloud execution for device coverage

---

## Section 17 - Learning Resources

Official docs:

- [Appium docs](https://appium.io/docs/en/latest/)
- [Appium capabilities](https://appium.io/docs/en/latest/guides/caps/)
- [Appium setup command](https://appium.io/docs/en/latest/reference/cli/setup/)
- [UiAutomator2 quickstart](https://appium.io/docs/en/2.5/quickstart/uiauto2-driver/)
- [WebdriverIO docs](https://webdriver.io/docs/gettingstarted/)
- [WebdriverIO selectors](https://webdriver.io/docs/selectors/)
- [WebdriverIO mobile commands](https://webdriver.io/docs/api/mobile/)
- [Appium Inspector quickstart](https://appium.github.io/appium-inspector/2025.3/quickstart/starting-a-session/)

Android docs:

- [ADB docs](https://developer.android.com/tools/adb)
- [AVD management](https://developer.android.com/studio/run/managing-avds)
- [Environment variables](https://developer.android.com/tools/variables)

Practice repos:

- [WebdriverIO Appium boilerplate](https://github.com/webdriverio/appium-boilerplate)
- [My Demo App RN releases](https://github.com/saucelabs/my-demo-app-rn/releases)
- [ApiDemos releases](https://github.com/appium/android-apidemos/releases)

Blogs and learning:

- [Appium Pro](https://appiumpro.com/)
- [LambdaTest Appium resources](https://www.lambdatest.com/learning-hub/appium)
- [BrowserStack App Automate docs](https://www.browserstack.com/docs/app-automate)

Suggested YouTube channels to search:

- Appium official
- WebdriverIO
- Automation Step by Step
- LambdaTest
- BrowserStack

---

## What to do next

Today:

1. fix Java and `JAVA_HOME` if needed
2. start emulator
3. run `adb devices`
4. start Appium with `npm run appium`
5. run `npm run test:hello`
6. then run `npm run test:demo`

Once that works, your next milestone is:

- inspect My Demo App with Appium Inspector
- understand every locator used in Lesson 01 and Lesson 02
- then build your own login flow without copying the page object
