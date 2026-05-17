import { useEffect, useRef, useState } from 'react';
import { Article, Tab } from './types';
import { IconMoon, IconSun } from './components/Icons';
import IntroOverlay from './components/IntroOverlay';
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
const TAB_LABEL: Record<Tab, string> = {
  HOME: 'HOME',
  CV: 'CV',
  PROJECTS: 'PROJECTS',
  PUBLICATIONS: 'PUBLICATIONS',
  ZEN: 'ZEN LAND',
};
const PAGE_TRANSITION_MS = 220;
const getInitialTab = (): Tab => {
  if (typeof window === 'undefined') return 'HOME';
  const query = new URLSearchParams(window.location.search).get('tab');
  const normalized = query?.toUpperCase();
  return normalized && NAV_TABS.includes(normalized as Tab) ? (normalized as Tab) : 'HOME';
};

const App = () => {
  const [introVisible, setIntroVisible] = useState(true);
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
      runTransition(getInitialTab(), null);
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
    <div className="min-h-screen max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 dark:text-neutral-200">
      {introVisible && <IntroOverlay onEnter={() => {
        setActiveTab('HOME');
        setRenderTab('HOME');
        setSelectedArticle(null);
        setRenderArticle(null);
        const url = new URL(window.location.href);
        url.searchParams.delete('tab');
        window.history.replaceState({}, '', url);
        setIntroVisible(false);
        window.scrollTo({ top: 0, behavior: 'auto' });
      }} />}
      <header className="app-header">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 font-medium text-[11px]">
          <div className="sm:hidden mobile-header-row flex items-center justify-between">
            <button
              type="button"
              className="bg-transparent p-0 cursor-pointer hover:opacity-60 transition-opacity text-neutral-900 dark:text-neutral-100"
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
                  <span className="relative block w-4 h-4" aria-hidden="true">
                    <span className={`absolute left-0 top-[3px] h-[1.5px] w-4 bg-current transition-all duration-200 ${isMobileMenuOpen ? 'top-[7px] rotate-45' : ''}`}></span>
                    <span className={`absolute left-0 top-[7px] h-[1.5px] w-4 bg-current transition-all duration-150 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`absolute left-0 top-[11px] h-[1.5px] w-4 bg-current transition-all duration-200 ${isMobileMenuOpen ? 'top-[7px] -rotate-45' : ''}`}></span>
                  </span>
                </button>
                {isMobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 z-20 bg-white dark:bg-neutral-900 border-[0.5px] border-neutral-300 dark:border-neutral-700 p-1.5">
                    {MOBILE_MENU_TABS.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => handleTabChange(tab)}
                        className={`w-full text-left px-2 py-1.5 text-[10px] uppercase tracking-[0.08em] transition-colors border-l ${activeTab === tab ? 'text-black dark:text-white bg-neutral-100 dark:bg-neutral-800 border-neutral-400 dark:border-neutral-500' : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 border-transparent'}`}
                      >
                        {TAB_LABEL[tab]}
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

          <div className="hidden sm:flex justify-between items-center h-11">
            <button
              type="button"
              className="bg-transparent p-0 cursor-pointer hover:opacity-60 transition-opacity text-neutral-900 dark:text-neutral-100 leading-none flex items-center"
              onClick={() => handleTabChange('HOME')}
            >
              Myrick Wang
            </button>
            <nav className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap items-center gap-x-5 gap-y-2 sm:gap-x-10">
              {NAV_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`transition-all whitespace-nowrap text-[11px] uppercase tracking-[0.08em] leading-none flex items-center border-b ${activeTab === tab && !selectedArticle ? 'text-black dark:text-white border-neutral-800 dark:border-neutral-200' : 'text-neutral-500 dark:text-neutral-500 border-transparent hover:text-black dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-600'}`}
                >
                  {TAB_LABEL[tab]}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className="text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors p-1 flex items-center"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <IconSun /> : <IconMoon />}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="app-main min-h-[calc(100vh-200px)]">
        <div
          className={`transition-opacity ease-out ${isPageVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{ transitionDuration: `${PAGE_TRANSITION_MS}ms` }}
        >
          {renderArticle ? (
            <ViewArticle
              data={renderArticle}
              onBack={() => handleTabChange(activeTab)}
              backLabel={TAB_LABEL[activeTab]}
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

      <footer className="mt-16 md:mt-20 pt-6 border-t-[0.5px] border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[10px] text-neutral-500 dark:text-neutral-400 uppercase pb-8 font-medium tracking-[0.04em]">
        <div className="leading-relaxed">© {new Date().getFullYear()} MYRICK WANG <span className="mx-3 opacity-20">/</span> BRISTOL EEE</div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="bg-transparent p-0 cursor-pointer text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-neutral-200 transition-all flex items-center gap-2"
            onClick={() => {
              setActiveTab('HOME');
              setRenderTab('HOME');
              setSelectedArticle(null);
              setRenderArticle(null);
              const url = new URL(window.location.href);
              url.searchParams.delete('tab');
              window.history.replaceState({}, '', url);
              window.scrollTo({ top: 0, behavior: 'auto' });
              setIntroVisible(true);
            }}
          >
            <span>↩</span> COVER
          </button>
          <button
            type="button"
            className="bg-transparent p-0 cursor-pointer text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-neutral-200 transition-all flex items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            INDEX <span>↑</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;