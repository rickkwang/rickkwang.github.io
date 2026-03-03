const SectionHeader = ({ title }: { title: string }) => (
  <div className="w-full md:w-[160px] flex-shrink-0 pt-1">
    <h3 className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 uppercase leading-none tracking-[0.06em] mb-4 md:mb-0">{title}</h3>
  </div>
);

export default SectionHeader;
