import React, { useMemo, useState, useEffect } from 'react';
import { Copy, Check, Quote, Square, CheckSquare, Link as LinkIcon } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  onNavigate?: (tab: string) => void;
  onHeadersFound?: (headers: { id: string; text: string; level: number }[]) => void;
  highlightTerm?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onNavigate, onHeadersFound, highlightTerm }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAnchor = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setActiveAnchor(id);
    setTimeout(() => setActiveAnchor(null), 2000);
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s/g, '-')
      .trim();
  };

  const parseBlocks = (text: string) => {
    const lines = text.split('\n');
    const blocks: any[] = [];
    let currentCodeBlock: string[] | null = null;
    let currentTable: string[][] | null = null;
    let currentCodeLanguage = '';
    let currentList: { type: 'ul' | 'ol'; items: { content: string; value?: string }[] } | null = null;

    const flushList = () => {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      // Handle Code Blocks
      if (trimmed.startsWith('```')) {
        flushList();
        if (currentCodeBlock) {
          blocks.push({ type: 'code', content: currentCodeBlock.join('\n'), language: currentCodeLanguage });
          currentCodeBlock = null;
          currentCodeLanguage = '';
        } else {
          currentCodeBlock = [];
          currentCodeLanguage = trimmed.replace('```', '').trim();
        }
        return;
      }

      if (currentCodeBlock !== null) {
        currentCodeBlock.push(line);
        return;
      }

      // Handle Tables
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        flushList();
        const row = line.split('|').filter((cell, idx, arr) => {
          if (idx === 0 || idx === arr.length - 1) return false;
          return true;
        }).map(cell => cell.trim());

        if (row.every(cell => cell.match(/^[ :-]+$/))) {
          return;
        }

        if (currentTable) {
          currentTable.push(row);
        } else {
          currentTable = [row];
        }
        return;
      } else if (currentTable) {
        blocks.push({ type: 'table', content: currentTable });
        currentTable = null;
      }

      // Handle Lists
      if (trimmed.startsWith('- [ ] ') || trimmed.startsWith('- [] ') || trimmed.startsWith('- [x] ')) {
        flushList();
        const completed = trimmed.startsWith('- [x] ');
        blocks.push({ type: 'task', content: trimmed.replace(/- \[[ x]?\] /i, ''), completed });
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('+ ')) {
        const content = trimmed.replace(/^[-*+]\s+/, '');
        if (currentList && currentList.type === 'ul') {
          currentList.items.push({ content });
        } else {
          flushList();
          currentList = { type: 'ul', items: [{ content }] };
        }
      } else if (trimmed.match(/^\d+\.\s+/)) {
        const match = trimmed.match(/^(\d+)\.\s+/);
        const value = match ? match[1] : undefined;
        const content = trimmed.replace(/^\d+\.\s+/, '');
        if (currentList && currentList.type === 'ol') {
          currentList.items.push({ content, value });
        } else {
          flushList();
          currentList = { type: 'ol', items: [{ content, value }] };
        }
      } else {
        flushList();
        // Handle Other Elements
        if (trimmed.startsWith('# ')) {
          const content = trimmed.replace('# ', '');
          blocks.push({ type: 'h1', content, id: slugify(content) });
        } else if (trimmed.startsWith('## ')) {
          const content = trimmed.replace('## ', '');
          blocks.push({ type: 'h2', content, id: slugify(content) });
        } else if (trimmed.startsWith('### ')) {
          const content = trimmed.replace('### ', '');
          blocks.push({ type: 'h3', content, id: slugify(content) });
        } else if (trimmed.startsWith('#### ')) {
          const content = trimmed.replace('#### ', '');
          blocks.push({ type: 'h4', content, id: slugify(content) });
        } else if (trimmed.startsWith('##### ')) {
          const content = trimmed.replace('##### ', '');
          blocks.push({ type: 'h5', content, id: slugify(content) });
        } else if (trimmed.startsWith('###### ')) {
          const content = trimmed.replace('###### ', '');
          blocks.push({ type: 'h6', content, id: slugify(content) });
        } else if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
          blocks.push({ type: 'hr' });
        } else if (trimmed.startsWith('> ')) {
          blocks.push({ type: 'blockquote', content: trimmed.replace('> ', '') });
        } else if (trimmed !== '') {
          blocks.push({ type: 'p', content: trimmed });
        } else {
          blocks.push({ type: 'space' });
        }
      }
    });

    flushList();
    if (currentTable) {
      blocks.push({ type: 'table', content: currentTable });
    }

    return blocks;
  };

  // Memoize blocks parsing to avoid expensive re-computation on every render
  // Only re-parse when content changes
  const blocks = useMemo(() => parseBlocks(content), [content]);

  // Notify parent component about headers for Table of Contents
  useEffect(() => {
    if (onHeadersFound) {
      const headers = blocks
        .filter(b => b.type === 'h2' || b.type === 'h3')
        .map(b => ({ id: b.id, text: b.content, level: b.type === 'h2' ? 2 : 3 }));
      onHeadersFound(headers);
    }
  }, [blocks, onHeadersFound]);

  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (anchor && onNavigate) {
      const href = anchor.getAttribute('href');
      if (href) {
        // Handle internal .md links
        if (href.endsWith('.md') || href.includes('./')) {
          e.preventDefault();
          const tabName = href.split('/').pop()?.replace('.md', '').toLowerCase();
          if (tabName) onNavigate(tabName);
        }
        // Handle hash links
        else if (href.startsWith('#')) {
          e.preventDefault();
          const id = href.slice(1);
          const element = document.getElementById(id);
          if (element) {
            const yOffset = -80; // Account for sticky header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      }
    }
  };

  const processInlineMarkdown = (text: string) => {
    const extLinkIcon = '<svg class="inline-block ml-1 w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
    const mailIcon = '<svg class="inline-block ml-1 w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';

    return text
      // Handle navigation paths like "Menu" → "Submenu" first
      .replace(/"([^"]+)"/g, '<span class="inline-flex items-center px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-[13px] font-semibold mx-0.5 shadow-sm">$1</span>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/__(.*?)__/g, '<strong class="text-slate-900 font-bold">$1</strong>')
      .replace(/_(.*?)_/g, '<em class="italic">$1</em>')
      .replace(/~~(.*?)~~/g, '<del class="line-through text-slate-400">$1</del>')
      // Standard Markdown Links [text](url)
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-rose-600 hover:underline font-semibold">$1</a>')
      // Auto-link raw URLs with premium highlighting
      .replace(/(?<!href=")(https?:\/\/[^\s<]+)/g, `<a href="$1" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-rose-600 hover:text-rose-700 font-semibold bg-rose-50/50 hover:bg-rose-100/50 px-1.5 py-0.5 rounded-md transition-all border border-rose-100/50">$1${extLinkIcon}</a>`)
      // Auto-link Emails with premium highlighting
      .replace(/(?<!href=")([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, `<a href="mailto:$1" class="inline-flex items-center text-rose-600 hover:text-rose-700 font-semibold bg-rose-50/50 hover:bg-rose-100/50 px-1.5 py-0.5 rounded-md transition-all border border-rose-100/50">$1${mailIcon}</a>`)
      .replace(/`(.*?)`/g, '<code class="bg-slate-100 text-rose-600 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/→/g, '<span class="text-slate-400 mx-1 font-light">→</span>');
  };

  const applyHighlight = (html: string): string => {
    if (!html || !highlightTerm || highlightTerm.length < 2) return html || '';
    try {
      const escaped = highlightTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const parts = html.split(/(<[^>]*>)/g);
      return parts.map(part => {
        if (!part || part.startsWith('<')) return part || '';
        return part.replace(new RegExp(`(${escaped})`, 'gi'),
          '<mark class="bg-amber-200 text-amber-900 px-0.5 rounded-sm search-highlight">$1</mark>'
        );
      }).join('');
    } catch {
      return html;
    }
  };

  const highlightText = (text: string): React.ReactNode => {
    if (!text || !highlightTerm || highlightTerm.length < 2) return text || '';
    try {
      const escaped = highlightTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
      if (parts.length === 1) return text;
      return parts.map((part, i) =>
        part.toLowerCase() === highlightTerm.toLowerCase()
          ? <mark key={i} className="bg-amber-200 text-amber-900 px-0.5 rounded-sm search-highlight">{part}</mark>
          : part
      );
    } catch {
      return text;
    }
  };

  const processWithHighlight = (text: string): string => {
    if (!text) return '';
    try {
      return applyHighlight(processInlineMarkdown(text));
    } catch {
      return processInlineMarkdown(text);
    }
  };

  const renderHeading = (level: number, block: any, i: number) => {
    const styles = {
      1: "text-4xl font-extrabold text-slate-900 mt-12 mb-6 border-b border-slate-200 pb-4 tracking-tight",
      2: "text-3xl font-bold text-slate-900 mt-10 mb-5 tracking-tight",
      3: "text-2xl font-bold text-slate-800 mt-8 mb-4 tracking-tight",
      4: "text-xl font-bold text-slate-800 mt-6 mb-3 tracking-tight",
      5: "text-lg font-bold text-slate-800 mt-4 mb-2 tracking-tight",
      6: "text-base font-bold text-slate-700 mt-4 mb-2 tracking-tight uppercase tracking-wider"
    }[level as 1 | 2 | 3 | 4 | 5 | 6];

    const anchorButton = (
      <button
        onClick={() => handleCopyAnchor(block.id)}
        className="opacity-0 group-hover:opacity-100 transition-all p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-rose-500 relative"
        title="Copy section link"
      >
        {activeAnchor === block.id ? (
          <Check size={16} className="text-emerald-500" />
        ) : (
          <LinkIcon size={16} />
        )}
        {activeAnchor === block.id && (
          <span className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    );

    const highlighted = highlightText(block.content);

    switch (level) {
      case 1: return <h1 key={i} id={block.id} className={`${styles} group flex items-center gap-3`}>{highlighted}{anchorButton}</h1>;
      case 2: return <h2 key={i} id={block.id} className={`${styles} group flex items-center gap-3`}>{highlighted}{anchorButton}</h2>;
      case 3: return <h3 key={i} id={block.id} className={`${styles} group flex items-center gap-3`}>{highlighted}{anchorButton}</h3>;
      case 4: return <h4 key={i} id={block.id} className={`${styles} group flex items-center gap-3`}>{highlighted}{anchorButton}</h4>;
      case 5: return <h5 key={i} id={block.id} className={`${styles} group flex items-center gap-3`}>{highlighted}{anchorButton}</h5>;
      case 6: return <h6 key={i} id={block.id} className={`${styles} group flex items-center gap-3`}>{highlighted}{anchorButton}</h6>;
      default: return null;
    }
  };

  return (
    <div className="space-y-4" onClick={handleLinkClick}>
      {blocks.map((block, i) => {
        if (block.type === 'space') return <div key={i} className="h-2" />;
        if (block.type === 'hr') {
          return <hr key={i} className="my-12 border-t border-slate-200" />;
        }
        if (block.type.startsWith('h')) {
          const level = parseInt(block.type.substring(1));
          return renderHeading(level, block, i);
        }

        if (block.type === 'blockquote') {
          return (
            <div key={i} className="my-6 pl-6 border-l-4 border-rose-500 bg-rose-50/30 py-4 pr-4 rounded-r-xl flex gap-4">
              <Quote className="text-rose-500 shrink-0" size={20} />
              <p className="text-slate-700 italic leading-relaxed" dangerouslySetInnerHTML={{ __html: processWithHighlight(block.content) }} />
            </div>
          );
        }

        if (block.type === 'task') {
          return (
            <div key={i} className="flex items-start gap-3 my-3 ml-2">
              <div className="shrink-0 mt-1">
                {block.completed ?
                  <CheckSquare className="text-rose-500" size={18} /> :
                  <Square className="text-slate-300" size={18} />
                }
              </div>
              <span className={`text-slate-600 leading-relaxed ${block.completed ? 'line-through text-slate-400' : ''}`} dangerouslySetInnerHTML={{ __html: processWithHighlight(block.content) }} />
            </div>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul key={i} className="ml-6 list-disc space-y-2 my-4">
              {block.items.map((item: any, idx: number) => (
                <li key={idx} className="text-slate-600 leading-relaxed pl-2" dangerouslySetInnerHTML={{ __html: processWithHighlight(item.content) }} />
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={i} className="ml-6 list-decimal space-y-2 my-4">
              {block.items.map((item: any, idx: number) => (
                <li key={idx} value={item.value} className="text-slate-600 leading-relaxed pl-2" dangerouslySetInnerHTML={{ __html: processWithHighlight(item.content) }} />
              ))}
            </ol>
          );
        }

        if (block.type === 'table') {
          return (
            <div key={i} className="my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm max-w-full">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px] md:min-w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      {block.content[0].map((cell: string, idx: number) => (
                        <th key={idx} className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {block.content.slice(1).map((row: string[], rowIdx: number) => (
                      <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors">
                        {row.map((cell: string, cellIdx: number) => (
                          <td key={cellIdx} className="px-6 py-4 text-sm text-slate-600">
                            <span dangerouslySetInnerHTML={{ __html: processWithHighlight(cell) }} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }

        if (block.type === 'code') {
          const codeLines = block.content.split('\n');
          return (
            <div key={i} className="relative group my-8 rounded-xl overflow-hidden border border-slate-800 shadow-2xl max-w-full">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                  </div>
                  {block.language && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{block.language}</span>
                  )}
                </div>
                <button
                  onClick={() => handleCopy(block.content, i)}
                  className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                >
                  {copiedIndex === i ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-900 overflow-x-auto">
                <pre className="font-mono text-sm leading-6 py-4 flex min-w-full">
                  <div className="select-none text-right pr-4 pl-4 border-r border-slate-800 text-slate-600 bg-slate-900/50 sticky left-0 min-w-[3rem]">
                    {codeLines.map((_: any, idx: number) => (
                      <div key={idx} className="h-6">{idx + 1}</div>
                    ))}
                  </div>
                  <div className="pl-4 pr-8 text-slate-300 min-w-full whitespace-pre">
                    {codeLines.map((line: string, idx: number) => (
                      <div key={idx} className="h-6 flex items-center">
                        <span className="inline-block">{highlightTerm ? highlightText(line || ' ') : (line || ' ')}</span>
                      </div>
                    ))}
                  </div>
                </pre>
              </div>
            </div>
          );
        }

        if (block.type === 'p') {
          return (
            <p
              key={i}
              className="text-slate-600 leading-relaxed text-lg break-words"
              dangerouslySetInnerHTML={{ __html: processWithHighlight(block.content) }}
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default MarkdownRenderer;
