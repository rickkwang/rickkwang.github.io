import { useState } from 'react';
import { Work } from '../types';

interface WorkIndexProps {
  works: Work[];
  onSelect: (work: Work) => void;
}

// Mono index rows: hovering draws an underline under the name and quiets the other rows
const WorkIndex = ({ works, onSelect }: WorkIndexProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className={`work-index ${activeId ? 'has-active' : ''}`}>
      <div className="work-list" onMouseLeave={() => setActiveId(null)}>
        <div className="work-head mono">
          <span className="w-year">Year</span>
          <span className="w-title">Name</span>
          <span className="w-kind">Type</span>
        </div>
        {works.map((work, i) => (
          <button
            key={work.id}
            type="button"
            className={`work-row mono ${activeId === work.id ? 'is-active' : ''}`}
            onClick={() => onSelect(work)}
            onMouseEnter={() => setActiveId(work.id)}
            onFocus={() => setActiveId(work.id)}
            onBlur={() => setActiveId(null)}
          >
            <span className="w-year">{work.year}</span>
            <span className="w-title">
              <span className="w-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="w-name">{work.title}</span>
              <span className="w-tagline">{work.tagline}</span>
            </span>
            <span className="w-kind">{work.kind}</span>
            <span className="w-arrow" aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorkIndex;
