const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="flex flex-col items-start mb-10 md:mb-16 space-y-2">
    <h1 className="text-3xl md:text-5xl font-medium text-neutral-900 dark:text-neutral-100">{title}</h1>
    {subtitle && <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 font-light max-w-2xl leading-relaxed">{subtitle}</p>}
  </div>
);

export default PageHeader;
