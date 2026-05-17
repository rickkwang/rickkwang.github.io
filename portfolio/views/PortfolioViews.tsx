import {
  PROFILE,
  PROJECTS,
  PUBLICATIONS,
  CV_MARKDOWN,
  ZEN_POSTS,
} from '../constants';
import { Article, Project, Publication, ZenPost } from '../types';
import MarkdownContent from '../components/MarkdownContent';
import { ArticleList, ArticleRow } from '../components/ArticleList';
import PageHeader from '../components/PageHeader';
import {
  AcademicSection,
  HeroSection,
  LogisticsSection,
  ResearchSection,
} from './HomeSections';

interface ArticleProps {
  data: Article;
  onBack: () => void;
  backLabel: string;
}

export interface WorldTime {
  ldn: string;
  bjs: string;
}

export const ViewArticle = ({ data, onBack, backLabel }: ArticleProps) => {
  const figure = 'figure' in data ? data.figure : undefined;
  return (
    <div className="page-fade-in pb-32">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-3 text-[10px] text-neutral-400 hover:text-black dark:text-neutral-500 dark:hover:text-neutral-100 uppercase font-medium transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to {backLabel}</span>
          </button>
        </div>
        {figure && (
          <figure className="mb-12 md:mb-16 mx-auto max-w-3xl">
            <div className="thin-border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
              <img src={figure.src} alt={figure.label} className="block w-full h-auto" />
            </div>
            <figcaption className="mt-3 flex items-baseline gap-3 text-[10px] mono uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-500">
              <span>{figure.id}</span>
              <span className="opacity-30">/</span>
              <span>{figure.label}</span>
            </figcaption>
          </figure>
        )}
        <div className="bg-transparent p-0 md:px-8 shadow-none">
          <MarkdownContent content={data.content} />
        </div>
      </div>
    </div>
  );
};

export const ViewHome = ({ time }: { time: WorldTime }) => (
  <div className="page-fade-in space-y-8 md:space-y-10">
    <HeroSection time={time} />
    <ResearchSection />
    <AcademicSection />
    <LogisticsSection />
  </div>
);

export const ViewCV = () => (
  <div className="page-fade-in pb-32">
    <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-medium text-neutral-900 dark:text-neutral-100">{PROFILE.name}</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 uppercase">{PROFILE.title}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-neutral-500 dark:text-neutral-400">
          <span>{PROFILE.email}</span>
          <span>{PROFILE.phone}</span>
          <span>{PROFILE.location}</span>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 text-[10px] font-medium text-neutral-400 hover:text-black dark:text-neutral-500 dark:hover:text-neutral-200 uppercase transition-colors pt-4"
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

export const ViewProjects = ({ onSelect }: { onSelect: (project: Project) => void }) => (
  <ArticleList title="Projects" subtitle="Engineering Artifacts & Findings">
    {PROJECTS.map((project) => (
      <ArticleRow key={project.id} onClick={() => onSelect(project)} title={project.title} meta={project.year}>
        <div className="flex flex-wrap gap-2.5">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 text-[9px] mono border-[0.5px] border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 uppercase">{t}</span>
          ))}
        </div>
        <p className="text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-3xl">{project.description}</p>
      </ArticleRow>
    ))}
  </ArticleList>
);

export const ViewPublications = ({ onSelect }: { onSelect: (pub: Publication) => void }) => (
  <ArticleList title="Publications" subtitle="Scholarly Contributions">
    {PUBLICATIONS.map((pub) => (
      <ArticleRow key={pub.id} onClick={() => onSelect(pub)} title={pub.title} meta={pub.year}>
        <div className="space-y-2">
          <p className="text-[12px] text-neutral-700 dark:text-neutral-300 uppercase font-medium">{pub.authors}</p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <p className="text-[12px] text-neutral-700 dark:text-neutral-300 italic">{pub.venue}</p>
            <span className="px-2 py-0.5 text-[8px] mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-500 border-[0.5px] border-neutral-200 dark:border-neutral-700 uppercase">{pub.status}</span>
          </div>
        </div>
      </ArticleRow>
    ))}
  </ArticleList>
);

export const ViewZenList = ({ onSelect }: { onSelect: (post: ZenPost) => void }) => (
  <div className="page-fade-in pb-32">
    <div className="max-w-5xl mx-auto">
      <PageHeader title="Zen Land" subtitle="Reflections on Logic" />
      <div className="space-y-0">
        {ZEN_POSTS.map((post) => (
          <ArticleRow key={post.id} variant="essay" onClick={() => onSelect(post)} title={post.title} meta={post.date}>
            <p className="newsreader italic text-[16px] leading-[1.75] text-neutral-600 dark:text-neutral-400 max-w-[58ch]">
              {post.description}
            </p>
          </ArticleRow>
        ))}
      </div>
    </div>
  </div>
);
