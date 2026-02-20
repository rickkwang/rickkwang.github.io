const MarkdownContent = ({ content }: { content: string }) => {
  const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-medium text-neutral-900 dark:text-neutral-100">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

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

  const parseLine = (line: string) => parseLinks(line);

  const codeBlockStyle = "font-mono text-[13px] bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-4 block w-full whitespace-pre overflow-x-auto my-6 text-neutral-700 dark:text-neutral-300";
  const blockQuoteStyle = "border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 italic text-neutral-500 dark:text-neutral-400 my-6";

  return (
    <div className="prose max-w-none text-neutral-600 dark:text-neutral-400 leading-7">
      {content.split('\n').map((line, i) => {
        const trimmed = line.trim();
        if (trimmed === '') return <div key={i} className="h-3" />;
        if (trimmed === '---') return <hr key={i} className="border-neutral-100 dark:border-neutral-800 my-8" />;

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

        if (trimmed.startsWith('> ')) {
          return <div key={i} className={blockQuoteStyle}>{parseLine(trimmed.replace('> ', ''))}</div>;
        }

        if (/^\s*-\s+/.test(line)) {
          const listContent = line.replace(/^\s*-\s+/, '');
          return (
            <div key={i} className="flex items-start gap-3 ml-1 mb-2">
              <span className="mt-2.5 w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600 flex-shrink-0"></span>
              <div className="text-[15px] leading-relaxed">{parseLine(listContent)}</div>
            </div>
          );
        }

        if (trimmed.startsWith('```')) return null;
        if (line.startsWith('    ') || line.startsWith('\t')) {
          return <div key={i} className={codeBlockStyle}>{line}</div>;
        }

        return <p key={i} className="text-[15px] leading-relaxed mb-3">{parseLine(trimmed)}</p>;
      })}
    </div>
  );
};

export default MarkdownContent;
