"use client";

import { phases } from "@/data/phases";

interface WorldMapProps {
  activeId: string | null;
  onSelect: (id: string) => void;
}

const SAGE  = "#7a9e8a";
const GOLD  = "#c4a44a";
const FROST = "#7090a0";
const STONE = "#8a8070";
const INK   = "#2a2420";
const PARCH = "#f0ead8";

const LOCS = [
  { id: "phase-1", x: 115, y: 305, phase: "I",   sub: "Early Game",  color: SAGE, idx: 0 },
  { id: "phase-2", x: 272, y: 215, phase: "II",  sub: "Mid Game",    color: GOLD, idx: 1 },
  { id: "phase-3", x: 432, y: 148, phase: "III", sub: "Late Game",   color: SAGE, idx: 2 },
  { id: "phase-4", x: 588, y: 72,  phase: "IV",  sub: "End Game",    color: GOLD, idx: 3 },
];

const PATH = "M 115,305 C 178,265 220,240 272,215 C 322,192 378,168 432,148 C 486,130 538,94 588,72";

// Simple tree shape
function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <polygon points={`${x},${y - 9 * s} ${x - 5 * s},${y} ${x + 5 * s},${y}`} fill={SAGE} opacity="0.22" />;
}

// Simple mountain shape
function Mountain({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <polygon points={`${x},${y - 14 * s} ${x - 10 * s},${y} ${x + 10 * s},${y}`} fill={STONE} opacity="0.18" />;
}

export function WorldMap({ activeId, onSelect }: WorldMapProps) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-parchment-dark shadow-lg">
      <svg
        viewBox="0 0 700 390"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        style={{ fontFamily: "Cinzel, serif", display: "block" }}
      >
        <defs>
          <radialGradient id="parchBg" cx="50%" cy="50%" r="75%">
            <stop offset="0%"   stopColor="#f5f0e5" />
            <stop offset="100%" stopColor="#e2d8c4" />
          </radialGradient>
          <radialGradient id="vignette" cx="50%" cy="50%" r="65%">
            <stop offset="55%"  stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(42,36,32,0.18)" />
          </radialGradient>
          <filter id="loc-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect width="700" height="390" fill="url(#parchBg)" />

        {/* Grid */}
        <g stroke={STONE} strokeWidth="0.4" opacity="0.12">
          {[50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650].map(x =>
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="390" />
          )}
          {[50, 100, 150, 200, 250, 300, 350].map(y =>
            <line key={`h${y}`} x1="0" y1={y} x2="700" y2={y} />
          )}
        </g>

        {/* Vignette */}
        <rect width="700" height="390" fill="url(#vignette)" pointerEvents="none" />

        {/* Outer border */}
        <rect x="10" y="10" width="680" height="370" fill="none" stroke={STONE} strokeWidth="1.5" opacity="0.45" />
        <rect x="15" y="15" width="670" height="360" fill="none" stroke={STONE} strokeWidth="0.5" opacity="0.25" />

        {/* Corner ornaments */}
        {[[16,16],[684,16],[16,374],[684,374]].map(([cx,cy],i) => (
          <g key={i} transform={`translate(${cx},${cy})`}>
            <circle r="5" fill="none" stroke={STONE} strokeWidth="1" opacity="0.4" />
            <circle r="1.5" fill={STONE} opacity="0.35" />
          </g>
        ))}

        {/* Title */}
        <text x="350" y="36" textAnchor="middle" fontSize="10" fill={INK} opacity="0.5" letterSpacing="4">
          RELLION · WORLD MAP
        </text>
        <line x1="100" y1="41" x2="260" y2="41" stroke={STONE} strokeWidth="0.5" opacity="0.35" />
        <line x1="440" y1="41" x2="600" y2="41" stroke={STONE} strokeWidth="0.5" opacity="0.35" />

        {/* Sea hatching — left edge */}
        <g stroke={FROST} strokeWidth="0.7" fill="none" opacity="0.18">
          {[270, 290, 310, 330, 350].map((y, i) => (
            <path key={i} d={`M 18,${y} Q 26,${y-4} 34,${y} Q 42,${y+4} 50,${y}`} />
          ))}
        </g>

        {/* Terrain — forest near Phase I */}
        <Tree x={55}  y={340} s={1.1} />
        <Tree x={68}  y={328} />
        <Tree x={44}  y={328} />
        <Tree x={57}  y={316} s={0.9} />
        <Tree x={78}  y={335} />
        <Tree x={36}  y={342} s={0.8} />
        <Tree x={70}  y={318} s={0.85} />

        {/* Terrain — small hills between I and II */}
        <Mountain x={180} y={265} s={0.8} />
        <Mountain x={200} y={258} s={0.65} />

        {/* Terrain — mountains near III and IV */}
        <Mountain x={480} y={188} />
        <Mountain x={498} y={177} s={0.8} />
        <Mountain x={516} y={190} s={0.9} />
        <Mountain x={545} y={162} s={1.1} />
        <Mountain x={563} y={152} s={0.85} />
        <Mountain x={618} y={118} />
        <Mountain x={636} y={107} s={1.2} />
        <Mountain x={655} y={122} s={0.8} />

        {/* Road shadow */}
        <path d={PATH} stroke={STONE} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.08" />
        {/* Road base */}
        <path d={PATH} stroke={PARCH} strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.75" />
        {/* Marching ants */}
        <path
          d={PATH}
          stroke={GOLD}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.65"
          className="map-path-appear"
        />

        {/* Location markers */}
        {LOCS.map((loc) => {
          const isActive = activeId === loc.id;
          const phase    = phases[loc.idx];
          const shortTitle = phase?.title?.split(" ").slice(0, 3).join(" ") ?? loc.sub;
          const labelAbove = loc.y > 200;
          const labelY     = labelAbove ? loc.y - 36 : loc.y + 43;
          const anchor     = loc.x > 600 ? "end" : loc.x < 100 ? "start" : "middle";
          const labelX     = loc.x > 600 ? loc.x + 4 : loc.x;

          return (
            <g key={loc.id} style={{ cursor: "pointer" }} onClick={() => onSelect(loc.id)}>
              {/* Invisible bigger hit target */}
              <circle cx={loc.x} cy={loc.y} r="30" fill="transparent" />

              {/* Outer pulse ring */}
              <circle
                cx={loc.x} cy={loc.y} r="24"
                fill={loc.color}
                className={isActive ? "map-loc-pulse-active" : "map-loc-pulse"}
              />

              {/* Middle ring */}
              <circle
                cx={loc.x} cy={loc.y} r="17"
                fill="none"
                stroke={loc.color}
                strokeWidth={isActive ? 2 : 1.5}
                opacity={isActive ? 0.9 : 0.45}
              />

              {/* Inner circle */}
              <circle
                cx={loc.x} cy={loc.y} r="13"
                fill={isActive ? loc.color : PARCH}
                stroke={loc.color}
                strokeWidth="1.5"
                filter={isActive ? "url(#loc-glow)" : undefined}
              />

              {/* Phase numeral */}
              <text
                x={loc.x} y={loc.y + 4}
                textAnchor="middle"
                fontSize={loc.phase.length > 2 ? "7" : "8"}
                fontWeight="bold"
                fill={isActive ? PARCH : loc.color}
                letterSpacing="0.5"
                style={{ userSelect: "none" }}
              >
                {loc.phase}
              </text>

              {/* Sub label (Early/Mid/Late/End Game) */}
              <text
                x={loc.x} y={loc.y + 30}
                textAnchor="middle"
                fontSize="7"
                fill={loc.color}
                fontWeight="bold"
                letterSpacing="0.8"
                opacity={isActive ? 1 : 0.7}
                style={{ userSelect: "none" }}
              >
                {loc.sub.toUpperCase()}
              </text>

              {/* Phase title (italic, shown above/below) */}
              <text
                x={labelX} y={labelY}
                textAnchor={anchor}
                fontSize="7.5"
                fill={isActive ? loc.color : INK}
                opacity={isActive ? 0.95 : 0.5}
                fontStyle="italic"
                style={{ userSelect: "none" }}
              >
                {shortTitle}
              </text>
            </g>
          );
        })}

        {/* Compass rose — bottom right */}
        <g transform="translate(648, 345)" opacity="0.45">
          <circle r="18" fill="none" stroke={STONE} strokeWidth="1" />
          <circle r="13" fill="none" stroke={STONE} strokeWidth="0.5" />
          <line x1="0" y1="-18" x2="0" y2="18" stroke={STONE} strokeWidth="1" />
          <line x1="-18" y1="0" x2="18" y2="0" stroke={STONE} strokeWidth="1" />
          <line x1="-12" y1="-12" x2="12" y2="12" stroke={STONE} strokeWidth="0.5" />
          <line x1="12" y1="-12" x2="-12" y2="12" stroke={STONE} strokeWidth="0.5" />
          <polygon points="0,-16 -4,-6 4,-6" fill={STONE} />
          <text x="0" y="-21" textAnchor="middle" fontSize="7" fill={STONE} fontWeight="bold" letterSpacing="1">N</text>
        </g>

        {/* Vignette on top */}
        <rect width="700" height="390" fill="url(#vignette)" pointerEvents="none" />
      </svg>
    </div>
  );
}
