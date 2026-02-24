import { Zap } from 'lucide-react';
import { DocSection } from '../../types';

export const features: DocSection = {
  title: "Features",
  icon: Zap,
  tags: ["capabilities", "functionality", "highlights"],
  content: `
# Houzilo Mobile App - Complete Features Guide

Comprehensive documentation of all features, functions, and capabilities in the Houzilo property rental and sales mobile application.

## Table of Contents
1.  [App Overview](#app-overview)
2.  [User Roles & Permissions](#user-roles--permissions)
3.  [Authentication & Security](#authentication--security)
4.  [Property Browsing & Discovery](#property-browsing--discovery)
5.  [Booking & Inquiries](#booking--inquiries)
6.  [Payment System](#payment-system)
7.  [Messaging & Communication](#messaging--communication)
8.  [Property Management (Hosts)](#property-management-hosts)
9.  [Financial Management](#financial-management)
10. [User Profile & Settings](#user-profile--settings)
11. [Favorites & Wishlists](#favorites--wishlists)
12. [Reviews & Ratings](#reviews--ratings)
13. [Maps & Location](#maps--location)
14. [Notifications](#notifications)
15. [Multi-Language Support](#multi-language-support)
16. [Dark Mode](#dark-mode)
17. [Technical Features](#technical-features)

---

## App Overview
Houzilo is a full-featured real estate mobile application built with **Flutter**. It connects property owners and agents with home seekers (buyers and renters) looking for accommodations worldwide.

**Platform Support:**
*   Android 6.0 or later 
*   iOS 13.0 or later

**Backend Integration:**
*   WordPress with **Houzez Theme**
*   RESTful API endpoints
*   JWT Authentication (via WordPress/Firebase)

**Current Version:** 1.0.0+2

---

## User Roles & Permissions

### 1. Guest User (Unauthenticated)
**Capabilities:**
*   ✅ Browse all property listings (Featured, Recent, etc.)
*   ✅ View full property details (Images, Amenities, Location)
*   ✅ Search and filter properties by Price, Location, Type, etc.
*   ✅ View property location on interactive maps
*   ✅ Read user reviews and ratings
*   ❌ Cannot send inquiries or contact agents
*   ❌ Cannot save favorites (Wishlist)
*   ❌ Cannot post reviews
*   ❌ Cannot add property listings

**Access Level:** Read-only access to public content.

### 2. Authenticated User (Renter / Buyer)
All **Guest** capabilities plus:
*   ✅ **Send Inquiries:** Contact agents/hosts via built-in forms or direct call/email actions.
*   ✅ **Save Favorites:** Add properties to a personal wishlist.
*   ✅ **Leave Reviews:** Rate and review properties they have visited.
*   ✅ **Manage Profile:** Update personal information, password, and settings.
*   ✅ **Delete Account:** GDPR compliant account deletion.
*   ❌ Cannot add property listings (unless upgraded to Host/Agent role).

**Access Level:** Full interaction with listings and agents.

### 3. Host / Agent (homey_host / agent)
All **Authenticated User** capabilities plus:
*   ✅ **Add New Listings:** Comprehensive 9-step wizard for submitting properties.
*   ✅ **Manage Listings:** Edit, delete, or update status of own listings.
*   ✅ **Media Management:** Upload and manage property images and floor plans.
*   ✅ **Inquiry Management:** Receive and respond to user inquiries.
*   ✅ **Agent Profile:** Manage public facing agent profile and contact details.

**Access Level:** Full content creation and management capabilities.

---

## 3. Authentication & Security

### Authentication Methods

#### 1. Email & Password Authentication
**Location:** Login and SignUp screens

**Signup Process:**
*   **User Input:** Name, Email, Password.
*   **Validation:** Email format check, Password length check (min 8 chars).
*   **Role Assignment:** Users are assigned the 'houzez_buyer' role by default upon registration.
*   **Account Creation:** Accounts are created directly in the WordPress backend via REST API.
*   **Auto-Login:** Successful registration automatically logs the user in.

**Login Process:**
*   **Credential Check:** Email and Password are validated against the WordPress database.
*   **Token Retrieval:** On success, a JWT authentication token is retrieved.
*   **Secure Storage:** The token is encrypted and stored locally using \`FlutterSecureStorage\`.

**Features:**
*   Show/Hide Password visibility toggle.
*   "I agree to Terms & Conditions" mandatory checkbox.
*   Forgot Password flow (triggers email reset link).

**API Endpoints:**
*   \`POST /houzez-api/v1/register\` : User Registration
*   \`POST /houzez-api/v1/login\` : User Login
*   \`POST /houzez-api/v1/forgot-password\` : Password Reset

#### 2. Google Sign-In
**Location:** Login and Signup screens

**Process:**
*   **User Action:** User taps "Sign in with Google".
*   **OAuth Flow:** Native Google Sign-In dialog (via \`google_sign_in\` package).
*   **Token Exchange:** App retrieves Google ID Token.
*   **Backend Verification:** Token is sent to \`houzez-api/v1/verify-google\` for verification.
*   **Account Handling:**
    *   If email exists, the account is linked.
    *   If email is new, a new account is automatically created.

**Configuration:**
*   Server Client ID configuration required in Google Cloud Console.
*   \`google-services.json\` (Android) and \`GoogleService-Info.plist\` (iOS) files required.

### Security Features

**Data Security:**
*   **HTTPS/TLS:** All API communication is encrypted.
*   **Secure Storage:** Sensitive auth tokens differ by platform (Keychain on iOS, Keystore on Android).
*   **No Plaintext Passwords:** User passwords are never stored locally on the device.

**Session Management:**
*   **Token Persistence:** Sessions remain active via securely stored tokens.
*   **Auto-Login:** App checks for valid token on launch to skip login screen.
*   **Logout:** "Log Out" action securely clears all local session data and tokens.

---

## 4. Property Browsing & Discovery

### Home Screen
**Location:** Main Tab → Home

**Components:**
*   **Hero Search Bar:** Animated search field for keyword based property search.
*   **Location Selector:** Dropdown to filter properties by specific city or area.
*   **Featured Carousel:** Auto-scrolling slider showcasing highlighted/premium properties.
*   **Top Agents:** Horizontal scrollable list engaging users with top-rated agents.
*   **Recent Properties:** Grid view of the latest property listings.
*   **Tab Navigation:** Quick switching between "All", "House", and "Apartment" categories.

### Search & Filters
**Location:** Search Result Screen & Filter View

**Capabilities:**
*   **Keyword Search:** Search by property title, address, or ID.
*   **Location Filter:** Filter by specific City or Custom Location (via Map).
*   **Price Range:** Slider control to set Minimum and Maximum price.
*   **Property Specs:** Filter by number of Bedrooms, Bathrooms, and Area size.
*   **Property Type:** Select from Rent, Sale, Apartment, Villa, Office, etc.
*   **Amenities:** Multi-select options for features like WiFi, Pool, Garage, etc.

**View Options:**
*   **List/Grid View:** Toggle between list and grid presentations.
*   **Map View:** Interactive map showing property pins with dynamic loading based on viewport.

### Property Detail Screen
**Location:** Tap on any property card

**Sections:**
*   **Image Slider:** Full-width swipeable gallery of high-resolution property images.
*   **Property Header:** Title, Price (Sale/Rent), and Address.
*   **Quick Stats:** Icons displaying Bed, Bath, and Garage counts.
*   **Details Grid:** Comprehensive list including Area size, Year Built, Property ID, and Type.
*   **Description:** Expandable text section for detailed property narrative.
*   **Features & Amenities:** Grid list of all available amenities (e.g., Air Conditioning, TV).
*   **Location Map:** Embedded interactive map showing the exact property location.
*   **Agent Contact:**
    *   **Call Button:** Direct dial to the agent's phone number.
    *   **Email Button:** Opens the inquiry form to send a message.
*   **Reviews:** User ratings and textual reviews with a "View All" option.
*   **Distance Calculator:** Shows distance from the user's current location (if enabled).

**API Endpoints:**
*   \`GET /houzez-api/v1/property_detail\` : Fetch full property details.
*   \`GET /houzez-api/v1/properties\` : Fetch filtered property lists.
*   \`GET /houzez-api/v1/agents\` : Fetch agent list.

---

## 5. Booking & Inquiries

### Inquiry Model
Houzilo operates on a **Direct Inquiry** model, facilitating communication between property seekers and agents/hosts. It ignores instant booking flows in favor of lead generation and personalized negotiation.

### Contact Methods
**Location:** Property Details Screen

1.  **Phone Call:** Quick-action button to launch the device's dialer with the agent's number pre-filled.
2.  **Email Inquiry:** Opens a dedicated inquiry form for detailed messages.

### Inquiry Form
**Location:** \`RouteName.inquiryFormView\`

**Fields:**
*   **Full Name:** Pre-filled from profile if logged in.
*   **Phone Number:** Mandatory field for agent follow-up.
*   **Email Address:** Read-only for logged-in users to ensure authenticity.
*   **Message:** pre-populated with context (e.g., "I am interested in [Property Title]...").

**Process:**
1.  User taps "Email" on a property.
2.  Form opens with pre-filled user details.
3.  User adds a custom message or phone number.
4.  **Submission:**
    *   **Agencies:** Request sent to Agency API endpoint.
    *   **Agents:** Request sent to Agent API endpoint.
5.  **Confirmation:** Success snackbar confirms delivery to the user.

**API Endpoints:**
*   \`POST /houzez-api/v1/agent_contact\` : Send inquiry to an individual agent.
*   \`POST /houzez-api/v1/agency_contact\` : Send inquiry to a real estate agency.

---

## 6. Payment System
*   **Current State:** Not implemented in Mobile App.
*   **Method:** All financial transactions, including booking payments and membership packages, are currently handled via the backend web portal or direct offline negotiation (Cash, Bank Transfer) between Host and Tenant.
*   **Future Scope:** In-app purchase integration for listing packages.

---

## 7. Messaging & Communication
*   **Primary Method:** Email-based Contact Forms.
*   **In-App Chat:** Not currently available.
*   **Agent Interaction:** Direct clickable phone numbers and inquiry emails.

---

## 8. Property Management (Hosts)
**Location:** Profile → Add Listing

### Submission Wizard (9 Steps)
Hosts and Agents can submit properties using a comprehensive step-by-step wizard:

1.  **Basic Info:** Title, Category, Type, Transaction type (Rent/Sale).
2.  **Media:** Upload high-quality images from gallery/camera.
3.  **Details:** Price, Area Size (SqFt), Bedrooms, Bathrooms, Year Built, Garage.
4.  **Amenities:** Multi-select options (Pool, Gym, WiFi, etc.).
5.  **Floor Plans:** Add detailed floor plan images and descriptions.
6.  **Sub-listings:** Link related properties or units.
7.  **Contact Info:** Specify Agent/Agency or use Host profile.
8.  **Location:** Set address, Country, City, and pin exact location on Map.
9.  **Settings:** Mark as Featured, Login Required checks, and GDPR agreement.

**Management Features:**
*   **My Listings:** View all submitted properties in a list.
*   **Edit/Delete:** Modify or remove existing listings.

---

## 9. Financial Management
*   **Dashboard:** Host earnings and payout management are handled via the web dashboard.
*   **Mobile View:** The mobile app focuses on property discovery and submission, not financial reporting.

---

## 10. User Profile & Settings
**Location:** Main Tab → Profile

**Features:**
*   **Profile Management:** Edit Name, Phone, and view Profile Photo.
*   **Security:** Change Password (for email/password accounts) and Delete Account.
*   **Listings:** Access "My Listings" to manage submitted properties.
*   **Agencies:** Browse directory of registered agencies.
*   **Authentication:** Sign In / Sign Up for Guest users; Secure Logout for authenticated users.

---

## 11. Favorites & Wishlists
*   **Implementation:** Users can "Save" properties to a personalized list.
*   **Network:** Syncs with the backend (\`FavouritePropertyProvider\`).
*   **Access:** Viewed via the "Saved" properties section (if enabled across tabs).

---

## 12. Reviews & Ratings
*   **View Reviews:** Read user feedback on Property Detail screens.
*   **Submit Review:** Authenticated users can submit ratings and comments.
*   **Components:** Star rating bar and textual feedback form.

---

## 13. Maps & Location
*   **Provider:** \`flutter_map\` (OpenStreetMap / Leaflet).
*   **Features:**
    *   Property Location Pin on Details screen.
    *   Interactive Map View for Search Results.
    *   Distance calculation from user's current location.

---

## 14. Notifications
*   **Type:** System-triggered Email Notifications (via WordPress).
*   **Mobile Push:** Not currently implemented.
*   **Feedback:** In-app Snackbars and Toasts for action confirmation (e.g., "Inquiry Sent!").

---

## 15. Multi-Language Support
*   **Supported Languages:** English, Urdu.
*   **Implementation:** \`flutter_localizations\` with \`.arb\` files.
*   **Switching:** Toggle available in Profile → Language Settings.

---

## 16. Dark Mode
*   **Implementation:** System-aware Dark and Light themes.
*   **Toggle:** Manual override switch available in Profile Settings.
*   **Styling:** Adaptive colors for backgrounds, texts, and cards.

---

## 17. Technical Features
*   **State Management:** Provider pattern for efficient data flow.
*   **Offline Handling:** Connectivity checks with "No Internet" UI states.
*   **Deep Linking:** Support for sharing property links (\`share_plus\`).
*   **Secure Storage:** \`flutter_secure_storage\` for keeping auth tokens safe.
*   **Responsive Design:** Adaptive layouts for various screen sizes.
  `
};

export default features;
