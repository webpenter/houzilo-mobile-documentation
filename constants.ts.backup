
import {
  Book,
  Settings,
  Wrench,
  Terminal,
  HelpCircle,
  ShieldCheck,
  Clock,
  Smartphone,
  Play,
  ExternalLink,
  Zap
} from 'lucide-react';
import { DocsContent } from './types';

export const DOCS_CONTENT: DocsContent = {
  getting_started: {
    title: "Getting Started",
    icon: Book,
    tags: ["welcome", "overview", "stack"],
    content: `
# Welcome to BookHere v3.0.1

Thank you for choosing BookHere, the premium property rental mobile application. This documentation will guide you through setting up your own marketplace.

### 📦 What's in the Box?
- **Mobile App Source:** Full React Native (Expo) project.
- **Homey Connector:** A custom WordPress plugin to bridge your app with the Homey Theme.
- **Documentation:** Comprehensive guides for every step of the journey.

### 🛠 Technology Stack
- **Framework:** React Native 0.79.5 (Expo SDK 53)
- **Language:** TypeScript 5.8.3
- **UI:** React Native Paper & Custom Components
- **Navigation:** React Navigation 6.x

### Key Features
- **Real-time Bookings:** Instant synchronization with WordPress backend.
- **Multi-Vendor Support:** Host profiles, property management, and dashboard.
- **Payment Integration:** Stripe-ready checkout with support for deposits.
- **Advanced Search:** Filter by date, guest count, and custom taxonomies.
    `
  },
  features: {
    title: "Features",
    icon: Zap,
    tags: ["capabilities", "functionality", "highlights"],
    content: `
# BookHere Mobile App - Complete Features Guide

Comprehensive documentation of all features, functions, and capabilities in the BookHere property rental mobile application.

## Table of Contents

1. [App Overview](#app-overview)
2. [User Roles & Permissions](#user-roles--permissions)
3. [Authentication & Security](#authentication--security)
4. [Property Browsing & Discovery](#property-browsing--discovery)
5. [Booking & Reservations](#booking--reservations)
6. [Payment System](#payment-system)
7. [Messaging & Communication](#messaging--communication)
8. [Property Management (Hosts)](#property-management-hosts)
9. [Financial Management](#financial-management)
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

BookHere is a full-featured peer-to-peer property rental mobile application built with React Native and Expo. It connects property owners (hosts) with travelers (renters) looking for accommodations worldwide.

**Platform Support:**
- iOS 13.0 or later
- Android 6.0 or later

**Backend Integration:**
- WordPress with Homey theme
- RESTful API endpoints
- JWT authentication

**Current Version:** 3.0.1

---

## User Roles & Permissions

### 1. Guest User (Unauthenticated)

**Capabilities:**
- ✅ Browse all property listings
- ✅ View property details
- ✅ Search and filter properties
- ✅ View property location on map
- ✅ Read reviews and ratings
- ✅ View trending destinations
- ❌ Cannot book properties (must login)
- ❌ Cannot message hosts
- ❌ Cannot save favorites

**Access Level:** Read-only access to public content

### 2. Renter (homey_renter)

**All Guest capabilities plus:**
- ✅ Create bookings and reservations
- ✅ Instant booking (no host approval needed)
- ✅ Request to book (requires host approval)
- ✅ Make payments via multiple methods
- ✅ View and manage reservations
- ✅ Access invoices and payment history
- ✅ Message hosts and property owners
- ✅ Save favorite properties
- ✅ Leave reviews and ratings
- ✅ Manage user profile
- ✅ Receive push notifications

**Access Level:** Full renter functionality

### 3. Host (homey_host)

**All Renter capabilities plus:**
- ✅ Add new property listings
- ✅ Manage existing listings
- ✅ Edit listing details
- ✅ Set pricing and availability
- ✅ Approve or decline booking requests
- ✅ View earnings dashboard
- ✅ Request payouts
- ✅ Manage reservations
- ✅ Upload property photos and videos
- ✅ Set house rules and policies
- ✅ View host performance metrics

**Access Level:** Full platform access

### 4. Administrator (administrator)

**All Host capabilities plus:**
- ✅ System-wide management
- ✅ Access to all features

**Access Level:** Complete system access

---

## Authentication & Security

### Authentication Methods

#### 1. Email & Password Authentication

**Location:** \`Login\` and \`SignUp\` screens

**Signup Process:**
1. User enters:
   - Email address
   - Password (minimum 6 characters)
   - Confirm password
   - Role selection (Renter or Host)
2. System validates email format
3. Password strength validation
4. Role selection stored
5. Account created in database
6. JWT token generated and stored securely
7. User redirected to home screen

**Login Process:**
1. User enters email and password
2. Credentials validated against database
3. JWT token generated on success
4. Token stored in encrypted SecureStore
5. User data cached locally
6. Navigation to main app

**Features:**
- Show/hide password toggle
- "Remember me" functionality
- Input validation with error messages
- Secure password hashing (backend)

**API Endpoints:**
- \`POST /wp-json/jwt-auth/v1/token/register\` - Register new user
- \`POST /wp-json/jwt-auth/v1/token\` - Login with credentials

#### 2. Google Sign-In

**Location:** Login and Signup screens

**Process:**
1. User taps "Sign in with Google" button
2. Google OAuth dialog appears
3. User selects Google account
4. Authorization granted
5. System receives:
   - Google ID token
   - User email
   - User name
   - Profile photo URL
6. Auto-creates account if new user
7. Logs in existing user
8. JWT token stored securely

**Features:**
- One-tap authentication
- Automatic account creation
- Profile photo sync
- Seamless integration

**Configuration:**
- iOS Client ID: From \`.env\` file
- Web Client ID: From \`.env\` file
- Offline access support

**Implementation:**
- Uses \`@react-native-google-signin/google-signin\` package
- OAuth 2.0 protocol
- Secure token exchange

#### 3. OTP (One-Time Password) Verification

**Location:** OTP screens in auth flow

**Two-Step Process:**

**Step 1: Phone Number Entry**
- User enters mobile phone number
- Country code selection
- Phone format validation
- "Send OTP" button

**Step 2: OTP Verification**
- 6-digit OTP code sent via SMS
- User enters received code
- Code verified against backend
- Account verified on success
- Option to resend OTP (60s cooldown)

**API Endpoints:**
- \`POST /wp-json/mobile-otp/v1/send-otp\` - Send OTP to phone
- \`POST /wp-json/mobile-otp/v1/verify-otp\` - Verify OTP code

**Features:**
- SMS-based verification
- Resend OTP functionality
- Timer countdown
- Auto-fill OTP (iOS)

#### 4. Biometric Authentication

**Location:** Login screen (after first login)

**Supported Methods:**
- Face ID (iOS)
- Touch ID (iOS)
- Fingerprint scanner (Android)
- Device PIN (fallback)

**Process:**
1. User enables biometrics in settings
2. On next login, biometric prompt appears
3. User authenticates with face/fingerprint
4. Stored credentials retrieved from SecureStore
5. Auto-login without entering password

**Features:**
- Device-specific security
- No password storage on device
- Fallback to PIN/pattern
- Optional feature (can be disabled)

**Implementation:**
- Uses \`expo-local-authentication\` package
- Hardware security module integration
- Encrypted credential storage

### Security Features

**Data Encryption:**
- All API communication over HTTPS/TLS
- JWT tokens encrypted in SecureStore
- AES-256 encryption for local data
- No plain-text password storage

**Session Management:**
- JWT token expiration handling
- Automatic token refresh
- Logout on token invalidation
- Session timeout after inactivity

**API Security:**
- Bearer token authorization
- User ID verification
- Role-based access control
- Request rate limiting

**Secure Storage:**
- Expo SecureStore for sensitive data
- iOS: Keychain integration
- Android: EncryptedSharedPreferences
- Data cleared on logout

---

## Property Browsing & Discovery

### Home Screen

**Location:** Main tab → Home

**Components:**

1. **Search Bar**
   - Location search (city, area, address)
   - Date picker (check-in/check-out)
   - Guest counter
   - Search button

2. **Featured Banners**
   - Promotional slides
   - Special offers
   - Featured destinations
   - Auto-scrolling carousel

3. **Property Categories**
   - Apartments
   - Houses
   - Villas
   - Hotels
   - Unique stays
   - Quick filter buttons

4. **Trending Listings**
   - Popular properties
   - Recently viewed
   - Horizontal scrollable list
   - Quick preview cards

5. **City Categories**
   - Browse by location
   - Popular cities
   - Destination categories
   - Image-based navigation

6. **Testimonials**
   - User reviews carousel
   - 5-star ratings
   - Guest experiences
   - Auto-rotating display

7. **Partner Listings**
   - Verified properties
   - Premium listings
   - Special partnerships
   - Featured hosts

**API Endpoints:**
- \`GET /wp-json/jwt-auth/v1/get-all-listings\` - Fetch all listings
- \`GET /wp-json/jwt-auth/v1/listing/get_trending\` - Get trending properties
- \`GET /wp-json/jwt-auth/v1/categories\` - Fetch property categories

### Search & Filters

**Location:** Search Result screen

**Search Capabilities:**

1. **Location Search**
   - City/area name
   - Address search
   - GPS-based "Near me"
   - Map-based search

2. **Date Selection**
   - Check-in date
   - Check-out date
   - Calendar picker
   - Date range validation
   - Minimum stay enforcement

3. **Guest Selection**
   - Adults count
   - Children count
   - Infants count
   - Pet allowance

4. **Price Filter**
   - Minimum price slider
   - Maximum price slider
   - Currency display
   - Price per night

5. **Property Type**
   - Apartment
   - House
   - Villa
   - Hotel
   - Unique stays
   - Multiple selection

6. **Amenities Filter**
   - WiFi
   - Kitchen
   - Parking
   - Pool
   - Air conditioning
   - Washer/dryer
   - Gym
   - Hot tub
   - Multiple selection

7. **Instant Book**
   - Filter properties with instant booking
   - Skip approval process
   - Immediate confirmation

8. **Rating Filter**
   - 4+ stars
   - 4.5+ stars
   - 5 stars only

9. **Accommodation**
   - Bedrooms count
   - Bathrooms count
   - Beds count

**View Options:**
- List view
- Grid view
- Map view
- Gallery view

**Sorting:**
- Price: Low to High
- Price: High to Low
- Rating: High to Low
- Newest first
- Most popular

**API Endpoints:**
- \`POST /wp-json/jwt-auth/v1/search/search_availability\` - Search with filters
- \`POST /wp-json/jwt-auth/v1/filter-listings\` - Apply filters
- \`GET /wp-json/jwt-auth/v1/search/homey_half_map\` - Map search

### Property Detail Screen

**Location:** Tap on any property card

**Sections:**

1. **Property Header**
   - Property name
   - Location address
   - Rating stars
   - Number of reviews
   - Price per night
   - Favorite button

2. **Image Gallery**
   - Multiple property photos
   - Swipeable carousel
   - Full-screen view
   - Zoom capability
   - Photo count indicator

3. **Video Section** (if available)
   - Property video tour
   - Video player controls
   - Full-screen option

4. **Quick Stats**
   - Number of guests
   - Number of bedrooms
   - Number of bathrooms
   - Number of beds
   - Property size (sq ft)

5. **Property Type Card**
   - Type (Apartment, House, etc.)
   - Listing type (Entire place, Private room, Shared room)
   - Property category

6. **About Section**
   - Detailed description
   - Property highlights
   - Neighborhood information
   - House rules preview
   - "Read more" expansion

7. **Amenities Grid**
   - Categorized amenities
   - Icons and labels
   - "Show all" button
   - Popular amenities first

8. **Accommodations**
   - Bedroom details
   - Bed configurations
   - Bathroom details
   - Maximum capacity

9. **Availability Calendar**
   - Monthly calendar view
   - Available/unavailable dates
   - Price variations
   - Minimum stay indicator
   - Booking date selection

10. **Pricing Details**
    - Base price per night
    - Cleaning fee
    - Service fee
    - Taxes
    - Total calculation
    - Discounts (if any)

11. **Custom Period Pricing** (if applicable)
    - Seasonal rates
    - Holiday pricing
    - Weekly/monthly discounts

12. **Policies**
    - Cancellation policy
    - Check-in time
    - Check-out time
    - House rules
    - Additional rules

13. **Location Map**
    - Interactive map
    - Property marker
    - Nearby attractions
    - Public transport
    - "Get directions" button

14. **Reviews Section**
    - Overall rating
    - Category ratings:
      - Cleanliness
      - Accuracy
      - Communication
      - Location
      - Check-in
      - Value
    - Individual reviews
    - Guest photos
    - Response from host
    - "Show all reviews" button

15. **Host Information**
    - Host name
    - Host photo
    - Join date
    - Verification badges
    - Response time
    - Response rate
    - Host languages
    - "Contact host" button

16. **Terms and Rules**
    - Terms of service
    - Booking conditions
    - Liability disclaimer

**Sticky Footer:**
- Price per night
- "Book Now" button
- "Request to Book" button
- "Contact Host" button
- Always visible during scroll

**API Endpoints:**
- \`GET /wp-json/jwt-auth/v1/listing/list_detail?list_id=\${id}\` - Get property details
- \`GET /wp-json/jwt-auth/v1/listing/get_reviews?listing_id=\${id}\` - Get reviews
- \`POST /wp-json/jwt-auth/v1/listing/favorite\` - Add to favorites

---

## Booking & Reservations

### Booking Types

#### 1. Instant Booking

**What it is:**
- Book immediately without host approval
- Instant confirmation
- Faster booking process

**How it works:**
1. Select dates on property detail screen
2. Review pricing breakdown
3. Tap "Book Now" button
4. Select payment method
5. Complete payment
6. Receive instant confirmation
7. Booking added to reservations

**Requirements:**
- Property must have instant booking enabled
- Dates must be available
- Payment must be successful

**Benefits:**
- Immediate confirmation
- No waiting for host approval
- Guaranteed booking

**API Endpoint:**
- \`POST /wp-json/jwt-auth/v1/booking/instant_booking\`

**Request Data:**
- Listing ID
- User ID
- Check-in date
- Check-out date
- Number of guests
- Total price
- Payment method

#### 2. Request to Book

**What it is:**
- Send booking request to host
- Host can approve or decline
- 24-hour response window

**How it works:**
1. Select dates on property detail screen
2. Tap "Request to Book" button
3. Fill in request details:
   - Trip purpose
   - Special requests
   - Message to host
4. Submit request
5. Wait for host response
6. If approved, proceed to payment
7. If declined, search other properties

**Host Actions:**
- "Approve request" → "Renter gets notification" → "Payment required"
- "Decline request" → "Renter gets notification" → "No charge"

**Timeout:**
- Request expires after 24 hours
- Auto-declined if no response

**API Endpoint:**
- \`POST /wp-json/jwt-auth/v1/booking/booking_request\`

### Reservation Management

**Location:** Reservations tab (bottom navigation)

**Sections:**

1. **Upcoming Reservations**
   - Future bookings
   - Check-in countdown
   - Trip details
   - Quick actions

2. **Past Reservations**
   - Completed stays
   - Historical bookings
   - Leave review option
   - Rebook option

3. **Pending Requests**
   - Requests awaiting approval
   - Request status
   - Time remaining
   - Cancel request option

4. **Cancelled Reservations**
   - Cancelled bookings
   - Cancellation reason
   - Refund status
   - Cancellation date

**Filters:**
- All
- Upcoming
- Pending
- Past
- Cancelled

**Reservation Card Details:**
- Property photo
- Property name
- Check-in date
- Check-out date
- Number of nights
- Total price
- Booking status
- Reservation ID

**Reservation Actions:**

**For Upcoming:**
- View details
- Contact host
- Cancel reservation (with policy)
- Get directions
- View itinerary

**For Past:**
- View details
- Leave review
- View invoice
- Rebook property

**For Pending:**
- View request details
- Contact host
- Cancel request
- Edit request

**API Endpoints:**
- \`GET /wp-json/jwt-auth/v1/profile/rservation?user_id=\${id}\` - Get all reservations
- \`POST /wp-json/jwt-auth/v1/profile/cancelled_reservation\` - Cancel reservation

### Reservation Detail Screen

**Accessed by:** Tap on any reservation card

**Information Displayed:**

1. **Header**
   - Property name
   - Reservation status badge
   - Booking ID

2. **Property Image**
   - Main property photo
   - "View property" link

3. **Trip Details**
   - Check-in date and time
   - Check-out date and time
   - Number of nights
   - Number of guests
   - Special requests

4. **Guest Information** (for hosts)
   - Guest name
   - Guest photo
   - Contact information
   - Number of previous trips

5. **Host Information** (for renters)
   - Host name
   - Host photo
   - Contact information
   - Host rating

6. **Address & Location**
   - Full address
   - Map view
   - "Get directions" button
   - GPS coordinates

7. **Pricing Breakdown**
   - Base price × nights
   - Cleaning fee
   - Service fee
   - Taxes
   - Total paid
   - Payment method

8. **Payment Status**
   - Paid amount
   - Refund status (if cancelled)
   - Payment date
   - Invoice link

9. **Cancellation Policy**
   - Policy type
   - Refund details
   - Cancellation deadline
   - Terms and conditions

10. **Quick Actions**
    - Message host/guest
    - Call host/guest
    - Get directions
    - View invoice
    - Cancel reservation
    - Report issue

**For Hosts - Additional Actions:**
- Confirm reservation
- Decline reservation
- View guest profile
- Send pre-arrival instructions

**API Endpoints:**
- \`GET /wp-json/jwt-auth/v1/profile/reservation_detail?reservation_id=\${id}\` - Get reservation details
- \`POST /wp-json/jwt-auth/v1/profile/confirm_reservation\` - Confirm reservation (host)
- \`POST /wp-json/jwt-auth/v1/profile/decline_reservation\` - Decline reservation (host)

### Cancellation Policy

**Policy Types:**

1. **Flexible**
   - Full refund if cancelled 24 hours before check-in
   - 50% refund if cancelled within 24 hours
   - No refund after check-in

2. **Moderate**
   - Full refund if cancelled 5 days before check-in
   - 50% refund if cancelled within 5 days
   - No refund after check-in

3. **Strict**
   - Full refund if cancelled 14 days before check-in
   - 50% refund if cancelled 7 days before
   - No refund within 7 days or after check-in

4. **Non-Refundable**
   - No refund for any cancellation
   - Lowest prices
   - Best for flexible travelers

**Cancellation Process:**
1. Navigate to reservation detail
2. Tap "Cancel Reservation"
3. Select cancellation reason
4. Review refund amount
5. Confirm cancellation
6. Refund processed within 5-10 business days

---

## Payment System

### Payment Methods

#### 1. Stripe Integration

**Supported Payment Types:**
- Credit cards (Visa, Mastercard, Amex, Discover)
- Debit cards
- Apple Pay (iOS)
- Google Pay (Android)

**Features:**
- PCI-DSS compliant
- 3D Secure authentication
- Saved payment methods
- Instant payment confirmation
- Automatic refunds

**Implementation:**
- Uses \`@stripe/stripe-react-native\` SDK
  - Lazy initialization(loaded on - demand)
    - Payment sheet UI
      - Secure token handling

        ** Payment Flow:**
          1. User selects payment method
2. Stripe SDK initializes
3. Payment sheet appears
4. User enters card details
5. Card validation and tokenization
6. Payment intent created
7. Payment processed
8. Confirmation received

  ** Security:**
    - No card data stored on device
      - Tokenized transactions
        - PCI compliance
          - Fraud detection

            ** Configuration:**
              - Publishable key from backend
                - Merchant identifier: \`merchant.identifier\`
                  - URL scheme: \`webpenter\`

                    ** API Endpoints:**
                      - \`GET /wp-json/jwt-auth/v1/token/stripe_pub\` - Get publishable key
                        - \`POST /wp-json/jwt-auth/v1/token/stripe\` - Create payment intent
                          - \`POST /wp-json/jwt-auth/v1/after-payment\` - Confirm payment

#### 2. PayPal Integration

  ** Features:**
    - PayPal account payments
      - PayPal Credit
        - Guest checkout
          - Buyer protection

            ** Payment Flow:**
              1. User selects PayPal
2. PayPal SDK opens
3. User logs into PayPal
4. Reviews payment details
5. Approves payment
6. Returns to app
7. Payment confirmed

  ** API Endpoints:**
    - \`POST /wp-json/jwt-auth/v1/token/paypal_data\` - Get PayPal config
      - \`POST /wp-json/jwt-auth/v1/after-payment\` - Confirm PayPal payment

#### 3. ThaiQR Code Payments

  ** What it is:**
    - Local Thai payment method
      - QR code scanning
        - Bank transfer via mobile banking

          ** How it works:**
            1. User selects ThaiQR
2. QR code generated with payment details
3. User scans QR with banking app
4. Completes payment in banking app
5. Returns to BookHere app
6. Payment verified

  ** Supported Banks:**
    - All major Thai banks
      - PromptPay network
        - Instant transfer

#### 4. Bank Transfer

  ** Features:**
    - Direct bank transfer
      - Manual verification
        - Bank details provided
          - Proof of payment upload

            ** Process:**
              1. User selects bank transfer
2. Bank details displayed
3. User transfers money
4. Upload proof of payment
5. Host verifies payment
6. Reservation confirmed

### Payment Process

  ** Step-by-Step:**

    1. ** Booking Initiation **
      - Select property and dates
        - Review pricing breakdown
          - Proceed to payment

2. ** Payment Method Selection **
  - Choose from available methods
    - Stripe, PayPal, ThaiQR, or Bank Transfer

3. ** Payment Details **
  - Enter payment information
    - Save for future use(optional)
      - Apply promo code(if available)

  4. ** Payment Confirmation **
    - Review total amount
      - Confirm payment
        - Processing indicator

5. ** Payment Processing **
  - Payment gateway processes transaction
    - Backend records payment
      - Booking status updated

6. ** Confirmation **
  - Success message displayed
    - Confirmation email sent
      - Booking added to reservations
        - Invoice generated

          ** Pricing Breakdown:**
            \`\`\`Pricing Breakdown
Base price:        $100 × 3 nights = $300
Cleaning fee:                         $50
Service fee:                          $30
Taxes:                                $38
────────────────────────────────────────
Total:                               $418
\`\`\`

            ** Fees Explained:**
- ** Base Price:** Per - night rate set by host
  - ** Cleaning Fee:** One - time cleaning charge
    - ** Service Fee:** Platform commission(10 - 15 %)
      - ** Taxes:** Local taxes and VAT

        ** Payment Security:**
          - Encrypted transactions
            - PCI - DSS compliance
              - Fraud detection
                - Chargeback protection
                  - Secure payment storage

---

## Messaging & Communication

### Chat System

  ** Location:** Messages tab (bottom navigation)

    ** Features:**

      1. ** Conversation List **
        - All conversations
          - Unread message count
            - Last message preview
              - Timestamp
              - User avatar
                - Online status indicator

2. ** Search Conversations **
  - Search by name
    - Filter conversations
      - Quick access

3. ** New Message **
  - Start new conversation
    - User search
      - Property inquiry

        ** Chat Interface:**

          1. ** Chat Header **
            - Contact name
              - Online status
                - Profile photo
                  - "i" info button
                    - Call / video buttons (future)

2. ** Message Display **
  - Chronological order
    - Sent messages (right)
      - Received messages (left)
        - Message timestamp
          - Read receipts
            - Delivery status

3. ** Message Composition **
  - Text input field
    - Attachment button
      - Photo / video picker
        - Voice message recorder
          - Send button

4. ** Rich Media **
  - Photo sharing
    - Video sharing
      - File attachments
        - Voice messages
          - Location sharing

            ** Message Types:**

              1. ** Text Messages **
                - Plain text
                  - Emojis
                    - URLs (auto-detected)
                      - Mentions

2. ** Media Messages **
  - Photos(up to 10MB)
  - Videos(up to 50MB)
  - Documents(PDF, DOC, etc.)
  - Compressed for transfer

3. ** Voice Messages **
  - Record audio
    - Maximum 2 minutes
      - Playback in -app
      - Waveform visualization

4. ** System Messages **
  - Booking confirmations
    - Payment notifications
      - Status updates
        - Automated messages

          ** Features:**

- ** Real - time Messaging:** Instant message delivery
  - ** Push Notifications:** New message alerts
    - ** Typing Indicators:** See when other person is typing
      - ** Message Status:**
        - Sent(one check)
        - Delivered(two checks)
        - Read(two blue checks)
        - ** Message Threading:** Organized conversations
          - ** Search Messages:** Find past messages
            - ** Delete Messages:** Remove sent messages
              - ** Block User:** Report and block

                ** Context - Based Messaging:**

                  1. ** Property Inquiry **
                    - Message from property detail screen
                      - Property details included
                        - Inquiry template
                          - Quick responses

2. ** Booking Communication **
  - Message linked to booking
    - Booking reference included
      - Check -in instructions
      - Special requests

3. ** Post - Booking **
  - Check-in confirmation
  - Issues reporting
    - Review reminders

      ** API Endpoints:**
        - \`GET /wp-json/jwt-auth/v1/listing/message?user_id=\${uid}\` - Get conversations
          - \`GET /wp-json/jwt-auth/v1/messages/thread_messages?thread_id=\${id}\` - Get messages
            - \`POST /wp-json/jwt-auth/v1/messages/send_message\` - Send message
              - \`POST /wp-json/jwt-auth/v1/messages/upload_media\` - Upload media

                ** Message Delivery:**
                  - Sent to backend immediately
                    - Stored in database
                    - Push notification sent to recipient
                      - Delivered when recipient online
                        - Cached locally for offline access

---

## Property Management (Hosts)

### Add New Listing

  ** Location:** "More" → "Add New Listing"

    ** Process:** 11 - step wizard

#### Step 1: Property Basics

  ** Information:**
    - Property Title (required)
      - Property Type:
        - Apartment
          - House
            - Villa
              - Hotel
                - Unique stay
                  - Condo
                    - Townhouse
                      - Guest house
                        - Listing type:
                          - Entire place
                            - Private room
                              - Shared room
                                - Property description(min 50 characters)

        ** Fields:**
          - Text input for title
            - Dropdown for property type  
              - Radio buttons for listing type
                - Multiline text area for description

#### Step 2: Location Details

  ** Information:**
    - Country (dropdown)
      - State / Province (dropdown)
        - City (text input)
          - Address (text input)
            - Zip / Postal code
              - Neighborhood (optional)
                - GPS coordinates (optional)

        ** Interactive Map:**
          - Drag marker to exact location
            - Auto - detect current location
              - Search by address
                - Zoom controls
                  - Save coordinates

#### Step 3: Media Upload

  ** Photo Upload:**
    - Minimum 5 photos required
      - Maximum 50 photos
        - Supported formats: JPG, PNG
          - Maximum size: 10MB per photo
            - Drag to reorder
              - Set cover photo

                ** Video Upload (Optional):**
                  - Property tour video
                    - Maximum 100MB
                      - Supported formats: MP4, MOV
                        - Thumbnail selection

                          ** Gallery Management:**
                            - Add photos from:
- Camera
  - Photo library
    - Cloud storage
      - Edit photos:
- Crop
  - Rotate
  - Adjust brightness
    - Delete photos
      - Reorder gallery

#### Step 4: Amenities & Features

  ** Categories:**

** 1. Essentials:**
  - WiFi (speed selection)
  - Air conditioning
    - Heating
    - Kitchen or kitchenette
      - TV
      - Iron
      - Hair dryer
        - Workspace

        ** 2. Safety:**
          - Smoke detector
            - Carbon monoxide detector
              - Fire extinguisher
                - First aid kit
                  - Emergency exit
                    - Security cameras(disclosed)

                      ** 3. Facilities:**
                        - Free parking
                          - Gym
                          - Pool
                          - Hot tub
                            - BBQ grill
                              - Patio / balcony
                              - Garden
                              - Beach access

                                ** 4. Entertainment:**
                                  - Cable / satellite TV
                                    - Netflix / streaming
                                    - Game console
                                      - Board games
                                        - Books

                                        ** 5. Family:**
                                          - Crib
                                          - High chair
                                            - Baby bath
                                              - Children's books/toys
                                                - Baby monitor
                                                  - Outlet covers

                                                    ** 6. Accessibility:**
                                                      - Step - free entrance
                                                        - Wide doorways
                                                          - Accessible bathroom
                                                            - Elevator access
                                                              - Grab bars

                                                                ** Selection:**
                                                                  - Checkbox selection
                                                                    - "Select all" option
                                                                      - Category filters
                                                                        - Search amenities

#### Step 5: Accommodations

  ** Guest Capacity:**
    - Maximum guests (number picker)
      - Maximum adults
        - Maximum children
          - Maximum infants
            - Pet allowance

              ** Sleeping Arrangements:**

** Bedrooms(add multiple):**
  - Bedroom 1:
- Bed Type (King, Queen, Double, Single)
  - Number of beds
    - Bedroom 2: (same)
      - Add more bedrooms

        ** Bathrooms:**
          - Number of bathrooms
            - Full bathrooms
              - Half bathrooms
                - Private vs shared

                  ** Additional Spaces:**
                    - Living room
                      - Dining room
                        - Kitchen
                        - Workspace
                        - Laundry room

#### Step 6: Pricing Details

  ** Base Pricing:**
    - Price per night (required)
      - Currency selection
        - Weekend pricing (optional)
          - Monthly discount(%)
            - Weekly discount(%)

              ** Additional Fees:**
                - Cleaning fee (one - time)
                  - Extra guest fee (per person)
                    - Security deposit (optional)

                      ** Custom Periods:**
                        - Add seasonal rates
                          - Holiday pricing
                            - Special event pricing
                              - Start and end dates
                                - Custom price

                                  ** Pricing Rules:**
                                    - Minimum nights stay
                                      - Maximum nights stay
                                        - Preparation time (days between bookings)

#### Step 7: Availability

  ** Calendar Settings:**
    - Available from (date)
      - Available until (date)
        - Block specific dates
          - Set as unavailable

          ** Booking Settings:**
            - Minimum advance notice
              - Maximum advance notice
                - Booking window
                  - Check-in cutoff time

                    ** Calendar Sync:** (future feature)
- Import from Airbnb
  - Import from Booking.com
    - Export to other platforms

#### Step 8: Policies & Rules

  ** House Rules:**
    - No smoking (toggle)
      - No pets (toggle)
        - No parties / events (toggle)
          - No children (toggle)
            - Quiet hours (time range)
              - Custom rules (text input)

                ** Check-in/Check-out:**
                - Check-in from (time)
                - Check-in until (time)
                - Check-out time
                  - Self check-in available
                    - Lockbox / keypad code

                      ** Cancellation Policy:**
                        - Flexible
                        - Moderate
                        - Strict
                        - Non - refundable

                        ** Additional Policies:**
                          - Smoking policy
                            - Pet policy
                              - Party / event policy
                                - Children policy
                                  - Additional rules text

#### Step 9: Terms & Conditions

  ** Agreement:**
    - Host terms checkbox
      - Listing agreement checkbox
        - Liability waiver checkbox
          - Read terms link

#### Step 10: Review & Publish

  ** Summary Display:**
    - Property title
      - Location
      - Price
      - Photos(count)
      - Amenities(count)
      - All entered information

        ** Actions:**
          - Preview listing(as guests see it)
            - Edit any section
              - Save as draft
              - Publish listing

                ** Validation:**
                  - Required fields check
                    - Photo minimum check
                      - Description minimum length
                        - Pricing validation

#### Step 11: Success

  ** Confirmation:**
    - Listing published successfully
      - Listing ID
        - Share listing
          - View listing
            - Manage listing

              ** Next Steps:**
                - Add more photos
                  - Set calendar availability
                    - Share on social media
                      - Wait for first booking

                        ** API Endpoint:**
                          - \`POST /wp-json/jwt-auth/v1/submit-listing\` - Submit new listing

### Manage Listings

  ** Location:** More → My Listings

    ** Listing Dashboard:**

** List View:**
  - All hosted properties
    - Property photo
      - Property title
        - Location
        - Price per night
          - Status badge:
- Active
  - Inactive
  - Pending approval
    - Draft

    ** Actions per Listing:**
      - Edit listing
        - View as guest
        - Duplicate listing
          - Deactivate / Activate
          - Delete listing
            - View analytics

              ** Filters:**
                - All listings
                  - Active
                  - Inactive
                  - Drafts
                  - Pending

                  ** Search:**
                    - Search by title
                      - Filter by location
                        - Sort by date created

### Edit Listing

  ** Accessible from:** "My Listings" → "Edit"

    ** Editable Sections:**
      - All 11 steps from creation
        - Edit individual sections
          - Save changes
            - Publish updates

              ** Version Control:**
                - Save as draft
                - Preview changes
                  - Revert changes
                    - Update history

                      ** Analytics:** (per listing)
- Total views
  - Total bookings
    - Revenue generated
      - Average rating
        - Booking conversion rate
          - Calendar occupancy

---

## Financial Management

### Wallet Overview

  ** Location:** "Drawer menu" → "Wallet"

    ** Dashboard Sections:**

      1. ** Balance Card **
        - Current balance
          - Pending earnings
            - Available for payout
              - Last update time

2. ** Quick Actions **
  - Request payout
    - View earnings
      - View payouts history
        - Add payout method

3. ** Earnings Summary **
  - This month
    - Last month
      - This year
        - All time
          - Visual graphs

### Earnings

  ** Location:** "Wallet" → "Earnings tab"

    ** Display:**
      - Earnings list
        - Chronological order
          - Filter by:
- All time
  - This year
    - This month
      - Custom date range

        ** Earning Card Details:**
          - Booking ID
            - Property name
              - Guest name
                - Check-in date
                - Check-out date
                  - Nights count
                    - Gross amount
                      - Platform fee
                        - Net earnings
                          - Payout status

                            ** Earnings Breakdown:**
                              \`\`\`Earnings Breakdown
Booking Amount:              $400
Service Fee (15%):           -$60
Transaction Fee:              -$5
──────────────────────────────────
Your Earnings:               $335
\`\`\`

                              ** Status Badges:**
                                - Pending (awaiting check-out)
                                - Available (ready for payout)
  - Processing (payout requested)
    - Paid (received)

    ** API Endpoints:**
      - \`GET /wp-json/jwt-auth/v1/wallet/earnings?user_id=\${id}\` - Get earnings
        - \`GET /wp-json/jwt-auth/v1/wallet/earnings_detail?booking_id=\${id}\` - Earning detail

### Payouts

  ** Location:** "Wallet" → "Payouts tab"

    ** Payout Methods:**

      1. ** Bank Transfer **
        - Bank name
          - Account number
            - Account holder name
              - Swift / BIC code
                - IBAN (for international)
  - Routing number

2. ** PayPal **
  - PayPal email address
    - Account verification

3. ** Stripe Connect ** (future)
  - Direct deposit
    - Faster transfers

      ** Request Payout:**

** Step 1: Select Amount **
  - Available balance displayed
    - Enter payout amount
      - Minimum payout: $50
        - Maximum: Full balance

          ** Step 2: Select Method **
            - Choose from saved methods
              - Or add new method

                ** Step 3: Confirm **
                  - Review details
                    - Processing time displayed
                      - Confirm payout

                        ** Step 4: Processing **
                          - Payout requested
                            - Pending admin approval
                              - Email confirmation sent

                                ** Payout Timeline:**
                                  - Request submitted
                                    - Review(1 - 2 business days)
                                    - Approved / Rejected
                                    - Transfer initiated
                                      - Received(3 - 5 business days)

                                      ** Payout History:**
                                        - All past payouts
                                          - Payout date
                                            - Amount
                                            - Method
                                            - Status
                                            - Transaction ID

                                              ** Status Types:**
                                                - Pending review
                                                  - Approved
                                                  - Processing
                                                  - Completed
                                                  - Rejected
                                                  - Cancelled

                                                  ** API Endpoints:**
                                                    - \`POST /wp-json/jwt-auth/v1/wallet/request_payout\` - Request payout
                                                      - \`GET /wp-json/jwt-auth/v1/wallet/payouts?user_id=\${id}\` - Get payout history

### Invoices

  ** Location:** Drawer menu → Invoices

    ** Invoice List:**
      - All payment invoices
        - For renters: Bookings paid
          - For hosts: Earnings received
            - Chronological order
              - Search functionality

                ** Filters:**
                  - All
                  - Paid
                  - Pending
                  - Cancelled
                  - Refunded

                  ** Invoice Card:**
                    - Invoice number
                      - Issue date
                        - Property name
                          - Amount
                          - Status badge
                            - "View" button

                              ** Invoice Detail:**

** Header:**
  - Invoice #
    - Issue date
      - Due date(if applicable)
- Status

    ** Billing Information:**
      - Bill to: Guest name and address
        - Bill from: Host / Company info
          - Payment method used

            ** Line Items:**
              \`\`\`Invoice Detail
Description          Quantity    Price    Total
────────────────────────────────────────────────
Accommodation         3 nights   $100    $300
Cleaning Fee                             $50
Service Fee                              $30
Taxes                                    $38
────────────────────────────────────────────────
                              Total:     $418
\`\`\`

              ** Payment Information:**
                - Amount paid
                  - Payment date
                    - Payment method
                      - Transaction ID

                        ** Actions:**
                          - Download PDF
                            - Share invoice
                              - Print invoice
                                - Send via email
                                  - Report issue

                                    ** PDF Generation:**
                                      - Professional format
                                        - Company logo
                                          - Complete billing details
                                            - Terms and conditions
                                              - Payment receipt

                                                ** API Endpoints:**
                                                  - \`GET /wp-json/jwt-auth/v1/invoices?user_id=\${id}\` - Get invoices
                                                    - \`GET /wp-json/jwt-auth/v1/invoice_detail?invoice_id=\${id}\` - Invoice details
                                                      - \`GET /wp-json/jwt-auth/v1/invoice_pdf?invoice_id=\${id}\` - Download PDF

---

## User Profile & Settings

### Profile Screen

  ** Location:** More → Profile

    ** Tabs:**

#### 1. Profile Tab

  ** Display Information:**
    - Profile photo
      - Full name
        - Email address
          - Phone number
            - Date joined
              - Verification badges
                - Bio / About me

                  ** Edit Profile:**
                    - Change photo
                      - Upload from gallery
                        - Take photo
                          - Remove photo
                            - Edit name
                              - Edit phone
                                - Edit bio(max 500 characters)
                                  - Add languages spoken
                                    - Add occupation
                                      - Add location

                                        ** Verification:**
                                          - Email verification badge
                                            - Phone verification badge
                                              - ID verification (future)
                                                - Trusted user badge

#### 2. Settings Tab

  ** Account Settings:**
    - Change password
      - Email preferences
        - Phone number
          - Language selection
            - Currency preference
              - Time zone

                ** Notification Settings:**
                  - Push notifications toggle
                    - Email notifications toggle
                      - SMS notifications toggle

                        ** Notification Types:**
                          - Booking confirmations
                            - Messages
                            - Payment receipts
                              - Reviews
                              - Promotions
                              - News and updates

                                ** Privacy Settings:**
                                  - Profile visibility
                                    - Show email to hosts
                                      - Show phone to hosts
                                        - Search indexing
                                          - Data sharing preferences

                                            ** Display Settings:**
                                              - Dark mode toggle
                                                - Language selection (i18n)
                                                  - Map provider (Google / OSM)
                                                    - Date format
                                                      - Distance units (km / miles)

#### 3. Bookings Tab

  ** Quick Access:**
    - Upcoming trips
      - Past trips
        - Cancelled trips
          - Favorites
          - Saved searches

            ** Booking Stats:**
              - Total trips
                - Total spent
                  - Countries visited
                    - Nights stayed

#### 4. Hosting Tab (Hosts only)

  ** Host Profile:**
    - Host since date
      - Properties hosted
        - Total bookings
          - Total earnings
            - Average rating
              - Response rate
                - Response time

                  ** Host Stats:**
                    - Active listings
                      - Upcoming reservations
                        - Completed bookings
                          - Revenue this month
                            - Occupancy rate

                              ** Host Tools:**
                                - Manage listings
                                  - Calendar management
                                    - Pricing tools
                                      - Performance metrics

#### 5. Reviews Tab

  ** Reviews About You:**
    - As a guest (reviews from hosts)
      - As a host (reviews from guests)
        - Overall rating
          - Category ratings
            - Total reviews count

              ** Review Display:**
                - Reviewer photo
                  - Reviewer name
                    - Rating stars
                      - Review text
                        - Review date
                          - Property name
                            - Your response (if added)

** Write Review:**
  - Rate cleanliness
    - Rate accuracy
      - Rate communication
        - Rate location
          - Rate check-in
            - Rate value
              - Write review text
                - Upload photos
                  - Submit review

#### 6. Account Tab

  ** Account Actions:**
    - Edit profile
      - Change password
        - Payment methods
          - Payout methods
            - Notification settings
              - Privacy settings

                ** Legal:**
                  - Terms of service
                    - Privacy policy
                      - Cookie policy
                        - Community guidelines
                          - Trust & safety

                          ** Support:**
                            - Help center
                              - Contact support
                                - Report a problem
                                  - FAQs

                                  ** Danger Zone:**
                                    - Deactivate account
                                      - Delete account

### Account Actions

  ** Change Password:**
    1. Enter current password
2. Enter new password
3. Confirm new password
4. Save changes
5. Re-login required

  ** Delete Account:**
    1. Confirm deletion request
2. Enter password
3. Acknowledge data deletion
4. 30 - day grace period
5. Permanent deletion after 30 days

  ** Deactivate Account:**
    - Temporary deactivation
      - Profile hidden
        - Listings hidden
          - Can reactivate anytime

            ** API Endpoints:**
              - \`GET /wp-json/jwt-auth/v1/profile?user_id=\${id}\` - Get profile data
                - \`POST /wp-json/jwt-auth/v1/profile/update\` - Update profile
                  - \`POST /wp-json/jwt-auth/v1/token/profile_image\` - Upload profile photo
                    - \`POST /wp-json/jwt-auth/v1/profile/change_password\` - Change password

---

## Favorites & Wishlists

### Favorites Screen

  ** Location:** "Drawer menu" → "Favourites"

    ** Features:**

** Favorites List:**
  - All saved properties
    - Grid or list view toggle
      - Quick preview
        - Remove from favorites

          ** Property Card:**
            - Property photo
              - Property title
                - Location
                - Price per night
                  - Rating stars
                    - Heart icon (filled)

                      ** Actions:**
                        - View property details
                          - Remove from favorites
                            - Share property
                              - Create wish list (future)

                                ** Organization:**
                                  - Default "Favorites" list
                                    - Create custom lists (future):
- "Dream destinations"
  - "Summer trips"
  - "Family vacations"
  - Custom names

    ** Empty State:**
      - "No favorites yet"
      - Illustration
      - "Start exploring" button
        - Browse suggestions

          ** Sync:**
            - Favorites synced across devices
              - Real - time updates
                - Persistent storage

                  ** API Endpoints:**
                    - \`GET /wp-json/jwt-auth/v1/listing/favorites?user_id=\${id}\` - Get favorites
                      - \`POST /wp-json/jwt-auth/v1/listing/favorite\` - Add / remove favorite

                        ** Toggle Favorite:**
                          - Heart icon on property cards
                            - Tap to add to favorites
                              - Tap again to remove
                                - Visual feedback (animation)
                                  - Instant sync to backend

---

## Reviews & Ratings

### Review System

  ** Two - Way Reviews:**
    - Guests review hosts / properties
      - Hosts review guests

        ** Review Components:**

#### 1. Overall Rating
  - 1 to 5 stars
    - Half - star increments
      - Required field

#### 2. Category Ratings

  ** For Properties:**
    - Cleanliness (1 - 5 stars)
    - Accuracy (1 - 5 stars)
    - Communication (1 - 5 stars)
    - Location (1 - 5 stars)
    - Check-in (1 - 5 stars)
    - Value (1 - 5 stars)

  ** For Guests:**
    - Cleanliness
    - Communication
    - House rules respect
      - Overall experience

#### 3. Written Review
  - Minimum 50 characters
    - Maximum 1000 characters
      - Text area input
        - Optional

#### 4. Photo Upload
  - Upload review photos (optional)
    - Maximum 5 photos
      - Show property condition
        - Visual evidence

### Leaving a Review

  ** Eligibility:**
    - Must have completed stay
      - Review window: 14 days after checkout
        - One review per booking
          - Cannot edit after submission

            ** Review Process:**

** Step 1: Rating **
  - Select overall rating
    - Rate each category
      - Visual star selector

        ** Step 2: Write Review **
          - Share your experience
            - Be honest and constructive
              - Follow community guidelines
                - Add photos (optional)

                  ** Step 3: Review Privacy **
                    - Choose to publish
                      - Keep private to host
                        - Publish to public

                          ** Step 4: Submit **
                            - Review submitted
                              - Both parties must review
                                - Reviews published simultaneously
                                  - Email notification sent

                                    ** Review Guidelines:**
                                      - Be honest and fair
                                        - Focus on facts
                                          - No personal attacks
                                            - No profanity
                                              - Constructive feedback
                                                - Relevant to stay

### Viewing Reviews

  ** On Property Listing:**
    - Overall rating (large display)
      - Total review count
        - Category ratings breakdown
          - Recent reviews (3 - 5)
            - "Show all reviews" button

              ** Reviews Page:**
                - All reviews chronologically
                  - Sort by:
- Most recent
  - Highest rated
    - Lowest rated
      - Most helpful
        - Filter by:
- Rating (5, 4, 3, 2, 1 stars)
  - With photos
    - Guest type (solo, family, couple)

      ** Review Card:**
        - Reviewer photo
          - Reviewer name
            - Review date
              - Rating stars
                - Review text
                  - Review photos
                    - Host response
                      - "Helpful" button
                        - "Report" button

                          ** Host Response:**
                            - Hosts can respond to reviews
                              - One response per review
                                - Maximum 500 characters
                                  - Shows publicly below review

### Review Notifications

  ** Email Notifications:**
    - New review received
      - Review reminder (3 days after checkout)
        - Review published
          - Review response received

            ** Push Notifications:**
              - New review alert
                - Review reminder
                  - Review milestone (10, 50, 100 reviews)

---

## Maps & Location

### Map Integration

  ** Provider:** Google Maps

    ** Implementation:** \`react-native-maps\` package

      ** Usage Locations:**

        1. ** Property Detail Screen **
          - Show exact property location
            - Marker on map
              - Address below map
                - "Get directions" button

2. ** Search Results - Map View **
  - Multiple property markers
    - Cluster markers(many properties)
      - Price labels on markers
        - Tap marker to see property
          - Drag / zoom to search

3. ** Add Listing - Location **
  - Interactive map picker
    - Drag marker to exact spot
      - Auto - detect current location
        - Search address
          - Save coordinates

4. ** Near Me Search **
  - Current location detection
    - Show nearby properties
      - Distance calculation
        - Sort by distance

### Map Features

  ** Interactive Elements:**
    - Pan and zoom
      - Marker clustering
        - Custom markers
          - Info windows
            - Route directions
              - Street view (future)

                ** Themes:**
                  - Light theme ( default )
                    - Dark theme ( follows app theme )
                      - Custom styling

                        ** Permissions:**
                          - Location permission requested
                            - "While using app" or "Always"
                              - GPS accuracy level
                                - Background location (optional)

                                  ** Location Services:**

** Get Current Location:**
  \`\`\`javascript
- Request permission
- Fetch GPS coordinates
- Accuracy check
- Reverse geocode to address
\`\`\`

  ** Distance Calculation:**
    \`\`\`javascript
- Calculate distance between two points
- Display in km or miles
- "X km away" labels
\`\`\`

    ** Directions:**
      - Open in Google Maps
        - Turn-by-turn navigation
          - Estimated time
            - Multiple routes

              ** API Integration:**
                - Google Maps API key from\`.env\`
                  - Maps SDK for iOS / Android
                    - Places API for search
                      - Geocoding API for addresses

                        ** Offline Maps:**
                          - Cache recently viewed areas
                            - Basic map tiles
                              - Limited functionality offline

---

## Notifications

### Push Notifications

  ** Implementation:** Expo Notifications

    ** Setup:**
      - Device token registration
        - Permission request
          - Server - side token storage
            - FCM / APNs integration

              ** Notification Types:**

#### 1. Booking Notifications

  ** For Renters:**
    - Booking confirmed
      - Booking request approved
        - Booking request declined
          - Check-in reminder (1 day before)
          - Check-out reminder (day of)
            - Booking cancelled

              ** For Hosts:**
                - New booking request
                  - Booking cancelled by guest
                    - Review reminder
                      - Payout available

#### 2. Message Notifications

  ** Real-time:**
    - New message received
      - Message delivered
        - Message read

          ** Content:**
            - Sender name
              - Message preview(first 50 chars)
                - Time received
                  - Tap to open chat

#### 3. Payment Notifications

  ** For Renters:**
    - Payment successful
      - Payment failed
        - Refund processed
          - Invoice available

            ** For Hosts:**
              - Payment received
                - Payout approved
                  - Payout transferred
                    - Payout rejected

#### 4. Review Notifications

  ** For All:**
    - New review received
      - Review reminder
        - Review response

#### 5. System Notifications

  ** Updates:**
    - App update available
      - New features announcement
        - System maintenance

          ** Promotions:**
            - Special offers
              - Discounts
              - Travel deals

### In - App Notifications

  ** Notification Center:**
    - All notifications list
      - Unread badge count
        - Notification categories
          - Mark as read
          - Clear all

            ** Notification Card:**
              - Icon / image
              - Title
              - Message
              - Timestamp
              - Action button
                - Swipe to dismiss

                  ** Real - time Updates:**
                    - WebSocket connection
                      - Instant delivery
                        - Badge updates
                          - Sound alerts
                            - Vibration

### Notification Settings

  ** Preferences:**
    - Enable / disable push notifications
      - Enable / disable email notifications
        - Enable / disable SMS (OTP only)

          ** Granular Control:**
            - Booking notifications
              - Message notifications
                - Payment notifications
                  - Review notifications
                    - Promotional notifications

                      ** Quiet Hours:**
                        - Do not disturb schedule
                          - Mute all notifications
                            - Emergency override

                              ** Delivery Method:**
                                - Push notifications
                                  - Email
                                  - SMS
                                  - In - app only

                                    ** API Endpoints:**
                                      - \`POST /wp-json/push/v1/register-token\` - Register device token
                                        - \`POST /wp-json/push/v1/send-notification\` - Send notification
                                          - \`GET /wp-json/push/v1/notifications?user_id=\${id}\` - Get notifications

---

## Multi - Language Support

### Localization(i18n)

  ** Implementation:** \`react-i18next\`

    ** Supported Languages:**
      - English(en)
      - Spanish(es)
      - French(fr)
      - German(de)
      - Italian(it)
      - Portuguese(pt)
      - Thai(th)
      - Japanese(ja)
      - Korean(ko)
      - Chinese Simplified(zh - CN)
        - Arabic(ar)

        ** Translation Scope:**

** UI Elements:**
  - All buttons and labels
    - Navigation items
      - Form placeholders
        - Error messages
          - Success messages
            - Empty states
              - Loading states

                ** Content:**
                  - Property descriptions
                    - Reviews (not translated)
                    - Messages (not translated)
                    - Static pages

                      ** Dynamic Content:**
                        - Date formatting
                          - Number formatting
                            - Currency symbols
                              - Distance units
                                - Time zones

### Language Selection

  ** Settings Location:**
    - "Profile" → "Settings" → "Language"

      ** Options:**
        - Device language (auto - detect)
          - Manual selection
            - Language list with native names

              ** Switching:**
                - Instant language switch
- No app restart required
  - Persistent across sessions

    ** Translation Features:**

** Date Localization:**
  \`\`\`
English:    Jan 15, 2026
Spanish:    15 ene 2026
French:     15 janv. 2026
\`\`\`

  ** Number Formatting:**
    \`\`\`
English:    1,234.56
German:     1.234,56
French:     1 234,56
\`\`\`

    ** Currency:**
      \`\`\`
USD: $100
EUR: €100
THB: ฿100
\`\`\`

      ** RTL Support:**
        - Right - to - left languages(Arabic)
          - Mirrored UI layout
            - Text alignment
              - Icon direction

                ** Translation Files:**
                  - Location: \`/src/localization/\`
                    - Format: JSON
                      - Structure: Nested keys
                        - Fallback to English

                          ** Example Translation:**
                            \`\`\`json
{
  "home": {
    "title": "Find your perfect stay",
    "search": "Search destinations",
    "trending": "Trending properties"
  }
}
\`\`\`

                            ** Usage in Code:**
                              \`\`\`javascript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<Text>{t('home.title')}</Text>
\`\`\`

---

## Dark Mode

### Theme System

  ** Implementation:**
    - React Context for theme state
      - Global theme provider
        - System preference detection

          ** Theme Options:**
            - Light mode
              - Dark mode
                - System default (auto)

                  ** Switching:**
                    - Profile → Settings → Display → Dark Mode
                      - Toggle switch
- Instant theme change
  - Preference saved

### Color Schemes

  ** Light Theme:**
    - Background: #FFFFFF
      - Card: #F5F5F5
        - Text: #000000
          - Border: #E0E0E0
            - Primary: #FF385C

              ** Dark Theme:**
                - Background: #121212
                  - Card: #1E1E1E
                    - Text: #FFFFFF
                      - Border: #333333
                        - Primary: #FF385C

                          ** Component Adaptation:**
                            - All screens support dark mode
                              - Text colors adjust automatically
                                - Background colors change
                                  - Border colors adapt
                                    - Map style changes
                                      - Image overlays adjust

                                        ** System Integration:**
                                          - Detects iOS / Android system theme
                                            - Auto - switches with system
                                            - Overrides available
                                              - Smooth transitions

                                                ** Benefits:**
                                                  - Reduced eye strain
                                                    - Battery saving(OLED screens)
                                                      - User preference
                                                        - Modern UI design

---

## Technical Features

### Offline Support

  ** Cached Data:**
    - Recently viewed properties
      - User profile
        - Favorites list
          - Conversations
          - Search history

            ** Offline Capabilities:**
              - Browse cached properties
                - View saved favorites
                  - Read past messages
                    - View profile

                      ** Sync on Reconnect:**
                        - Queue pending actions
                          - Upload when online
                            - Resolve conflicts
                              - Update local cache

### Performance Optimization

  ** Image Loading:**
    - Progressive loading
      - Image compression
        - Lazy loading
          - Cache management
            - Placeholder images

              ** List Rendering:**
                - FlatList virtualization
                  - Pagination
                  - Infinite scroll
                    - Pull to refresh

                      ** State Management:**
                        - Global state provider
                          - Context API
                            - Local component state
                              - Persistent storage

                                ** Navigation:**
                                  - React Navigation
                                    - Native animations
                                      - Screen preloading
                                        - Navigation persistence

### Analytics & Tracking

  ** User Analytics:**
    - Screen views
      - Button clicks
        - Search queries
          - Booking conversions
            - User flow

              ** Performance Metrics:**
                - App launch time
                  - Screen load time
                    - API response time
                      - Error rates

                        ** Business Metrics:**
                          - Total bookings
                            - Revenue
                            - User growth
                              - Property views
                                - Conversion rates

### Error Handling

  ** Error Boundary:**
    - Catches JavaScript errors
      - Prevents app crashes
        - Shows error screen
          - Log errors
            - Recovery option

              ** API Errors:**
                - Network timeout handling
                  - Retry logic
                    - Error messages
                      - Offline detection
                        - Fallback data

                          ** User Feedback:**
                            - Toast notifications
                              - Error modals
                                - Success messages
                                  - Loading indicators
                                    - Empty states

### Security Features

  ** Data Encryption:**
    - HTTPS for all API calls
      - Encrypted local storage
        - Secure token management
          - Biometric authentication

            ** Authentication:**
              - JWT tokens
                - Token refresh
                  - Session management
                    - Auto - logout

                    ** Privacy:**
                      - Data encryption
                        - Secure storage
                          - No sensitive data logs
                            - GDPR compliance

---

## API Integration

### Base Configuration

  ** Backend URL:** https://homey.webpenter.com/
** API Prefix:** \`/wp-json/jwt-auth/v1/\`

### Authentication Endpoints

  \`\`\`
POST /token                              - Login
POST /token/register                     - Register
POST /token/validate                     - Validate token
POST /token/refresh                      - Refresh token
\`\`\`

### User Endpoints

  \`\`\`
GET  /profile?user_id=\${id}              - Get user profile
POST /profile/update                     - Update profile
POST /token/profile_image                - Upload profile photo
POST /profile/change_password            - Change password
\`\`\`

### Listing Endpoints

  \`\`\`
GET  /get-all-listings                   - Get all properties
GET  /listing/list_detail?list_id=\${id}  - Property details
POST /submit-listing                     - Create listing
PUT  /listing/\${id}                      - Update listing
GET  /listing/get_trending               - Trending properties
POST /filter-listings                    - Filter properties
POST /listing/favorite                   - Add/remove favorite
GET  /listing/favorites?user_id=\${id}    - Get favorites
GET  /listing-amenity-facility           - Get amenities list
\`\`\`

### Booking Endpoints

  \`\`\`
POST /booking/instant_booking            - Instant book
POST /booking/booking_request            - Request to book
GET  /profile/rservation?user_id=\${id}   - Get reservations
POST /profile/confirm_reservation        - Confirm booking (host)
POST /profile/decline_reservation        - Decline booking (host)
POST /profile/cancelled_reservation      - Cancel booking
\`\`\`

### Payment Endpoints

  \`\`\`
GET  /token/stripe_pub                   - Get Stripe key
POST /token/stripe                       - Create payment intent
POST /token/paypal_data                  - Get PayPal config
POST /after-payment                      - Confirm payment
\`\`\`

### Messaging Endpoints

  \`\`\`
GET  /listing/message?user_id=\${id}      - Get conversations
GET  /messages/thread_messages?thread_id=\${id} - Get messages
POST /messages/send_message              - Send message
POST /messages/upload_media              - Upload media
\`\`\`

### Wallet Endpoints

  \`\`\`
GET  /wallet/earnings?user_id=\${id}      - Get earnings
GET  /wallet/payouts?user_id=\${id}       - Get payouts
POST /wallet/request_payout              - Request payout
\`\`\`

### Review Endpoints

  \`\`\`
GET  /listing/get_reviews?listing_id=\${id} - Get reviews
POST /listing/submit_review              - Submit review
POST /review/respond                     - Respond to review
\`\`\`

### Notification Endpoints

  \`\`\`
POST /push/v1/register-token             - Register device
POST /push/v1/send-notification          - Send notification
GET  /push/v1/notifications?user_id=\${id} - Get notifications
\`\`\`

---

## Dependencies

### Core Packages

  ** React Native Ecosystem:**
    - \`react-native\`: 0.77.8
      - \`react\`: 18.3.1
        - \`expo\`: ~53.0.23
          - \`typescript\`: 5.3.3

            ** Navigation:**
              - \`@react-navigation/native\`: 6.1.17
                - \`@react-navigation/stack\`: 6.3.29
                  - \`@react-navigation/bottom-tabs\`: 6.5.20
                    - \`@react-navigation/drawer\`: 6.6.15

                      ** UI Components:**
                        - \`react-native-paper\`: Material Design components
                          - \`expo-linear-gradient\`: Gradient backgrounds
                            - \`react-native-snap-carousel\`: Image carousels
                              - \`react-native-calendars\`: Calendar picker
                                - \`rn-range-slider\`: Price range slider

                                  ** Maps & Location:**
                                    - \`react-native-maps\`: 1.20.1
                                      - \`expo-location\`: 18.1.6
                                        - \`react-native-geolocation-service\`: Location services

                                          ** Authentication:**
                                            - \`@react-native-google-signin/google-signin\`: 16.1.1
                                              - \`expo-local-authentication\`: 17.0.7
                                                - \`expo-auth-session\`: 6.2.1

                                                  ** Storage:**
                                                    - \`expo-secure-store\`: 14.2.3
                                                      - \`@react-native-async-storage/async-storage\`: Async storage

                                                        ** Payments:**
                                                          - \`@stripe/stripe-react-native\`: 0.45.0
                                                            - PayPal SDK integration

                                                              ** Media:**
                                                                - \`expo-image-picker\`: 16.1.4
                                                                  - \`expo-image-manipulator\`: 14.0.7
                                                                    - \`expo-document-picker\`: 14.0.8
                                                                      - \`expo-file-system\`: 18.1.11

                                                                        ** Notifications:**
                                                                          - \`expo-notifications\`: 0.31.4
                                                                            - \`expo-device\`: 7.1.4

                                                                              ** Utilities:**
                                                                                - \`axios\`: 0.27.2
                                                                                  - \`moment\`: 2.30.1
                                                                                    - \`react-i18next\`: 15.5.1
                                                                                      - \`react-hook-form\`: 7.51.2

---

## Future Features(Roadmap)

### Planned Features

1. ** Social Features **
  - Connect with friends
  - Share trips
    - Travel together
      - Group bookings

2. ** Advanced Search **
  - AI - powered recommendations
    - Visual search
      - Voice search
        - Smart filters

3. ** Experiences **
  - Local activities
    - Tours and attractions
      - Restaurant bookings
        - Event tickets

4. ** Loyalty Program **
  - Reward points
    - Member benefits
      - Referral program
        - VIP status

5. ** Enhanced Communication **
  - Video calls
    - Voice calls
      - Translation in chat
      - Scheduled messages

6. ** Smart Home Integration **
  - Smart lock integration
    - Temperature control
      - Keyless entry
        - IoT device control

7. ** AR / VR Features **
  - Virtual property tours
    - AR room preview
      - 360° photos
        - Virtual staging

8. ** AI Assistant **
  - Chatbot support
    - Smart suggestions
      - Trip planning
        - Price predictions

---

## Support & Documentation

### Help Resources

  ** In - App Help:**
    - Profile → Help Center
      - FAQs
      - Contact support
        - Video tutorials
          - User guides

            ** External Resources:**
              - Website: https://your-website.com
- Email: support @webpenter.com
- Documentation: All.md files in \`/documentation/\`

### Reporting Issues

  ** Bug Reports:**
    - Profile → Report a Problem
      - Describe issue
        - Upload screenshots
          - Submit report

            ** Feature Requests:**
              - Contact support
                - Provide details
                  - Vote on requests

---

** Last Updated:** 2026-01 -08
  ** Version:** 3.0.1
    ** For:** BookHere Mobile App(iOS & Android)

This comprehensive guide covers all features and functions in the BookHere mobile application.For technical implementation details, see other documentation files.

---

**© 2026 WebPenter.All rights reserved.**


`
  },
  installation: {
    title: "Installation",
    icon: Terminal,
    tags: ["setup", "terminal", "wordpress"],
    content: `
# Installation Guide - BookHere Mobile App

Complete step-by-step installation guide for setting up the BookHere property rental mobile application.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [System Setup](#system-setup)
3. [Project Installation](#project-installation)
4. [Backend Setup](#backend-setup)
5. [Third-Party Services Configuration](#third-party-services-configuration)
6. [Running the App](#running-the-app)
7. [Troubleshooting](#troubleshooting)

---

## 📦 What You Need - Complete Setup Guide

**CONNECTOR PLUGIN INCLUDED!** 🎉

This package includes a **Homey connector plugin** that bridges the mobile app with Homey theme.

**What's Included in This Package:**

1. ✅ **Mobile App** (iOS & Android) - What this guide covers below
2. ✅ **Homey Connector Plugin** - Covered in [Backend Setup](#backend-setup) section

**What You Need to Purchase Separately:**
- **Homey WordPress Theme** (~$59-79 from ThemeForest)
  - Search "Homey" on ThemeForest.net
  - Provides the backend functionality (property management, bookings, etc.)
  - Our included plugin connects the mobile app to it

**What You Need to Provide:**
- WordPress 6.0+ (FREE from WordPress.org)
- Web hosting ($5-20/month for shared hosting - works perfectly)
- Domain name (optional but recommended)

**Installation Order:**

**Option A: Backend First (Recommended)**
1. Set up WordPress + Homey theme (30 mins) → [Skip to Backend Setup](#backend-setup)
2. Install our connector plugin (10 mins)
3. Install mobile app (30 mins) → Continue below
4. Total time: ~70 mins ✅

**Option B: Mobile App First**
1. Install mobile app (30 mins) → Continue below
2. Set up WordPress + Homey theme (30 mins) → [Backend Setup](#backend-setup)
3. Install connector plugin (10 mins)
4. Connect them together (10 mins)

**Quick Start Summary:**
- WordPress + Homey Theme + Our Connector Plugin = Complete solution ✅
- Connector plugin included (saves 40-80 hours of API development!) ✅
- Homey theme must be purchased separately (~$59-79) ⚠️

---

## Prerequisites

Before you begin, ensure you have the following installed on your development machine:

### Required Software

#### For All Platforms

| Software | Version | Download Link |
|----------|---------|---------------|
| Node.js | 18.x or higher | https://nodejs.org/ |
| npm | 8.x or higher | Included with Node.js |
| Git | Latest | https://git-scm.com/ |
| Code Editor | Any | VS Code recommended: https://code.visualstudio.com/ |

#### For iOS Development (macOS Only)

| Software | Version | Download Link |
|----------|---------|---------------|
| macOS | Catalina or higher | - |
| Xcode | 14.x or higher | Mac App Store |
| Xcode Command Line Tools | Latest | \`xcode- select--install\` |
| CocoaPods | Latest | \`sudo gem install cocoapods\` |

#### For Android Development

| Software | Version | Download Link |
|----------|---------|---------------|
| Android Studio | Latest | https://developer.android.com/studio |
| Android SDK | API Level 21+ | Included with Android Studio |
| JDK | 11 or higher | https://adoptium.net/ |

### Account Requirements

Create accounts on the following platforms (free unless noted):

- [ ] **Expo Account** - https://expo.dev (Free)
- [ ] **Google Cloud Platform** - https://console.cloud.google.com (Free tier available)
- [ ] **Stripe Account** - https://stripe.com (Free, transaction fees apply)
- [ ] **Apple Developer** - https://developer.apple.com ($99/year for App Store)
- [ ] **Google Play Developer** - https://play.google.com/console ($25 one-time for Play Store)

---

## System Setup

### Step 1: Install Node.js and npm

1. **Download Node.js**
   - Visit https://nodejs.org/
   - Download the LTS (Long Term Support) version
   - Run the installer and follow the prompts

2. **Verify Installation**
   \`\`\`bash
node --version
   # Should output: v18.x.x or higher

npm --version
   # Should output: 8.x.x or higher
\`\`\`

### Step 2: Install Expo CLI (Optional but Recommended)

\`\`\`bash
npm install -g expo-cli
\`\`\`

Verify installation:
\`\`\`bash
expo --version
\`\`\`

### Step 3: Install EAS CLI (For Building)

\`\`\`bash
npm install -g eas-cli
\`\`\`

Verify installation:
\`\`\`bash
eas --version
\`\`\`

### Step 4: iOS Setup (macOS Only)

1. **Install Xcode**
   - Open Mac App Store
   - Search for "Xcode"
   - Click "Get" and wait for installation (large download, ~10GB)

2. **Install Xcode Command Line Tools**
\`\`\`bash
xcode-select --install
\`\`\`

3. **Install CocoaPods**
\`\`\`bash
sudo gem install cocoapods
\`\`\`

4. **Accept Xcode License**
\`\`\`bash
sudo xcodebuild -license accept
\`\`\`

### Step 5: Android Setup

1. **Install Android Studio**
   - Download from https://developer.android.com/studio
   - Run the installer
   - Follow the setup wizard
   - Install the Android SDK, Android SDK Platform, and Android Virtual Device

2. **Set Environment Variables**

   **On macOS/Linux** - Add to \`~/.bash_profile\` or \`~/.zshrc\`:
   \`\`\`bash
   export ANDROID_HOME = $HOME / Library / Android / sdk
   export PATH = $PATH: $ANDROID_HOME/emulator
   export PATH = $PATH: $ANDROID_HOME/platform-tools
  \`\`\`

   **On Windows** - Add to System Environment Variables:
   \`\`\`bash
ANDROID_HOME = C: \Users\YourUsername\AppData\Local\Android\Sdk
  \`\`\`

3. **Reload Environment**
   \`\`\`bash
   source ~/.zshrc  # or source ~/.bash_profile
  \`\`\`

4. **Verify Android Setup**
   \`\`\`bash
adb --version
  \`\`\`

---

## Project Installation

### Step 1: Extract the Package

\`\`\`bash
# Navigate to your projects directory
cd ~/Projects

# Extract the downloaded zip file
unzip bookhere-mobile-app.zip

# Navigate to the project folder
cd bookhere-mobile-app
  \`\`\`

### Step 2: Install Dependencies

\`\`\`bash
# Using npm
npm install

# OR using Yarn (if you prefer)
yarn install
  \`\`\`

This will install all required packages from \`package.json\`. The installation may take 5-10 minutes depending on your internet connection.

### Step 3: Create Environment File

Create a \`.env\` file in the root directory:

\`\`\`bash
# Copy the example file
cp .env.example .env

# OR create a new file
touch .env
  \`\`\`

Edit \`.env\` and add your configuration:

\`\`\`env
# Google OAuth Configuration
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID = your_ios_client_id_here
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID = your_web_client_id_here
\`\`\`

**Note:** We'll configure these values in the next section.

### Step 4: Configure API URL

Open \`src/ApiUrl.js\` and update the API URL:

\`\`\`javascript
export default {
  api_url: "https://your-backend-domain.com/"
}
\`\`\`

**Important:** Replace https://your-backend-domain.com/ with your actual WordPress backend URL (must end with a slash \`/\`).

---

## Backend Setup

BookHere requires a WordPress backend with the Homey theme installed.

### Option 1: Using Existing Homey Backend

If you already have a WordPress site with Homey theme:

1. ** Ensure WordPress is Updated **
  - WordPress 6.0 or higher recommended

2. ** Verify Homey Theme is Active **
  - Go to WordPress "Admin" → "Appearance" → "Themes"
    - Ensure Homey theme is activated

3. ** Enable REST API **
  - The REST API should be enabled by default
- Test by visiting: \`https://your-domain.com/wp-json/\`
  - You should see JSON response

4. ** Configure CORS(if needed)**

  Add to \`wp-config.php\` or use a plugin:
\`\`\`php
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
   header('Access-Control-Allow-Headers: Content-Type, Authorization');
\`\`\`

5. ** Test API Endpoints **

  Test these key endpoints in your browser or Postman:
- \`https://your-domain.com/wp-json/jwt-auth/v1/token\`(POST)
  - \`https://your-domain.com/wp-json/jwt-auth/v1/homey/search\`(GET)

### Option 2: Fresh WordPress + Homey Installation

1. ** Install WordPress **
  - Download from https://wordpress.org/download/
  - Upload to your hosting server
  - Complete the 5 - minute installation

2. ** Install Homey Theme **
  - Purchase Homey theme from ThemeForest
  - Upload and activate the theme
  - Complete Homey setup wizard

3. ** Install Required Plugins **
  - Homey Custom Post Types
  - JWT Authentication for WP REST API
  - Any other plugins required by Homey theme

4. ** Configure Permalinks **
  - Go to "Settings" → "Permalinks"
  - Select "Post name" structure
  - Save changes

### Backend Configuration Checklist

  - [ ] WordPress installed and running
  - [ ] Homey theme activated
  - [ ] Required plugins installed
  - [ ] Permalinks configured
  - [ ] REST API accessible
  - [ ] HTTPS enabled (SSL certificate)
  - [ ] CORS configured (if needed)
  - [ ] Test user accounts created

---

## Third - Party Services Configuration

### 1. Google Cloud Platform Setup(Maps & Sign - In)

#### A.Create Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Click "Select a Project" → "New Project"
3. Enter project name: "BookHere"
4. Click "Create"

#### B.Enable APIs

1. Go to "APIs & Services" → "Library"
2. Search and enable these APIs:
   - ** Maps SDK for Android **
   - ** Maps SDK for iOS **
   - ** Places API **
   - ** Geocoding API **

#### C.Create API Credentials

  ** For Google Maps:**

    1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Name it "Google Maps API Key"
4. Click "Restrict Key" and select:
  - Maps SDK for Android
  - Maps SDK for iOS
  - Places API
  - Geocoding API
5. Copy the API key

  ** For Google Sign - In:**

    1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" → Click "Create"
3. Fill in:
- App name: BookHere
  - User support email: "your@email.com"
- Developer contact: "your@email.com"
4. Click "Save and Continue"

5. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"

6. ** Create iOS Client ID:**
  - Application type: iOS
    - Name: BookHere iOS
      - Bundle ID: \`com.yourcompany.bookhere\`(use your actual bundle ID)
        - Click "Create"
          - Copy the "Client ID"

7. ** Create Web Client ID:**
  - Application type: Web application
    - Name: BookHere Web
      - Click "Create"
        - Copy the "Client ID"

#### D.Update Configuration

1. ** Update\`.env\` file:**
  \`\`\`env
   EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=YOUR_IOS_CLIENT_ID_HERE
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=YOUR_WEB_CLIENT_ID_HERE
   \`\`\`

2. ** Update\`app.json\`:**
  \`\`\`json
   {
     "expo": {
       "ios": {
         "config": {
           "googleMapsApiKey": "YOUR_GOOGLE_MAPS_API_KEY"
         }
       },
       "android": {
         "config": {
           "googleMaps": {
             "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
           }
         }
       }
     }
   }
   \`\`\`

### 2. Stripe Setup(Payment Processing)

1. ** Create Stripe Account **
  - Go to https://stripe.com
- Click "Sign up"
  - Complete the registration

2. ** Get API Keys **
  - Go to Developers → API keys
    - Copy your "Publishable key"(starts with \`pk_test_\` for test mode)
      - Copy your "Secret key"(starts with \`sk_test_\` for test mode)

        3. ** Configure in App **

          Open\`src/screens/payment/stripe/config/helpers.ts\` and update:
\`\`\`typescript
   const publishableKey = "pk_test_YOUR_PUBLISHABLE_KEY_HERE";
   \`\`\`

4. ** Test Mode vs Live Mode **
  - Use test keys for development
    - Switch to live keys before production release
      - Never commit secret keys to version control

### 3. Expo Account Setup(For Builds)

1. ** Create Expo Account **
  - Go to https://expo.dev
- Click "Sign up"
  - Complete registration

2. ** Login via CLI **
  \`\`\`bash
   eas login
   \`\`\`

3. ** Create a Project **
  \`\`\`bash
   eas build:configure
   \`\`\`

4. ** Copy Project ID **
  - Go to https://expo.dev
- Open your project
  - Copy the Project ID

5. ** Update\`app.json\`:**
  \`\`\`json
   {
     "expo": {
       "extra": {
         "eas": {
           "projectId": "YOUR_PROJECT_ID_HERE"
         }
       }
     }
   }
   \`\`\`

### 4. Firebase Setup(Optional - for Enhanced Push Notifications)

  1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Enter project name: "BookHere"
4. Complete setup wizard

  ** For Android:**
    1. Click "Add app" → "Android"
2. Enter package name: \`com.yourcompany.bookhere\`
3. Download\`google-services.json\`
4. Place in project root

  ** For iOS:**
    1. Click "Add app" → "iOS"
2. Enter bundle ID: \`com.yourcompany.bookhere\`
3. Download\`GoogleService-Info.plist\`
4. Place in project root

---

## Running the App

### Development Mode

1. ** Start Development Server **
  \`\`\`bash
   npm start
   \`\`\`

   This will:
- Start Metro bundler
  - Open Expo Dev Tools in browser
    - Display QR code for testing

2. ** Run on iOS Simulator(macOS only) **
  \`\`\`bash
   npm run ios
   \`\`\`

   Or press\`i\` in the terminal after running\`npm start\`

3. ** Run on Android Emulator **
  \`\`\`bash
   npm run android  
   \`\`\`

   Or press\`a\` in the terminal after running\`npm start\`

### Testing on Physical Device

#### Using Expo Go(Easiest for Testing)

  1. ** Install Expo Go App **
    - iOS: https://apps.apple.com/app/expo-go/id982107779
- Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. ** Scan QR Code **
  - Run\`npm start\`
  - Scan the QR code with:
  - iOS: Camera app
    - Android: Expo Go app

      ** Note:** Expo Go has limitations with custom native modules.For full testing, use development builds.

#### Using Development Build(Recommended)

1. ** Build Development Client **
  \`\`\`bash
   # For iOS
   eas build --profile development --platform ios

   # For Android
   eas build --profile development --platform android
   \`\`\`

2. ** Install on Device **
  - Download the build from EAS dashboard
    - Install on your device

3. ** Run Development Server **
  \`\`\`bash
   npm start --dev-client
   \`\`\`

### Common Startup Issues

  ** Metro bundler error:**
    \`\`\`bash
npm start --clear
\`\`\`

    ** iOS build error:**
      \`\`\`bash
cd ios && rm -rf build && cd ..
npx expo run:ios
\`\`\`

      ** Android build error:**
        \`\`\`bash
cd android && ./gradlew clean && cd ..
npx expo run:android
\`\`\`

---

## Troubleshooting

### Installation Issues

  ** Problem:** \`npm install\` fails with errors

  ** Solution:**
    \`\`\`bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
\`\`\`

---

** Problem:** "Cannot find module" errors

  ** Solution:**
    \`\`\`bash
# Ensure all dependencies are installed
npm install

# If using CocoaPods (iOS)
cd ios && pod install && cd ..
\`\`\`

---

** Problem:** Xcode build fails

  ** Solution:**
    1. Open Xcode
2. Clean Build Folder: "Product" → "Clean Build Folder"
3. Delete Derived Data
4. Try building again

---

** Problem:** Android build fails with "SDK not found"

** Solution:**
  1. Verify "ANDROID_HOME" environment variable
2. Open Android Studio
3. Go to SDK Manager
4. Ensure Android SDK is installed

---

### Runtime Issues

  ** Problem:** App shows blank white screen

    ** Solution:**
      \`\`\`bash
# Clear cache and restart
npm start --clear
\`\`\`

---

** Problem:** "Network request failed" errors

  ** Solution:**
    1. Verify backend URL in \`src/ApiUrl.js\`
2. Ensure backend is accessible
3. Check CORS configuration
4. Test API endpoints in browser

---

** Problem:** Maps not showing

  ** Solution:**
    1. Verify Google Maps API key in \`app.json\`
2. Enable Maps SDK in Google Cloud Console
3. Ensure billing is enabled on Google Cloud project
4. Rebuild the app

---

** Problem:** Google Sign - In not working

  ** Solution:**
    1. Verify client IDs in \`.env\`
2. Ensure bundle ID / package name matches Google Cloud Console
3. Rebuild the app after changing\`.env\`

---

** Problem:** Stripe payments failing

  ** Solution:**
    1. Verify publishable key in helpers.ts
2. Ensure using test mode for development
3. Check Stripe dashboard for error logs

---

## Post - Installation Checklist

Before proceeding to customization and deployment:

- [ ] App runs on iOS simulator / device
- [ ] App runs on Android emulator / device
- [ ] Backend API connection working
- [ ] Google Maps displaying correctly
- [ ] Google Sign-In functional
- [ ] Stripe payment test successful
- [ ] Push notifications working
- [ ] All screens navigable
- [ ] No console errors
- [ ] Image uploads working
- [ ] Messaging system functional

---

## Next Steps

After successful installation:

1. **Read Configuration Guide** - [CONFIGURATION](./configuration)
   - Customize app branding
   - Configure advanced settings
   - Set up payment webhooks

2. **Read Customization Guide** - [CUSTOMIZATION](./customization)
   - Change theme colors
   - Update app icon and splash screen
   - Customize UI components

3. **Test All Features** - [FEATURES](./features)
   - Test guest features
   - Test host features
   - Test payment flows

4. ** Build for Production **
  - iOS: \`eas build --platform ios\`
    - Android: \`eas build --platform android\`

---

## Getting Help

If you encounter issues during installation:

1. ** Check Documentation **
  - Review this guide carefully
    - Check FAQ.md for common questions

2. ** Check Error Messages **
  - Read error messages carefully
    - Search for error messages online

3. ** Contact Support **
  - Email: support @webpenter.com
- Include: purchase code, error messages, screenshots
  - Describe steps to reproduce

---

** Installation Complete! ** 🎉

You're now ready to start customizing and building your property rental app.

  `
  },
  configuration: {
    title: "Configuration",
    icon: Settings,
    tags: ["env", "api", "stripe"],
    content: `
# Configuration Guide - BookHere Mobile App

Complete configuration guide for setting up and customizing BookHere mobile application.

---

## Table of Contents

1. [App Configuration](#app-configuration)
2. [Backend Integration](#backend-integration)
3. [Google Services Setup](#google-services-setup)
4. [Payment Gateway Configuration](#payment-gateway-configuration)
5. [Push Notifications Setup](#push-notifications-setup)
6. [Authentication Configuration](#authentication-configuration)
7. [Maps Configuration](#maps-configuration)
8. [App Branding](#app-branding)
9. [Build Configuration](#build-configuration)
10. [Environment Variables](#environment-variables)

---

## App Configuration

### 1. Basic App Settings (app.json)

The \`app.json\` file is the main configuration file for your Expo/React Native app.

#### Update App Identity

\`\`\`json
{
  "expo": {
    "name": "Your App Name",           // Display name
    "slug": "your-app-slug",            // URL-friendly name
    "version": "1.0.0",                 // App version
    "orientation": "portrait",          // Screen orientation
    "userInterfaceStyle": "automatic",  // Light/dark mode support

    "icon": "./src/assets/images/icon.png",  // App icon (1024x1024px)

    "splash": {
      "image": "./src/assets/book-here-splash-screen/4.jpg",
      "resizeMode": "cover",
      "backgroundColor": "#ffffff"
    }
  }
}
\`\`\`

#### Update Bundle Identifiers

**For iOS:**
\`\`\`json
{
  "expo": {
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.yourapp",
      "buildNumber": "1"
    }
  }
}
\`\`\`

**For Android:**
\`\`\`json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.yourapp",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./src/assets/images/icon.png",
        "backgroundColor": "#FFFFFF"
      }
    }
  }
}
\`\`\`

**Important:**
- Bundle identifier and package name must be unique (use your domain reversed)
- Format: \`com.yourcompany.appname\`
- Once published, cannot be changed
- Must match identifiers in Google Cloud Console and Apple Developer Account

#### Update App Scheme

\`\`\`json
{
  "expo": {
    "scheme": "yourapp"  // Deep linking scheme
  }
}
\`\`\`

This enables deep linking: \`yourapp://screen/details\`

---

## Backend Integration

### 1. Configure API URL

Edit \`src/ApiUrl.js\`:

\`\`\`javascript
export default {
    api_url: "https://yourdomain.com/"
}
\`\`\`

  ** Important Notes:**
    - Must be HTTPS in production
      - Must end with trailing slash\`/\`
        - Should be your WordPress site URL
          - Test the URL in browser first

            ** Example:**
              \`\`\`javascript
// Development
api_url: "https://dev.bookhere.com/"

// Production
api_url: "https://bookhere.com/"
\`\`\`

### 2. Backend API Requirements

Your WordPress backend must have these endpoints:

#### Authentication Endpoints
  \`\`\`
POST /wp-json/jwt-auth/v1/token
POST /wp-json/jwt-auth/v1/token/validate
POST /wp-json/jwt-auth/v1/user/register
\`\`\`

#### Property / Listing Endpoints
  \`\`\`
GET  /wp-json/jwt-auth/v1/homey/search
GET  /wp-json/jwt-auth/v1/listing/{id}
POST /wp-json/jwt-auth/v1/listing/add
PUT  /wp-json/jwt-auth/v1/listing/{id}
DELETE /wp-json/jwt-auth/v1/listing/{id}
\`\`\`

#### Booking Endpoints
  \`\`\`
GET  /wp-json/jwt-auth/v1/booking/list
POST /wp-json/jwt-auth/v1/booking/create
PUT  /wp-json/jwt-auth/v1/booking/{id}
\`\`\`

#### Message Endpoints
  \`\`\`
GET  /wp-json/jwt-auth/v1/messages
POST /wp-json/jwt-auth/v1/messages/send
\`\`\`

### 3. CORS Configuration

If you encounter CORS errors, add to your WordPress \`wp-config.php\`:

\`\`\`php
// Enable CORS for mobile app
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
\`\`\`

Or use a plugin like "WP CORS" for easier management.

### 4. Test Backend Connection

  \`\`\`bash
# Test API is accessible
curl https://yourdomain.com/wp-json/

# Test authentication endpoint
curl -X POST https://yourdomain.com/wp-json/jwt-auth/v1/token \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'
\`\`\`

---

## Google Services Setup

### 1. Google Cloud Console Configuration

#### Create Project
1. Go to https://console.cloud.google.com/
2. Create new project: "BookHere"(or your app name)
3. Note the Project ID

#### Enable Required APIs

Enable these APIs in "APIs & Services" → "Library":

- ✅ Maps SDK for Android
  - ✅ Maps SDK for iOS
    - ✅ Places API
      - ✅ Geocoding API
        - ✅ Geolocation API

#### Create API Key for Maps

1. Go to "Credentials" → "Create Credentials" → "API Key"
2. Name: "Google Maps API Key"
3. Click "Edit API key"
4. Under "API restrictions", select:
- Maps SDK for Android
  - Maps SDK for iOS
    - Places API
    - Geocoding API
5.(Optional) Add application restrictions for security
6. Copy the API key

### 2. Google Sign - In Setup

#### Configure OAuth Consent Screen

1. Go to "OAuth consent screen"
2. Select "External"(or "Internal" if G Suite)
3. Fill required fields:
\`\`\`
   App name: BookHere
   User support email: support@yourdomain.com
   Developer contact: dev@yourdomain.com
   \`\`\`
4. Add scopes(optional):
- \`userinfo.email\`
  - \`userinfo.profile\`
5. Save

#### Create OAuth 2.0 Credentials

  ** iOS Client ID:**
    1. "Create Credentials" → "OAuth 2.0 Client ID"
2. Application type: ** iOS **
  3. Name: "BookHere iOS"
4. Bundle ID: \`com.yourcompany.yourapp\`(same as app.json)
5. Click "Create"
6. Copy the ** Client ID **

** Web Client ID(required for Google Sign - In):**
  1. "Create Credentials" → "OAuth 2.0 Client ID"
2. Application type: ** Web application **
  3. Name: "BookHere Web"
4. No need to add URIs
5. Click "Create"
6. Copy the ** Client ID **

** Android(Automatic):**
  - Google Sign - In library handles this automatically
    - Uses SHA - 1 fingerprint from your keystore

### 3. Update App Configuration

#### Update \`.env\`:
\`\`\`env
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=YOUR_IOS_CLIENT_ID_HERE.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=YOUR_WEB_CLIENT_ID_HERE.apps.googleusercontent.com
\`\`\`

#### Update \`app.json\`:
\`\`\`json
{
  "expo": {
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_GOOGLE_MAPS_API_KEY"
      },
      "bundleIdentifier": "com.yourcompany.yourapp",
      "googleServicesFile": "./GoogleService-Info.plist"
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
        }
      },
      "package": "com.yourcompany.yourapp",
      "googleServicesFile": "./google-services.json"
    }
  }
}
\`\`\`

### 4. Google Services Files(Optional - For Firebase)

  ** For iOS ** - \`GoogleService-Info.plist\`:
1. Go to https://console.firebase.google.com
2. Create project or use existing
3. Add iOS app with your bundle ID
4. Download\`GoogleService-Info.plist\`
5. Place in project root
6. Reference in \`app.json\` as shown above

  ** For Android ** - \`google-services.json\`:
1. In same Firebase project
2. Add Android app with your package name
3. Download\`google-services.json\`
4. Place in project root
5. Reference in \`app.json\` as shown above

---

## Payment Gateway Configuration

### 1. Stripe Configuration

#### Get Stripe Keys

1. Sign up at https://stripe.com
2. Go to Developers → API keys
3. Copy keys:
   - ** Test Publishable Key **: \`pk_test_...\`
  - ** Test Secret Key **: \`sk_test_...\`
    - ** Live Publishable Key **: \`pk_live_...\`
      - ** Live Secret Key **: \`sk_live_...\`

#### Configure in App

Edit \`src/screens/payment/stripe/config/helpers.ts\`:

\`\`\`typescript
// For Development (Test Mode)
const publishableKey = "pk_test_YOUR_TEST_KEY_HERE";

// For Production (Live Mode)
// const publishableKey = "pk_live_YOUR_LIVE_KEY_HERE";

export const initializeStripe = () => {
  return initStripe({
    publishableKey,
    merchantIdentifier: "merchant.com.yourcompany.yourapp", // For Apple Pay
    urlScheme: "yourapp", // Same as app.json scheme
  });
};
\`\`\`

#### Apple Pay Configuration(iOS)

1. Create Merchant ID in Apple Developer Console:
- Go to Certificates, IDs & Profiles → Identifiers
  - Click + → Merchant IDs
    - Register: \`merchant.com.yourcompany.yourapp\`

2. Enable in Stripe Dashboard:
- Go to Settings → Payment Methods
  - Enable Apple Pay
    - Add domain verification

3. Update \`app.json\`:
\`\`\`json
{
  "expo": {
    "ios": {
      "entitlements": {
        "com.apple.developer.in-app-payments": [
          "merchant.com.yourcompany.yourapp"
        ]
      }
    }
  }
}
\`\`\`

#### Google Pay Configuration(Android)

1. Enable in Stripe Dashboard:
- Go to Settings → Payment Methods
  - Enable Google Pay

2. No additional app configuration needed

#### Webhook Setup(Backend)

Configure Stripe webhooks in your WordPress backend:
\`\`\`
Webhook URL: https://yourdomain.com/wp-json/stripe/webhook
Events to listen: payment_intent.succeeded, payment_intent.payment_failed
\`\`\`

### 2. PayPal Configuration

Edit PayPal component file:

\`\`\`javascript
const PayPalButton = () => {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: "AMOUNT_HERE",
              currency_code: "USD"
            }
          }]
        });
      }}
      onApprove={(data, actions) => {
        // Handle successful payment
      }}
    />
  );
};
\`\`\`

### 3. Thai QR Payment

Configure in the Thai QR payment component with your QR payment provider credentials.

---

## Push Notifications Setup

### 1. Expo Push Notifications

#### Configure in \`app.json\`:

\`\`\`json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./src/assets/images/icon.png",
          "defaultChannel": "default",
          "sounds": []
        }
      ]
    ]
  }
}
\`\`\`

### 2. iOS Push Notifications(APNs)

1. ** Create APNs Key in Apple Developer Console:**
  - Go to Certificates, IDs & Profiles → Keys
    - Click + to create new key
      - Enable "Apple Push Notifications service (APNs)"
        - Download the \`.p8\` key file
          - Note the Key ID

2. ** Upload to Expo:**
  \`\`\`bash
   eas credentials
   \`\`\`
   Follow prompts to upload APNs key

### 3. Android Push Notifications(FCM)

1. ** Get Server Key from Firebase:**
  - Go to Firebase Console
    - Project Settings → Cloud Messaging
      - Copy "Server key"

2. ** Configure in Expo:**
  \`\`\`bash
   eas credentials
   \`\`\`
   Follow prompts to add FCM server key

### 4. Test Push Notifications

Use Expo's push notification tool:
  \`\`\`bash
expo push:send --to YOUR_EXPO_PUSH_TOKEN --title "Test" --body "Hello!"
\`\`\`

---

## Authentication Configuration

### 1. JWT Token Configuration

The app uses JWT tokens for authentication.Ensure your WordPress backend has JWT Authentication plugin configured.

In WordPress \`wp-config.php\`:
\`\`\`php
define('JWT_AUTH_SECRET_KEY', 'your-secret-key-here-change-this');
define('JWT_AUTH_CORS_ENABLE', true);
\`\`\`

### 2. Biometric Authentication

Already configured via plugin in \`app.json\`:

\`\`\`json
{
  "expo": {
    "plugins": [
      [
        "expo-local-authentication",
        {
          "faceIDPermission": "Allow $(PRODUCT_NAME) to use Face ID for secure login."
        }
      ]
    ],
    "ios": {
      "infoPlist": {
        "NSFaceIDUsageDescription": "Allow BookHere to use Face ID for secure login."
      }
    },
    "android": {
      "permissions": [
        "android.permission.USE_BIOMETRIC",
        "android.permission.USE_FINGERPRINT"
      ]
    }
  }
}
\`\`\`

### 3. Session Management

Configure token expiration in your backend:
\`\`\`php
// Token expires in 7 days
define('JWT_AUTH_EXPIRE_TIME', 7 * DAY_IN_SECONDS);
\`\`\`

---

## Maps Configuration

### 1. Google Maps API Key

Already covered in Google Services Setup.Key should be in \`app.json\`:

\`\`\`json
{
  "expo": {
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_API_KEY"
      }
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_API_KEY"
        }
      }
    }
  }
}
\`\`\`

### 2. Map Customization

Edit map styles in the code:

\`\`\`javascript
// Custom map style (optional)
const mapStyle = [
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [{ "visibility": "off" }]
  }
];

<MapView
  customMapStyle={mapStyle}
  // other props
/>
\`\`\`

### 3. Default Map Region

Configure default map region in code:

\`\`\`javascript
const defaultRegion = {
  latitude: 37.78825,      // Your default latitude
  longitude: -122.4324,    // Your default longitude
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
\`\`\`

---

## App Branding

### 1. App Name

Update in multiple locations:

** \`app.json\`:**
  \`\`\`json
{
  "expo": {
    "name": "Your App Name"
  }
}
\`\`\`

  ** \`package.json\`:**
    \`\`\`json
{
  "name": "yourappname"
}
\`\`\`

### 2. App Icon

1. Create 1024x1024px PNG icon
2. Replace\`src/assets/images/icon.png\`
3. Icon should have:
- No transparency(use background)
  - No rounded corners(iOS handles this)
    - High resolution
      - Simple, recognizable design

### 3. Splash Screen

1. Create splash screen image(recommended: 2048x2048px)
2. Replace\`src/assets/book-here-splash-screen/4.jpg\`
3. Update \`app.json\`:

\`\`\`json
{
  "expo": {
    "splash": {
      "image": "./src/assets/book-here-splash-screen/4.jpg",
      "resizeMode": "cover",        // or "contain"
      "backgroundColor": "#ffffff"  // background color
    }
  }
}
\`\`\`

### 4. Theme Colors

Edit \`src/constants/Colors.ts\`:

\`\`\`typescript
export default {
  primary: '#YOUR_PRIMARY_COLOR',
  secondary: '#YOUR_SECONDARY_COLOR',
  light: {
    background: '#FFFFFF',
    text: '#000000',
    // ... other light theme colors
  },
  dark: {
    background: '#000000',
    text: '#FFFFFF',
    // ... other dark theme colors
  }
}
\`\`\`

---

## Build Configuration

### 1. EAS Build Configuration(\`eas.json\`)

  \`\`\`json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "simulator": false
      }
    }
  },
  "submit": {
    "production": {}
  }
}
\`\`\`

### 2. Android Build Settings

For smaller APK size, ProGuard is already configured in:
\`android/gradle.properties\`

### 3. iOS Build Settings

Build number increments automatically with EAS.Manual control in \`app.json\`:

\`\`\`json
{
  "expo": {
    "ios": {
      "buildNumber": "1"
    }
  }
}
\`\`\`

---

## Environment Variables

### Development vs Production

Create multiple \`.env\` files:

** \`.env.development\`:**
  \`\`\`env
API_URL=https://dev.yourapp.com/
STRIPE_KEY=pk_test_xxx
DEBUG_MODE=true
\`\`\`

  ** \`.env.production\`:**
    \`\`\`env
API_URL=https://yourapp.com/
STRIPE_KEY=pk_live_xxx
DEBUG_MODE=false
\`\`\`

### Loading Environment Variables

In code:
\`\`\`javascript
import Constants from 'expo-constants';

const config = {
  apiUrl: Constants.expoConfig.extra.apiUrl,
  // other config
};
\`\`\`

Update \`app.json\`:
\`\`\`json
{
  "expo": {
    "extra": {
      "apiUrl": process.env.API_URL
    }
  }
}
\`\`\`

---

## Configuration Checklist

Before going to production:

** App Identity:**
  - [] App name updated
    - [] Bundle identifier / package name set
      - [] Version number correct
        - [] App icon replaced
          - [] Splash screen customized

            ** Backend:**
              - [] API URL configured
                - [] Backend accessible via HTTPS
                  - [] CORS configured
                    - [] Test authentication working

                      ** Google Services:**
                        - [] Google Maps API key added
                          - [] Maps displaying correctly
                            - [] Google Sign - In client IDs configured
                              - [] Google Sign - In tested

                                ** Payments:**
                                  - [] Stripe keys configured
                                    - [] Test payment successful
                                      - [] PayPal configured(if using)
  - [] Apple Pay merchant ID set(if using)

** Push Notifications:**
  - [] Expo push notification token working
    - [] APNs configured for iOS
      - [] FCM configured for Android
        - [] Test notification received

          ** Branding:**
            - [] Theme colors customized
              - [] App name throughout app
                - [] Logo / branding updated

                  ** Build:**
                    - [] EAS project ID set
                      - [] Build profiles configured
                        - [] Test build successful

---

## Testing Configuration

### Test API Connection
  \`\`\`bash
# In app, check console for API calls
# Look for successful responses
\`\`\`

### Test Google Maps
  - Open app
    - Navigate to map screen
      - Verify maps load

### Test Google Sign - In
  - Click "Sign in with Google"
    - Verify successful authentication

### Test Payments
  - Use Stripe test cards:
- Success: \`4242 4242 4242 4242\`
  - Decline: \`4000 0000 0000 0002\`

### Test Push Notifications
  - Send test notification
    - Verify receipt on device

---

## Need Help ?

  If configuration issues arise:

1. Check error messages in console
2. Verify all IDs match across platforms
3. Ensure URLs are correct with HTTPS
4. Review this guide carefully
5. Contact support: support @webpenter.com

---

** Configuration Complete! ** 🎉

Your app is now fully configured and ready for customization and deployment.

    `
  },
  customization: {
    title: "Customization",
    icon: Wrench,
    tags: ["branding", "ui", "colors"],
    content: `
# Customization Guide - BookHere Mobile App

Complete guide for customizing and branding the BookHere mobile application.

---

## Table of Contents

1. [Theme Customization](#theme-customization)
2. [Branding](#branding)
3. [UI Components](#ui-components)
4. [Language & Localization](#language--localization)
5. [Navigation](#navigation)
6. [Adding New Features](#adding-new-features)
7. [Styling Guide](#styling-guide)
8. [Best Practices](#best-practices)

---

## Theme Customization

### 1. Color Scheme

Edit \`src/ constants / Colors.ts\`:

\`\`\`typescript
export default {
    // Primary brand colors
    primary: '#FF5A5F',        // Main brand color
    secondary: '#00A699',      // Secondary brand color
    accent: '#FC642D',         // Accent color for highlights

    // Functional colors
    success: '#4CAF50',        // Success messages
    error: '#F44336',          // Error messages
    warning: '#FF9800',        // Warning messages
    info: '#2196F3',           // Information messages

    // Light theme
    light: {
      background: '#FFFFFF',
      backgroundSecondary: '#F7F7F7',
      text: '#484848',
      textSecondary: '#767676',
      border: '#EBEBEB',
      card: '#FFFFFF',
      shadow: '#00000020',
      tabBar: '#FFFFFF',
      tabBarInactive: '#999999',
      inputBackground: '#F7F7F7',
      inputBorder: '#DDDDDD',
      placeholder: '#A0A0A0',
    },

    // Dark theme
    dark: {
      background: '#121212',
      backgroundSecondary: '#1E1E1E',
      text: '#FFFFFF',
      textSecondary: '#B3B3B3',
      border: '#2C2C2C',
      card: '#1E1E1E',
      shadow: '#00000040',
      tabBar: '#1E1E1E',
      tabBarInactive: '#666666',
      inputBackground: '#2C2C2C',
      inputBorder: '#3C3C3C',
      placeholder: '#666666',
    },

    // Gradient colors
    gradients: {
      primary: ['#FF5A5F', '#FF385C'],
      secondary: ['#00A699', '#008B80'],
      sunset: ['#FF6B6B', '#FFE66D'],
      ocean: ['#4FACFE', '#00F2FE'],
    }
  };
\`\`\`

### 2. Typography

Edit \`src/constants/Typography.ts\` (or create if not exists):

\`\`\`typescript
export const Typography = {
  // Font families
  fonts: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },

  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};
\`\`\`

### 3. Spacing System

Edit \`src/constants/Layout.ts\`:

\`\`\`typescript
export const Layout = {
  // Spacing scale
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },

  // Border radius
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  // Screen padding
  padding: {
    horizontal: 16,
    vertical: 16,
  },

  // Dimensions
  window: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
};
\`\`\`

### 4. Applying Theme Changes

After updating colors:

1. **Restart development server:**
   \`\`\`bash
   npm start --clear
  \`\`\`

2. **Reload app** on device/simulator

3. **Test both light and dark modes**

---

## Branding

### 1. App Icon

#### Requirements:
- Size: 1024x1024 pixels
- Format: PNG with no transparency
- No rounded corners (handled by OS)
- Safe area: Keep important content in center 90%

#### Steps:
1. Create your icon at 1024x1024px
2. Replace \`src/assets/images/icon.png\`
3. Rebuild the app:
   \`\`\`bash
   eas build --platform all --profile preview
  \`\`\`

#### Icon Generator Tools:
- https://www.appicon.co/
- https://makeappicon.com/
- Figma / Sketch / Adobe XD

### 2. Splash Screen

#### Requirements:
- Recommended: 2048x2048 pixels
- Format: JPG or PNG
- Keep important content in center safe area

#### Steps:
1. Create splash screen image
2. Replace \`src/assets/book-here-splash-screen/4.jpg\`
3. Update \`app.json\`:
   \`\`\`json
{
  "expo": {
    "splash": {
      "image": "./src/assets/book-here-splash-screen/4.jpg",
      "resizeMode": "cover",
      "backgroundColor": "#FFFFFF"
    }
  }
}
\`\`\`

### 3. App Name

Update in multiple locations:

**\`app.json\`:**
\`\`\`json
{
  "expo": {
    "name": "Your App Name"
  }
}
\`\`\`

**\`package.json\`:**
\`\`\`json
{
  "name": "yourappname"
}
\`\`\`

**Throughout the app** - Search and replace:
\`\`\`bash
# Find all instances
grep - r "BookHere" src /

# Replace in specific files
# Edit manually or use find - replace in VS Code
\`\`\`

### 4. Logo

1. Create logo in SVG or PNG format
2. Place in \`src/assets/images/\`
3. Update header logo in \`src/screens/home/components/EnhancedHeader.tsx\`:

\`\`\`typescript
<Image
  source = { require('../../assets/images/your-logo.png') }
  style = { styles.logo }
/>
\`\`\`

### 5. Brand Colors Everywhere

Update these components to use your brand colors:

- **Primary buttons**: \`src/components/Button.tsx\`
- **Tab bar**: \`src/navigation/TabMenu.tsx\`
- **Headers**: \`src/navigation/DrawerMenu.tsx\`
- **Loading indicators**: \`src/LoadingSpinner.js\`
- **Gradients**: All gradient components

---

## UI Components

### 1. Button Styles

Edit \`src/components/Button.tsx\` (or create if not exists):

\`\`\`typescript
import { Colors } from '../constants/Colors';

export const Button = ({ title, onPress, variant = 'primary' }) => {
  const buttonStyles = {
    primary: {
      backgroundColor: Colors.primary,
      color: '#FFFFFF',
    },
    secondary: {
      backgroundColor: Colors.secondary,
      color: '#FFFFFF',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: Colors.primary,
      color: Colors.primary,
    },
  };

  return (
    <TouchableOpacity
      style= { [styles.button, buttonStyles[variant]]}
      onPress = { onPress }
    >
      <Text style={ [styles.text, { color: buttonStyles[variant].color }] }>
        { title }
      </Text>
    </TouchableOpacity>
  );
};
\`\`\`

### 2. Card Components

Customize property cards in \`src/components/PropertyCard.tsx\`:

\`\`\`typescript
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
\`\`\`

### 3. Input Fields

Customize inputs in form components:

\`\`\`typescript
const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.light.inputBackground,
    borderWidth: 1,
    borderColor: Colors.light.inputBorder,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    fontSize: Typography.sizes.base,
    color: Colors.light.text,
  },
});
\`\`\`

### 4. Custom Components

Create reusable components in \`src/components/\`:

\`\`\`typescript
// src/components/CustomBadge.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const CustomBadge = ({ text, color = 'primary' }) => {
  const badgeColors = {
    primary: Colors.primary,
    success: Colors.success,
    warning: Colors.warning,
  };

  return (
    <View style= { [styles.badge, { backgroundColor: badgeColors[color] }]} >
      <Text style={ styles.text }> { text } </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
\`\`\`

---

## Language & Localization

### 1. Adding New Language

1. **Create translation file:**
   \`\`\`bash
touch src/localization/translations/jp.ts
\`\`\`

2. **Add translations:**
   \`\`\`typescript
// src/localization/translations/jp.ts
export default {
  common: {
    home: 'ホーム',
    search: '検索',
    favorites: 'お気に入り',
    profile: 'プロフィール',
    // ... more translations
  },
  auth: {
    login: 'ログイン',
    signup: '登録',
    // ... more translations
  },
};
\`\`\`

3. **Register language in i18n:**
   \`\`\`typescript
// src/localization/i18n.ts
import jp from './translations/jp';

i18n.translations = {
  en,
  es,
  jp,  // Add new language
};
\`\`\`

4. **Add to language selector:**
   \`\`\`typescript
// src/navigation/TabMenu.tsx or Settings screen
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'jp', name: '日本語' },  // Add here
];
\`\`\`

### 2. Using Translations in Components

\`\`\`typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{ t('common.home') }</Text>
      <Text>{ t('auth.login') }</Text>
    </View>
  );
};
\`\`\`

### 3. RTL Support

For languages like Arabic and Urdu, RTL is already configured. To add RTL to new language:

\`\`\`typescript
// src/localization/i18n.ts
import { I18nManager } from 'react-native';

const isRTL = ['ar', 'ur', 'he', 'fa'].includes(currentLanguage);
I18nManager.forceRTL(isRTL);
\`\`\`

---

## Navigation

### 1. Customizing Tab Bar

Edit \`src/navigation/TabMenu.tsx\`:

\`\`\`typescript
<Tab.Navigator
  screenOptions={{
    tabBarActiveTintColor: Colors.primary,
    tabBarInactiveTintColor: Colors.light.tabBarInactive,
    tabBarStyle: {
      backgroundColor: Colors.light.tabBar,
      borderTopWidth: 1,
      borderTopColor: Colors.light.border,
      height: 60,
      paddingBottom: 8,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontFamily: Typography.fonts.medium,
    },
  }}
>
  {/* Tab screens */ }
</Tab.Navigator>
\`\`\`

### 2. Adding New Screen

1. **Create screen file:**
   \`\`\`typescript
// src/screens/NewScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';

export const NewScreen = () => {
  return (
    <View>
      <Text>New Screen </Text>
    </View>
   );
};
\`\`\`

2. **Add to navigation:**
   \`\`\`typescript
// src/navigation/TabMenu.tsx
import { NewScreen } from '../screens/NewScreen';

<Tab.Screen
  name="NewScreen"
  component={NewScreen}
  options={{
    tabBarLabel: 'New',
    tabBarIcon: ({ color }) => (
      <Icon name="star" size={24} color={color} />
    ),
  }}
/>
\`\`\`

### 3. Customizing Headers

\`\`\`typescript
<Stack.Navigator
  screenOptions = {{
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontFamily: Typography.fonts.bold,
      fontSize: Typography.sizes.lg,
    },
    headerShadowVisible: false,
  }}
>
  {/* Screens */ }
</Stack.Navigator>
\`\`\`

---

## Adding New Features

### 1. Adding a New Payment Method

1. **Create payment component:**
   \`\`\`typescript
// src/screens/payment/NewPayment/index.tsx
import React from 'react';

export const NewPaymentMethod = ({ amount, onSuccess, onError }) => {
  const handlePayment = async () => {
    try {
      // Payment logic here
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  return (
    <View>
      {/* Payment UI */ }
    </View>
  );
};
\`\`\`

2. **Add to payment selection:**
   \`\`\`typescript
// src/screens/payment/PaymentSelection.tsx
const paymentMethods = [
  { id: 'stripe', name: 'Credit Card', component: StripePayment },
  { id: 'paypal', name: 'PayPal', component: PayPalPayment },
  { id: 'new', name: 'New Method', component: NewPaymentMethod },
];
\`\`\`

### 2. Adding Social Login

1. **Install library:**
   \`\`\`bash
npm install @react-native - firebase / auth
npx expo install expo - auth - session
  \`\`\`

2. **Create auth provider:**
   \`\`\`typescript
// src/helper/SocialAuth.ts
export const signInWithFacebook = async () => {
  // Implementation
};
\`\`\`

3. **Add to login screen:**
   \`\`\`typescript
// src/screens/auth/LoginScreen.tsx
<Button
  title = "Continue with Facebook"
  onPress = { signInWithFacebook }
/>
  \`\`\`

### 3. Adding New Dashboard Widget

\`\`\`typescript
// src/screens/dashboard/components/NewWidget.tsx
export const NewWidget = ({ data }) => {
  return (
    <View style= { styles.widget } >
      <Text style={ styles.title }> Widget Title </Text>
      {/* Widget content */ }
    </View>
  );
};

// Add to dashboard:
// src/screens/dashboard/Dashboard.tsx
import { NewWidget } from './components/NewWidget';

<NewWidget data={ widgetData } />
\`\`\`

---

## Styling Guide

### 1. Consistent Styling

Use a style system throughout:

\`\`\`typescript
// Good - Using constants
const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.md,
    backgroundColor: Colors.light.background,
    borderRadius: Layout.radius.lg,
  },
  text: {
    fontSize: Typography.sizes.base,
    color: Colors.light.text,
    fontFamily: Typography.fonts.regular,
  },
});

// Avoid - Hardcoded values
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
});
\`\`\`

### 2. Responsive Design

\`\`\`typescript
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

const styles = StyleSheet.create({
  text: {
    fontSize: isSmallDevice ? 14 : 16,
  },
});
\`\`\`

### 3. Platform-Specific Styles

\`\`\`typescript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
\`\`\`

### 4. Dark Mode Support

\`\`\`typescript
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

const MyComponent = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style= {{ backgroundColor: colors.background }}>
      <Text style={ { color: colors.text } }> Hello </Text>
    </View>
  );
};
\`\`\`

---

## Best Practices

### 1. Code Organization

\`\`\`
src /
├── screens /           # Full screens
├── components /        # Reusable components
├── navigation /        # Navigation setup
├── hooks /             # Custom hooks
├── helper /            # Utility functions
├── constants /         # Constants(colors, layout, etc.)
├── assets /            # Images, fonts
└── localization /      # Translations
\`\`\`

### 2. Component Structure

\`\`\`typescript
// 1. Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Layout, Typography } from '../constants';

// 2. Types/Interfaces
interface Props {
  title: string;
  onPress: () => void;
}

// 3. Component
export const MyComponent: React.FC<Props> = ({ title, onPress }) => {
  // Hooks
  const [state, setState] = useState();

  // Functions
  const handlePress = () => {
    onPress();
  };

  // Render
  return (
    <View style= { styles.container } >
    <Text>{ title } </Text>
    </View>
  );
};

// 4. Styles
const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.md,
  },
});
\`\`\`

### 3. Performance Optimization

\`\`\`typescript
// Use React.memo for expensive components
export const ExpensiveComponent = React.memo(({ data }) => {
  return <View>{/* Complex rendering */ } </View>;
});

// Use useCallback for functions
const handlePress = useCallback(() => {
  // Function logic
}, [dependencies]);

// Use useMemo for expensive calculations
const processedData = useMemo(() => {
  return data.map(item => /* processing */);
}, [data]);
\`\`\`

### 4. Error Handling

\`\`\`typescript
try {
  const result = await apiCall();
  // Handle success
} catch (error) {
  console.error('Error:', error);
  Alert.alert('Error', 'Something went wrong');
  // Handle error gracefully
}
\`\`\`

### 5. Testing Changes

Always test on:
- [ ] iOS Simulator
- [ ] Android Emulator
- [ ] Physical iOS device
- [ ] Physical Android device
- [ ] Light mode
- [ ] Dark mode
- [ ] Different screen sizes
- [ ] Different languages
- [ ] RTL languages (if applicable)

---

## Quick Customization Checklist

Essential customizations for branding:

- [ ] Update app name in \`app.json\` and \`package.json\`
- [ ] Replace app icon at \`src/assets/images/icon.png\`
- [ ] Replace splash screen at \`src/assets/book-here-splash-screen/4.jpg\`
- [ ] Update primary color in \`src/constants/Colors.ts\`
- [ ] Update secondary color in \`src/constants/Colors.ts\`
- [ ] Update bundle identifier (iOS) in \`app.json\`
- [ ] Update package name (Android) in \`app.json\`
- [ ] Update app scheme in \`app.json\`
- [ ] Replace logo images in \`src/assets/images/\`
- [ ] Test on both iOS and Android
- [ ] Test both light and dark modes
- [ ] Rebuild app with new branding

---

## Advanced Customization

### Custom Fonts

1. **Add font files** to \`src/assets/fonts/\`
2. **Load fonts** in \`App.tsx\`:
   \`\`\`typescript
import { useFonts } from 'expo-font';

const [fontsLoaded] = useFonts({
  'CustomFont-Regular': require('./assets/fonts/CustomFont-Regular.ttf'),
  'CustomFont-Bold': require('./assets/fonts/CustomFont-Bold.ttf'),
});
\`\`\`
3. **Use in styles:**
   \`\`\`typescript
text: {
  fontFamily: 'CustomFont-Regular',
}
\`\`\`

### Custom Animations

\`\`\`typescript
import Animated, {
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';

const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{ scale: withSpring(isPressed ? 0.95 : 1) }],
  };
});

<Animated.View style={ animatedStyle }>
  {/* Content */ }
</Animated.View>
    \`\`\`

---

## Need Help?

For customization support:

📧 Email: support@webpenter.com
📚 Include: Your purchase code and specific customization question

---

**Happy Customizing!** 🎨

Transform BookHere into your unique property rental brand!

    `
  },
  faq: {
    title: "FAQ",
    icon: HelpCircle,
    tags: ["help", "qa", "rtl"],
    content: `
# Frequently Asked Questions (FAQ)

Common questions and answers about the BookHere mobile app.

---

## Table of Contents

1. [General Questions](#general-questions)
2. [Installation & Setup](#installation--setup)
3. [Configuration](#configuration)
4. [Features & Functionality](#features--functionality)
5. [Customization](#customization)
6. [Payments & Billing](#payments--billing)
7. [Deployment & Building](#deployment--building)
8. [Support & Licensing](#support--licensing)

---

## General Questions

### What is BookHere?

BookHere is a complete, production-ready React Native mobile application for property rentals and bookings. It's similar to Airbnb and includes features for both property guests and hosts.

### What platforms does BookHere support?

- **iOS**: iOS 12.0 and higher
- **Android**: Android 5.0 (API 21) and higher

### Do I need a backend to use this app?

Yes, BookHere requires a WordPress backend with the Homey theme installed. The app communicates with the backend via REST API endpoints.

### Is the source code included?

Yes, you receive the complete React Native source code that you can modify and customize.

### Can I use this for my commercial project?

Yes, with the appropriate ThemeForest license (Regular or Extended), you can use this in your commercial projects.

### What technologies is this built with?

- **React Native** 0.79.5
- **Expo** SDK 53
- **TypeScript** 5.8.3
- **React Navigation** 6.x
- **React Native Paper** 4.12.8

---

## Backend & Infrastructure

### Is a backend included with this purchase?

**Partially!** The **connector plugin is included**, but you need to purchase the backend theme separately.

**What's Included:**
- ✅ BookHere-Homey Connector Plugin (bridges app with Homey theme)
- ✅ Mobile-optimized REST API endpoints
- ✅ Easy installation & configuration guide
- ✅ Saves you 40-80 hours of custom API development!

**What's NOT Included (Must Purchase Separately):**
- ❌ Homey WordPress Theme (~$59-79 from ThemeForest)
  - This provides the actual backend (property management, bookings, etc.)
  - Our plugin connects your mobile app to it

### What backend do I need?

**You need two things:**

1. **Homey WordPress Theme** (Purchase separately)
   - Cost: ~$59-79 on ThemeForest
   - Search "Homey" on ThemeForest.net
   - Provides complete property rental backend functionality

2. **WordPress Installation** (Free)
   - WordPress 6.0+ from WordPress.org
   - Web hosting with PHP & MySQL ($5-20/month)

**Our Included Connector Plugin:**
- Bridges mobile app with Homey theme
- Provides mobile-optimized API endpoints
- Handles authentication, data sync, push notifications
- Easy to install and configure

### Do I need to buy the Homey theme?

**YES!** ✅ Homey theme is required for the backend.

**Why Homey Theme is Needed:**
- Provides the property management system
- Handles bookings and reservations
- Manages payments and transactions
- Includes admin dashboard for hosts
- Search and filtering system
- User management

**What Our Included Plugin Does:**
- Connects your mobile app to Homey
- Provides mobile-optimized APIs
- Handles mobile-specific features
- You DON'T need to build custom APIs yourself (saves 40-80 hours!)

**Total Cost:**
- BookHere package: (your purchase)
- Homey theme: ~$59-79 (one-time)
- Web hosting: $5-20/month

### What exactly is the BookHere API Plugin?

It's a complete WordPress plugin (included in your purchase) that provides:

**Technical Features:**
- JWT authentication endpoints
- Property CRUD operations (Create, Read, Update, Delete)
- Booking management system
- Payment gateway webhooks (Stripe, PayPal)
- Real-time messaging backend
- Review & rating system
- Advanced search with filters
- User role management (Guest/Host/Admin)
- Earnings calculation & analytics
- Media upload handling
- Push notification integration

**User-Friendly:**
- Simple installation via WordPress admin
- Configuration wizard for easy setup
- Admin dashboard to manage everything
- Compatible with standard WordPress hosting

### How long does backend setup take?

**Super Fast!** ⚡

With our included plugin:
1. Install WordPress: 10 minutes (most hosts have 1-click install)
2. Upload our API plugin: 2 minutes
3. Activate & configure: 15 minutes
4. Connect mobile app: 5 minutes

**Total: 30-45 minutes** ✅

Compare this to building a custom backend: 40-80 hours!

### What hosting do I need?

Any standard WordPress hosting works! No special requirements.

**Recommended Hosting Providers:**
- **Shared Hosting** ($5-15/month): SiteGround, Bluehost, HostGator
  - Perfect for starting out
  - Handles 1,000-10,000 users easily

- **Managed WordPress** ($20-50/month): WP Engine, Kinsta, Flywheel
  - Better performance
  - Automatic backups & updates

- **VPS** ($20-50/month): DigitalOcean, Linode, Vultr
  - More control
  - Better for scaling

- **Cloud** ($10-100/month): AWS, Google Cloud, Azure
  - Maximum scalability
  - Pay for what you use

**For most users:** Start with shared hosting ($5-15/month). Upgrade later if needed.

### What's the total cost to get started?

**Complete breakdown:**

**One-time costs:**
- BookHere package (mobile app + connector plugin): (your purchase) ✅
- **Homey WordPress theme: $59-79** (required - purchase from ThemeForest)
- Domain name: $10-15/year (optional)
- SSL certificate: FREE (Let's Encrypt) ✅

**Monthly costs:**
- Web hosting: $5-20/month (shared hosting works fine)
- Transaction fees: 2.9% + $0.30 per booking (Stripe, when you start earning)

**Total first year:** Your purchase + $59-79 (theme) + $60-240 (hosting) = ~$119-319 total

**What You Save:**
- ✅ 40-80 hours of custom API development (would cost $2,000-4,000!)
- ✅ Mobile app development (would cost $8,000-15,000!)
- ✅ Our connector plugin makes integration seamless

**Compared to building from scratch:** You save $10,000-19,000!

### Can I use my existing WordPress website?

**Yes!** Absolutely!

If you already have a WordPress website:
1. Simply install our API plugin
2. Configure the plugin settings
3. Connect the mobile app
4. Your existing website continues working normally

The API plugin doesn't interfere with your website. It just adds API endpoints for the mobile app.

### What if I already have a property rental website (non-WordPress)?

You have options:

**Option 1: Use our WordPress plugin (Easiest)**
- Set up WordPress on a subdomain (e.g., api.yoursite.com)
- Install our plugin
- Mobile app connects to this subdomain
- Your main website stays unchanged

**Option 2: Build custom integration (Advanced)**
- Modify the mobile app to work with your existing API
- Requires development skills
- API documentation provided

**Option 3: Hybrid approach**
- Use our WordPress backend for mobile app
- Keep your existing website for web users
- Sync data between both (requires custom integration)

### Do I need technical skills to set up the backend?

**No! Basic WordPress knowledge is enough.**

If you can:
- ✅ Install WordPress (or use 1-click installer)
- ✅ Upload a plugin via WordPress admin
- ✅ Fill out a settings form
- ✅ Copy-paste a URL

Then you can set up the backend! 🎉

**We provide:**
- Step-by-step installation guide with screenshots
- Configuration wizard in the plugin
- Video tutorial (coming soon)
- Email support if you get stuck

### Can I test the app without setting up hosting?

**Demo Options:**

1. **Use local WordPress** (Fastest for testing)
   - Install XAMPP or MAMP on your computer (free)
   - Run WordPress locally
   - Install our plugin
   - Test app connecting to localhost
   - Takes 30 minutes to set up

2. **Use free hosting temporarily**
   - 000webhost.com, InfinityFree (free tier)
   - Install WordPress + our plugin
   - Test before buying paid hosting

3. **Request demo access**
   - Email support@webpenter.com with purchase code
   - We can provide temporary demo backend access

### Can you set up the backend for me?

**DIY (Recommended):** Setup is very easy with our guide

**Professional Setup Services:**
- Not included in base package
- Available as paid service: Email support@webpenter.com for quote
- Typical cost: $50-150 for complete setup
- Includes: WordPress installation, plugin configuration, app connection

**Freelancer Setup:**
- Any WordPress freelancer can help
- Should take them 30-60 minutes
- Provide them with our installation guide

### What happens if my backend is down?

**Mobile app shows error messages** and can't function until backend is back online.

**Prevent downtime:**
- Choose reliable hosting (99.9%+ uptime SLAs)
- Set up automatic backups (most hosts include this)
- Use monitoring service (free): UptimeRobot.com
- Keep WordPress & plugin updated

**Most shared hosting providers** have 99.9% uptime = less than 9 hours downtime per year.

### Is the plugin compatible with my WordPress theme?

**Yes!** The API plugin is backend-only and works with ANY WordPress theme.

**Compatible with:**
- ✅ Any WordPress theme (default themes, premium themes, custom themes)
- ✅ Page builders (Elementor, WPBakery, Divi, etc.)
- ✅ WooCommerce (if you want e-commerce features)
- ✅ Multilingual plugins (WPML, Polylang)
- ✅ Most popular WordPress plugins

The API plugin provides REST endpoints. It doesn't affect your WordPress frontend/theme at all.

---

## Installation & Setup

### How long does installation take?

Basic installation takes 15-30 minutes. Complete setup with backend configuration and third-party services can take 2-4 hours.

### Do I need a Mac to develop this app?

- **For iOS development**: Yes, macOS is required for iOS builds and testing
- **For Android only**: No, you can develop on Windows, Mac, or Linux

### What if I don't have React Native experience?

Basic knowledge of React Native and JavaScript is recommended. However, we provide comprehensive documentation to help you get started.

### Can I test the app without building it?

Yes, use Expo Go app to test on physical devices during development without building.

### Do I need paid developer accounts?

- **For testing**: No
- **For App Store submission**: Yes, Apple Developer ($99/year)
- **For Play Store submission**: Yes, Google Play Developer ($25 one-time)

### Installation fails with "Cannot find module" errors

This usually means dependencies weren't installed correctly:
\`\`\`bash
rm - rf node_modules package-lock.json
npm install
  \`\`\`

---

## Configuration

### Where do I configure the backend URL?

Edit \`src / ApiUrl.js\`:
\`\`\`javascript
export default {
  api_url: "https://yourdomain.com/"
}
  \`\`\`

### How do I get Google Maps API key?

1. Go to https://console.cloud.google.com/
2. Create a project
3. Enable Maps SDK for iOS and Android
4. Create credentials → API Key
5. Add to \`app.json\`

### Where do I put my Stripe keys?

Edit \`src/screens/payment/stripe/config/helpers.ts\` and update the \`publishableKey\` constant.

### How do I change the app name?

Update in multiple locations:
- \`app.json\` - \`expo.name\`
- \`package.json\` - \`name\` field
- Throughout the app code (search and replace)

### Can I use a different backend instead of WordPress?

Technically yes, but you'll need to modify the API integration code to match your backend's API endpoints. This requires intermediate to advanced development skills.

### How do I configure push notifications?

1. Create Expo account
2. Get your project ID from expo.dev
3. Add to \`app.json\` under \`extra.eas.projectId\`
4. For iOS: Configure APNs
5. For Android: Configure FCM (usually automatic)

---

## Features & Functionality

### Does it support multiple languages?

Yes, 10 languages are included:
- English, Spanish, Portuguese, French, German
- Russian, Chinese, Arabic (RTL), Urdu (RTL), Hindi

### Can I add more languages?

Yes! Create a new translation file in \`src/localization/translations/\` and register it in the i18n configuration.

### Does it support dark mode?

Yes, automatic dark mode is fully supported based on device settings.

### Can users book properties instantly?

Yes, the app includes instant booking functionality with payment processing.

### Is messaging real-time?

The app supports messaging between guests and hosts. Real-time updates depend on your backend implementation.

### Can hosts add properties from the mobile app?

Yes, hosts can add and manage properties using a 7-step wizard directly from the app.

### Does it support multiple payment methods?

Yes, included payment methods:
- Stripe (Credit/Debit cards)
- PayPal
- Thai QR Payment

### How does the favorites/wishlist work?

Users can save properties to their favorites list for quick access later. Favorites are synced with the backend.

### Is there a review/rating system?

Yes, guests can leave reviews and ratings for properties they've stayed at.

---

## Customization

### How do I change the color scheme?

Edit \`src/constants/Colors.ts\` and update the primary, secondary, and other color values.

### Can I change the app icon and splash screen?

Yes:
- **Icon**: Replace \`src/assets/images/icon.png\` (1024x1024px)
- **Splash**: Replace \`src/assets/book-here-splash-screen/4.jpg\`

### How do I add custom fonts?

1. Add font files to \`src/assets/fonts/\`
2. Load fonts in \`App.tsx\` using \`useFonts\`
3. Update \`Typography.ts\` with font names
4. Use in StyleSheets

### Can I modify the UI components?

Yes, all components are customizable. Edit files in \`src/components/\` and \`src/screens/\`.

### How do I add a new screen/page?

1. Create component in \`src/screens/\`
2. Add to navigation in \`src/navigation/\`
3. Configure navigation options

### Can I remove features I don't need?

Yes, you can remove unused features by:
- Removing screen components
- Updating navigation
- Removing dependencies (if applicable)

### Is the code documented?

Yes, the code includes comments and the documentation package provides comprehensive guides.

---

## Payments & Billing

### Is Stripe the only payment option?

No, PayPal and Thai QR payment are also included. You can add more payment gateways by integrating their SDKs.

### Do I need a Stripe account?

Yes, if you want to accept credit/debit card payments. Create a free account at https://stripe.com

### How do I test payments without real money?

Use Stripe test mode with test card numbers:
- Success: \`4242 4242 4242 4242\`
- Decline: \`4000 0000 0000 0002\`

### Does the app handle payment processing fees?

The app displays prices and processes payments. Stripe charges transaction fees (usually 2.9% + $0.30 per transaction).

### Can I use this in my country?

The app works globally. Check if Stripe and your chosen payment gateways support your country.

### How are host payouts handled?

The app includes a wallet/earnings dashboard for hosts. You'll need to implement the actual payout logic in your backend.

---

## Deployment & Building

### How do I build the app for production?

Using EAS Build:
\`\`\`bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production
  \`\`\`

### Do I need a Mac to build for iOS?

No, EAS Build (Expo's cloud build service) can build iOS apps from any platform.

### How do I submit to App Store?

\`\`\`bash
eas submit --platform ios
  \`\`\`
Follow Apple's guidelines and provide required assets (screenshots, descriptions, etc.)

### How do I submit to Play Store?

\`\`\`bash
eas submit --platform android
  \`\`\`
Provide required Play Store assets and information.

### How long does App Store review take?

- **Apple**: Usually 1-3 days
- **Google**: Usually 1-2 days (sometimes hours)

### Can I update the app after it's published?

Yes, you can push updates using:
- **EAS Update**: For JavaScript/React changes (instant)
- **New Build**: For native code changes (requires store review)

### What's the difference between APK and AAB?

- **APK**: Android Package, for direct installation and testing
- **AAB**: Android App Bundle, required for Play Store (Google generates optimized APKs)

### Why is my app size so large?

Check \`APK_SIZE_OPTIMIZATION_GUIDE.md\` for tips on reducing app size. The app is already optimized to 30-40MB per architecture.

---

## Support & Licensing

### What support is included?

- 6 months of support from purchase date
- Bug fixes and issue resolution
- Installation and configuration help
- General usage questions

### What's NOT included in support?

- Custom development or new features
- Third-party service setup (beyond guidance)
- Server/hosting management
- App Store submission process

### How do I contact support?

Email: support@webpenter.com

Include:
- Your purchase code
- Detailed issue description
- Screenshots/error messages
- Steps to reproduce

### What's the difference between Regular and Extended License?

**Regular License:**
- Use in one project
- End users charged once or free

**Extended License:**
- Use in SaaS/subscription products
- End users charged on recurring basis

See: https://themeforest.net/licenses

### Can I get a refund?

Per ThemeForest policy, refunds are only granted if the item doesn't work as described or has major issues.

### Can I hire you for custom development?

Yes, contact us at support@webpenter.com for a quote on custom work.

### Will this work with the latest React Native version?

The app uses React Native 0.79.5. Upgrading to newer versions may require code changes. We provide updates to support new RN versions.

### Is WordPress Homey theme included?

No, the Homey WordPress theme must be purchased separately from ThemeForest.

### Can I use a different WordPress theme?

You'd need to modify the API integration to match your theme's API endpoints. This requires development work.

---

## Technical Questions

### Why can't I see Google Maps?

Common causes:
1. API key not configured in \`app.json\`
2. Maps SDK not enabled in Google Cloud Console
3. Billing not enabled on Google Cloud project
4. Wrong API key or restrictions

### Google Sign-In isn't working

Check:
1. Client IDs configured in \`.env\`
2. Bundle ID/package matches Google Cloud Console
3. App rebuilt after changing \`.env\`

### App crashes on startup

Try:
1. Clear cache: \`npm start --clear\`
2. Reinstall dependencies: \`rm - rf node_modules && npm install\`
3. Check console for error messages

### Images not uploading

Verify:
1. Backend API endpoint is correct
2. File size limits on server
3. Proper permissions in app
4. Network connectivity

### How do I enable debug mode?

\`\`\`bash
# React Native debugger
npm start
# Then press 'j' for JavaScript debugger
\`\`\`

### Can I use with Expo Go?

For development testing, yes. However, some native features may not work in Expo Go. Use development builds for full testing.

### How do I update dependencies?

\`\`\`bash
# Check for updates
npm outdated

# Update specific package
npm update package - name

# Update all(carefully!)
npm update
  \`\`\`

**Note:** Major updates may require code changes.

---

## Best Practices

### Should I modify the core files?

It's better to:
- Create new components for custom features
- Use configuration files for settings
- Document your changes

### How do I keep my customizations when updating?

- Use version control (Git)
- Create custom components separately
- Document changes in your own files
- Merge updates carefully

### What should I test before launching?

- [ ] All screens navigate correctly
- [ ] Backend API connection works
- [ ] Login/signup functional
- [ ] Property search works
- [ ] Booking flow complete
- [ ] Payment processing successful
- [ ] Notifications working
- [ ] Images upload properly
- [ ] Both iOS and Android
- [ ] Light and dark modes
- [ ] Multiple languages
- [ ] Different screen sizes

---

## Troubleshooting Quick Fixes

### Build fails

\`\`\`bash
# Clear everything and rebuild
rm -rf node_modules ios/build android/build
npm install
  \`\`\`

### Metro bundler errors

\`\`\`bash
npm start --clear
  \`\`\`

### iOS build issues

\`\`\`bash
cd ios
rm -rf build
pod deintegrate
pod install
cd..
\`\`\`

### Android build issues

\`\`\`bash
cd android
./gradlew clean
cd..
\`\`\`

### Environment changes not reflecting

\`\`\`bash
# Clear cache
npm start --clear

# Rebuild app
eas build --platform all --profile development
  \`\`\`

---

## Still Have Questions?

If your question isn't answered here:

1. **Check Documentation:**
   - INSTALLATION
   - CONFIGURATION
   - CUSTOMIZATION
   - TROUBLESHOOTING

2. **Search Error Messages:**
   - Google the exact error
   - Check Stack Overflow
   - Search React Native docs

3. **Contact Support:**
   - Email: support@webpenter.com
   - Include purchase code
   - Provide detailed information

---

## Useful Resources

- **React Native Docs**: https://reactnative.dev/docs/getting-started
- **Expo Docs**: https://docs.expo.dev/
- **React Navigation**: https://reactnavigation.org/docs/getting-started
- **Stripe Docs**: https://stripe.com/docs/payments
- **Google Maps**: https://developers.google.com/maps/documentation

---

**Need More Help?**

Don't hesitate to reach out to our support team at support@webpenter.com with your purchase code.

    `
  },
  troubleshooting: {
    title: "Troubleshooting",
    icon: Wrench,
    tags: ["help", "fixes", "errors"],
    content: `
# Troubleshooting Guide - BookHere Mobile App

Common issues and solutions for the BookHere mobile application.

---

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Build & Compilation Issues](#build--compilation-issues)
3. [Runtime Errors](#runtime-errors)
4. [Backend & API Issues](#backend--api-issues)
5. [Authentication Problems](#authentication-problems)
6. [Payment Issues](#payment-issues)
7. [Maps & Location Issues](#maps--location-issues)
8. [Push Notification Issues](#push-notification-issues)
9. [UI & Display Issues](#ui--display-issues)
10. [Performance Issues](#performance-issues)

---

## Installation Issues

### Cannot find module errors

**Problem:** After running \`npm install\`, getting "Cannot find module" errors

**Solution:**
\`\`\`bash
# 1. Clear npm cache
npm cache clean --force

# 2. Remove node_modules and lock file
rm - rf node_modules package - lock.json

# 3. Reinstall dependencies
npm install

# 4. If on iOS, reinstall pods
cd ios && pod install && cd..
\`\`\`

---

### npm install fails with EACCES permission denied

**Problem:** Permission errors during \`npm install\`

**Solution:**
\`\`\`bash
# Option 1: Use sudo(not recommended)
sudo npm install

# Option 2: Fix npm permissions(recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile

# Then reinstall
npm install
  \`\`\`

---

### gyp ERR! or node-gyp errors

**Problem:** Native module compilation fails

**Solution:**
\`\`\`bash
# On macOS
xcode-select --install

# On Linux
sudo apt-get install build-essential

# On Windows
npm install --global windows-build-tools

# Then reinstall
npm install
  \`\`\`

---

### Expo CLI not found

**Problem:** \`expo: command not found\`

**Solution:**
\`\`\`bash
# Install Expo CLI globally
npm install -g expo-cli

# Verify installation
expo --version
  \`\`\`

---

## Build & Compilation Issues

### Metro bundler fails to start

**Problem:** Metro bundler crashes or shows errors

**Solution:**
\`\`\`bash
# Clear Metro cache
npm start --clear

# OR
npx react-native start --reset-cache

# If still failing, clear watchman
watchman watch-del-all
  \`\`\`

---

### iOS build fails with CocoaPods error

**Problem:** Pod install fails or iOS build errors

**Solution:**
\`\`\`bash
# Navigate to iOS directory
cd ios

# Remove Pods and Podfile.lock
rm -rf Pods Podfile.lock

# Reinstall pods
pod deintegrate
pod install

# If still failing, update CocoaPods
sudo gem install cocoapods

# Then retry
pod install --repo-update

cd..
\`\`\`

---

### Android build fails with Gradle error

**Problem:** Android build fails during Gradle compilation

**Solution:**
\`\`\`bash
# Navigate to android directory
cd android

# Clean build
  ./gradlew clean

# If permission denied
chmod + x gradlew

# Clear Gradle cache
rm -rf .gradle

# Return to root and rebuild
cd..
npx expo run:android
  \`\`\`

---

### Build fails with "ANDROID_HOME not set"

**Problem:** Android SDK path not configured

**Solution:**

**On macOS/Linux:**
\`\`\`bash
# Add to ~/.zshrc or ~/.bash_profile
export ANDROID_HOME = $HOME/Library/Android/sdk
export PATH = $PATH: $ANDROID_HOME/emulator
export PATH = $PATH: $ANDROID_HOME/platform-tools

# Reload
source ~/.zshrc
  \`\`\`

**On Windows:**
\`\`\`
# Add to Environment Variables
ANDROID_HOME = C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk

# Add to Path
% ANDROID_HOME %\\platform-tools
% ANDROID_HOME %\\emulator
      \`\`\`

---

### EAS build fails

**Problem:** EAS Build cloud build fails

**Solution:**
\`\`\`bash
# 1. Check build logs
eas build: list

# 2. View specific build logs
eas build: view[BUILD_ID]

# 3. Common fixes:
# - Ensure eas.json is configured correctly
# - Check app.json for errors
# - Verify bundle identifier / package name
# - Clear EAS cache
eas build --clear -cache

# 4. Rebuild
eas build --platform ios --profile production
  \`\`\`

---

## Runtime Errors

### App shows blank white screen

**Problem:** App loads but shows blank screen

**Solution:**
\`\`\`bash
# 1. Check console for errors
# Look for JavaScript errors in terminal

# 2. Clear Metro cache
npm start --clear

# 3. Check App.tsx for syntax errors
# Ensure all imports are correct

# 4. Verify navigation setup
# Check if navigation is properly configured

# 5. Test with simplified App.tsx
# Temporarily simplify to isolate issue
  \`\`\`

---

### App crashes on startup

**Problem:** App crashes immediately when opening

**Solution:**
\`\`\`bash
# 1. Check device logs
# iOS: Xcode → Window → Devices and Simulators → View Device Logs
# Android: adb logcat

# 2. Common causes:
# - Missing native dependencies
# - Incorrect configuration
# - JavaScript errors

# 3. Rebuild with clean slate
rm -rf node_modules ios/build android/build
npm install
npx expo prebuild --clean

# 4. Rebuild app
npx expo run:ios  # or run: android
  \`\`\`

---

### "Network request failed" errors

**Problem:** All API calls failing with network errors

**Solution:**
1. **Check API URL**
   \`\`\`javascript
// src/ApiUrl.js
// Ensure URL is correct and ends with /
api_url: "https://yourdomain.com/"
  \`\`\`

2. **Verify backend is accessible**
   \`\`\`bash
   # Test in browser
   curl https://yourdomain.com/wp-json/
\`\`\`

3. **Check CORS configuration**
   - Backend must allow cross-origin requests
   - Add CORS headers in WordPress

4. **Test on physical device**
   - Simulators may have network restrictions
   - Use same WiFi network

5. **Check firewall/security settings**
   - Disable VPN temporarily
   - Check corporate firewall

---

### Undefined is not an object error

**Problem:** Errors like "undefined is not an object (evaluating 'x.y')"

**Solution:**
1. **Check the error stack trace**
   - Identify the file and line number
   - Look for the specific property access

2. **Add null checks**
   \`\`\`javascript
// Before
const value = data.property.subProperty;

// After
const value = data?.property?.subProperty;
\`\`\`

3. **Verify API responses**
   - Check if backend is returning expected data
   - Add console.log to inspect data

4. **Check AsyncStorage**
   - May be trying to access non-existent stored data
   - Add default values

---

### Cannot read property of undefined

**Problem:** Similar to above, accessing properties on undefined

**Solution:**
\`\`\`javascript
// Use optional chaining and nullish coalescing
const name = user?.profile?.name ?? 'Guest';

// Or check before accessing
if (user && user.profile) {
  const name = user.profile.name;
}

// For arrays
const firstItem = items?.[0] ?? null;
\`\`\`

---

## Backend & API Issues

### 401 Unauthorized errors

**Problem:** API returns 401 errors

**Solution:**
1. **Check authentication token**
   \`\`\`javascript
  // Verify token is being sent in headers
  // Check token expiration
  \`\`\`

2. **Re-login**
   - Token may have expired
   - Clear storage and login again

3. **Verify backend JWT configuration**
   \`\`\`php
// wp-config.php
define('JWT_AUTH_SECRET_KEY', 'your-secret-key');
\`\`\`

4. **Check token format**
   - Should be Bearer token
   - Format: \`Bearer eyJ0eXAiOiJKV1QiLCJhbGc...\`

---

### 404 Not Found on API calls

**Problem:** Backend endpoints return 404

**Solution:**
1. **Verify API URL**
   - Check \`src/ApiUrl.js\`
   - Ensure trailing slash: \`https://domain.com/\`

2. ** Check permalinks **
  - WordPress Settings → Permalinks
    - Should be "Post name" structure

3. ** Verify.htaccess **
  - Ensure mod_rewrite is enabled
    - Check.htaccess file exists

4. ** Test endpoint directly **
  \`\`\`bash
   curl https://yourdomain.com/wp-json/jwt-auth/v1/token
   \`\`\`

---

### CORS errors

  ** Problem:** "Access-Control-Allow-Origin" errors

    ** Solution:**

** Option 1: Add to wp - config.php **
  \`\`\`php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
\`\`\`

  ** Option 2: Use WordPress plugin **
    - Install "WP CORS" plugin
      - Configure allowed origins

        ** Option 3: Server configuration **
          \`\`\`apache
# .htaccess
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>
\`\`\`

---

### Slow API responses

  ** Problem:** API calls taking too long

    ** Solution:**
      1. ** Optimize backend **
        - Add caching plugin(WP Super Cache)
          - Optimize database
            - Use CDN for images

2. ** Reduce payload size **
    - Limit returned fields
      - Add pagination
        - Compress responses

3. ** Add timeout handling **
  \`\`\`javascript
   axios.defaults.timeout = 10000; // 10 seconds
   \`\`\`

---

## Authentication Problems

### Google Sign - In not working

  ** Problem:** Google Sign - In fails or shows errors

    ** Solution:**
      1. ** Verify Client IDs **
        \`\`\`env
   # .env
   EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=correct_client_id
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=correct_web_client_id
   \`\`\`

2. ** Check bundle ID matches **
  - Google Cloud Console bundle ID
    - app.json bundle identifier
      - Must match exactly

3. ** Rebuild app after.env changes **
  \`\`\`bash
   npm start --clear
   eas build --platform all
   \`\`\`

4. ** Verify OAuth consent screen **
  - Check it's published (not in testing)
    - Add test users if in testing mode

5. ** Check Google Services files **
  - iOS: GoogleService-Info.plist in root
    - Android: google-services.json in root

---

### Biometric authentication fails

  ** Problem:** Face ID / Fingerprint not working

    ** Solution:**
      1. ** Check device support **
        \`\`\`javascript
   import * as LocalAuthentication from 'expo-local-authentication';

   const compatible = await LocalAuthentication.hasHardwareAsync();
   const enrolled = await LocalAuthentication.isEnrolledAsync();
   \`\`\`

2. ** Verify permissions **
  \`\`\`json
   // app.json
   "ios": {
     "infoPlist": {
       "NSFaceIDUsageDescription": "Allow app to use Face ID"
     }
   },
   "android": {
     "permissions": [
       "android.permission.USE_BIOMETRIC"
     ]
   }
   \`\`\`

3. ** Test on physical device **
  - Biometrics don't work in simulators
    - Must test on real device

---

### Login session expires quickly

  ** Problem:** Users logged out frequently

    ** Solution:**
      1. ** Extend token expiration **
        \`\`\`php
   // Backend wp-config.php
   define('JWT_AUTH_EXPIRE_TIME', 7 * DAY_IN_SECONDS);
   \`\`\`

2. ** Implement token refresh **
  - Add refresh token logic
    - Refresh before expiration

3. ** Check secure storage **
  - Verify tokens are stored securely
    - Check if tokens are being cleared

---

## Payment Issues

### Stripe payments failing

  ** Problem:** Payment processing fails with Stripe

  ** Solution:**
    1. ** Verify publishable key **
      \`\`\`typescript
   // Check helpers.ts
   const publishableKey = "pk_test_..." // Correct key
   \`\`\`

2. ** Use test cards **
  \`\`\`
   Success: 4242 4242 4242 4242
   Decline: 4000 0000 0000 0002
   3D Secure: 4000 0025 0000 3155
   \`\`\`

3. ** Check Stripe dashboard **
  - View error logs
    - Check webhook configuration
      - Verify API version

4. ** Test mode vs Live mode **
  - Ensure using correct keys
- Test mode for development
  - Live mode for production

5. ** Check error messages **
      \`\`\`javascript
   try {
     await stripe.createPaymentMethod(...);
   } catch (error) {
     console.log('Stripe error:', error.message);
   }
   \`\`\`

---

### Apple Pay not working(iOS)

  ** Problem:** Apple Pay option not showing or fails

    ** Solution:**
      1. ** Verify merchant ID **
        - Created in Apple Developer Console
          - Added to app.json entitlements
            - Configured in Stripe dashboard

2. ** Check device support **
  - Device must support Apple Pay
    - Card must be added to Wallet

3. ** Test on physical device **
  - Apple Pay doesn't work in simulator

4. ** Verify app.json configuration **
  \`\`\`json
   {
     "ios": {
       "entitlements": {
         "com.apple.developer.in-app-payments": [
           "merchant.com.yourcompany.yourapp"
         ]
       }
     }
   }
   \`\`\`

---

### Payment succeeds but booking not created

  ** Problem:** Payment processes but no reservation created

    ** Solution:**
      1. ** Check backend webhook **
        - Verify webhook URL is correct
          - Check webhook is receiving events
            - View webhook logs in Stripe

2. ** Verify payment metadata **
  \`\`\`javascript
   // Ensure booking info is sent
   metadata: {
     booking_id: bookingId,
     user_id: userId,
     property_id: propertyId
   }
   \`\`\`

3. ** Check backend processing **
  - View backend logs
    - Ensure booking creation logic works
      - Test webhook manually

---

## Maps & Location Issues

### Maps not showing

  ** Problem:** Google Maps component shows blank

    ** Solution:**
      1. ** Verify API key **
        \`\`\`json
   // app.json
   "ios": {
     "config": {
       "googleMapsApiKey": "AIza..."  // Correct key
     }
   }
   \`\`\`

2. ** Check APIs enabled **
  - Maps SDK for iOS
    - Maps SDK for Android
      - Places API(if using)

      3. ** Enable billing **
        - Google Cloud Console
          - Billing must be enabled
            - Free tier available

4. ** Check API restrictions **
  - Remove restrictions during testing
    - Add proper restrictions for production

5. ** Rebuild app **
  \`\`\`bash
   # Changes to app.json require rebuild
   eas build --platform all --profile development
   \`\`\`

---

### Location permissions denied

  ** Problem:** App can't access device location

    ** Solution:**
      1. ** Check permissions in app.json **
        \`\`\`json
   "ios": {
     "infoPlist": {
       "NSLocationWhenInUseUsageDescription": "We need location to show nearby properties"
     }
   }
   \`\`\`

2. ** Request permissions in code **
  \`\`\`javascript
   import * as Location from 'expo-location';

   const { status } = await Location.requestForegroundPermissionsAsync();
   if (status !== 'granted') {
     // Handle denial
   }
   \`\`\`

3. ** Check device settings **
  - iOS: Settings → App → Location
    - Android: Settings → Apps → App → Permissions

---

## Push Notification Issues

### Notifications not received

  ** Problem:** Push notifications don't appear

    ** Solution:**
      1. ** Verify permissions **
        \`\`\`javascript
   import * as Notifications from 'expo-notifications';

   const { status } = await Notifications.requestPermissionsAsync();
   \`\`\`

2. ** Check notification token **
  \`\`\`javascript
   const token = await Notifications.getExpoPushTokenAsync();
   console.log('Token:', token.data);
   \`\`\`

3. ** Test with Expo tool **
  \`\`\`bash
   expo push:send --to ExponentPushToken[xxx] --title "Test"
   \`\`\`

4. ** Verify backend sending **
  - Check backend notification sending logic
    - View Expo Push Notification logs

5. ** Test on physical device **
  - Notifications may not work on simulators
    - iOS simulator doesn't support push

6. ** Check notification settings **
  - Device notification settings
    - App - specific settings
      - Do Not Disturb mode

---

### APNs or FCM configuration errors

  ** Problem:** iOS(APNs) or Android(FCM) push not working

    ** Solution:**
      1. ** For iOS(APNs) **
        \`\`\`bash
   eas credentials
   # Select iOS → Push Notifications
   # Upload APNs key (.p8 file)
   \`\`\`

2. ** For Android(FCM) **
  \`\`\`bash
   eas credentials
   # Select Android → Push Notifications
   # Upload google-services.json
   \`\`\`

3. ** Verify credentials **
  - Check EAS credentials manager
    - Ensure correct team / account
      - Verify key IDs match

---

## UI & Display Issues

### Dark mode not working

  ** Problem:** App doesn't respect dark mode

    ** Solution:**
      1. ** Check device settings **
        - iOS: Settings → Display & Brightness → Dark
          - Android: Settings → Display → Dark theme

2. ** Verify useColorScheme **
  \`\`\`javascript
   import { useColorScheme } from 'react-native';

   const colorScheme = useColorScheme();
   const colors = Colors[colorScheme ?? 'light'];
   \`\`\`

3. ** Check Colors.ts **
  - Ensure dark colors are defined
    - Verify colors are used in components

---

### Images not loading

  ** Problem:** Images show broken or don't load

    ** Solution:**
      1. ** Check image URLs **
        - Verify URLs are correct and accessible
          - Test URLs in browser

2. ** Check network connection **
  - Ensure device has internet
    - Test API connectivity

3. ** Add error handling **
  \`\`\`javascript
   <Image
     source={{ uri: imageUrl }}
     onError={(error) => console.log('Image error:', error)}
     defaultSource={require('./assets/placeholder.png')}
   />
   \`\`\`

4. ** Check CORS for images **
  - Image server must allow CORS
    - Add appropriate headers

---

### Layout broken on different screen sizes

  ** Problem:** UI looks broken on some devices

    ** Solution:**
      1. ** Use responsive design **
        \`\`\`javascript
   import { Dimensions } from 'react-native';

   const { width, height } = Dimensions.get('window');

   // Use percentages or calculated values
   width: width * 0.9
   \`\`\`

2. ** Test on multiple devices **
  - Small phones(iPhone SE)
    - Large phones(iPhone Pro Max)
      - Tablets
      - Different aspect ratios

3. ** Use flexible layouts **
  \`\`\`javascript
   <View style={{ flex: 1 }}>
     <ScrollView>
       {/* Content */}
     </ScrollView>
   </View>
   \`\`\`

---

## Performance Issues

### App is slow or laggy

  ** Problem:** App performance is poor

    ** Solution:**
      1. ** Enable Hermes ** (if not enabled)
\`\`\`json
   // app.json
   "jsEngine": "hermes"
   \`\`\`

2. ** Optimize images **
  - Compress images
    - Use appropriate sizes
      - Consider WebP format

3. ** Use React.memo **
  \`\`\`javascript
   export const MyComponent = React.memo(({ prop }) => {
     return <View>{/* content */}</View>;
   });
   \`\`\`

4. ** Optimize re - renders **
  \`\`\`javascript
   // Use useCallback
   const handlePress = useCallback(() => {
     // logic
   }, [dependencies]);

   // Use useMemo
   const value = useMemo(() => {
     return expensiveCalculation();
   }, [dependencies]);
   \`\`\`

5. ** Profile with Flipper **
- Install Flipper
  - Use React DevTools
    - Profile performance

---

### App crashes with out of memory

  ** Problem:** App crashes due to memory issues

    ** Solution:**
      1. ** Optimize images **
        - Reduce image sizes
          - Use thumbnails for lists
            - Load full size on demand

2. ** Fix memory leaks **
  - Cleanup listeners in useEffect
    - Cancel timers and intervals
      - Clear intervals on unmount

3. ** Use FlatList for long lists **
  \`\`\`javascript
   <FlatList
     data={items}
     renderItem={renderItem}
     keyExtractor={item => item.id}
     maxToRenderPerBatch={10}
     windowSize={10}
   />
   \`\`\`

---

## Getting Further Help

If issues persist after trying these solutions:

1. ** Check Error Logs **
  - iOS: Xcode Console
    - Android: \`adb logcat\`

2. ** Search Documentation **
  - React Native: https://reactnative.dev
  - Expo: https://docs.expo.dev

3. ** Community Resources **
  - Stack Overflow
    - React Native GitHub Issues
      - Expo Forums

4. ** Contact Support **
   📧 Email: support @webpenter.com

Include:
- Your purchase code
  - Detailed error description
    - Error messages / screenshots
      - Steps to reproduce
        - Device / platform info

---

** Still stuck ?** Don't hesitate to reach out to our support team!


    `
  },
  changelog: {
    title: "ChangeLog",
    icon: Clock,
    tags: ["updates", "versions", "history"],
    content: `
# Changelog

All notable changes to the BookHere mobile application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.0.0] - 2026-01-05

### 🎉 Major Release - Complete Redesign & Performance Overhaul

This is the biggest update yet! Complete redesigns, multi-language support, and massive performance improvements.

### ✨ Added

#### Multi-Language Support
- **10 Languages** now supported:
  - English
  - Spanish (Español)
  - Portuguese (Português)
  - French (Français)
  - German (Deutsch)
  - Russian (Русский)
  - Chinese (中文)
  - Arabic (العربية) with RTL support
  - Urdu (اردو) with RTL support
  - Hindi (हिंदी)
- Automatic device language detection
- Runtime language switching
- Complete UI translation coverage

#### Blog System Redesign
- Beautiful full-screen image galleries with swipe navigation
- Reading progress bar
- Engagement metrics (likes, comments, saves)
- Author profile cards with detailed information
- Related articles carousel
- Quick actions bar for bookmarking and sharing
- Smooth animations throughout
- Modern magazine-style reading experience

#### Property Management Redesign
- Grid/list view toggle for property listings
- Advanced search within your properties
- Quick stats cards (Published, Pending, Rejected)
- Status-based filtering with one tap
- Swipe left for quick edit/delete actions
- Pull-to-refresh functionality
- Improved property status indicators
- Enhanced empty states

#### Social Sharing Integration
- Facebook sharing
- Twitter sharing
- WhatsApp sharing
- Telegram sharing
- Copy link functionality
- Native share sheet integration
- Smooth sharing animations

### 🎨 Changed

#### Performance Improvements
- **60% reduction in app size** (30-40MB vs 100MB)
- **40% faster app startup time**
- **30% less memory usage**
- **60fps scrolling** optimization
- Improved image loading and caching
- Better memory management
- Optimized animations and transitions

#### Messaging System
- Updated color scheme matching app branding
- All icons now use BookHere signature colors
- Improved message sync reliability
- Enhanced performance
- Better error handling
- Smoother animations

#### UI/UX Enhancements
- Consistent color usage throughout app
- Improved dark mode appearance
- Better loading states with shimmer effects
- Enhanced empty state messages
- Smoother transitions between screens
- Updated icons and indicators
- Refined spacing and typography

### 🐛 Fixed

#### Android Fixes
- Fixed back button not working properly in modals
- Improved keyboard handling in messages and forms
- Fixed status bar appearance on all Android devices
- Corrected shadows and elevations displaying
- Resolved navigation state persistence issues

#### Messaging Fixes
- Fixed message sync issues causing delays
- Prevented data loss when navigating from unsent messages
- Fixed crashes when loading images or documents
- Improved message delivery reliability
- Fixed notification handling for messages

#### Property Listing Fixes
- Fixed favorite/bookmark syncing across app
- Improved property image loading and caching
- Fixed layout issues on different screen sizes
- Better error handling when properties fail to load
- Fixed property search result accuracy

#### Search & Navigation Fixes
- Improved search results accuracy
- Fixed navigation history tracking
- Better deep linking support for notifications
- Navigation state now persists across app restarts
- Fixed filter application issues

#### Visual Polish Fixes
- Fixed inconsistent colors across the app
- Improved dark mode appearance
- Better loading states and animations
- Fixed visual glitches and layout shifts
- Corrected RTL layout issues

### 🔧 Technical Improvements

#### Under the Hood
- Enabled ProGuard code optimization for Android
- Split APKs by architecture for smaller downloads
- Improved image optimization and compression
- Better error boundaries prevent full app crashes
- Fixed memory leaks in auto-slide carousels
- Improved API request handling and cancellation
- Better TypeScript type coverage

### 📊 Statistics

- **11** new blog components created from scratch
- **10** languages supported
- **60%** reduction in app size
- **40%** faster app startup
- **30%** less memory usage
- **68** bug fixes and improvements
- **2** complete feature redesigns
- **Hundreds** of visual and performance enhancements

---

## [2.0.0] - 2025-08-15

### 🎉 Major Update - Enhanced Features & Stability

### ✨ Added
- **Dark Mode Support**: Automatic dark theme based on system settings
- **Biometric Authentication**: Face ID and Fingerprint login
- **Enhanced Wallet**: Detailed earnings analytics and charts
- **Invoice Generation**: Download and share booking invoices
- **Property Analytics**: View performance metrics for listings
- **Push Notification**: Real-time booking and message alerts
- **OTP Verification**: Phone number verification system

### 🎨 Changed
- Redesigned home screen with better property discovery
- Improved property detail page layout
- Enhanced search and filter interface
- Better image gallery with pinch-to-zoom
- Modernized profile settings screen
- Updated color scheme for better contrast

### 🐛 Fixed
- Fixed login session timeout issues
- Resolved image upload failures
- Fixed booking date selection bugs
- Improved API error handling
- Fixed payment processing edge cases
- Resolved navigation stack issues
- Fixed calendar date picker bugs

### 🔧 Technical
- Updated to React Native 0.72.0
- Updated to Expo SDK 49
- Migrated to React Navigation 6.x
- Improved TypeScript coverage
- Better code organization
- Performance optimizations

---

## [1.5.0] - 2025-05-20

### ✨ Added
- **Property Comparison**: Compare multiple properties side-by-side
- **Saved Searches**: Save search criteria for quick access
- **Price Alerts**: Get notified when prices drop
- **Instant Booking**: Book properties without host approval
- **Amenities Filtering**: Enhanced filter by property amenities
- **Map Clustering**: Better map performance with many properties

### 🎨 Changed
- Improved property card design
- Enhanced booking confirmation flow
- Better search results pagination
- Modernized settings interface
- Updated messaging UI

### 🐛 Fixed
- Fixed map marker clustering issues
- Resolved booking confirmation emails
- Fixed date range selection bugs
- Improved offline handling
- Fixed crash on property details
- Resolved payment webhook issues

---

## [1.4.2] - 2025-03-10

### 🐛 Fixed
- Critical payment processing bug
- Fixed Google Sign-In on iOS
- Resolved navigation crash
- Fixed property image carousel
- Improved API timeout handling

### 🔧 Technical
- Updated dependencies to latest stable versions
- Security patches applied
- Performance improvements

---

## [1.4.0] - 2025-02-01

### ✨ Added
- **PayPal Integration**: Alternative payment method
- **Thai QR Payment**: QR code-based payments
- **Property Video Tours**: Support for video uploads
- **Review Photos**: Guests can upload photos with reviews
- **Host Response**: Hosts can respond to reviews
- **Property Rules**: Detailed house rules section

### 🎨 Changed
- Improved booking flow with step-by-step wizard
- Enhanced property images with better quality
- Better loading indicators throughout app
- Modernized tab bar design

### 🐛 Fixed
- Fixed Stripe payment errors on some cards
- Resolved favorite sync issues
- Fixed messaging notification bugs
- Improved error messages

---

## [1.3.0] - 2024-12-15

### ✨ Added
- **Reservation Management**: Complete dashboard for hosts
- **Calendar View**: See bookings in calendar format
- **Guest Profiles**: View guest information and history
- **Cancellation Requests**: Request and manage cancellations
- **Property Status**: Track listing approval status
- **Earnings Dashboard**: Detailed revenue tracking

### 🎨 Changed
- Redesigned dashboard navigation
- Improved property management interface
- Enhanced messaging interface
- Better tablet support

### 🐛 Fixed
- Fixed reservation sync issues
- Resolved calendar date bugs
- Fixed profile update errors
- Improved image upload reliability

---

## [1.2.0] - 2024-10-20

### ✨ Added
- **Add Listing**: 7-step property submission wizard
- **Photo Upload**: Multiple image upload with preview
- **Pricing Setup**: Flexible pricing configuration
- **Amenities Selection**: Comprehensive amenities list
- **Location Picker**: Interactive map for location selection
- **Draft Saving**: Auto-save listing drafts

### 🎨 Changed
- Improved form validation throughout app
- Better error messages
- Enhanced loading states
- Modernized UI components

### 🐛 Fixed
- Fixed form submission errors
- Resolved image compression issues
- Fixed location picker bugs
- Improved validation feedback

---

## [1.1.0] - 2024-08-30

### ✨ Added
- **Google Maps Integration**: Interactive property maps
- **Advanced Search**: Search by location, dates, guests
- **Favorites**: Save properties to wishlist
- **Reviews & Ratings**: Read and write property reviews
- **Direct Messaging**: Chat with hosts
- **Booking System**: Complete reservation workflow

### 🎨 Changed
- Improved navigation structure
- Enhanced property detail page
- Better search interface
- Modernized authentication screens

### 🐛 Fixed
- Fixed map rendering issues
- Resolved booking calculation bugs
- Fixed messaging sync problems
- Improved search performance

---

## [1.0.0] - 2024-07-01

### 🎉 Initial Release

#### Core Features
- **User Authentication**: Login, signup, password recovery
- **Property Listings**: Browse and search properties
- **Property Details**: Detailed property information
- **User Profile**: Manage account settings
- **Basic Booking**: Make reservations
- **Stripe Payments**: Credit card payment processing
- **Basic Messaging**: Contact property hosts
- **Push Notifications**: Basic notification support

#### Platforms
- iOS 12.0+
- Android 5.0+

#### Technology Stack
- React Native 0.68.0
- Expo SDK 46
- React Navigation 5.x
- TypeScript support

---

## Version History Summary

| Version | Release Date | Key Feature |
|---------|-------------|-------------|
| 3.0.0   | 2026-01-05  | Multi-language, redesign, 60% smaller |
| 2.0.0   | 2025-08-15  | Dark mode, biometrics, analytics |
| 1.5.0   | 2025-05-20  | Property comparison, instant booking |
| 1.4.2   | 2025-03-10  | Critical bug fixes |
| 1.4.0   | 2025-02-01  | PayPal, QR payments, video tours |
| 1.3.0   | 2024-12-15  | Reservation management, calendar |
| 1.2.0   | 2024-10-20  | Add listing wizard |
| 1.1.0   | 2024-08-30  | Google Maps, messaging, reviews |
| 1.0.0   | 2024-07-01  | Initial release |

---

## Upgrade Guide

### From 2.x to 3.0.0

#### Breaking Changes
None - all changes are backward compatible

#### Recommended Updates
1. Update \`app.json\` with new configuration
2. Add \`.env\` file for Google OAuth
3. Update dependencies: \`npm install\`
4. Clear cache: \`npm start --clear\`
5. Rebuild app: \`eas build --platform all\`

#### New Features to Configure
- Multi-language support (optional)
- Social sharing (configure share URLs)
- Updated color scheme (customize in Colors.ts)

### From 1.x to 2.0.0

#### Breaking Changes
- Navigation structure changed to React Navigation 6.x
- Dark mode requires theme setup

#### Required Updates
1. Update dependencies: \`npm install\`
2. Update navigation imports
3. Add dark mode colors to Colors.ts
4. Rebuild app

---

## Deprecation Notices

### Version 3.0.0
- No deprecations in this version

### Version 2.0.0
- React Navigation 5.x support will be removed in v4.0.0
- Expo SDK 49 is minimum supported version

---

## Known Issues

### Version 3.0.0
- **iOS 12.x**: Some animations may appear slower on older devices (optimization in progress)
- **Android 5.x**: Dark mode transition may have minor visual glitches
- **Workaround**: Restart app after changing language for full effect

### Planned Fixes
These issues will be addressed in upcoming minor releases:
- Further optimization for iOS 12
- Dark mode transition smoothness on Android 5-6
- Language change instant application

---

## Coming Soon

### Version 3.1.0 (Planned)
- Apple Sign-In integration
- Facebook login
- Enhanced property comparison
- Saved payment methods
- AR room preview (iOS 13+)
- Improved accessibility
- More currency options

### Version 3.2.0 (Planned)
- Advanced host analytics
- Dynamic pricing suggestions
- Multi-property booking
- Split payments
- Group bookings
- Enhanced calendar management

---

## Support

For questions about updates or specific versions:

📧 Email: support@webpenter.com
🔖 Purchase Code: Required for support
📚 Documentation: See /documentation folder

---

## License

All versions are subject to the ThemeForest license terms.

- Regular License: Single use
- Extended License: Multiple/SaaS use

See LICENSE.txt for full terms.


    `
  },
  submission: {
    title: "App Submission",
    icon: ExternalLink,
    subItems: {
      play_store: {
        title: "Google Play Store",
        icon: Play,
        tags: ["android", "submission", "checklist"],
        content: `
# Google Play Store Submission Checklist

This comprehensive checklist will guide you through preparing and submitting your BookHere app to the Google Play Store.

## Table of Contents

1. [Pre-Submission Setup](#pre-submission-setup)
2. [Environment Variables & API Keys](#environment-variables--api-keys)
3. [App Configuration](#app-configuration)
4. [Build & Testing](#build--testing)
5. [Store Listing Assets](#store-listing-assets)
6. [Google Play Console Setup](#google-play-console-setup)
7. [Final Checks](#final-checks)
8. [Submission](#submission)

---

## Pre-Submission Setup

### 1. Google Play Developer Account

- [ ] Create a Google Play Developer account ($25 one-time fee)
- [ ] Complete identity verification
- [ ] Set up payment profile (for paid apps or in-app purchases)
- [ ] Accept Google Play Developer Distribution Agreement

**URL:** https://play.google.com/console/signup

---

## Environment Variables & API Keys

### 2. Production Environment Variables

#### 2.1 Get Production SHA-1 Certificate

- [ ] Create your app in Google Play Console
- [ ] Opt in to Google Play App Signing (recommended)
- [ ] Go to: **Google Play Console → Your App → Setup → App Signing**
- [ ] Copy the **SHA-1 certificate fingerprint** (under "App signing key certificate")

#### 2.2 Configure Google Cloud Console

Go to: https://console.cloud.google.com/apis/credentials

##### Google OAuth (Sign-In)

- [ ] Create **Android OAuth 2.0 Client ID**:
  - Package name: \`com.webpenter.googlesignin\`
  - SHA-1 fingerprint: [Paste production SHA-1 from step 2.1]
  - Copy the Client ID

- [ ] Create **iOS OAuth 2.0 Client ID** (if not already created):
  - Bundle ID: \`com.webpenter.googlesignin\`
  - Copy the Client ID

- [ ] Create **Web OAuth 2.0 Client ID** (if not already created):
  - Copy the Client ID

##### Google Maps API

- [ ] Create a **production API key** (or use existing)
- [ ] Restrict the key:
  - Application restrictions: **Android apps**
  - Add package name: \`com.webpenter.googlesignin\`
  - Add SHA-1 fingerprint: [Paste production SHA-1]
- [ ] Enable required APIs:
  - [ ] Maps SDK for Android
  - [ ] Places API (if used)
  - [ ] Geocoding API (if used)

#### 2.3 Configure Firebase Console

Go to: https://console.firebase.google.com/

- [ ] Open your Firebase project
- [ ] Go to **Project Settings**
- [ ] Add production SHA-1 certificate fingerprint
- [ ] Download new **google-services.json** for Android
- [ ] Replace the file in your project root: \`/google-services.json\`

#### 2.4 Update Production Environment File

Edit: \`/Users/apple/homey-mobile-apps-react/.env.production\`

\`\`\`bash
# Production Environment Variables

# Google OAuth Client IDs(REPLACE WITH YOUR PRODUCTION VALUES)
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=YOUR_PRODUCTION_IOS_CLIENT_ID.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=YOUR_PRODUCTION_WEB_CLIENT_ID.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=YOUR_PRODUCTION_ANDROID_CLIENT_ID.apps.googleusercontent.com

# Google Maps API Key(Production)
GOOGLE_MAPS_API_KEY=YOUR_PRODUCTION_GOOGLE_MAPS_API_KEY

# App Configuration
APP_VARIANT=production
          \`\`\`

- [ ] Replace all \`YOUR_PRODUCTION_*\` placeholders with actual values from steps 2.2 and 2.3
- [ ] Save the file
- [ ] **DO NOT commit this file to git** (already in .gitignore)

---

## App Configuration

### 3. Update App Version

Edit: \`app.config.js\`

- [ ] Update version number: \`version: "3.0.0"\` → \`"X.Y.Z"\`
- [ ] Update Android versionCode: \`versionCode: 10\` → increment by 1 (e.g., \`11\`)
- [ ] Update iOS buildNumber: \`buildNumber: \"10\"\` → increment by 1 (e.g., \`\"11\"\`)

**Version Guidelines:**
- Major version (X): Breaking changes
- Minor version (Y): New features
- Patch version (Z): Bug fixes
- versionCode: Must increment with each release (used by Google Play)

### 4. App Bundle Identifier

Verify in \`app.config.js\`:

\`\`\`javascript
android: {
  package: "com.webpenter.googlesignin",  // Must match Google Cloud Console
  versionCode: 11,
  // ...
}
\`\`\`

- [ ] Confirm package name matches all Google services configurations

### 5. App Permissions

Review in \`app.config.js\` (android.permissions):

- [ ] Remove any unnecessary permissions
- [ ] Ensure required permissions are present:
  - \`android.permission.INTERNET\`
  - \`android.permission.USE_BIOMETRIC\` (if using biometric auth)
  - \`android.permission.RECORD_AUDIO\` (if using audio features)

---

## Build & Testing

### 6. Build Production APK/AAB

#### 6.1 Clean Build

\`\`\`bash
# Remove old builds
rm -rf node_modules
rm -rf .expo

# Reinstall dependencies
npm install
\`\`\`

#### 6.2 Create Production Build

\`\`\`bash
# Build Android App Bundle(AAB) for production
eas build --platform android --profile production
  \`\`\`

**Build Configuration:**
- EAS will automatically use \`.env.production\` values (configured in \`eas.json\`)
- Build will create an \`.aab\` file (Android App Bundle)
- Wait for build to complete (check status at: https://expo.dev)

#### 6.3 Download Build

- [ ] Go to https://expo.dev/accounts/[your-account]/projects/bookhere/builds
- [ ] Download the production \`.aab\` file
- [ ] Save it to a secure location

### 7. Testing

#### 7.1 Internal Testing

- [ ] Upload \`.aab\` to Google Play Console → Internal Testing track
- [ ] Add testers (email addresses)
- [ ] Test all core features:
  - [ ] Google Sign-In (production credentials)
  - [ ] Google Maps functionality
  - [ ] Biometric authentication
  - [ ] Push notifications
  - [ ] Payment flow (if applicable)
  - [ ] All navigation and features

#### 7.2 Pre-Launch Report

- [ ] Review Google Play Console Pre-launch report
- [ ] Fix any crashes or issues found
- [ ] Re-build and re-test if necessary

---

## Store Listing Assets

### 8. App Icon & Graphics

Verify these files exist and meet requirements:

- [ ] App Icon: \`./src/assets/images/icon.png\` (512x512px, PNG)
- [ ] Feature Graphic: Required (1024x500px) - **CREATE THIS**
- [ ] Screenshots: See [SCREENSHOTS_GUIDE.md](./SCREENSHOTS_GUIDE.md)

#### 8.1 Feature Graphic

**Requirements:**
- Size: 1024 x 500 pixels
- Format: PNG or JPEG
- Max file size: 1024 KB

**Create using:**
- Figma, Canva, or design tool of your choice
- Should showcase your app's key feature or branding
- No device frames needed

**Reference:** \`documentation/SCREENSHOTS_GUIDE.md\` for design guidance

#### 8.2 Screenshots

**Requirements:**
- At least 2 screenshots
- Recommended: 4-8 screenshots
- Format: PNG or JPEG
- Dimensions: See guide below

**Phone Screenshots:**
- Min: 320px on short side
- Max: 3840px on long side
- Recommended: 1080 x 1920 (portrait) or 1920 x 1080 (landscape)

**Tablet Screenshots (optional but recommended):**
- Min: 1200px on short side
- Recommended: 1920 x 1200 or 2560 x 1800

**Screenshot Content:**
- [ ] Home screen
- [ ] Property listing
- [ ] Booking flow
- [ ] User profile
- [ ] Maps/location feature
- [ ] Additional key features

**Tool:** Use Figma templates from \`documentation/SCREENSHOTS_GUIDE.md\`

---

## Google Play Console Setup

### 9. Create App Listing

Go to: https://play.google.com/console/

#### 9.1 Create New App

- [ ] Click "Create app"
- [ ] App name: **BookHere** (or your custom name)
- [ ] Default language: **English (United States)**
- [ ] App or game: **App**
- [ ] Free or paid: **Free** (or Paid if applicable)
- [ ] Accept declarations

#### 9.2 Store Listing

**Main Store Listing:**

- [ ] **App name:** BookHere Mobile
- [ ] **Short description** (80 chars max):
  \`\`\`Example Short Description
  Book hotels, apartments, and vacation rentals with ease.
  \`\`\`

- [ ] **Full description** (4000 chars max):
  \`\`\`Example Full Description
  BookHere is your all-in-one mobile solution for discovering and booking accommodations.

  KEY FEATURES:
  • Browse thousands of properties worldwide
  • Advanced search with filters(price, location, amenities)
  • Secure booking and payment processing
  • Real - time availability and instant confirmation
  • Interactive maps with Google Maps integration
  • User reviews and ratings
  • Favorite properties and booking history
  • Biometric authentication for secure login
  • Push notifications for booking updates
  • Multiple payment options

  SEAMLESS BOOKING EXPERIENCE:
  Find your perfect stay with our intuitive interface.Search by location, dates, and preferences.
  View detailed property information, photos, and guest reviews.Book instantly with secure payment processing.

  USER-FRIENDLY FEATURES:
  • Easy property discovery with smart filters
  • Save favorite listings for later
  • Manage bookings in one place
  • Direct messaging with property owners
  • Split payments and flexible options

SECURE & RELIABLE:
  • Biometric authentication(Face ID / Fingerprint)
  • Secure payment processing with Stripe
  • Privacy - focused user data protection
  • 24 / 7 customer support

  Perfect for travelers, vacationers, and business professionals looking for accommodations.

  Download BookHere today and start exploring your next destination!
  \`\`\`

- [ ] **App icon:** Upload \`icon.png\` (512x512)
- [ ] **Feature graphic:** Upload feature graphic (1024x500)
- [ ] **Phone screenshots:** Upload 2-8 screenshots
- [ ] **Tablet screenshots:** Upload (optional)

**Categorization:**

- [ ] **App category:** Travel & Local
- [ ] **Tags:** Add up to 5 tags (e.g., "hotel booking", "travel", "vacation rental", "accommodation")

**Contact Details:**

- [ ] **Email:** your-support-email@example.com
- [ ] **Phone:** (optional) +1-XXX-XXX-XXXX
- [ ] **Website:** https://your-website.com
- [ ] **Privacy Policy URL:** **REQUIRED** - https://your-website.com/privacy-policy

> **Important:** You MUST have a privacy policy URL. Create one if you don't have it.

**External Marketing (optional):**

- [ ] Promotional video (YouTube URL)
- [ ] Marketing opt-in

#### 9.3 Store Settings

**App Access:**

- [ ] All functionality is available without restrictions
- [ ] OR: Provide instructions for special access/demo account

**Ads:**

- [ ] Select "Yes" or "No" for ads in app
- [ ] (If applicable) App uses Ads

**Content Rating:**

- [ ] Complete content rating questionnaire
- [ ] Answer all questions honestly
- [ ] Expected rating: Everyone or Teen (based on content)

**Target Audience:**

- [ ] Target age: 18 and over (or appropriate for your app)
- [ ] Store Listing Presence: All countries or select specific countries

**News Apps (if applicable):**

- [ ] Not applicable (unless your app is a news app)

---

### 10. App Content

#### 10.1 Privacy Policy

- [ ] Create privacy policy page on your website
- [ ] Must cover:
  - Data collection and usage
  - Third-party services (Google, Stripe, etc.)
  - User rights
  - Contact information
- [ ] Add URL to store listing

**Sample Privacy Policy Sections:**
\`\`\`
  - Information Collection
    - How We Use Your Information
      - Data Sharing and Third-party Services
        - Google Sign-In and OAuth
          - Payment Processing(Stripe)
            - Location Services(Google Maps)
              - Push Notifications
                - Data Security
                  - User Rights
                    - Contact Us
                      \`\`\`

#### 10.2 Data Safety

Google Play requires detailed information about data handling:

- [ ] Go to **App Content → Data Safety**
- [ ] Answer questions about:
  - [ ] Data collection (location, personal info, financial info, etc.)
  - [ ] Data sharing with third parties
  - [ ] Security practices (encryption, data deletion)
  - [ ] COPPA compliance

**Data Collected by BookHere:**
- Personal info: Name, email, phone
- Location: Approximate location (for search)
- Financial info: Payment info (processed by Stripe)
- Photos: Profile pictures (optional)
- App activity: Search history, booking history

**Data Shared:**
- With service providers: Google (auth, maps), Stripe (payments)
- Not sold to third parties

**Security:**
- Data encrypted in transit (HTTPS)
- Data encrypted at rest
- Users can request deletion

#### 10.3 App Category & Tags

- [ ] **Category:** Travel & Local
- [ ] **Tags:** hotel, booking, travel, vacation rental, accommodation

---

### 11. Release

#### 11.1 Production Release

- [ ] Go to **Release → Production**
- [ ] Click "Create new release"
- [ ] Upload \`.aab\` file from step 6.3
- [ ] Add release notes:

**Release Notes Example:**
\`\`\`
Initial release - BookHere Mobile v3.0.1

NEW FEATURES:
• Browse and book accommodations worldwide
• Google Sign-In for quick authentication
• Interactive maps with property locations
• Secure payment processing
• Biometric authentication support
• Push notifications for booking updates
• User reviews and ratings
• Favorite properties and booking history

We're excited to bring you BookHere Mobile! Download now and start exploring your next destination.
  \`\`\`

- [ ] Review release (click "Review release")
- [ ] Check for any warnings or errors
- [ ] Fix any issues before proceeding

#### 11.2 Countries & Regions

- [ ] Select countries/regions for distribution
  - All countries (default)
  - OR: Select specific countries

#### 11.3 Rollout Percentage (optional)

- [ ] Start with staged rollout (e.g., 10%, 50%, 100%)
- [ ] OR: Release to 100% immediately

---

## Final Checks

### 12. Pre-Submission Checklist

Before clicking "Submit for Review":

**App Quality:**
- [ ] App has been tested thoroughly
- [ ] No crashes or critical bugs
- [ ] All features work as expected
- [ ] Google Sign-In works with production credentials
- [ ] Google Maps displays correctly
- [ ] Payments process successfully (test mode OK for initial release)

**Store Listing:**
- [ ] App name is correct
- [ ] Descriptions are clear and compelling
- [ ] Screenshots showcase key features
- [ ] Feature graphic looks professional
- [ ] Contact details are accurate
- [ ] Privacy policy URL is live and accessible

**Compliance:**
- [ ] Content rating completed
- [ ] Data safety form completed
- [ ] Privacy policy covers all data collection
- [ ] App complies with Google Play policies
- [ ] No copyright or trademark violations

**Technical:**
- [ ] Correct package name (\`com.webpenter.googlesignin\`)
- [ ] Version code incremented
- [ ] Production environment variables configured
- [ ] google-services.json is production version
- [ ] App signed with correct keystore

**Legal:**
- [ ] Developer Distribution Agreement accepted
- [ ] Content guidelines reviewed
- [ ] No restricted content (see policies)

---

## Submission

### 13. Submit for Review

- [ ] Go to **Publishing overview**
- [ ] Review all sections (should show green checkmarks)
- [ ] Click **"Send X items for review"**
- [ ] Wait for Google review (typically 1-7 days)

### 14. Post-Submission

#### Monitor Review Status:

- [ ] Check Google Play Console daily
- [ ] Respond to any review requests promptly
- [ ] Fix issues if rejected and resubmit

#### After Approval:

- [ ] App will be live on Google Play Store
- [ ] Share store listing URL: \`https://play.google.com/store/apps/details?id=com.webpenter.googlesignin\`
-[] Monitor user reviews and ratings
  - [] Respond to user feedback
    - [] Plan updates and improvements

---

## Additional Resources

### Development Commands

  \`\`\`bash
# Local development build
npm start

# Preview build (development environment)
eas build --platform android --profile preview

# Production build (production environment)
eas build --platform android --profile production

# Check build status
eas build:list

# View credentials
eas credentials -p android
\`\`\`

### Environment Management

  ** Development:**
    \`\`\`bash
# Uses .env.development automatically
npm start
eas build --platform android --profile development
\`\`\`

    ** Production:**
      \`\`\`bash
# Uses .env.production automatically
eas build --platform android --profile production
\`\`\`

### Useful Links

- ** Google Play Console:** https://play.google.com/console/
- ** Google Cloud Console:** https://console.cloud.google.com/
- ** Firebase Console:** https://console.firebase.google.com/
- ** Expo Dashboard:** https://expo.dev/
- ** Google Play Policies:** https://play.google.com/about/developer-content-policy/
- ** App Quality Guidelines:** https://developer.android.com/quality

### Support

For issues or questions:
- ** Documentation:** See\`documentation/\` folder
  - ** Troubleshooting:** \`documentation/TROUBLESHOOTING.md\`
    - ** Configuration:** \`documentation/CONFIGURATION.md\`
      - ** Email:** support@webpenter.com

---

## Troubleshooting Common Issues

### "App not configured for OAuth"

  ** Issue:** Google Sign - In fails in production

    ** Solution:**
      1. Verify SHA-1 certificate in Google Cloud Console
2. Ensure production OAuth client ID is correct in \`.env.production\`
3. Check Firebase console has production SHA-1
4. Re-download\`google-services.json\` if needed

### "Google Maps not displaying"

  ** Issue:** Maps show blank or "For development purposes only"

    ** Solution:**
      1. Check Google Maps API key in \`.env.production\`
2. Verify API key restrictions in Google Cloud Console
3. Ensure Maps SDK for Android is enabled
4. Add production SHA-1 to API key restrictions

### "App rejected for policy violation"

  ** Issue:** Google rejects app submission

    ** Solution:**
      1. Review rejection email carefully
2. Check Google Play policies: https://play.google.com/about/developer-content-policy/
3. Common issues:
- Missing or inadequate privacy policy
  - Incomplete data safety section
    - Copyright / trademark issues
      - Misleading content or functionality
4. Fix issues and resubmit

### "Build fails during EAS build"

  ** Issue:** Production build fails

    ** Solution:**
      1. Check build logs in Expo dashboard
2. Verify all dependencies are installed
3. Ensure \`google-services.json\` is in project root
4. Check environment variables are set correctly
5. Try clearing cache: \`eas build --platform android --profile production --clear-cache\`

---

## Version History

  | Version | Date | Changes |
| ---------| ------| ---------|
| 3.0.0 | 2024 - XX - XX | Initial release |
| 3.0.1 | TBD | Bug fixes and improvements |

  ---

** Last Updated:** 2026-01 -08
  ** Author:** WebPenter Development Team

For ThemeForest buyers: This checklist is specifically tailored for the BookHere Mobile App.Follow all steps carefully to ensure a smooth submission process.

Good luck with your Google Play Store submission! 🚀


`
      },
      app_store: {
        title: "Apple App Store",
        icon: Smartphone,
        tags: ["ios", "submission", "checklist"],
        content: `
# Apple App Store Submission Checklist

This comprehensive checklist will guide you through preparing and submitting your BookHere app to the Apple App Store.

## Table of Contents

1. [Pre-Submission Setup](#pre-submission-setup)
2. [Apple Developer Account Setup](#apple-developer-account-setup)
3. [Certificates & Provisioning](#certificates--provisioning)
4. [Environment Variables & API Keys](#environment-variables--api-keys)
5. [App Configuration](#app-configuration)
6. [Build & Testing](#build--testing)
7. [TestFlight Beta Testing](#testflight-beta-testing)
8. [Store Listing Assets](#store-listing-assets)
9. [App Store Connect Setup](#app-store-connect-setup)
10. [Final Checks](#final-checks)
11. [Submission](#submission)
12. [After Submission](#after-submission)

---

## Pre-Submission Setup

### 1. Requirements

Before you begin, ensure you have:

- [ ] **Mac computer** (required for iOS development)
- [ ] **Xcode** installed (latest version from Mac App Store)
- [ ] **Apple Developer Program** membership ($99/year)
- [ ] **EAS CLI** installed (\`npm install -g eas-cli\`)
- [ ] **Expo account** (free at https://expo.dev)

**Time required:** 1-2 hours for initial setup

---

## Apple Developer Account Setup

### 2. Apple Developer Program

#### 2.1 Enroll in Apple Developer Program

- [ ] Go to https://developer.apple.com/programs/enroll/
- [ ] Choose account type:
  - **Individual**: Personal apps, sole proprietorship
  - **Organization**: Company apps, requires D-U-N-S number
- [ ] Pay $99 annual fee
- [ ] Wait for approval (typically 24-48 hours)

#### 2.2 Verify Enrollment

- [ ] Log in to https://developer.apple.com/account
- [ ] Confirm enrollment status shows "Active"
- [ ] Note your Team ID (needed later)

#### 2.3 Two-Factor Authentication

- [ ] Enable 2FA on your Apple ID (required)
- [ ] Go to https://appleid.apple.com
- [ ] Security → Two-Factor Authentication
- [ ] Add trusted phone number

---

## Certificates & Provisioning

### 3. App Identifiers & Bundle ID

#### 3.1 Create App ID

Go to: https://developer.apple.com/account/resources/identifiers/list

- [ ] Click the "+" button to create new identifier
- [ ] Select "App IDs" → Continue
- [ ] Select "App" → Continue
- [ ] Fill in details:
  - **Description**: BookHere Mobile App
  - **Bundle ID**: \`com.webpenter.googlesignin\` (must match app.config.js)
  - **Explicit Bundle ID** (not wildcard)
- [ ] Enable capabilities:
  - [ ] Push Notifications
  - [ ] Sign in with Apple (if using)
  - [ ] Associated Domains (if using deep links)
  - [ ] In-App Purchase (if applicable)
- [ ] Click "Continue" → "Register"

**Important:** Bundle ID must match exactly: \`com.webpenter.googlesignin\`

#### 3.2 EAS Managed Credentials (Recommended)

Let EAS handle certificates automatically:

\`\`\`bash
# EAS will create certificates during first build
eas build --platform ios --profile production

# EAS will prompt:
# ✔ Generate a new Apple Distribution Certificate
# ✔ Generate a new Apple Provisioning Profile
  \`\`\`

**Advantages:**
- Automatic certificate management
- No manual certificate creation
- Secure storage in Expo servers
- Easy renewal

#### 3.3 Manual Certificate Setup (Advanced)

If you prefer manual control:

**Create Distribution Certificate:**

\`\`\`bash
# View and manage certificates
eas credentials -p ios

# Select:
# → Set up a new iOS Distribution Certificate
# → Generate new certificate
# Or: Upload existing.p12 certificate
  \`\`\`

**Create Provisioning Profile:**

- [ ] Go to https://developer.apple.com/account/resources/profiles/list
- [ ] Click "+" to create new profile
- [ ] Select "App Store" → Continue
- [ ] Select your App ID → Continue
- [ ] Select your Distribution Certificate → Continue
- [ ] Name it: "BookHere App Store Distribution"
- [ ] Download the profile

---

## Environment Variables & API Keys

### 4. Production Environment Variables

#### 4.1 iOS-Specific Configuration

Edit: \`/Users/apple/homey-mobile-apps-react/.env.production\`

\`\`\`bash
# iOS OAuth Client ID(from Google Cloud Console)
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID = YOUR_PRODUCTION_IOS_CLIENT_ID.apps.googleusercontent.com

# Web Client ID(for iOS Google Sign - In)
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID = YOUR_PRODUCTION_WEB_CLIENT_ID.apps.googleusercontent.com

# Google Maps API Key(iOS)
GOOGLE_MAPS_API_KEY = YOUR_PRODUCTION_IOS_GOOGLE_MAPS_API_KEY

# App Configuration
APP_VARIANT = production
  \`\`\`

#### 4.2 Get iOS OAuth Client ID

Go to: https://console.cloud.google.com/apis/credentials

- [ ] Click "Create Credentials" → "OAuth 2.0 Client ID"
- [ ] Application type: **iOS**
- [ ] Name: "BookHere iOS Production"
- [ ] Bundle ID: \`com.webpenter.googlesignin\`
- [ ] Click "Create"
- [ ] Copy the Client ID
- [ ] Paste into \`.env.production\` as \`EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID\`

#### 4.3 Configure Google Maps for iOS

**Create or Update API Key:**

- [ ] Go to https://console.cloud.google.com/google/maps-apis/credentials
- [ ] Create new API key or use existing
- [ ] Click "Restrict Key"
- [ ] Application restrictions: **iOS apps**
- [ ] Add bundle identifier: \`com.webpenter.googlesignin\`
- [ ] API restrictions: Select APIs:
  - [ ] Maps SDK for iOS
  - [ ] Places API (if used)
  - [ ] Geocoding API (if used)
- [ ] Save
- [ ] Copy API key to \`.env.production\`

#### 4.4 Update GoogleService-Info.plist (iOS Firebase)

If using Firebase for iOS:

- [ ] Go to https://console.firebase.google.com/
- [ ] Select your project
- [ ] Add iOS app (if not already added):
  - iOS bundle ID: \`com.webpenter.googlesignin\`
  - App nickname: "BookHere iOS"
  - App Store ID: (leave blank for now)
- [ ] Download **GoogleService-Info.plist**
- [ ] Replace file in project root: \`/ GoogleService-Info.plist\`

**Verify file location:**
\`\`\`bash
ls - la GoogleService-Info.plist
# Should be in project root
  \`\`\`

---

## App Configuration

### 5. Update App Configuration

#### 5.1 Version and Build Numbers

Edit: \`app.config.js\`

\`\`\`javascript
ios: {
  supportsTablet: true,
  bundleIdentifier: "com.webpenter.googlesignin",
  buildNumber: "10",  // Increment for each submission
  // ...
}
\`\`\`

**Important Version Rules:**
- **buildNumber**: Must be unique for each build uploaded to App Store Connect
  - Format: Integer as string (e.g., "1", "2", "3")
  - Increment by 1 for each submission
  - Never reuse a build number
- **version**: User-facing version (e.g., "3.0.0")
  - Use semantic versioning: MAJOR.MINOR.PATCH
  - Can be the same across multiple builds

**Example progression:**
\`\`\`
Submission 1: version "3.0.0", buildNumber "10"
Submission 2: version "3.0.0", buildNumber "11"(bug fix, same version)
Submission 3: version "3.0.1", buildNumber "12"(new version)
  \`\`\`

#### 5.2 App Capabilities

Verify in \`app.config.js\`:

\`\`\`javascript
ios: {
  infoPlist: {
    NSFaceIDUsageDescription: "Allow BookHere Mobile to use Face ID for secure login.",
    NSLocationWhenInUseUsageDescription: "We need your location to show properties near you.",
    NSPhotoLibraryUsageDescription: "We need access to your photos to upload property images.",
    NSCameraUsageDescription: "We need camera access to take photos of properties.",
    ITSAppUsesNonExemptEncryption: false,
  },
  // ...
}
\`\`\`

**Required Usage Descriptions:**
- [ ] Face ID / Touch ID (if using biometrics)
- [ ] Location (if using maps/location)
- [ ] Photo Library (if users upload photos)
- [ ] Camera (if users take photos)
- [ ] Notifications (if using push notifications)

#### 5.3 Privacy Manifest (iOS 17+)

For iOS 17+, you may need a privacy manifest. EAS handles this automatically, but verify:

- [ ] App uses encryption: Set \`ITSAppUsesNonExemptEncryption: false\` (unless using custom encryption)
- [ ] Declare required reason APIs (EAS/Expo handles this)

---

## Build & Testing

### 6. Build Production IPA

#### 6.1 Pre-Build Checklist

- [ ] \`.env.production\` configured with production credentials
- [ ] \`app.config.js\` version and buildNumber updated
- [ ] \`GoogleService - Info.plist\` in project root (if using Firebase)
- [ ] All API keys are production keys
- [ ] Test locally first: \`npm start\`

#### 6.2 Build with EAS

\`\`\`bash
# Build for App Store submission
eas build --platform ios --profile production

# EAS will:
# 1. Load.env.production variables
# 2. Create / use distribution certificate
# 3. Create / use provisioning profile
# 4. Build IPA file
# 5. Upload to Expo servers
  \`\`\`

**Build Process:**
- Takes 10-25 minutes
- Builds on Expo's macOS servers
- No local Mac required during build
- Build status visible at: https://expo.dev

#### 6.3 Monitor Build

\`\`\`bash
# Check build status
eas build: list --platform ios

# View specific build
eas build: view [build - id]

# Or monitor in browser
# https://expo.dev/accounts/[account]/projects/bookhere/builds
\`\`\`

#### 6.4 Download Build (Optional)

\`\`\`bash
# Download IPA file
eas build: download --platform ios --profile production

# IPA file downloaded to current directory
# production - [timestamp].ipa
  \`\`\`

---

## TestFlight Beta Testing

### 7. Internal Testing with TestFlight

#### 7.1 Automatic Submission to TestFlight

After build completes:

\`\`\`bash
# Submit to TestFlight automatically
eas submit --platform ios --latest

# Or specify build ID
eas submit --platform ios --id [build - id]
  \`\`\`

**EAS will:**
1. Upload IPA to App Store Connect
2. Process build (takes 5-15 minutes)
3. Make available in TestFlight

#### 7.2 Manual Upload (Alternative)

If not using \`eas submit\`:

1. Download IPA: \`eas build: download --platform ios --profile production\`
2. Open **Transporter** app (Mac)
3. Sign in with Apple Developer account
4. Drag and drop IPA file
5. Click "Deliver"
6. Wait for processing

#### 7.3 Add TestFlight Testers

Go to: https://appstoreconnect.apple.com

- [ ] Select your app
- [ ] Go to **TestFlight** tab
- [ ] Click on the build version
- [ ] Add **Internal Testers**:
  - Up to 100 testers (must be in App Store Connect)
  - Add email addresses
  - They receive invitation automatically
- [ ] Or add **External Testers** (requires Beta App Review):
  - Up to 10,000 testers
  - Public link or email invitations
  - Must pass Beta App Review (1-2 days)

#### 7.4 Test with TestFlight

- [ ] Testers install TestFlight app from App Store
- [ ] Testers open invitation email and accept
- [ ] Install BookHere app via TestFlight
- [ ] Test all features:
  - [ ] Google Sign-In
  - [ ] Google Maps
  - [ ] Biometric authentication
  - [ ] Push notifications
  - [ ] Payment flow
  - [ ] All core features

---

## Store Listing Assets

### 8. App Icon & Graphics

#### 8.1 App Icon

- [ ] **Size**: 1024x1024 pixels
- [ ] **Format**: PNG (no alpha channel)
- [ ] **Location**: \`./src/assets/images/icon.png\`
- [ ] **Requirements**:
  - No rounded corners (Apple adds them)
  - No transparency
  - RGB color space
  - 72 DPI minimum

**Verify in app.config.js:**
\`\`\`javascript
icon: "./src/assets/images/icon.png"
  \`\`\`

#### 8.2 Screenshots

**Required Sizes:**

Must provide screenshots for at least one device size:

**6.7" Display (iPhone 15 Pro Max, 14 Pro Max, etc.):**
- [ ] Size: **1290 x 2796 pixels** (portrait) or **2796 x 1290** (landscape)
- [ ] Minimum: 2 screenshots
- [ ] Recommended: 4-8 screenshots

**6.5" Display (iPhone 11 Pro Max, XS Max, etc.):**
- [ ] Size: **1284 x 2778 pixels** (portrait)
- [ ] Fallback for older devices

**5.5" Display (iPhone 8 Plus, 7 Plus, etc.):**
- [ ] Size: **1242 x 2208 pixels** (portrait)
- [ ] Optional but recommended for compatibility

**iPad Pro (12.9-inch) - Optional but recommended:**
- [ ] Size: **2048 x 2732 pixels** (portrait)
- [ ] Shows app supports tablets

**Screenshot Content:**
- [ ] Home screen with property listings
- [ ] Property detail page
- [ ] Booking flow
- [ ] User profile
- [ ] Maps and location features
- [ ] Search and filters
- [ ] Key features showcase

**Tools:**
- Use Figma templates from \`documentation/SCREENSHOTS_GUIDE.md\`
- iOS Simulator (Xcode → Simulator → Cmd+S to screenshot)
- Third-party tools: Screenshot Creator, App Mockup, etc.

#### 8.3 App Preview Video (Optional)

- [ ] Duration: 15-30 seconds
- [ ] Format: M4V, MP4, or MOV
- [ ] Resolution: Match screenshot dimensions
- [ ] Size: Up to 500 MB
- [ ] Shows key features and UI flow

---

## App Store Connect Setup

### 9. Create App in App Store Connect

Go to: https://appstoreconnect.apple.com

#### 9.1 Create New App

- [ ] Click "+" → "New App"
- [ ] Platforms: **iOS**
- [ ] Name: **BookHere** (or your custom name, 30 chars max)
- [ ] Primary Language: **English (U.S.)**
- [ ] Bundle ID: Select \`com.webpenter.googlesignin\`
- [ ] SKU: \`bookhere - ios\` (unique identifier for your records)
- [ ] User Access: **Full Access**
- [ ] Click "Create"

#### 9.2 App Information

**General Information:**

- [ ] **App Name**: BookHere Mobile (30 chars max)
- [ ] **Subtitle**: Book Hotels & Vacation Rentals (30 chars max)
- [ ] **Category**:
  - Primary: **Travel**
  - Secondary: **Lifestyle** (optional)

**Age Rating:**

- [ ] Click "Edit" next to Age Rating
- [ ] Answer questionnaire honestly:
  - Unrestricted Web Access: No
  - Gambling: No
  - Contests: No
  - etc.
- [ ] Expected rating: **4+** or **12+**
- [ ] Click "Done"

#### 9.3 Pricing and Availability

- [ ] **Price**: Free (or set price if paid app)
- [ ] **Availability**: All countries/regions
  - Or select specific countries
- [ ] **Pre-Order**: No (for initial release)

#### 9.4 App Privacy

**Required since iOS 14.5:**

- [ ] Click "Get Started" under App Privacy
- [ ] Answer questions about data collection:

**Data Collection:**
- [ ] **Contact Info**: Email, Name, Phone (collected)
- [ ] **Location**: Approximate location (collected for search)
- [ ] **Identifiers**: User ID (collected)
- [ ] **Usage Data**: Product interactions (collected)
- [ ] **Financial Info**: Payment info (collected, processed by Stripe)
- [ ] **User Content**: Photos (optional, for profile/listings)

**Data Use:**
- [ ] App Functionality
- [ ] Analytics
- [ ] Product Personalization
- [ ] Other Purposes: Third-party services (Google, Stripe)

**Data Linking:**
- [ ] Data is linked to user identity: **Yes**

**Data Tracking:**
- [ ] Does this app use data for tracking?: **No** (unless you use advertising)

**Save and Publish Privacy Policy**

#### 9.5 Version Information

Click on "1.0 Prepare for Submission":

**Promotional Text** (170 chars, updatable without review):
\`\`\`
Discover and book amazing accommodations worldwide.Secure payments, instant confirmation, and seamless booking experience.
\`\`\`

**Description** (4000 chars):
\`\`\`
BookHere is your all-in-one mobile solution for discovering and booking accommodations worldwide.

KEY FEATURES

Browse & Discover
• Thousands of properties: hotels, apartments, vacation rentals
• Advanced search with smart filters(price, location, amenities)
• Interactive maps powered by Google Maps
• High - quality photos and detailed descriptions
• User reviews and ratings

Seamless Booking
• Real-time availability checking
• Instant booking confirmation
• Secure payment processing with Stripe
• Multiple payment options
• Transparent pricing with no hidden fees

User Features
• Face ID / Touch ID for secure login
• Save favorite properties
• Booking history and management
• Push notifications for booking updates
• In-app messaging with hosts
• Multi-language support

For Hosts
• Easy property listing management
• Reservation management
• Calendar synchronization
• Earnings tracking
• Guest communication

Security & Privacy
• Biometric authentication
• Secure payment processing
• Privacy - focused design
• Bank - level encryption

PERFECT FOR

• Vacationers seeking unique stays
• Business travelers needing accommodations
• Adventure seekers exploring new destinations
• Hosts managing rental properties

WHY BOOKHERE ?

✓ User-friendly interface
✓ Fast and responsive
✓ Reliable and secure
✓ 24 / 7 customer support
✓ Regular updates and improvements

Download BookHere today and start exploring your next destination!

REQUIREMENTS
• iOS 13.0 or later
• Internet connection
• Location services(optional, for nearby properties)

  SUPPORT
Questions or issues ? Contact us at support @webpenter.com

Follow us:
• Website: https://your-website.com
• Facebook: @bookhere
• Instagram: @bookhere

Start your journey with BookHere – where great stays begin!
  \`\`\`

**Keywords** (100 chars, comma-separated):
\`\`\`
hotel, booking, travel, vacation, rental, accommodation, airbnb, property, stay, lodging
  \`\`\`

**Support URL**:
\`\`\`
https://your-website.com/support
\`\`\`

**Marketing URL** (optional):
\`\`\`
https://your-website.com
\`\`\`

**Privacy Policy URL** (required):
\`\`\`
https://your-website.com/privacy-policy
\`\`\`

**Build:**
- [ ] Select the build uploaded via TestFlight
- [ ] Click the "+" next to Build

**What's New in This Version** (4000 chars):
\`\`\`
Welcome to BookHere v3.0.0!

NEW FEATURES
• Browse thousands of properties worldwide
• Google Sign-In for quick and secure authentication
• Interactive maps to explore properties
• Secure payment processing
• Biometric authentication(Face ID / Touch ID)
• Push notifications for booking updates
• User reviews and ratings
• Favorite properties and booking history
• Multi-language support

SEAMLESS EXPERIENCE
• Intuitive and beautiful user interface
• Fast property search and filtering
• Real-time availability checking
• Instant booking confirmation
• Easy property management for hosts

We're excited to bring you BookHere! Download now and start exploring amazing accommodations.

Have feedback ? Contact us at support @webpenter.com
  \`\`\`

#### 9.6 Upload Screenshots

- [ ] Click "+" under "iPhone 6.7" Display"
- [ ] Upload 2-8 screenshots
- [ ] Drag to reorder
- [ ] Repeat for other device sizes (if available)
- [ ] Upload iPad screenshots (if available)

#### 9.7 App Review Information

**Contact Information:**
- [ ] First Name: Your Name
- [ ] Last Name: Your Last Name
- [ ] Phone Number: +1-XXX-XXX-XXXX
- [ ] Email: your-email@example.com

**Demo Account** (if app requires login):
- [ ] Sign-in required: **Yes**
- [ ] Username: demo@bookhere.com (create demo account)
- [ ] Password: Demo123! (secure password)
- [ ] Notes: "Demo account for review purposes. Full access to all features."

**Notes:**
\`\`\`
Thank you for reviewing BookHere!

DEMO ACCOUNT CREDENTIALS:
Email: demo @bookhere.com
Password: Demo123!

TESTING NOTES:
- All features are accessible with demo account
  - Google Sign-In is optional(demo account available)
    - Payment processing uses Stripe test mode for demo
      - Test card: 4242 4242 4242 4242

KEY FEATURES TO TEST:
1. Browse properties
2. View property details
3. Use map to explore locations
4. Add properties to favorites
5. Simulate booking(test mode)

Please contact support @webpenter.com with any questions.
\`\`\`

**Attachment** (optional):
- [ ] Upload demo video or additional documentation if needed

#### 9.8 Version Release

- [ ] **Automatically release this version**: Recommended
  - App goes live immediately after approval
- [ ] **Manually release this version**: Alternative
  - You control when app goes live after approval

---

## Final Checks

### 10. Pre-Submission Checklist

Before clicking "Submit for Review":

**App Quality:**
- [ ] App tested thoroughly on physical device
- [ ] No crashes or critical bugs
- [ ] All features work as expected
- [ ] Google Sign-In works with production credentials
- [ ] Google Maps displays correctly
- [ ] Biometric authentication works
- [ ] Push notifications work
- [ ] Payment processing works (test mode OK)
- [ ] App performs well on older devices
- [ ] App works on different iOS versions (iOS 13+)

**Store Listing:**
- [ ] App name is compelling and clear
- [ ] Subtitle is descriptive
- [ ] Description showcases key features
- [ ] Keywords are relevant and optimized
- [ ] Screenshots showcase app beautifully
- [ ] App icon is professional
- [ ] Privacy policy URL is live and accessible
- [ ] Support URL is live

**Compliance:**
- [ ] Age rating completed accurately
- [ ] App Privacy information completed
- [ ] Privacy policy covers all data collection
- [ ] App complies with Apple Review Guidelines
- [ ] No copyright or trademark violations
- [ ] No misleading functionality

**Technical:**
- [ ] Correct bundle identifier: \`com.webpenter.googlesignin\`
- [ ] Build number incremented from previous submission
- [ ] Version number is appropriate
- [ ] Production environment variables configured
- [ ] GoogleService-Info.plist is production version
- [ ] All required permissions declared in infoPlist

**Legal:**
- [ ] Apple Developer Agreement accepted
- [ ] App Review Guidelines reviewed
- [ ] Export Compliance completed (if applicable)

---

## Submission

### 11. Submit for Review

#### 11.1 Export Compliance

- [ ] **Does your app use encryption?**
  - Select "No" (standard HTTPS doesn't count)
  - Or select "Yes" and answer follow-up questions

#### 11.2 Advertising Identifier (IDFA)

- [ ] **Does this app use the Advertising Identifier (IDFA)?**
  - Select "No" (unless you use advertising/analytics that tracks users)

#### 11.3 Submit

- [ ] Review all sections (should have green checkmarks)
- [ ] Click **"Add for Review"** (top right)
- [ ] Click **"Submit to App Review"**

**Confirmation:**
- [ ] Status changes to "Waiting for Review"
- [ ] You'll receive confirmation email

---

## After Submission

### 12. Review Process

#### 12.1 Review Timeline

**Typical Timeline:**
- **Waiting for Review**: 1-3 days
- **In Review**: Few hours to 1 day
- **Processing**: Few hours
- **Total**: Usually 1-4 days

**Status Tracking:**
- [ ] Monitor status in App Store Connect
- [ ] Check email for updates
- [ ] Respond to any review requests within 24 hours

#### 12.2 Possible Outcomes

**Approved ✅**
- Status: "Ready for Sale"
- App is live on App Store (if auto-release)
- Or ready to manually release

**Rejected ❌**
- Status: "Rejected"
- Reason provided in Resolution Center
- Fix issues and resubmit

**Metadata Rejected**
- Issue with store listing, not app itself
- Fix metadata and resubmit

**Developer Rejected**
- You cancelled submission
- Can resubmit anytime

#### 12.3 If Rejected

Common rejection reasons and solutions:

**1. Incomplete or Inaccurate Information**
- Solution: Provide accurate app information and demo account

**2. Crashes or Bugs**
- Solution: Fix bugs, test thoroughly, resubmit

**3. Guideline Violation**
- Solution: Review specific guideline, fix issue, explain in notes

**4. Privacy Policy Issues**
- Solution: Update privacy policy to cover all data collection

**5. Misleading Functionality**
- Solution: Ensure screenshots and description match actual app

**6. Performance Issues**
- Solution: Optimize app, reduce memory usage

**Resubmission Process:**
1. Fix issues mentioned in rejection
2. Update build if code changes needed (increment buildNumber)
3. Update metadata if needed
4. Reply in Resolution Center explaining changes
5. Resubmit for review

#### 12.4 After Approval

**App is Live!**

- [ ] App appears on App Store
- [ ] App Store URL: \`https://apps.apple.com/app/id[your-app-id]\`
-[] Share with users
- [] Announce on social media
  - [] Update website with App Store badge

    ** Monitor Performance:**
      -[] Check App Store Connect Analytics
        - [] Monitor reviews and ratings
          - [] Respond to user reviews
            - [] Track crashes(if using crash reporting)
-[] Plan updates and improvements

  ** Promote Your App:**
    -[] Add App Store badge to website
      - [] Share on social media
        - [] Create press release
          - [] Reach out to tech blogs
            - [] Run marketing campaigns

---

## Apple App Store Guidelines

### 13. Important Guidelines to Follow

  ** Review the full guidelines:** https://developer.apple.com/app-store/review/guidelines/

** Key Areas:**

#### Safety
  - [] User - generated content is moderated
    - [] Objectionable content is filtered
      - [] Privacy policy is comprehensive

#### Performance
  - [] App is complete and functional
    - [] No crashes, bugs, or broken links
      - [] Loads quickly and responds to user input

#### Business
  - [] In - app purchases use Apple's system (if applicable)
    - [] Subscriptions follow Apple guidelines
      - [] No alternative payment methods presented in -app

#### Design
  - [] Interface is polished and professional
    - [] Uses native iOS components appropriately
      - [] Supports all device sizes

#### Legal
  - [] Privacy policy meets requirements
    - [] Respects intellectual property
      - [] Follows data protection laws

---

## Troubleshooting Common Issues

### "Could not find a valid bundle identifier"

  ** Issue:** Bundle ID mismatch

    ** Solution:**
      1. Verify\`bundleIdentifier\` in \`app.config.js\`: \`com.webpenter.googlesignin\`
2. Ensure App ID exists in Apple Developer Portal
3. Rebuild app

### "Google Sign-In not working"

  ** Issue:** OAuth configuration for iOS

    ** Solution:**
      1. Verify iOS Client ID in \`.env.production\`
2. Check Bundle ID in Google Cloud Console matches\`com.webpenter.googlesignin\`
3. Ensure \`GoogleService-Info.plist\` is in project root

### "Build failed during EAS build"

  ** Issue:** Build configuration error

    ** Solution:**
      1. Check build logs: \`eas build:view [build-id]\`
2. Verify all certificates are valid
3. Ensure \`GoogleService-Info.plist\` exists if using Firebase
4. Try: \`eas build --platform ios --profile production --clear-cache\`

### "App crashes on launch"

  ** Issue:** Missing dependencies or configuration

    ** Solution:**
      1. Test on physical device via TestFlight
2. Check console logs in Xcode
3. Verify all environment variables are set
4. Ensure all required frameworks are linked

### "Rejection: Missing Privacy Policy"

  ** Issue:** Privacy policy not accessible

    ** Solution:**
      1. Create comprehensive privacy policy page
2. Ensure URL is publicly accessible
3. Cover all data collection and usage
4. Include third - party services(Google, Stripe)
5. Update in App Store Connect

---

## Version Updates

### 14. Updating Your App

When releasing updates:

#### 14.1 Prepare Update

  - [] Update version in \`app.config.js\`:
\`\`\`javascript
  version: "3.0.1",  // Increment version
  buildNumber: "11",  // Increment build number
  \`\`\`

  - [] Update \`.env.production\` if credentials changed

#### 14.2 Build New Version

  \`\`\`bash
# Build new version
eas build --platform ios --profile production

# Submit to TestFlight
eas submit --platform ios --latest
\`\`\`

#### 14.3 Create New Version in App Store Connect

  - [] Go to App Store Connect → Your App
    - [] Click "+" next to "iOS App"
      - [] Enter new version number: "3.0.1"
        - [] Fill in "What's New in This Version"
          - [] Select new build
            - [] Submit for review

---

## Useful Commands Reference

### Build Commands

  \`\`\`bash
# Build for App Store
eas build --platform ios --profile production

# Build for TestFlight with specific version
eas build --platform ios --profile production --clear-cache

# Check build status
eas build:list --platform ios

# View specific build
eas build:view [build-id]

# Download IPA
eas build:download --platform ios --profile production
\`\`\`

### Submission Commands

  \`\`\`bash
# Submit latest build to TestFlight
eas submit --platform ios --latest

# Submit specific build
eas submit --platform ios --id [build-id]
\`\`\`

### Credential Management

  \`\`\`bash
# View and manage iOS credentials
eas credentials -p ios

# Options:
# - View credentials
# - Set up new certificate
# - Upload existing certificate
# - Remove credentials
\`\`\`

---

## Additional Resources

### Apple Documentation

  - ** App Store Connect **: https://appstoreconnect.apple.com
- ** Developer Portal **: https://developer.apple.com/account
- ** Review Guidelines **: https://developer.apple.com/app-store/review/guidelines/
- ** Human Interface Guidelines **: https://developer.apple.com/design/human-interface-guidelines/
- ** App Store Marketing **: https://developer.apple.com/app-store/marketing/guidelines/

### Project Documentation

  - ** EAS Build Guide **: \`./EAS_BUILD_GUIDE.md\`
    - ** Environment Setup **: \`../ENVIRONMENT_SETUP.md\`
      - ** Configuration **: \`./CONFIGURATION.md\`
        - ** Troubleshooting **: \`./TROUBLESHOOTING.md\`
          - ** Screenshots Guide **: \`./SCREENSHOTS_GUIDE.md\`

### Support

  - ** Apple Developer Forums **: https://developer.apple.com/forums/
- ** Stack Overflow **: Tag \`ios\` or\`expo\`
  - ** Expo Discord **: https://chat.expo.dev/
- ** Project Support **: support @webpenter.com

---

## Quick Reference Card

### Most Common Commands

  \`\`\`bash
# Build for App Store
eas build -p ios --profile production

# Submit to TestFlight
eas submit -p ios --latest

# Check build status
eas build:list -p ios

# Manage credentials
eas credentials -p ios

# View build
eas build:view [build-id]
\`\`\`

### Important URLs

  - ** App Store Connect **: https://appstoreconnect.apple.com
- ** Developer Account **: https://developer.apple.com/account
- ** TestFlight **: https://appstoreconnect.apple.com (TestFlight tab)
- ** Review Status **: App Store Connect → My Apps →[Your App]

---

## Comparison: iOS vs Android

  | Aspect | iOS(Apple) | Android(Google) |
| --------| -------------| ------------------|
| ** Cost ** | $99 / year | $25 one - time |
| ** Review Time ** | 1 - 4 days | 1 - 7 days |
| ** Requirements ** | Mac required | Any computer |
| ** Certificate ** | Complex(managed by EAS) | Simple(keystore) |
| ** Testing ** | TestFlight | Internal testing track |
| ** Updates ** | Each update reviewed | Faster review for updates |
| ** Privacy ** | Strict privacy labels | Data safety form |
| ** Rejection Rate ** | Higher(~40 %) | Lower(~25 %) |

  ---

** Last Updated:** 2026-01 -08
  ** For:** BookHere Mobile App v3.0.0

For ThemeForest buyers: This comprehensive checklist ensures a smooth submission to the Apple App Store.Follow all steps carefully and refer to the troubleshooting section if you encounter issues.

Good luck with your App Store submission! 🚀


`
      }
    }
  },
  security: {
    title: "Security & License",
    icon: ShieldCheck,
    tags: ["legal", "safety", "privacy"],
    content: `
# Security Policy

BookHere - Property Rental Mobile App

---

## Table of Contents

1. [Security Best Practices](#security-best-practices)
2. [API Keys & Credentials](#api-keys--credentials)
3. [Data Protection](#data-protection)
4. [Common Security Issues](#common-security-issues)
5. [Reporting Vulnerabilities](#reporting-vulnerabilities)
6. [Security Checklist](#security-checklist)

---

## Security Best Practices

### 1. Environment Variables

**✅ DO:**
- Store all sensitive credentials in \`.env\` file
- Use \`.env.example\` as a template (no real credentials)
- Add \`.env\` to \`.gitignore\`
- Use different credentials for development/production
- Never commit \`.env\` to version control

**❌ DON'T:**
- Hardcode API keys in source code
- Share \`.env\` file publicly
- Include credentials in screenshots or documentation
- Commit API keys to Git
- Use production keys in development

**Example:**
\`\`\`env
# .env (never commit this)
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_REAL_KEY

# .env.example (safe to commit)
STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY_HERE
\`\`\`

---

### 2. API Keys Management

#### Google Maps API Key
- **Restrict** key usage in Google Cloud Console
- Add application restrictions (iOS bundle ID, Android package name)
- Add API restrictions (only enable needed APIs)
- Monitor usage in Google Cloud Console
- Rotate keys if exposed

#### Stripe Keys
- **Never** expose secret keys in client code
- Use publishable keys only in mobile app
- Process payments through your backend
- Use test mode keys for development
- Enable webhook signing

#### Other API Keys
- Follow principle of least privilege
- Use separate keys for each environment
- Implement key rotation policy
- Monitor for unusual activity

---

## API Keys & Credentials

### What Should NEVER Be in Source Code

❌ API Keys and Secrets
❌ Database Credentials
❌ Payment Gateway Secret Keys
❌ OAuth Client Secrets
❌ Encryption Keys
❌ Private Keys (.p12, .p8, .pem)
❌ AWS/Cloud Credentials
❌ Firebase Admin SDK Keys

### What Can Be in Source Code

✅ Publishable API Keys (with restrictions)
✅ Public Configuration
✅ App Scheme/Bundle ID
✅ Non-sensitive URLs

---

## Data Protection

### 1. User Data Storage

**Local Storage (On Device):**
- Use \`expo-secure-store\` for sensitive data
- Never store passwords in plain text
- Encrypt user tokens
- Clear sensitive data on logout
- Don't cache sensitive API responses

**Example:**
\`\`\`typescript
import * as SecureStore from 'expo-secure-store';

// Store securely
await SecureStore.setItemAsync('authToken', token);

// Retrieve
const token = await SecureStore.getItemAsync('authToken');

// Delete on logout
await SecureStore.deleteItemAsync('authToken');
\`\`\`

### 2. Network Security

**HTTPS Only:**
- All API calls must use HTTPS
- No HTTP in production
- Verify SSL certificates
- Use certificate pinning for extra security (advanced)

**API Communication:**
\`\`\`typescript
// ✅ Good
const API_URL = 'https://your-backend.com';

// ❌ Bad
const API_URL = 'http://your-backend.com';
\`\`\`

### 3. Authentication Tokens

**JWT Tokens:**
- Store in secure storage
- Include expiration
- Implement token refresh
- Clear on logout
- Validate on backend

**Biometric Auth:**
- Use as additional security layer
- Still require password as fallback
- Store biometric availability, not biometric data

---

## Common Security Issues

### 1. SQL Injection (Backend)
While this is a mobile app, ensure your WordPress backend:
- Uses prepared statements
- Sanitizes all inputs
- Validates data types
- Escapes output

### 2. XSS (Cross-Site Scripting)
- Sanitize user inputs before displaying
- Use React's built-in XSS protection
- Don't use \`dangerouslySetInnerHTML\` unless necessary
- Validate URLs before opening

### 3. Insecure Data Storage
\`\`\`typescript
// ❌ Bad - AsyncStorage for sensitive data
await AsyncStorage.setItem('password', password);

// ✅ Good - SecureStore for sensitive data
await SecureStore.setItemAsync('authToken', token);
\`\`\`

### 4. Unencrypted Communication
\`\`\`typescript
// ❌ Bad
fetch('http://api.example.com/user/data')

// ✅ Good
fetch('https://api.example.com/user/data')
  \`\`\`

### 5. Insufficient Authentication
- Always validate tokens on backend
- Implement session timeout
- Use secure password requirements
- Enable 2FA where possible

---

## Reporting Vulnerabilities

If you discover a security vulnerability:

### Contact
**Email:** security@webpenter.com (or support@webpenter.com)

### What to Include
1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested fix (if any)
5. Your contact information

### Response Time
- **Acknowledgment:** Within 48 hours
- **Initial Assessment:** Within 1 week
- **Fix Timeline:** Depends on severity

### Disclosure Policy
- Please allow us reasonable time to fix
- We'll credit you in release notes (if desired)
- Coordinate public disclosure timing

---

## Security Checklist

### Before Development

- [ ] Create \`.env\` file from \`.env.example\`
- [ ] Verify \`.env\` is in \`.gitignore\`
- [ ] Use test API keys for development
- [ ] Enable HTTPS on backend
- [ ] Set up error monitoring (Sentry, etc.)

### During Development

- [ ] No hardcoded credentials
- [ ] Use SecureStore for sensitive data
- [ ] All API calls use HTTPS
- [ ] Validate all user inputs
- [ ] Sanitize data before display
- [ ] Implement proper error handling
- [ ] Don't log sensitive data
- [ ] Use environment variables

### Code Review Checklist

- [ ] No API keys in source code
- [ ] No passwords or secrets
- [ ] Proper input validation
- [ ] Secure data storage
- [ ] HTTPS for all API calls
- [ ] Error messages don't leak info
- [ ] Authentication properly implemented
- [ ] Authorization checks in place

### Before Production

- [ ] Switch to production API keys
- [ ] Review all environment variables
- [ ] Enable SSL/TLS on backend
- [ ] Implement rate limiting (backend)
- [ ] Set up monitoring and alerts
- [ ] Enable Stripe webhook signatures
- [ ] Restrict API keys in cloud consoles
- [ ] Test all payment flows
- [ ] Verify data encryption
- [ ] Check authentication flows
- [ ] Review error messages
- [ ] Enable security headers (backend)

### iOS/Android Specific

**iOS:**
- [ ] Enable App Transport Security
- [ ] Use keychain for sensitive data
- [ ] Implement Face ID/Touch ID securely
- [ ] Configure proper entitlements
- [ ] Enable data protection

**Android:**
- [ ] Use EncryptedSharedPreferences
- [ ] Enable ProGuard/R8 obfuscation
- [ ] Configure network security config
- [ ] Use Fingerprint/Biometric API correctly
- [ ] Enable backup encryption

---

## Security Configuration

### 1. App Transport Security (iOS)

Already configured in \`app.json\`, but verify:

\`\`\`json
{
  "ios": {
    "infoPlist": {
      "NSAppTransportSecurity": {
        "NSAllowsArbitraryLoads": false
      }
    }
  }
}
\`\`\`

### 2. Network Security (Android)

Create \`android/app/src/main/res/xml/network_security_config.xml\`:

\`\`\`xml
<? xml version = "1.0" encoding = "utf-8" ?>
<network-security-config>
  <base-config cleartextTrafficPermitted = "false" >
    <trust-anchors >
      <certificates src="system" />
    </trust-anchors>
  </base-config>
</network-security-config>
\`\`\`

### 3. ProGuard Rules (Android)

The app includes ProGuard configuration for code obfuscation.
Verify \`android/app/proguard-rules.pro\` includes:

\`\`\`proguard
# Keep React Native
  - keep class com.facebook.react.** { *; }

# Keep Expo
  - keep class expo.modules.** { *; }

# Keep your app classes
  - keep class com.yourcompany.yourapp.** { *; }
    \`\`\`

---

## Security Best Practices by Feature

### Payment Processing
- **✅** Use Stripe/PayPal SDKs (don't implement yourself)
- **✅** Process payments through backend
- **✅** Use webhook signatures
- **✅** Implement idempotency
- **❌** Never store credit card numbers
- **❌** Never log payment details

### User Authentication
- **✅** Use JWT with expiration
- **✅** Implement token refresh
- **✅** Hash passwords (backend)
- **✅** Use HTTPS for auth endpoints
- **✅** Implement rate limiting
- **❌** Never store plain-text passwords
- **❌** Don't expose user IDs in URLs

### File Uploads
- **✅** Validate file types
- **✅** Limit file sizes
- **✅** Scan for malware (backend)
- **✅** Use secure URLs
- **❌** Don't execute uploaded files
- **❌** Don't trust file extensions

---

## Compliance

### GDPR (If applicable)
- Obtain user consent for data collection
- Provide data export functionality
- Implement data deletion
- Have privacy policy
- Use data minimization

### PCI DSS (Payment Card Industry)
- Use certified payment processors (Stripe)
- Don't store card data
- Use tokenization
- Implement secure transmission

### CCPA (California Consumer Privacy Act)
- Disclose data collection practices
- Provide opt-out mechanisms
- Honor data deletion requests

---

## Incident Response Plan

### If Credentials Are Exposed

1. **Immediately** rotate all affected credentials
2. Review access logs for unauthorized use
3. Notify affected users if data was accessed
4. Update documentation
5. Implement additional safeguards

### If Vulnerability Is Found

1. Assess severity and impact
2. Develop and test fix
3. Deploy fix to production
4. Notify users if necessary
5. Document in security advisory

---

## Resources

### Security Tools
- **Dependency Scanning:** \`npm audit\`
- **Code Analysis:** ESLint with security plugins
- **Secret Scanning:** git-secrets, truffleHog
- **Monitoring:** Sentry for error tracking

### Security Guidelines
- OWASP Mobile Security Project
- OWASP Top 10
- React Native Security Best Practices
- Expo Security Considerations

### Commands
\`\`\`bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check for exposed secrets
git log -p | grep -i "api[_-]key\|password"
  \`\`\`

---

## Conclusion

Security is an ongoing process, not a one-time task. Stay informed about:
- New vulnerabilities in dependencies
- Security updates for React Native and Expo
- Best practices in mobile security
- Changes in compliance requirements

**Remember:** Security starts with you. Follow these guidelines and stay vigilant.

---

**Last Updated:** January 2026

For security concerns: security@webpenter.com


    `
  },
};

export const APP_VERSION = "v3.0.1";
export const SUPPORT_EMAIL = "support@webpenter.com";
export const DEMO_URL = "https://demo.bookhere.app";
