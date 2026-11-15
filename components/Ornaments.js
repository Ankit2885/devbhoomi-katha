// मंदिर, घंटी, दीया जैसे सजावटी ग्राफ़िक्स (SVG)

export function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="#fffaf2">
      <circle cx="24" cy="24" r="22" strokeWidth="1.6" strokeDasharray="1.5 3" strokeLinecap="round" />
      <circle cx="24" cy="24" r="17" strokeWidth="1.8" />
      <path d="M24 10 L36 34 L12 34 Z" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M24 10 L20 18 L24 16 L28 18 Z" fill="#fffaf2" />
      <circle cx="24" cy="28" r="2.6" fill="#fffaf2" stroke="none" />
    </svg>
  );
}

// ऐपण (कुमाऊँनी लोक कला) शैली का मंडल
export function AipanMandala({ className = "" }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  const small = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" stroke="#fffaf2" strokeWidth="2.5" aria-hidden="true">
      <circle cx="200" cy="200" r="192" strokeDasharray="2 8" strokeLinecap="round" strokeWidth="4" />
      <circle cx="200" cy="200" r="176" />
      <circle cx="200" cy="200" r="166" strokeDasharray="1 10" strokeWidth="6" strokeLinecap="round" />
      <g className="spin-slow">
        {petals.map((a) => (
          <g key={a} transform={`rotate(${a} 200 200)`}>
            <path d="M200 56 C228 98 228 132 200 152 C172 132 172 98 200 56Z" />
            <path d="M200 78 C212 100 212 118 200 132 C188 118 188 100 200 78Z" strokeWidth="1.6" />
            <circle cx="200" cy="44" r="5" fill="#fffaf2" />
          </g>
        ))}
        {small.map((a) => (
          <g key={a} transform={`rotate(${a} 200 200)`}>
            <path d="M200 96 C210 112 210 124 200 132 C190 124 190 112 200 96Z" strokeWidth="1.6" />
          </g>
        ))}
      </g>
      <circle cx="200" cy="200" r="50" />
      <circle cx="200" cy="200" r="40" strokeDasharray="2 5" />
      <path d="M200 168 L232 200 L200 232 L168 200Z" />
      <path d="M200 180 L220 200 L200 220 L180 200Z" strokeWidth="1.6" />
      <circle cx="200" cy="200" r="7" fill="#fffaf2" />
    </svg>
  );
}

export function Bell({ className = "", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 60 150" aria-hidden="true">
      <line x1="30" y1="0" x2="30" y2="70" stroke="#b07d2a" strokeWidth="2" />
      {[14, 28, 42, 56].map((y) => (
        <circle key={y} cx="30" cy={y} r="3" fill="#c9962b" />
      ))}
      <path d="M30 70 C18 70 14 82 13 98 C12 112 8 116 6 120 L54 120 C52 116 48 112 47 98 C46 82 42 70 30 70Z" fill="url(#bellg)" />
      <rect x="4" y="118" width="52" height="6" rx="3" fill="#a8761f" />
      <circle cx="30" cy="132" r="6" fill="#a8761f" />
      <circle cx="30" cy="68" r="5" fill="#a8761f" />
      <defs>
        <linearGradient id="bellg" x1="0" x2="1">
          <stop offset="0" stopColor="#a8761f" />
          <stop offset=".45" stopColor="#f3cf73" />
          <stop offset="1" stopColor="#a8761f" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Diya({ className = "", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 80 70" aria-hidden="true">
      <path className="flame" d="M40 4 C46 16 50 24 40 34 C30 24 34 16 40 4Z" fill="url(#flameg)" />
      <ellipse cx="40" cy="30" rx="12" ry="6" fill="#ffcf5c" opacity=".35" />
      <path d="M6 40 Q40 36 74 40 Q68 64 40 64 Q12 64 6 40Z" fill="#b5451b" />
      <path d="M6 40 Q40 36 74 40 Q40 48 6 40Z" fill="#7a2410" />
      <path d="M16 52 Q40 58 64 52" stroke="#ffd99a" strokeWidth="1.5" fill="none" strokeDasharray="2 3" />
      <defs>
        <radialGradient id="flameg" cx=".5" cy=".75" r=".7">
          <stop offset="0" stopColor="#fff6c8" />
          <stop offset=".45" stopColor="#ffc23d" />
          <stop offset="1" stopColor="#e0631f" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function TempleSkyline({ className = "" }) {
  // पहाड़ों के बीच उत्तराखंड शैली का शिखर मंदिर
  return (
    <svg className={className} viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path d="M0 190 L150 90 L270 160 L430 40 L590 170 L740 80 L900 160 L1070 50 L1240 150 L1440 80 L1440 300 L0 300Z" fill="#d07a3a" opacity=".5" />
      <path d="M430 40 L400 82 L425 74 L445 88 L462 70Z M1070 50 L1040 90 L1065 82 L1085 95 L1100 78Z" fill="#fff4e0" opacity=".9" />
      {/* मंदिर */}
      <g transform="translate(660 70)">
        <line x1="60" y1="-34" x2="60" y2="6" stroke="#7a1f1f" strokeWidth="3" />
        <path d="M60 -34 L92 -24 L60 -14Z" fill="#e0731f" />
        <circle cx="60" cy="8" r="6" fill="#c9962b" />
        <path d="M60 12 C44 40 34 80 30 150 L90 150 C86 80 76 40 60 12Z" fill="#8f2f1f" />
        <path d="M38 60 L82 60 M35 85 L85 85 M32 110 L88 110" stroke="#c4542d" strokeWidth="3" />
        <path d="M0 150 L120 150 L120 160 L0 160Z" fill="#7a1f1f" />
        <path d="M10 160 L110 160 L110 230 L10 230Z" fill="#8f2f1f" />
        <path d="M44 230 L44 186 Q60 168 76 186 L76 230Z" fill="#3a0f0a" />
        <circle cx="60" cy="200" r="5" fill="#ffc23d" />
      </g>
      <path d="M0 230 L160 160 L340 220 L540 140 L700 210 L880 150 L1060 220 L1240 150 L1440 210 L1440 300 L0 300Z" fill="#8f2f1f" />
      <path d="M0 268 L240 236 L480 266 L720 232 L980 266 L1200 238 L1440 264 L1440 300 L0 300Z" fill="var(--bg)" />
    </svg>
  );
}

export function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span />
      <svg width="34" height="34" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="17" fill="none" stroke="#a5302a" strokeDasharray="2 3" />
        <path d="M20 8 C24 14 24 18 20 21 C16 18 16 14 20 8Z M20 32 C24 26 24 22 20 19 C16 22 16 26 20 32Z M8 20 C14 16 18 16 21 20 C18 24 14 24 8 20Z M32 20 C26 16 22 16 19 20 C22 24 26 24 32 20Z" fill="#a5302a" />
        <circle cx="20" cy="20" r="2.5" fill="#fffaf2" />
      </svg>
      <span />
    </div>
  );
}
