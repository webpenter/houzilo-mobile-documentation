import { SnippetCollection } from './types';

/**
 * Build and deployment command snippets
 */
export const buildSnippets: SnippetCollection = {
  easLogin: {
    language: 'bash',
    code: `# Login to Expo account
eas login`,
    description: 'Authenticate with Expo EAS'
  },

  easBuildAndroid: {
    language: 'bash',
    code: `# Build Android App Bundle (AAB) for production
eas build --platform android --profile production`,
    description: 'Build Android production release'
  },

  easBuildIOS: {
    language: 'bash',
    code: `# Build iOS App (IPA) for production
eas build --platform ios --profile production`,
    description: 'Build iOS production release'
  },

  easBuildPreview: {
    language: 'bash',
    code: `# Build preview/development version
eas build --platform android --profile preview`,
    description: 'Build development/preview version'
  },

  easBuildBoth: {
    language: 'bash',
    code: `# Build both platforms
eas build --platform all --profile production`,
    description: 'Build for both iOS and Android'
  },

  easBuildList: {
    language: 'bash',
    code: `# List all builds
eas build:list

# List platform-specific builds
eas build:list --platform android
eas build:list --platform ios`,
    description: 'View build history'
  },

  easSubmitAndroid: {
    language: 'bash',
    code: `# Submit to Google Play Store
eas submit --platform android --latest`,
    description: 'Submit Android app to Play Store'
  },

  easSubmitIOS: {
    language: 'bash',
    code: `# Submit to Apple App Store
eas submit --platform ios --latest`,
    description: 'Submit iOS app to App Store'
  },

  easCredentials: {
    language: 'bash',
    code: `# Manage Android credentials
eas credentials -p android

# Manage iOS credentials
eas credentials -p ios`,
    description: 'View and manage signing credentials'
  },

  clearBuildCache: {
    language: 'bash',
    code: `# Clear build cache and rebuild
eas build --platform android --profile production --clear-cache`,
    description: 'Clear EAS build cache'
  }
};

export default buildSnippets;
