# Snippets Quick Reference Card

## 🚀 Quick Start

```typescript
import { snippet } from '../snippets';

// Use in documentation
const content = `
${snippet('npmInstall')}
`;
```

## 📦 Categories

### Installation
| Key | Command |
|-----|---------|
| `npmInstall` | `npm install` |
| `npmStart` | `npm start` |
| `cloneRepo` | Clone and setup |
| `clearCache` | Clear all caches |
| `checkNodeVersion` | Verify Node.js |

### Environment
| Key | File |
|-----|------|
| `envDevelopment` | `.env.development` |
| `envProduction` | `.env.production` |
| `envExample` | `.env.example` |
| `gitignoreEnv` | .gitignore entries |

### Build
| Key | Command |
|-----|---------|
| `easLogin` | Login to EAS |
| `easBuildAndroid` | Build Android AAB |
| `easBuildIOS` | Build iOS IPA |
| `easBuildPreview` | Build preview |
| `easSubmitAndroid` | Submit to Play Store |
| `easSubmitIOS` | Submit to App Store |
| `easCredentials` | Manage credentials |

### Configuration
| Key | File |
|-----|------|
| `appConfigBasic` | Basic app.config.js |
| `appConfigAndroid` | Android config |
| `appConfigIOS` | iOS config |
| `easConfig` | eas.json |
| `packageJsonScripts` | npm scripts |

### Troubleshooting
| Key | Purpose |
|-----|---------|
| `clearAllCaches` | Nuclear option |
| `fixMetroCache` | Fix Metro bundler |
| `fixAndroidGradle` | Fix Android build |
| `fixIOSPods` | Fix iOS pods |
| `viewLogs` | View app logs |
| `checkGoogleServices` | Verify Google files |

## 💡 Common Patterns

### Basic Usage
```typescript
snippet('npmInstall')
```

### With Description
```typescript
snippet('npmInstall', true)
```

### Get Snippet Object
```typescript
import { getSnippet } from '../snippets';
const snip = getSnippet('npmInstall');
```

### Search
```typescript
import { searchSnippets } from '../snippets';
const results = searchSnippets('cache');
```

### List All
```typescript
import { listSnippets } from '../snippets';
const all = listSnippets();
```

### Access by Category
```typescript
import { SNIPPETS } from '../snippets';
const installCmds = SNIPPETS.installation;
```

## 🎯 When to Use

✅ **Use snippets for:**
- Commands used multiple times
- Configuration files
- Common troubleshooting steps
- Environment setup

❌ **Don't use snippets for:**
- One-time, section-specific code
- Prose/documentation text
- Context-dependent examples

## 📝 Adding New Snippets

1. Choose category file (or create new)
2. Add snippet:
```typescript
export const mySnippets: SnippetCollection = {
  myCommand: {
    language: 'bash',
    code: `npm run my-command`,
    description: 'What this does',
    filename: 'optional.sh'
  }
};
```
3. Use: `snippet('myCommand')`

---

**Full Documentation:** See `README.md` and `example-usage.md`
