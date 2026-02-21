import {
  PROFILE,
  PROJECTS,
  PUBLICATIONS,
  CV_MARKDOWN,
  ZEN_POSTS,
} from '../constants';
import { Article, Project, Publication, ZenPost } from '../types';
import MarkdownContent from '../components/MarkdownContent';
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
        <div className="bg-transparent p-0 md:px-8 shadow-none">
          <MarkdownContent content={data.content} />
        </div>
      </div>
    </div>
  );
};

export const ViewHome = ({ time }: { time: WorldTime }) => (
  <div className="page-fade-in space-y-14 md:space-y-20">
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

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-neutral-500 dark:text-neutral-400 font-mono">
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
  <div className="page-fade-in pb-32">
    <div className="max-w-5xl mx-auto">
      <PageHeader title="Projects" subtitle="Engineering Artifacts & Findings" />
      <div className="space-y-0">
        {PROJECTS.map((project) => (
          <button
            type="button"
            key={project.id}
            onClick={() => onSelect(project)}
            className="w-full text-left bg-transparent cursor-pointer py-8 md:py-10 border-t-[0.5px] border-neutral-200 dark:border-neutral-800 flex flex-col gap-4 group transition-colors hover:opacity-70"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 sm:gap-4">
              <h3 className="text-[19px] sm:text-[21px] font-normal tracking-tight-titles text-neutral-900 dark:text-neutral-100 leading-tight text-left">
                {project.title}
              </h3>
              <span className="text-[11px] sm:text-[12px] mono text-neutral-300 dark:text-neutral-600 font-medium whitespace-nowrap">{project.year}</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {project.tech.map((t) => (
                <span key={t} className="px-2 py-0.5 text-[9px] mono border-[0.5px] border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 uppercase">{t}</span>
              ))}
            </div>

            <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-3xl">{project.description}</p>
          </button>
        ))}
      </div>
    </div>
  </div>
);

export const ViewPublications = ({ onSelect }: { onSelect: (pub: Publication) => void }) => (
  <div className="page-fade-in pb-32">
    <div className="max-w-5xl mx-auto">
      <PageHeader title="Publications" subtitle="Scholarly Contributions" />
      <div className="space-y-0">
        {PUBLICATIONS.map((pub) => (
          <button
            type="button"
            key={pub.id}
            onClick={() => onSelect(pub)}
            className="w-full text-left bg-transparent cursor-pointer py-8 md:py-10 border-t-[0.5px] border-neutral-200 dark:border-neutral-800 flex flex-col gap-4 group transition-colors hover:opacity-70"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 sm:gap-4">
              <h3 className="text-[19px] sm:text-[21px] font-normal tracking-tight-titles text-neutral-900 dark:text-neutral-100 leading-tight text-left">
                {pub.title}
              </h3>
              <span className="text-[11px] sm:text-[12px] mono text-neutral-300 dark:text-neutral-600 font-medium whitespace-nowrap">{pub.year}</span>
            </div>

            <div className="space-y-2">
              <p className="text-[12px] text-neutral-500 dark:text-neutral-400 uppercase font-medium">{pub.authors}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <p className="text-[12px] text-neutral-400 dark:text-neutral-500 italic">{pub.venue}</p>
                <span className="px-2 py-0.5 text-[8px] mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 border-[0.5px] border-neutral-200 dark:border-neutral-700 uppercase">{pub.status}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
);

export const ViewZenList = ({ onSelect }: { onSelect: (post: ZenPost) => void }) => (
  <div className="page-fade-in pb-32">
    <div className="max-w-5xl mx-auto">
      <PageHeader title="Zen Land" subtitle="Reflections on Logic" />
      <div className="space-y-0">
        {ZEN_POSTS.map((post) => (
          <button
            type="button"
            key={post.id}
            onClick={() => onSelect(post)}
            className="w-full text-left bg-transparent cursor-pointer py-8 md:py-10 border-t-[0.5px] border-neutral-200 dark:border-neutral-800 flex flex-col gap-4 group transition-colors hover:opacity-70"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 sm:gap-4">
              <h3 className="text-[19px] sm:text-[21px] font-normal tracking-tight-titles text-neutral-900 dark:text-neutral-100 leading-tight text-left">
                {post.title}
              </h3>
              <span className="text-[11px] sm:text-[12px] mono text-neutral-300 dark:text-neutral-600 font-medium whitespace-nowrap">{post.date}</span>
            </div>
            <p className="text-[14px] text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-3xl">{post.description}</p>
          </button>
        ))}
      </div>
    </div>
  </div>
);
