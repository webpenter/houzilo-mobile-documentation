/**
 * Code Snippets Library
 *
 * Centralized repository for all reusable code snippets used in documentation.
 * This keeps the documentation DRY and makes updates easier.
 *
 * Usage in markdown:
 * ```typescript
 * import { snippet } from './snippets';
 *
 * const myDoc = `
 * ## Installation
 * ${snippet('npmInstall')}
 * `;
 * ```
 */

import { CodeSnippet } from './types';
import installationSnippets from './installation';
import environmentSnippets from './environment';
import buildSnippets from './build';
import configurationSnippets from './configuration';
import troubleshootingSnippets from './troubleshooting';

/**
 * All snippets organized by category
 */
export const SNIPPETS = {
  installation: installationSnippets,
  environment: environmentSnippets,
  build: buildSnippets,
  configuration: configurationSnippets,
  troubleshooting: troubleshootingSnippets
};

/**
 * Flat map of all snippets for easy access
 */
export const ALL_SNIPPETS: Record<string, CodeSnippet> = {
  ...installationSnippets,
  ...environmentSnippets,
  ...buildSnippets,
  ...configurationSnippets,
  ...troubleshootingSnippets
};

/**
 * Format a snippet as a markdown code block
 *
 * @param snippetKey - Key of the snippet to format
 * @param includeDescription - Whether to include the description (default: false)
 * @returns Formatted markdown code block
 *
 * @example
 * snippet('npmInstall') // Returns: ```bash\nnpm install\n```
 * snippet('npmInstall', true) // Includes description above code
 */
export function snippet(snippetKey: string, includeDescription = false): string {
  const snip = ALL_SNIPPETS[snippetKey];

  if (!snip) {
    console.warn(`Snippet "${snippetKey}" not found`);
    return `\`\`\`\n# Snippet "${snippetKey}" not found\n\`\`\``;
  }

  let result = '';

  // Add description if requested
  if (includeDescription && snip.description) {
    result += `**${snip.description}**\n\n`;
  }

  // Add filename if present
  if (snip.filename) {
    result += `**File: \`${snip.filename}\`**\n\n`;
  }

  // Add code block
  result += `\`\`\`${snip.language}\n${snip.code}\n\`\`\``;

  return result;
}

/**
 * Get a snippet by key
 *
 * @param snippetKey - Key of the snippet
 * @returns CodeSnippet object or undefined
 */
export function getSnippet(snippetKey: string): CodeSnippet | undefined {
  return ALL_SNIPPETS[snippetKey];
}

/**
 * List all available snippet keys
 *
 * @returns Array of all snippet keys
 */
export function listSnippets(): string[] {
  return Object.keys(ALL_SNIPPETS);
}

/**
 * Search snippets by keyword
 *
 * @param keyword - Search term
 * @returns Array of matching snippet keys
 */
export function searchSnippets(keyword: string): string[] {
  const lowerKeyword = keyword.toLowerCase();
  return Object.entries(ALL_SNIPPETS)
    .filter(([key, snip]) =>
      key.toLowerCase().includes(lowerKeyword) ||
      snip.description?.toLowerCase().includes(lowerKeyword) ||
      snip.code.toLowerCase().includes(lowerKeyword)
    )
    .map(([key]) => key);
}

// Re-export types
export * from './types';
