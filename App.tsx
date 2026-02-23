
import React, { useState, useMemo, useEffect } from 'react';
import {
  Menu,
  X,
  Search,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Layout,
  Clock,
  HelpCircle,
  ArrowUp,
  Link as LinkIcon,
  Check
} from 'lucide-react';
import { DOCS_CONTENT, APP_VERSION, DEMO_URL, SUPPORT_EMAIL } from './constants';
import { DocsContent, DocSection } from './types';
import MarkdownRenderer from './components/MarkdownRenderer';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('getting_started');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeHeaders, setActiveHeaders] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isDesktopSearchFocused, setIsDesktopSearchFocused] = useState(false);
  const [loadedContent, setLoadedContent] = useState<Record<string, string>>({});
  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(null);
  const [searchHighlight, setSearchHighlight] = useState<string>('');
  const desktopSearchRef = React.useRef<HTMLDivElement>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const loadingRef = React.useRef<Set<string>>(new Set());
  const sidebarScrollRef = React.useRef<HTMLUListElement>(null);

  // Close desktop search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(e.target as Node)) {
        setIsDesktopSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC key closes modals
      if (e.key === 'Escape') {
        if (isAiAssistantOpen) {
          setIsAiAssistantOpen(false);
        } else if (isMobileSearchOpen) {
          setIsMobileSearchOpen(false);
          setSearchQuery('');
        } else if (isMobileTocOpen) {
          setIsMobileTocOpen(false);
        } else if (sidebarOpen) {
          setSidebarOpen(false);
        }
      }

      // Cmd/Ctrl + K opens search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (window.innerWidth < 768) {
          setIsMobileSearchOpen(true);
        } else {
          // Focus the desktop search input
          const searchInput = document.querySelector<HTMLInputElement>('input[aria-label="Search documentation"]');
          searchInput?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAiAssistantOpen, isMobileSearchOpen, isMobileTocOpen, sidebarOpen]);

  // Preload all section content in background for search
  useEffect(() => {
    const preloadAllContent = async () => {
      for (const [key, section] of Object.entries(DOCS_CONTENT)) {
        if (section.loadContent && !loadingRef.current.has(key)) {
          loadingRef.current.add(key);
          try {
            const loaded = await section.loadContent();
            setLoadedContent(prev => {
              if (prev[key]) return prev; // Already loaded by active tab
              return {
                ...prev,
                [key]: loaded.content || '',
                ...Object.fromEntries(
                  Object.entries(loaded.subItems || {}).map(([subKey, subItem]) => [subKey, subItem.content])
                )
              };
            });
          } catch (error) {
            console.error(`Failed to preload content for ${key}:`, error);
          } finally {
            loadingRef.current.delete(key);
          }
        }
      }
    };

    // Delay preloading slightly so the active tab loads first
    const timer = setTimeout(preloadAllContent, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Load content lazily when activeTab changes
  useEffect(() => {
    const loadSectionContent = async () => {
      const section = DOCS_CONTENT[activeTab];
      if (!section) {
        // Check if it's a subItem
        for (const parent of Object.values(DOCS_CONTENT)) {
          if (parent.subItems && parent.subItems[activeTab]) {
            // Check if parent content is loaded or is loading
            const parentKey = Object.keys(DOCS_CONTENT).find(key => DOCS_CONTENT[key].subItems && DOCS_CONTENT[key].subItems![activeTab]);
            if (parentKey && !loadingRef.current.has(parentKey) && parent.loadContent) {
              // Check if content is already loaded
              setLoadedContent(prev => {
                if (prev[activeTab]) return prev; // Already loaded

                // Mark as loading
                loadingRef.current.add(parentKey);
                setIsLoadingContent(true);

                // Load parent content which includes subItems
                parent.loadContent().then(loadedSection => {
                  setLoadedContent(current => ({
                    ...current,
                    [parentKey]: loadedSection.content || '',
                    // Also load all subItems content
                    ...Object.fromEntries(
                      Object.entries(loadedSection.subItems || {}).map(([key, subItem]) => [key, subItem.content])
                    )
                  }));
                  loadingRef.current.delete(parentKey);
                  setIsLoadingContent(false);
                }).catch(error => {
                  console.error(`Failed to load content for ${parentKey}:`, error);
                  loadingRef.current.delete(parentKey);
                  setIsLoadingContent(false);
                });

                return prev;
              });
            }
            return;
          }
        }
        return;
      }

      // Check if we're already loading or have loaded this section
      if (loadingRef.current.has(activeTab)) return;

      // Check using functional setState to get current value
      setLoadedContent(prev => {
        // If already loaded, don't reload
        if (prev[activeTab]) return prev;

        // If section has loadContent function, load it
        if (section.loadContent) {
          // Mark as loading
          loadingRef.current.add(activeTab);
          setIsLoadingContent(true);

          section.loadContent().then(loadedSection => {
            setLoadedContent(current => ({
              ...current,
              [activeTab]: loadedSection.content || '',
              // Also load all subItems content if they exist
              ...Object.fromEntries(
                Object.entries(loadedSection.subItems || {}).map(([key, subItem]) => [key, subItem.content])
              )
            }));
            loadingRef.current.delete(activeTab);
            setIsLoadingContent(false);
          }).catch(error => {
            console.error(`Failed to load content for ${activeTab}:`, error);
            loadingRef.current.delete(activeTab);
            setIsLoadingContent(false);
          });
        } else if (section.content) {
          // If section already has content
          return {
            ...prev,
            [activeTab]: section.content || ''
          };
        }

        return prev;
      });
    };

    loadSectionContent();
  }, [activeTab]);

  useEffect(() => {
    if (activeSectionId && sidebarScrollRef.current) {
      const activeEl = sidebarScrollRef.current.querySelector(`[data-header-id="${activeSectionId}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeSectionId]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Calculate reading progress (with safety check to prevent division by zero)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setReadingProgress(Math.min(progress, 100)); // Clamp to 100% max
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    activeHeaders.forEach((header) => {
      const el = document.getElementById(header.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeHeaders]);

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s/g, '-')
      .trim();
  };

  // Find the best matching heading slug for a search query within a section's content
  const findMatchingHeadingSlug = (sectionKey: string, query: string): string | null => {
    // Check loaded content first, then fall back to static content
    let content = loadedContent[sectionKey] || '';

    // If not in loadedContent, check DOCS_CONTENT and subItems
    if (!content) {
      const section = DOCS_CONTENT[sectionKey];
      if (section) {
        content = section.content || '';
      } else {
        // Check sub-items
        for (const parent of Object.values(DOCS_CONTENT)) {
          if (parent.subItems && parent.subItems[sectionKey]) {
            content = parent.subItems[sectionKey].content || '';
            break;
          }
        }
      }
    }

    if (!content) return null;

    const lowerQuery = query.toLowerCase();
    const lowerContent = content.toLowerCase();

    // First, check if query directly matches a heading
    const headingRegex = /^#{1,6}\s+(.+)$/gm;
    let match: RegExpExecArray | null;
    while ((match = headingRegex.exec(content)) !== null) {
      const headingText = match[1].trim();
      if (headingText.toLowerCase().includes(lowerQuery)) {
        return slugify(headingText);
      }
    }

    // If no heading matches, find the nearest heading above the first text occurrence
    const textIndex = lowerContent.indexOf(lowerQuery);
    if (textIndex === -1) return null;

    // Collect all headings with their positions
    const headingPosRegex = /^#{1,6}\s+(.+)$/gm;
    let lastHeadingSlug: string | null = null;
    while ((match = headingPosRegex.exec(content)) !== null) {
      if (match.index > textIndex) break;
      lastHeadingSlug = slugify(match[1].trim());
    }

    return lastHeadingSlug;
  };

  // Scroll to pending target after content renders
  useEffect(() => {
    if (!pendingScrollTarget || isLoadingContent) return;

    // Poll for the element to appear in the DOM (content may still be rendering)
    let attempts = 0;
    const maxAttempts = 20;
    const poll = setInterval(() => {
      attempts++;
      const element = document.getElementById(pendingScrollTarget);
      if (element) {
        clearInterval(poll);
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setPendingScrollTarget(null);
      } else if (attempts >= maxAttempts) {
        clearInterval(poll);
        setPendingScrollTarget(null);
      }
    }, 150);

    return () => clearInterval(poll);
  }, [pendingScrollTarget, isLoadingContent, activeHeaders]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeaderClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Navigate to a section and optionally scroll to a matching heading
  const handleSearchNavigate = (sectionKey: string, query?: string) => {
    // Set highlight term and auto-clear after 8 seconds
    if (query && query.length >= 2) {
      setSearchHighlight(query);
      setTimeout(() => setSearchHighlight(''), 8000);
    }

    if (query) {
      const slug = findMatchingHeadingSlug(sectionKey, query);
      if (slug) {
        // Always use pendingScrollTarget for reliable scroll-after-render
        setPendingScrollTarget(slug);
        if (activeTab !== sectionKey) {
          setActiveTab(sectionKey);
        }
        return;
      }
    }
    setActiveTab(sectionKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredDocs = useMemo<DocsContent>(() => {
    if (!searchQuery) return DOCS_CONTENT;
    const result: DocsContent = {};
    const query = searchQuery.toLowerCase();

    Object.entries(DOCS_CONTENT).forEach(([key, val]) => {
      const mainMatch = val.title.toLowerCase().includes(query) ||
        (loadedContent[key]?.toLowerCase().includes(query)) ||
        (val.content?.toLowerCase().includes(query)) ||
        val.tags?.some(tag => tag.toLowerCase().includes(query));

      if (mainMatch) {
        result[key] = val;
      } else if (val.subItems) {
        // Check sub-items
        const matchingSubItems: Record<string, any> = {};
        Object.entries(val.subItems).forEach(([subKey, subVal]) => {
          if (subVal.title.toLowerCase().includes(query) ||
            (loadedContent[subKey]?.toLowerCase().includes(query)) ||
            subVal.content.toLowerCase().includes(query) ||
            subVal.tags?.some(tag => tag.toLowerCase().includes(query))) {
            matchingSubItems[subKey] = subVal;
          }
        });

        if (Object.keys(matchingSubItems).length > 0) {
          result[key] = { ...val, subItems: matchingSubItems };
        }
      }
    });
    return result;
  }, [searchQuery, loadedContent]);

  const activeSection = useMemo(() => {
    let section: DocSection | undefined = DOCS_CONTENT[activeTab];
    let parentIcon: any = undefined;

    if (!section) {
      // Check if it's a subItem
      for (const parent of Object.values(DOCS_CONTENT)) {
        if (parent.subItems && parent.subItems[activeTab]) {
          const subItem = parent.subItems[activeTab];
          parentIcon = parent.icon;
          // Convert subItem to full DocSection
          section = {
            title: subItem.title,
            icon: subItem.icon || parentIcon,
            content: subItem.content,
            tags: subItem.tags
          };
          break;
        }
      }
    }

    if (!section) {
      section = DOCS_CONTENT['getting_started'];
    }

    // Return section with loaded content if available
    return {
      ...section,
      content: loadedContent[activeTab] || section.content || ''
    };
  }, [activeTab, loadedContent]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        {/* Reading Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-rose-500 transition-all duration-150 ease-out z-50"
          style={{ width: `${readingProgress}%` }}
        />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              aria-expanded={sidebarOpen}
              aria-controls="sidebar-navigation"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button
              onClick={() => {
                setActiveTab('getting_started');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center">
                <img src="assets/logo.png" alt="BookHere Logo" className="w-12 h-12 object-contain" />
              </div>
              <div className="hidden sm:block text-left">
                <h1 className="font-extrabold text-slate-900 text-xl tracking-tight leading-none">BookHere</h1>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Documentation Hub {APP_VERSION}</p>
              </div>
            </button>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-8" ref={desktopSearchRef}>
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-slate-400 group-focus-within:text-rose-500 transition-colors" size={18} />
              </div>
              <input
                type="text"
                placeholder="Search across 60+ guides..."
                className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl pl-12 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsDesktopSearchFocused(true)}
                aria-label="Search documentation"
              />
              {/* Desktop Search Results Dropdown */}
              {searchQuery && isDesktopSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/50 overflow-hidden z-50 max-h-[70vh] overflow-y-auto">
                  {Object.keys(filteredDocs).length > 0 ? (
                    <div className="p-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">
                        {Object.keys(filteredDocs).length} result{Object.keys(filteredDocs).length !== 1 ? 's' : ''} found
                      </p>
                      {Object.entries(filteredDocs).map(([key, item]: [string, DocSection]) => {
                        const Icon = item.icon;
                        return (
                          <div key={key}>
                            <button
                              onClick={() => {
                                const query = searchQuery;
                                setSearchQuery('');
                                setIsDesktopSearchFocused(false);
                                handleSearchNavigate(key, query);
                              }}
                              className="w-full text-left px-3 py-3 hover:bg-rose-50 rounded-xl group transition-all flex items-center gap-3"
                            >
                              <Icon size={18} className="text-slate-400 group-hover:text-rose-500 shrink-0" />
                              <div className="min-w-0">
                                <span className="text-sm font-semibold text-slate-700 group-hover:text-rose-900 block">{item.title}</span>
                                {item.tags && (
                                  <span className="text-[11px] text-slate-400 truncate block">
                                    {item.tags.slice(0, 3).map(t => `#${t}`).join(' ')}
                                  </span>
                                )}
                              </div>
                              <ChevronRight size={14} className="ml-auto text-slate-300 group-hover:text-rose-400 shrink-0" />
                            </button>
                            {/* Show matching sub-items */}
                            {item.subItems && Object.entries(item.subItems).map(([subKey, subItem]) => (
                              <button
                                key={subKey}
                                onClick={() => {
                                  const query = searchQuery;
                                  setSearchQuery('');
                                  setIsDesktopSearchFocused(false);
                                  handleSearchNavigate(subKey, query);
                                }}
                                className="w-full text-left px-3 py-2 pl-10 hover:bg-rose-50 rounded-xl group transition-all flex items-center gap-3"
                              >
                                {subItem.icon && <subItem.icon size={14} className="text-slate-400 group-hover:text-rose-500 shrink-0" />}
                                <span className="text-[13px] font-medium text-slate-500 group-hover:text-rose-800">{subItem.title}</span>
                                <ChevronRight size={12} className="ml-auto text-slate-300 group-hover:text-rose-400 shrink-0" />
                              </button>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 px-4">
                      <Search size={32} className="text-slate-200 mx-auto mb-3" />
                      <p className="text-sm text-slate-500 font-medium">No matching guides found</p>
                      <p className="text-xs text-slate-400 mt-1">Try a different search term</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600"
              aria-label="Open search"
            >
              <Search size={20} />
            </button>

            <div className="relative group">
              <button
                onClick={() => setIsAiAssistantOpen(true)}
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-md shadow-slate-200 group"
                aria-label="Open AI Assistant"
              >
                <Sparkles size={16} className="text-rose-400 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Ask AI</span>
              </button>
              {/* Tooltip */}
              <div className="absolute top-full right-0 mt-2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all pointer-events-none whitespace-nowrap shadow-xl z-[60]">
                Get AI Help
                <div className="absolute bottom-full right-6 -mb-1 border-4 border-transparent border-b-slate-900" />
              </div>
            </div>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1440px] mx-auto w-full relative">
        {/* Navigation Sidebar */}
        <aside
          id="sidebar-navigation"
          className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 fixed lg:sticky top-16 h-[calc(100vh-64px)] w-72 border-r border-slate-100 bg-white z-40 transition-transform duration-300 ease-in-out lg:bg-slate-50/30
        `}
          aria-label="Main navigation"
        >
          <nav className="p-6 space-y-2 overflow-y-auto h-full hide-scrollbar" role="navigation">
            <div className="mb-8">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Core Documentation</p>
              <div className="space-y-1">
                {Object.entries(DOCS_CONTENT).map(([key, item]: [string, DocSection]) => {
                  const Icon = item.icon;
                  const hasSubItems = item.subItems && Object.keys(item.subItems).length > 0;
                  const isParentActive = activeTab === key || (item.subItems && Object.keys(item.subItems).includes(activeTab));

                  return (
                    <div key={key} className="space-y-1">
                      <button
                        onClick={() => {
                          if (hasSubItems) {
                            if (!item.content && item.subItems) {
                              setActiveTab(Object.keys(item.subItems)[0]);
                            } else {
                              setActiveTab(key);
                            }
                          } else {
                            setActiveTab(key);
                          }
                          setSidebarOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${activeTab === key
                          ? 'bg-rose-50 text-rose-600 shadow-sm border border-rose-100'
                          : 'text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-100'
                          }`}
                      >
                        <Icon size={18} className={`shrink-0 ${activeTab === key ? 'text-rose-500' : 'text-slate-400 group-hover:text-slate-600'} transition-colors`} />
                        {item.title}
                        {hasSubItems && <ChevronRight size={14} className={`ml-auto shrink-0 transition-transform ${isParentActive ? 'rotate-90' : ''} opacity-50`} />}
                      </button>

                      {hasSubItems && isParentActive && (
                        <div className="ml-9 space-y-1 mt-1 border-l-2 border-slate-100 pl-2">
                          {Object.entries(item.subItems!).map(([subKey, subItem]) => {
                            const SubIcon = subItem.icon;
                            return (
                              <button
                                key={subKey}
                                onClick={() => {
                                  setActiveTab(subKey);
                                  setSidebarOpen(false);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`w-full flex items-center gap-2.5 px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${activeTab === subKey
                                  ? 'text-rose-600 bg-rose-50/50'
                                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                  }`}
                              >
                                {SubIcon && <SubIcon size={14} className={`shrink-0 ${activeTab === subKey ? 'text-rose-500' : 'text-slate-400'}`} />}
                                {subItem.title}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Community & Help</p>
              <div className="space-y-4">
                <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  <HelpCircle size={18} className="text-slate-400" />
                  Support Tickets
                </a>
                <div className="px-4 py-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl shadow-slate-200 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-rose-500/20 rounded-full blur-2xl group-hover:bg-rose-500/30 transition-colors"></div>
                  <h4 className="text-white font-bold text-sm mb-2">Extended Support</h4>
                  <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                    Get custom builds and prioritized installation from our expert dev team.
                  </p>
                  <button className="w-full py-2 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-6 lg:p-16 min-h-screen">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">
              <span className="hover:text-slate-600 cursor-pointer">Docs</span>
              <ChevronRight size={10} />
              <span className="text-rose-500">{activeSection.title}</span>
            </div>

            {/* Article */}
            <article className="min-h-[60vh]">
              <div className="mb-12">
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeSection.tags?.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {isLoadingContent ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-200 rounded w-4/5"></div>
                  <div className="h-8 bg-slate-200 rounded w-2/3 mt-8"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <p className="text-center text-slate-500 text-sm mt-8">Loading documentation...</p>
                </div>
              ) : (
                <MarkdownRenderer
                  content={activeSection.content || ''}
                  highlightTerm={searchHighlight}
                  onNavigate={(tab) => {
                    const exists = DOCS_CONTENT[tab] || Object.values(DOCS_CONTENT).some(p => p.subItems && p.subItems[tab]);
                    if (exists) {
                      setActiveTab(tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  onHeadersFound={setActiveHeaders}
                />
              )}
            </article>

            {/* Footer Navigation */}
            <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <button className="flex flex-col items-start gap-1 group">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modified</span>
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <Clock size={14} className="text-slate-400" /> Jan 2026
                  </span>
                </button>
                <div className="w-px h-8 bg-slate-200"></div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  © WebPenter Solutions<br />
                  All rights Reserved
                </div>
              </div>
              <div className="flex gap-4">
                <div className="relative group">
                  <button
                    className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <ExternalLink size={20} />
                  </button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all pointer-events-none whitespace-nowrap shadow-xl">
                    Share Page
                    <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-slate-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Desktop "On this Page" Nav */}
        <aside className="hidden xl:block w-72 p-12 sticky top-16 h-fit">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Quick Actions</h4>
          <div className="space-y-4">
            <button
              onClick={() => setIsAiAssistantOpen(true)}
              className="w-full text-left p-4 rounded-2xl bg-rose-50 border border-rose-100 group hover:bg-rose-100 transition-colors"
            >
              <div className="bg-rose-500 p-1.5 rounded-lg w-fit mb-3 text-white shadow-lg shadow-rose-200">
                <Sparkles size={16} />
              </div>
              <h5 className="font-bold text-rose-900 text-sm mb-1">Stuck? Ask AI</h5>
              <p className="text-rose-700/70 text-[11px] leading-relaxed">
                Get instant answers to complex setup questions using our AI assistant.
              </p>
            </button>

            {activeHeaders.length > 0 && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col max-h-[calc(85vh-250px)] shadow-sm">
                <div className="flex items-center justify-between mb-4 shrink-0">
                  <h5 className="font-bold text-slate-900 text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-rose-500" />
                    On this page
                  </h5>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setActiveAnchor('page');
                      setTimeout(() => setActiveAnchor(null), 2000);
                    }}
                    className="text-slate-400 hover:text-rose-500 transition-colors relative"
                    title="Copy page link"
                  >
                    {activeAnchor === 'page' ? <Check size={14} className="text-emerald-500" /> : <LinkIcon size={14} />}
                    {activeAnchor === 'page' && (
                      <span className="absolute right-0 bottom-full mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
                <div className="relative overflow-hidden">
                  {/* Progress Line */}
                  <div className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-slate-200" />

                  <ul
                    ref={sidebarScrollRef}
                    className="space-y-4 text-[13px] text-slate-500 overflow-y-auto pr-2 custom-scrollbar relative"
                  >
                    {activeHeaders.map((header) => {
                      const isActive = activeSectionId === header.id;
                      return (
                        <li
                          key={header.id}
                          data-header-id={header.id}
                          onClick={() => handleHeaderClick(header.id)}
                          className={`
                            relative pl-6 cursor-pointer transition-all duration-300 group
                            ${isActive ? 'text-rose-600 font-bold' : 'hover:text-slate-900 font-medium'}
                            ${header.level === 3 ? 'text-[12px] opacity-80' : ''}
                          `}
                        >
                          {/* Active Dot */}
                          <div className={`
                            absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full border-2 border-white transition-all duration-300 z-10
                            ${isActive ? 'bg-rose-500 scale-100 shadow-lg shadow-rose-200' : 'bg-slate-300 scale-50 group-hover:scale-75 group-hover:bg-slate-400'}
                          `} />

                          <span className="block break-words leading-snug">
                            {header.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* AI Assistant Overlay */}
      <AIAssistant isOpen={isAiAssistantOpen} onClose={() => setIsAiAssistantOpen(false)} />

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-white border-b border-slate-200 p-6 z-50 shadow-2xl h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {searchQuery ? `Search Results (${Object.keys(filteredDocs).length})` : 'Search Documentation'}
            </p>
            <button
              onClick={() => {
                setIsMobileSearchOpen(false);
                setSearchQuery('');
              }}
              className="p-1 text-slate-400 hover:text-slate-900"
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Search Input */}
          <div className="relative w-full group mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-slate-400 group-focus-within:text-rose-500 transition-colors" size={18} />
            </div>
            <input
              type="text"
              placeholder="Search across 60+ guides..."
              className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:bg-white transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <div className="space-y-3">
            {Object.keys(filteredDocs).length > 0 ? (
              Object.entries(filteredDocs).map(([key, item]: [string, DocSection]) => {
                const Icon = item.icon;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      const query = searchQuery;
                      setSearchQuery('');
                      setIsMobileSearchOpen(false);
                      handleSearchNavigate(key, query);
                    }}
                    className="w-full text-left p-4 bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-100 rounded-2xl group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-slate-400 group-hover:text-rose-500" />
                      <span className="text-sm font-bold text-slate-700 group-hover:text-rose-900">{item.title}</span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-12">
                <Search size={48} className="text-slate-200 mx-auto mb-4" />
                <p className="text-sm text-slate-500">No matching guides found. Try a different search term.</p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Back to Top Button */}
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}>
        <div className="relative group">
          <button
            onClick={scrollToTop}
            className="p-4 bg-rose-500 text-white rounded-2xl shadow-2xl shadow-rose-200 hover:bg-rose-600 hover:-translate-y-1 active:scale-95 transition-all"
            aria-label="Scroll back to top"
          >
            <ArrowUp size={24} />
          </button>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-4 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all pointer-events-none whitespace-nowrap shadow-xl">
            Back to Top
            <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-slate-900" />
          </div>
        </div>
      </div>

      {/* Mobile TOC Floating Button */}
      {activeHeaders.length > 0 && (
        <button
          onClick={() => setIsMobileTocOpen(true)}
          className="xl:hidden fixed bottom-8 left-8 p-4 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-40 hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-2"
        >
          <Menu size={20} className="text-rose-500" />
          <span className="text-xs font-bold uppercase tracking-wider">On this page</span>
        </button>
      )}

      {/* Mobile TOC Bottom Sheet */}
      <div className={`xl:hidden fixed inset-0 z-[100] transition-all duration-500 ${isMobileTocOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileTocOpen(false)} />
        <div className={`absolute inset-x-0 bottom-0 bg-white rounded-t-[32px] p-8 transition-transform duration-500 shadow-2xl ${isMobileTocOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
          <div className="flex items-center justify-between mb-6">
            <h5 className="font-bold text-slate-900 text-lg">On this page</h5>
            <button onClick={() => setIsMobileTocOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-500">
              <X size={20} />
            </button>
          </div>
          <ul className="space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
            {activeHeaders.map((header) => (
              <li
                key={header.id}
                onClick={() => {
                  handleHeaderClick(header.id);
                  setIsMobileTocOpen(false);
                }}
                className={`flex items-center gap-4 text-sm transition-colors ${activeSectionId === header.id ? 'text-rose-600 font-bold' : 'text-slate-600 font-medium'
                  } ${header.level === 3 ? 'pl-6 opacity-80' : ''}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${activeSectionId === header.id ? 'bg-rose-500' : 'bg-slate-200'}`} />
                {header.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
