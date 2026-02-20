import React, { useState, useEffect } from 'react';
import { PROFILE, NEWS, FOCUS_AREAS, PROJECTS, PUBLICATIONS, PROFICIENCY, EDUCATION, EXPERIENCES, CV_MARKDOWN, ZEN_POSTS } from './constants';
import { Project, Publication, ZenPost } from './types';

type Tab = 'HOME' | 'CV' | 'PROJECTS' | 'PUBLICATIONS' | 'ZEN';
type Article = Project | Publication | ZenPost;
const NAV_TABS: Tab[] = ['CV', 'PROJECTS', 'PUBLICATIONS', 'ZEN'];

// --- Monochromatic Icon Components ---
const IconUser = () => (
  <svg className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const IconSchool = () => (
  <svg className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);
const IconLocation = () => (
  <svg className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IconMail = () => (
  <svg className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
const IconClock = () => (
  <svg className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const IconGitHub = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
);
const IconLinkedIn = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);
const IconScholar = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/><path d="M12 22v-6"/></svg>
);
const IconX = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.464-2.464l6.768-6.768"/></svg>
);
const IconSun = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
);
const IconMoon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
);

// --- Markdown Parser Component ---
const MarkdownContent = ({ content }: { content: string }) => {
  // Parsing helpers
  const parseLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(parseBold(text.slice(lastIndex, match.index)));
      }
      parts.push(
        <a 
          key={match.index} 
          href={match[2]} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-neutral-900 dark:text-neutral-200 border-b border-neutral-300 dark:border-neutral-600 hover:border-black dark:hover:border-white transition-colors"
        >
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(parseBold(text.slice(lastIndex)));
    }
    return parts.length > 0 ? parts : parseBold(text);
  };

  const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-medium text-neutral-900 dark:text-neutral-100">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const parseLine = (line: string) => {
    return parseLinks(line);
  };

  const codeBlockStyle = "font-mono text-[13px] bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-4 block w-full whitespace-pre overflow-x-auto my-6 text-neutral-700 dark:text-neutral-300";
  const blockQuoteStyle = "border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 italic text-neutral-500 dark:text-neutral-400 my-6";

  return (
    <div className="prose max-w-none text-neutral-600 dark:text-neutral-400 leading-7">
      {content.split('\n').map((line, i) => {
        const trimmed = line.trim();
        if (trimmed === '') return <div key={i} className="h-3" />;
        if (trimmed === '---') return <hr key={i} className="border-neutral-100 dark:border-neutral-800 my-8" />;
        
        // Headers
        if (trimmed.startsWith('# ')) {
          return (
             <h1 key={i} className="text-[32px] font-medium text-neutral-900 dark:text-neutral-100 mt-0 mb-10 text-center">
               {parseLine(trimmed.replace('# ', ''))}
             </h1>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={i} className="text-[11px] uppercase font-medium text-neutral-400 dark:text-neutral-500 mt-12 mb-6 pb-2 border-b border-neutral-100 dark:border-neutral-800">
              {parseLine(trimmed.replace('## ', ''))}
            </h2>
          );
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={i} className="text-[16px] font-medium text-neutral-900 dark:text-neutral-200 mt-6 mb-2">
              {parseLine(trimmed.replace('### ', ''))}
            </h3>
          );
        }
        
        // Blockquotes
        if (trimmed.startsWith('> ')) {
          return <div key={i} className={blockQuoteStyle}>{parseLine(trimmed.replace('> ', ''))}</div>;
        }
        
        // Lists
        if (/^\s*-\s+/.test(line)) {
          const listContent = line.replace(/^\s*-\s+/, '');
          return (
            <div key={i} className="flex items-start gap-3 ml-1 mb-2">
              <span className="mt-2.5 w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600 flex-shrink-0"></span>
              <div className="text-[15px] leading-relaxed">{parseLine(listContent)}</div>
            </div>
          );
        }

        // Code
        if (trimmed.startsWith('```')) return null;
        if (line.startsWith('    ') || line.startsWith('\t')) {
          return <div key={i} className={codeBlockStyle}>{line}</div>;
        }
        
        // Paragraphs
        return <p key={i} className="text-[15px] leading-relaxed mb-3">{parseLine(trimmed)}</p>;
      })}
    </div>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="w-full md:w-[160px] flex-shrink-0 pt-1">
    <h3 className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500 uppercase leading-none mb-4 md:mb-0">{title}</h3>
  </div>
);

// Improved PageHeader Component - Left aligned, large typography
const PageHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="flex flex-col items-start mb-16 space-y-2">
    <h1 className="text-4xl md:text-5xl font-medium text-neutral-900 dark:text-neutral-100">{title}</h1>
    {subtitle && <p className="text-lg text-neutral-500 dark:text-neutral-400 font-light max-w-2xl leading-relaxed">{subtitle}</p>}
  </div>
);

// --- VIEW COMPONENTS (Unified Grid System) ---

interface ArticleProps {
  data: Article;
  onBack: () => void;
  backLabel: string;
}

const ViewArticle: React.FC<ArticleProps> = ({ data, onBack, backLabel }) => {
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

const ViewHome = ({ time }: { time: { ldn: string, bjs: string } }) => (
  <div className="page-fade-in space-y-20">
    {/* Profile Header */}
    <section className="flex flex-col md:flex-row gap-12 md:gap-24 lg:gap-32">
      <div className="w-full md:w-[160px] flex-shrink-0 space-y-6">
        <div className="w-32 h-32 thin-border bg-white dark:bg-neutral-900 overflow-hidden shadow-sm border-neutral-200 dark:border-neutral-800">
          <img 
            src={PROFILE.avatar} 
            className="w-full h-full object-cover opacity-100 transition-all duration-500" 
            alt="Avatar" 
          />
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3.5 text-[11px] font-normal text-neutral-500 dark:text-neutral-400 leading-none">
            <div className="flex items-center gap-2.5">
               <IconUser />
               <span className="uppercase whitespace-nowrap text-neutral-600 dark:text-neutral-300 font-medium">{PROFILE.name}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <IconSchool />
              <span className="whitespace-nowrap">University of Bristol</span>
            </div>
            <div className="flex items-center gap-2.5">
              <IconLocation />
              <span className="whitespace-nowrap">{PROFILE.location}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <IconClock />
              <div className="uppercase flex items-center whitespace-nowrap mono">
                <span>LDN {time.ldn}</span>
                <span className="mx-1.5 opacity-30">•</span>
                <span>BJS {time.bjs}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 text-neutral-400 dark:text-neutral-600">
            <a href={`https://${PROFILE.socials.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-neutral-200 transition-all transform hover:-translate-y-0.5" title="GitHub"><IconGitHub /></a>
            <a href={`https://${PROFILE.socials.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-neutral-200 transition-all transform hover:-translate-y-0.5" title="LinkedIn"><IconLinkedIn /></a>
            <a href={`https://${PROFILE.socials.scholar}`} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-neutral-200 transition-all transform hover:-translate-y-0.5" title="Google Scholar"><IconScholar /></a>
            <a href={`https://${PROFILE.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-neutral-200 transition-all transform hover:-translate-y-0.5" title="X (Twitter)"><IconX /></a>
            <a href={`mailto:${PROFILE.email}`} className="hover:text-black dark:hover:text-neutral-200 transition-all transform hover:-translate-y-0.5" title="Email"><IconMail /></a>
          </div>
        </div>
      </div>

      <div className="flex-grow space-y-12">
        <div className="space-y-6">
          <h2 className="text-[21px] md:text-[24px] font-medium tracking-tight-titles text-neutral-900 dark:text-neutral-100 leading-tight">
            Electrical & Electronic Engineering <span className="text-neutral-200 dark:text-neutral-700 mx-1.5 font-light">/</span> <span className="text-neutral-400 dark:text-neutral-500">University of Bristol</span>
          </h2>
          <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 font-normal max-w-3xl">
            {PROFILE.bio}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <h4 className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500 uppercase">Intelligence</h4>
            <div className="h-[0.5px] bg-neutral-100 dark:bg-neutral-800 flex-grow"></div>
          </div>
          <div className="space-y-4">
            {NEWS.slice(0, 4).map((item, i) => (
              <div key={i} className="flex space-x-8 items-start group">
                <span className="text-[10px] text-neutral-300 dark:text-neutral-600 w-16 flex-shrink-0 pt-1 mono font-medium uppercase">{item.date}</span>
                <p className="text-[14px] leading-relaxed flex-grow text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-neutral-200 transition-colors max-w-3xl">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Research / Focus Areas */}
    <section className="pt-12 border-t-[0.5px] border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row gap-4 md:gap-24 lg:gap-32">
      <SectionHeader title="Research" />
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
        {FOCUS_AREAS.map((area, i) => (
          <div key={i} className="flex items-baseline space-x-4">
            <span className="text-[11px] text-neutral-300 dark:text-neutral-600 mono font-medium">{(i + 1).toString().padStart(2, '0')}</span>
            <span className="text-[16px] font-normal text-neutral-900 dark:text-neutral-200">{area}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Academic Section */}
    <section className="pt-12 border-t-[0.5px] border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row gap-4 md:gap-24 lg:gap-32">
      <SectionHeader title="Academic" />
      <div className="flex-grow">
         <div className="space-y-8">
            {EDUCATION.map((edu, i) => (
              <div key={i} className="group">
                 <div className="flex flex-col sm:flex-row justify-between items-baseline gap-1 mb-2">
                    <h3 className="text-[16px] font-medium text-neutral-900 dark:text-neutral-200">{edu.institution}</h3>
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mono uppercase">{edu.period}</span>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed">{edu.degree}</p>
                    {edu.details && (
                        <p className="text-[13px] text-neutral-400 dark:text-neutral-500 leading-relaxed max-w-3xl">{edu.details}</p>
                    )}
                 </div>
              </div>
            ))}
            
            {EXPERIENCES.length > 0 && (
              <>
                <div className="h-[0.5px] w-full bg-neutral-100 dark:bg-neutral-800 my-8"></div>
                {EXPERIENCES.map((exp, i) => (
                  <div key={i} className="space-y-4">
                     <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2">
                        <p className="text-[18px] font-normal text-neutral-900 dark:text-neutral-200">{exp.company}</p>
                        <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mono uppercase">{exp.period}</span>
                     </div>
                     <p className="text-[15px] text-neutral-500 dark:text-neutral-400 font-normal">{exp.role}</p>
                     <ul className="space-y-2">
                        {exp.description.map((desc, j) => (
                          <li key={j} className="text-[14px] text-neutral-400 dark:text-neutral-500 flex items-start gap-4">
                             <span className="mt-2.5 w-1.5 h-[0.5px] bg-neutral-300 dark:bg-neutral-600 flex-shrink-0"></span>
                             <span className="leading-relaxed max-w-3xl">{desc}</span>
                          </li>
                        ))}
                     </ul>
                  </div>
                ))}
              </>
            )}
         </div>
      </div>
    </section>

    {/* Logistics / Proficiency - Optimized for Alignment */}
    <section className="pt-12 border-t-[0.5px] border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row gap-4 md:gap-24 lg:gap-32">
      <SectionHeader title="Logistics" />
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
        {PROFICIENCY.map((group, i) => (
          <div key={i} className="space-y-6">
            <h4 className="text-[10px] font-medium text-neutral-300 dark:text-neutral-600 uppercase border-b-[0.5px] border-neutral-100 dark:border-neutral-800 pb-2 mb-6">
              {group.category}
            </h4>
            <div className="space-y-5">
              {group.skills.map((skill, j) => (
                <div key={j} className="space-y-0.5">
                  <p className="text-[14px] font-normal text-neutral-900 dark:text-neutral-200">{skill.name}</p>
                  <p className="text-[13px] leading-normal text-neutral-500 dark:text-neutral-400 max-w-xs">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const ViewCV = () => (
  <div className="page-fade-in pb-32">
    <div className="max-w-4xl mx-auto space-y-12">
      
      {/* Unified Header */}
      <div className="text-center space-y-6">
         {/* Title */}
         <div className="space-y-2">
            <h1 className="text-3xl font-medium text-neutral-900 dark:text-neutral-100">{PROFILE.name}</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 uppercase">{PROFILE.title}</p>
         </div>

         {/* Contact Info Row */}
         <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-neutral-500 dark:text-neutral-400 font-mono">
            <span>{PROFILE.email}</span>
            <span>{PROFILE.phone}</span>
            <span>{PROFILE.location}</span>
         </div>

         {/* Print Action */}
         <button 
           onClick={() => window.print()} 
           className="inline-flex items-center gap-2 text-[10px] font-medium text-neutral-400 hover:text-black dark:text-neutral-500 dark:hover:text-neutral-200 uppercase transition-colors pt-4"
         >
           <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
           Download / Print PDF
         </button>
      </div>

      {/* Main Content (Education, Experience etc) */}
      <div className="bg-transparent p-0 md:px-8 shadow-none">
         <MarkdownContent content={CV_MARKDOWN} />
      </div>
    </div>
  </div>
);

const ViewProjects = ({ onSelect }: { onSelect: (project: Project) => void }) => (
  <div className="page-fade-in pb-32">
    <div className="max-w-5xl mx-auto">
      <PageHeader title="Projects" subtitle="Engineering Artifacts & Findings" />
      <div className="space-y-0">
        {PROJECTS.map((project) => (
          <button
            type="button"
            key={project.id} 
            onClick={() => onSelect(project)}
            className="w-full text-left bg-transparent cursor-pointer py-10 border-t-[0.5px] border-neutral-200 dark:border-neutral-800 flex flex-col gap-4 group transition-colors hover:opacity-70"
          >
            <div className="flex justify-between items-baseline gap-4">
              <h3 className="text-[21px] font-normal tracking-tight-titles text-neutral-900 dark:text-neutral-100 leading-tight text-left">
                {project.title}
              </h3>
              <span className="text-[12px] mono text-neutral-300 dark:text-neutral-600 font-medium whitespace-nowrap">{project.year}</span>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {project.tech.map(t => (
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

const ViewPublications = ({ onSelect }: { onSelect: (pub: Publication) => void }) => (
  <div className="page-fade-in pb-32">
    <div className="max-w-5xl mx-auto">
      <PageHeader title="Publications" subtitle="Scholarly Contributions" />
      <div className="space-y-0">
        {PUBLICATIONS.map((pub) => (
          <button
            type="button"
            key={pub.id}
            onClick={() => onSelect(pub)}
            className="w-full text-left bg-transparent cursor-pointer py-10 border-t-[0.5px] border-neutral-200 dark:border-neutral-800 flex flex-col gap-4 group transition-colors hover:opacity-70"
          >
            <div className="flex justify-between items-baseline gap-4">
              <h3 className="text-[21px] font-normal tracking-tight-titles text-neutral-900 dark:text-neutral-100 leading-tight text-left">
                {pub.title}
              </h3>
              <span className="text-[12px] mono text-neutral-300 dark:text-neutral-600 font-medium whitespace-nowrap">{pub.year}</span>
            </div>
            
            <div className="space-y-2">
              <p className="text-[12px] text-neutral-500 dark:text-neutral-400 uppercase font-medium">{pub.authors}</p>
              <div className="flex items-center gap-4">
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

const ViewZenList = ({ onSelect }: { onSelect: (post: ZenPost) => void }) => (
  <div className="page-fade-in pb-32">
    <div className="max-w-5xl mx-auto">
      <PageHeader title="Zen Land" subtitle="Reflections on Logic" />
      <div className="space-y-0">
        {ZEN_POSTS.map((post) => (
          <button
            type="button"
            key={post.id} 
            onClick={() => onSelect(post)}
            className="w-full text-left bg-transparent cursor-pointer py-10 border-t-[0.5px] border-neutral-200 dark:border-neutral-800 flex flex-col gap-4 group transition-colors hover:opacity-70"
          >
            <div className="flex justify-between items-baseline gap-4">
               <h3 className="text-[21px] font-normal tracking-tight-titles text-neutral-900 dark:text-neutral-100 leading-tight text-left">
                 {post.title}
               </h3>
               <span className="text-[12px] mono text-neutral-300 dark:text-neutral-600 font-medium whitespace-nowrap">{post.date}</span>
            </div>
            <p className="text-[14px] text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-3xl">{post.description}</p>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('HOME');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [time, setTime] = useState({ ldn: '', bjs: '' });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const getTabFromUrl = (): Tab => {
    const query = new URLSearchParams(window.location.search).get('tab');
    const normalized = query?.toUpperCase();
    return (normalized && NAV_TABS.includes(normalized as Tab)) ? (normalized as Tab) : 'HOME';
  };

  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getTabFromUrl());
      setSelectedArticle(null);
    };
    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
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
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        ldn: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false }),
        bjs: now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', hour12: false }),
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    // Update URL Query Parameter
    const url = new URL(window.location.href);
    if (tab === 'HOME') {
      url.searchParams.delete('tab');
    } else {
      url.searchParams.set('tab', tab);
    }
    window.history.pushState({}, '', url);
  };

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen max-w-[1400px] mx-auto px-6 md:px-12 dark:text-neutral-200">
      <header>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center h-16 uppercase font-medium text-[11px]">
          <button
            type="button"
            className="bg-transparent p-0 cursor-pointer hover:opacity-50 transition-opacity text-neutral-900 dark:text-neutral-100"
            onClick={() => handleTabChange('HOME')}
          >
            Myrick Wang
          </button>
          <nav className="flex items-center space-x-10">
            {NAV_TABS.map((tab) => (
              <button 
                key={tab} 
                onClick={() => handleTabChange(tab)} 
                className={`transition-all ${activeTab === tab && !selectedArticle ? 'text-black dark:text-white underline underline-offset-8 decoration-[0.5px]' : 'text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white'}`}
              >
                {tab === 'ZEN' ? 'ZEN LAND' : tab}
              </button>
            ))}
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors p-1"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>
          </nav>
        </div>
      </header>

      <main className="pt-32 min-h-[calc(100vh-200px)]">
        {selectedArticle ? (
          <ViewArticle 
            data={selectedArticle} 
            onBack={() => setSelectedArticle(null)} 
            backLabel={activeTab === 'ZEN' ? 'ZEN LAND' : activeTab}
          />
        ) : (
          <>
            {activeTab === 'HOME' && <ViewHome time={time} />}
            {activeTab === 'CV' && <ViewCV />}
            {activeTab === 'PROJECTS' && <ViewProjects onSelect={handleArticleSelect} />}
            {activeTab === 'PUBLICATIONS' && <ViewPublications onSelect={handleArticleSelect} />}
            {activeTab === 'ZEN' && <ViewZenList onSelect={handleArticleSelect} />}
          </>
        )}
      </main>
      
      <footer className="mt-20 pt-6 border-t-[0.5px] border-neutral-200 dark:border-neutral-800 flex justify-between items-center text-[9px] text-neutral-300 dark:text-neutral-600 uppercase pb-8 font-medium">
        <div>© {new Date().getFullYear()} MYRICK WANG <span className="mx-4 opacity-20">/</span> BRISTOL EEE</div>
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
