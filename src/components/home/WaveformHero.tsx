"use client";

import { useEffect, useRef } from "react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

export default function WaveformHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Pre-bake smoothed noise for the hand-drawn jitter — deterministic per x position
    const NOISE_LEN = 512;
    const noise = new Float32Array(NOISE_LEN);
    for (let i = 0; i < NOISE_LEN; i++) noise[i] = Math.random() * 2 - 1;
    // Smooth pass so it doesn't look like static
    for (let pass = 0; pass < 3; pass++) {
      for (let i = 1; i < NOISE_LEN - 1; i++) {
        noise[i] = (noise[i - 1] + noise[i] * 2 + noise[i + 1]) / 4;
      }
    }

    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (ts: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const t = ts * 0.00022; // very slow leftward drift

      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains("dark");

      const amplitude = h * 0.085;
      const wavelength = w * 0.36;
      const frequency = (2 * Math.PI) / wavelength;
      const cy = h * 0.67; // wave sits in lower half of hero

      // --- Oscilloscope grid (left ~48% of viewport, fades out) ---
      const gridRight = w * 0.48;
      const gridTop = cy - amplitude * 3;
      const gridBot = cy + amplitude * 3;
      const GRID_COLS = 6;
      const GRID_ROWS = 4;

      ctx.lineWidth = 0.5;

      for (let col = 0; col <= GRID_COLS; col++) {
        const gx = (gridRight / GRID_COLS) * col;
        const fade = 1 - smoothstep(gx / gridRight);
        ctx.beginPath();
        ctx.strokeStyle = isDark
          ? `rgba(255,255,255,${(0.08 * fade).toFixed(3)})`
          : `rgba(20,20,20,${(0.09 * fade).toFixed(3)})`;
        ctx.moveTo(gx, gridTop);
        ctx.lineTo(gx, gridBot);
        ctx.stroke();
      }

      for (let row = 0; row <= GRID_ROWS; row++) {
        const gy = gridTop + ((gridBot - gridTop) / GRID_ROWS) * row;
        ctx.beginPath();
        ctx.strokeStyle = isDark ? `rgba(255,255,255,0.05)` : `rgba(20,20,20,0.06)`;
        // Fade grid lines out toward center
        const grad = ctx.createLinearGradient(0, 0, gridRight * 0.9, 0);
        grad.addColorStop(0, isDark ? "rgba(255,255,255,0.05)" : "rgba(20,20,20,0.06)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.strokeStyle = grad;
        ctx.moveTo(0, gy);
        ctx.lineTo(gridRight * 0.9, gy);
        ctx.stroke();
      }

      // --- Waveform ---
      // Segment size: 5px — enough granularity for smooth color/width transitions
      const SEG = 5;

      for (let x = 0; x < w - SEG; x += SEG) {
        const p0 = x / w;
        const p1 = (x + SEG) / w;
        const pm = (p0 + p1) / 2;

        // Pure sine wave positions
        const y0 = cy + amplitude * Math.sin(frequency * x - t);
        const y1 = cy + amplitude * Math.sin(frequency * (x + SEG) - t);

        // Hand-drawn jitter: zero until ~55%, then ramps up quadratically
        const jitterAmt = Math.pow(Math.max(0, (pm - 0.55) / 0.45), 1.8) * 4.5;
        const ni = Math.floor(pm * NOISE_LEN) % NOISE_LEN;
        const j0 = noise[ni] * jitterAmt;
        const j1 = noise[(ni + 1) % NOISE_LEN] * jitterAmt;

        // Stroke width: thin (left) → slightly thicker (right)
        const lw = lerp(0.8, 2.3, smoothstep(pm));

        // Color transition: slate-gray → electric-blue → copper/amber
        let r: number, g: number, b: number, a: number;

        if (pm < 0.48) {
          // Slate gray → Electric blue
          const mix = smoothstep(pm / 0.48);
          r = isDark ? lerp(155, 47, mix) : lerp(91, 47, mix);
          g = isDark ? lerp(165, 109, mix) : lerp(100, 109, mix);
          b = isDark ? lerp(178, 142, mix) : lerp(112, 142, mix);
          a = isDark ? lerp(0.20, 0.32, mix) : lerp(0.16, 0.28, mix);
        } else {
          // Electric blue → Copper/amber
          const mix = smoothstep((pm - 0.48) / 0.52);
          r = lerp(47, 193, mix);
          g = lerp(109, 125, mix);
          b = lerp(142, 58, mix);
          a = isDark ? lerp(0.32, 0.20, mix) : lerp(0.28, 0.18, mix);
        }

        ctx.beginPath();
        ctx.moveTo(x, y0 + j0);
        ctx.lineTo(x + SEG, y1 + j1);
        ctx.strokeStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a.toFixed(2)})`;
        ctx.lineWidth = lw;
        ctx.lineCap = "round";
        ctx.stroke();
      }

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
