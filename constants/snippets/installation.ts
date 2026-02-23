import { SnippetCollection } from './types';

/**
 * Installation and setup code snippets
 */
export const installationSnippets: SnippetCollection = {
  npmInstall: {
    language: 'bash',
    code: `npm install`,
    description: 'Install all dependencies'
  },

  npmStart: {
    language: 'bash',
    code: `npm start`,
    description: 'Start the development server'
  },

  cloneRepo: {
    language: 'bash',
    code: `# Clone the repository
git clone https://github.com/your-username/bookhere-mobile.git

# Navigate to project directory
cd bookhere-mobile

# Install dependencies
npm install`,
    description: 'Clone and set up the project'
  },

  installExpoGo: {
    language: 'bash',
    code: `# iOS
Download "Expo Go" from App Store

# Android
Download "Expo Go" from Google Play Store`,
    description: 'Install Expo Go on your mobile device'
  },

  clearCache: {
    language: 'bash',
    code: `# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules
npm install

# Clear Expo cache
npx expo start --clear`,
    description: 'Clear all caches and reinstall'
  },

  checkNodeVersion: {
    language: 'bash',
    code: `# Check Node.js version (should be 18.x or higher)
node --version

# Check npm version
npm --version`,
    description: 'Verify Node.js and npm installation'
  }
};

export default installationSnippets;
