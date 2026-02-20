import {
  PROFILE,
  NEWS,
  FOCUS_AREAS,
  PROFICIENCY,
  EDUCATION,
  EXPERIENCES,
} from '../constants';
import {
  IconClock,
  IconGitHub,
  IconLinkedIn,
  IconLocation,
  IconMail,
  IconScholar,
  IconSchool,
  IconUser,
  IconX,
} from '../components/Icons';
import SectionHeader from '../components/SectionHeader';

interface WorldTime {
  ldn: string;
  bjs: string;
}

const SocialLinksCompact = () => (
  <div className="mt-2.5 grid grid-cols-5 gap-2 text-neutral-400 dark:text-neutral-600 max-w-[172px]">
    <a href={`https://${PROFILE.socials.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-neutral-200 transition-all scale-[0.8] origin-left" title="GitHub"><IconGitHub /></a>
    <a href={`https://${PROFILE.socials.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-neutral-200 transition-all scale-[0.8] origin-left" title="LinkedIn"><IconLinkedIn /></a>
    <a href={`https://${PROFILE.socials.scholar}`} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-neutral-200 transition-all scale-[0.8] origin-left" title="Google Scholar"><IconScholar /></a>
    <a href={`https://${PROFILE.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-neutral-200 transition-all scale-[0.8] origin-left" title="X (Twitter)"><IconX /></a>
    <a href={`mailto:${PROFILE.email}`} className="hover:text-black dark:hover:text-neutral-200 transition-all scale-[0.8] origin-left" title="Email"><IconMail /></a>
  </div>
);

const SocialLinksDesktop = () => (
  <div className="grid grid-cols-5 gap-4 text-neutral-400 dark:text-neutral-600 max-w-[220px] mx-auto md:mx-0">
    <a href={`https://${PROFILE.socials.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-neutral-200 transition-all transform hover:-translate-y-0.5" title="GitHub"><IconGitHub /></a>
    <a href={`https://${PROFILE.socials.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-neutral-200 transition-all transform hover:-translate-y-0.5" title="LinkedIn"><IconLinkedIn /></a>
    <a href={`https://${PROFILE.socials.scholar}`} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-neutral-200 transition-all transform hover:-translate-y-0.5" title="Google Scholar"><IconScholar /></a>
    <a href={`https://${PROFILE.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-neutral-200 transition-all transform hover:-translate-y-0.5" title="X (Twitter)"><IconX /></a>
    <a href={`mailto:${PROFILE.email}`} className="hover:text-black dark:hover:text-neutral-200 transition-all transform hover:-translate-y-0.5" title="Email"><IconMail /></a>
  </div>
);

const MobileProfileBlock = ({ time }: { time: WorldTime }) => (
  <div className="md:hidden w-full border-b-[0.5px] border-dashed border-neutral-100 dark:border-neutral-800 pb-5">
    <div className="flex items-start gap-3">
      <div className="w-[27vw] max-w-[118px] min-w-[88px] thin-border bg-white dark:bg-neutral-900 shadow-sm border-neutral-200 dark:border-neutral-800 flex-shrink-0">
        <img
          src={PROFILE.avatar}
          className="block w-full h-auto object-contain opacity-100"
          alt="Avatar"
        />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <h3 className="text-[16px] leading-[1.2] font-medium text-neutral-900 dark:text-neutral-100 truncate">{PROFILE.name}</h3>
        <p className="mt-1 text-[12px] leading-[1.3] text-neutral-500 dark:text-neutral-400 truncate">University of Bristol</p>
        <SocialLinksCompact />
        <div className="mt-2.5 pt-2 border-t-[0.5px] border-dashed border-neutral-100 dark:border-neutral-800 text-[10px] text-neutral-500 dark:text-neutral-400 leading-[1.35]">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="scale-[0.75] origin-left"><IconLocation /></span>
            <span className="truncate">{PROFILE.location}</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 uppercase mono">
            <span className="scale-[0.75] origin-left"><IconClock /></span>
            <span>LDN {time.ldn}</span>
            <span className="opacity-30">/</span>
            <span>BJS {time.bjs}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DesktopProfileBlock = ({ time }: { time: WorldTime }) => (
  <div className="hidden md:block w-full md:w-[190px] flex-shrink-0 space-y-5 md:space-y-6">
    <div className="w-full max-w-[220px] md:max-w-[180px] mx-auto md:mx-0 thin-border bg-white dark:bg-neutral-900 shadow-sm border-neutral-200 dark:border-neutral-800">
      <img
        src={PROFILE.avatar}
        className="block w-full h-auto object-contain opacity-100 transition-all duration-500"
        alt="Avatar"
      />
    </div>

    <div className="space-y-6">
      <div className="space-y-3 text-[11px] font-normal text-neutral-500 dark:text-neutral-400 leading-tight">
        <div className="flex items-start gap-2.5">
          <IconUser />
          <span className="uppercase break-words text-neutral-600 dark:text-neutral-300 font-medium">{PROFILE.name}</span>
        </div>
        <div className="flex items-start gap-2.5">
          <IconSchool />
          <span className="break-words">University of Bristol</span>
        </div>
        <div className="flex items-start gap-2.5">
          <IconLocation />
          <span className="break-words">{PROFILE.location}</span>
        </div>
        <div className="flex items-start gap-2.5">
          <IconClock />
          <div className="uppercase flex flex-wrap items-center gap-y-1 mono">
            <span>LDN {time.ldn}</span>
            <span className="mx-1.5 opacity-30">•</span>
            <span>BJS {time.bjs}</span>
          </div>
        </div>
      </div>
      <SocialLinksDesktop />
    </div>
  </div>
);

const HeroContent = () => (
  <div className="flex-grow space-y-10 md:space-y-12">
    <div className="space-y-6">
      <h2 className="text-[20px] md:text-[24px] font-medium tracking-tight-titles text-neutral-900 dark:text-neutral-100 leading-tight">
        Electrical & Electronic Engineering <span className="text-neutral-200 dark:text-neutral-700 mx-1.5 font-light">/</span> <span className="text-neutral-400 dark:text-neutral-500">University of Bristol</span>
      </h2>
      <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 font-normal max-w-3xl">
        {PROFILE.bio}
      </p>
    </div>
    <IntelligenceSection />
  </div>
);

export const HeroSection = ({ time }: { time: WorldTime }) => (
  <section className="flex flex-col md:flex-row gap-10 md:gap-24 lg:gap-32">
    <MobileProfileBlock time={time} />
    <DesktopProfileBlock time={time} />
    <HeroContent />
  </section>
);

export const IntelligenceSection = () => (
  <div className="space-y-6">
    <div className="flex items-center space-x-4">
      <h4 className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500 uppercase">Intelligence</h4>
      <div className="h-[0.5px] bg-neutral-100 dark:bg-neutral-800 flex-grow"></div>
    </div>
    <div className="space-y-4">
      {NEWS.slice(0, 4).map((item, i) => (
        <div key={i} className="flex flex-col sm:flex-row sm:space-x-8 gap-1 sm:gap-0 items-start group">
          <span className="text-[10px] text-neutral-300 dark:text-neutral-600 w-auto sm:w-16 flex-shrink-0 pt-1 mono font-medium uppercase">{item.date}</span>
          <p className="text-[14px] leading-relaxed flex-grow text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-neutral-200 transition-colors max-w-3xl">{item.content}</p>
        </div>
      ))}
    </div>
  </div>
);

export const ResearchSection = () => (
  <section className="pt-10 md:pt-12 border-t-[0.5px] border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row gap-4 md:gap-24 lg:gap-32">
    <SectionHeader title="Research" />
    <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
      {FOCUS_AREAS.map((area, i) => (
        <div key={i} className="flex items-baseline space-x-4">
          <span className="text-[11px] text-neutral-300 dark:text-neutral-600 mono font-medium">{(i + 1).toString().padStart(2, '0')}</span>
          <span className="text-[15px] sm:text-[16px] font-normal text-neutral-900 dark:text-neutral-200">{area}</span>
        </div>
      ))}
    </div>
  </section>
);

export const AcademicSection = () => (
  <section className="pt-10 md:pt-12 border-t-[0.5px] border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row gap-4 md:gap-24 lg:gap-32">
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
);

export const LogisticsSection = () => (
  <section className="pt-10 md:pt-12 border-t-[0.5px] border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row gap-4 md:gap-24 lg:gap-32">
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
);
