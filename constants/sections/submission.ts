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

This comprehensive checklist will guide you through preparing and submitting your BookHere app to the Google Play Store.

## Table of Contents

1. [Pre-Submission Setup](#pre-submission-setup)
2. [Environment Variables & API Keys](#environment-variables--api-keys)
3. [App Configuration](#app-configuration)
4. [Build & Testing](#build--testing)
5. [Store Listing Assets](#store-listing-assets)
6. [Google Play Console Setup](#google-play-console-setup)
7. [Final Checks](#final-checks)
8. [Submission](#submission)

---

## Pre-Submission Setup

### 1. Google Play Developer Account

- [ ] Create a Google Play Developer account ($25 one-time fee)
- [ ] Complete identity verification
- [ ] Set up payment profile (for paid apps or in-app purchases)
- [ ] Accept Google Play Developer Distribution Agreement

**URL:** https://play.google.com/console/signup

---

## Environment Variables & API Keys

### 2. Production Environment Variables

#### 2.1 Get Production SHA-1 Certificate

- [ ] Create your app in Google Play Console
- [ ] Opt in to Google Play App Signing (recommended)
- [ ] Go to: **Google Play Console → Your App → Setup → App Signing**
- [ ] Copy the **SHA-1 certificate fingerprint** (under "App signing key certificate")

#### 2.2 Configure Google Cloud Console

Go to: https://console.cloud.google.com/apis/credentials

##### Google OAuth (Sign-In)

- [ ] Create **Android OAuth 2.0 Client ID**:
  - Package name: \`com.webpenter.googlesignin\`
  - SHA-1 fingerprint: [Paste production SHA-1 from step 2.1]
  - Copy the Client ID

- [ ] Create **iOS OAuth 2.0 Client ID** (if not already created):
  - Bundle ID: \`com.webpenter.googlesignin\`
  - Copy the Client ID

- [ ] Create **Web OAuth 2.0 Client ID** (if not already created):
  - Copy the Client ID

##### Google Maps API

- [ ] Create a **production API key** (or use existing)
- [ ] Restrict the key:
  - Application restrictions: **Android apps**
  - Add package name: \`com.webpenter.googlesignin\`
  - Add SHA-1 fingerprint: [Paste production SHA-1]
- [ ] Enable required APIs:
  - [ ] Maps SDK for Android
  - [ ] Places API (if used)
  - [ ] Geocoding API (if used)

#### 2.3 Configure Firebase Console

Go to: https://console.firebase.google.com/

- [ ] Open your Firebase project
- [ ] Go to **Project Settings**
- [ ] Add production SHA-1 certificate fingerprint
- [ ] Download new **google-services.json** for Android
- [ ] Replace the file in your project root: \`/google-services.json\`

#### 2.4 Update Production Environment File

Edit: \`/Users/apple/homey-mobile-apps-react/.env.production\`

\`\`\`bash
# Production Environment Variables

# Google OAuth Client IDs(REPLACE WITH YOUR PRODUCTION VALUES)
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=YOUR_PRODUCTION_IOS_CLIENT_ID.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=YOUR_PRODUCTION_WEB_CLIENT_ID.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=YOUR_PRODUCTION_ANDROID_CLIENT_ID.apps.googleusercontent.com

# Google Maps API Key(Production)
GOOGLE_MAPS_API_KEY=YOUR_PRODUCTION_GOOGLE_MAPS_API_KEY

# App Configuration
APP_VARIANT=production
          \`\`\`

- [ ] Replace all \`YOUR_PRODUCTION_*\` placeholders with actual values from steps 2.2 and 2.3
- [ ] Save the file
- [ ] **DO NOT commit this file to git** (already in .gitignore)

---

## App Configuration

### 3. Update App Version

Edit: \`app.config.js\`

- [ ] Update version number: \`version: "3.0.0"\` → \`"X.Y.Z"\`
- [ ] Update Android versionCode: \`versionCode: 10\` → increment by 1 (e.g., \`11\`)
- [ ] Update iOS buildNumber: \`buildNumber: \"10\"\` → increment by 1 (e.g., \`\"11\"\`)

**Version Guidelines:**
- Major version (X): Breaking changes
- Minor version (Y): New features
- Patch version (Z): Bug fixes
- versionCode: Must increment with each release (used by Google Play)

### 4. App Bundle Identifier

Verify in \`app.config.js\`:

\`\`\`javascript
android: {
  package: "com.webpenter.googlesignin",  // Must match Google Cloud Console
  versionCode: 11,
  // ...
}
\`\`\`

- [ ] Confirm package name matches all Google services configurations

### 5. App Permissions

Review in \`app.config.js\` (android.permissions):

- [ ] Remove any unnecessary permissions
- [ ] Ensure required permissions are present:
  - \`android.permission.INTERNET\`
  - \`android.permission.USE_BIOMETRIC\` (if using biometric auth)
  - \`android.permission.RECORD_AUDIO\` (if using audio features)

---

## Build & Testing

### 6. Build Production APK/AAB

#### 6.1 Clean Build

\`\`\`bash
# Remove old builds
rm -rf node_modules
rm -rf .expo

# Reinstall dependencies
npm install
\`\`\`

#### 6.2 Create Production Build

\`\`\`bash
# Build Android App Bundle(AAB) for production
eas build --platform android --profile production
  \`\`\`

**Build Configuration:**
- EAS will automatically use \`.env.production\` values (configured in \`eas.json\`)
- Build will create an \`.aab\` file (Android App Bundle)
- Wait for build to complete (check status at: https://expo.dev)

#### 6.3 Download Build

- [ ] Go to https://expo.dev/accounts/[your-account]/projects/bookhere/builds
- [ ] Download the production \`.aab\` file
- [ ] Save it to a secure location

### 7. Testing

#### 7.1 Internal Testing

- [ ] Upload \`.aab\` to Google Play Console → Internal Testing track
- [ ] Add testers (email addresses)
- [ ] Test all core features:
  - [ ] Google Sign-In (production credentials)
  - [ ] Google Maps functionality
  - [ ] Biometric authentication
  - [ ] Push notifications
  - [ ] Payment flow (if applicable)
  - [ ] All navigation and features

#### 7.2 Pre-Launch Report

- [ ] Review Google Play Console Pre-launch report
- [ ] Fix any crashes or issues found
- [ ] Re-build and re-test if necessary

---

## Store Listing Assets

### 8. App Icon & Graphics

Verify these files exist and meet requirements:

- [ ] App Icon: \`./src/assets/images/icon.png\` (512x512px, PNG)
- [ ] Feature Graphic: Required (1024x500px) - **CREATE THIS**
- [ ] Screenshots: See [SCREENSHOTS_GUIDE.md](./SCREENSHOTS_GUIDE.md)

#### 8.1 Feature Graphic

**Requirements:**
- Size: 1024 x 500 pixels
- Format: PNG or JPEG
- Max file size: 1024 KB

**Create using:**
- Figma, Canva, or design tool of your choice
- Should showcase your app's key feature or branding
- No device frames needed

**Reference:** \`documentation/SCREENSHOTS_GUIDE.md\` for design guidance

#### 8.2 Screenshots

**Requirements:**
- At least 2 screenshots
- Recommended: 4-8 screenshots
- Format: PNG or JPEG
- Dimensions: See guide below

**Phone Screenshots:**
- Min: 320px on short side
- Max: 3840px on long side
- Recommended: 1080 x 1920 (portrait) or 1920 x 1080 (landscape)

**Tablet Screenshots (optional but recommended):**
- Min: 1200px on short side
- Recommended: 1920 x 1200 or 2560 x 1800

**Screenshot Content:**
- [ ] Home screen
- [ ] Property listing
- [ ] Booking flow
- [ ] User profile
- [ ] Maps/location feature
- [ ] Additional key features

**Tool:** Use Figma templates from \`documentation/SCREENSHOTS_GUIDE.md\`

---

## Google Play Console Setup

### 9. Create App Listing

Go to: https://play.google.com/console/

#### 9.1 Create New App

- [ ] Click "Create app"
- [ ] App name: **BookHere** (or your custom name)
- [ ] Default language: **English (United States)**
- [ ] App or game: **App**
- [ ] Free or paid: **Free** (or Paid if applicable)
- [ ] Accept declarations

#### 9.2 Store Listing

**Main Store Listing:**

- [ ] **App name:** BookHere Mobile
- [ ] **Short description** (80 chars max):
  \`\`\`Example Short Description
  Book hotels, apartments, and vacation rentals with ease.
  \`\`\`

- [ ] **Full description** (4000 chars max):
  \`\`\`Example Full Description
  BookHere is your all-in-one mobile solution for discovering and booking accommodations.

  KEY FEATURES:
  • Browse thousands of properties worldwide
  • Advanced search with filters(price, location, amenities)
  • Secure booking and payment processing
  • Real - time availability and instant confirmation
  • Interactive maps with Google Maps integration
  • User reviews and ratings
  • Favorite properties and booking history
  • Biometric authentication for secure login
  • Push notifications for booking updates
  • Multiple payment options

  SEAMLESS BOOKING EXPERIENCE:
  Find your perfect stay with our intuitive interface.Search by location, dates, and preferences.
  View detailed property information, photos, and guest reviews.Book instantly with secure payment processing.

  USER-FRIENDLY FEATURES:
  • Easy property discovery with smart filters
  • Save favorite listings for later
  • Manage bookings in one place
  • Direct messaging with property owners
  • Split payments and flexible options

SECURE & RELIABLE:
  • Biometric authentication(Face ID / Fingerprint)
  • Secure payment processing with Stripe
  • Privacy - focused user data protection
  • 24 / 7 customer support

  Perfect for travelers, vacationers, and business professionals looking for accommodations.

  Download BookHere today and start exploring your next destination!
  \`\`\`

- [ ] **App icon:** Upload \`icon.png\` (512x512)
- [ ] **Feature graphic:** Upload feature graphic (1024x500)
- [ ] **Phone screenshots:** Upload 2-8 screenshots
- [ ] **Tablet screenshots:** Upload (optional)

**Categorization:**

- [ ] **App category:** Travel & Local
- [ ] **Tags:** Add up to 5 tags (e.g., "hotel booking", "travel", "vacation rental", "accommodation")

**Contact Details:**

- [ ] **Email:** your-support-email@example.com
- [ ] **Phone:** (optional) +1-XXX-XXX-XXXX
- [ ] **Website:** https://your-website.com
- [ ] **Privacy Policy URL:** **REQUIRED** - https://your-website.com/privacy-policy

> **Important:** You MUST have a privacy policy URL. Create one if you don't have it.

**External Marketing (optional):**

- [ ] Promotional video (YouTube URL)
- [ ] Marketing opt-in

#### 9.3 Store Settings

**App Access:**

- [ ] All functionality is available without restrictions
- [ ] OR: Provide instructions for special access/demo account

**Ads:**

- [ ] Select "Yes" or "No" for ads in app
- [ ] (If applicable) App uses Ads

**Content Rating:**

- [ ] Complete content rating questionnaire
- [ ] Answer all questions honestly
- [ ] Expected rating: Everyone or Teen (based on content)

**Target Audience:**

- [ ] Target age: 18 and over (or appropriate for your app)
- [ ] Store Listing Presence: All countries or select specific countries

**News Apps (if applicable):**

- [ ] Not applicable (unless your app is a news app)

---

### 10. App Content

#### 10.1 Privacy Policy

- [ ] Create privacy policy page on your website
- [ ] Must cover:
  - Data collection and usage
  - Third-party services (Google, Stripe, etc.)
  - User rights
  - Contact information
- [ ] Add URL to store listing

**Sample Privacy Policy Sections:**
\`\`\`
  - Information Collection
    - How We Use Your Information
      - Data Sharing and Third-party Services
        - Google Sign-In and OAuth
          - Payment Processing(Stripe)
            - Location Services(Google Maps)
              - Push Notifications
                - Data Security
                  - User Rights
                    - Contact Us
                      \`\`\`

#### 10.2 Data Safety

Google Play requires detailed information about data handling:

- [ ] Go to **App Content → Data Safety**
- [ ] Answer questions about:
  - [ ] Data collection (location, personal info, financial info, etc.)
  - [ ] Data sharing with third parties
  - [ ] Security practices (encryption, data deletion)
  - [ ] COPPA compliance

**Data Collected by BookHere:**
- Personal info: Name, email, phone
- Location: Approximate location (for search)
- Financial info: Payment info (processed by Stripe)
- Photos: Profile pictures (optional)
- App activity: Search history, booking history

**Data Shared:**
- With service providers: Google (auth, maps), Stripe (payments)
- Not sold to third parties

**Security:**
- Data encrypted in transit (HTTPS)
- Data encrypted at rest
- Users can request deletion

#### 10.3 App Category & Tags

- [ ] **Category:** Travel & Local
- [ ] **Tags:** hotel, booking, travel, vacation rental, accommodation

---

### 11. Release

#### 11.1 Production Release

- [ ] Go to **Release → Production**
- [ ] Click "Create new release"
- [ ] Upload \`.aab\` file from step 6.3
- [ ] Add release notes:

**Release Notes Example:**
\`\`\`
Initial release - BookHere Mobile v3.0.1

NEW FEATURES:
• Browse and book accommodations worldwide
• Google Sign-In for quick authentication
• Interactive maps with property locations
• Secure payment processing
• Biometric authentication support
• Push notifications for booking updates
• User reviews and ratings
• Favorite properties and booking history

We're excited to bring you BookHere Mobile! Download now and start exploring your next destination.
  \`\`\`

- [ ] Review release (click "Review release")
- [ ] Check for any warnings or errors
- [ ] Fix any issues before proceeding

#### 11.2 Countries & Regions

- [ ] Select countries/regions for distribution
  - All countries (default)
  - OR: Select specific countries

#### 11.3 Rollout Percentage (optional)

- [ ] Start with staged rollout (e.g., 10%, 50%, 100%)
- [ ] OR: Release to 100% immediately

---

## Final Checks

### 12. Pre-Submission Checklist

Before clicking "Submit for Review":

**App Quality:**
- [ ] App has been tested thoroughly
- [ ] No crashes or critical bugs
- [ ] All features work as expected
- [ ] Google Sign-In works with production credentials
- [ ] Google Maps displays correctly
- [ ] Payments process successfully (test mode OK for initial release)

**Store Listing:**
- [ ] App name is correct
- [ ] Descriptions are clear and compelling
- [ ] Screenshots showcase key features
- [ ] Feature graphic looks professional
- [ ] Contact details are accurate
- [ ] Privacy policy URL is live and accessible

**Compliance:**
- [ ] Content rating completed
- [ ] Data safety form completed
- [ ] Privacy policy covers all data collection
- [ ] App complies with Google Play policies
- [ ] No copyright or trademark violations

**Technical:**
- [ ] Correct package name (\`com.webpenter.googlesignin\`)
- [ ] Version code incremented
- [ ] Production environment variables configured
- [ ] google-services.json is production version
- [ ] App signed with correct keystore

**Legal:**
- [ ] Developer Distribution Agreement accepted
- [ ] Content guidelines reviewed
- [ ] No restricted content (see policies)

---

## Submission

### 13. Submit for Review

- [ ] Go to **Publishing overview**
- [ ] Review all sections (should show green checkmarks)
- [ ] Click **"Send X items for review"**
- [ ] Wait for Google review (typically 1-7 days)

### 14. Post-Submission

#### Monitor Review Status:

- [ ] Check Google Play Console daily
- [ ] Respond to any review requests promptly
- [ ] Fix issues if rejected and resubmit

#### After Approval:

- [ ] App will be live on Google Play Store
- [ ] Share store listing URL: \`https://play.google.com/store/apps/details?id=com.webpenter.googlesignin\`
-[] Monitor user reviews and ratings
  - [] Respond to user feedback
    - [] Plan updates and improvements

---

## Additional Resources

### Development Commands

  \`\`\`bash
# Local development build
npm start

# Preview build (development environment)
eas build --platform android --profile preview

# Production build (production environment)
eas build --platform android --profile production

# Check build status
eas build:list

# View credentials
eas credentials -p android
\`\`\`

### Environment Management

  ** Development:**
    \`\`\`bash
# Uses .env.development automatically
npm start
eas build --platform android --profile development
\`\`\`

    ** Production:**
      \`\`\`bash
# Uses .env.production automatically
eas build --platform android --profile production
\`\`\`

### Useful Links

- ** Google Play Console:** https://play.google.com/console/
- ** Google Cloud Console:** https://console.cloud.google.com/
- ** Firebase Console:** https://console.firebase.google.com/
- ** Expo Dashboard:** https://expo.dev/
- ** Google Play Policies:** https://play.google.com/about/developer-content-policy/
- ** App Quality Guidelines:** https://developer.android.com/quality

### Support

For issues or questions:
- ** Documentation:** See\`documentation/\` folder
  - ** Troubleshooting:** \`documentation/TROUBLESHOOTING.md\`
    - ** Configuration:** \`documentation/CONFIGURATION.md\`
      - ** Email:** support@webpenter.com

---

## Troubleshooting Common Issues

### "App not configured for OAuth"

  ** Issue:** Google Sign - In fails in production

    ** Solution:**
      1. Verify SHA-1 certificate in Google Cloud Console
2. Ensure production OAuth client ID is correct in \`.env.production\`
3. Check Firebase console has production SHA-1
4. Re-download\`google-services.json\` if needed

### "Google Maps not displaying"

  ** Issue:** Maps show blank or "For development purposes only"

    ** Solution:**
      1. Check Google Maps API key in \`.env.production\`
2. Verify API key restrictions in Google Cloud Console
3. Ensure Maps SDK for Android is enabled
4. Add production SHA-1 to API key restrictions

### "App rejected for policy violation"

  ** Issue:** Google rejects app submission

    ** Solution:**
      1. Review rejection email carefully
2. Check Google Play policies: https://play.google.com/about/developer-content-policy/
3. Common issues:
- Missing or inadequate privacy policy
  - Incomplete data safety section
    - Copyright / trademark issues
      - Misleading content or functionality
4. Fix issues and resubmit

### "Build fails during EAS build"

  ** Issue:** Production build fails

    ** Solution:**
      1. Check build logs in Expo dashboard
2. Verify all dependencies are installed
3. Ensure \`google-services.json\` is in project root
4. Check environment variables are set correctly
5. Try clearing cache: \`eas build --platform android --profile production --clear-cache\`

---

## Version History

  | Version | Date | Changes |
| ---------| ------| ---------|
| 3.0.0 | 2024 - XX - XX | Initial release |
| 3.0.1 | TBD | Bug fixes and improvements |

  ---

** Last Updated:** 2026-01 -08
  ** Author:** WebPenter Development Team

For ThemeForest buyers: This checklist is specifically tailored for the BookHere Mobile App.Follow all steps carefully to ensure a smooth submission process.

Good luck with your Google Play Store submission! 🚀


`
    },
    app_store: {
      title: "Apple App Store",
      icon: Smartphone,
      tags: ["ios", "submission", "checklist"],
      content: `
# Apple App Store Submission Checklist

This comprehensive checklist will guide you through preparing and submitting your BookHere app to the Apple App Store.

## Table of Contents

1. [Pre-Submission Setup](#pre-submission-setup)
2. [Apple Developer Account Setup](#apple-developer-account-setup)
3. [Certificates & Provisioning](#certificates--provisioning)
4. [Environment Variables & API Keys](#environment-variables--api-keys)
5. [App Configuration](#app-configuration)
6. [Build & Testing](#build--testing)
7. [TestFlight Beta Testing](#testflight-beta-testing)
8. [Store Listing Assets](#store-listing-assets)
9. [App Store Connect Setup](#app-store-connect-setup)
10. [Final Checks](#final-checks)
11. [Submission](#submission)
12. [After Submission](#after-submission)

---

## Pre-Submission Setup

### 1. Requirements

Before you begin, ensure you have:

- [ ] **Mac computer** (required for iOS development)
- [ ] **Xcode** installed (latest version from Mac App Store)
- [ ] **Apple Developer Program** membership ($99/year)
- [ ] **EAS CLI** installed (\`npm install -g eas-cli\`)
- [ ] **Expo account** (free at https://expo.dev)

**Time required:** 1-2 hours for initial setup

---

## Apple Developer Account Setup

### 2. Apple Developer Program

#### 2.1 Enroll in Apple Developer Program

- [ ] Go to https://developer.apple.com/programs/enroll/
- [ ] Choose account type:
  - **Individual**: Personal apps, sole proprietorship
  - **Organization**: Company apps, requires D-U-N-S number
- [ ] Pay $99 annual fee
- [ ] Wait for approval (typically 24-48 hours)

#### 2.2 Verify Enrollment

- [ ] Log in to https://developer.apple.com/account
- [ ] Confirm enrollment status shows "Active"
- [ ] Note your Team ID (needed later)

#### 2.3 Two-Factor Authentication

- [ ] Enable 2FA on your Apple ID (required)
- [ ] Go to https://appleid.apple.com
- [ ] Security → Two-Factor Authentication
- [ ] Add trusted phone number

---

## Certificates & Provisioning

### 3. App Identifiers & Bundle ID

#### 3.1 Create App ID

Go to: https://developer.apple.com/account/resources/identifiers/list

- [ ] Click the "+" button to create new identifier
- [ ] Select "App IDs" → Continue
- [ ] Select "App" → Continue
- [ ] Fill in details:
  - **Description**: BookHere Mobile App
  - **Bundle ID**: \`com.webpenter.googlesignin\` (must match app.config.js)
  - **Explicit Bundle ID** (not wildcard)
- [ ] Enable capabilities:
  - [ ] Push Notifications
  - [ ] Sign in with Apple (if using)
  - [ ] Associated Domains (if using deep links)
  - [ ] In-App Purchase (if applicable)
- [ ] Click "Continue" → "Register"

**Important:** Bundle ID must match exactly: \`com.webpenter.googlesignin\`

#### 3.2 EAS Managed Credentials (Recommended)

Let EAS handle certificates automatically:

\`\`\`bash
# EAS will create certificates during first build
eas build --platform ios --profile production

# EAS will prompt:
# ✔ Generate a new Apple Distribution Certificate
# ✔ Generate a new Apple Provisioning Profile
  \`\`\`

**Advantages:**
- Automatic certificate management
- No manual certificate creation
- Secure storage in Expo servers
- Easy renewal

#### 3.3 Manual Certificate Setup (Advanced)

If you prefer manual control:

**Create Distribution Certificate:**

\`\`\`bash
# View and manage certificates
eas credentials -p ios

# Select:
# → Set up a new iOS Distribution Certificate
# → Generate new certificate
# Or: Upload existing.p12 certificate
  \`\`\`

**Create Provisioning Profile:**

- [ ] Go to https://developer.apple.com/account/resources/profiles/list
- [ ] Click "+" to create new profile
- [ ] Select "App Store" → Continue
- [ ] Select your App ID → Continue
- [ ] Select your Distribution Certificate → Continue
- [ ] Name it: "BookHere App Store Distribution"
- [ ] Download the profile

---

## Environment Variables & API Keys

### 4. Production Environment Variables

#### 4.1 iOS-Specific Configuration

Edit: \`/Users/apple/homey-mobile-apps-react/.env.production\`

\`\`\`bash
# iOS OAuth Client ID(from Google Cloud Console)
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID = YOUR_PRODUCTION_IOS_CLIENT_ID.apps.googleusercontent.com

# Web Client ID(for iOS Google Sign - In)
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID = YOUR_PRODUCTION_WEB_CLIENT_ID.apps.googleusercontent.com

# Google Maps API Key(iOS)
GOOGLE_MAPS_API_KEY = YOUR_PRODUCTION_IOS_GOOGLE_MAPS_API_KEY

# App Configuration
APP_VARIANT = production
  \`\`\`

#### 4.2 Get iOS OAuth Client ID

Go to: https://console.cloud.google.com/apis/credentials

- [ ] Click "Create Credentials" → "OAuth 2.0 Client ID"
- [ ] Application type: **iOS**
- [ ] Name: "BookHere iOS Production"
- [ ] Bundle ID: \`com.webpenter.googlesignin\`
- [ ] Click "Create"
- [ ] Copy the Client ID
- [ ] Paste into \`.env.production\` as \`EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID\`

#### 4.3 Configure Google Maps for iOS

**Create or Update API Key:**

- [ ] Go to https://console.cloud.google.com/google/maps-apis/credentials
- [ ] Create new API key or use existing
- [ ] Click "Restrict Key"
- [ ] Application restrictions: **iOS apps**
- [ ] Add bundle identifier: \`com.webpenter.googlesignin\`
- [ ] API restrictions: Select APIs:
  - [ ] Maps SDK for iOS
  - [ ] Places API (if used)
  - [ ] Geocoding API (if used)
- [ ] Save
- [ ] Copy API key to \`.env.production\`

#### 4.4 Update GoogleService-Info.plist (iOS Firebase)

If using Firebase for iOS:

- [ ] Go to https://console.firebase.google.com/
- [ ] Select your project
- [ ] Add iOS app (if not already added):
  - iOS bundle ID: \`com.webpenter.googlesignin\`
  - App nickname: "BookHere iOS"
  - App Store ID: (leave blank for now)
- [ ] Download **GoogleService-Info.plist**
- [ ] Replace file in project root: \`/ GoogleService-Info.plist\`

**Verify file location:**
\`\`\`bash
ls - la GoogleService-Info.plist
# Should be in project root
  \`\`\`

---

## App Configuration

### 5. Update App Configuration

#### 5.1 Version and Build Numbers

Edit: \`app.config.js\`

\`\`\`javascript
ios: {
  supportsTablet: true,
  bundleIdentifier: "com.webpenter.googlesignin",
  buildNumber: "10",  // Increment for each submission
  // ...
}
\`\`\`

**Important Version Rules:**
- **buildNumber**: Must be unique for each build uploaded to App Store Connect
  - Format: Integer as string (e.g., "1", "2", "3")
  - Increment by 1 for each submission
  - Never reuse a build number
- **version**: User-facing version (e.g., "3.0.0")
  - Use semantic versioning: MAJOR.MINOR.PATCH
  - Can be the same across multiple builds

**Example progression:**
\`\`\`
Submission 1: version "3.0.0", buildNumber "10"
Submission 2: version "3.0.0", buildNumber "11"(bug fix, same version)
Submission 3: version "3.0.1", buildNumber "12"(new version)
  \`\`\`

#### 5.2 App Capabilities

Verify in \`app.config.js\`:

\`\`\`javascript
ios: {
  infoPlist: {
    NSFaceIDUsageDescription: "Allow BookHere Mobile to use Face ID for secure login.",
    NSLocationWhenInUseUsageDescription: "We need your location to show properties near you.",
    NSPhotoLibraryUsageDescription: "We need access to your photos to upload property images.",
    NSCameraUsageDescription: "We need camera access to take photos of properties.",
    ITSAppUsesNonExemptEncryption: false,
  },
  // ...
}
\`\`\`

**Required Usage Descriptions:**
- [ ] Face ID / Touch ID (if using biometrics)
- [ ] Location (if using maps/location)
- [ ] Photo Library (if users upload photos)
- [ ] Camera (if users take photos)
- [ ] Notifications (if using push notifications)

#### 5.3 Privacy Manifest (iOS 17+)

For iOS 17+, you may need a privacy manifest. EAS handles this automatically, but verify:

- [ ] App uses encryption: Set \`ITSAppUsesNonExemptEncryption: false\` (unless using custom encryption)
- [ ] Declare required reason APIs (EAS/Expo handles this)

---

## Build & Testing

### 6. Build Production IPA

#### 6.1 Pre-Build Checklist

- [ ] \`.env.production\` configured with production credentials
- [ ] \`app.config.js\` version and buildNumber updated
- [ ] \`GoogleService - Info.plist\` in project root (if using Firebase)
- [ ] All API keys are production keys
- [ ] Test locally first: \`npm start\`

#### 6.2 Build with EAS

\`\`\`bash
# Build for App Store submission
eas build --platform ios --profile production

# EAS will:
# 1. Load.env.production variables
# 2. Create / use distribution certificate
# 3. Create / use provisioning profile
# 4. Build IPA file
# 5. Upload to Expo servers
  \`\`\`

**Build Process:**
- Takes 10-25 minutes
- Builds on Expo's macOS servers
- No local Mac required during build
- Build status visible at: https://expo.dev

#### 6.3 Monitor Build

\`\`\`bash
# Check build status
eas build: list --platform ios

# View specific build
eas build: view [build - id]

# Or monitor in browser
# https://expo.dev/accounts/[account]/projects/bookhere/builds
\`\`\`

#### 6.4 Download Build (Optional)

\`\`\`bash
# Download IPA file
eas build: download --platform ios --profile production

# IPA file downloaded to current directory
# production - [timestamp].ipa
  \`\`\`

---

## TestFlight Beta Testing

### 7. Internal Testing with TestFlight

#### 7.1 Automatic Submission to TestFlight

After build completes:

\`\`\`bash
# Submit to TestFlight automatically
eas submit --platform ios --latest

# Or specify build ID
eas submit --platform ios --id [build - id]
  \`\`\`

**EAS will:**
1. Upload IPA to App Store Connect
2. Process build (takes 5-15 minutes)
3. Make available in TestFlight

#### 7.2 Manual Upload (Alternative)

If not using \`eas submit\`:

1. Download IPA: \`eas build: download --platform ios --profile production\`
2. Open **Transporter** app (Mac)
3. Sign in with Apple Developer account
4. Drag and drop IPA file
5. Click "Deliver"
6. Wait for processing

#### 7.3 Add TestFlight Testers

Go to: https://appstoreconnect.apple.com

- [ ] Select your app
- [ ] Go to **TestFlight** tab
- [ ] Click on the build version
- [ ] Add **Internal Testers**:
  - Up to 100 testers (must be in App Store Connect)
  - Add email addresses
  - They receive invitation automatically
- [ ] Or add **External Testers** (requires Beta App Review):
  - Up to 10,000 testers
  - Public link or email invitations
  - Must pass Beta App Review (1-2 days)

#### 7.4 Test with TestFlight

- [ ] Testers install TestFlight app from App Store
- [ ] Testers open invitation email and accept
- [ ] Install BookHere app via TestFlight
- [ ] Test all features:
  - [ ] Google Sign-In
  - [ ] Google Maps
  - [ ] Biometric authentication
  - [ ] Push notifications
  - [ ] Payment flow
  - [ ] All core features

---

## Store Listing Assets

### 8. App Icon & Graphics

#### 8.1 App Icon

- [ ] **Size**: 1024x1024 pixels
- [ ] **Format**: PNG (no alpha channel)
- [ ] **Location**: \`./src/assets/images/icon.png\`
- [ ] **Requirements**:
  - No rounded corners (Apple adds them)
  - No transparency
  - RGB color space
  - 72 DPI minimum

**Verify in app.config.js:**
\`\`\`javascript
icon: "./src/assets/images/icon.png"
  \`\`\`

#### 8.2 Screenshots

**Required Sizes:**

Must provide screenshots for at least one device size:

**6.7" Display (iPhone 15 Pro Max, 14 Pro Max, etc.):**
- [ ] Size: **1290 x 2796 pixels** (portrait) or **2796 x 1290** (landscape)
- [ ] Minimum: 2 screenshots
- [ ] Recommended: 4-8 screenshots

**6.5" Display (iPhone 11 Pro Max, XS Max, etc.):**
- [ ] Size: **1284 x 2778 pixels** (portrait)
- [ ] Fallback for older devices

**5.5" Display (iPhone 8 Plus, 7 Plus, etc.):**
- [ ] Size: **1242 x 2208 pixels** (portrait)
- [ ] Optional but recommended for compatibility

**iPad Pro (12.9-inch) - Optional but recommended:**
- [ ] Size: **2048 x 2732 pixels** (portrait)
- [ ] Shows app supports tablets

**Screenshot Content:**
- [ ] Home screen with property listings
- [ ] Property detail page
- [ ] Booking flow
- [ ] User profile
- [ ] Maps and location features
- [ ] Search and filters
- [ ] Key features showcase

**Tools:**
- Use Figma templates from \`documentation/SCREENSHOTS_GUIDE.md\`
- iOS Simulator (Xcode → Simulator → Cmd+S to screenshot)
- Third-party tools: Screenshot Creator, App Mockup, etc.

#### 8.3 App Preview Video (Optional)

- [ ] Duration: 15-30 seconds
- [ ] Format: M4V, MP4, or MOV
- [ ] Resolution: Match screenshot dimensions
- [ ] Size: Up to 500 MB
- [ ] Shows key features and UI flow

---

## App Store Connect Setup

### 9. Create App in App Store Connect

Go to: https://appstoreconnect.apple.com

#### 9.1 Create New App

- [ ] Click "+" → "New App"
- [ ] Platforms: **iOS**
- [ ] Name: **BookHere** (or your custom name, 30 chars max)
- [ ] Primary Language: **English (U.S.)**
- [ ] Bundle ID: Select \`com.webpenter.googlesignin\`
- [ ] SKU: \`bookhere - ios\` (unique identifier for your records)
- [ ] User Access: **Full Access**
- [ ] Click "Create"

#### 9.2 App Information

**General Information:**

- [ ] **App Name**: BookHere Mobile (30 chars max)
- [ ] **Subtitle**: Book Hotels & Vacation Rentals (30 chars max)
- [ ] **Category**:
  - Primary: **Travel**
  - Secondary: **Lifestyle** (optional)

**Age Rating:**

- [ ] Click "Edit" next to Age Rating
- [ ] Answer questionnaire honestly:
  - Unrestricted Web Access: No
  - Gambling: No
  - Contests: No
  - etc.
- [ ] Expected rating: **4+** or **12+**
- [ ] Click "Done"

#### 9.3 Pricing and Availability

- [ ] **Price**: Free (or set price if paid app)
- [ ] **Availability**: All countries/regions
  - Or select specific countries
- [ ] **Pre-Order**: No (for initial release)

#### 9.4 App Privacy

**Required since iOS 14.5:**

- [ ] Click "Get Started" under App Privacy
- [ ] Answer questions about data collection:

**Data Collection:**
- [ ] **Contact Info**: Email, Name, Phone (collected)
- [ ] **Location**: Approximate location (collected for search)
- [ ] **Identifiers**: User ID (collected)
- [ ] **Usage Data**: Product interactions (collected)
- [ ] **Financial Info**: Payment info (collected, processed by Stripe)
- [ ] **User Content**: Photos (optional, for profile/listings)

**Data Use:**
- [ ] App Functionality
- [ ] Analytics
- [ ] Product Personalization
- [ ] Other Purposes: Third-party services (Google, Stripe)

**Data Linking:**
- [ ] Data is linked to user identity: **Yes**

**Data Tracking:**
- [ ] Does this app use data for tracking?: **No** (unless you use advertising)

**Save and Publish Privacy Policy**

#### 9.5 Version Information

Click on "1.0 Prepare for Submission":

**Promotional Text** (170 chars, updatable without review):
\`\`\`
Discover and book amazing accommodations worldwide.Secure payments, instant confirmation, and seamless booking experience.
\`\`\`

**Description** (4000 chars):
\`\`\`
BookHere is your all-in-one mobile solution for discovering and booking accommodations worldwide.

KEY FEATURES

Browse & Discover
• Thousands of properties: hotels, apartments, vacation rentals
• Advanced search with smart filters(price, location, amenities)
• Interactive maps powered by Google Maps
• High - quality photos and detailed descriptions
• User reviews and ratings

Seamless Booking
• Real-time availability checking
• Instant booking confirmation
• Secure payment processing with Stripe
• Multiple payment options
• Transparent pricing with no hidden fees

User Features
• Face ID / Touch ID for secure login
• Save favorite properties
• Booking history and management
• Push notifications for booking updates
• In-app messaging with hosts
• Multi-language support

For Hosts
• Easy property listing management
• Reservation management
• Calendar synchronization
• Earnings tracking
• Guest communication

Security & Privacy
• Biometric authentication
• Secure payment processing
• Privacy - focused design
• Bank - level encryption

PERFECT FOR

• Vacationers seeking unique stays
• Business travelers needing accommodations
• Adventure seekers exploring new destinations
• Hosts managing rental properties

WHY BOOKHERE ?

✓ User-friendly interface
✓ Fast and responsive
✓ Reliable and secure
✓ 24 / 7 customer support
✓ Regular updates and improvements

Download BookHere today and start exploring your next destination!

REQUIREMENTS
• iOS 13.0 or later
• Internet connection
• Location services(optional, for nearby properties)

  SUPPORT
Questions or issues ? Contact us at support @webpenter.com

Follow us:
• Website: https://your-website.com
• Facebook: @bookhere
• Instagram: @bookhere

Start your journey with BookHere – where great stays begin!
  \`\`\`

**Keywords** (100 chars, comma-separated):
\`\`\`
hotel, booking, travel, vacation, rental, accommodation, airbnb, property, stay, lodging
  \`\`\`

**Support URL**:
\`\`\`
https://your-website.com/support
\`\`\`

**Marketing URL** (optional):
\`\`\`
https://your-website.com
\`\`\`

**Privacy Policy URL** (required):
\`\`\`
https://your-website.com/privacy-policy
\`\`\`

**Build:**
- [ ] Select the build uploaded via TestFlight
- [ ] Click the "+" next to Build

**What's New in This Version** (4000 chars):
\`\`\`
Welcome to BookHere v3.0.0!

NEW FEATURES
• Browse thousands of properties worldwide
• Google Sign-In for quick and secure authentication
• Interactive maps to explore properties
• Secure payment processing
• Biometric authentication(Face ID / Touch ID)
• Push notifications for booking updates
• User reviews and ratings
• Favorite properties and booking history
• Multi-language support

SEAMLESS EXPERIENCE
• Intuitive and beautiful user interface
• Fast property search and filtering
• Real-time availability checking
• Instant booking confirmation
• Easy property management for hosts

We're excited to bring you BookHere! Download now and start exploring amazing accommodations.

Have feedback ? Contact us at support @webpenter.com
  \`\`\`

#### 9.6 Upload Screenshots

- [ ] Click "+" under "iPhone 6.7" Display"
- [ ] Upload 2-8 screenshots
- [ ] Drag to reorder
- [ ] Repeat for other device sizes (if available)
- [ ] Upload iPad screenshots (if available)

#### 9.7 App Review Information

**Contact Information:**
- [ ] First Name: Your Name
- [ ] Last Name: Your Last Name
- [ ] Phone Number: +1-XXX-XXX-XXXX
- [ ] Email: your-email@example.com

**Demo Account** (if app requires login):
- [ ] Sign-in required: **Yes**
- [ ] Username: demo@bookhere.com (create demo account)
- [ ] Password: Demo123! (secure password)
- [ ] Notes: "Demo account for review purposes. Full access to all features."

**Notes:**
\`\`\`
Thank you for reviewing BookHere!

DEMO ACCOUNT CREDENTIALS:
Email: demo @bookhere.com
Password: Demo123!

TESTING NOTES:
- All features are accessible with demo account
  - Google Sign-In is optional(demo account available)
    - Payment processing uses Stripe test mode for demo
      - Test card: 4242 4242 4242 4242

KEY FEATURES TO TEST:
1. Browse properties
2. View property details
3. Use map to explore locations
4. Add properties to favorites
5. Simulate booking(test mode)

Please contact support @webpenter.com with any questions.
\`\`\`

**Attachment** (optional):
- [ ] Upload demo video or additional documentation if needed

#### 9.8 Version Release

- [ ] **Automatically release this version**: Recommended
  - App goes live immediately after approval
- [ ] **Manually release this version**: Alternative
  - You control when app goes live after approval

---

## Final Checks

### 10. Pre-Submission Checklist

Before clicking "Submit for Review":

**App Quality:**
- [ ] App tested thoroughly on physical device
- [ ] No crashes or critical bugs
- [ ] All features work as expected
- [ ] Google Sign-In works with production credentials
- [ ] Google Maps displays correctly
- [ ] Biometric authentication works
- [ ] Push notifications work
- [ ] Payment processing works (test mode OK)
- [ ] App performs well on older devices
- [ ] App works on different iOS versions (iOS 13+)

**Store Listing:**
- [ ] App name is compelling and clear
- [ ] Subtitle is descriptive
- [ ] Description showcases key features
- [ ] Keywords are relevant and optimized
- [ ] Screenshots showcase app beautifully
- [ ] App icon is professional
- [ ] Privacy policy URL is live and accessible
- [ ] Support URL is live

**Compliance:**
- [ ] Age rating completed accurately
- [ ] App Privacy information completed
- [ ] Privacy policy covers all data collection
- [ ] App complies with Apple Review Guidelines
- [ ] No copyright or trademark violations
- [ ] No misleading functionality

**Technical:**
- [ ] Correct bundle identifier: \`com.webpenter.googlesignin\`
- [ ] Build number incremented from previous submission
- [ ] Version number is appropriate
- [ ] Production environment variables configured
- [ ] GoogleService-Info.plist is production version
- [ ] All required permissions declared in infoPlist

**Legal:**
- [ ] Apple Developer Agreement accepted
- [ ] App Review Guidelines reviewed
- [ ] Export Compliance completed (if applicable)

---

## Submission

### 11. Submit for Review

#### 11.1 Export Compliance

- [ ] **Does your app use encryption?**
  - Select "No" (standard HTTPS doesn't count)
  - Or select "Yes" and answer follow-up questions

#### 11.2 Advertising Identifier (IDFA)

- [ ] **Does this app use the Advertising Identifier (IDFA)?**
  - Select "No" (unless you use advertising/analytics that tracks users)

#### 11.3 Submit

- [ ] Review all sections (should have green checkmarks)
- [ ] Click **"Add for Review"** (top right)
- [ ] Click **"Submit to App Review"**

**Confirmation:**
- [ ] Status changes to "Waiting for Review"
- [ ] You'll receive confirmation email

---

## After Submission

### 12. Review Process

#### 12.1 Review Timeline

**Typical Timeline:**
- **Waiting for Review**: 1-3 days
- **In Review**: Few hours to 1 day
- **Processing**: Few hours
- **Total**: Usually 1-4 days

**Status Tracking:**
- [ ] Monitor status in App Store Connect
- [ ] Check email for updates
- [ ] Respond to any review requests within 24 hours

#### 12.2 Possible Outcomes

**Approved ✅**
- Status: "Ready for Sale"
- App is live on App Store (if auto-release)
- Or ready to manually release

**Rejected ❌**
- Status: "Rejected"
- Reason provided in Resolution Center
- Fix issues and resubmit

**Metadata Rejected**
- Issue with store listing, not app itself
- Fix metadata and resubmit

**Developer Rejected**
- You cancelled submission
- Can resubmit anytime

#### 12.3 If Rejected

Common rejection reasons and solutions:

**1. Incomplete or Inaccurate Information**
- Solution: Provide accurate app information and demo account

**2. Crashes or Bugs**
- Solution: Fix bugs, test thoroughly, resubmit

**3. Guideline Violation**
- Solution: Review specific guideline, fix issue, explain in notes

**4. Privacy Policy Issues**
- Solution: Update privacy policy to cover all data collection

**5. Misleading Functionality**
- Solution: Ensure screenshots and description match actual app

**6. Performance Issues**
- Solution: Optimize app, reduce memory usage

**Resubmission Process:**
1. Fix issues mentioned in rejection
2. Update build if code changes needed (increment buildNumber)
3. Update metadata if needed
4. Reply in Resolution Center explaining changes
5. Resubmit for review

#### 12.4 After Approval

**App is Live!**

- [ ] App appears on App Store
- [ ] App Store URL: \`https://apps.apple.com/app/id[your-app-id]\`
-[] Share with users
- [] Announce on social media
  - [] Update website with App Store badge

    ** Monitor Performance:**
      -[] Check App Store Connect Analytics
        - [] Monitor reviews and ratings
          - [] Respond to user reviews
            - [] Track crashes(if using crash reporting)
-[] Plan updates and improvements

  ** Promote Your App:**
    -[] Add App Store badge to website
      - [] Share on social media
        - [] Create press release
          - [] Reach out to tech blogs
            - [] Run marketing campaigns

---

## Apple App Store Guidelines

### 13. Important Guidelines to Follow

  ** Review the full guidelines:** https://developer.apple.com/app-store/review/guidelines/

** Key Areas:**

#### Safety
  - [] User - generated content is moderated
    - [] Objectionable content is filtered
      - [] Privacy policy is comprehensive

#### Performance
  - [] App is complete and functional
    - [] No crashes, bugs, or broken links
      - [] Loads quickly and responds to user input

#### Business
  - [] In - app purchases use Apple's system (if applicable)
    - [] Subscriptions follow Apple guidelines
      - [] No alternative payment methods presented in -app

#### Design
  - [] Interface is polished and professional
    - [] Uses native iOS components appropriately
      - [] Supports all device sizes

#### Legal
  - [] Privacy policy meets requirements
    - [] Respects intellectual property
      - [] Follows data protection laws

---

## Troubleshooting Common Issues

### "Could not find a valid bundle identifier"

  ** Issue:** Bundle ID mismatch

    ** Solution:**
      1. Verify\`bundleIdentifier\` in \`app.config.js\`: \`com.webpenter.googlesignin\`
2. Ensure App ID exists in Apple Developer Portal
3. Rebuild app

### "Google Sign-In not working"

  ** Issue:** OAuth configuration for iOS

    ** Solution:**
      1. Verify iOS Client ID in \`.env.production\`
2. Check Bundle ID in Google Cloud Console matches\`com.webpenter.googlesignin\`
3. Ensure \`GoogleService-Info.plist\` is in project root

### "Build failed during EAS build"

  ** Issue:** Build configuration error

    ** Solution:**
      1. Check build logs: \`eas build:view [build-id]\`
2. Verify all certificates are valid
3. Ensure \`GoogleService-Info.plist\` exists if using Firebase
4. Try: \`eas build --platform ios --profile production --clear-cache\`

### "App crashes on launch"

  ** Issue:** Missing dependencies or configuration

    ** Solution:**
      1. Test on physical device via TestFlight
2. Check console logs in Xcode
3. Verify all environment variables are set
4. Ensure all required frameworks are linked

### "Rejection: Missing Privacy Policy"

  ** Issue:** Privacy policy not accessible

    ** Solution:**
      1. Create comprehensive privacy policy page
2. Ensure URL is publicly accessible
3. Cover all data collection and usage
4. Include third - party services(Google, Stripe)
5. Update in App Store Connect

---

## Version Updates

### 14. Updating Your App

When releasing updates:

#### 14.1 Prepare Update

  - [] Update version in \`app.config.js\`:
\`\`\`javascript
  version: "3.0.1",  // Increment version
  buildNumber: "11",  // Increment build number
  \`\`\`

  - [] Update \`.env.production\` if credentials changed

#### 14.2 Build New Version

  \`\`\`bash
# Build new version
eas build --platform ios --profile production

# Submit to TestFlight
eas submit --platform ios --latest
\`\`\`

#### 14.3 Create New Version in App Store Connect

  - [] Go to App Store Connect → Your App
    - [] Click "+" next to "iOS App"
      - [] Enter new version number: "3.0.1"
        - [] Fill in "What's New in This Version"
          - [] Select new build
            - [] Submit for review

---

## Useful Commands Reference

### Build Commands

  \`\`\`bash
# Build for App Store
eas build --platform ios --profile production

# Build for TestFlight with specific version
eas build --platform ios --profile production --clear-cache

# Check build status
eas build:list --platform ios

# View specific build
eas build:view [build-id]

# Download IPA
eas build:download --platform ios --profile production
\`\`\`

### Submission Commands

  \`\`\`bash
# Submit latest build to TestFlight
eas submit --platform ios --latest

# Submit specific build
eas submit --platform ios --id [build-id]
\`\`\`

### Credential Management

  \`\`\`bash
# View and manage iOS credentials
eas credentials -p ios

# Options:
# - View credentials
# - Set up new certificate
# - Upload existing certificate
# - Remove credentials
\`\`\`

---

## Additional Resources

### Apple Documentation

  - ** App Store Connect **: https://appstoreconnect.apple.com
- ** Developer Portal **: https://developer.apple.com/account
- ** Review Guidelines **: https://developer.apple.com/app-store/review/guidelines/
- ** Human Interface Guidelines **: https://developer.apple.com/design/human-interface-guidelines/
- ** App Store Marketing **: https://developer.apple.com/app-store/marketing/guidelines/

### Project Documentation

  - ** EAS Build Guide **: \`./EAS_BUILD_GUIDE.md\`
    - ** Environment Setup **: \`../ENVIRONMENT_SETUP.md\`
      - ** Configuration **: \`./CONFIGURATION.md\`
        - ** Troubleshooting **: \`./TROUBLESHOOTING.md\`
          - ** Screenshots Guide **: \`./SCREENSHOTS_GUIDE.md\`

### Support

  - ** Apple Developer Forums **: https://developer.apple.com/forums/
- ** Stack Overflow **: Tag \`ios\` or\`expo\`
  - ** Expo Discord **: https://chat.expo.dev/
- ** Project Support **: support @webpenter.com

---

## Quick Reference Card

### Most Common Commands

  \`\`\`bash
# Build for App Store
eas build -p ios --profile production

# Submit to TestFlight
eas submit -p ios --latest

# Check build status
eas build:list -p ios

# Manage credentials
eas credentials -p ios

# View build
eas build:view [build-id]
\`\`\`

### Important URLs

  - ** App Store Connect **: https://appstoreconnect.apple.com
- ** Developer Account **: https://developer.apple.com/account
- ** TestFlight **: https://appstoreconnect.apple.com (TestFlight tab)
- ** Review Status **: App Store Connect → My Apps →[Your App]

---

## Comparison: iOS vs Android

  | Aspect | iOS(Apple) | Android(Google) |
| --------| -------------| ------------------|
| ** Cost ** | $99 / year | $25 one - time |
| ** Review Time ** | 1 - 4 days | 1 - 7 days |
| ** Requirements ** | Mac required | Any computer |
| ** Certificate ** | Complex(managed by EAS) | Simple(keystore) |
| ** Testing ** | TestFlight | Internal testing track |
| ** Updates ** | Each update reviewed | Faster review for updates |
| ** Privacy ** | Strict privacy labels | Data safety form |
| ** Rejection Rate ** | Higher(~40 %) | Lower(~25 %) |

  ---

** Last Updated:** 2026-01 -08
  ** For:** BookHere Mobile App v3.0.0

For ThemeForest buyers: This comprehensive checklist ensures a smooth submission to the Apple App Store.Follow all steps carefully and refer to the troubleshooting section if you encounter issues.

Good luck with your App Store submission! 🚀


`
    }
  }
};

export default submission;
