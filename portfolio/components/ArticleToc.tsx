import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { slugify } from './MarkdownContent';

const stripMarkup = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '');

const ArticleToc = ({ content }: { content: string }) => {
  const sections = useMemo(
    () =>
      content
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.startsWith('## '))
        .map((line) => {
          const raw = line.replace('## ', '');
          return { id: slugify(raw), label: stripMarkup(raw) };
        }),
    [content],
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      let current: string | null = null;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.3) current = id;
      }
      setActiveId(current ?? sections[0]?.id ?? null);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [sections]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      // Only while the TREE is on screen (xl); otherwise arrows keep their normal scrolling
      if (!window.matchMedia('(min-width: 1280px)').matches) return;
      const index = sections.findIndex((s) => s.id === activeId);
      const next = event.key === 'ArrowDown' ? index + 1 : index - 1;
      if (next < 0 || next >= sections.length) return;
      event.preventDefault();
      document.getElementById(sections[next].id)?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [sections, activeId]);

  if (sections.length < 2) return null;

  const pct = Math.round(progress * 100);

  // Portalled to <body>: the page's fade-in transform would otherwise trap position: fixed
  return createPortal(
    <aside className="toc hidden xl:block fixed top-14 right-12 w-[130px] pt-[5px]">
      <div className="mono text-[11px] text-stone-500 dark:text-stone-500">
        <div className="uppercase tracking-[0.08em] mb-4">Tree</div>
        <ul className="space-y-2">
          {sections.map(({ id, label }) => {
            const active = id === activeId;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`toc-link flex gap-2.5 leading-snug ${active ? 'is-active text-stone-900 dark:text-stone-100' : 'hover:text-stone-900 dark:hover:text-stone-100'}`}
                >
                  <span className={active ? 'text-stone-900 dark:text-stone-100' : 'text-stone-300 dark:text-stone-600'} aria-hidden="true">└</span>
                  <span className="toc-label">{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex items-center gap-3">
          <div className="toc-meter flex-1" aria-hidden="true">
            <div className="toc-meter-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="tabular-nums w-8 text-right">{pct}%</span>
        </div>
        <div className="mt-4 uppercase tracking-[0.08em] text-stone-400 dark:text-stone-600">↑ / ↓ to jump</div>
      </div>
    </aside>,
    document.body,
  );
};

export default ArticleToc;
