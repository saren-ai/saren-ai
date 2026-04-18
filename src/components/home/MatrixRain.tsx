"use client";

import { useEffect, useRef } from "react";

// Half-width katakana (Matrix-authentic range) + full katakana + hiragana + digits
const CHARS =
  "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ" +
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん" +
  "0123456789";

const CHAR_LIST = [...CHARS]; // split on codepoints, not bytes
const FONT_SIZE = 14; // px — character cell height

// Brand color palette: [light-mode hex, dark-mode hex]
// Weighted: Electric Blue dominant, Copper secondary, Ember Red accent
const PALETTE: [string, string][] = [
  ["#7C5AA3", "#B57EDC"], // Electric Blue
  ["#7C5AA3", "#B57EDC"],
  ["#7C5AA3", "#B57EDC"],
  ["#7C5AA3", "#B57EDC"],
  ["#C17D3A", "#D4A574"], // Copper
  ["#C17D3A", "#D4A574"],
  ["#C43322", "#E34234"], // Ember Red
];

type Column = {
  step: number;        // current lead row (integer)
  ticker: number;      // frames elapsed since last advance
  frameDelay: number;  // frames per row advance
  streamLen: number;   // trail length in rows
  colorIdx: number;
  startTick: number;   // global tick when this column activates
};

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    let cols: Column[] = [];
    let totalRows = 0;
    let globalTick = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const numCols = Math.floor(canvas.offsetWidth / FONT_SIZE);
      totalRows = Math.ceil(canvas.offsetHeight / FONT_SIZE) + 2;

      cols = Array.from({ length: numCols }, () => makeCol(totalRows, globalTick, true));
    };

    const makeCol = (rows: number, tick: number, initial = false): Column => ({
      step: initial ? Math.floor(Math.random() * rows) : 0,
      ticker: 0,
      frameDelay: 6 + Math.floor(Math.random() * 12), // 6–17 frames/row = varied speeds
      streamLen: 6 + Math.floor(Math.random() * 14),  // 6–19 char trail
      colorIdx: Math.floor(Math.random() * PALETTE.length),
      startTick: tick + (initial ? 0 : Math.floor(Math.random() * 120)), // stagger restarts
    });

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const isDark = document.documentElement.classList.contains("dark");

      ctx.clearRect(0, 0, w, h);
      ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";
      ctx.textAlign = "center";

      globalTick++;

      cols.forEach((col, ci) => {
        // Not active yet — skip
        if (globalTick < col.startTick) return;

        const x = ci * FONT_SIZE + FONT_SIZE / 2;
        const [lightHex, darkHex] = PALETTE[col.colorIdx];
        const hex = isDark ? darkHex : lightHex;

        // Advance step on this column's schedule
        col.ticker++;
        if (col.ticker >= col.frameDelay) {
          col.ticker = 0;
          col.step++;
        }

        // Draw trail: from lead row backward
        for (let j = 0; j <= col.streamLen; j++) {
          const row = col.step - j;
          const y = row * FONT_SIZE;
          if (y < -FONT_SIZE || y > h) continue;

          const char = CHAR_LIST[Math.floor(Math.random() * CHAR_LIST.length)];

          let alpha: number;
          if (j === 0) {
            // Lead: brightest
            alpha = isDark ? 0.45 : 0.35;
          } else {
            // Trail: quadratic fade
            const t = 1 - j / col.streamLen;
            alpha = (isDark ? 0.20 : 0.15) * (t * t);
          }

          ctx.globalAlpha = alpha;
          ctx.fillStyle = hex;
          ctx.fillText(char, x, y);
        }

        // Reset column when lead has scrolled past the full trail
        if (col.step * FONT_SIZE > h + col.streamLen * FONT_SIZE) {
          cols[ci] = makeCol(totalRows, globalTick);
        }
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
