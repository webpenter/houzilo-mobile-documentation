import { ExternalLink, Play, Smartphone } from 'lucide-react';
import { DocSection } from '../../types';

export const submission: DocSection = {
  title: "App Submission",
  icon: ExternalLink,
  subItems: {
    play_store: {
      title: "Google Play Store",
      icon: Play,
      tags: ["android", "submission", "checklist"],
      content: `
# Google Play Store Submission Checklist

This checklist guides you through preparing and submitting the **Houzilo** Flutter real estate app to the Google Play Store.

## Table of Contents

1. [Pre-Submission Setup](#pre-submission-setup)
2. [Firebase & Google Sign-In Configuration](#firebase--google-sign-in-configuration)
3. [App Configuration](#app-configuration)
4. [Release Signing](#release-signing)
5. [Build & Testing](#build--testing)
6. [Store Listing Assets](#store-listing-assets)
7. [Google Play Console Setup](#google-play-console-setup)
8. [Final Checks](#final-checks)
9. [Submission](#submission)

---

## Pre-Submission Setup

### 1. Google Play Developer Account

- [ ] Create a Google Play Developer account ($25 one-time fee)
- [ ] Complete identity verification
- [ ] Set up a payment profile
- [ ] Accept the Google Play Developer Distribution Agreement

**URL:** https://play.google.com/console/signup

### 2. Verify Your Flutter Environment

Run the following before producing any release build:

\`\`\`bash
flutter doctor
flutter clean
flutter pub get
flutter gen-l10n
flutter analyze
\`\`\`

All checks should pass with no errors before proceeding.

---

## Firebase & Google Sign-In Configuration

### 3. Get Production SHA-1 Certificate

#### 3.1 Create the App in Google Play Console First

- [ ] Go to https://play.google.com/console/
- [ ] Create a new app (before uploading any build)
- [ ] Opt in to **Google Play App Signing** (recommended — Google manages the final signing key)
- [ ] Navigate to: **Setup → App Signing**
- [ ] Copy the **SHA-1 certificate fingerprint** listed under "App signing key certificate"

#### 3.2 Register SHA-1 in Firebase Console

Go to: https://console.firebase.google.com/

- [ ] Open your Firebase project
- [ ] Go to **Project Settings → Your Apps → Android App**
- [ ] Click **Add fingerprint**
- [ ] Paste the production SHA-1 from step 3.1
- [ ] Download the updated **\`google-services.json\`**
- [ ] Replace the file at: \`android/app/google-services.json\`

> ⚠️ The \`google-services.json\` file must contain the production SHA-1 for Google Sign-In to work in the release build.

#### 3.3 Verify Firebase Configuration

- [ ] Open \`android/app/google-services.json\` and confirm the \`package_name\` matches: \`com.webpenter.houzilo\`
- [ ] Confirm the project number and app ID are correct (no debug/test Firebase project)
- [ ] Ensure both \`client_info\` SHA-1 entries (debug + production) are present

---

## App Configuration

### 4. Update App Version

Edit \`pubspec.yaml\`:

\`\`\`yaml
version: 1.4.0+4   # Format: versionName+versionCode
\`\`\`

- **versionName** (e.g., \`1.4.0\`): Human-readable version shown in the store
- **versionCode** (e.g., \`+4\`): Integer that must increment with every Play Store upload
- Never reuse a versionCode — even for rejected builds

Flutter reads these values automatically and injects them into the Android build via:
\`\`\`gradle
versionCode flutterVersionCode.toInteger()
versionName flutterVersionName
\`\`\`

### 5. Verify Application ID

Confirm in \`android/app/build.gradle\`:

\`\`\`gradle
namespace = "com.webpenter.houzilo"
applicationId "com.webpenter.houzilo"
\`\`\`

- [ ] Application ID matches the app registered in Google Play Console
- [ ] Application ID matches the package name in \`google-services.json\`
- [ ] Application ID matches the package name in Firebase Console

### 6. Review Android Permissions

Verify \`android/app/src/main/AndroidManifest.xml\` contains only required permissions:

\`\`\`xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.CAMERA"/>
\`\`\`

- [ ] Remove any permission that is not actively used by the app
- [ ] Location permissions are required for the distance calculator and map pin
- [ ] Camera is required for property image and profile photo upload

### 7. Verify Facebook Credentials

Confirm Facebook App ID is **not** hardcoded in \`strings.xml\`. It must be injected at build time from \`android/local.properties\`:

\`\`\`properties
facebookAppId=YOUR_FACEBOOK_APP_ID
facebookClientToken=YOUR_FACEBOOK_CLIENT_TOKEN
\`\`\`

- [ ] \`local.properties\` is NOT committed to Git
- [ ] \`build.gradle\` reads from \`localProperties\` via \`resValue\`

---

## Release Signing

### 8. Create a Release Keystore

If you do not already have a keystore, generate one:

\`\`\`bash
keytool -genkey -v -keystore upload-keystore.jks \\
  -keyalg RSA -keysize 2048 -validity 10000 -alias upload
\`\`\`

Store the \`.jks\` file somewhere secure — **back it up**. Losing it means you cannot update your app on the Play Store.

### 9. Configure \`key.properties\`

Create \`android/key.properties\` (this file must NOT be committed to Git):

\`\`\`properties
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=upload
storeFile=../upload-keystore.jks
\`\`\`

- [ ] \`key.properties\` is listed in \`.gitignore\`
- [ ] \`upload-keystore.jks\` is listed in \`.gitignore\`

The \`android/app/build.gradle\` file already reads from \`key.properties\` for the release signing config — no further changes needed.

### 10. Verify ProGuard is Enabled

Confirm \`android/app/build.gradle\` release block:

\`\`\`gradle
buildTypes {
  release {
    signingConfig signingConfigs.release
    minifyEnabled true
    shrinkResources true
    proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
  }
}
\`\`\`

- [ ] \`minifyEnabled true\` — code shrinking and obfuscation active
- [ ] \`shrinkResources true\` — unused resources stripped from APK

---

## Build & Testing

### 11. Build the Release App Bundle

\`\`\`bash
# Clean before building
flutter clean
flutter pub get
flutter gen-l10n

# Build the Android App Bundle (required for Play Store)
flutter build appbundle --release
\`\`\`

The output file will be at:
\`build/app/outputs/bundle/release/app-release.aab\`

> ✅ Use the \`.aab\` file for Play Store — not the \`.apk\`

### 12. Test the Release Build on a Device

Before uploading to the Play Store, install and test the release APK locally:

\`\`\`bash
flutter build apk --release
flutter install
\`\`\`

Or build a split APK for your device's architecture:

\`\`\`bash
flutter build apk --release --split-per-abi
\`\`\`

#### 12.1 Core Feature Testing Checklist

- [ ] App launches without crashing
- [ ] Onboarding screen displays correctly
- [ ] Email/password login and registration work with production backend
- [ ] Google Sign-In works (requires production SHA-1 in Firebase)
- [ ] Property listings load from the production WordPress backend
- [ ] Property detail screen — images, map, agent contact all load
- [ ] flutter_map tiles render (OpenStreetMap — no API key needed)
- [ ] Inquiry email form submits successfully
- [ ] Favorites save and persist
- [ ] Add Property wizard completes and publishes to backend
- [ ] Profile update and password change work
- [ ] Language switching (English ↔ Urdu) works
- [ ] Dark mode toggle works and persists
- [ ] JWT token is stored (not expired on second app open)
- [ ] App does NOT crash on back-button navigation through main screens

#### 12.2 Internal Testing via Play Console

- [ ] Upload \`.aab\` to **Google Play Console → Testing → Internal Testing**
- [ ] Add at least 1-2 tester email addresses
- [ ] Install via the internal testing URL on a real Android device
- [ ] Repeat core feature testing in this environment
- [ ] Review Google Play Console **Pre-launch report** for detected crashes

---

## Store Listing Assets

### 13. App Icon

- **Required size:** 512 × 512 px, PNG, no transparency
- Replace icon files in \`android/app/src/main/res/mipmap-*/\`
- Or use Flutter Launcher Icons package for automatic generation

### 14. Feature Graphic

- **Required size:** 1024 × 500 px, PNG or JPEG
- Should showcase the Houzilo brand/logo or a key property listing screen
- Create using Figma, Canva, or any design tool

### 15. Screenshots

**Requirements:**
- At least 2 screenshots required; 4–8 recommended
- Format: PNG or JPEG
- Phone: 1080 × 1920 (portrait) recommended

**Suggested screenshot order:**
- [ ] 1. Home screen — featured properties carousel + tabs
- [ ] 2. Property detail screen — images, price, agent contact
- [ ] 3. Advanced Search/Filter screen
- [ ] 4. Map view with property pin
- [ ] 5. Add Property wizard (Step 1 or Step 8 location)
- [ ] 6. Favorites / My Listings screen
- [ ] 7. Dark mode view (any screen)
- [ ] 8. Profile screen — language and dark mode settings

---

## Google Play Console Setup

### 16. Create App in Play Console

Go to: https://play.google.com/console/

- [ ] Click **"Create app"**
- [ ] App name: **Houzilo** (or your white-label name)
- [ ] Default language: **English (United States)**
- [ ] App or game: **App**
- [ ] Free or paid: **Free**
- [ ] Accept all declarations

### 17. Store Listing

#### App Name & Description

- [ ] **App name:** Houzilo — Real Estate App (max 50 chars)

- [ ] **Short description** (80 chars max):
\`\`\`
Browse, discover & inquire on properties. Your real estate companion.
\`\`\`

- [ ] **Full description** (4000 chars max):
\`\`\`
Houzilo is a powerful real estate mobile app that connects property seekers
with listings, agents, and agencies — all in one place.

KEY FEATURES:
• Browse thousands of properties — houses, apartments, villas & more
• Advanced search with filters: type, price, area, beds, baths, location
• Stunning property detail pages with image galleries and floor plans
• Interactive maps powered by OpenStreetMap — no hidden API costs
• Submit inquiries directly to agents via email from the app
• Save favorite properties to revisit later
• Add and manage your own property listings with a 9-step wizard
• Write and read property reviews with star ratings
• Distance calculator — see how far a property is from your location
• Get Directions — opens Google Maps or Apple Maps natively
• Full dark mode and light mode support
• Available in English and Urdu

FOR PROPERTY SEEKERS:
Discover properties tailored to your needs. Filter by price, type,
location, and amenities. View detailed specs, photos, floor plans,
and contact agents directly — all without leaving the app.

FOR PROPERTY LISTERS:
Publish listings directly from your phone using our 9-step wizard.
Add photos, floor plans, sub-listings, amenities, location pin,
and contact preferences. Save drafts, edit anytime, delete when sold.

SECURE & PRIVATE:
• JWT tokens stored in encrypted device storage (Android Keystore)
• All communication over HTTPS
• GDPR-friendly data handling

Download Houzilo today and find your dream property!
\`\`\`

#### Categorization

- [ ] **App category:** House & Home (or Real Estate)
- [ ] **Tags:** real estate, property, house hunting, apartment, home finder

#### Contact Details

- [ ] **Email:** support@webpenter.com
- [ ] **Website:** https://webpenter.com
- [ ] **Privacy Policy URL:** *(required — must be a live, accessible URL)*

> ⚠️ You MUST provide a working Privacy Policy URL. Publish it on your website before submitting.

### 18. App Content

#### Data Safety (Required by Google)

Go to **App Content → Data Safety** and fill in:

- [ ] **Data collected:**
  - Personal info: Name, email address
  - Location: Approximate location (for map and distance features)
  - Photos: Profile photos and property images (user-uploaded)
  - App activity: Search queries, saved/favorite properties

- [ ] **Data shared:** Not sold to third parties. Shared only with your WordPress backend.

- [ ] **Security practices:**
  - Data encrypted in transit (HTTPS/TLS)
  - JWT tokens encrypted at rest (Android Keystore)
  - Users can request account deletion from the app (Profile → Security → Delete Account)

#### Content Rating

- [ ] Complete the content rating questionnaire
- [ ] Expected rating: **Everyone** (no violent, adult, or restricted content)

#### Privacy Policy

Your privacy policy must cover:
- What data is collected (name, email, location, photos)
- How it is used (authentication, property search, inquiry submission)
- Third-party services (Firebase Authentication, WordPress backend)
- User rights (data access, deletion)
- Contact information

### 19. Release

#### Create Production Release

- [ ] Go to **Release → Production → Create new release**
- [ ] Upload the \`.aab\` file from \`build/app/outputs/bundle/release/app-release.aab\`
- [ ] Add release notes:

\`\`\`
Houzilo v1.4.0 — Real Estate App

• Browse property listings with advanced search and filters
• View full property details: images, floor plans, maps, agent contacts
• Submit inquiries directly to agents from the app
• Add and manage your own property listings
• Save favorites, write reviews, and switch between English & Urdu
• Full dark mode support
• Secure JWT login — supports Email/Password and Google Sign-In

We're excited to bring Houzilo to Android. Download and find your next property today!
\`\`\`

#### Countries & Distribution

- [ ] Select countries/regions for distribution (All countries recommended)
- [ ] Staged rollout: optionally start with 10–20%, then expand to 100%

---

## Final Checks

### 20. Pre-Submission Checklist

**App Quality:**
- [ ] Tested on at least 2 different Android devices/versions (API 23 minimum)
- [ ] No crashes in any main user flow
- [ ] Production backend URL set in \`lib/core/network/dio_client.dart\` (uses \`https://\`)
- [ ] Google Sign-In works with production SHA-1 registered
- [ ] JWT login persists across app restarts
- [ ] Maps load correctly (OpenStreetMap tiles visible)
- [ ] Inquiry form submits successfully to backend

**Store Listing:**
- [ ] App name, short description, and full description are accurate
- [ ] Screenshots showcase key Houzilo features
- [ ] Feature graphic is professional and on-brand
- [ ] Privacy policy URL is live and accessible
- [ ] Contact email is monitored

**Technical:**
- [ ] \`applicationId\` is \`com.webpenter.houzilo\` (or your custom ID)
- [ ] \`versionCode\` incremented from the last upload
- [ ] \`google-services.json\` contains production SHA-1
- [ ] Release build signed with correct keystore
- [ ] \`local.properties\` and \`key.properties\` are NOT committed to Git
- [ ] ProGuard enabled (\`minifyEnabled true\`)

**Compliance:**
- [ ] Data Safety form completed accurately
- [ ] Content rating questionnaire completed
- [ ] Privacy policy covers all data collected
- [ ] App complies with Google Play policies
- [ ] No copyrighted third-party content used without permission

---

## Submission

### 21. Submit for Review

- [ ] Go to **Publishing overview**
- [ ] Confirm all sections show green checkmarks
- [ ] Click **"Send X items for review"**
- [ ] Google review typically takes **1–7 business days**

### 22. Post-Submission

**Monitor review status:**
- [ ] Check Google Play Console daily
- [ ] Respond promptly to any clarification requests from Google

**After approval:**
- [ ] App is live at: \`https://play.google.com/store/apps/details?id=com.webpenter.houzilo\`
- [ ] Share the Play Store link with users
- [ ] Monitor user reviews and ratings in Play Console
- [ ] Respond to user feedback
- [ ] Plan first update based on initial user reviews

---

## Build Commands Reference

\`\`\`bash
# Clean project
flutter clean

# Get dependencies
flutter pub get

# Regenerate localization files
flutter gen-l10n

# Run static analysis
flutter analyze

# Build release App Bundle (for Play Store)
flutter build appbundle --release

# Build release APK (for direct install / testing)
flutter build apk --release

# Build split APKs by architecture (smaller file size)
flutter build apk --release --split-per-abi

# Install release APK directly to connected device
flutter install
\`\`\`

---

## Troubleshooting Common Issues

### "Google Sign-In not working in release build"

**Cause:** Production SHA-1 not registered in Firebase.

**Fix:**
1. Go to Google Play Console → Setup → App Signing → copy SHA-1
2. Add it to Firebase Console → Project Settings → Android App → Add fingerprint
3. Download fresh \`google-services.json\` and replace \`android/app/google-services.json\`
4. Rebuild: \`flutter clean && flutter build appbundle --release\`

---

### "App rejected — incomplete Data Safety section"

**Fix:**
1. Go to Play Console → App Content → Data Safety
2. Fill in all questions about data collection, usage, and sharing
3. Ensure your Privacy Policy URL is live and covers all points listed
4. Resubmit

---

### "Release build crashes but debug works"

**Cause:** ProGuard stripping required classes.

**Fix:**
1. Test with obfuscation disabled first:
\`\`\`bash
flutter build apk --release --no-shrink
\`\`\`
2. If it works, add ProGuard keep rules in \`android/app/proguard-rules.pro\` for the affected classes (commonly Dio, Firebase, or Retrofit serialization classes)

---

### "versionCode already used" upload error

**Fix:** Increment \`versionCode\` in \`pubspec.yaml\`:
\`\`\`yaml
version: 1.4.1+5   # Increment the number after +
\`\`\`

---

## Useful Links

- **Google Play Console:** https://play.google.com/console/
- **Firebase Console:** https://console.firebase.google.com/
- **Flutter Build Docs:** https://docs.flutter.dev/deployment/android
- **Google Play Policies:** https://play.google.com/about/developer-content-policy/
- **Data Safety Guide:** https://support.google.com/googleplay/android-developer/answer/10787469
- **Flutter Launcher Icons:** https://pub.dev/packages/flutter_launcher_icons

---

**Last Updated:** 2026-02-23
**Support:** support@webpenter.com (include ThemeForest purchase code)

Good luck with your Google Play Store submission! 🚀
`
    },
    app_store: {
      title: "Apple App Store",
      icon: Smartphone,
      tags: ["ios", "submission", "coming-soon"],
      content: `
# Apple App Store Submission

> ## 🚧 Not Yet Available
>
> **Houzilo has not been submitted to the Apple App Store at this time.**
>
> The app is currently available exclusively on the **Google Play Store** for Android devices.

---

## Current Platform Availability

| Platform | Status |
|---|---|
| 🤖 Google Play Store (Android) | ✅ Available |
| 🍎 Apple App Store (iOS) | 🔜 Coming Soon |

---

## iOS Submission — Future Plans

An iOS build and App Store submission is planned for a future release. When that process begins, this section will be updated with the full Apple App Store submission checklist, covering:

- Apple Developer Program enrollment ($99/year)
- Bundle ID and App Identifier registration
- Firebase \`GoogleService-Info.plist\` configuration for iOS
- Release signing with Apple Distribution certificates and provisioning profiles
- Building the IPA via \`flutter build ipa --release\`
- TestFlight beta testing
- App Store Connect listing — screenshots, descriptions, privacy policy
- App Store Review Guidelines compliance
- Submission and review process

---

## iOS Build (For Development Use)

Although the app is not submitted to the App Store, you can still build and run the Flutter app on iOS devices for development and testing purposes.

### Prerequisites

- macOS with Xcode installed (latest version)
- Apple Developer account (free tier works for device testing)
- CocoaPods installed: \`sudo gem install cocoapods\`

### Running on iOS

\`\`\`bash
# Install iOS dependencies
cd ios && pod install && cd ..

# Run on iOS Simulator
flutter run

# Run on a connected physical iOS device
flutter run --release
\`\`\`

### iOS Firebase Configuration

For Google Sign-In to work on iOS, ensure \`ios/Runner/GoogleService-Info.plist\` is present and contains your Firebase iOS app configuration. Add your iOS Bundle ID to the Firebase project and download the fresh plist file from Firebase Console.

---

## Stay Updated

For updates on the iOS / App Store release, contact:

📧 **Email:** support@webpenter.com
🔖 **ThemeForest Purchase Code:** Required for support

---

**Last Updated:** 2026-02-23
`
    }
  }
};

export default submission;
