import{a as e}from"./index-DwI90R08.js";const t={title:"Troubleshooting",icon:e,tags:["debug","errors","fixes"],content:`
# Troubleshooting Guide

> **Note:** Payment Issues and Push Notification Issues sections have been omitted — these features are not implemented in this version of the app.

## Table of Contents
- [Installation Issues](#installation-issues)
- [Build & Compilation Issues](#build--compilation-issues)
- [Runtime Errors](#runtime-errors)
- [Backend & API Issues](#backend--api-issues)
- [Authentication Problems](#authentication-problems)
- [Maps & Location Issues](#maps--location-issues)
- [UI & Display Issues](#ui--display-issues)
- [Performance Issues](#performance-issues)

---

## Installation Issues

### ❌ \`flutter pub get\` fails with dependency conflict
**Symptoms:** Error mentioning version constraints or incompatible packages.
**Fix:**
\`\`\`bash
flutter clean
flutter pub cache repair
flutter pub get
\`\`\`
If conflict persists, check \`pubspec.yaml\` for incompatible version ranges and align them manually.

---

### ❌ \`pod install\` fails on iOS
**Symptoms:** CocoaPods errors during iOS setup.
**Fix:**
\`\`\`bash
cd ios
pod deintegrate
pod repo update
pod install
cd ..
\`\`\`
If the issue persists, try updating CocoaPods:
\`\`\`bash
sudo gem update cocoapods
\`\`\`

---

### ❌ \`flutter doctor\` reports issues
**Symptoms:** \`flutter doctor\` shows ✗ or ! for tools.
**Fix:**

| Issue | Command |
|---|---|
| Android licenses not accepted | \`flutter doctor --android-licenses\` |
| Xcode not configured | \`sudo xcodebuild -license accept\` |
| Android Studio plugin missing | Install Flutter/Dart plugins in Android Studio |
| cmdline-tools missing | Install via Android Studio SDK Manager |

---

### ❌ \`google-services.json\` / \`GoogleService-Info.plist\` not found
**Symptoms:** Build fails with Firebase initialization error.
**Fix:**
*   Place \`google-services.json\` at: \`android/app/google-services.json\`
*   Place \`GoogleService-Info.plist\` at: \`ios/Runner/GoogleService-Info.plist\`
*   Verify \`apply plugin: 'com.google.gms.google-services'\` is at the bottom of \`android/app/build.gradle\`.

---

## Build & Compilation Issues

### ❌ \`Gradle build failed\`
**Symptoms:** Android build fails in \`./gradlew\` step.

**Common Fixes:**
\`\`\`bash
# Clean and rebuild
flutter clean
flutter build apk

# Check Java version — must be JDK 17
java -version
\`\`\`
Ensure \`android/app/build.gradle\` has:
\`\`\`gradle
compileOptions {
  sourceCompatibility JavaVersion.VERSION_17
  targetCompatibility JavaVersion.VERSION_17
}
kotlinOptions { jvmTarget = '17' }
\`\`\`

---

### ❌ \`Undefined class\` / \`Import not found\` errors
**Symptoms:** Red underlines or Dart analysis errors after pulling new code.
**Fix:**
\`\`\`bash
flutter pub get
flutter gen-l10n   # Regenerate localization files
dart run build_runner build --delete-conflicting-outputs
\`\`\`

---

### ❌ \`MissingPluginException\` on device
**Symptoms:** Plugin like \`geolocator\` or \`flutter_secure_storage\` crashes at runtime.
**Fix:**
\`\`\`bash
flutter clean
flutter pub get
# For iOS
cd ios && pod install && cd ..
\`\`\`
Then hot restart (not hot reload).

---

### ❌ Release build crashes but debug works
**Symptoms:** App works in debug mode but crashes after \`flutter build apk --release\`.
**Common Causes & Fixes:**
*   Ensure production \`google-services.json\` is used (not the debug one).
*   Check ProGuard rules — \`android/app/proguard-rules.pro\` may need entries for Dio or Firebase.
*   Run with \`--no-shrink\` to confirm ProGuard is the cause:
\`\`\`bash
flutter build apk --release --no-shrink
\`\`\`

---

### ❌ \`key.properties\` not found (signing error)
**Symptoms:** Release build fails with keystore error.
**Fix:** Create \`android/key.properties\`:
\`\`\`properties
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=YOUR_KEY_ALIAS
storeFile=upload-keystore.jks
\`\`\`

---

## Runtime Errors

### ❌ \`ProviderNotFoundException\` — No Provider found
**Symptoms:** Red screen with \`ProviderNotFoundException\` for a specific provider.
**Fix:** Ensure the provider is registered in the \`MultiProvider\` list in \`main.dart\`:
\`\`\`dart
ChangeNotifierProvider(create: (_) => YourMissingProvider()),
\`\`\`

---

### ❌ \`setState() called after dispose()\`
**Symptoms:** Warning in console; widget update attempted after screen was popped.
**Fix:** Add a mounted check before setState:
\`\`\`dart
if (mounted) {
  setState(() { ... });
}
\`\`\`

---

### ❌ Snackbar / GlobalKey error — \`No ScaffoldMessenger found\`
**Symptoms:** Error using global snackbars from outside widget context.
**Fix:** The app uses a global \`scaffoldMessengerKey\`. Verify it is attached in \`main.dart\`:
\`\`\`dart
return MaterialApp(
  scaffoldMessengerKey: scaffoldMessengerKey, // ← Must be present
  ...
);
\`\`\`

---

### ❌ App loops on startup / never leaves splash
**Symptoms:** Startup screen spins indefinitely.
**Likely Causes:**
*   Firebase initialization failed (missing \`google-services.json\`).
*   \`LocalStorageProvider\` failed to read secure storage.
*   Network timeout on token validation.

**Fix:**
1. Check logcat / console for the exact exception.
2. Verify Firebase config files are in place.
3. Run \`flutter clean && flutter run\` to clear cached state.

---

## Backend & API Issues

### ❌ All API calls return \`404 Not Found\`
**Symptoms:** Properties, agents, or details fail to load.
**Fix:** Verify \`baseUrl\` in \`lib/core/network/dio_client.dart\` matches your live WordPress domain:
\`\`\`dart
baseUrl: 'https://YOUR-DOMAIN.com/wp-json/',
\`\`\`

---

### ❌ API returns \`401 Unauthorized\`
**Symptoms:** Login succeeds but subsequent calls return 401.
**Checklist:**
*   JWT plugin is installed and active on WordPress.
*   \`auth_token\` is correctly stored in secure storage after login.
*   Token has not expired — try logging out and back in.
*   WordPress \`wp-config.php\` has:
\`\`\`php
define('JWT_AUTH_SECRET_KEY', 'your-secret-key');
define('JWT_AUTH_CORS_ENABLE', true);
\`\`\`

---

### ❌ API returns \`500 Internal Server Error\`
**Symptoms:** Random or consistent server errors.
**Fix:**
*   Check WordPress error logs on the server.
*   Ensure \`Houzez Theme\` and \`Houzez API plugin\` are up to date.
*   Verify database connection on the server.

---

### ❌ Timeout errors (\`DioException: connection timeout\`)
**Symptoms:** Requests hang for 30 seconds before failing.
**Fix:**
*   Check server health / hosting uptime.
*   Increase timeout temporarily in \`dio_client.dart\` for debugging:
\`\`\`dart
connectTimeout: const Duration(seconds: 60),
receiveTimeout: const Duration(seconds: 60),
\`\`\`
*   Check CORS settings — preflight OPTIONS requests may be failing.

---

### ❌ Properties list loads but shows empty / wrong data
**Symptoms:** API call succeeds (200) but data is empty or mismatched.
**Fix:**
*   Verify the API response model matches \`lib/core/models/\` (check for renamed fields after a backend update).
*   Enable debug logs in \`dio_client.dart\` by uncommenting the interceptors.
*   Use a tool like Postman to inspect the raw API response.

---

## Authentication Problems

### ❌ Login succeeds but user is shown as Guest
**Symptoms:** Token is saved but \`LocalStorageProvider\` returns \`null\`.
**Fix:**
*   Clear app data and retry.
*   Ensure \`token_valid\` key is set to \`'true'\` after login.
*   Check \`LocalStorageProvider\` reads from \`FlutterSecureStorage\` correctly.

---

### ❌ Google Sign-In shows \`PlatformException: sign_in_failed\`
**Symptoms:** Google sign-in dialog appears then immediately fails.
**Checklist:**
1.  Verify SHA-1 fingerprint is registered in Firebase Console.
2.  Verify \`google-services.json\` is the latest downloaded version.
3.  Try on a physical device — Google Sign-In often fails on emulators with no Google account.
4.  Run:
\`\`\`bash
flutter clean && flutter run
\`\`\`

---

### ❌ \`This email is already linked with Google Sign-In\`
**Symptoms:** User registered with email/password, but the email is a Google account.
**Expected Behavior:** The app shows an in-app alert directing the user to sign in with Google instead. This is by design — no fix required.

---

### ❌ Forgot Password email not received
**Symptoms:** User submits forgot password form, no email arrives.
**Fix:**
*   Ensure WordPress has a valid SMTP email plugin configured.
*   Check the spam/junk folder.
*   Verify the \`POST /houzez-api/v1/forgot-password\` endpoint works via Postman.

---

### ❌ Session expired — user logged out unexpectedly
**Symptoms:** User is redirected to Sign In without manually logging out.
**Cause:** JWT token expired or \`token_valid\` flag is \`'false'\`.
**Fix:**
*   Increase JWT expiration on WordPress (plugin settings).
*   The app reads \`token_valid\` key on launch — check if it's being set correctly after API failures.

---

## Maps & Location Issues

### ❌ Map tiles not loading (blank/grey map)
**Symptoms:** Map widget shows but no tiles appear.
**Fix:**
*   Verify internet connectivity.
*   OpenStreetMap tiles are free but can be rate-limited. Confirm your user agent is set:
\`\`\`dart
TileLayer(
  urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  userAgentPackageName: 'com.webpenter.houzilo', // ← Must match app ID
)
\`\`\`
*   Check if OSM is accessible from your region/device network.

---

### ❌ \`Geolocator\` permission denied — location not working
**Symptoms:** Distance calculator and nearby properties don't work.
**Fix (Android):** Ensure \`AndroidManifest.xml\` has:
\`\`\`xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
\`\`\`
**Fix (iOS):** Ensure \`Info.plist\` has:
\`\`\`xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Houzilo needs your location to show nearby properties.</string>
\`\`\`

---

### ❌ Map pins not appearing on property list map view
**Symptoms:** Map loads but no property markers are visible.
**Fix:**
*   Verify property API response includes \`latitude\` and \`longitude\` fields.
*   Ensure coordinates are valid (not \`0.0\` or \`null\`).
*   Check \`nearby_property_provider.dart\` for data loading status.

---

### ❌ \`Google Maps Directions\` button does nothing
**Symptoms:** "Get Directions" button on property details doesn't open maps.
**Fix:** Ensure \`url_launcher\` is configured and the \`launchUrl\` call handles the \`google.com/maps\` URI:
\`\`\`xml
<!-- iOS — add to Info.plist -->
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>comgooglemaps</string>
  <string>https</string>
</array>
\`\`\`

---

## UI & Display Issues

### ❌ Text is too large / too small on some devices
**Symptoms:** Layout breaks on high/low accessibility settings.
**Cause:** System font scaling.
**Fix:** Already handled in \`main.dart\`:
\`\`\`dart
textScaler: MediaQuery.of(context).textScaler
    .clamp(minScaleFactor: 0.8, maxScaleFactor: 1.6),
\`\`\`
If still an issue, verify this code is present and the \`MediaQuery\` wrapper is active.

---

### ❌ Dark mode colors look wrong (wrong contrast)
**Symptoms:** Text or backgrounds look the same color in dark mode.
**Fix:** Always use \`Theme.of(context).textTheme\`, \`Theme.of(context).cardColor\`, and \`AppColors\` — never hardcode any colors. Check the affected widget for hardcoded \`Colors.white\` or \`Colors.black\`.

---

### ❌ Images not loading — only placeholder shown
**Symptoms:** Property images replaced by logo placeholder.
**Fix:**
*   Verify image URL is valid (test in browser).
*   Check \`CachedNetworkImage\` error callback for the actual error.
*   Ensure the device has internet access.
*   Clear image cache:
\`\`\`dart
DefaultCacheManager().emptyCache();
\`\`\`

---

### ❌ Shimmer loading never stops / data never appears
**Symptoms:** Skeleton loaders show indefinitely after screen load.
**Fix:**
*   Check the Provider's \`isLoading\` flag — it may be stuck at \`true\`.
*   Inspect the network call for unhandled exceptions in the \`finally\` block:
\`\`\`dart
} finally {
  setLoading(false); // ← Must always be called
}
\`\`\`

---

### ❌ Bottom navigation bar overlapping floating buttons
**Symptoms:** Action buttons on Property Details screen are hidden behind the nav bar.
**Fix:** The app uses \`floatingActionButton\` on the Details screen. Ensure \`Scaffold\` has \`extendBody: false\` and padding accounts for the bottom bar height.

---

### ❌ Arabic / RTL text displayed incorrectly
**Symptoms:** UI elements appear in wrong order when Urdu is selected.
**Fix:** The app forces LTR layout regardless of locale in \`main.dart\`:
\`\`\`dart
return Directionality(
  textDirection: TextDirection.ltr, // ← Forces left-to-right
  child: child!,
);
\`\`\`
This is intentional for design consistency.

---

## Performance Issues

### ❌ Scrolling is janky / not smooth
**Symptoms:** List views stutter while scrolling.
**Fix:**
*   Ensure \`CachedNetworkImage\` is used for all list card images (not \`NetworkImage\`).
*   Use \`const\` constructors wherever possible to prevent unnecessary rebuilds.
*   Verify \`Consumer\` widgets only wrap the minimal required subtree.
*   Check for expensive operations in \`build()\` methods.

---

### ❌ App uses excessive memory
**Symptoms:** App slows down after extended use or many screen navigations.
**Fix:**
*   Providers that load data should call \`clearData()\` when the screen disposes.
*   \`DetailsViewProvider.clearData()\` is designed for this — ensure it's called in \`dispose()\`.
*   Check for \`StreamSubscription\` or \`TextEditingController\` leaks — always dispose them.

---

### ❌ API calls firing multiple times on same screen
**Symptoms:** Network tab shows duplicate requests; data flickers.
**Fix:**
*   Use \`addPostFrameCallback\` in \`initState\` for initial data load (already the pattern used in most screens).
*   Add a \`isLoading\` guard at the start of the fetch method:
\`\`\`dart
if (isLoading) return;
setLoading(true);
\`\`\`

---

### ❌ \`flutter analyze\` shows many warnings
**Fix:** Run these in order:
\`\`\`bash
flutter clean
flutter pub get
flutter gen-l10n
flutter analyze
\`\`\`
Address any \`deprecated\` API usages by checking the Flutter migration guides for the affected version.
  `};export{t as default,t as troubleshooting};
