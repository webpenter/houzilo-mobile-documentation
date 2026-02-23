import { Book } from 'lucide-react';
import { DocSection } from '../../types';

export const gettingStarted: DocSection = {
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
};

export default gettingStarted;
