
import { LucideIcon } from 'lucide-react';

export interface DocSection {
  title: string;
  icon: LucideIcon;
  content?: string;
  tags?: string[];
  subItems?: Record<string, {
    title: string;
    icon?: LucideIcon;
    content: string;
    tags?: string[];
  }>;
  // For lazy loading - function to load content dynamically
  loadContent?: () => Promise<DocSection>;
}

export type DocsContent = Record<string, DocSection>;

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
