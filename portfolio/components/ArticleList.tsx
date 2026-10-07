import { ReactNode } from 'react';
import PageHeader from './PageHeader';

interface ArticleListProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const ArticleList = ({ title, subtitle, children }: ArticleListProps) => (
  <div className="page-fade-in pb-32">
    <div className="max-w-4xl">
      <PageHeader title={title} subtitle={subtitle} />
      <div className="stagger dim-siblings">{children}</div>
    </div>
  </div>
);

interface ArticleRowProps {
  onClick: () => void;
  title: string;
  meta: string;
  variant?: 'index' | 'essay';
  children: ReactNode;
}

export const ArticleRow = ({ onClick, title, meta, variant = 'index', children }: ArticleRowProps) => {
  const isEssay = variant === 'essay';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`article-row w-full text-left bg-transparent cursor-pointer border-t-[0.5px] border-stone-200 dark:border-stone-700 flex flex-col gap-2 group ${isEssay ? 'py-6 md:py-7' : 'py-6 md:py-7'}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 sm:gap-4">
        <h3
          className={
            isEssay
              ? 'serif text-[15px] sm:text-[16px] font-normal tracking-tight-titles text-stone-900 dark:text-stone-100 leading-[1.2] text-left'
              : 'text-[15px] sm:text-[16px] font-normal tracking-tight-titles text-stone-900 dark:text-stone-100 leading-tight text-left'
          }
        >
          <span className="row-title">{title}</span>
          <span className="row-arrow" aria-hidden="true">→</span>
        </h3>
        <span
          className={
            'row-meta ' + (isEssay
              ? 'serif text-[11px] sm:text-[12px] tracking-[0.04em] text-stone-500 dark:text-stone-500 whitespace-nowrap'
              : 'text-[11px] sm:text-[12px] mono text-stone-500 dark:text-stone-500 font-medium whitespace-nowrap')
          }
        >
          {meta}
        </span>
      </div>
      {children}
    </button>
  );
};
