# Example: Using Snippets in Documentation

This file demonstrates how to use the snippets system in your documentation sections.

## Example 1: Simple Installation Section

### WITHOUT Snippets (❌ Not Recommended)
```typescript
export const installation: DocSection = {
  title: "Installation",
  icon: Terminal,
  content: `
## Quick Start

Install dependencies:
\`\`\`bash
npm install
\`\`\`

Start the dev server:
\`\`\`bash
npm start
\`\`\`
  `
};
```

**Problems:**
- Duplicated code
- Hard to maintain
- Inconsistent formatting
- Changes require editing multiple files

### WITH Snippets (✅ Recommended)
```typescript
import { snippet } from '../snippets';

export const installation: DocSection = {
  title: "Installation",
  icon: Terminal,
  content: `
## Quick Start

Install dependencies:
${snippet('npmInstall')}

Start the dev server:
${snippet('npmStart')}
  `
};
```

**Benefits:**
- DRY (Don't Repeat Yourself)
- Easy to update
- Consistent everywhere
- Single source of truth

---

## Example 2: Environment Configuration Section

```typescript
import { snippet } from '../snippets';

export const configuration: DocSection = {
  title: "Configuration",
  icon: Settings,
  content: `
## Environment Setup

### Development Environment

Create a development environment file:

${snippet('envDevelopment', true)}

### Production Environment

Create a production environment file:

${snippet('envProduction', true)}

### Security

Add these to your .gitignore:

${snippet('gitignoreEnv')}
  `
};
```

---

## Example 3: Build Commands Section

```typescript
import { snippet, SNIPPETS } from '../snippets';

export const deployment: DocSection = {
  title: "Deployment",
  icon: ExternalLink,
  content: `
## Building Your App

### Android Build

${snippet('easBuildAndroid', true)}

### iOS Build

${snippet('easBuildIOS', true)}

### Submit to Stores

Android:
${snippet('easSubmitAndroid')}

iOS:
${snippet('easSubmitIOS')}
  `
};
```

---

## Example 4: Troubleshooting Section

```typescript
import { snippet, searchSnippets } from '../snippets';

export const troubleshooting: DocSection = {
  title: "Troubleshooting",
  icon: Wrench,
  content: `
## Common Issues

### Build Errors

Try clearing all caches:

${snippet('clearAllCaches', true)}

### Metro Bundler Issues

${snippet('fixMetroCache', true)}

### Android Build Problems

${snippet('fixAndroidGradle', true)}

### iOS CocoaPods Issues

${snippet('fixIOSPods', true)}
  `
};
```

---

## Example 5: Dynamic Content with Multiple Snippets

```typescript
import { SNIPPETS, snippet } from '../snippets';

// Generate a commands reference page
const commandsList = Object.keys(SNIPPETS.build).map(key => {
  return \`### \${key}\n\n\${snippet(key, true)}\n\n---\n\`;
}).join('\\n');

export const commandsReference: DocSection = {
  title: "Commands Reference",
  icon: Terminal,
  content: \`
## All Build Commands

\${commandsList}
  \`
};
```

---

## Example 6: Conditional Snippets

```typescript
import { snippet, getSnippet } from '../snippets';

const platform = 'android'; // or 'ios'

const buildCommand = platform === 'android'
  ? snippet('easBuildAndroid')
  : snippet('easBuildIOS');

export const platformBuild: DocSection = {
  title: "Platform Build",
  icon: Smartphone,
  content: `
## Building for ${platform.toUpperCase()}

${buildCommand}
  `
};
```

---

## Example 7: Inline Snippet with Custom Formatting

```typescript
import { getSnippet } from '../snippets';

const npmInstallSnippet = getSnippet('npmInstall');

export const quickStart: DocSection = {
  title: "Quick Start",
  icon: Zap,
  content: `
## Get Started in 3 Steps

1. **Install Dependencies**

   ${snippet('npmInstall')}

   This installs all required packages.

2. **Configure Environment**

   ${snippet('envDevelopment')}

3. **Start Development Server**

   ${snippet('npmStart')}

   Your app will open in Expo Go!
  `
};
```

---

## Example 8: Creating Section-Specific Snippets

Sometimes you need snippets specific to one section:

```typescript
import { snippet } from '../snippets';

// Section-specific snippet (not in main snippets library)
const customApiExample = {
  language: 'javascript',
  code: `
// Custom API call specific to this section
fetch('https://api.bookhere.com/properties')
  .then(res => res.json())
  .then(data => console.log(data));
  `
};

export const apiDocumentation: DocSection = {
  title: "API Documentation",
  icon: Code,
  content: `
## Making API Calls

${snippet('npmInstall')}

Then use our API:

\`\`\`${customApiExample.language}
${customApiExample.code}
\`\`\`
  `
};
```

---

## Best Practices

### ✅ DO:
- Use snippets for commands that appear multiple times
- Include descriptions for complex commands
- Keep snippets focused and reusable
- Update snippets when commands change

### ❌ DON'T:
- Use snippets for one-time, section-specific code
- Make snippets too complex or context-dependent
- Forget to test snippets after changes
- Use snippets for prose/documentation text

---

## Testing Your Snippets

```typescript
// Test file: test-snippets.ts
import { snippet, listSnippets, searchSnippets } from './snippets';

// Test all snippets render without errors
listSnippets().forEach(key => {
  try {
    const rendered = snippet(key);
    console.log(\`✓ \${key}: OK\`);
  } catch (error) {
    console.error(\`✗ \${key}: FAILED\`, error);
  }
});

// Search functionality test
const buildCommands = searchSnippets('build');
console.log('Build commands:', buildCommands);
```

---

## Real-World Example: Complete Section

Here's a complete section using snippets:

```typescript
// constants/sections/quick-start.ts
import { Terminal, Settings, Play } from 'lucide-react';
import { DocSection } from '../../types';
import { snippet } from '../snippets';

export const quickStart: DocSection = {
  title: "Quick Start Guide",
  icon: Terminal,
  tags: ["getting-started", "tutorial", "beginner"],
  content: `
# Quick Start Guide

Get your BookHere app running in under 5 minutes!

## Prerequisites

Verify Node.js is installed:

${snippet('checkNodeVersion')}

## Installation

1. **Clone the repository**

${snippet('cloneRepo')}

2. **Set up environment variables**

${snippet('envDevelopment', true)}

3. **Install Expo Go on your phone**

${snippet('installExpoGo')}

## Run the App

Start the development server:

${snippet('npmStart')}

Scan the QR code with Expo Go and your app will load!

## Having Issues?

Try clearing the cache:

${snippet('clearCache')}

Still stuck? Check our [Troubleshooting Guide](#troubleshooting).

---

**Next Steps:**
- [Configuration Guide](#configuration)
- [Build for Production](#deployment)
- [Submit to App Stores](#submission)
  `
};

export default quickStart;
```

---

This example shows the complete workflow of using snippets in a real documentation section!
