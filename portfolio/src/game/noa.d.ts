export interface NoaWorldOptions {
  boot?: boolean;
  keyboard?: 'page' | 'embedded';
  pointer?: boolean;
  touchControls?: 'auto' | false;
  sounds?: { baseUrl: string } | { urls: Record<string, string> };
  soundDefault?: 'on' | 'off';
  theme?: 'light' | 'dark';
  topInset?: number;
  reducedMotion?: boolean;
  idleAction?: 'quest' | 'ultra';
  backLink?: { href: string; label: string };
  onEscape?: () => void;
  onModeChange?: (mode: string) => void;
  storage?: { get(key: string): string | null; set(key: string, value: string): void };
}

export interface NoaWorldInstance {
  destroy(): void;
  start(): void;
  stop(): void;
  setTheme(theme: 'light' | 'dark'): void;
  setTopInset(px: number): void;
  isPlaying(): boolean;
}

export function createNoaWorld(host: HTMLElement, options?: NoaWorldOptions): NoaWorldInstance;
