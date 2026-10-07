// Pixel zen garden behind the snail: a pale sky with a ringed planet, three hill ranges with a far pagoda, then a
// quiet karesansui — pine, stone lantern, a vermilion moon bridge over a pond, maple and bamboo.
// All original pixel art on a 3px grid.
export const PIXEL = 3;

// Sprite maps: each letter maps to a CSS class `g-<letter>` for its colour (see index.css).
// N pine needles · n needle shade · A maple · k trunk · o stone · O stone shade · y lantern glow
// b bamboo · B bamboo node · l leaf · g grass · G dark grass · v iris · r rock · R rock shade
// q bridge rail · Q bridge deck · D distant pagoda
const SPRITES: Record<string, string[]> = {
  // cloud-pruned pine: flat needle pads on a leaning trunk
  pine: [
    '.....NNNNNN.....',
    '...NNNNNNNNNN...',
    '....nnnnnnnn....',
    '.......kk.......',
    '.NNNN...k..NNN..',
    'NNNNNNN.k.NNNNNN',
    '.nnnnkkkkkknnnn.',
    '........k.......',
    '..NNNNN.kk......',
    '.NNNNNNNNk......',
    '..nnnnnkkk......',
    '.........k......',
    '........kk......',
    '.......kkkk.....',
  ],
  maple: [
    '..AAA.....AA..',
    '.AAAAA...AAAA.',
    'AAAAAAA.AAAAAA',
    '.AAAAAAAAAAAA.',
    '..AAA.kk.AAA..',
    '.......k......',
    '......kk......',
    '.......kk.....',
    '......kkk.....',
  ],
  lantern: [
    '....ooo....',
    '..ooooooo..',
    'ooooooooooO',
    '...oOoOo...',
    '...oyyyo...',
    '...oyyyo...',
    '...oOoOo...',
    '..ooooooO..',
    '....ooO....',
    '....ooO....',
    '....ooO....',
    '...oooOO...',
    '..ooooooO..',
  ],
  bamboo: [
    '.l.....l....',
    'lb..b..bl...',
    '.b..bl.b....',
    '.B..b..B..l.',
    '.b..B..b.lb.',
    'lb..b..b..b.',
    '.b..b.lb..B.',
    '.B..bl.B..b.',
    '.b..B..b..b.',
    '.b..b..b..b.',
    '.b..b..b..b.',
    '.B..b..B..b.',
    '.b..b..b..b.',
  ],
  // taiko-bashi: a solid arched deck with a light rail and posts along the crown
  bridge: [
    '.......qqqqqqqq.......',
    '.....qq.q....q.qq.....',
    '...qqQQQQQQQQQQQQqq...',
    '..qQQQQQ......QQQQQq..',
    'qqQQQ............QQQqq',
    'QQQ................QQQ',
  ],
  // five-storey pagoda, drawn at a smaller pixel so it reads as far away
  pagoda: [
    '.....D.....',
    '.....D.....',
    'D..DDDDD..D',
    '.DDDDDDDDD.',
    '...DDDDD...',
    '...D.D.D...',
    'D..DDDDD..D',
    '.DDDDDDDDD.',
    '...DDDDD...',
    '...D.D.D...',
    'D..DDDDD..D',
    '.DDDDDDDDD.',
    '...DDDDD...',
    '...D...D...',
    '...DDDDD...',
    '...DDDDD...',
  ],
  iris: ['.v...v.', '.v.v.v.', 'vv.v.vv', '.v.vv..', '.G.G.G.', '.G.G.G.', '..GGG..', '...G...'],
  tallGrass: ['...G....', '.g.G..g.', '.g.G.Gg.', 'gg.G.G..', 'gGgGgGgg'],
  grass: ['..G..', 'g.G.g', 'gGgGg'],
  stones: ['....rrr.......', '..rrrrrR...rr.', '.rrrrrRRR.rrRR', 'rrrrrrRRRrrrRR'],
};

const Sprite = ({ name, px = PIXEL }: { name: string; px?: number }) => {
  const map = SPRITES[name];
  return (
    <svg width={map[0].length * px} height={map.length * px} shapeRendering="crispEdges">
      {map.flatMap((row, y) =>
        row.split('').map((cell, x) =>
          cell === '.' ? null : (
            <rect key={`${x}-${y}`} x={x * px} y={y * px} width={px} height={px} className={`g-${cell}`} />
          ),
        ),
      )}
    </svg>
  );
};

// Ridge silhouettes from summed sines, quantised to whole pixels — identical on every visit
const COLS = 280; // ≈ 840px lane ÷ 3px pixels, so steps stay square
const ridge = (waves: [number, number, number][], base: number) =>
  Array.from({ length: COLS }, (_, x) =>
    Math.max(1, Math.round(base + waves.reduce((sum, [amp, period, phase]) => sum + amp * Math.sin((x / period) * Math.PI * 2 + phase), 0))),
  );
const DISTANT = ridge([[6, 210, 1.1], [3, 66, 0.2], [1, 23, 2.5]], 12);
const FAR = ridge([[4.5, 140, 0.4], [2.5, 47, 1.9], [1, 17, 0.3]], 10);
const NEAR = ridge([[2, 90, 2.2], [1.2, 31, 0.8]], 4);

// `cap` draws a lighter top pixel on each column (snow/light on the far range);
// `dither` scatters a checkered pixel just above the near range for a soft edge.
const Ridge = ({ heights, rows, className, cap = false, dither = false }: {
  heights: number[]; rows: number; className: string; cap?: boolean; dither?: boolean;
}) => (
  <svg className={className} viewBox={`0 0 ${COLS} ${rows}`} preserveAspectRatio="none" shapeRendering="crispEdges">
    {heights.map((h, x) => (
      <g key={x}>
        <rect x={x} y={rows - h} width={1.02} height={h} />
        {cap && <rect className="cap" x={x} y={rows - h} width={1.02} height={1} />}
        {dither && x % 2 === 0 && <rect className="dither" x={x} y={rows - h - 1} width={1.02} height={1} />}
      </g>
    ))}
  </svg>
);

const Cloud = ({ wide = false }: { wide?: boolean }) => (
  <svg width={(wide ? 14 : 10) * PIXEL} height={3 * PIXEL} shapeRendering="crispEdges" className="g-cloud">
    <rect x={3 * PIXEL} y={0} width={(wide ? 6 : 4) * PIXEL} height={PIXEL} />
    <rect x={PIXEL} y={PIXEL} width={(wide ? 11 : 8) * PIXEL} height={PIXEL} />
    <rect x={0} y={2 * PIXEL} width={(wide ? 14 : 10) * PIXEL} height={PIXEL} />
  </svg>
);

// Ringed planet, generated rather than hand-drawn so the tilted ring stays a clean ellipse.
// The ring is split at its local horizon: the far half is drawn behind the disc, the near
// half in front of it. Drawn on a 2px grid so the ring can be one pixel thin.
const PLANET_PX = 2;
const PLANET_W = 21;
const PLANET_H = 13;
const PLANET = (() => {
  const cx = 10, cy = 6, r = 4.3, tilt = -0.32, a = 9.6, b = 2.3;
  const disc: { x: number; y: number; tone: string }[] = [];
  const inDisc = (x: number, y: number) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
  for (let y = 0; y < PLANET_H; y++)
    for (let x = 0; x < PLANET_W; x++)
      if (inDisc(x, y)) {
        const lit = (x - cx) + (y - cy) < r * 0.55; // light from the upper left
        const band = Math.round(y - cy - (x - cx) * Math.tan(tilt)) === -1; // a band parallel to the ring
        disc.push({ x, y, tone: band ? 'band' : lit ? 'lit' : 'shade' });
      }
  const back = new Map<string, number[]>();
  const front = new Map<string, number[]>();
  for (let i = 0; i < 720; i++) {
    const t = (i / 720) * Math.PI * 2;
    const lx = a * Math.cos(t);
    const ly = b * Math.sin(t);
    const x = Math.round(cx + lx * Math.cos(tilt) - ly * Math.sin(tilt));
    const y = Math.round(cy + lx * Math.sin(tilt) + ly * Math.cos(tilt));
    if (x < 0 || y < 0 || x >= PLANET_W || y >= PLANET_H) continue;
    if (ly > 0) front.set(`${x},${y}`, [x, y]);
    else if (!inDisc(x, y)) back.set(`${x},${y}`, [x, y]);
  }
  return { disc, back: [...back.values()], front: [...front.values()].filter(([x, y]) => !back.has(`${x},${y}`)) };
})();

const Planet = () => (
  <span className="garden-planet">
    <svg width={PLANET_W * PLANET_PX} height={PLANET_H * PLANET_PX} shapeRendering="crispEdges">
      {PLANET.back.map(([x, y]) => (
        <rect key={`b${x}-${y}`} className="ring-back" x={x * PLANET_PX} y={y * PLANET_PX} width={PLANET_PX} height={PLANET_PX} />
      ))}
      {PLANET.disc.map(({ x, y, tone }) => (
        <rect key={`d${x}-${y}`} className={`disc-${tone}`} x={x * PLANET_PX} y={y * PLANET_PX} width={PLANET_PX} height={PLANET_PX} />
      ))}
      {PLANET.front.map(([x, y]) => (
        <rect key={`f${x}-${y}`} className="ring-front" x={x * PLANET_PX} y={y * PLANET_PX} width={PLANET_PX} height={PLANET_PX} />
      ))}
    </svg>
  </span>
);

// Butterfly, side-on and facing right (CSS mirrors it when it flies left), on the same 2px grid
// as the pagoda and planet. The frames were traced from a vector drawing and then cleaned up by
// hand: a pointed forewing with a dark tip and one white spot, a rounded pale hindwing, the far
// pair peeking out behind, and a thin body with a short clubbed antenna. Flight steps through
// folded → half → down → half; perched it stays folded and opens halfway now and then.
// e outline · a forewing · t wing tip · w tip spot · z hindwing · f/g far fore/hindwing
// x body · h head · n antenna and legs
const BF_PX = 2;
const BF_W = 15;
const BF_H = 18;
const BF_ROW = '...............';
const BF_FOLDED = [
  '.........ftt...',
  '........ftwt...',
  '......feaatt...',
  '.....feaaaae...',
  '....feaaaaae...',
  '...feaaaaae....',
  '..feaaaaaae....',
  '.geeeeaaae...nn',
  'gezzzzeaae...n.',
  'gezzzzzeae..n..',
  '.ezzzzzexxhh...',
  '..eeeeexxxh....',
  '....xxxx.......',
  '........n.n....',
  BF_ROW, BF_ROW, BF_ROW, BF_ROW,
];
const BF_HALF = [
  BF_ROW, BF_ROW, BF_ROW, BF_ROW, BF_ROW, BF_ROW, BF_ROW,
  '...ffeeeettt.nn',
  '.ggeaaaaatwt.n.',
  'gezzzzeeaae.n..',
  '.eeeeeeexxhh...',
  '.......xxxh....',
  '....xxxx.......',
  '........n.n....',
  BF_ROW, BF_ROW, BF_ROW, BF_ROW,
];
const BF_DOWN = [
  BF_ROW, BF_ROW, BF_ROW, BF_ROW, BF_ROW, BF_ROW, BF_ROW,
  '.............nn',
  '.............n.',
  '............n..',
  '........xxhh...',
  '.geeeeexxxh....',
  'gezzzzzeaae....',
  '.gezzzzeaaae...',
  '..geeeeeaaaae..',
  '....feaaaatt...',
  '.....fetwtt....',
  '.......fttt....',
];
const BF_FLY = [BF_FOLDED, BF_HALF, BF_DOWN, BF_HALF];
const BF_REST = [BF_FOLDED, BF_HALF];

const ButterflyFrame = ({ map, className }: { map: string[]; className: string }) => (
  <svg className={className} width={BF_W * BF_PX} height={BF_H * BF_PX} shapeRendering="crispEdges">
    {map.flatMap((row, y) =>
      row.split('').map((cell, x) =>
        cell === '.' ? null : (
          <rect key={`${x}-${y}`} x={x * BF_PX} y={y * BF_PX} width={BF_PX} height={BF_PX} className={`bf-${cell}`} />
        ),
      ),
    )}
  </svg>
);

// Flying and perched frame sets, swapped by the path animation's clock (see CSS)
const Butterfly = () => (
  <span className="butterfly">
    <span className="butterfly-face">
      <span className="butterfly-fly">
        {BF_FLY.map((map, i) => <ButterflyFrame key={i} map={map} className={`butterfly-frame f${i}`} />)}
      </span>
      <span className="butterfly-rest">
        {BF_REST.map((map, i) => <ButterflyFrame key={i} map={map} className={`butterfly-frame r${i}`} />)}
      </span>
    </span>
  </span>
);

const Bird = () => (
  <svg width={5 * PIXEL} height={2 * PIXEL} shapeRendering="crispEdges" className="g-bird">
    <rect x={0} y={0} width={PIXEL} height={PIXEL} />
    <rect x={PIXEL} y={PIXEL} width={PIXEL} height={PIXEL} />
    <rect x={2 * PIXEL} y={0} width={PIXEL} height={PIXEL} />
    <rect x={3 * PIXEL} y={PIXEL} width={PIXEL} height={PIXEL} />
    <rect x={4 * PIXEL} y={0} width={PIXEL} height={PIXEL} />
  </svg>
);

// Raked-sand ripples around a stone group: concentric ellipses snapped to the pixel grid and
// drawn 1px thick and broken every other pixel, like the tines of a rake
const RIPPLE_W = 40;
const RIPPLE_H = 6;
const RIPPLE_CELLS = (() => {
  const cells = new Set<string>();
  [[10, 1.4], [14, 2.2], [18, 3]].forEach(([rx, ry], ring) => {
    for (let i = 0; i < 360; i++) {
      const t = (i / 360) * Math.PI * 2;
      const x = Math.round(RIPPLE_W / 2 + rx * Math.cos(t) - 0.5);
      const y = Math.round(RIPPLE_H / 2 + ry * Math.sin(t) - 0.5);
      if (y >= 0 && y < RIPPLE_H && (x + ring) % 2 === 0) cells.add(`${x},${y}`);
    }
  });
  return [...cells].map((c) => c.split(',').map(Number));
})();

const Ripples = () => (
  <svg width={RIPPLE_W * PIXEL} height={RIPPLE_H * PIXEL} shapeRendering="crispEdges" className="g-ripples">
    {RIPPLE_CELLS.map(([x, y]) => (
      <rect key={`${x}-${y}`} x={x * PIXEL} y={y * PIXEL + 1} width={PIXEL} height={1} />
    ))}
  </svg>
);

const Pond = () => (
  <svg width={26 * PIXEL} height={3 * PIXEL} shapeRendering="crispEdges" className="g-pond">
    <rect x={3 * PIXEL} y={0} width={20 * PIXEL} height={PIXEL} />
    <rect x={0} y={PIXEL} width={26 * PIXEL} height={PIXEL} />
    <rect x={2 * PIXEL} y={2 * PIXEL} width={22 * PIXEL} height={PIXEL} />
    <rect className="glint g1" x={4 * PIXEL} y={PIXEL} width={2 * PIXEL} height={PIXEL} />
    <rect className="glint g2" x={19 * PIXEL} y={PIXEL} width={PIXEL} height={PIXEL} />
    {/* a drop lands: one pixel, then two pixels spreading outwards along the surface */}
    <rect className="drop" x={13 * PIXEL} y={PIXEL} width={PIXEL} height={PIXEL} />
    <rect className="ring rl" x={13 * PIXEL} y={PIXEL} width={PIXEL} height={PIXEL} />
    <rect className="ring rr" x={13 * PIXEL} y={PIXEL} width={PIXEL} height={PIXEL} />
  </svg>
);

// Maple leaves let go one at a time and zig-zag down to the sand
const LEAVES = [0, 1, 2];

const FIREFLIES = [0.2, 0.52, 0.84];

// Positions as fractions of the lane width. Fewer pieces, more empty sand — ma (間).
const PAGODA_AT = 0.2;
const MID: { name: string; at: number; breezy?: boolean }[] = [
  { name: 'bamboo', at: 0.07, breezy: true },
  { name: 'pine', at: 0.32, breezy: true },
  { name: 'lantern', at: 0.47 },
  { name: 'maple', at: 0.78, breezy: true },
  { name: 'bamboo', at: 0.93, breezy: true },
];

const FRONT: { name: string; at: number; sway?: boolean }[] = [
  { name: 'tallGrass', at: 0.13, sway: true },
  { name: 'stones', at: 0.22 },
  { name: 'grass', at: 0.41, sway: true },
  { name: 'iris', at: 0.665, sway: true },
  { name: 'grass', at: 0.71, sway: true },
  { name: 'tallGrass', at: 0.88, sway: true },
];

// One gust crosses the garden left → right: each plant's sway lags by its position
const gust = (at: number, span: number) => `${(at * span - span - 5).toFixed(2)}s`;

const Garden = () => (
  <div className="garden" aria-hidden="true">
    {/* sky */}
    <Planet />
    <span className="garden-cloud c1"><Cloud wide /></span>
    <span className="garden-cloud c2"><Cloud /></span>
    <span className="garden-bird b1"><Bird /></span>
    <span className="garden-bird b2"><Bird /></span>
    {/* hills, back to front, with a band of mist drifting between the far and near ranges */}
    <Ridge heights={DISTANT} rows={20} className="garden-ridge distant" />
    {/* the pagoda's base tucks behind the far range */}
    <span
      className="garden-pagoda"
      style={{ left: `${PAGODA_AT * 100}%`, bottom: 12 + (FAR[Math.round(PAGODA_AT * COLS)] - 4) * PIXEL }}
    >
      <Sprite name="pagoda" px={2} />
    </span>
    <Ridge heights={FAR} rows={16} className="garden-ridge far" cap />
    <div className="garden-mist" />
    <Ridge heights={NEAR} rows={8} className="garden-ridge near" dither />
    {/* mid-ground, each standing on a soft shadow */}
    {MID.map(({ name, at, breezy }) => (
      <span
        key={`${name}-${at}`}
        className={`garden-piece mid ${breezy ? 'is-breezy' : ''}`}
        style={{ left: `${at * 100}%`, animationDelay: gust(at, 3) }}
      >
        {name === 'lantern' && <span className="garden-glow" />}
        <Sprite name={name} />
        <span className="garden-shadow" />
      </span>
    ))}
    {LEAVES.map((i) => (
      <span key={i} className={`garden-leaf l${i}`} />
    ))}
    {/* raked sand, pond and ripples */}
    <div className="garden-sand" />
    <span className="garden-pond" style={{ left: '57.5%' }}><Pond /></span>
    <span className="garden-bridge" style={{ left: '57.5%' }}><Sprite name="bridge" /></span>
    <span className="garden-ripples" style={{ left: '22%' }}><Ripples /></span>
    {/* foreground */}
    {FRONT.map(({ name, at, sway }) => (
      <span
        key={`${name}-${at}`}
        className={`garden-piece front ${sway ? 'is-swaying' : ''}`}
        style={{ left: `${at * 100}%`, animationDelay: gust(at, 2.4) }}
      >
        <Sprite name={name} />
      </span>
    ))}
    {FIREFLIES.map((at, i) => (
      <span key={at} className="garden-firefly" style={{ left: `${at * 100}%`, animationDelay: `${i * -1.7}s` }} />
    ))}
    <Butterfly />
  </div>
);

export default Garden;
