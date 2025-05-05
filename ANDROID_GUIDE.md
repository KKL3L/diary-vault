# Building and Running My Diary as an Android App

This guide will help you convert the web app to an Android APK file and run it on your phone.

## Prerequisites

1. [Android Studio](https://developer.android.com/studio) installed on your computer
2. USB debugging enabled on your Android device (for direct installation)
3. Java Development Kit (JDK) 11 or newer

## Steps to Build the APK

### 1. Build the Web App and Initialize Capacitor

Run the build script we've prepared:

```bash
./build-android.sh
```

This will:
- Build the web application
- Add the Android platform (if needed)
- Sync the web assets to the Android project
- Copy custom icons and resources
- Open Android Studio with the project

### 2. Build the APK in Android Studio

Once Android Studio opens:

1. Wait for the Gradle sync to complete 
2. Convert SVG resources to PNG (if needed):
   - Right-click on the `res` folder → New → Vector Asset
   - Select the SVG files and convert them
3. Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**
4. Once the build is complete, click on the notification "APK(s) generated successfully" and select "locate" to find the APK file
5. The APK will be in `android/app/build/outputs/apk/debug/app-debug.apk`

### 3. Install on Your Device

There are several ways to install the APK:

#### Method 1: Direct USB installation

1. Connect your Android device to your computer with a USB cable
2. Ensure USB debugging is enabled on your device
3. In Android Studio, click on **Run > Run 'app'**
4. Select your device from the list and click OK

#### Method 2: Copy APK to device

1. Copy the APK file to your device via USB, email, or cloud storage
2. On your device, open the file manager and locate the APK
3. Tap the APK file to install (you may need to allow installation from unknown sources in Settings → Security)

### 4. Testing the App on Your Device

After installation:

1. Open the app from your device's home screen
2. Test creating a new diary entry:
   - Tap the + button at the bottom right
   - Add some text and/or an image
   - Save the entry and verify it appears in the feed
3. Test editing an entry:
   - Tap the pencil icon on an entry
   - Modify the text or image
   - Save changes and verify they appear
4. Test deleting an entry:
   - Tap the trash icon on an entry
   - Confirm deletion
   - Verify the entry is removed from the feed
5. Test offline functionality:
   - Put your device in airplane mode
   - Make sure you can still create, view, edit, and delete entries

## Troubleshooting

### App Not Working on Device

1. Check if the app has storage permissions (Settings → Apps → My Diary → Permissions)
2. Make sure your device's Android version is compatible (Android 5.0+)
3. If you see a white screen, try these solutions:
   - Update the capacitor.config.ts file to include:
     ```typescript
     server: {
       androidScheme: "https",
       allowNavigation: ["*"]
     }
     ```
   - Then rebuild the app

### Building Issues

1. Make sure you have the right version of JDK installed
2. Check Android Studio for any specific error messages
3. Look at the Gradle console in Android Studio for detailed build errors
4. If you encounter "Manifest merger failed" errors, you may need to adjust the AndroidManifest.xml file

## Publishing to Play Store (Future Steps)

To publish your app to the Google Play Store:

1. Create a signed release APK or App Bundle:
   - In Android Studio, go to Build → Generate Signed Bundle/APK
   - Follow the wizard to create a new keystore or use an existing one
   - Select APK or Bundle format (Bundle is recommended for Play Store)
   - Complete the build process
2. Create a Google Play Developer account ($25 one-time fee)
3. Follow the Google Play Console instructions to submit your app
4. Prepare marketing materials like screenshots, feature graphic, and app description