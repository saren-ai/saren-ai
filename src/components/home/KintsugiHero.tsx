"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ── Geometry ──────────────────────────────────────────────────────────────────
// viewBox: 0 0 280 440
// Vessel is a tokkuri-ish flask, hand-drawn asymmetric (wabi-sabi)
const VESSEL_D = `
  M 125,15
  C 118,15 114,26 114,50
  C 114,72 118,84 120,95
  C 108,112 80,134 64,165
  C 46,198 42,240 44,280
  C 44,320 56,360 76,388
  C 90,408 112,420 136,424
  L 148,424
  C 170,420 192,408 204,394
  C 224,364 236,324 234,282
  C 236,240 228,200 214,168
  C 200,138 178,114 162,96
  C 164,85 166,72 166,50
  C 166,26 162,15 155,15
  C 150,12 130,12 125,15
  Z
`;

// Network junction nodes — where veins meet (signal routing points)
const NODES: { id: string; cx: number; cy: number }[] = [
  { id: "a", cx: 115, cy: 155 }, // left shoulder
  { id: "b", cx: 184, cy: 147 }, // right shoulder (slightly higher — asymmetric)
  { id: "c", cx: 80,  cy: 242 }, // left mid
  { id: "d", cx: 158, cy: 210 }, // center hub
  { id: "e", cx: 216, cy: 260 }, // right mid
  { id: "f", cx: 98,  cy: 325 }, // left lower
  { id: "g", cx: 178, cy: 310 }, // right lower
  { id: "h", cx: 142, cy: 388 }, // base convergence
];

// Gold kintsugi veins — organic bezier paths that trace network signal flows.
// The fractures became the infrastructure.
const VEINS: { id: string; d: string; w: number; delay: number }[] = [
  // Primary structural veins
  { id: "v1",  d: "M 115,155 Q 150,144 184,147", w: 1.5, delay: 0.0 }, // a→b across shoulders
  { id: "v2",  d: "M 115,155 Q 94,197 80,242",   w: 1.5, delay: 0.3 }, // a→c down-left
  { id: "v3",  d: "M 184,147 Q 174,178 158,210", w: 1.4, delay: 0.5 }, // b→d diagonal
  { id: "v4",  d: "M 80,242 Q 118,224 158,210",  w: 1.3, delay: 0.8 }, // c→d across
  { id: "v5",  d: "M 158,210 Q 189,234 216,260", w: 1.4, delay: 1.0 }, // d→e right
  { id: "v6",  d: "M 80,242 Q 86,282 98,325",    w: 1.3, delay: 1.2 }, // c→f down
  { id: "v7",  d: "M 158,210 Q 164,260 178,310", w: 1.5, delay: 1.4 }, // d→g down
  { id: "v8",  d: "M 216,260 Q 200,284 178,310", w: 1.3, delay: 1.6 }, // e→g converge
  { id: "v9",  d: "M 98,325 Q 118,358 142,388",  w: 1.4, delay: 1.8 }, // f→h base
  { id: "v10", d: "M 178,310 Q 162,350 142,388", w: 1.4, delay: 2.0 }, // g→h base
  // Minor branching veins
  { id: "v11", d: "M 115,155 Q 138,183 158,210", w: 0.7, delay: 0.6 }, // a→d shortcut
  { id: "v12", d: "M 158,210 Q 128,267 98,325",  w: 0.7, delay: 1.5 }, // d→f diagonal
];

// Pre-computed pulse timing — avoids Math.random() hydration mismatches
const PULSE_CFG = [
  { d: 2.2, r: 5.5 }, { d: 3.1, r: 6.2 }, { d: 2.9, r: 5.8 },
  { d: 3.8, r: 7.0 }, { d: 3.5, r: 6.5 }, { d: 4.2, r: 8.0 },
  { d: 4.0, r: 7.5 }, { d: 4.8, r: 9.0 }, { d: 4.5, r: 8.5 },
  { d: 5.0, r: 9.5 }, { d: 3.2, r: 7.0 }, { d: 4.1, r: 8.0 },
];

// ── Sub-component ─────────────────────────────────────────────────────────────

function VeinPath({
  d, w, delay, index, reduced,
}: {
  d: string; w: number; delay: number; index: number; reduced: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const PULSE = 16;
  const cfg = PULSE_CFG[index] ?? { d: 3.0, r: 6.0 };

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (pathRef.current) setLen(Math.ceil(pathRef.current.getTotalLength()));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <g>
      {/* Base vein — draws in on mount */}
      <motion.path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="url(#kintsugiGold)"
        strokeWidth={w}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 1.1, delay, ease: [0.25, 0.1, 0.25, 1] },
          opacity: { duration: 0.15, delay },
        }}
      />

      {/* Traveling signal pulse */}
      {!reduced && len > 0 && (
        <motion.path
          d={d}
          fill="none"
          stroke="#F0D090"
          strokeWidth={w + 0.8}
          strokeLinecap="round"
          strokeDasharray={`${PULSE} ${len + PULSE}`}
          initial={{ opacity: 0, strokeDashoffset: 0 }}
          animate={{ opacity: 1, strokeDashoffset: [0, -(len + PULSE)] }}
          transition={{
            opacity: { duration: 0.05, delay: cfg.d },
            strokeDashoffset: {
              duration: 1.8,
              delay: cfg.d,
              repeat: Infinity,
              repeatDelay: cfg.r,
              ease: "linear",
            },
          }}
        />
      )}
    </g>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function KintsugiHero() {
  const reduced = useReducedMotion() ?? false;

  return (
    <div
      className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Nudge vessel down so the base is gently cropped — feels grounded */}
      <div className="translate-y-[12%]">
        <svg
          viewBox="0 0 280 440"
          width={238}
          height={374}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dark ceramic body gradient */}
            <linearGradient
              id="ceramicFill"
              x1="140" y1="15" x2="140" y2="424"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%"   stopColor="#28282E" />
              <stop offset="40%"  stopColor="#1C1C22" />
              <stop offset="100%" stopColor="#111114" />
            </linearGradient>

            {/* Specular sheen — offset left-center, like raku glaze catch */}
            <radialGradient
              id="ceramicSheen"
              cx="32%" cy="28%" r="38%"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%"   stopColor="#3E3E4A" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#1C1C22" stopOpacity="0"    />
            </radialGradient>

            {/* Gold vein color — amber warming into copper */}
            <linearGradient
              id="kintsugiGold"
              x1="0" y1="0" x2="1" y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%"   stopColor="#B8722A" />
              <stop offset="50%"  stopColor="#D4942A" />
              <stop offset="100%" stopColor="#C17D3A" />
            </linearGradient>
          </defs>

          {/* ── Vessel silhouette ── */}
          <motion.path
            d={VESSEL_D}
            fill="url(#ceramicFill)"
            opacity={0.18}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 0.18, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transformOrigin: "140px 220px" }}
          />

          {/* Glaze sheen */}
          <motion.path
            d={VESSEL_D}
            fill="url(#ceramicSheen)"
            opacity={0}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 1.4, delay: 0.3 }}
          />

          {/* Neck highlight — thin specular line along left edge */}
          <motion.path
            d="M 118,22 C 116,34 115,48 116,64"
            stroke="#3C3C48"
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
            opacity={0}
            animate={{ opacity: 0.45 }}
            transition={{ duration: 1.0, delay: 0.5 }}
          />

          {/* ── Gold kintsugi network veins ── */}
          {VEINS.map((v, i) => (
            <VeinPath
              key={v.id}
              d={v.d}
              w={v.w}
              delay={v.delay}
              index={i}
              reduced={reduced}
            />
          ))}

          {/* ── Network junction nodes ── */}
          {NODES.map((n, i) => (
            <motion.circle
              key={n.id}
              cx={n.cx}
              cy={n.cy}
              r={2.4}
              fill="#D4942A"
              opacity={0}
              animate={{ opacity: 0.6 }}
              transition={{
                delay: 0.9 + i * 0.14,
                duration: 0.4,
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
