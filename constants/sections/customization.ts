import { Palette } from 'lucide-react';
import { DocSection } from '../../types';

export const customization: DocSection = {
  title: "Customization",
  icon: Palette,
  tags: ["theme", "branding", "styling"],
  content: `
# Customization Guide

A practical reference for customizing the Houzilo app's appearance, behavior, navigation, and content. All sections reference the actual files in the codebase.

> **Note:** Payment Gateway and Push Notifications customization sections have been omitted as these features are not implemented in the current version.

## Table of Contents
- [Theme Customization](#theme-customization)
- [Branding](#branding)
- [UI Components](#ui-components)
- [Language & Localization](#language--localization)
- [Navigation](#navigation)
- [Styling Guide](#styling-guide)
- [Best Practices](#best-practices)

---

## Theme Customization

**File:** \`lib/utils/app_theme.dart\`

The app uses **Material 3** with fully defined Light and Dark themes via \`AppTheme.lightTheme\` and \`AppTheme.darkTheme\`.

### Changing the Primary Color
Update \`AppColors.primary\` in \`lib/utils/app_colors.dart\`:
\`\`\`dart
static const Color primary = Color(0xFF54C4D9); // ← Replace hex value
\`\`\`
This automatically propagates across all themed widgets (buttons, app bar, inputs, bottom nav).

### Switching Dark / Light Theme
Controlled at runtime in \`main.dart\` via \`ThemeProvider\`:
\`\`\`dart
theme: AppTheme.lightTheme,
darkTheme: AppTheme.darkTheme,
themeMode: themeProvider.themeMode,  // system / light / dark
\`\`\`
Users can toggle it via **Profile → Dark Mode** switch.

### Customizing App Bar
\`\`\`dart
appBarTheme: AppBarTheme(
  backgroundColor: AppColors.primary,  // ← Change background
  centerTitle: true,                   // ← Toggle title centering
  elevation: 0,
  titleTextStyle: GoogleFonts.inter(
    fontSize: 20,
    fontWeight: FontWeight.bold,
  ),
),
\`\`\`

### Customizing Cards
\`\`\`dart
cardTheme: CardTheme(
  color: AppColors.white,
  elevation: 1,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(12), // ← Adjust corner radius
  ),
),
\`\`\`

### Customizing Input Fields
\`\`\`dart
inputDecorationTheme: InputDecorationTheme(
  filled: true,
  fillColor: AppColors.gray50,
  focusedBorder: OutlineInputBorder(
    borderSide: BorderSide(color: AppColors.primary, width: 2), // ← Focus color
    borderRadius: BorderRadius.circular(8),
  ),
),
\`\`\`

### Dark Theme Surface Colors
\`\`\`dart
const darkBackground = Color(0xFF0F172A); // ← Page background
const darkSurface    = Color(0xFF1E293B); // ← Cards / App Bar
const darkSurfaceElevated = Color(0xFF334155); // ← Borders / chips
\`\`\`

---

## Branding

### App Logo & Splash Screen
**File:** \`lib/utils/image_path.dart\`

| Asset Constant | File Path | Where Used |
|---|---|---|
| \`houziloLogo2\` | \`assets/png/houzilo-logo2.png\` | App bar logo |
| \`houziloSplashLight\` | \`assets/png/splash-light.png\` | Splash (light mode) |
| \`houziloSplashDark\` | \`assets/png/splash-dark.png\` | Splash (dark mode) |
| \`logo4\` | \`assets/png/logo4.png\` | Profile avatar fallback |

**To change the app logo:**
1. Replace the PNG file in \`assets/png/\`.
2. Keep the same filename **or** update the constant in \`image_path.dart\`.
3. Declare the asset path in \`pubspec.yaml\` if it's a new file.

### App Name
*   **Android:** \`android/app/src/main/AndroidManifest.xml\`
    \`\`\`xml
    android:label="Houzilo"
    \`\`\`
*   **iOS:** \`ios/Runner/Info.plist\`
    \`\`\`xml
    <key>CFBundleDisplayName</key>
    <string>Houzilo</string>
    \`\`\`

### Onboarding Screens
Text on the 3 onboarding slides is fully localized via \`app_en.arb\`:
\`\`\`json
"onboardingTitle1": "Find Your Dream Home",
"onboardingDescription1": "Discover a wide range of properties...",
"onboardingButtonText1": "Explore"
\`\`\`
Edit the \`.arb\` file to update the text without changing any Dart code.

---

## UI Components

The app uses centralized, reusable components. Avoid building one-off widgets; always use or extend these.

### \`PrimaryButton\` (\`lib/utils/button.dart\`)
The standard call-to-action button used throughout the app.
\`\`\`dart
PrimaryButton(
  text: 'Submit Inquiry',
  onPressed: () {},
  loading: false,          // Shows loading spinner
  buttonColor: AppColors.primary,
  textColor: AppColors.white,
)
\`\`\`

### \`TextfieldCustom\` (\`lib/utils/\`)
The standard text input field with consistent styling.
\`\`\`dart
TextfieldCustom(
  controller: myController,
  hintText: 'Enter your name',
  inputType: TextInputType.text,
  readOnly: false,
)
\`\`\`

### \`Shimmer\` Loading Placeholders
Uses the \`shimmer\` package for loading skeletons on property cards and lists.

### \`CachedNetworkImage\`
All network images use \`cached_network_image\` for performance:
\`\`\`dart
CachedNetworkImage(
  imageUrl: imageUrl,
  fit: BoxFit.cover,
  placeholder: (context, url) => Image.asset(PathToImage.logo4),
  errorWidget: (context, url, error) => Image.asset(PathToImage.logo4),
)
\`\`\`

### Bottom Navigation Bar
Custom-built bottom tab bar (replacing \`salomon_bottom_bar\`):
**File:** \`lib/view/home_screen/common/bottom_tab_bar.dart\`

Tabs available: **Home**, **Search**, **Favorites**, **Profile**.

---

## Language & Localization

**Files:**
*   \`lib/l10n/app_en.arb\` — English strings (default)
*   \`lib/l10n/app_ur.arb\` — Urdu strings

**Total Keys:** ~470+ localized strings covering every screen.

### Adding a New String
1.  Add the key to **both** \`app_en.arb\` and \`app_ur.arb\`:
\`\`\`json
// app_en.arb
"myNewString": "Hello World",

// app_ur.arb
"myNewString": "ہیلو ورلڈ",
\`\`\`
2.  Regenerate localization:
\`\`\`bash
flutter gen-l10n
\`\`\`
3.  Use in Dart code:
\`\`\`dart
Text(AppLocalizations.of(context)!.myNewString)
\`\`\`

### Adding a New Language
1.  Create \`lib/l10n/app_XX.arb\` (e.g., \`app_fr.arb\` for French).
2.  Add all keys with translations.
3.  Register the locale in \`main.dart\`:
\`\`\`dart
supportedLocales: const [
  Locale('en'),
  Locale('ur'),
  Locale('fr'), // ← Add here
],
\`\`\`

### Changing the Default Language
\`\`\`dart
// main.dart — reads from SharedPreferences on launch
String? langCode = sp.getString('langCode') ?? 'en'; // ← Change 'en' to 'ur'
\`\`\`

---

## Navigation

**Files:**
*   \`lib/routes/route_names.dart\` — All route name constants
*   \`lib/routes/routes.dart\` — Route builder logic

### Navigating to a Screen
\`\`\`dart
// Simple navigation
Navigator.pushNamed(context, RouteName.signInView);

// Navigation with arguments
Navigator.pushNamed(context, RouteName.detailsView, arguments: {
  'id': propertyId,
});

// Navigation with result (pop back)
Navigator.pop(context);
\`\`\`

### Available Named Routes

| Route Constant | Screen | Arguments |
|---|---|---|
| \`RouteName.startupScreen\` | Startup / Splash | None |
| \`RouteName.onBoardSlider\` | Onboarding | None |
| \`RouteName.signInView\` | Sign In | None |
| \`RouteName.signUpView\` | Sign Up | \`fromPopUp: bool\` |
| \`RouteName.bottomTabBar\` | Main Tab Layout | None |
| \`RouteName.detailsView\` | Property Details | \`id: String\` |
| \`RouteName.filterView\` | Search Filters | \`loc: String?\` |
| \`RouteName.inquiryFormView\` | Inquiry Form | \`propertyId, agencyId, isAgent, link\` |
| \`RouteName.formOneView\` | Add Property Wizard | \`id: String?\` (for edit) |
| \`RouteName.agentProfile\` | Agent Profile | \`tag, img, name, email, id, reviews, ratings\` |
| \`RouteName.agenciesList\` | Agencies List | None |
| \`RouteName.profileUpdate\` | Edit Profile | None |
| \`RouteName.changePassword\` | Change Password | None |
| \`RouteName.languageSelectionScreen\` | Language Picker | None |
| \`RouteName.allReviews\` | All Reviews | \`propertyId: String\` |
| \`RouteName.userListingsScreen\` | My Listings | None |

### Adding a New Screen
1. Create your widget in \`lib/view/\`.
2. Add the route constant to \`route_names.dart\`:
\`\`\`dart
static const String myNewScreen = '/my-new-screen';
\`\`\`
3. Register it in \`routes.dart\` inside the \`switch\` block:
\`\`\`dart
case RouteName.myNewScreen:
  return MaterialPageRoute(builder: (context) => const MyNewScreen());
\`\`\`

---

## Styling Guide

### Typography System (\`lib/utils/app_text_styles.dart\`)
All text must use \`AppTextStyles\` — never use raw \`TextStyle\` directly in views.

| Style Method | Font Size | Weight | Use Case |
|---|---|---|---|
| \`titleLarge()\` | 24 | Bold | Screen titles |
| \`titleMedium()\` | 20 | SemiBold | Section headings |
| \`titleSmall()\` | 18 | Medium | Card titles |
| \`subtitleLarge()\` | 16 | Medium | Subtitles |
| \`bodyLarge()\` | 16 | Normal | Body copy |
| \`bodyMedium()\` | 14 | Normal | Secondary text |
| \`bodySmall()\` | 12 | Normal | Captions, hints |
| \`labelLarge()\` | 14 | SemiBold | Form labels |
| \`numberFont()\` | 12 | SemiBold | Prices (Montserrat) |

**Usage:**
\`\`\`dart
Text('Property Title', style: AppTextStyles.titleMedium(color: AppColors.primary))
Text('\$1,200/mo', style: AppTextStyles.numberFont())  // Uses Montserrat font
\`\`\`

### Fonts
*   **Primary Font:** \`Inter\` (via Google Fonts) — all UI text
*   **Number Font:** \`Montserrat\` (via Google Fonts) — prices and numeric displays

### Spacing & Padding Convention
*   Horizontal screen padding: \`16px\`
*   Card internal padding: \`12px\`
*   Section gaps: \`20–30px\`
*   Between elements: \`8–12px\`

### Border Radius Convention
| Element | Radius |
|---|---|
| Cards | \`12px\` |
| Buttons | \`8px\` |
| Text Fields | \`8px\` |
| Dialogs | \`16px\` |
| Chip/Tags | \`8px\` |

---

## Best Practices

### ✅ State Management
*   Use **Provider** for all shared state — never lift state manually through widget trees.
*   UI-only state (e.g., password visibility, expansion) can use \`setState\` locally.
*   Providers are registered globally in \`main.dart\` via \`MultiProvider\`.

### ✅ Colors
*   Always use \`AppColors.*\` constants — never hardcode hex or \`Colors.*\` values.
*   Use semantic tokens (\`AppColors.error\`, \`AppColors.success\`) not visual ones (\`AppColors.red\`).

### ✅ Text Styles
*   Always use \`AppTextStyles.*\` methods — never define inline \`TextStyle\`.
*   Pass \`color\` via the optional parameter to keep the method semantic.

### ✅ Navigation
*   Always use **named routes** via \`RouteName.*\` constants.
*   Never navigate using \`MaterialPageRoute\` directly inside view files.
*   Pass data via \`settings.arguments\` as typed \`Map<String, dynamic>\`.

### ✅ Images
*   Use \`CachedNetworkImage\` for all API-sourced images.
*   Use \`Image.asset()\` with \`PathToImage.*\` constants for local assets.
*   Always define a \`placeholder\` and \`errorWidget\`.

### ✅ Localization
*   Every user-visible string must be in \`app_en.arb\` and \`app_ur.arb\`.
*   Never hardcode strings directly in widget code.
*   Access via \`AppLocalizations.of(context)!.yourKey\`.

### ✅ API Calls
*   All network code lives in \`lib/core/network/\`.
*   All state updates from network calls go through \`lib/core/view_model/\` Providers.
*   Always handle \`ApiException\` and generic \`catch (e)\` in every network method.
  `
};

export default customization;
