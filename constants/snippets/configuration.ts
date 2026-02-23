import { SnippetCollection } from './types';

/**
 * Configuration file snippets
 */
export const configurationSnippets: SnippetCollection = {
  appConfigBasic: {
    language: 'javascript',
    code: `export default {
  name: "BookHere",
  slug: "bookhere-mobile",
  version: "3.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  // ... more configuration
}`,
    description: 'Basic app.config.js structure',
    filename: 'app.config.js'
  },

  appConfigAndroid: {
    language: 'javascript',
    code: `android: {
  package: "com.webpenter.googlesignin",
  versionCode: 10,
  adaptiveIcon: {
    foregroundImage: "./src/assets/images/adaptive-icon.png",
    backgroundColor: "#ffffff"
  },
  permissions: [
    "android.permission.RECORD_AUDIO",
    "android.permission.USE_BIOMETRIC",
    "android.permission.USE_FINGERPRINT"
  ],
  config: {
    googleMaps: {
      apiKey: process.env.GOOGLE_MAPS_API_KEY
    }
  }
}`,
    description: 'Android configuration in app.config.js',
    filename: 'app.config.js'
  },

  appConfigIOS: {
    language: 'javascript',
    code: `ios: {
  supportsTablet: true,
  bundleIdentifier: "com.webpenter.googlesignin",
  buildNumber: "10",
  infoPlist: {
    NSFaceIDUsageDescription: "Allow BookHere to use Face ID for secure login.",
    NSLocationWhenInUseUsageDescription: "We need your location to show properties near you.",
    NSPhotoLibraryUsageDescription: "We need access to your photos to upload property images.",
    NSCameraUsageDescription: "We need camera access to take photos of properties.",
    ITSAppUsesNonExemptEncryption: false
  },
  config: {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
  }
}`,
    description: 'iOS configuration in app.config.js',
    filename: 'app.config.js'
  },

  easConfig: {
    language: 'json',
    code: `{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "APP_VARIANT": "development"
      }
    },
    "preview": {
      "distribution": "internal",
      "env": {
        "APP_VARIANT": "preview"
      }
    },
    "production": {
      "env": {
        "APP_VARIANT": "production"
      }
    }
  },
  "submit": {
    "production": {}
  }
}`,
    description: 'EAS Build configuration',
    filename: 'eas.json'
  },

  packageJsonScripts: {
    language: 'json',
    code: `"scripts": {
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web",
  "build:android": "eas build --platform android --profile production",
  "build:ios": "eas build --platform ios --profile production",
  "submit:android": "eas submit --platform android",
  "submit:ios": "eas submit --platform ios"
}`,
    description: 'Useful npm scripts',
    filename: 'package.json'
  }
};

export default configurationSnippets;
