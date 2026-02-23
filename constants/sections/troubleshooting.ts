import { Wrench } from 'lucide-react';
import { DocSection } from '../../types';
import { snippet } from '../snippets';

export const troubleshooting: DocSection = {
  title: "Troubleshooting",
  icon: Wrench,
  tags: ["errors", "debug", "fixes"],
  content: `
# Troubleshooting Guide - BookHere Mobile App

Common issues and solutions for the BookHere mobile application.

---

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Build & Compilation Issues](#build--compilation-issues)
3. [Runtime Errors](#runtime-errors)
4. [Backend & API Issues](#backend--api-issues)
5. [Authentication Problems](#authentication-problems)
6. [Payment Issues](#payment-issues)
7. [Maps & Location Issues](#maps--location-issues)
8. [Push Notification Issues](#push-notification-issues)
9. [UI & Display Issues](#ui--display-issues)
10. [Performance Issues](#performance-issues)

---

## Installation Issues

### Cannot find module errors

**Problem:** After running \`npm install\`, getting "Cannot find module" errors

**Solution:**
${snippet('clearAllCaches', true)}

---

### npm install fails with EACCES permission denied

**Problem:** Permission errors during \`npm install\`

**Solution:**
\`\`\`bash
# Option 1: Use sudo(not recommended)
sudo npm install

# Option 2: Fix npm permissions(recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile

# Then reinstall
npm install
  \`\`\`

---

### gyp ERR! or node-gyp errors

**Problem:** Native module compilation fails

**Solution:**
\`\`\`bash
# On macOS
xcode-select --install

# On Linux
sudo apt-get install build-essential

# On Windows
npm install --global windows-build-tools

# Then reinstall
npm install
  \`\`\`

---

### Expo CLI not found

**Problem:** \`expo: command not found\`

**Solution:**
\`\`\`bash
# Install Expo CLI globally
npm install -g expo-cli

# Verify installation
expo --version
  \`\`\`

---

## Build & Compilation Issues

### Metro bundler fails to start

**Problem:** Metro bundler crashes or shows errors

**Solution:**
${snippet('fixMetroCache', true)}

---

### iOS build fails with CocoaPods error

**Problem:** Pod install fails or iOS build errors

**Solution:**
${snippet('fixIOSPods', true)}

---

### Android build fails with Gradle error

**Problem:** Android build fails during Gradle compilation

**Solution:**
${snippet('fixAndroidGradle', true)}

---

### Build fails with "ANDROID_HOME not set"

**Problem:** Android SDK path not configured

**Solution:**

**On macOS/Linux:**
\`\`\`bash
# Add to ~/.zshrc or ~/.bash_profile
export ANDROID_HOME = $HOME/Library/Android/sdk
export PATH = $PATH: $ANDROID_HOME/emulator
export PATH = $PATH: $ANDROID_HOME/platform-tools

# Reload
source ~/.zshrc
  \`\`\`

**On Windows:**
\`\`\`
# Add to Environment Variables
ANDROID_HOME = C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk

# Add to Path
% ANDROID_HOME %\\platform-tools
% ANDROID_HOME %\\emulator
      \`\`\`

---

### EAS build fails

**Problem:** EAS Build cloud build fails

**Solution:**
\`\`\`bash
# 1. Check build logs
eas build: list

# 2. View specific build logs
eas build: view[BUILD_ID]

# 3. Common fixes:
# - Ensure eas.json is configured correctly
# - Check app.json for errors
# - Verify bundle identifier / package name
# - Clear EAS cache
eas build --clear -cache

# 4. Rebuild
eas build --platform ios --profile production
  \`\`\`

---

## Runtime Errors

### App shows blank white screen

**Problem:** App loads but shows blank screen

**Solution:**
\`\`\`bash
# 1. Check console for errors
# Look for JavaScript errors in terminal

# 2. Clear Metro cache
npm start --clear

# 3. Check App.tsx for syntax errors
# Ensure all imports are correct

# 4. Verify navigation setup
# Check if navigation is properly configured

# 5. Test with simplified App.tsx
# Temporarily simplify to isolate issue
  \`\`\`

---

### App crashes on startup

**Problem:** App crashes immediately when opening

**Solution:**
\`\`\`bash
# 1. Check device logs
# iOS: Xcode → Window → Devices and Simulators → View Device Logs
# Android: adb logcat

# 2. Common causes:
# - Missing native dependencies
# - Incorrect configuration
# - JavaScript errors

# 3. Rebuild with clean slate
rm -rf node_modules ios/build android/build
npm install
npx expo prebuild --clean

# 4. Rebuild app
npx expo run:ios  # or run: android
  \`\`\`

---

### "Network request failed" errors

**Problem:** All API calls failing with network errors

**Solution:**
1. **Check API URL**
   \`\`\`javascript
// src/ApiUrl.js
// Ensure URL is correct and ends with /
api_url: "https://yourdomain.com/"
  \`\`\`

2. **Verify backend is accessible**
   \`\`\`bash
   # Test in browser
   curl https://yourdomain.com/wp-json/
\`\`\`

3. **Check CORS configuration**
   - Backend must allow cross-origin requests
   - Add CORS headers in WordPress

4. **Test on physical device**
   - Simulators may have network restrictions
   - Use same WiFi network

5. **Check firewall/security settings**
   - Disable VPN temporarily
   - Check corporate firewall

---

### Undefined is not an object error

**Problem:** Errors like "undefined is not an object (evaluating 'x.y')"

**Solution:**
1. **Check the error stack trace**
   - Identify the file and line number
   - Look for the specific property access

2. **Add null checks**
   \`\`\`javascript
// Before
const value = data.property.subProperty;

// After
const value = data?.property?.subProperty;
\`\`\`

3. **Verify API responses**
   - Check if backend is returning expected data
   - Add console.log to inspect data

4. **Check AsyncStorage**
   - May be trying to access non-existent stored data
   - Add default values

---

### Cannot read property of undefined

**Problem:** Similar to above, accessing properties on undefined

**Solution:**
\`\`\`javascript
// Use optional chaining and nullish coalescing
const name = user?.profile?.name ?? 'Guest';

// Or check before accessing
if (user && user.profile) {
  const name = user.profile.name;
}

// For arrays
const firstItem = items?.[0] ?? null;
\`\`\`

---

## Backend & API Issues

### 401 Unauthorized errors

**Problem:** API returns 401 errors

**Solution:**
1. **Check authentication token**
   \`\`\`javascript
  // Verify token is being sent in headers
  // Check token expiration
  \`\`\`

2. **Re-login**
   - Token may have expired
   - Clear storage and login again

3. **Verify backend JWT configuration**
   \`\`\`php
// wp-config.php
define('JWT_AUTH_SECRET_KEY', 'your-secret-key');
\`\`\`

4. **Check token format**
   - Should be Bearer token
   - Format: \`Bearer eyJ0eXAiOiJKV1QiLCJhbGc...\`

---

### 404 Not Found on API calls

**Problem:** Backend endpoints return 404

**Solution:**
1. **Verify API URL**
   - Check \`src/ApiUrl.js\`
   - Ensure trailing slash: \`https://domain.com/\`

2. ** Check permalinks **
  - WordPress Settings → Permalinks
    - Should be "Post name" structure

3. ** Verify.htaccess **
  - Ensure mod_rewrite is enabled
    - Check.htaccess file exists

4. ** Test endpoint directly **
  \`\`\`bash
   curl https://yourdomain.com/wp-json/jwt-auth/v1/token
   \`\`\`

---

### CORS errors

  ** Problem:** "Access-Control-Allow-Origin" errors

    ** Solution:**

** Option 1: Add to wp - config.php **
  \`\`\`php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
\`\`\`

  ** Option 2: Use WordPress plugin **
    - Install "WP CORS" plugin
      - Configure allowed origins

        ** Option 3: Server configuration **
          \`\`\`apache
# .htaccess
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>
\`\`\`

---

### Slow API responses

  ** Problem:** API calls taking too long

    ** Solution:**
      1. ** Optimize backend **
        - Add caching plugin(WP Super Cache)
          - Optimize database
            - Use CDN for images

2. ** Reduce payload size **
    - Limit returned fields
      - Add pagination
        - Compress responses

3. ** Add timeout handling **
  \`\`\`javascript
   axios.defaults.timeout = 10000; // 10 seconds
   \`\`\`

---

## Authentication Problems

### Google Sign - In not working

  ** Problem:** Google Sign - In fails or shows errors

    ** Solution:**
      1. ** Verify Client IDs **
        \`\`\`env
   # .env
   EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=correct_client_id
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=correct_web_client_id
   \`\`\`

2. ** Check bundle ID matches **
  - Google Cloud Console bundle ID
    - app.json bundle identifier
      - Must match exactly

3. ** Rebuild app after.env changes **
  \`\`\`bash
   npm start --clear
   eas build --platform all
   \`\`\`

4. ** Verify OAuth consent screen **
  - Check it's published (not in testing)
    - Add test users if in testing mode

5. ** Check Google Services files **
  - iOS: GoogleService-Info.plist in root
    - Android: google-services.json in root

---

### Biometric authentication fails

  ** Problem:** Face ID / Fingerprint not working

    ** Solution:**
      1. ** Check device support **
        \`\`\`javascript
   import * as LocalAuthentication from 'expo-local-authentication';

   const compatible = await LocalAuthentication.hasHardwareAsync();
   const enrolled = await LocalAuthentication.isEnrolledAsync();
   \`\`\`

2. ** Verify permissions **
  \`\`\`json
   // app.json
   "ios": {
     "infoPlist": {
       "NSFaceIDUsageDescription": "Allow app to use Face ID"
     }
   },
   "android": {
     "permissions": [
       "android.permission.USE_BIOMETRIC"
     ]
   }
   \`\`\`

3. ** Test on physical device **
  - Biometrics don't work in simulators
    - Must test on real device

---

### Login session expires quickly

  ** Problem:** Users logged out frequently

    ** Solution:**
      1. ** Extend token expiration **
        \`\`\`php
   // Backend wp-config.php
   define('JWT_AUTH_EXPIRE_TIME', 7 * DAY_IN_SECONDS);
   \`\`\`

2. ** Implement token refresh **
  - Add refresh token logic
    - Refresh before expiration

3. ** Check secure storage **
  - Verify tokens are stored securely
    - Check if tokens are being cleared

---

## Payment Issues

### Stripe payments failing

  ** Problem:** Payment processing fails with Stripe

  ** Solution:**
    1. ** Verify publishable key **
      \`\`\`typescript
   // Check helpers.ts
   const publishableKey = "pk_test_..." // Correct key
   \`\`\`

2. ** Use test cards **
  \`\`\`
   Success: 4242 4242 4242 4242
   Decline: 4000 0000 0000 0002
   3D Secure: 4000 0025 0000 3155
   \`\`\`

3. ** Check Stripe dashboard **
  - View error logs
    - Check webhook configuration
      - Verify API version

4. ** Test mode vs Live mode **
  - Ensure using correct keys
- Test mode for development
  - Live mode for production

5. ** Check error messages **
      \`\`\`javascript
   try {
     await stripe.createPaymentMethod(...);
   } catch (error) {
     console.log('Stripe error:', error.message);
   }
   \`\`\`

---

### Apple Pay not working(iOS)

  ** Problem:** Apple Pay option not showing or fails

    ** Solution:**
      1. ** Verify merchant ID **
        - Created in Apple Developer Console
          - Added to app.json entitlements
            - Configured in Stripe dashboard

2. ** Check device support **
  - Device must support Apple Pay
    - Card must be added to Wallet

3. ** Test on physical device **
  - Apple Pay doesn't work in simulator

4. ** Verify app.json configuration **
  \`\`\`json
   {
     "ios": {
       "entitlements": {
         "com.apple.developer.in-app-payments": [
           "merchant.com.yourcompany.yourapp"
         ]
       }
     }
   }
   \`\`\`

---

### Payment succeeds but booking not created

  ** Problem:** Payment processes but no reservation created

    ** Solution:**
      1. ** Check backend webhook **
        - Verify webhook URL is correct
          - Check webhook is receiving events
            - View webhook logs in Stripe

2. ** Verify payment metadata **
  \`\`\`javascript
   // Ensure booking info is sent
   metadata: {
     booking_id: bookingId,
     user_id: userId,
     property_id: propertyId
   }
   \`\`\`

3. ** Check backend processing **
  - View backend logs
    - Ensure booking creation logic works
      - Test webhook manually

---

## Maps & Location Issues

### Maps not showing

  ** Problem:** Google Maps component shows blank

    ** Solution:**
      1. ** Verify API key **
        \`\`\`json
   // app.json
   "ios": {
     "config": {
       "googleMapsApiKey": "AIza..."  // Correct key
     }
   }
   \`\`\`

2. ** Check APIs enabled **
  - Maps SDK for iOS
    - Maps SDK for Android
      - Places API(if using)

      3. ** Enable billing **
        - Google Cloud Console
          - Billing must be enabled
            - Free tier available

4. ** Check API restrictions **
  - Remove restrictions during testing
    - Add proper restrictions for production

5. ** Rebuild app **
  \`\`\`bash
   # Changes to app.json require rebuild
   eas build --platform all --profile development
   \`\`\`

---

### Location permissions denied

  ** Problem:** App can't access device location

    ** Solution:**
      1. ** Check permissions in app.json **
        \`\`\`json
   "ios": {
     "infoPlist": {
       "NSLocationWhenInUseUsageDescription": "We need location to show nearby properties"
     }
   }
   \`\`\`

2. ** Request permissions in code **
  \`\`\`javascript
   import * as Location from 'expo-location';

   const { status } = await Location.requestForegroundPermissionsAsync();
   if (status !== 'granted') {
     // Handle denial
   }
   \`\`\`

3. ** Check device settings **
  - iOS: Settings → App → Location
    - Android: Settings → Apps → App → Permissions

---

## Push Notification Issues

### Notifications not received

  ** Problem:** Push notifications don't appear

    ** Solution:**
      1. ** Verify permissions **
        \`\`\`javascript
   import * as Notifications from 'expo-notifications';

   const { status } = await Notifications.requestPermissionsAsync();
   \`\`\`

2. ** Check notification token **
  \`\`\`javascript
   const token = await Notifications.getExpoPushTokenAsync();
   console.log('Token:', token.data);
   \`\`\`

3. ** Test with Expo tool **
  \`\`\`bash
   expo push:send --to ExponentPushToken[xxx] --title "Test"
   \`\`\`

4. ** Verify backend sending **
  - Check backend notification sending logic
    - View Expo Push Notification logs

5. ** Test on physical device **
  - Notifications may not work on simulators
    - iOS simulator doesn't support push

6. ** Check notification settings **
  - Device notification settings
    - App - specific settings
      - Do Not Disturb mode

---

### APNs or FCM configuration errors

  ** Problem:** iOS(APNs) or Android(FCM) push not working

    ** Solution:**
      1. ** For iOS(APNs) **
        \`\`\`bash
   eas credentials
   # Select iOS → Push Notifications
   # Upload APNs key (.p8 file)
   \`\`\`

2. ** For Android(FCM) **
  \`\`\`bash
   eas credentials
   # Select Android → Push Notifications
   # Upload google-services.json
   \`\`\`

3. ** Verify credentials **
  - Check EAS credentials manager
    - Ensure correct team / account
      - Verify key IDs match

---

## UI & Display Issues

### Dark mode not working

  ** Problem:** App doesn't respect dark mode

    ** Solution:**
      1. ** Check device settings **
        - iOS: Settings → Display & Brightness → Dark
          - Android: Settings → Display → Dark theme

2. ** Verify useColorScheme **
  \`\`\`javascript
   import { useColorScheme } from 'react-native';

   const colorScheme = useColorScheme();
   const colors = Colors[colorScheme ?? 'light'];
   \`\`\`

3. ** Check Colors.ts **
  - Ensure dark colors are defined
    - Verify colors are used in components

---

### Images not loading

  ** Problem:** Images show broken or don't load

    ** Solution:**
      1. ** Check image URLs **
        - Verify URLs are correct and accessible
          - Test URLs in browser

2. ** Check network connection **
  - Ensure device has internet
    - Test API connectivity

3. ** Add error handling **
  \`\`\`javascript
   <Image
     source={{ uri: imageUrl }}
     onError={(error) => console.log('Image error:', error)}
     defaultSource={require('./assets/placeholder.png')}
   />
   \`\`\`

4. ** Check CORS for images **
  - Image server must allow CORS
    - Add appropriate headers

---

### Layout broken on different screen sizes

  ** Problem:** UI looks broken on some devices

    ** Solution:**
      1. ** Use responsive design **
        \`\`\`javascript
   import { Dimensions } from 'react-native';

   const { width, height } = Dimensions.get('window');

   // Use percentages or calculated values
   width: width * 0.9
   \`\`\`

2. ** Test on multiple devices **
  - Small phones(iPhone SE)
    - Large phones(iPhone Pro Max)
      - Tablets
      - Different aspect ratios

3. ** Use flexible layouts **
  \`\`\`javascript
   <View style={{ flex: 1 }}>
     <ScrollView>
       {/* Content */}
     </ScrollView>
   </View>
   \`\`\`

---

## Performance Issues

### App is slow or laggy

  ** Problem:** App performance is poor

    ** Solution:**
      1. ** Enable Hermes ** (if not enabled)
\`\`\`json
   // app.json
   "jsEngine": "hermes"
   \`\`\`

2. ** Optimize images **
  - Compress images
    - Use appropriate sizes
      - Consider WebP format

3. ** Use React.memo **
  \`\`\`javascript
   export const MyComponent = React.memo(({ prop }) => {
     return <View>{/* content */}</View>;
   });
   \`\`\`

4. ** Optimize re - renders **
  \`\`\`javascript
   // Use useCallback
   const handlePress = useCallback(() => {
     // logic
   }, [dependencies]);

   // Use useMemo
   const value = useMemo(() => {
     return expensiveCalculation();
   }, [dependencies]);
   \`\`\`

5. ** Profile with Flipper **
- Install Flipper
  - Use React DevTools
    - Profile performance

---

### App crashes with out of memory

  ** Problem:** App crashes due to memory issues

    ** Solution:**
      1. ** Optimize images **
        - Reduce image sizes
          - Use thumbnails for lists
            - Load full size on demand

2. ** Fix memory leaks **
  - Cleanup listeners in useEffect
    - Cancel timers and intervals
      - Clear intervals on unmount

3. ** Use FlatList for long lists **
  \`\`\`javascript
   <FlatList
     data={items}
     renderItem={renderItem}
     keyExtractor={item => item.id}
     maxToRenderPerBatch={10}
     windowSize={10}
   />
   \`\`\`

---

## Getting Further Help

If issues persist after trying these solutions:

1. ** Check Error Logs **
  - iOS: Xcode Console
    - Android: \`adb logcat\`

2. ** Search Documentation **
  - React Native: https://reactnative.dev
  - Expo: https://docs.expo.dev

3. ** Community Resources **
  - Stack Overflow
    - React Native GitHub Issues
      - Expo Forums

4. ** Contact Support **
   📧 Email: support @webpenter.com

Include:
- Your purchase code
  - Detailed error description
    - Error messages / screenshots
      - Steps to reproduce
        - Device / platform info

---

** Still stuck ?** Don't hesitate to reach out to our support team!


  `
};

export default troubleshooting;
