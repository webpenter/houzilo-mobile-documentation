import{S as e}from"./index-DwI90R08.js";const i={title:"Configuration",icon:e,tags:["env","api","firebase"],content:`
# Configuration Guide

Complete reference for all configurable settings in the Houzilo Flutter App. Items not applicable to this app (Push Notifications, Payment Gateway) have been omitted.

## Table of Contents
- [App Configuration](#app-configuration)
- [Backend Integration](#backend-integration)
- [Google Services Setup](#google-services-setup)
- [Authentication Configuration](#authentication-configuration)
- [Maps Configuration](#maps-configuration)
- [App Branding](#app-branding)
- [Build Configuration](#build-configuration)
- [Environment Variables](#environment-variables)

---

## App Configuration

Core application settings managed in \`pubspec.yaml\` and \`main.dart\`.

**App Name & Version** (\`pubspec.yaml\`):
\`\`\`yaml
name: houzilo
version: 1.0.0+2        # version name + build number
\`\`\`

**Supported Languages** (\`main.dart\`):
\`\`\`dart
supportedLocales: const [
  Locale('en'),   // English (default)
  Locale('ur'),   // Urdu
],
\`\`\`

**Text Scaling Limits** (prevents broken layouts on accessibility settings):
\`\`\`dart
textScaler: MediaQuery.of(context).textScaler
    .clamp(minScaleFactor: 0.8, maxScaleFactor: 1.6),
\`\`\`

**Asset Folders** (\`pubspec.yaml\`):
\`\`\`yaml
assets:
  - assets/jpg/
  - assets/svg/
  - assets/png/
\`\`\`

---

## Backend Integration

The app uses a WordPress REST API backend powered by the **Houzez Theme**.

**File:** \`lib/core/network/dio_client.dart\`

\`\`\`dart
BaseOptions(
  baseUrl: 'https://houzez.webpenter.com/wp-json/', // 🔁 Change this to your domain
  connectTimeout: Duration(seconds: 30),
  receiveTimeout: Duration(seconds: 30),
)
\`\`\`

> To point the app to your own backend, replace the \`baseUrl\` value with your WordPress domain. All API calls are relative to this URL.

**Timeout Settings:**
| Setting | Value | Description |
|---|---|---|
| \`connectTimeout\` | 30s | Max time to establish connection |
| \`receiveTimeout\` | 30s | Max time to receive full response |

**WordPress Requirements:**
*   Houzez Theme activated
*   REST API enabled
*   JWT Authentication plugin configured

---

## Google Services Setup

**File (Android):** \`android/app/google-services.json\`
**File (iOS):** \`ios/Runner/GoogleService-Info.plist\`

These files are generated from the Firebase Console and must match the app's package/bundle ID.

| Platform | File | Location |
|---|---|---|
| Android | \`google-services.json\` | \`android/app/\` |
| iOS | \`GoogleService-Info.plist\` | \`ios/Runner/\` |

**Android Plugin Integration** (\`android/app/build.gradle\`):
\`\`\`gradle
plugins {
    id 'com.google.gms.google-services' // ← Required for Firebase
}
\`\`\`

**Enabled Firebase Services:**
*   ✅ Firebase Authentication (Email/Password + Google)
*   ✅ Cloud Firestore (used via \`firebase_core\`)
*   ❌ Firebase Messaging / Push Notifications (not configured)

---

## Authentication Configuration

Authentication is managed by **Firebase Auth** + **WordPress JWT**.

### Email/Password Auth
Handled automatically by Firebase. No additional config required beyond \`google-services.json\`.

### Google Sign-In

**Android — SHA-1 Fingerprint:**
Add your debug and release SHA-1 keys in the Firebase Console under Project Settings → Your Android App.

\`\`\`bash
# Get debug SHA-1
keytool -list -v \\
  -keystore ~/.android/debug.keystore \\
  -alias androiddebugkey \\
  -storepass android -keypass android
\`\`\`

**iOS — URL Scheme (\`ios/Runner/Info.plist\`):**
Ensure \`REVERSED_CLIENT_ID\` is present (automatically added by \`GoogleService-Info.plist\`):
\`\`\`xml
<key>CFBundleURLSchemes</key>
<array>
  <string>$(REVERSED_CLIENT_ID)</string>
</array>
\`\`\`

### JWT Token Storage
Auth tokens are stored using \`flutter_secure_storage\`:
- **iOS:** Apple Keychain
- **Android:** Android Keystore

**Key Names Used:**

| Key | Value Stored |
|---|---|
| \`auth_token\` | JWT Bearer token |
| \`token_valid\` | \`'true'\` / \`'false'\` |
| \`auth_provider\` | \`'password'\` or \`'google'\` |
| \`userTypeGoogle\` | \`'true'\` if Google user |

---

## Maps Configuration

The app uses **flutter_map** with **OpenStreetMap** tiles — no API key required.

**Tile URL Template:**
\`\`\`dart
TileLayer(
  urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  userAgentPackageName: 'com.houzilo.app',
)
\`\`\`

**Map Attribution (required by OSM license):**
\`\`\`dart
RichAttributionWidget(
  attributions: [
    TextSourceAttribution('© OpenStreetMap contributors'),
    TextSourceAttribution('© CARTO'),
  ],
)
\`\`\`

**Map Features in Use:**
*   Property location pins on Detail screen
*   Location picker on Add Property Wizard (Step 8)
*   Search by Map view in Filter screen
*   Property Details Map full-screen view

**Geolocation Package:** \`geolocator\` — used to calculate distance from user to property.

---

## App Branding

All brand assets are centralized in two files.

### Color Palette (\`lib/utils/app_colors.dart\`)

| Token | Hex | Usage |
|---|---|---|
| \`primary\` | \`#54C4D9\` | Buttons, links, icons |
| \`secondary\` | \`#85C341\` | Accent highlights |
| \`accent\` | \`#ED1066\` | Badges, promotions |
| \`success\` | \`#10B981\` | Confirmations |
| \`error\` | \`#EF4444\` | Errors, delete actions |
| \`warning\` | \`#F59E0B\` | Alerts |

**To change the primary brand color**, update \`app_colors.dart\`:
\`\`\`dart
static const Color primary = Color(0xFF54C4D9); // ← Change this hex
\`\`\`

### Logo & Image Assets (\`lib/utils/image_path.dart\`)

| Asset | Path | Used For |
|---|---|---|
| \`houziloLogo2\` | \`assets/png/houzilo-logo2.png\` | App bar logo |
| \`houziloSplashLight\` | \`assets/png/splash-light.png\` | Light mode splash |
| \`houziloSplashDark\` | \`assets/png/splash-dark.png\` | Dark mode splash |
| \`logo4\` | \`assets/png/logo4.png\` | Profile avatar fallback |

**To replace the logo:**
1.  Add your new image to \`assets/png/\`.
2.  Update the corresponding path constant in \`lib/utils/image_path.dart\`.
3.  Run \`flutter pub get\`.

### App Name
*   **Android:** \`android/app/src/main/AndroidManifest.xml\` → \`android:label\`
*   **iOS:** \`ios/Runner/Info.plist\` → \`CFBundleDisplayName\`

---

## Build Configuration

### Android (\`android/app/build.gradle\`)

| Setting | Value |
|---|---|
| \`applicationId\` | \`com.webpenter.houzilo\` |
| \`minSdkVersion\` | \`23\` (Android 6.0+) |
| \`compileSdkVersion\` | Flutter default (34) |
| \`buildToolsVersion\` | \`34.0.0\` |
| Java / Kotlin Target | \`VERSION_17\` |

**Release Signing** (\`key.properties\`):
Create \`android/key.properties\` (do NOT commit to Git):
\`\`\`properties
storePassword=your-keystore-password
keyPassword=your-key-password
keyAlias=your-key-alias
storeFile=upload-keystore.jks
\`\`\`

**Release Build Optimizations:**
\`\`\`gradle
buildTypes {
  release {
    minifyEnabled true       // Removes unused code
    shrinkResources true     // Removes unused resources
    signingConfig signingConfigs.release
  }
}
\`\`\`

### iOS
- **Bundle ID:** Set in \`ios/Runner.xcodeproj\` → Target → Signing & Capabilities
- **Minimum iOS Version:** 13.0
- **Deployment Target:** Set in \`ios/Podfile\`

---

## Environment Variables

The app uses \`android/local.properties\` for sensitive values that should **not** be committed to source control.

**\`android/local.properties\`** (create/edit this file):
\`\`\`properties
# Flutter SDK path (auto-generated)
flutter.sdk=/path/to/flutter

# Version info (auto-generated)
flutter.versionCode=2
flutter.versionName=1.0.0

# Facebook Credentials (if using Facebook login)
facebookAppId=YOUR_FACEBOOK_APP_ID
facebookClientToken=YOUR_FACEBOOK_CLIENT_TOKEN
\`\`\`

> These values are injected at build time via \`build.gradle\`:
> \`\`\`gradle
> resValue "string", "facebook_app_id", localProperties.getProperty("facebookAppId", "")
> \`\`\`

**⚠️ Security Note:** Always add these files to \`.gitignore\`:
\`\`\`
android/local.properties
android/key.properties
android/app/upload-keystore.jks
ios/Runner/GoogleService-Info.plist
android/app/google-services.json
\`\`\`
  `};export{i as configuration,i as default};
