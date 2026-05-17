import { useEffect, useRef, useState } from 'react';

const pickLine = (hour: number): string => {
  if (hour >= 5 && hour < 11) return 'You arrived at a still morning.';
  if (hour >= 11 && hour < 17) return 'You arrived in the long afternoon.';
  if (hour >= 17 && hour < 21) return 'You arrived at a soft evening.';
  return 'You arrived at a quiet hour.';
};

const IntroOverlay = ({ onEnter }: { onEnter: () => void }) => {
  const [entering, setEntering] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const ldnHour = Number(now.toLocaleString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', hour12: false }));
  const text = pickLine(ldnHour);
  const ldn = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false });
  const bjs = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', hour12: false });
  const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + ' · ' + ldn + ' in London';

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const spans = Array.from(overlay.querySelectorAll<HTMLSpanElement>('.intro-line .ch'));
    const move = (e: MouseEvent) => {
      if (entering) return;
      const mx = e.clientX, my = e.clientY;
      spans.forEach((span) => {
        const r = span.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mx - cx, dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 180;
        if (dist < radius) {
          const f = 1 - dist / radius;
          span.style.transform = `translate(${(dx / dist) * f * 10}px, ${(dy / dist) * f * 10}px)`;
        } else {
          span.style.transform = '';
        }
      });
    };
    const leave = () => spans.forEach((s) => (s.style.transform = ''));
    overlay.addEventListener('mousemove', move);
    overlay.addEventListener('mouseleave', leave);
    return () => {
      overlay.removeEventListener('mousemove', move);
      overlay.removeEventListener('mouseleave', leave);
    };
  }, [text, entering]);

  const handleEnter = () => {
    if (entering) return;
    setEntering(true);
    window.setTimeout(onEnter, 950);
  };

  return (
    <div ref={overlayRef} className={`intro-overlay${entering ? ' entering' : ''}`}>
      <div className="intro-cover">
        <div className="intro-top">
          <div className="intro-name">Myrick Wang</div>
          <div className="intro-date">{dateStr}</div>
        </div>
        <div className="intro-mid">
          <div className="intro-line">
            {text.split(' ').map((word, wi, arr) => (
              <span key={wi}>
                <span className="intro-word">
                  {Array.from(word).map((ch, i) => (
                    <span key={i} className="ch">{ch}</span>
                  ))}
                </span>
                {wi < arr.length - 1 ? ' ' : ''}
              </span>
            ))}
          </div>
        </div>
        <figure className="intro-figure">
          <img src="/intro.jpg" alt="" />
        </figure>
        <div className="intro-foot">
          <div className="intro-sub">A portfolio of work, writing, and the small weather of one mind.</div>
          <div className="intro-clocks">
            <div className="c"><div className="city">london</div><div className="time">{ldn}</div></div>
            <div className="c"><div className="city">beijing</div><div className="time">{bjs}</div></div>
          </div>
        </div>
      </div>
      <div
        className="intro-peel"
        onClick={handleEnter}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleEnter(); } }}
        role="button"
        tabIndex={0}
        aria-label="Enter site"
      >
        <div className="pshadow"></div>
        <div className="pback"></div>
      </div>
    </div>
  );
};

export default IntroOverlay;
