// Slow marquee (after claude.dev); pauses on hover. Items are duplicated so the loop is seamless.
const Ticker = ({ items }: { items: string[] }) => (
  <div className="ticker mono" aria-label={items.join(' · ')}>
    <div className="ticker-track" aria-hidden="true">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="ticker-item">{item}</span>
      ))}
    </div>
  </div>
);

export default Ticker;
