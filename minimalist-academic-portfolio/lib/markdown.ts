export interface ParsedMarkdown {
  meta: Record<string, string>;
  content: string;
}

export const parseMarkdown = (raw: string): ParsedMarkdown => {
  const trimmed = raw.trim();
  if (!trimmed.startsWith('---')) {
    return { meta: {}, content: raw.trim() };
  }

  const lines = raw.split('\n');
  if (lines[0].trim() !== '---') {
    return { meta: {}, content: raw.trim() };
  }

  let end = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === '---') {
      end = i;
      break;
    }
  }

  if (end === -1) {
    return { meta: {}, content: raw.trim() };
  }

  const meta: Record<string, string> = {};
  for (const line of lines.slice(1, end)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^['\"]|['\"]$/g, '');
    if (key) meta[key] = value;
  }

  return {
    meta,
    content: lines.slice(end + 1).join('\n').trim(),
  };
};
