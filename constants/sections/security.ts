import { Shield } from 'lucide-react';
import { DocSection } from '../../types';

export const security: DocSection = {
  title: "Security",
  icon: Shield,
  tags: ["security", "credentials", "authentication"],
  content: `
# Security Policy

This document outlines the security model, practices, and responsibilities for the Houzilo Flutter application. All contributors and integrators should read this before deploying or modifying the app.

## Table of Contents
- [Security Best Practices](#security-best-practices)
- [API Keys & Credentials](#api-keys--credentials)
- [Data Protection](#data-protection)
- [Common Security Issues](#common-security-issues)
- [Reporting Vulnerabilities](#reporting-vulnerabilities)
- [Security Checklist](#security-checklist)

---

## Security Best Practices

### 1. Never Commit Secrets to Version Control
The following files contain sensitive credentials and **must never be committed to Git**:

\`\`\`
android/local.properties        ← Facebook App ID / Client Token
android/key.properties          ← Keystore passwords
android/app/upload-keystore.jks ← Release keystore file
android/app/google-services.json
ios/Runner/GoogleService-Info.plist
\`\`\`

Verify your \`.gitignore\` covers all of the above before every \`git push\`.

---

### 2. Always Use HTTPS
The app communicates exclusively over HTTPS. The base URL in \`lib/core/network/dio_client.dart\` must always use \`https://\`:

\`\`\`dart
baseUrl: 'https://YOUR-DOMAIN.com/wp-json/', // ← https required
\`\`\`

Never use \`http://\` in production — it exposes JWT tokens and user data to man-in-the-middle attacks.

---

### 3. Log Sensitive Data Only in Debug Mode
The Dio interceptor in \`dio_client.dart\` only logs requests in debug mode:

\`\`\`dart
if (kDebugMode) {
  // logging interceptors active
}
\`\`\`

**Never enable verbose request/response logging in production builds.** JWTs and form data could be exposed in device logs.

---

### 4. Keep Dependencies Updated
Outdated packages introduce known CVEs. Regularly audit:

\`\`\`bash
flutter pub outdated
flutter pub upgrade --major-versions
\`\`\`

Pay special attention to:
*   \`firebase_auth\` — high-impact security surface
*   \`flutter_secure_storage\` — token storage layer
*   \`dio\` — HTTP client used for all API calls

---

### 5. Enable ProGuard / R8 for Release Builds
Code shrinking and obfuscation is already configured in \`android/app/build.gradle\`:

\`\`\`gradle
buildTypes {
  release {
    minifyEnabled true       // ← Obfuscates and shrinks code
    shrinkResources true
    proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
  }
}
\`\`\`

Do **not** disable these flags for production builds.

---

## API Keys & Credentials

### JWT Authentication Token
*   **Stored in:** \`flutter_secure_storage\` (Apple Keychain on iOS, Android Keystore on Android)
*   **Transmitted as:** \`Authorization: Bearer <token>\` header on all authenticated requests
*   **Key name in storage:** \`auth_token\`
*   **Validity flag:** \`token_valid\` → \`'true'\` / \`'false'\`

> Do **not** store the JWT in \`SharedPreferences\` — it is not encrypted and can be read from a rooted device.

---

### Firebase Credentials
*   **Android:** \`android/app/google-services.json\`
*   **iOS:** \`ios/Runner/GoogleService-Info.plist\`

These files embed API keys scoped only to your Firebase project. They are safe to ship inside the app binary (standard Firebase practice), **but must never be pushed to a public Git repository**.

If credentials are compromised:
1. Regenerate in Firebase Console → Project Settings → Your Apps.
2. Download fresh config files.
3. Rebuild and redeploy.

---

### Facebook Credentials (\`local.properties\`)
Facebook App ID and Client Token are injected at build time via \`local.properties\`:

\`\`\`properties
facebookAppId=YOUR_APP_ID
facebookClientToken=YOUR_CLIENT_TOKEN
\`\`\`

These are read by \`build.gradle\` and embedded as string resources:
\`\`\`gradle
resValue "string", "facebook_app_id", localProperties.getProperty("facebookAppId", "")
resValue "string", "facebook_client_token", localProperties.getProperty("facebookClientToken", "")
\`\`\`

*   **Do not** hardcode these values in \`strings.xml\`.
*   \`local.properties\` must be listed in \`.gitignore\`.

---

### WordPress API
*   The backend requires the **JWT Authentication for WP REST API** plugin.
*   The \`JWT_AUTH_SECRET_KEY\` defined in \`wp-config.php\` must be a strong random string (minimum 32 characters).
*   Restrict REST API access with proper CORS headers — only allow requests from trusted origins.

---

## Data Protection

### Token Storage
| Platform | Storage Mechanism | Security Level |
|---|---|---|
| Android | Android Keystore (via \`flutter_secure_storage\`) | Hardware-backed on API 23+ |
| iOS | Apple Keychain (via \`flutter_secure_storage\`) | Secure Enclave backed |

The minimum Android SDK version (\`minSdkVersion 23\`) ensures hardware-backed key storage is available on all supported devices.

---

### Sensitive Keys in Secure Storage
The following keys are stored encrypted in \`flutter_secure_storage\`:

| Key | Value Stored | Sensitivity |
|---|---|---|
| \`auth_token\` | JWT Bearer token | 🔴 High |
| \`token_valid\` | \`'true'\` / \`'false'\` | 🟡 Medium |
| \`auth_provider\` | \`'password'\` or \`'google'\` | 🟡 Medium |
| \`userTypeGoogle\` | \`'true'\` / \`'false'\` | 🟡 Medium |
| \`userName\`, \`userEmail\` | Profile display data | 🟢 Low |

---

### User Data Collected
Based on the inquiry form (\`form_email_view.dart\`) and sign-up flow:

| Data | Where Stored | Transmitted To |
|---|---|---|
| Email, Name | Firebase Auth + WordPress | Backend WordPress API |
| Phone number | Inquiry form only | Agent/Agency via email |
| Property preferences | Local in-memory (Provider) | Backend search API |
| Profile photo | WordPress via API upload | Backend media endpoint |
| JWT token | \`flutter_secure_storage\` | API request headers |

**No credit card or financial data is collected by the app.**

---

### Network Transport Security
*   All API calls use HTTPS (enforced at \`baseUrl\` level in Dio).
*   **Android:** Network Security Config should restrict cleartext traffic. Verify \`android/app/src/main/res/xml/network_security_config.xml\` does not allow cleartext.
*   **iOS:** App Transport Security (ATS) is active by default, requiring HTTPS for all connections.

---

## Common Security Issues

### ⚠️ Hardcoded Credentials
**Risk:** Credentials committed directly in Dart source code or \`strings.xml\` are trivially extracted from the APK.
**Status in this app:** Facebook credentials were previously in \`strings.xml\` and were migrated to \`local.properties\`. Always verify via:
\`\`\`bash
grep -r "facebookAppId" android/app/src/
\`\`\`
Expected result: zero matches in \`strings.xml\`.

---

### ⚠️ JWT Token Exposure via Logging
**Risk:** If Dio logging interceptors are active in release builds, JWT tokens appear in device logs (accessible via ADB).
**Mitigation:** The app wraps all logging in \`kDebugMode\` checks. Verify before release:
\`\`\`dart
if (kDebugMode) {
  _dio.interceptors.add(LogInterceptor(...));
}
\`\`\`

---

### ⚠️ Man-in-the-Middle (MITM) Attacks
**Risk:** HTTP connections can be intercepted and JWT tokens stolen.
**Mitigation:**
*   Always use \`https://\` in \`baseUrl\`.
*   Consider adding SSL pinning for production deployments using \`dio_pinning\` or a custom \`badCertificateCallback\`.

---

### ⚠️ Insecure Direct Object Reference (IDOR)
**Risk:** Property detail and user listing endpoints accept an \`id\` parameter — a malicious actor could enumerate IDs to access other users' data.
**Mitigation:** Enforce authorization on the **WordPress/backend** side. The REST API must validate that the requesting JWT user has permission to access or modify the requested resource.

---

### ⚠️ Insecure Storage on Rooted / Jailbroken Devices
**Risk:** On rooted Android or jailbroken iOS devices, secure storage can be bypassed.
**Mitigation:**
*   Consider integrating \`flutter_jailbreak_detection\` or \`root_checker\` to warn users or restrict functionality on compromised devices.
*   This is not currently implemented and is recommended for future hardening.

---

### ⚠️ Excessive Permissions
**Risk:** Requesting unnecessary permissions increases attack surface.
**Current Android permissions used:**
\`\`\`xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.CAMERA"/>
\`\`\`
Audit and remove any permission not actively used by the app before publishing.

---

## Reporting Vulnerabilities

If you discover a security vulnerability in the Houzilo app, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities.
2. **Email** the development team directly at the contact address in the project's \`README.md\` or via the Webpenter support portal.
3. Include the following in your report:
   *   Description of the vulnerability
   *   Steps to reproduce
   *   Potential impact
   *   Suggested fix (if known)

**Expected Response Time:** Security issues will be acknowledged within 72 hours and addressed based on severity:

| Severity | Response Time |
|---|---|
| 🔴 Critical (data breach risk) | 24–48 hours |
| 🟠 High (auth bypass, token leak) | 3–5 business days |
| 🟡 Medium (information disclosure) | 1–2 weeks |
| 🟢 Low (minor hardening) | Next release cycle |

---

## Security Checklist

Use this checklist before every production release:

### Credentials & Secrets
- [ ] \`google-services.json\` and \`GoogleService-Info.plist\` are **production** versions (not debug)
- [ ] \`local.properties\` is listed in \`.gitignore\` and **not committed**
- [ ] \`key.properties\` and \`upload-keystore.jks\` are **not committed** to Git
- [ ] No hardcoded secrets in any \`.dart\`, \`.xml\`, or \`.gradle\` file
- [ ] Facebook App ID not present in \`strings.xml\`

### Network & Transport
- [ ] \`baseUrl\` in \`dio_client.dart\` uses \`https://\`
- [ ] Dio logging interceptors are wrapped in \`kDebugMode\` only
- [ ] CORS headers on WordPress backend restrict allowed origins

### Build & Release
- [ ] \`minifyEnabled true\` and \`shrinkResources true\` in release build type
- [ ] ProGuard rules are complete — Firebase and Dio classes are not stripped
- [ ] App built with \`flutter build appbundle --release\` (not debug)
- [ ] \`flutter analyze\` returns no errors or critical warnings

### Authentication
- [ ] JWT \`auth_token\` is stored in \`flutter_secure_storage\`, not \`SharedPreferences\`
- [ ] Token expiry is handled — expired tokens redirect to Sign In
- [ ] \`token_valid\` flag is correctly set and cleared on login/logout

### Data & Privacy
- [ ] No PII (Personally Identifiable Information) is logged to console
- [ ] Profile photo uploads go via HTTPS to the WordPress media endpoint
- [ ] Privacy Policy screen content is up to date

### Android Specific
- [ ] \`minSdkVersion\` is 23 or higher (required for hardware-backed Keystore)
- [ ] Network Security Config does not allow cleartext traffic in production
- [ ] Unnecessary permissions removed from \`AndroidManifest.xml\`

### iOS Specific
- [ ] App Transport Security (ATS) is not globally disabled in \`Info.plist\`
- [ ] \`REVERSED_CLIENT_ID\` URL scheme is present for Google Sign-In
- [ ] Minimum iOS deployment target is set correctly in \`Podfile\`
  `
};

export default security;
