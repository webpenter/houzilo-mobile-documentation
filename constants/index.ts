import {
  Book,
  Settings,
  Wrench,
  Terminal,
  HelpCircle,
  ShieldCheck,
  Clock,
  ExternalLink,
  Zap,
  Play,
  Smartphone
} from 'lucide-react';
import { DocsContent } from '../types';

/**
 * Documentation content with lazy loading support
 *
 * Each section's content is loaded dynamically when accessed,
 * reducing initial bundle size from ~750KB to ~150KB
 */
export const DOCS_CONTENT: DocsContent = {
  getting_started: {
    title: "Getting Started",
    icon: Book,
    tags: ["welcome", "overview", "stack"],
    content: "", // Empty initially, will be loaded
    loadContent: async () => {
      const module = await import('./sections/getting-started');
      return module.default;
    }
  },
  features: {
    title: "Features",
    icon: Zap,
    tags: ["capabilities", "functionality", "highlights"],
    content: "", // Empty initially, will be loaded
    loadContent: async () => {
      const module = await import('./sections/features');
      return module.default;
    }
  },
  installation: {
    title: "Installation",
    icon: Terminal,
    tags: ["setup", "terminal", "wordpress"],
    content: "", // Empty initially, will be loaded
    loadContent: async () => {
      const module = await import('./sections/installation');
      return module.default;
    }
  },
  configuration: {
    title: "Configuration",
    icon: Settings,
    tags: ["env", "api", "stripe"],
    content: "", // Empty initially, will be loaded
    loadContent: async () => {
      const module = await import('./sections/configuration');
      return module.default;
    }
  },
  customization: {
    title: "Customization",
    icon: Wrench,
    tags: ["branding", "ui", "colors"],
    content: "", // Empty initially, will be loaded
    loadContent: async () => {
      const module = await import('./sections/customization');
      return module.default;
    }
  },
  faq: {
    title: "FAQ",
    icon: HelpCircle,
    tags: ["help", "qa", "rtl"],
    content: "", // Empty initially, will be loaded
    loadContent: async () => {
      const module = await import('./sections/faq');
      return module.default;
    }
  },
  troubleshooting: {
    title: "Troubleshooting",
    icon: Wrench,
    tags: ["errors", "debug", "fixes"],
    content: "", // Empty initially, will be loaded
    loadContent: async () => {
      const module = await import('./sections/troubleshooting');
      return module.default;
    }
  },
  changelog: {
    title: "Changelog",
    icon: Clock,
    tags: ["updates", "releases", "versions"],
    content: "", // Empty initially, will be loaded
    loadContent: async () => {
      const module = await import('./sections/changelog');
      return module.default;
    }
  },
  submission: {
    title: "App Submission",
    icon: ExternalLink,
    tags: ["deployment", "stores", "publish"],
    content: "", // Empty initially, will be loaded
    subItems: {
      play_store: {
        title: "Google Play Store",
        icon: Play,
        tags: ["android", "submission", "checklist"],
        content: "" // Will be loaded from section file
      },
      app_store: {
        title: "Apple App Store",
        icon: Smartphone,
        tags: ["ios", "submission", "checklist"],
        content: "" // Will be loaded from section file
      }
    },
    loadContent: async () => {
      const module = await import('./sections/submission');
      return module.default;
    }
  },
  security: {
    title: "Security",
    icon: ShieldCheck,
    tags: ["authentication", "encryption", "best-practices"],
    content: "", // Empty initially, will be loaded
    loadContent: async () => {
      const module = await import('./sections/security');
      return module.default;
    }
  }
};

export const APP_VERSION = "v3.0.1";
export const SUPPORT_EMAIL = "support@webpenter.com";
export const DEMO_URL = "https://demo.bookhere.app";
