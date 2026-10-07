import {
  PROFILE,
  PROJECTS,
  PUBLICATIONS,
  CV_MARKDOWN,
  ZEN_POSTS,
  WORKS,
  SOCIAL_LINKS,
} from '../constants';
import { useState } from 'react';
import { Article, Project, Publication, Work, ZenPost } from '../types';
import MarkdownContent from '../components/MarkdownContent';
import { ArticleList, ArticleRow } from '../components/ArticleList';
import PageHeader from '../components/PageHeader';
import ArticleToc, { hasToc } from '../components/ArticleToc';
import WorkIndex from '../components/WorkIndex';
import { HOME_COLUMN, useContentColumn } from '../lib/useContentColumn';
import TypedText from '../components/TypedText';
import Ticker from '../components/Ticker';

interface ArticleProps {
  data: Article;
  onBack: () => void;
  backLabel: string;
  onSelect: (article: Article) => void;
}

// The list an article belongs to, for previous / next navigation
const siblingsOf = (data: Article): Article[] => {
  if ('kind' in data) return WORKS;
  if ('date' in data) return ZEN_POSTS;
  return [...PROJECTS, ...PUBLICATIONS];
};

export interface WorldTime {
  ldn: string;
  bjs: string;
}

export const ViewArticle = ({ data, onBack, backLabel, onSelect }: ArticleProps) => {
  const figure = 'figure' in data
    ? data.figure
    : 'cover' in data && data.cover
      ? { id: data.kind, label: data.year, src: data.cover }
      : undefined;
  const links = 'kind' in data
    ? [
        data.url && { label: 'Visit', href: data.url },
        data.github && { label: 'Source', href: data.github },
      ].filter((link): link is { label: string; href: string } => Boolean(link))
    : [];
  const isZen = 'date' in data;
  const siblings = siblingsOf(data);
  const index = siblings.findIndex((item) => item.id === data.id);
  const prev = index > 0 ? siblings[index - 1] : undefined;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined;
  const { wrapperRef, columnStyle } = useContentColumn({ reserveToc: hasToc(data.content) });
  return (
    <div ref={wrapperRef} className={`page-fade-in pb-32 ${isZen ? 'zen' : ''}`}>
      <div className="max-w-4xl min-w-0" style={columnStyle}>
        <div className="mb-12 text-center">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-3 text-[10px] text-stone-400 hover:text-black dark:text-stone-500 dark:hover:text-stone-100 uppercase font-medium transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to {backLabel}</span>
          </button>
        </div>
        {figure && (
          <figure className="mb-12 md:mb-16 mx-auto max-w-3xl">
            <img
              src={figure.src}
              alt={figure.label}
              className="block w-full h-auto"
              onError={(event) => { (event.currentTarget.closest('figure') as HTMLElement).style.display = 'none'; }}
            />
            <figcaption className="mt-3 flex items-baseline gap-3 text-[10px] mono uppercase tracking-[0.08em] text-stone-500 dark:text-stone-500">
              <span>{figure.id}</span>
              <span className="opacity-30">/</span>
              <span>{figure.label}</span>
            </figcaption>
          </figure>
        )}
        <div className={columnStyle ? '' : 'md:px-8'}>
          <MarkdownContent content={data.content} />
        </div>
        {links.length > 0 && (
          <div className={`mt-12 flex gap-6 mono ${columnStyle ? '' : 'md:px-8'} text-[11px] uppercase tracking-[0.08em]`}>
            {links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="link-draw text-stone-900 dark:text-stone-100">
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
        {(prev || next) && (
          <nav className={`prevnext mt-16 grid grid-cols-2 gap-8 border-t-[0.5px] border-stone-200 dark:border-stone-700 ${columnStyle ? '' : 'md:mx-8'}`} aria-label="More">
            {[{ item: prev, label: '← Previous', align: 'text-left [--nudge:-3px]' }, { item: next, label: 'Next →', align: 'text-right [--nudge:3px]' }].map(({ item, label, align }) =>
              item ? (
                <button key={label} type="button" onClick={() => onSelect(item)} className={`${align} py-5 px-3 -mx-3`}>
                  <span className="prevnext-label block mono text-[10px] uppercase tracking-[0.08em] text-stone-400 dark:text-stone-500">{label}</span>
                  <span className="block mt-1.5 text-[14px] leading-snug text-stone-900 dark:text-stone-100 line-clamp-2 [text-wrap:balance]"><span className="prevnext-title">{item.title}</span></span>
                </button>
              ) : (
                <span key={label} />
              ),
            )}
          </nav>
        )}
      </div>
      <ArticleToc content={data.content} />
    </div>
  );
};

// Picked once per page load: a fresh greeting on every visit, stable while browsing
const INTRO = PROFILE.intros[Math.floor(Math.random() * PROFILE.intros.length)];

const SectionLabel = ({ children, action }: { children: string; action?: { label: string; onClick: () => void } }) => (
  <div className="flex items-baseline justify-between mb-4">
    <h2 className="mono text-[11px] font-medium text-stone-600 dark:text-stone-300 uppercase tracking-[0.06em]">{children}</h2>
    {action && (
      <button type="button" onClick={action.onClick} className="link-draw mono text-[10px] uppercase tracking-[0.08em] text-stone-500 dark:text-stone-400">
        {action.label} →
      </button>
    )}
  </div>
);

const WritingIndex = ({ posts, onSelect }: { posts: ZenPost[]; onSelect: (post: ZenPost) => void }) => (
  <div className="work-index">
    {posts.map((post) => (
      <button key={post.id} type="button" className="work-row writing-row mono" onClick={() => onSelect(post)}>
        <span className="w-year">{post.date}</span>
        <span className="w-title"><span className="w-name">{post.title}</span></span>
        <span className="w-arrow" aria-hidden="true">→</span>
      </button>
    ))}
  </div>
);

interface HomeProps {
  time: WorldTime;
  onSelect: (article: Article) => void;
  onNavigate: (tab: 'WORK' | 'ACADEMIC' | 'CV' | 'ZEN') => void;
}

export const ViewHome = ({ time, onSelect, onNavigate }: HomeProps) => {
  const { wrapperRef, columnStyle } = useContentColumn(HOME_COLUMN);
  return (
  <div ref={wrapperRef}>
  <div className="stagger max-w-4xl space-y-12 md:space-y-14 pb-16" style={columnStyle}>
    <section className="space-y-4">
      <p className="text-[19px] md:text-[23px] font-medium tracking-tight-titles leading-snug text-stone-950 dark:text-stone-100">
        <TypedText text={INTRO} />
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mono text-[11px] uppercase tracking-[0.06em] text-stone-500 dark:text-stone-400">
        <span>{PROFILE.location}</span>
        <span>LDN {time.ldn} <span className="opacity-40 mx-1">/</span> BJS {time.bjs}</span>
      </div>
      <div className="dim-siblings flex flex-wrap gap-x-6 gap-y-2 mono text-[11px] uppercase tracking-[0.08em]">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="link-draw text-stone-900 dark:text-stone-100"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </section>

    <Ticker items={PROFILE.ticker} />

    <section>
      <SectionLabel>About</SectionLabel>
      <div className="space-y-3 text-[14px] leading-relaxed text-stone-800 dark:text-stone-200">
        {PROFILE.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-4 mono text-[11px] text-stone-800 dark:text-stone-200">
        <span className="text-stone-400 dark:text-stone-500 uppercase tracking-[0.06em] mr-3">Usually with</span>
        {PROFILE.stack.join(' · ')}
      </p>
    </section>

    <section>
      <SectionLabel action={{ label: 'All work', onClick: () => onNavigate('WORK') }}>Selected Work</SectionLabel>
      <WorkIndex works={WORKS} onSelect={onSelect} />
    </section>

    <section className="text-[14px] leading-relaxed text-stone-600 dark:text-stone-400">
      Also studying Electrical &amp; Electronic Engineering at the University of Bristol —{' '}
      <button type="button" onClick={() => onNavigate('ACADEMIC')} className="link-draw text-stone-900 dark:text-stone-100">academic work</button>
      {' '}and{' '}
      <span className="whitespace-nowrap"><button type="button" onClick={() => onNavigate('CV')} className="link-draw text-stone-900 dark:text-stone-100">CV</button>.</span>
    </section>

    <section>
      <SectionLabel action={{ label: 'Enter', onClick: () => onNavigate('ZEN') }}>Zen Garden</SectionLabel>
      <WritingIndex posts={ZEN_POSTS.slice(0, 3)} onSelect={onSelect} />
    </section>
  </div>
  </div>
  );
};

export const ViewWork = ({ onSelect }: { onSelect: (work: Work) => void }) => (
  <div className="page-fade-in pb-32 max-w-4xl">
    <PageHeader title="Work" subtitle="Apps and tools I've designed and built" />
    <WorkIndex works={WORKS} onSelect={onSelect} />
  </div>
);

export const ViewCV = () => (
  <div className="page-fade-in pb-32">
    <div className="stagger max-w-4xl space-y-10 md:space-y-12">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100">{PROFILE.name}</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 uppercase">{PROFILE.title}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-stone-500 dark:text-stone-400">
          <span>{PROFILE.email}</span>
          <span>{PROFILE.phone}</span>
          <span>{PROFILE.location}</span>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 text-[10px] font-medium text-stone-400 hover:text-black dark:text-stone-500 dark:hover:text-stone-200 uppercase transition-colors pt-4"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Download / Print PDF
        </button>
      </div>

      <div className="bg-transparent p-0 md:px-8 shadow-none">
        <MarkdownContent content={CV_MARKDOWN} />
      </div>
    </div>
  </div>
);

export const ViewAcademic = ({ onSelect }: { onSelect: (article: Project | Publication) => void }) => (
  <ArticleList title="Academic" subtitle="Coursework projects and publications from Electrical & Electronic Engineering at Bristol">
    {PROJECTS.map((project) => (
      <ArticleRow key={project.id} onClick={() => onSelect(project)} title={project.title} meta={project.year}>
        <div className="flex flex-wrap gap-2.5">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 text-[9px] mono border-[0.5px] border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 uppercase">{t}</span>
          ))}
        </div>
        <p className="text-[13.5px] leading-relaxed text-stone-700 dark:text-stone-300 max-w-3xl">{project.description}</p>
      </ArticleRow>
    ))}
    {PUBLICATIONS.map((pub) => (
      <ArticleRow key={pub.id} onClick={() => onSelect(pub)} title={pub.title} meta={pub.year}>
        <div className="space-y-2">
          <p className="text-[12px] text-stone-700 dark:text-stone-300 uppercase font-medium">{pub.authors}</p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <p className="text-[12px] text-stone-700 dark:text-stone-300 italic">{pub.venue}</p>
            <span className="px-2 py-0.5 text-[8px] mono font-medium bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-500 border-[0.5px] border-stone-200 dark:border-stone-700 uppercase">{pub.status}</span>
          </div>
        </div>
      </ArticleRow>
    ))}
  </ArticleList>
);

export const ViewZenGarden = ({ onSelect }: { onSelect: (post: ZenPost) => void }) => {
  const tags = ['All', ...Array.from(new Set(ZEN_POSTS.map((post) => post.tag)))];
  const [tag, setTag] = useState('All');
  const posts = tag === 'All' ? ZEN_POSTS : ZEN_POSTS.filter((post) => post.tag === tag);
  return (
    <div className="zen page-fade-in pb-32">
      <div className="max-w-4xl">
        <PageHeader title="Zen Garden" subtitle="Quiet thoughts, tended slowly" />
        <div className="mono flex flex-wrap gap-x-5 gap-y-2 mb-6 text-[11px] uppercase tracking-[0.08em]" role="tablist">
          {tags.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={tag === name}
              onClick={() => setTag(name)}
              className={`filter-tab mono ${tag === name ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-300'}`}
            >
              {name}
            </button>
          ))}
        </div>
        <div key={tag} className="stagger dim-siblings">
          {posts.map((post) => (
            <ArticleRow key={post.id} variant="essay" onClick={() => onSelect(post)} title={post.title} meta={post.date}>
              <p className="serif text-[13.5px] leading-[1.65] text-stone-600 dark:text-stone-400 max-w-[58ch]">
                {post.description}
              </p>
            </ArticleRow>
          ))}
        </div>
      </div>
    </div>
  );
};

