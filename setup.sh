#!/bin/bash

# Appium Project Setup Script
# Run: bash setup.sh

echo "🚀 Appium Project Setup"
echo "========================"

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js v16+"
    exit 1
fi
echo "✓ Node.js version: $(node -v)"

# Check npm
echo "✓ Checking npm..."
echo "✓ npm version: $(npm -v)"

# Install dependencies
echo "✓ Installing npm packages..."
npm install

# Check if Appium is installed
echo "✓ Checking Appium..."
if ! command -v appium &> /dev/null; then
    echo "📦 Installing Appium globally..."
    npm install -g appium
fi
echo "✓ Appium version: $(appium --version)"

# Check if Android SDK is available
echo "✓ Checking Android SDK..."
if ! command -v adb &> /dev/null; then
    echo "⚠️  Android SDK tools not found in PATH"
    echo "   Please set ANDROID_HOME environment variable"
else
    echo "✓ ADB version: $(adb version | head -1)"
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .envexample..."
    cp .envexample .env
    echo "✓ .env created. Please update it with your device info."
fi

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Update .env file with your device name"
echo "2. Start Appium: npm run appium"
echo "3. Start Emulator: emulator -avd <name>"
echo "4. Run tests: npm test"
echo ""
