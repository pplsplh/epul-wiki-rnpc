"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroes } from "@/data/heroes";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TYPE_TEXT: Record<string, string> = {
  Support: "text-silver",
  Fighter: "text-rose",
  Archer:  "text-frost",
  Tanker:  "text-sage",
};

const TYPE_BORDER: Record<string, string> = {
  Support: "border-silver/60",
  Fighter: "border-rose/60",
  Archer:  "border-frost/60",
  Tanker:  "border-sage/60",
};

const SHOWCASE = [...heroes].sort((a, b) => a.priority - b.priority);

const RUNE_POSITIONS = [
  { top: "12%", left:  "6%",   delay: "0s",   duration: "9s"  },
  { top: "28%", right: "10%",  delay: "2.5s", duration: "11s" },
  { top: "52%", left:  "2%",   delay: "5s",   duration: "8s"  },
  { top: "68%", right: "5%",   delay: "1s",   duration: "10s" },
  { top: "18%", left:  "52%",  delay: "3.5s", duration: "12s" },
  { top: "62%", left:  "38%",  delay: "7s",   duration: "9s"  },
  { top: "82%", right: "18%",  delay: "4s",   duration: "11s" },
  { top: "8%",  right: "28%",  delay: "6s",   duration: "8s"  },
];

export function HeroShowcase() {
  const [idx, setIdx]         = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef           = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number) => {
    setVisible(false);
    setTimeout(() => {
      setIdx(next);
      setVisible(true);
    }, 220);
  }, []);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIdx((prev) => {
        const next = (prev + 1) % SHOWCASE.length;
        setVisible(false);
        setTimeout(() => setVisible(true), 220);
        return next;
      });
    }, 4000);
  }, []);

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startInterval]);

  const navigate = (next: number) => { goTo(next); startInterval(); };

  const hero      = SHOWCASE[idx];
  const textColor = TYPE_TEXT[hero.type]   ?? "text-stone";
  const ringColor = TYPE_BORDER[hero.type] ?? "border-stone/60";

  return (
    <section className="relative min-h-screen overflow-hidden bg-ink">

      {/* ── Rune particles ── */}
      <div aria-hidden className="absolute inset-0 z-[2] pointer-events-none">
        {RUNE_POSITIONS.map(({ top, left, right, delay, duration }, i) => (
          <span
            key={i}
            className="absolute text-[9px] text-gold/25 select-none rune-float"
            style={{ top, left, right, animationDelay: delay, animationDuration: duration }}
          >✦</span>
        ))}
      </div>

      {/* ── Character art (fades on hero change) ── */}
      <div
        className="absolute inset-0 z-[1] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {/* Mobile: full-bleed bg */}
        <div className="md:hidden absolute inset-0">
          <Image
            src={`/images/${hero.id}.jpg`}
            alt={hero.name}
            fill
            className="object-cover object-[28%_top]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/30" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-parchment via-parchment/50 to-transparent" />
        </div>

        {/* Desktop: right 60% only */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-3/5">
          <Image
            src={`/images/${hero.id}.jpg`}
            alt={hero.name}
            fill
            className="object-cover object-left-top"
            priority
          />
          {/* left fade — covers left nav panel */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent" />
          {/* right fade — covers stats panel */}
          <div className="absolute inset-0 bg-gradient-to-l from-ink/70 via-ink/10 to-transparent" />
          {/* bottom fade — covers stars overlay, kept short so feet visible */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-parchment via-parchment/40 to-transparent" />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full md:w-2/5 px-8 md:px-12 lg:px-16 py-24">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-parchment/10 border border-gold/30 mb-10">
            <Star className="w-3 h-3 text-gold" />
            <span className="text-[10px] font-serif text-parchment/70 tracking-[0.25em] uppercase">
              Rellion · Adventurer's Codex
            </span>
          </div>

          {/* Animated hero info */}
          <div
            className="transition-all duration-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(6px)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[8px] ${textColor}`}>◆</span>
              <p className={`text-[10px] uppercase tracking-[0.3em] font-serif ${textColor}`}>
                {hero.type}
              </p>
            </div>

            <h2 className="font-[var(--font-cinzel-decorative)] text-5xl md:text-6xl lg:text-7xl text-parchment mb-2 leading-none tracking-wide">
              {hero.name}
            </h2>

            <div className="flex items-center gap-3 my-3">
              <div className="h-px flex-1 bg-parchment/15" />
              <span className="text-gold/50 text-[10px]">✦</span>
              <div className="h-px flex-1 bg-parchment/15" />
            </div>

            <p className="text-base text-parchment/45 italic font-[var(--font-fell)] mb-4">
              {hero.title}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-5">
              <div className={`inline-flex items-center px-3 py-1 rounded-full border ${ringColor} bg-parchment/5`}>
                <span className="text-xs font-serif text-parchment/65 tracking-wider">{hero.role}</span>
              </div>
              {hero.stats && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/25">
                  <span className="text-[9px] font-serif text-gold/60 uppercase tracking-wider">PWR</span>
                  <span className="font-[var(--font-orbitron)] text-[11px] text-gold/85">{hero.stats.power.toLocaleString()}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-parchment/40 font-[var(--font-fell)] italic leading-relaxed max-w-xs">
              {hero.notes}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-10 mb-8">
            <button
              onClick={() => navigate((idx - 1 + SHOWCASE.length) % SHOWCASE.length)}
              className="text-parchment/35 hover:text-parchment/70 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-1.5 items-center">
              {SHOWCASE.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === idx
                      ? "w-4 h-1.5 bg-gold"
                      : "w-1.5 h-1.5 bg-parchment/25 hover:bg-parchment/50"
                  }`}
                  aria-label={`Hero ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => navigate((idx + 1) % SHOWCASE.length)}
              className="text-parchment/35 hover:text-parchment/70 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/roster"
              className="inline-flex items-center gap-2 px-7 py-3 bg-gold hover:bg-gold/90 text-ink font-serif rounded-md transition-colors tracking-wide text-sm"
            >
              Browse the Roster <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="#roadmap"
              className="inline-flex items-center gap-2 px-5 py-3 border border-parchment/25 text-parchment/55 hover:text-parchment/90 hover:border-parchment/40 font-serif rounded-md transition-colors text-sm"
            >
              Read the Chronicles
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-parchment/25 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gold/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
