const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="flex flex-col items-start mb-10 md:mb-16 space-y-2">
    <h1 className="text-[20px] md:text-[25px] font-medium tracking-tight-titles text-stone-900 dark:text-stone-100">{title}</h1>
    {subtitle && <p className="text-[12px] md:text-[13px] text-stone-500 dark:text-stone-400 font-normal max-w-2xl leading-relaxed">{subtitle}</p>}
  </div>
);

export default PageHeader;
