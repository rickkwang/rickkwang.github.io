import { ReactNode } from 'react';
import PageHeader from './PageHeader';

interface ArticleListProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const ArticleList = ({ title, subtitle, children }: ArticleListProps) => (
  <div className="page-fade-in pb-32">
    <div className="max-w-5xl mx-auto">
      <PageHeader title={title} subtitle={subtitle} />
      <div className="space-y-0">{children}</div>
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
      className={`w-full text-left bg-transparent cursor-pointer border-t-[0.5px] border-neutral-200 dark:border-neutral-700 flex flex-col gap-4 group transition-colors hover:border-neutral-500 dark:hover:border-neutral-400 ${isEssay ? 'py-12 md:py-14' : 'py-9 md:py-10'}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 sm:gap-4">
        <h3
          className={
            isEssay
              ? 'newsreader italic text-[17px] sm:text-[19px] font-normal tracking-tight-titles text-neutral-900 dark:text-neutral-100 leading-[1.2] text-left'
              : 'text-[19px] sm:text-[21px] font-normal tracking-tight-titles text-neutral-900 dark:text-neutral-100 leading-tight text-left'
          }
        >
          {title}
        </h3>
        <span
          className={
            isEssay
              ? 'newsreader italic text-[12px] sm:text-[13px] text-neutral-500 dark:text-neutral-500 whitespace-nowrap'
              : 'text-[11px] sm:text-[12px] mono text-neutral-500 dark:text-neutral-500 font-medium whitespace-nowrap'
          }
        >
          {meta}
        </span>
      </div>
      {children}
    </button>
  );
};
