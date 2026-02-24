import{C as e}from"./index-DwI90R08.js";const o={title:"FAQ",icon:e,tags:["help","qa","flutter","houzilo"],content:`
# Frequently Asked Questions (FAQ)

Common questions and answers about the **Houzilo** Flutter real estate mobile app.

---

## Table of Contents

1. [General Questions](#general-questions)
2. [Installation & Setup](#installation--setup)
3. [Backend & Infrastructure](#backend--infrastructure)
4. [Configuration](#configuration)
5. [Features & Functionality](#features--functionality)
6. [Customization](#customization)
7. [Deployment & Building](#deployment--building)
8. [Support & Licensing](#support--licensing)

---

## General Questions

### What is Houzilo?

Houzilo is a complete, production-ready **Flutter** mobile application for real estate property listings and discovery. It connects property buyers, renters, and real estate agents through a seamless mobile experience powered by a **WordPress + Houzez Theme** backend.

### What platforms does Houzilo support?

- **iOS**: iOS 12.0 and higher
- **Android**: Android 6.0 (API 23) and higher — required for hardware-backed secure token storage

### Do I need a backend to use this app?

Yes. Houzilo requires a **WordPress backend with the Houzez Theme** installed. The app communicates with the backend via a secured REST API (JWT Authentication). Without the backend, the app cannot load any property data.

### Is the Flutter source code included?

Yes, you receive the complete Flutter (Dart) source code that you can modify, brand, and publish under your own account.

### Can I use this for my commercial project?

Yes, with the appropriate ThemeForest license (Regular or Extended), you can use Houzilo in your commercial projects.

### What technologies is Houzilo built with?

- **Flutter** (Dart) — primary framework
- **Provider** — state management
- **Dio** — HTTP client for all API calls
- **Firebase Auth** — Google Sign-In and authentication
- **flutter_secure_storage** — encrypted JWT token storage
- **flutter_map** + OpenStreetMap — maps with no API key required
- **cached_network_image** — efficient property image loading
- **flutter_localizations** + ARB files — i18n (English & Urdu)
- **Google Fonts** (Inter, Montserrat) — typography

---

## Backend & Infrastructure

### Is a backend included with this purchase?

**Partially.** The **Houzilo Flutter app source code** is included, but the WordPress backend (Houzez Theme) must be purchased separately.

**What's Included:**
- ✅ Complete Flutter source code
- ✅ Full documentation
- ✅ API integration layer (Dio-based, pre-configured)

**What's NOT Included (Must Purchase Separately):**
- ❌ **Houzez WordPress Theme** (~$69 from ThemeForest) — provides the actual backend (property management, listings, users, etc.)
- ❌ Web hosting for WordPress

### What backend do I need?

**You need two things:**

1. **Houzez WordPress Theme** (Purchase separately)
   - Cost: ~$69 on ThemeForest
   - Search "Houzez" on ThemeForest.net
   - Provides complete real estate backend functionality

2. **WordPress Installation** (Free)
   - WordPress 6.0+ from WordPress.org
   - Web hosting with PHP & MySQL ($5–20/month)

### Is the Houzez theme required?

**YES.** The Houzez theme provides:
- Property management system (add, edit, delete listings)
- Agent and agency user roles
- Search and filtering system
- REST API endpoints the app communicates with
- Admin dashboard

### What hosting do I need for the WordPress backend?

Any standard WordPress hosting works. Recommended options:

- **Shared Hosting** ($5–15/month): SiteGround, Bluehost, Namecheap
  - Perfect for starting out; handles thousands of listings easily
- **Managed WordPress** ($20–50/month): WP Engine, Kinsta
  - Better performance, automatic backups, easier maintenance
- **VPS** ($10–30/month): DigitalOcean, Vultr, Linode
  - More control, ideal for scaling

For most users, shared hosting at $5–15/month is perfectly sufficient.

### How long does backend setup take?

With basic WordPress experience:
1. Install WordPress: 10 minutes (most hosts have 1-click installer)
2. Install Houzez Theme: 5–10 minutes
3. Install JWT Authentication plugin: 2 minutes
4. Configure \`wp-config.php\` with JWT secret: 2 minutes
5. Set the backend URL in the Flutter app: 1 minute

**Total: 20–30 minutes** ✅

### Do I need technical skills to set up the backend?

Basic WordPress knowledge is enough. If you can:
- ✅ Install a WordPress theme from the admin panel
- ✅ Install a plugin from the WordPress plugin directory
- ✅ Edit \`wp-config.php\` to add 2 lines
- ✅ Copy-paste a URL into a config file

Then you can set up the backend.

### What happens if my backend is down?

The app shows error messages and cannot load property data until the backend is back online. To minimize downtime:
- Choose reliable hosting (99.9%+ uptime SLAs)
- Set up automatic backups
- Use a free monitoring tool like UptimeRobot.com
- Keep WordPress, Houzez Theme, and plugins updated

### What WordPress plugins are required?

- **JWT Authentication for WP REST API** — required for secure token-based login
- **Houzez** theme — provides all property and user API endpoints

Optional but recommended:
- An SMTP email plugin (e.g., WP Mail SMTP) — needed for Forgot Password emails to work

---

## Installation & Setup

### What tools do I need to install?

Before you begin, install:
- **Flutter SDK** (latest stable version from flutter.dev)
- **Android Studio** (for Android development and emulators)
- **Xcode** (macOS only, for iOS development)
- **Git** (for version control)

Verify your setup with:
\`\`\`bash
flutter doctor
\`\`\`
All items should show a green ✓.

### How long does installation take?

If Flutter is already installed, setting up the project takes about 15–20 minutes:
\`\`\`bash
flutter pub get
cd ios && pod install && cd ..  # iOS only
flutter run
\`\`\`

### Do I need a Mac to develop this app?

- **For iOS development**: Yes, macOS is required for iOS builds and simulator testing
- **For Android only**: No — you can develop on Windows, Mac, or Linux

### Can I test the app without building it for a store?

Yes. Run the app directly on a connected physical device or emulator:
\`\`\`bash
flutter run
\`\`\`
No developer account is needed for development testing.

### Do I need paid developer accounts?

- **For development/testing**: No
- **For App Store (iOS)**: Yes — Apple Developer Program ($99/year)
- **For Play Store (Android)**: Yes — Google Play Developer ($25 one-time fee)

### \`flutter pub get\` fails with dependency conflicts

\`\`\`bash
flutter clean
flutter pub cache repair
flutter pub get
\`\`\`
If the conflict persists, check \`pubspec.yaml\` for version range mismatches and align them.

### \`pod install\` fails on iOS

\`\`\`bash
cd ios
pod deintegrate
pod repo update
pod install
cd ..
\`\`\`
If still failing, try \`sudo gem update cocoapods\` first.

### Localization files are missing (AppLocalizations not found)

Run the localization generator after any ARB file change:
\`\`\`bash
flutter gen-l10n
\`\`\`

---

## Configuration

### Where do I configure the backend URL?

Edit \`lib/core/network/dio_client.dart\` and update the \`baseUrl\`:
\`\`\`dart
static const String baseUrl = 'https://YOUR-DOMAIN.com/wp-json/';
\`\`\`
Always use \`https://\` — never \`http://\` in production.

### How do I configure Google Sign-In?

1. Create a Firebase project at console.firebase.google.com
2. Add your Android app (package: \`com.webpenter.houzilo\`) and iOS app (Bundle ID)
3. Download \`google-services.json\` → place at \`android/app/google-services.json\`
4. Download \`GoogleService-Info.plist\` → place at \`ios/Runner/GoogleService-Info.plist\`
5. Add your SHA-1 fingerprint in the Firebase Console for Android
6. Run \`flutter clean && flutter pub get\` and restart

### How do I change the app name?

Update in these locations:
- **pubspec.yaml** — \`name:\` field
- **Android**: \`android/app/src/main/AndroidManifest.xml\` — \`android:label\`
- **iOS**: \`ios/Runner/Info.plist\` — \`CFBundleDisplayName\`

### How do I change the Android application ID?

Edit \`android/app/build.gradle\`:
\`\`\`gradle
namespace = "your.new.app.id"
applicationId "your.new.app.id"
\`\`\`
Also update the \`google-services.json\` package name to match.

### How do I configure Facebook credentials?

Add to \`android/local.properties\` (do NOT commit this file to Git):
\`\`\`properties
facebookAppId=YOUR_APP_ID
facebookClientToken=YOUR_CLIENT_TOKEN
\`\`\`
These are injected at build time by \`build.gradle\` as string resources.

### Can I use a different backend instead of WordPress?

Technically yes, but you would need to modify all the network service classes in \`lib/core/network/\` to match your custom API's endpoint structure and response models. This requires intermediate to advanced Flutter development skills.

---

## Features & Functionality

### Does the app support multiple languages?

Yes. Houzilo ships with full localization for **2 languages**:
- **English** (\`en\`) — the default language
- **Urdu** (\`ur\`) — full translation coverage (~470+ string keys)

Users can switch languages from **Profile → Language** at any time.

### Can I add more languages?

Yes. The localization architecture is designed for easy extension:
1. Create a new \`app_XX.arb\` file in \`lib/l10n/\` (e.g., \`app_fr.arb\`) with all translated string keys
2. Register the new \`Locale\` in \`main.dart\`
3. Run \`flutter gen-l10n\`

No changes to any screen or widget code are needed.

### Does it support dark mode?

Yes. Houzilo has a fully implemented dual-theme system:
- **Light Theme** — white background, teal (\`#54C4D9\`) and green (\`#85C341\`) primary accents
- **Dark Theme** — navy background (\`#0F172A\`) with slate surfaces

Users toggle dark mode from **Profile → Dark Mode**. The preference is persisted across sessions.

### Can users book properties directly from the app?

Houzilo uses an **email inquiry model** (appropriate for real estate). Users can:
- Tap **Email** on the property detail screen to send an inquiry form directly to the agent or agency
- Tap **Call** to open their phone dialer with the agent's number pre-filled

Direct in-app booking and payment processing are not implemented in the current version.

### Can hosts add properties from the mobile app?

Yes. Authenticated users can publish listings through a comprehensive **9-step Add Property wizard**:
1. Basic Info (title, type, description)
2. Media (image uploads)
3. Details (price, beds, baths, area, year built)
4. Amenities (grid selection)
5. Floor Plans
6. Sub Listings
7. Contact Info (agent, agency, or author)
8. Location (interactive map pin + reverse geocoding)
9. Property Settings (featured, login-to-view, GDPR)

### Can hosts save a listing as a draft?

Yes. At any point in the wizard, hosts can tap **Save as Draft** to persist the partially-completed listing to the backend. It can be resumed at any time from the My Listings screen.

### Is there a favorites/wishlist feature?

Yes. Authenticated users can save any property to their Favorites list by tapping the bookmark icon on property cards or the detail screen. The Favorites tab in the bottom navigation shows all saved properties.

### Is there a review and rating system?

Yes. Authenticated users can submit reviews with:
- A **star rating** (1–5) with labels: Poor, Fair, Good, Very Good, Excellent
- A **review title**
- A **written review body**

Reviews appear on the property detail screen and are synced via the backend API.

### How do maps work in the app?

Houzilo uses **flutter_map** with **OpenStreetMap** tiles — a fully open-source, zero-API-key map solution. Features include:
- Property location pin on the detail screen
- Full-screen map expand view
- Interactive location picker for listing submissions (with reverse geocoding)
- "Get Directions" button that opens Google Maps or Apple Maps natively
- Distance calculation from the user's current location using \`geolocator\`

### Is real-time messaging supported?

No. Communication between users and agents is handled via the **email inquiry form** only. Real-time chat is not implemented in the current version.

### Are push notifications supported?

Push notifications are not configured in the current version of the app. Firebase Cloud Messaging (FCM) can be integrated as a future enhancement.

---

## Customization

### How do I change the color scheme?

Edit \`lib/utils/app_colors.dart\` and update the primary and secondary color constants:
\`\`\`dart
static const Color primary = Color(0xFF54C4D9);   // Change this
static const Color secondary = Color(0xFF85C341); // Change this
\`\`\`
These values cascade through the theme automatically.

### How do I change the app theme?

Edit \`lib/utils/app_theme.dart\`. The file defines both \`lightTheme\` and \`darkTheme\` using Flutter's Material 3 system. You can adjust the App Bar style, card colors, input decoration, button themes, and more.

### Can I change the app icon and splash screen?

Yes:
- **App Icon**: Replace the files in \`android/app/src/main/res/mipmap-*/\` (Android) and \`ios/Runner/Assets.xcassets/AppIcon.appiconset/\` (iOS)
- **Splash Screen**: Replace asset paths referenced in \`lib/utils/image_path.dart\`:
  \`\`\`dart
  static const String houziloSplashLight = 'assets/png/splash-light.png';
  static const String houziloSplashDark  = 'assets/png/splash-dark.png';
  \`\`\`

### How do I change the app logo?

Replace the asset file and update the path in \`lib/utils/image_path.dart\`:
\`\`\`dart
static const String houziloLogo2 = 'assets/png/houzilo-logo2.png';
\`\`\`

### How do I change fonts?

The app uses **Google Fonts** (Inter and Montserrat). To change fonts, edit \`lib/utils/app_text_styles.dart\` and replace \`GoogleFonts.inter\` / \`GoogleFonts.montserrat\` with any other Google Fonts family. No additional font asset files are needed.

### How do I add a new screen?

1. Create your screen widget in \`lib/view/your_feature/your_screen.dart\`
2. Add a route name constant in \`lib/routes/route_names.dart\`
3. Add the route case in \`lib/routes/routes.dart\` inside \`generateRoutes()\`
4. Navigate using:
\`\`\`dart
Navigator.pushNamed(context, RouteName.yourScreen, arguments: {'key': value});
\`\`\`

### Can I remove features I don't need?

Yes. You can remove unused screens by:
- Deleting the screen file from \`lib/view/\`
- Removing the route from \`routes.dart\` and \`route_names.dart\`
- Removing the Provider from \`main.dart\`'s \`MultiProvider\` list
- Removing related network service files from \`lib/core/network/\`

### How do I add a new localization string?

Add the key-value pair to \`lib/l10n/app_en.arb\` (and \`app_ur.arb\` for the Urdu translation):
\`\`\`json
"yourNewKey": "Your English Text"
\`\`\`
Then run \`flutter gen-l10n\` and access it in code via:
\`\`\`dart
AppLocalizations.of(context)!.yourNewKey
\`\`\`

---

## Deployment & Building

### How do I build the app for production?

**Android (App Bundle for Play Store):**
\`\`\`bash
flutter build appbundle --release
\`\`\`

**Android (APK for direct installation):**
\`\`\`bash
flutter build apk --release
\`\`\`

**iOS:**
\`\`\`bash
flutter build ipa --release
\`\`\`

Make sure your \`key.properties\` and keystore are configured before building the release APK/AAB.

### Do I need a Mac to build for iOS?

Yes. Xcode is required for iOS builds, and Xcode only runs on macOS. You cannot build an iOS binary on Windows or Linux.

### How do I set up release signing for Android?

1. Generate a keystore:
\`\`\`bash
keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
\`\`\`
2. Create \`android/key.properties\` (do not commit this file):
\`\`\`properties
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=upload
storeFile=upload-keystore.jks
\`\`\`
3. The \`android/app/build.gradle\` already reads from \`key.properties\` automatically.

### How do I submit to the App Store?

1. Build the IPA: \`flutter build ipa --release\`
2. Open Xcode → Organizer → Upload to App Store Connect
3. Fill in App Store metadata (screenshots, description, keywords)
4. Submit for Apple review (usually 1–3 days)

### How do I submit to the Play Store?

1. Build the AAB: \`flutter build appbundle --release\`
2. Go to Google Play Console → your app → Production → Create new release
3. Upload the \`.aab\` file from \`build/app/outputs/bundle/release/\`
4. Fill in store listing info and submit (usually 1–2 days)

### What's the difference between APK and AAB?

- **APK**: Android Package — for direct installation and testing on devices
- **AAB**: Android App Bundle — required format for Google Play Store; Google generates optimized APKs per device

### How do I enable ProGuard / code obfuscation?

ProGuard is already enabled in the release build type in \`android/app/build.gradle\`:
\`\`\`gradle
buildTypes {
  release {
    minifyEnabled true
    shrinkResources true
    proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
  }
}
\`\`\`
Do not disable these flags for production builds.

### Can I update the app after publishing?

Yes:
- **UI/logic changes**: Rebuild and submit a new version to the stores
- **Backend changes**: If only the WordPress backend changes, no app update is needed — the app reads data dynamically via API

### How long does store review take?

- **Apple App Store**: Usually 1–3 business days
- **Google Play Store**: Usually 1–2 days (sometimes within hours for established accounts)

---

## Support & Licensing

### What support is included?

- 6 months of support from the purchase date
- Bug fixes and issue resolution
- Installation and configuration assistance
- General usage and setup questions

### What's NOT included in support?

- Custom feature development
- Third-party service setup beyond provided guidance
- Server/hosting management
- App Store submission process management

### How do I contact support?

Email: **support@webpenter.com**

Please include:
- Your ThemeForest purchase code
- Detailed description of the issue
- Screenshots or error messages
- Flutter version (\`flutter --version\`)
- Steps to reproduce the problem

### What's the difference between Regular and Extended License?

**Regular License:**
- Use in one project
- End users are not charged (free app or one-time charge)

**Extended License:**
- Use in SaaS or subscription-based products
- End users are charged on a recurring basis

See full details at: https://themeforest.net/licenses

### Can I get a refund?

Per ThemeForest policy, refunds are only granted if the item is proven to not work as described or has major unresolvable issues. Please contact support before requesting a refund.

### Can I hire you for custom development?

Yes. Contact us at support@webpenter.com for a quote. We offer:
- Custom feature development
- White-label branding
- Backend setup and configuration services
- App Store submission assistance

---

## Technical Questions

### Why are API calls returning 401 Unauthorized?

Common causes:
1. JWT Authentication plugin is not installed or active on WordPress
2. \`JWT_AUTH_SECRET_KEY\` is not set in \`wp-config.php\`
3. The JWT token has expired — log out and log back in
4. CORS headers on the backend are blocking preflight requests

### Google Sign-In shows \`sign_in_failed\`

Check:
1. SHA-1 fingerprint is registered in Firebase Console
2. \`google-services.json\` is the latest version and in the correct location
3. The Firebase project has Sign-In with Google enabled
4. Test on a physical device (Google Sign-In often fails on emulators without a logged-in Google account)

### App is stuck on the splash/loading screen

Try:
1. Verify \`google-services.json\` is present and valid
2. Check logcat/console for the exact exception
3. Run \`flutter clean && flutter run\` to clear cached state
4. Ensure the backend URL in \`dio_client.dart\` is reachable

### Map tiles are not loading (blank grey map)

Verify:
1. Internet connectivity is available
2. The \`userAgentPackageName\` in the TileLayer matches the app ID: \`com.webpenter.houzilo\`
3. OpenStreetMap is not blocked on your network or device region

### Location/distance isn't working

Check:
1. Location permissions are granted (Android: Fine + Coarse, iOS: \`NSLocationWhenInUseUsageDescription\` in Info.plist)
2. The device has GPS enabled
3. On emulators, set a simulated location in the device settings

### Images are not loading — only the placeholder appears

Verify:
1. The image URL is accessible (test in a browser)
2. The device has internet access
3. Clear the image cache if corrupted:
\`\`\`dart
DefaultCacheManager().emptyCache();
\`\`\`

### Shimmer loading never stops

The Provider's \`isLoading\` flag may be stuck at \`true\` due to an unhandled exception. Ensure every network method has a \`finally\` block:
\`\`\`dart
} finally {
  setLoading(false);
}
\`\`\`

### How do I run flutter analyze?

\`\`\`bash
flutter clean
flutter pub get
flutter gen-l10n
flutter analyze
\`\`\`

Address any deprecated API warnings by consulting the Flutter migration guide for the relevant version.

---

## Best Practices

### Should I modify the core utility files directly?

For color, theme, and text style changes, yes — those files are designed to be your central customization point:
- \`lib/utils/app_colors.dart\` — all color constants
- \`lib/utils/app_theme.dart\` — all theme definitions
- \`lib/utils/app_text_styles.dart\` — all text style definitions

For business logic changes, prefer adding new Provider classes or extending existing ones rather than modifying screen widgets directly.

### How do I safely keep my customizations when the app is updated?

- Use **Git** for version control from day one
- Keep your credentials (Firebase config, keystore) out of the repository
- Document all custom changes in your own branch
- Merge upstream updates carefully using \`git diff\` to review conflicts

### What should I test before launching?

- [ ] All screens navigate correctly on both iOS and Android
- [ ] Backend API connection works with the production URL
- [ ] Login/signup flow (email + Google Sign-In) completes successfully
- [ ] Property listing and search returns results
- [ ] Property detail screen loads all data (images, map, agent contact)
- [ ] Inquiry form sends successfully to the backend
- [ ] Favorites save and persist across sessions
- [ ] Review submission works
- [ ] Add Property wizard completes and publishes a listing
- [ ] Profile update and password change work
- [ ] Language switching (English ↔ Urdu) works on both platforms
- [ ] Light and dark modes display correctly
- [ ] Map pins appear and directions button opens native maps
- [ ] Release APK/AAB does not crash (test ProGuard with --no-shrink flag first)

---

## Still Have Questions?

If your question isn't answered here:

1. **Check the Full Documentation:**
   - Installation Guide
   - Configuration Guide
   - Customization Guide
   - Troubleshooting Guide
   - Security Policy

2. **Search Error Messages:**
   - Google the exact Flutter/Dart error message
   - Check Stack Overflow (tag: flutter)
   - Check official Flutter docs: https://docs.flutter.dev

3. **Contact Support:**
   - Email: support@webpenter.com
   - Include your ThemeForest purchase code
   - Provide console output / screenshots

---

## Useful Resources

- **Flutter Docs**: https://docs.flutter.dev
- **Dart Language**: https://dart.dev/guides
- **Provider Package**: https://pub.dev/packages/provider
- **Dio HTTP Client**: https://pub.dev/packages/dio
- **flutter_map Docs**: https://docs.fleaflet.dev
- **Firebase Flutter**: https://firebase.flutter.dev/docs/overview
- **flutter_secure_storage**: https://pub.dev/packages/flutter_secure_storage
- **Houzez Theme**: https://themeforest.net/item/houzez-real-estate-wordpress-theme/15752549
- **JWT Auth Plugin**: https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/

---

**Need More Help?**

Don't hesitate to reach out to our support team at support@webpenter.com with your purchase code and a detailed description of your issue.

    `};export{o as default,o as faq};
