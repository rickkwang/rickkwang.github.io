import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Article, Tab } from './types';
import { SOCIAL_LINKS } from './constants';
import { ARTICLE_COLUMN, HOME_COLUMN, useContentColumn } from './lib/useContentColumn';
import Snail from './components/Snail';
import { IconMoon, IconSun } from './components/Icons';
import {
  ViewAcademic,
  ViewArticle,
  ViewCV,
  ViewHome,
  ViewWork,
  ViewZenGarden,
  WorldTime,
} from './views/PortfolioViews';

const NAV_TABS: Tab[] = ['WORK', 'ACADEMIC', 'CV', 'ZEN'];
const TAB_LABEL: Record<Tab, string> = {
  HOME: 'HOME',
  WORK: 'WORK',
  ACADEMIC: 'ACADEMIC',
  CV: 'CV',
  ZEN: 'ZEN GARDEN',
};
// Old ?tab= links keep working after the restructure
const LEGACY_TAB: Record<string, Tab> = { PROJECTS: 'ACADEMIC', PUBLICATIONS: 'ACADEMIC', WRITING: 'ZEN' };
const TAB_KEY: Record<string, Tab> = { h: 'HOME', w: 'WORK', a: 'ACADEMIC', c: 'CV', z: 'ZEN' };

const FOOTER_LINKS = SOCIAL_LINKS.filter((link) => link.label !== 'LinkedIn');

const getInitialTab = (): Tab => {
  if (typeof window === 'undefined') return 'HOME';
  const query = new URLSearchParams(window.location.search).get('tab');
  const normalized = query?.toUpperCase() ?? '';
  if (LEGACY_TAB[normalized]) return LEGACY_TAB[normalized];
  return NAV_TABS.includes(normalized as Tab) ? (normalized as Tab) : 'HOME';
};

const App = () => {
  const [activeTab, setActiveTab] = useState<Tab>(getInitialTab);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [time, setTime] = useState<WorldTime>({ ldn: '', bjs: '' });
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const handlePopState = () => {
      setActiveTab(getInitialTab());
      setSelectedArticle(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, selectedArticle]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        ldn: now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        bjs: now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Shanghai',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSelectedArticle(null);
    setIsMobileMenuOpen(false);

    const url = new URL(window.location.href);
    if (tab === 'HOME') {
      url.searchParams.delete('tab');
    } else {
      url.searchParams.set('tab', tab);
    }
    window.history.pushState({}, '', url);
    window.scrollTo(0, 0);
  };

  const [showKbdHint, setShowKbdHint] = useState(false);
  // Footer follows the same column as the page above it (home / article); other pages keep the default flow
  const footerColumn = useContentColumn(
    selectedArticle
      ? ARTICLE_COLUMN
      : activeTab === 'HOME'
        ? HOME_COLUMN
        : { enabled: false },
  );

  useEffect(() => {
    setShowKbdHint(true);
    const hide = setTimeout(() => setShowKbdHint(false), 6000);
    const handleKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      const tab = TAB_KEY[event.key.toLowerCase()];
      if (tab) handleTabChange(tab);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      clearTimeout(hide);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!mobileMenuRef.current) return;
      if (mobileMenuRef.current.contains(event.target as Node)) return;
      setIsMobileMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen max-w-[1200px] sm:max-w-[1460px] mx-auto px-4 sm:px-6 md:px-12 dark:text-stone-200">
      <header className="app-header sm:hidden">
        <div className="max-w-[1200px] mx-auto px-4 font-medium text-[11px]">
          <div className="mobile-header-row flex items-center justify-between">
            <button
              type="button"
              className="bg-transparent p-0 cursor-pointer transition-colors text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400"
              onClick={() => handleTabChange('HOME')}
            >
              Zhenhao
            </button>
            <div className="flex items-center gap-3" ref={mobileMenuRef}>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  className="text-stone-500 dark:text-stone-500 hover:text-black dark:hover:text-white transition-colors p-0.5"
                  aria-label="Open navigation menu"
                >
                  <span className="relative block w-4 h-4" aria-hidden="true">
                    <span className={`absolute left-0 top-[3px] h-[1.5px] w-4 bg-current transition-all duration-200 ${isMobileMenuOpen ? 'top-[7px] rotate-45' : ''}`}></span>
                    <span className={`absolute left-0 top-[7px] h-[1.5px] w-4 bg-current transition-all duration-150 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`absolute left-0 top-[11px] h-[1.5px] w-4 bg-current transition-all duration-200 ${isMobileMenuOpen ? 'top-[7px] -rotate-45' : ''}`}></span>
                  </span>
                </button>
                {isMobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 z-20 bg-white dark:bg-stone-900 border-[0.5px] border-stone-300 dark:border-stone-700 p-1.5">
                    {NAV_TABS.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => handleTabChange(tab)}
                        className={`w-full text-left px-2 py-1.5 text-[10px] uppercase tracking-[0.08em] transition-colors border-l ${activeTab === tab ? 'text-black dark:text-white bg-stone-100 dark:bg-stone-800 border-stone-400 dark:border-stone-500' : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 border-transparent'}`}
                      >
                        {TAB_LABEL[tab]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={toggleTheme}
                className="text-stone-400 dark:text-stone-500 hover:text-black dark:hover:text-white transition-colors p-1"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <IconSun /> : <IconMoon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="sm:flex sm:gap-14 md:gap-20 lg:gap-24 pt-12 sm:pt-14">
        <aside className="hidden sm:block sm:w-[150px] md:w-[168px] flex-shrink-0">
          <div className="sticky top-14 flex flex-col justify-between h-[calc(100vh-5rem)]">
            <div>
              <nav className="ruler-nav">
                <button
                  type="button"
                  onClick={() => handleTabChange('HOME')}
                  aria-current={activeTab === 'HOME' && !selectedArticle ? 'page' : undefined}
                  className={`ruler-item ruler-home flex items-center gap-2.5 bg-transparent p-0 cursor-pointer leading-none py-1 mb-2 ${activeTab === 'HOME' && !selectedArticle ? 'is-active' : ''}`}
                >
                  <span className="w-8 flex-none" aria-hidden="true"><span className="ruler-tick"></span></span>
                  <span className="ruler-label whitespace-nowrap text-[13px]">Zhenhao</span>
                </button>
                <div className="flex flex-col gap-2">
                  {NAV_TABS.map((tab) => {
                    const active = activeTab === tab && !selectedArticle;
                    return (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        aria-current={active ? 'page' : undefined}
                        aria-label={TAB_LABEL[tab]}
                        className={`ruler-item group flex items-center gap-2.5 py-1 text-left text-[11px] uppercase tracking-[0.08em] ${active ? 'is-active' : ''}`}
                      >
                        <span className="w-8 flex-none" aria-hidden="true"><span className="ruler-tick"></span></span>
                        <span className="ruler-label whitespace-nowrap">{TAB_LABEL[tab]}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>
            </div>
            <button
              onClick={toggleTheme}
              className="text-stone-400 dark:text-stone-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 text-[11px] uppercase tracking-[0.08em]"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>
          </div>
        </aside>

        <div className="flex-1 min-w-0 sm:pr-8 lg:pr-12">
          <main className="app-main min-h-[calc(100vh-200px)]" key={selectedArticle ? `article-${selectedArticle.id}` : `tab-${activeTab}`}>
            {selectedArticle ? (
              <ViewArticle
                data={selectedArticle}
                onBack={() => handleTabChange(activeTab)}
                backLabel={TAB_LABEL[activeTab]}
                onSelect={handleArticleSelect}
              />
            ) : (
              <>
                {activeTab === 'HOME' && <ViewHome time={time} onSelect={handleArticleSelect} onNavigate={handleTabChange} />}
                {activeTab === 'WORK' && <ViewWork onSelect={handleArticleSelect} />}
                {activeTab === 'ACADEMIC' && <ViewAcademic onSelect={handleArticleSelect} />}
                {activeTab === 'CV' && <ViewCV />}
                {activeTab === 'ZEN' && <ViewZenGarden onSelect={handleArticleSelect} />}
              </>
            )}
          </main>

          <div ref={footerColumn.wrapperRef}>
          <div style={footerColumn.columnStyle} className="max-w-4xl">
          <Snail />
          <footer className="mono mt-2 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[10px] text-stone-500 dark:text-stone-400 uppercase pb-8 font-medium tracking-[0.04em]">
            <div className="leading-relaxed">© {new Date().getFullYear()} MYRICK WANG <span className="mx-3 opacity-20">/</span> BRISTOL EEE</div>
            <div className="dim-siblings flex items-center gap-6">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-stone-500 dark:text-stone-400 hover:text-black dark:hover:text-stone-200"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                className="bg-transparent p-0 cursor-pointer text-stone-500 dark:text-stone-400 hover:text-black dark:hover:text-stone-200 flex items-center gap-1.5"
                onClick={() => window.scrollTo(0, 0)}
              >
                top <span aria-hidden>↑</span>
              </button>
            </div>
          </footer>
          </div>
          </div>
          <div className={`kbd-hint ${showKbdHint ? 'show' : ''}`} aria-hidden="true">
            Press <b>H</b> <b>W</b> <b>A</b> <b>C</b> <b>Z</b> to navigate
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;