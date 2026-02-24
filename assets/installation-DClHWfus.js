import{T as e}from"./index-DwI90R08.js";const t={title:"Installation",icon:e,tags:["setup","terminal","wordpress"],content:`
# Installation & Setup Guide

Complete step-by-step instructions to get the Houzilo Flutter app running on your local machine.

## Table of Contents
- [Prerequisites](#prerequisites)
- [System Setup](#system-setup)
- [Project Installation](#project-installation)
- [Backend Setup](#backend-setup)
- [Third-Party Services Configuration](#third-party-services-configuration)
- [Running the App](#running-the-app)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

| Tool | Required Version | Purpose |
|---|---|---|
| Flutter SDK | \`>=3.4.0 <4.0.0\` | Core framework |
| Dart SDK | Included with Flutter | Language runtime |
| Android Studio | Latest | Android emulator & SDK |
| Xcode | 15+ (macOS only) | iOS simulator & build tools |
| Git | Any | Source code management |
| Node.js / npm | Latest LTS | Optional tooling |

**Accounts Required:**
*   Google account (for Firebase & Google Sign-In setup)
*   Access to the WordPress backend (\`houzez.webpenter.com\`)

---

## System Setup

### 1. Install Flutter SDK
\`\`\`bash
# Download Flutter from https://docs.flutter.dev/get-started/install
# Extract and add to PATH, then verify:
flutter doctor
\`\`\`
Resolve all issues reported by \`flutter doctor\` before proceeding.

### 2. Android Setup
1.  Install **Android Studio** from [developer.android.com](https://developer.android.com/studio).
2.  Open Android Studio → **SDK Manager** → Install:
    *   Android SDK Platform 34 (or latest)
    *   Android SDK Command-line Tools
    *   Android Emulator
3.  Accept all licenses:
\`\`\`bash
flutter doctor --android-licenses
\`\`\`

### 3. iOS Setup (macOS only)
1.  Install **Xcode** from the Mac App Store.
2.  Install Command Line Tools:
\`\`\`bash
xcode-select --install
sudo xcodebuild -license accept
\`\`\`
3.  Install CocoaPods:
\`\`\`bash
sudo gem install cocoapods
\`\`\`

---

## Project Installation

### 1. Clone the Repository
\`\`\`bash
git clone <your-repository-url>
cd houzilo
\`\`\`

### 2. Install Flutter Dependencies
\`\`\`bash
flutter pub get
\`\`\`

### 3. Generate Localization Files
The app uses \`flutter_gen\` for multi-language support. Run:
\`\`\`bash
flutter gen-l10n
\`\`\`

### 4. iOS Specific Setup (macOS only)
\`\`\`bash
cd ios
pod install
cd ..
\`\`\`

---

## Backend Setup

The app connects to a **WordPress backend** using the Houzez Theme REST API.

### 1. Configure the API Base URL
Open \`lib/core/network/dio_client.dart\` and update the \`baseUrl\`:

\`\`\`dart
BaseOptions(
  baseUrl: 'https://YOUR-WORDPRESS-DOMAIN.com/wp-json/',
  // ...
)
\`\`\`

> **Note:** Replace \`https://houzez.webpenter.com/wp-json/\` with your own WordPress domain.

### 2. WordPress Backend Requirements
Ensure your WordPress site has the following:
*   **Houzez Theme** installed and activated.
*   **Houzez API plugin** *(or equivalent REST API plugin)* enabled.
*   **JWT Authentication for WP-API** plugin installed and configured.
*   **CORS headers** enabled on the server to allow mobile requests.

### 3. Configure JWT Authentication
In your WordPress \`wp-config.php\`, add:
\`\`\`php
define('JWT_AUTH_SECRET_KEY', 'your-secret-key-here');
define('JWT_AUTH_CORS_ENABLE', true);
\`\`\`

---

## Third-Party Services Configuration

### 1. Firebase Setup (Required for Auth)

**Step 1: Create a Firebase Project**
1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project (e.g., \`Houzilo\`).
3.  Enable **Firebase Authentication** → Sign-in methods:
    *   ✅ Email/Password
    *   ✅ Google

**Step 2: Add Android App**
1.  In Firebase Console, add an Android app.
2.  Package name: \`com.houzilo.app\` *(check \`android/app/build.gradle\` for exact name)*
3.  Download \`google-services.json\`.
4.  Place the file in: \`android/app/google-services.json\` *(replaces existing file)*.

**Step 3: Add iOS App (macOS only)**
1.  In Firebase Console, add an iOS app.
2.  Bundle ID: Check \`ios/Runner.xcodeproj\` for the bundle identifier.
3.  Download \`GoogleService-Info.plist\`.
4.  Place the file in: \`ios/Runner/GoogleService-Info.plist\`.

### 2. Google Sign-In Configuration

**Android:**
1.  In Firebase Console → Authentication → Sign-in Method → Google → Enable.
2.  Copy the **SHA-1 fingerprint** from your keystore:
\`\`\`bash
# Debug keystore (for development)
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
\`\`\`
3.  Add the SHA-1 to your Firebase Android app settings.

**iOS:**
1.  Open \`ios/Runner/Info.plist\`.
2.  Ensure \`REVERSED_CLIENT_ID\` is set *(automatically included in \`GoogleService-Info.plist\`)*.

---

## Running the App

### 1. Check Connected Devices
\`\`\`bash
flutter devices
\`\`\`

### 2. Run on Android Emulator or Device
\`\`\`bash
# Start Android emulator first (if not already running)
flutter emulators --launch <emulator_id>

# Run the app
flutter run
\`\`\`

### 3. Run on iOS Simulator (macOS only)
\`\`\`bash
open -a Simulator
flutter run
\`\`\`

### 4. Run in Debug Mode with Verbose Logging
\`\`\`bash
flutter run --verbose
\`\`\`

### 5. Build for Release

**Android APK:**
\`\`\`bash
flutter build apk --release
# Output: build/app/outputs/flutter-apk/app-release.apk
\`\`\`

**Android App Bundle (Play Store):**
\`\`\`bash
flutter build appbundle --release
# Output: build/app/outputs/bundle/release/app-release.aab
\`\`\`

**iOS (macOS only):**
\`\`\`bash
flutter build ios --release
# Then archive via Xcode for App Store submission
\`\`\`

---

## Troubleshooting

### ❌ \`flutter pub get\` fails
**Solution:** Clear the pub cache and retry:
\`\`\`bash
flutter clean
flutter pub cache repair
flutter pub get
\`\`\`

### ❌ \`google-services.json\` not found / Firebase error
**Solution:** Ensure \`google-services.json\` is placed in \`android/app/\` and that \`apply plugin: 'com.google.gms.google-services'\` is at the bottom of \`android/app/build.gradle\`.

### ❌ iOS build fails: CocoaPods error
**Solution:**
\`\`\`bash
cd ios
pod deintegrate
pod install
cd ..
\`\`\`

### ❌ API returns 401 Unauthorized
**Solution:**
*   Verify the JWT plugin is active on WordPress.
*   Ensure the user's token is valid (try logging out and back in).
*   Check if CORS is enabled on the server.

### ❌ Google Sign-In fails on Android
**Solution:**
*   Confirm correct SHA-1 is added in Firebase Console.
*   Re-download and replace \`google-services.json\`.
*   Run \`flutter clean && flutter run\`.

### ❌ \`flutter doctor\` shows missing tools
**Solution:** Follow the specific instructions shown in the \`flutter doctor\` output. Common fixes:
*   Android licenses: \`flutter doctor --android-licenses\`
*   Xcode: Install via Mac App Store and run \`sudo xcodebuild -license accept\`.

### ❌ App crashes on launch in Release mode
**Solution:**
*   Ensure \`google-services.json\` / \`GoogleService-Info.plist\` are production files (not debug).
*   Check \`lib/main.dart\` for any missing provider registrations.
*   Run \`flutter analyze\` to find any static errors.
  `};export{t as default,t as installation};
