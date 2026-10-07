import { useEffect, useState } from 'react';

// Typewriter: types each item out, holds, deletes it, moves on. Reduced motion shows items statically.
const Ticker = ({ items }: { items: string[] }) => {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(items[0].length);
      return;
    }
    const full = items[i].length;
    let delay = deleting ? 18 : 42;
    if (!deleting && n === full) delay = 2200;
    if (deleting && n === 0) delay = 350;
    const t = setTimeout(() => {
      if (!deleting && n === full) setDeleting(true);
      else if (deleting && n === 0) { setDeleting(false); setI((i + 1) % items.length); }
      else setN(n + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [i, n, deleting, items]);

  return (
    <div className="ticker mono" aria-label={items.join(' · ')}>
      <span className="ticker-prompt" aria-hidden="true">&gt;</span>
      <span className="ticker-item" aria-hidden="true">
        {items[i].slice(0, n)}<span className="ticker-caret" />
      </span>
    </div>
  );
};

export default Ticker;
