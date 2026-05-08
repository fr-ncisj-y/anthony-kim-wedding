// Pure CSS animations — no 'use client' needed

const C = {
  petalOuter: '#B0CCDE',
  petalMid:   '#94BAD0',
  petalInner: '#7AAAC6',
  leafDark:   '#627E7A',
  leafMid:    '#7A9E9A',
  leafLight:  '#96B4A8',
  branch:     '#B8A472',
  berry:      '#354A62',
  centerOut:  '#E09060',
  centerIn:   '#C87040',
  smFlower:   '#8AAEC8',
  mdFlower:   '#9ABDD6',
};

const FX = 210;
const FY = 200;

// Branches: each draws via stroke-dashoffset
const BRANCHES = [
  { d: `M ${FX},${FY+8} C 176,228 142,252 104,270`,   sw: 1.8, delay: 0.00 },
  { d: `M ${FX},${FY+8} C 246,228 278,250 316,268`,   sw: 1.8, delay: 0.05 },
  { d: `M ${FX},${FY}   C 188,182 162,162 130,140`,   sw: 1.5, delay: 0.10 },
  { d: `M ${FX},${FY}   C 234,182 260,160 286,138`,   sw: 1.5, delay: 0.12 },
  { d: `M 156,244 C 138,252 120,258 104,264`,          sw: 1.2, delay: 0.20 },
  { d: `M 262,242 C 280,250 296,256 312,262`,          sw: 1.2, delay: 0.22 },
];

// Leaves: ellipse at position, rotated
const LEAVES = [
  // Lower-left cluster
  { cx: 90,  cy: 272, rx: 13, ry: 30, rot: -148, c: C.leafDark,  op: 0.90, delay: 0.38 },
  { cx: 112, cy: 256, rx: 10, ry: 23, rot: -162, c: C.leafMid,   op: 0.82, delay: 0.46 },
  { cx: 105, cy: 258, rx:  8, ry: 19, rot: -135, c: C.leafLight, op: 0.70, delay: 0.52 },
  // Lower-right cluster
  { cx: 316, cy: 268, rx: 13, ry: 30, rot:  -32, c: C.leafDark,  op: 0.90, delay: 0.40 },
  { cx: 294, cy: 254, rx: 10, ry: 23, rot:  -18, c: C.leafMid,   op: 0.82, delay: 0.48 },
  { cx: 306, cy: 258, rx:  8, ry: 18, rot:  -45, c: C.leafLight, op: 0.70, delay: 0.54 },
  // Upper-left
  { cx: 124, cy: 144, rx: 11, ry: 25, rot:  -32, c: C.leafMid,   op: 0.86, delay: 0.28 },
  { cx: 148, cy: 170, rx: 16, ry: 36, rot:  -44, c: C.leafLight, op: 0.62, delay: 0.20 },
  // Upper-right
  { cx: 282, cy: 142, rx: 11, ry: 25, rot:   32, c: C.leafDark,  op: 0.86, delay: 0.30 },
  { cx: 264, cy: 166, rx: 15, ry: 34, rot:   44, c: C.leafLight, op: 0.62, delay: 0.22 },
];

// Berry clusters
const BERRIES_L = [
  { x: 94,  y: 284 }, { x: 102, y: 278 }, { x: 89,  y: 276 },
  { x: 100, y: 290 }, { x: 108, y: 286 },
];
const BERRIES_R = [
  { x: 314, y: 280 }, { x: 321, y: 274 }, { x: 307, y: 272 },
  { x: 318, y: 286 }, { x: 325, y: 282 },
];

// Medium flowers (8-petal)
const MD_FLOWERS = [
  { cx: 132, cy: 146, petalR: 32, c: C.mdFlower,  delay: 0.95 },
  { cx: 270, cy: 140, petalR: 28, c: C.mdFlower,  delay: 1.00 },
];

// Small flowers (6-petal)
const SM_FLOWERS = [
  { cx: 116, cy: 184, petalR: 14, c: C.smFlower, delay: 1.15 },
  { cx: 296, cy: 160, petalR: 12, c: C.smFlower, delay: 1.22 },
  { cx: 166, cy: 308, petalR: 11, c: C.smFlower, delay: 1.30 },
];

type PetalProps = {
  path: string; fill: string; opacity: number;
  angle: number; tx: number; ty: number;
  delay: number; cls: string;
};

function Petal({ path, fill, opacity, angle, tx, ty, delay, cls }: PetalProps) {
  return (
    <path
      d={path}
      fill={fill}
      opacity={opacity}
      transform={`translate(${tx},${ty}) rotate(${angle})`}
      className={cls}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

export default function FloralBouquet({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>{STYLES}</style>

      <g className="fb-root">

        {/* ── BRANCHES ── */}
        {BRANCHES.map((b, i) => (
          <path
            key={i} d={b.d}
            stroke={C.branch} strokeWidth={b.sw} strokeLinecap="round"
            pathLength="1"
            className="fb-branch"
            style={{ animationDelay: `${b.delay}s` }}
          />
        ))}

        {/* ── LEAVES ── */}
        {LEAVES.map((l, i) => (
          <ellipse
            key={i}
            cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry}
            fill={l.c} opacity={l.op}
            transform={`rotate(${l.rot},${l.cx},${l.cy})`}
            className="fb-leaf"
            style={{ animationDelay: `${l.delay}s` }}
          />
        ))}

        {/* ── BERRIES ── */}
        {[...BERRIES_L, ...BERRIES_R].map((p, i) => (
          <circle
            key={i} cx={p.x} cy={p.y} r={3.4}
            fill={C.berry} opacity={0.82}
            className="fb-berry"
            style={{ animationDelay: `${0.70 + i * 0.05}s` }}
          />
        ))}

        {/* ── MEDIUM FLOWERS ── */}
        {MD_FLOWERS.map((f, fi) =>
          [0,45,90,135,180,225,270,315].map((angle, i) => (
            <Petal key={`md-${fi}-${i}`}
              path="M 0,0 C -11,-10 -13,-27 0,-38 C 13,-27 11,-10 0,0"
              fill={f.c} opacity={0.84}
              angle={angle} tx={f.cx} ty={f.cy}
              delay={f.delay + i * 0.04} cls="fb-petal"
            />
          ))
        )}
        {MD_FLOWERS.map((f, i) => (
          <circle key={i} cx={f.cx} cy={f.cy} r={7}
            fill={C.centerOut} opacity={0.95}
            className="fb-pop"
            style={{ animationDelay: `${f.delay + 0.38}s` }}
          />
        ))}

        {/* ── SMALL FLOWERS ── */}
        {SM_FLOWERS.map((f, fi) =>
          [0,60,120,180,240,300].map((angle, i) => (
            <ellipse key={`sm-${fi}-${i}`}
              cx={0} cy={-(f.petalR * 0.65)}
              rx={f.petalR * 0.38} ry={f.petalR * 0.70}
              fill={f.c} opacity={0.78}
              transform={`translate(${f.cx},${f.cy}) rotate(${angle})`}
              className="fb-petal"
              style={{ animationDelay: `${f.delay + i * 0.05}s` }}
            />
          ))
        )}
        {SM_FLOWERS.map((f, i) => (
          <circle key={i} cx={f.cx} cy={f.cy} r={4.5}
            fill={C.centerOut} opacity={0.92}
            className="fb-pop"
            style={{ animationDelay: `${f.delay + 0.38}s` }}
          />
        ))}

        {/* ── MAIN FLOWER — OUTER PETALS ── */}
        {[0,45,90,135,180,225,270,315].map((angle, i) => (
          <Petal key={`op-${i}`}
            path="M 0,0 C -24,-16 -30,-50 0,-72 C 30,-50 24,-16 0,0"
            fill={C.petalOuter} opacity={0.76}
            angle={angle} tx={FX} ty={FY}
            delay={1.52 + i * 0.06} cls="fb-petal"
          />
        ))}

        {/* ── MAIN FLOWER — MID PETALS (offset 22.5°) ── */}
        {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((angle, i) => (
          <Petal key={`mp-${i}`}
            path="M 0,0 C -18,-14 -22,-42 0,-60 C 22,-42 18,-14 0,0"
            fill={C.petalMid} opacity={0.84}
            angle={angle} tx={FX} ty={FY}
            delay={1.58 + i * 0.055} cls="fb-petal"
          />
        ))}

        {/* ── MAIN FLOWER — INNER PETALS (offset 11.25°) ── */}
        {[11.25,56.25,101.25,146.25,191.25,236.25,281.25,326.25].map((angle, i) => (
          <Petal key={`ip-${i}`}
            path="M 0,0 C -12,-11 -14,-30 0,-42 C 14,-30 12,-11 0,0"
            fill={C.petalInner} opacity={0.90}
            angle={angle} tx={FX} ty={FY}
            delay={1.64 + i * 0.05} cls="fb-petal"
          />
        ))}

        {/* ── CENTER ── */}
        <circle cx={FX} cy={FY} r={15} fill={C.centerOut} opacity={0.96}
          className="fb-pop" style={{ animationDelay: '2.18s' }} />
        <circle cx={FX} cy={FY} r={9}  fill={C.centerIn}  opacity={0.92}
          className="fb-pop" style={{ animationDelay: '2.28s' }} />
        {/* Center stamens */}
        {[0,60,120,180,240,300].map((a, i) => {
          const rad = (a * Math.PI) / 180;
          return (
            <circle key={i}
              cx={FX + 11 * Math.cos(rad)}
              cy={FY + 11 * Math.sin(rad)}
              r={1.8} fill={C.berry}
              className="fb-berry"
              style={{ animationDelay: `${2.32 + i * 0.05}s` }}
            />
          );
        })}
      </g>
    </svg>
  );
}

const STYLES = `
  .fb-root {
    animation: fb-float 8s ease-in-out 3.4s infinite;
    transform-origin: ${FX}px ${FY}px;
  }
  .fb-petal {
    transform-box: fill-box;
    transform-origin: center bottom;
    animation: fb-bloom 0.55s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .fb-leaf {
    transform-box: fill-box;
    transform-origin: center;
    animation: fb-bloom 0.60s cubic-bezier(0.34,1.20,0.64,1) both;
  }
  .fb-pop {
    transform-box: fill-box;
    transform-origin: center;
    animation: fb-bloom 0.40s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .fb-berry {
    transform-box: fill-box;
    transform-origin: center;
    animation: fb-bloom 0.28s cubic-bezier(0.34,1.80,0.64,1) both;
  }
  .fb-branch {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: fb-draw 0.70s cubic-bezier(0.4,0,0.2,1) both;
  }
  @keyframes fb-bloom {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }
  @keyframes fb-draw {
    from { stroke-dashoffset: 1; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes fb-float {
    0%,100% { transform: translateY(0px)   rotate(0deg);   }
    38%     { transform: translateY(-7px)  rotate(0.6deg); }
    72%     { transform: translateY(-4px)  rotate(-0.4deg);}
  }
`;
