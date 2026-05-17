const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="flex flex-col items-start mb-10 md:mb-16 space-y-2">
    <h1 className="text-[22px] md:text-[28px] font-medium tracking-tight-titles text-neutral-900 dark:text-neutral-100">{title}</h1>
    {subtitle && <p className="text-[13px] md:text-[14px] text-neutral-500 dark:text-neutral-400 font-normal max-w-2xl leading-relaxed">{subtitle}</p>}
  </div>
);

export default PageHeader;
