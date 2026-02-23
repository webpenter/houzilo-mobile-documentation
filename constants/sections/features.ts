import { Zap } from 'lucide-react';
import { DocSection } from '../../types';

export const features: DocSection = {
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
};

export default features;
