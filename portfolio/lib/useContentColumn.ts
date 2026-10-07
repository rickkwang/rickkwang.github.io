import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';

// Wide-screen content column (home + articles): the TREE is pinned to the right edge (see ArticleToc),
// and the column sits midway between the nav labels and that slot, so both gaps match.
export const TOC_WIDTH = 130;
const MIN_GAP = 64;
const TOC_BREAKPOINT = 1280; // keep in sync with the TREE's xl:block
const HOME_MAX_WIDTH = 840;

interface ColumnOptions {
  reserveToc?: boolean; // leave the right-hand TREE slot (articles); otherwise centre between nav and edge
  maxWidth?: number;
  breakpoint?: number; // below this the default flow layout applies
  enabled?: boolean;
}

// Presets shared by the views and the footer so they stay aligned
export const HOME_COLUMN: ColumnOptions = { reserveToc: false, maxWidth: HOME_MAX_WIDTH, breakpoint: 640 };
export const ARTICLE_COLUMN: ColumnOptions = {};

export const useContentColumn = ({
  reserveToc = true,
  maxWidth = 720,
  breakpoint = 640,
  enabled = true,
}: ColumnOptions = {}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [columnStyle, setColumnStyle] = useState<CSSProperties | undefined>();

  useLayoutEffect(() => {
    const update = () => {
      const wrapper = wrapperRef.current;
      const vw = document.documentElement.clientWidth;
      if (!wrapper || !enabled || vw < breakpoint) {
        setColumnStyle(undefined);
        return;
      }
      const labels = Array.from(document.querySelectorAll<HTMLElement>('.ruler-label'));
      const navRight = Math.max(...labels.map((el) => el.getBoundingClientRect().right));
      const edge = vw >= 768 ? 48 : 24; // page side padding: sm:px-6 / md:px-12
      const hasToc = reserveToc && vw >= TOC_BREAKPOINT; // TREE is xl:block; without it, match the home column
      const rightBound = vw - edge - (hasToc ? TOC_WIDTH : 0);
      const width = Math.min(hasToc ? maxWidth : Math.max(maxWidth, HOME_MAX_WIDTH), rightBound - navRight - MIN_GAP * 2);
      const left = (navRight + rightBound) / 2 - width / 2;
      setColumnStyle({ width, maxWidth: 'none', marginLeft: left - wrapper.getBoundingClientRect().left });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [reserveToc, maxWidth, breakpoint, enabled]);

  return { wrapperRef, columnStyle };
};
