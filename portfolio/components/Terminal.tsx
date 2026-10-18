import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { Tab } from '../types';
import type { NoaWorldInstance } from '../src/game/noa';

interface TerminalProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (tab: Tab) => void;
  onTheme: (theme: 'light' | 'dark') => void;
  activeTab: Tab;
}

type Line = { kind: 'in' | 'out' | 'dim' | 'err'; text: string; command?: boolean };

const SECTIONS: { tab: Tab; command: string; key: string; note: string }[] = [
  { tab: 'HOME', command: 'home', key: 'H', note: 'the front page' },
  { tab: 'WORK', command: 'work', key: 'W', note: 'apps and tools' },
  { tab: 'ACADEMIC', command: 'academic', key: 'A', note: 'projects and papers' },
  { tab: 'CV', command: 'cv', key: 'C', note: 'the one-page version' },
  { tab: 'ZEN', command: 'zen', key: 'Z', note: 'notes and garden' },
];

// Surfaced by the slash hint. Keep the order: it is also the /help order.
const COMMANDS: { name: string; desc: string }[] = [
  { name: 'help', desc: 'list every command' },
  { name: 'home', desc: 'go home' },
  { name: 'work', desc: 'apps and tools' },
  { name: 'academic', desc: 'projects and papers' },
  { name: 'cv', desc: 'the one-page version' },
  { name: 'zen', desc: 'notes and garden' },
  { name: 'game', desc: "play noa's world" },
  { name: 'theme', desc: 'switch light / dark' },
  { name: 'clear', desc: 'clear the scrollback' },
  { name: 'ls', desc: 'list every place' },
  { name: 'pwd', desc: 'print where you are' },
  { name: 'whoami', desc: 'who is this' },
  { name: 'date', desc: 'today’s date and time' },
  { name: 'exit', desc: 'close the terminal' },
];
export const GHOSTS = ['/help', '/game', '/theme', '/work', '/zen', '/academic'];

const WELCOME: Line[] = [
  { kind: 'dim', text: 'type /help to see what this shell can do' },
];

const GLYPHS: Record<string, string[]> = {
  R: ['####.', '#...#', '####.', '#..#.', '#...#'],
  I: ['###', '.#.', '.#.', '.#.', '###'],
  C: ['.####', '#....', '#....', '#....', '.####'],
  K: ['#...#', '#..#.', '###..', '#..#.', '#...#'],
  W: ['#...#', '#...#', '#.#.#', '##.##', '#...#'],
  A: ['.###.', '#...#', '#####', '#...#', '#...#'],
  N: ['#...#', '##..#', '#.#.#', '#..##', '#...#'],
  G: ['.####', '#....', '#.###', '#...#', '.###.'],
};
const BANNER = Array.from({ length: 5 }, (_, row) =>
  'RICKKWANG'.split('').map((letter) => GLYPHS[letter][row]).join(' '),
).join('\n');

const PROMPT = 'guest@rickkwang';

const Terminal = ({ open, onClose, onNavigate, onTheme, activeTab }: TerminalProps) => {
  const [mode, setMode] = useState<'shell' | 'game'>('shell');
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [value, setValue] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [suggestAt, setSuggestAt] = useState(0);
  const [suggestOff, setSuggestOff] = useState(false);
  const [ghost, setGhost] = useState(GHOSTS[0]);
  const historyAt = useRef(-1);
  // IME state: the Enter that commits a composition must not run the command
  const composing = useRef(false);
  const composedAt = useRef(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const gameHostRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<NoaWorldInstance | null>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const navigateRef = useRef(onNavigate);
  navigateRef.current = onNavigate;

  useEffect(() => {
    if (!open) {
      setMode('shell');
      return;
    }
    setMode('shell');
    setLines(WELCOME);
  }, [open]);

  useEffect(() => {
    if (open && mode === 'shell') inputRef.current?.focus();
  }, [open, mode]);

  useEffect(() => {
    if (!open) return;
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }, [lines, open]);

  // keep the highlighted row in view when arrowing through a clipped list.
  // layout effect: scroll before paint, otherwise the row lands off-screen for a frame
  useLayoutEffect(() => {
    const box = suggestRef.current;
    const row = box?.querySelector<HTMLElement>('.sug.on');
    if (!box || !row) return;
    const top = row.offsetTop;
    const bottom = top + row.offsetHeight;
    if (top < box.scrollTop) box.scrollTop = top;
    else if (bottom > box.scrollTop + box.clientHeight) box.scrollTop = bottom - box.clientHeight;
  }, [suggestAt, value]);

  // idle hint, cycling like claude.dev's ghost text
  useEffect(() => {
    if (!open || mode !== 'shell') return;
    const id = window.setInterval(() => {
      setGhost((prev) => GHOSTS[(GHOSTS.indexOf(prev) + 1) % GHOSTS.length]);
    }, 3800);
    return () => window.clearInterval(id);
  }, [open, mode]);

  useEffect(() => {
    if (!open) return;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = bodyOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (event.isComposing) return; // Escape cancels the IME, not the terminal
      if (mode === 'shell') closeRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, mode]);

  // Mount the game only while its pane is active; leave no listeners behind on exit
  useEffect(() => {
    if (!open || mode !== 'game') return;
    const host = gameHostRef.current;
    if (!host) return;

    let disposed = false;
    let removeBack: (() => void) | undefined;
    (async () => {
      const [{ createNoaWorld }] = await Promise.all([
        import('../src/game/noa.js'),
        import('../src/game/noa.css'),
      ]);
      if (disposed || !gameHostRef.current) return;
      const game = createNoaWorld(gameHostRef.current, {
        boot: true,
        keyboard: 'embedded',
        pointer: true,
        touchControls: 'auto',
        sounds: { baseUrl: `${import.meta.env.BASE_URL}game/sfx/` },
        soundDefault: 'on',
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        backLink: { href: import.meta.env.BASE_URL, label: 'home' },
        onEscape: () => setMode('shell'),
      });
      gameRef.current = game;

      // the game's top-bar link is the way back to the site, not a page load
      const backBtn = gameHostRef.current?.querySelector<HTMLAnchorElement>('#nw-backBtn');
      const onBack = (event: MouseEvent) => {
        event.preventDefault();
        navigateRef.current('HOME');
        closeRef.current();
      };
      backBtn?.addEventListener('click', onBack);
      removeBack = () => backBtn?.removeEventListener('click', onBack);

      if (import.meta.env.DEV) {
        (window as unknown as { __noa?: NoaWorldInstance }).__noa = game;
      }
    })();

    return () => {
      disposed = true;
      removeBack?.();
      gameRef.current?.destroy();
      gameRef.current = null;
      if (import.meta.env.DEV) {
        delete (window as unknown as { __noa?: NoaWorldInstance }).__noa;
      }
      host.replaceChildren();
    };
  }, [open, mode]);

  if (!open) return null;

  const query = value.startsWith('/') && !value.includes(' ') ? value.slice(1).toLowerCase() : null;
  const matches = query === null ? [] : COMMANDS.filter((cmd) => cmd.name.startsWith(query));
  const suggestOpen = matches.length > 0 && !suggestOff;
  const selected = Math.max(0, Math.min(suggestAt, matches.length - 1));

  const complete = (cmd: (typeof COMMANDS)[number]) => {
    setValue(`/${cmd.name}`);
    setSuggestOff(true);
    inputRef.current?.focus();
  };

  // claude.dev runs its game full-bleed on its own page; a full-screen takeover inside
  // the terminal keeps the same composition instead of squeezing it into a panel.
  if (mode === 'game') {
    return (
      <div className="term-game-full" role="dialog" aria-modal="true" aria-label="Noa's World">
        <div ref={gameHostRef} className="term-game-host" />
      </div>
    );
  }

  const print = (next: Line[]) => setLines((prev) => [...prev, ...next]);

  const startGame = () => setMode('game');

  const go = (tab: Tab) => {
    onNavigate(tab);
    onClose();
  };

  const run = (raw: string) => {
    // NFKC folds full-width Latin and punctuation typed through a CJK IME back to ASCII
    const typed = raw.trim().normalize('NFKC');
    const echo: Line = { kind: 'in', text: typed, command: true };
    if (!typed) {
      print([echo]);
      return;
    }
    setHistory((prev) => [...prev.filter((item) => item !== typed), typed].slice(-50));
    historyAt.current = -1;

    const words = typed.toLowerCase().replace(/^\//, '').split(/\s+/);
    const head = words[0];
    const arg = words[1];

    const sectionFor = (name?: string) => SECTIONS.find((s) => s.command === name);
    const isGame = (name?: string) => name === 'game';

    switch (head) {
      case 'help':
        print([
          echo,
          ...COMMANDS.map((cmd) => ({
            kind: 'out' as const,
            text: `/${cmd.name.padEnd(19)}${cmd.desc}`,
          })),
          { kind: 'dim', text: 'type / to filter; tab to complete' },
        ]);
        return;
      case 'ls':
        print([
          echo,
          ...SECTIONS.map((s) => ({ kind: 'out' as const, text: `${s.command.padEnd(10)}${s.note}` })),
          { kind: 'out', text: `${'game'.padEnd(10)}a small world` },
        ]);
        return;
      case 'home':
      case 'work':
      case 'academic':
      case 'cv':
      case 'zen': {
        const section = sectionFor(head);
        if (section) go(section.tab);
        return;
      }
      case 'cd':
      case 'open':
      case 'go': {
        if (!arg || arg === '~' || arg === '.') {
          go('HOME');
          return;
        }
        if (isGame(arg)) {
          print([echo, { kind: 'dim', text: 'opening noa\u2019s world...' }]);
          startGame();
          return;
        }
        const section = sectionFor(arg);
        if (section) go(section.tab);
        else print([echo, { kind: 'err', text: `no such place: ${arg}. type ls.` }]);
        return;
      }
      case 'pwd':
        print([echo, { kind: 'out', text: activeTab === 'HOME' ? '~' : `~/${activeTab.toLowerCase()}` }]);
        return;
      case 'game':
        print([echo, { kind: 'dim', text: 'opening noa\u2019s world...' }]);
        startGame();
        return;
      case 'theme': {
        // toggles the site's own theme; the terminal inherits it, there is no separate palette
        const next = arg ?? (document.documentElement.classList.contains('dark') ? 'light' : 'dark');
        if (next !== 'light' && next !== 'dark') {
          print([echo, { kind: 'err', text: 'usage: theme [light|dark]' }]);
          return;
        }
        onTheme(next);
        print([echo, { kind: 'dim', text: `theme: ${next}` }]);
        return;
      }
      case 'whoami':
        print([
          echo,
          { kind: 'out', text: 'guest' },
          { kind: 'out', text: 'a curious visitor. helpful, honest, and harmless (mostly).' },
        ]);
        return;
      case 'date':
        print([echo, { kind: 'out', text: new Date().toString() }]);
        return;
      case 'clear':
        setLines([]);
        return;
      case 'exit':
      case 'quit':
        print([echo]);
        onClose();
        return;
      case 'sudo':
        print([echo, { kind: 'err', text: 'nice try.' }]);
        return;
      case 'rm':
        print([echo, { kind: 'err', text: 'not on my watch.' }]);
        return;
      case 'coffee':
        print([echo, { kind: 'dim', text: 'brewing... done. still sleepy.' }]);
        return;
      default:
        print([echo, { kind: 'err', text: `command not found: ${head}. type /help.` }]);
    }
  };

  const isComposing = (event: ReactKeyboardEvent<HTMLInputElement>) =>
    composing.current ||
    event.nativeEvent.isComposing ||
    event.keyCode === 229 ||
    // Safari can report the confirming Enter after compositionend
    performance.now() - composedAt.current < 120;

  const onInputKey = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (isComposing(event)) return;

    if (suggestOpen) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const step = event.key === 'ArrowDown' ? 1 : -1;
        setSuggestAt((at) => (Math.min(at, matches.length - 1) + step + matches.length) % matches.length);
        return;
      }
      if (event.key === 'Tab') {
        event.preventDefault();
        complete(matches[selected]);
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        setSuggestOff(true);
        return;
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        run(`/${matches[selected].name}`);
        setValue('');
        return;
      }
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      run(value);
      setValue('');
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!history.length) return;
      const at = historyAt.current < 0 ? history.length - 1 : Math.max(0, historyAt.current - 1);
      historyAt.current = at;
      setValue(history[at]);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyAt.current < 0) return;
      const at = historyAt.current + 1;
      if (at >= history.length) {
        historyAt.current = -1;
        setValue('');
      } else {
        historyAt.current = at;
        setValue(history[at]);
      }
    }
  };

  const menu = (
    <nav className="term-menu" aria-label="Terminal sections">
      {SECTIONS.map((section) => (
        <button
          key={section.command}
          type="button"
          className={`term-menu-item ${activeTab === section.tab ? 'is-on' : ''}`}
          onClick={() => go(section.tab)}
        >
          <span className="term-menu-key">[{section.key}]</span>
          {section.tab === 'ZEN' ? 'ZEN GARDEN' : section.tab}
        </button>
      ))}
      <button type="button" className="term-menu-item" onClick={() => setMode('game')}>
        <span className="term-menu-key">[G]</span>
        NOA'S WORLD
      </button>
    </nav>
  );

  return (
    <div className="term-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section
        className={`term ${expanded ? 'is-expanded' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
      >
        <aside className="term-side">
          <button type="button" className="term-brand" onClick={() => go('HOME')}>
            <span className="term-brand-name">rickkwang</span>
            <span className="term-brand-sub">terminal</span>
          </button>
          <div className="term-menu-wrap">{menu}</div>
          <span className="term-side-foot">© 2026 · bristol</span>
        </aside>

        <div className="term-main">
          <header className="term-top">
            <span className="term-crumb">~/terminal</span>
            <div className="term-actions">
              <button
                type="button"
                className="term-act"
                onClick={() => setExpanded((v) => !v)}
                aria-label={expanded ? 'Restore terminal size' : 'Expand terminal'}
              >
                {expanded ? '[MIN]' : '[MAX]'}
              </button>
              <button type="button" className="term-act" onClick={onClose} aria-label="Close terminal">
                [EXIT]
              </button>
            </div>
          </header>

          <div className="term-mobile-menu">{menu}</div>

          <div className="term-body" ref={scrollerRef} onClick={() => inputRef.current?.focus()}>
            <pre className="term-banner" aria-hidden="true">{BANNER}</pre>
            <p className="term-sub">
              The site as a shell: navigation is a prompt. Type <span className="term-cmd">/help</span> to start.
            </p>
            {lines.map((line, i) =>
              line.command ? (
                <div key={i} className="term-echo">
                  <span className="term-user">{PROMPT}</span>
                  <span className="term-gt">&gt;</span>
                  <span>{line.text}</span>
                </div>
              ) : (
                <div key={i} className={`term-out ${line.kind}`}>{line.text}</div>
              ),
            )}
          </div>
          <form
            className="term-dock"
            onSubmit={(event) => {
              event.preventDefault();
              if (composing.current) return;
              run(value);
              setValue('');
            }}
          >
            {suggestOpen ? (
              <div id="term-suggest-list" ref={suggestRef} className="term-suggest" role="listbox" aria-label="Commands">
                {matches.map((cmd, i) => (
                  <div
                    key={cmd.name}
                    id={`term-sug-${cmd.name}`}
                    role="option"
                    aria-selected={i === selected}
                    className={`sug ${i === selected ? 'on' : ''}`}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      complete(cmd);
                    }}
                  >
                    <span className="sc">/{cmd.name}</span>
                    <span className="sd">{cmd.desc}</span>
                  </div>
                ))}
              </div>
            ) : null}
            <span className="term-user">{PROMPT}</span>
            <span className="term-gt">&gt;</span>
            <span className="term-input-wrap">
              <input
                id="term-input"
                ref={inputRef}
                className="term-input"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  setSuggestAt(0);
                  setSuggestOff(false);
                }}
                onKeyDown={onInputKey}
                onCompositionStart={() => { composing.current = true; }}
                onCompositionEnd={(event) => {
                  composing.current = false;
                  composedAt.current = performance.now();
                  setValue(event.currentTarget.value);
                }}
                placeholder=" "
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Terminal command"
                role="combobox"
                aria-expanded={suggestOpen}
                aria-controls="term-suggest-list"
                aria-autocomplete="list"
                aria-activedescendant={suggestOpen ? `term-sug-${matches[selected].name}` : undefined}
              />
              {value === '' ? (
                <span key={ghost} className="term-ghost" aria-hidden="true">{ghost}</span>
              ) : null}
            </span>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Terminal;
