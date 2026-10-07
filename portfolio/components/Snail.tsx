import { useEffect, useRef, useState } from 'react';
import Garden, { PIXEL } from './Garden';

// Pixel snail mascot: crawls slowly through the pixel zen garden above the footer, turns at the
// edges, and retreats into its shell when clicked. Original artwork on a 16×9 grid.
// S shell outline · s shell fill · p spiral · B body · K eye stalk · E eye
const SPRITE = [
  '............E..E',
  '............K..K',
  '....SSSS....K..K',
  '...SssssS...K..K',
  '..SsSSSssS..BBBB',
  '..SsSpSSsS.BBBBB',
  '..SsSSpssSBBBBB.',
  '...SSSSSSBBBBB..',
  'BBBBBBBBBBBBBB..',
];

const WIDTH = SPRITE[0].length * PIXEL;
const HEIGHT = SPRITE.length * PIXEL;
const SPEED = 9; // px per second — it's a snail
const HIDE_MS = 2800; // time spent tucked in after a click
const EMERGE_MS = 1100; // keep in sync with the CSS emerge sequence
const TURN = { look: 550, tuck: 950, done: 1600 }; // ms into a turn

// Parts animate separately: the head (neck + stalks) slides into the shell, the foot folds away.
type Part = 'shell' | 'foot' | 'neck' | 'stalk' | 'eye';
// The bottom two body rows (foot + base of the neck) fold away; the rest of the neck slides in
const FOOT_FROM_ROW = SPRITE.length - 2;
const partOf = (cell: string, y: number): Part => {
  if (cell === 'E') return 'eye';
  if (cell === 'K') return 'stalk';
  if (cell === 'B') return y >= FOOT_FROM_ROW ? 'foot' : 'neck';
  return 'shell';
};

const pixels = (part: Part) =>
  SPRITE.flatMap((row, y) =>
    row.split('').map((cell, x) =>
      cell !== '.' && partOf(cell, y) === part ? (
        <rect key={`${x}-${y}`} x={x * PIXEL} y={y * PIXEL} width={PIXEL} height={PIXEL} className={`px-${cell}`} />
      ) : null,
    ),
  );

type Phase = 'crawl' | 'hiding' | 'hidden' | 'emerging' | 'look' | 'tuck' | 'turn-out';

const Snail = () => {
  const laneRef = useRef<HTMLDivElement | null>(null);
  const snailRef = useRef<HTMLButtonElement | null>(null);
  const [phase, setPhase] = useState<Phase>('crawl');
  const [facingLeft, setFacingLeft] = useState(false);
  const [blink, setBlink] = useState(false);
  const state = useRef({ x: 0, dir: 1, busy: false });
  const timers = useRef<number[]>([]);

  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Occasional blink while out and about
  useEffect(() => {
    let id = 0;
    const schedule = () => {
      id = window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 140);
        schedule();
      }, 2800 + Math.random() * 4200);
    };
    schedule();
    return () => clearTimeout(id);
  }, []);

  const hide = () => {
    if (state.current.busy) return;
    state.current.busy = true;
    setPhase('hiding');
    later(700, () => setPhase('hidden'));
    later(HIDE_MS, () => setPhase('emerging'));
    later(HIDE_MS + EMERGE_MS, () => {
      setPhase('crawl');
      setBlink(true);
      later(160, () => setBlink(false));
      state.current.busy = false;
    });
  };

  const turn = (dir: number) => {
    state.current.busy = true;
    setPhase('look');
    later(TURN.look, () => setPhase('tuck'));
    later(TURN.tuck, () => {
      setFacingLeft(dir < 0);
      setPhase('turn-out');
    });
    later(TURN.done, () => {
      setPhase('crawl');
      state.current.busy = false;
    });
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const lane = laneRef.current;
      const s = state.current;
      if (lane && !s.busy) {
        const max = Math.max(0, lane.clientWidth - WIDTH);
        s.x += s.dir * SPEED * dt;
        if (s.x >= max || s.x <= 0) {
          s.x = Math.min(max, Math.max(0, s.x));
          s.dir *= -1;
          turn(s.dir);
        }
        if (snailRef.current) snailRef.current.style.transform = `translateX(${s.x}px)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={laneRef} className="snail-lane" aria-hidden="true">
      <Garden />
      <button
        ref={snailRef}
        type="button"
        tabIndex={-1}
        className={`snail phase-${phase} ${blink ? 'is-blinking' : ''}`}
        onClick={hide}
        title="Hello there"
      >
        <span className="snail-bob">
          <svg
            width={WIDTH}
            height={HEIGHT}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            shapeRendering="crispEdges"
            className="snail-sprite"
            style={{ transform: facingLeft ? 'scaleX(-1)' : undefined }}
          >
            <g className="snail-foot" style={{ transformOrigin: `0 ${HEIGHT}px` }}>{pixels('foot')}</g>
            <g className="snail-head">
              {pixels('neck')}
              <g className="snail-stalks" style={{ transformOrigin: `${13.5 * PIXEL}px ${4 * PIXEL}px` }}>
                {pixels('stalk')}
                <g className="snail-eyes" style={{ transformOrigin: `0 ${PIXEL / 2}px` }}>{pixels('eye')}</g>
              </g>
            </g>
            <g className="snail-shell">{pixels('shell')}</g>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Snail;
