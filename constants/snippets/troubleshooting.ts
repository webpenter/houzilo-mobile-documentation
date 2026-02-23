import { SnippetCollection } from './types';

/**
 * Troubleshooting and debugging snippets
 */
export const troubleshootingSnippets: SnippetCollection = {
  clearAllCaches: {
    language: 'bash',
    code: `# Clear all caches and start fresh
rm -rf node_modules
rm -rf .expo
npm cache clean --force
npm install
npx expo start --clear`,
    description: 'Nuclear option - clear everything and start fresh'
  },

  fixMetroCache: {
    language: 'bash',
    code: `# Clear Metro bundler cache
npx expo start --clear
# or
npx react-native start --reset-cache`,
    description: 'Fix Metro bundler cache issues'
  },

  fixAndroidGradle: {
    language: 'bash',
    code: `# Clean Android build
cd android
./gradlew clean
cd ..

# Or completely remove and rebuild
rm -rf android/build
rm -rf android/app/build
npx expo prebuild --platform android`,
    description: 'Fix Android build issues'
  },

  fixIOSPods: {
    language: 'bash',
    code: `# Clean iOS pods
cd ios
rm -rf Pods
rm Podfile.lock
pod install --repo-update
cd ..`,
    description: 'Fix iOS CocoaPods issues'
  },

  viewLogs: {
    language: 'bash',
    code: `# View Android logs
adb logcat

# View iOS logs (using Xcode)
# Devices and Simulators → Select device → Console

# View Expo logs
npx expo start
# Then press 'j' to open debugger`,
    description: 'View application logs for debugging'
  },

  checkGoogleServices: {
    language: 'bash',
    code: `# Check if google-services.json exists (Android)
ls -la google-services.json

# Check if GoogleService-Info.plist exists (iOS)
ls -la GoogleService-Info.plist

# Verify they're not in .gitignore
cat .gitignore | grep google-services`,
    description: 'Verify Google service configuration files'
  },

  testEnvVariables: {
    language: 'bash',
    code: `# Test if environment variables are loaded
npx expo start
# In the app, console.log:
console.log('Maps Key:', process.env.GOOGLE_MAPS_API_KEY);
console.log('iOS Client:', process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID);`,
    description: 'Debug environment variable loading'
  }
};

export default troubleshootingSnippets;
