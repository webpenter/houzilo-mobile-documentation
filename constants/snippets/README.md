# Code Snippets Library

This folder contains reusable code snippets used throughout the documentation. Centralizing snippets here makes the documentation easier to maintain and update.

## 📁 Structure

```
snippets/
├── index.ts              # Main export & utility functions
├── types.ts              # TypeScript type definitions
├── installation.ts       # Installation commands
├── environment.ts        # Environment configuration
├── build.ts             # Build & deployment commands
├── configuration.ts     # Config file examples
└── troubleshooting.ts   # Debugging commands
```

## 🚀 Usage

### Basic Usage

```typescript
import { snippet } from '../constants/snippets';

// In your documentation content
const installationGuide = `
## Installation

${snippet('npmInstall')}

Then start the development server:

${snippet('npmStart')}
`;
```

### With Description

```typescript
// Include description above code block
const content = `
${snippet('npmInstall', true)}
`;
```

### Access All Snippets

```typescript
import { SNIPPETS, ALL_SNIPPETS } from '../constants/snippets';

// By category
const installCmds = SNIPPETS.installation;

// All snippets flat
const allSnippets = ALL_SNIPPETS;
```

### Search Snippets

```typescript
import { searchSnippets } from '../constants/snippets';

// Find all snippets related to "cache"
const cacheSnippets = searchSnippets('cache');
// Returns: ['clearCache', 'fixMetroCache', 'clearAllCaches']
```

## 📝 Available Snippets

### Installation (`installation.ts`)
- `npmInstall` - Install dependencies
- `npmStart` - Start dev server
- `cloneRepo` - Clone and setup project
- `installExpoGo` - Install Expo Go app
- `clearCache` - Clear all caches
- `checkNodeVersion` - Verify Node.js installation

### Environment (`environment.ts`)
- `envDevelopment` - Development environment variables
- `envProduction` - Production environment variables
- `envExample` - Example .env template
- `gitignoreEnv` - .gitignore entries for env files

### Build (`build.ts`)
- `easLogin` - Login to EAS
- `easBuildAndroid` - Build Android AAB
- `easBuildIOS` - Build iOS IPA
- `easBuildPreview` - Build preview version
- `easBuildBoth` - Build both platforms
- `easBuildList` - List builds
- `easSubmitAndroid` - Submit to Play Store
- `easSubmitIOS` - Submit to App Store
- `easCredentials` - Manage credentials
- `clearBuildCache` - Clear EAS cache

### Configuration (`configuration.ts`)
- `appConfigBasic` - Basic app.config.js
- `appConfigAndroid` - Android configuration
- `appConfigIOS` - iOS configuration
- `easConfig` - eas.json configuration
- `packageJsonScripts` - Useful npm scripts

### Troubleshooting (`troubleshooting.ts`)
- `clearAllCaches` - Nuclear option - clear everything
- `fixMetroCache` - Fix Metro bundler issues
- `fixAndroidGradle` - Fix Android build
- `fixIOSPods` - Fix iOS CocoaPods
- `viewLogs` - View application logs
- `checkGoogleServices` - Verify Google config files
- `testEnvVariables` - Debug environment variables

## ➕ Adding New Snippets

1. **Choose the right category** or create a new file
2. **Add snippet to the category file**:

```typescript
// constants/snippets/installation.ts
export const installationSnippets: SnippetCollection = {
  // ... existing snippets

  newCommand: {
    language: 'bash',
    code: `npm run new-command`,
    description: 'Description of what this does',
    filename: 'optional-filename.sh' // optional
  }
};
```

3. **Export in index.ts** (if creating new category):

```typescript
import newCategorySnippets from './new-category';

export const SNIPPETS = {
  // ... existing
  newCategory: newCategorySnippets
};
```

4. **Use in documentation**:

```typescript
snippet('newCommand')
```

## 🎨 Supported Languages

Common language identifiers for syntax highlighting:
- `bash` - Shell commands
- `javascript` - JavaScript code
- `typescript` - TypeScript code
- `json` - JSON configuration
- `yaml` - YAML files
- `xml` - XML files
- `java` - Java code
- `kotlin` - Kotlin code
- `swift` - Swift code
- `dart` - Dart/Flutter code

## ⚡ Benefits

1. **DRY Principle** - Write once, use everywhere
2. **Easy Updates** - Change in one place, reflects everywhere
3. **Consistency** - All commands/configs stay consistent
4. **Type Safety** - TypeScript ensures correct usage
5. **Searchable** - Find snippets by keyword
6. **Maintainable** - Clear organization by category

## 📚 Example: Before vs After

### Before (Repeated Code)
```typescript
// In installation.ts
content: `npm install`

// In troubleshooting.ts
content: `npm install`

// In configuration.ts
content: `npm install`

// Problem: Update command = change 3 files!
```

### After (Using Snippets)
```typescript
// In installation.ts
content: `${snippet('npmInstall')}`

// In troubleshooting.ts
content: `${snippet('npmInstall')}`

// In configuration.ts
content: `${snippet('npmInstall')}`

// Update once in snippets/installation.ts, reflects everywhere!
```

## 🔍 Finding the Right Snippet

```typescript
import { listSnippets, searchSnippets } from '../constants/snippets';

// List all available snippets
const all = listSnippets();
console.log(all); // ['npmInstall', 'npmStart', ...]

// Search for specific snippets
const buildCmds = searchSnippets('build');
console.log(buildCmds); // ['easBuildAndroid', 'easBuildIOS', ...]
```

## 💡 Tips

- Use descriptive snippet keys (e.g., `easBuildAndroid` not `build1`)
- Include helpful descriptions for complex commands
- Group related snippets in the same category file
- Keep snippets focused - one concept per snippet
- Use comments in code for clarity

## 🤝 Contributing

When adding new snippets:
1. Follow existing naming conventions
2. Add clear descriptions
3. Test the snippet works
4. Update this README if creating new categories
5. Keep snippets general and reusable

---

**Last Updated:** 2026-01-12
