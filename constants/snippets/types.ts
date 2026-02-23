/**
 * Code snippet type definitions
 */

export interface CodeSnippet {
  language: string;
  code: string;
  description?: string;
  filename?: string;
}

export type SnippetCollection = Record<string, CodeSnippet>;
