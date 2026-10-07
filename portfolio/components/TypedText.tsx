import { useEffect, useState } from 'react';

// Module-level flag: types once per page load (every refresh), but not again when
// navigating back to the home view within the same load.
let typedThisLoad = false;

// Terminal-style typing (after claude.dev), once per page load. The full text is laid out
// invisibly underneath so the block never changes height while typing.
const TypedText = ({ text, speed = 34 }: { text: string; speed?: number }) => {
  const [skip] = useState(
    () => typedThisLoad || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [count, setCount] = useState(skip ? text.length : 0);
  const [caretOn, setCaretOn] = useState(!skip);

  useEffect(() => {
    if (skip) return;
    if (count < text.length) {
      const pause = /[,—.]/.test(text[count - 1] ?? '') ? speed * 6 : speed;
      const timer = setTimeout(() => setCount((c) => c + 1), pause);
      return () => clearTimeout(timer);
    }
    typedThisLoad = true;
    const timer = setTimeout(() => setCaretOn(false), 2600);
    return () => clearTimeout(timer);
  }, [count, skip, speed, text]);

  return (
    <span className="relative block" aria-label={text}>
      <span className="invisible" aria-hidden="true">{text}</span>
      <span className="absolute inset-0" aria-hidden="true">
        {text.slice(0, count)}
        {caretOn && <span className="type-caret" />}
      </span>
    </span>
  );
};

export default TypedText;
