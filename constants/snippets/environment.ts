import { SnippetCollection } from './types';

/**
 * Environment configuration snippets
 */
export const environmentSnippets: SnippetCollection = {
  envDevelopment: {
    language: 'bash',
    code: `# Development Environment Variables
# .env.development

# Google OAuth Client IDs (Development)
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=YOUR_DEV_IOS_CLIENT_ID.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=YOUR_DEV_WEB_CLIENT_ID.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=YOUR_DEV_ANDROID_CLIENT_ID.apps.googleusercontent.com

# Google Maps API Key (Development)
GOOGLE_MAPS_API_KEY=YOUR_DEV_GOOGLE_MAPS_API_KEY

# WordPress Backend URL
WORDPRESS_URL=https://your-wordpress-site.com

# App Configuration
APP_VARIANT=development`,
    description: 'Development environment configuration',
    filename: '.env.development'
  },

  envProduction: {
    language: 'bash',
    code: `# Production Environment Variables
# .env.production

# Google OAuth Client IDs (Production)
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=YOUR_PRODUCTION_IOS_CLIENT_ID.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=YOUR_PRODUCTION_WEB_CLIENT_ID.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=YOUR_PRODUCTION_ANDROID_CLIENT_ID.apps.googleusercontent.com

# Google Maps API Key (Production)
GOOGLE_MAPS_API_KEY=YOUR_PRODUCTION_GOOGLE_MAPS_API_KEY

# WordPress Backend URL
WORDPRESS_URL=https://your-wordpress-site.com

# App Configuration
APP_VARIANT=production`,
    description: 'Production environment configuration',
    filename: '.env.production'
  },

  envExample: {
    language: 'bash',
    code: `# Copy this file to .env.development and .env.production
# and fill in your actual values

# Google OAuth Client IDs
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=

# Google Maps API Key
GOOGLE_MAPS_API_KEY=

# WordPress Backend URL
WORDPRESS_URL=

# App Configuration
APP_VARIANT=development`,
    description: 'Example environment file template',
    filename: '.env.example'
  },

  gitignoreEnv: {
    language: 'bash',
    code: `# Environment files
.env
.env.local
.env.*.local
.env.development.local
.env.test.local
.env.production.local`,
    description: 'Add to .gitignore to protect sensitive data',
    filename: '.gitignore'
  }
};

export default environmentSnippets;
