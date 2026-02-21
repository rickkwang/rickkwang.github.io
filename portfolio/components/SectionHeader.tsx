const SectionHeader = ({ title }: { title: string }) => (
  <div className="w-full md:w-[160px] flex-shrink-0 pt-1">
    <h3 className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500 uppercase leading-none mb-4 md:mb-0">{title}</h3>
  </div>
);

export default SectionHeader;
