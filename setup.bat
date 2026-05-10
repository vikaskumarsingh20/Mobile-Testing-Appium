@echo off
REM Appium Project Setup Script for Windows
REM Run: setup.bat

echo.
echo 🚀 Appium Project Setup
echo ========================
echo.

REM Check Node.js
echo Checking Node.js...
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js v16+
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js version: %NODE_VERSION%

REM Check npm
echo Checking npm...
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✓ npm version: %NPM_VERSION%

REM Install dependencies
echo.
echo Installing npm packages...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install npm packages
    exit /b 1
)
echo ✓ npm packages installed

REM Check if Appium is installed
echo.
echo Checking Appium...
appium --version >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing Appium globally...
    call npm install -g appium
) else (
    for /f "tokens=*" %%i in ('appium --version') do set APPIUM_VERSION=%%i
    echo ✓ Appium already installed: %APPIUM_VERSION%
)

REM Check ADB
echo.
echo Checking Android SDK...
adb --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Android SDK tools not found in PATH
    echo    Please set ANDROID_HOME environment variable
) else (
    echo ✓ ADB found
)

REM Create .env file
if not exist .env (
    echo.
    echo Creating .env file from .envexample...
    copy .envexample .env
    echo ✓ .env created. Please update it with your device info.
)

echo.
echo ✅ Setup Complete!
echo.
echo 📝 Next Steps:
echo 1. Update .env file with your device name
echo 2. Start Appium: npm run appium
echo 3. Start Emulator: emulator -avd ^<name^>
echo 4. Run tests: npm test
echo.
pause
