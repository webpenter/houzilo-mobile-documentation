import { Clock } from 'lucide-react';
import { DocSection } from '../../types';

export const changelog: DocSection = {
  title: "Changelog",
  icon: Clock,
  tags: ["updates", "releases", "versions"],
  content: `
# Changelog

All notable changes to the **Houzilo** Flutter real estate mobile application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.4.0] - 2026-02-21

### 🎉 Major Update — Documentation, Security & Stability Polish

### ✨ Added

#### Comprehensive Documentation Suite
- Added full **Installation Guide** covering environment setup, Flutter SDK, Firebase configuration, and first-run steps for both Android and iOS
- Added detailed **Configuration Guide** covering backend URL, Google Services setup, Facebook credentials via \`local.properties\`, branding, and build settings
- Added **Customization Guide** covering theme system, branding elements, UI components, localization, navigation, typography, and best practices
- Added **Troubleshooting Guide** with 30+ common issue resolutions across 8 categories: Installation, Build, Runtime, Backend/API, Authentication, Maps, UI, and Performance
- Added **Security Policy** including credentials management guide, JWT storage model, data protection tables, common vulnerability mitigations, responsible disclosure process, and a pre-release security checklist
- Added **Complete Features Guide** documenting all 12 implemented feature areas with detailed descriptions

#### Security Hardening
- Facebook App ID and Client Token moved from plaintext \`strings.xml\` to \`android/local.properties\` (build-time injection via \`build.gradle\` \`resValue\`)
- Added \`.gitignore\` recommendations for sensitive files: \`local.properties\`, \`key.properties\`, \`google-services.json\`, \`GooglService-Info.plist\`
- Confirmed all Dio logging is wrapped in \`kDebugMode\` — no token exposure in release builds

### 🎨 Changed

#### Search Filter Isolation
- Recent Properties on the Home screen are now completely isolated from Search tab filters
- Applying filters in the Search/Filter view no longer affects the Home screen property feed — each uses its own independent \`SearchProvider\` state

#### Featured Card Image Carousel
- Converted \`FeaturedCard\` from \`StatelessWidget\` to \`StatefulWidget\` to manage per-card carousel state
- Back arrow now only appears when there are previous images to navigate to
- Forward arrow only appears when there are more images ahead
- Each card maintains its own \`PageController\` and current-index state independently

### 🐛 Fixed
- Fixed filter state leaking between Search tab and Home screen Recent Properties
- Fixed featured card arrows navigating all images globally instead of per-property
- Fixed \`setState() called after dispose()\` warnings in async network callbacks
- Fixed keyboard overlap with Submit/Reset buttons in the Filter view keyword field
- Fixed profile photo update not reflecting until app restart

### 🔧 Technical
- All custom-replaced packages removed: \`fluttertoast\`, \`country_picker\`, \`readmore\`, \`loading_animation_widget\`, \`salomon_bottom_bar\`
- Replaced with lightweight custom implementations — reduced dependency count and APK size
- ProGuard enabled for release builds (\`minifyEnabled true\`, \`shrinkResources true\`)
- \`minSdkVersion\` confirmed at 23 for hardware-backed Android Keystore compatibility

---

## [1.3.0] - 2026-02-10

### ✨ Added

#### Property Statistics per Listing
- Each property card on the **My Listings** screen now shows individual view count and save count
- Statistics are fetched via \`PropertyStaticsProvider\` and mapped to listings by property ID
- Removed the previously shown total-summary statistics — per-property stats are more useful

#### Quick Listing Feature
- Added **Quick Listing** flow as a streamlined alternative to the full 9-step wizard
- Hosts can submit a property with just images, title, price, and type — minimal friction
- \`QuickListingProvider\` manages image picking, compression, and API submission state
- Registered in the global \`MultiProvider\` in \`main.dart\`
- Image compression applied before upload to reduce bandwidth and upload time

#### Mortgage Calculator Integration
- Added **Mortgage Calculator** screen accessible from the Property Details page
- Pre-fills the property price automatically when navigating from a listing
- Users can adjust loan amount, interest rate, and term to calculate monthly installments
- Route updated in \`routes.dart\` to accept \`propertyPrice\` argument

### 🎨 Changed
- Improved image upload speed in the Add Property wizard through multi-image compression
- \`DetailsViewProvider.clearData()\` now properly called in \`dispose()\` to free memory after leaving the details screen
- All network fetch methods use an \`isLoading\` guard to prevent duplicate concurrent API calls

### 🐛 Fixed
- Fixed \`ProviderNotFoundException\` for \`QuickListingProvider\` by registering it in \`main.dart\`
- Fixed type conflict between \`Property\` models from different network response models
- Fixed \`FullScreenLoader\` lint errors in Provider classes (context usage outside widget tree)
- Fixed profile picture not updating after upload until app cold restart

### 🔧 Technical
- Removed \`fluttertoast\` package — replaced with a custom global \`Snackbar\` using the app's \`scaffoldMessengerKey\`
- Removed \`salomon_bottom_bar\` — replaced with a fully custom bottom navigation bar widget
- Removed \`loading_animation_widget\` — replaced with Flutter's built-in \`CircularProgressIndicator\`

---

## [1.2.0] - 2026-01-31

### ✨ Added

#### Add Property Wizard — Sub Listings & Floor Plans
- Step 5 (Floor Plans) and Step 6 (Sub Listings) fully implemented with dynamic add/remove cards
- Each floor plan captures: title, price, size, bedrooms, bathrooms, images, and description
- Each sub-listing captures: title, price, category, size, availability date, and room counts
- Expansion tile UI with collapse/expand behavior per plan card

#### Location Step with Reverse Geocoding
- Step 8 (Location) now features an interactive \`flutter_map\` pin-drop interface
- Dragging the map pin triggers a reverse geocoding call that auto-fills address fields (country, city, area, zip, address line)
- Latitude and longitude stored precisely and editable via text fields for manual correction

#### Contact Step — Agent/Agency Selection
- Step 7 (Contact Info) allows host to assign listing contact to: their own profile, a specific agent (dropdown), a specific agency (dropdown), or no contact
- Private note field added for internal admin visibility only

### 🎨 Changed
- Onboarding screen text updated — titles, descriptions, and button labels now fully localized in both English and Urdu
- Property detail screen "Read More / Show Less" description toggle now uses custom implementation (removed \`readmore\` package dependency)
- Country picker in profile/forms replaced with a custom bottom-sheet implementation (removed \`country_picker\` package)

### 🐛 Fixed
- Fixed "Add Property" wizard tabs not showing ✓ completion indicators correctly
- Fixed amenities grid not persisting selection when navigating between wizard tabs
- Fixed \`DioException\` not caught gracefully in \`AddPropertyFormThreeNetwork\` — now shows user-friendly error snackbar
- Fixed Step 9 GDPR checkbox state not resetting between wizard sessions

### 🔧 Technical
- Removed \`readmore\` package — replaced with custom \`ExpandableText\` widget
- Removed \`country_picker\` package — replaced with custom \`CountryPickerSheet\` widget
- Improved \`AddPropertyProvider\` to track per-tab completion state using a \`Map<int, bool>\`

---

## [1.1.0] - 2026-01-22

### ✨ Added

#### Authentication System — Full Implementation
- Email/password registration with full form validation (name, email, 6-char minimum password, T&C checkbox)
- Email/password sign-in with JWT token receipt and secure storage
- **Google Sign-In** via \`google_sign_in\` + Firebase Authentication
  - Detects if email is already linked to a password account and shows a redirect dialog
- **Forgot Password** flow — email entry triggers backend reset link via WordPress
- **New Password** screen for completing the reset flow
- Persistent login via \`LocalStorageProvider\` reading \`auth_token\` and \`token_valid\` from \`flutter_secure_storage\` on launch

#### Security — JWT Secure Storage
- JWT tokens stored exclusively in \`flutter_secure_storage\` (Android Keystore / iOS Keychain)
- Token attached as \`Authorization: Bearer\` header on all authenticated Dio requests via interceptor
- \`token_valid\` flag set/cleared on login/logout to control app launch routing

#### Favorites Feature
- Authenticated users can save/unsave properties via bookmark icon on cards and detail screen
- \`FavouritePropertyProvider\` manages full favorites state
- Favorites tab in bottom navigation displays all saved properties with empty-state handling
- Guest users see a sign-in prompt instead of their favorites list

#### Reviews & Ratings
- Property detail screen displays all reviews with reviewer avatar, star rating, and written content
- **Write a Review** screen with: star rating selector (1–5, with labels), review title, review body
- All fields validated before submission
- Reviews posted to backend via reviews API endpoint
- Guest users prompted to sign in before reviewing

### 🎨 Changed
- Bottom navigation bar rebuilt as a fully custom widget — removed \`salomon_bottom_bar\` dependency
- Home screen tabs (**All**, **House**, **Apartment**) now independently paginate and load data
- Shimmer loading skeletons applied consistently across all list views

### 🐛 Fixed
- Fixed \`No ScaffoldMessenger found\` error in Providers — resolved by providing global \`scaffoldMessengerKey\` to \`MaterialApp\`
- Fixed token not cleared on account deletion — logout flow now wipes all secure storage keys
- Fixed Google Sign-In failing silently on emulators with no Google account

### 🔧 Technical
- \`DioClient\` singleton configured with 30-second connect/receive timeouts
- Debug-mode \`LogInterceptor\` attached to Dio conditionally via \`kDebugMode\`
- All providers registered via \`MultiProvider\` in \`main.dart\`

---

## [1.0.0] - 2026-01-15

### 🎉 Initial Release

#### Core Features
- **Property Browsing**: Home screen with All / House / Apartment tabs, featured properties carousel
- **Property Detail Screen**: Image slider, stats (beds/baths/area/garage), expandable description, amenities grid, floor plans accordion, location map, agent contact card, reviews section
- **Advanced Search & Filtering**: Filter by transaction type, property type, location, price range, area, bedrooms, bathrooms, and keyword
- **Add Property Wizard**: Full 9-step property submission flow with draft saving, edit, and delete
- **User Authentication**: Email/password and Google Sign-In with persistent JWT sessions
- **Favorites**: Save and view saved properties
- **Reviews & Ratings**: Read and submit star-rated property reviews
- **Maps**: \`flutter_map\` + OpenStreetMap integration — no API key required
- **User Profile**: View/edit profile, change password, delete account, language and dark mode settings
- **Property Inquiry**: Email inquiry form and phone call action from property detail screen
- **Multi-Language**: Full English and Urdu localization (470+ string keys)
- **Dark Mode**: Complete dual Material 3 theme system (light + dark)

#### Technology Stack
- **Flutter** (Dart) — Cross-platform mobile framework
- **Provider** — State management
- **Dio 5.7.0** — HTTP client with JWT interceptor
- **firebase_auth** + **google_sign_in** — Authentication
- **flutter_secure_storage** — Encrypted token storage
- **flutter_map** + OpenStreetMap — Mapping (zero API key)
- **cached_network_image** — Efficient image caching
- **Google Fonts** (Inter, Montserrat) — Typography
- **flutter_localizations** + ARB — i18n

#### Platforms
- **Android**: API 23 (Android 6.0) and higher
- **iOS**: iOS 12.0 and higher

#### Backend
- **WordPress** + **Houzez Theme**
- **JWT Authentication for WP REST API** plugin
- Communication via RESTful API over HTTPS

---

## Version History Summary

| Version | Release Date | Key Highlights |
|---------|-------------|----------------|
| 1.4.0   | 2026-02-21  | Documentation suite, security hardening, search isolation, carousel fix |
| 1.3.0   | 2026-02-10  | Property stats, quick listing, mortgage calculator, package removals |
| 1.2.0   | 2026-01-31  | Floor plans, sub listings, location picker + reverse geocoding, contact step |
| 1.1.0   | 2026-01-22  | Full auth system, secure storage, favorites, reviews, custom bottom nav |
| 1.0.0   | 2026-01-15  | Initial release — core property browsing, search, wizard, maps, i18n, dark mode |

---

## Upgrade Guide

### From 1.3.x to 1.4.0

#### No Breaking Changes
All changes are backward compatible with the existing backend and API contract.

#### Recommended Steps
1. Pull the latest source code
2. Run \`flutter pub get\`
3. Run \`flutter gen-l10n\` to refresh localization files
4. Move any Facebook credentials out of \`strings.xml\` into \`android/local.properties\`
5. Verify \`local.properties\` and \`key.properties\` are listed in your \`.gitignore\`
6. Rebuild the release APK/AAB: \`flutter build appbundle --release\`

### From 1.2.x to 1.3.0

#### No Breaking Changes

#### Recommended Steps
1. Register \`QuickListingProvider\` in \`main.dart\` MultiProvider list
2. Run \`flutter pub get\` (some packages removed — run \`flutter clean\` first if build errors occur)
3. Test the Quick Listing flow end-to-end on a device

### From 1.0.x to 1.1.0

#### Breaking Changes
- \`salomon_bottom_bar\` package removed — if you had customized it, migrate to the new custom bottom nav widget

#### Required Steps
1. Run \`flutter clean && flutter pub get\`
2. Provide \`scaffoldMessengerKey\` to \`MaterialApp\` if not already present
3. Test Google Sign-In on a physical device (not emulator)

---

## Known Issues

### Version 1.4.0
- **Language change** requires an app restart to fully apply to all screens (hot reload is sufficient during development)
- **Emulator GPS**: Distance calculation on emulators requires a simulated location to be set manually in device settings

### Planned Fixes (v1.5.0)
- Instant language switching without restart
- Smoother dark↔light mode transition animation

---

## Coming Soon

### Version 1.5.0 (Planned)
- Push notification support via Firebase Cloud Messaging (FCM)
- Image caching size limit and automatic cache eviction
- Instant language switching without app restart
- Property share via native share sheet
- Accessibility improvements (screen reader labels on all interactive elements)

### Version 1.6.0 (Planned)
- Agent and agency browsing screens
- Advanced property analytics for hosts (view counts, inquiry counts per listing)
- Biometric authentication (Face ID / Fingerprint) for app unlock
- Offline-mode for previously viewed property details

---

## Support

For questions about a specific version or update:

📧 **Email**: support@webpenter.com
🔖 **Purchase Code**: Required for all support requests
📚 **Documentation**: See the full documentation portal included with your purchase

---

## License

All versions are subject to the ThemeForest license terms applicable at time of purchase.

- **Regular License**: Single project use
- **Extended License**: SaaS / subscription product use

See \`LICENSE.txt\` for full terms.

  `
};

export default changelog;
