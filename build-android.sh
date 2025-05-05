#!/bin/bash

# Build the web app
echo "Building web application..."
npm run build

# Initialize Capacitor if it's the first time
# npx cap init is not needed as we've already created the config

# Add Android platform if not added yet
if [ ! -d "android" ]; then
  echo "Adding Android platform..."
  npx cap add android
fi

# Copy the web assets to the native project
echo "Syncing web assets to Android..."
npx cap sync

# Copy custom resources if available
echo "Copying custom Android resources..."
if [ -d "android-resources" ]; then
  # Create directories if they don't exist
  mkdir -p android/app/src/main/res/drawable
  mkdir -p android/app/src/main/res/mipmap-xxxhdpi
  
  # Copy icon and splash screen if available
  if [ -f "android-resources/icon.svg" ]; then
    echo "Copying app icon..."
    cp android-resources/icon.svg android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.svg
    echo "Icon copied. You'll need to convert it to PNG in Android Studio."
  fi
  
  if [ -f "android-resources/splash.svg" ]; then
    echo "Copying splash screen..."
    cp android-resources/splash.svg android/app/src/main/res/drawable/splash.svg
    echo "Splash screen copied. You'll need to convert it to PNG in Android Studio."
  fi
fi

# Open Android Studio
echo "Opening Android Studio..."
npx cap open android

echo "----------------------------------------------"
echo "Android Studio should be opening now."
echo ""
echo "In Android Studio:"
echo "1. Let Gradle sync complete"
echo "2. Convert SVG resources to PNG (use Android Studio's Vector Asset Studio)"
echo "3. Click 'Build > Build Bundle(s) / APK(s) > Build APK(s)'"
echo "4. Find the APK in android/app/build/outputs/apk/debug/"
echo "5. Transfer the APK to your phone to install it"
echo "----------------------------------------------"