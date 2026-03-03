import { useEffect, useRef, useState } from 'react';
import { Article, Tab } from './types';
import { IconMoon, IconSun } from './components/Icons';
import {
  ViewArticle,
  ViewCV,
  ViewHome,
  ViewProjects,
  ViewPublications,
  ViewZenList,
  WorldTime,
} from './views/PortfolioViews';

const NAV_TABS: Tab[] = ['CV', 'PROJECTS', 'PUBLICATIONS', 'ZEN'];
const MOBILE_MENU_TABS: Tab[] = ['CV', 'PROJECTS', 'PUBLICATIONS', 'ZEN'];
const PAGE_TRANSITION_MS = 220;
const getInitialTab = (): Tab => {
  if (typeof window === 'undefined') return 'HOME';
  const query = new URLSearchParams(window.location.search).get('tab');
  const normalized = query?.toUpperCase();
  return normalized && NAV_TABS.includes(normalized as Tab) ? (normalized as Tab) : 'HOME';
};

const App = () => {
  const [activeTab, setActiveTab] = useState<Tab>(getInitialTab);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [renderTab, setRenderTab] = useState<Tab>(getInitialTab);
  const [renderArticle, setRenderArticle] = useState<Article | null>(null);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [time, setTime] = useState<WorldTime>({ ldn: '', bjs: '' });
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const getTabFromUrl = (): Tab => getInitialTab();

  useEffect(() => {
    const clearTimer = () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    };

    const runTransition = (nextTab: Tab, nextArticle: Article | null, withSmoothScroll = false) => {
      clearTimer();
      setActiveTab(nextTab);
      setSelectedArticle(nextArticle);
      setIsPageVisible(false);

      transitionTimerRef.current = window.setTimeout(() => {
        setRenderTab(nextTab);
        setRenderArticle(nextArticle);
        if (withSmoothScroll) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
        setIsPageVisible(true);
      }, PAGE_TRANSITION_MS);
    };

    const handlePopState = () => {
      runTransition(getTabFromUrl(), null);
    };
    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => {
      clearTimer();
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

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
    setIsPageVisible(false);

    const url = new URL(window.location.href);
    if (tab === 'HOME') {
      url.searchParams.delete('tab');
    } else {
      url.searchParams.set('tab', tab);
    }
    window.history.pushState({}, '', url);

    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = window.setTimeout(() => {
      setRenderTab(tab);
      setRenderArticle(null);
      window.scrollTo({ top: 0, behavior: 'auto' });
      setIsPageVisible(true);
    }, PAGE_TRANSITION_MS);
  };

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
    setIsPageVisible(false);

    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = window.setTimeout(() => {
      setRenderArticle(article);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsPageVisible(true);
    }, PAGE_TRANSITION_MS);
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
    <div className="min-h-screen max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 dark:text-neutral-200">
      <header>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 uppercase font-medium text-[11px]">
          <div className="sm:hidden flex items-center justify-between py-4">
            <button
              type="button"
              className="bg-transparent p-0 cursor-pointer hover:opacity-50 transition-opacity text-neutral-900 dark:text-neutral-100"
              onClick={() => handleTabChange('HOME')}
            >
              Myrick Wang
            </button>
            <div className="flex items-center gap-3" ref={mobileMenuRef}>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  className="text-neutral-500 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors p-0.5"
                  aria-label="Open navigation menu"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </svg>
                </button>
                {isMobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 z-20 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg rounded-md p-1.5">
                    {MOBILE_MENU_TABS.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => handleTabChange(tab)}
                        className={`w-full text-left px-2 py-1.5 rounded text-[10px] uppercase transition-colors ${activeTab === tab ? 'text-black dark:text-white bg-neutral-100 dark:bg-neutral-800' : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
                      >
                        {tab === 'ZEN' ? 'ZEN LAND' : tab}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={toggleTheme}
                className="text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors p-1"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <IconSun /> : <IconMoon />}
              </button>
            </div>
          </div>

          <div className="hidden sm:flex justify-between items-center h-16">
            <button
              type="button"
              className="bg-transparent p-0 cursor-pointer hover:opacity-50 transition-opacity text-neutral-900 dark:text-neutral-100"
              onClick={() => handleTabChange('HOME')}
            >
              Myrick Wang
            </button>
            <nav className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap items-center gap-x-5 gap-y-2 sm:gap-x-10">
              {NAV_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`transition-all whitespace-nowrap ${activeTab === tab && !selectedArticle ? 'text-black dark:text-white underline underline-offset-8 decoration-[0.5px]' : 'text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white'}`}
                >
                  {tab === 'ZEN' ? 'ZEN LAND' : tab}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className="text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors p-1"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <IconSun /> : <IconMoon />}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-28 sm:pt-20 md:pt-24 min-h-[calc(100vh-200px)]">
        <div
          className={`transition-all duration-200 ease-out ${isPageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'}`}
          style={{ transitionDuration: `${PAGE_TRANSITION_MS}ms` }}
        >
          {renderArticle ? (
            <ViewArticle
              data={renderArticle}
              onBack={() => handleTabChange(activeTab)}
              backLabel={activeTab === 'ZEN' ? 'ZEN LAND' : activeTab}
            />
          ) : (
            <>
              {renderTab === 'HOME' && <ViewHome time={time} />}
              {renderTab === 'CV' && <ViewCV />}
              {renderTab === 'PROJECTS' && <ViewProjects onSelect={handleArticleSelect} />}
              {renderTab === 'PUBLICATIONS' && <ViewPublications onSelect={handleArticleSelect} />}
              {renderTab === 'ZEN' && <ViewZenList onSelect={handleArticleSelect} />}
            </>
          )}
        </div>
      </main>

      <footer className="mt-16 md:mt-20 pt-6 border-t-[0.5px] border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[9px] text-neutral-300 dark:text-neutral-600 uppercase pb-8 font-medium">
        <div className="leading-relaxed">© {new Date().getFullYear()} MYRICK WANG <span className="mx-3 opacity-20">/</span> BRISTOL EEE</div>
        <button
          type="button"
          className="bg-transparent p-0 cursor-pointer hover:text-black dark:hover:text-neutral-200 transition-all flex items-center gap-2"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          INDEX <span>↑</span>
        </button>
      </footer>
    </div>
  );
};

export default App;
