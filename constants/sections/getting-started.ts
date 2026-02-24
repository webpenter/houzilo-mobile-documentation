import { Book } from 'lucide-react';
import { DocSection } from '../../types';

export const gettingStarted: DocSection = {
  title: "Getting Started",
  icon: Book,
  tags: ["welcome", "overview", "stack"],
  content: `
# Welcome to Houzilo v1.0.0+2

Thank you for choosing Houzilo, the premium property mobile application. This documentation will guide you through setting up your own marketplace.

## 📦 What's in the Box?
- **Mobile App Source:** Full Flutter project (Dart).
- **Backend Integration:** Seamless REST API connection with WordPress (Houzez Theme).
- **Documentation:** Comprehensive guides for setup, configuration, and app submission.

## 🛠 Technology Stack
- **Framework:** Flutter (Dart SDK \`>=3.4.0 <4.0.0\`)
- **State Management:** Provider (^6.1.2)
- **Networking:** Dio (^5.7.0)
- **Maps:** Flutter Map (OpenStreetMap / Leaflet)
- **Authentication:** Firebase Auth & Google Sign-In

## 🔑 Key Features
- **Dynamic Home Screen:** Featured Listings, Trending Locations, and Top Agents.
- **Advanced Search:** Filter properties by location, price range, bedrooms, bathrooms, and amenities.
- **Property Submission Wizard:** Detailed 9-step process for hosts to list properties including image uploads, floor plans, and sub-listings.
- **Agent & Agency Support:** Dedicated profiles and contact forms (Email/Call).
- **User Dashboard:** Manage favorite properties, view own listings, and update profile settings.
  `
};

export default gettingStarted;
