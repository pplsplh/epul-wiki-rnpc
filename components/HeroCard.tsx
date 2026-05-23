"use client";

import Image from "next/image";
import { Hero } from "@/types";
import { HeroBadge } from "./HeroBadge";
import { HeroAvatar } from "./HeroAvatar";
import { Sparkles, Plus } from "lucide-react";

interface HeroCardProps {
  hero: Hero;
  expanded?: boolean;
  owned?: boolean;
  isBase?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
}

const POSITION_LABEL: Record<string, string> = {
  front: "Depan",
  mid: "Tengah",
  back: "Belakang",
};

export function HeroCard({ hero, expanded = false, owned, isBase, onAdd, onRemove }: HeroCardProps) {
  const isOwned = owned !== undefined ? owned : hero.rarity === "owned";
  const showAction = !isBase && (onAdd || onRemove);

  if (expanded) {
    return (
      <div className={`
        h-full flex flex-col rounded-xl overflow-hidden border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5
        ${isOwned ? "border-sage/40" : "border-gold/30"}
      `}>
        {/* ── Header bar ── */}
        <div className={`px-3 py-1.5 flex items-center justify-between flex-shrink-0 ${isOwned ? "bg-sage/15" : "bg-gold/10"}`}>
          <span className="text-[9px] font-serif text-stone uppercase tracking-[0.2em]">
            Priority #{hero.priority}
          </span>
          <div className="flex items-center gap-1.5">
            <HeroBadge type={hero.type} />
            {isOwned ? (
              <span className="text-[9px] px-1.5 py-0.5 rounded-sm border border-sage/50 bg-sage/20 text-sage font-serif tracking-wider">
                OWNED
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-sm border border-gold bg-gold/40 text-white font-serif tracking-wider font-semibold">
                <Sparkles className="w-2 h-2" /> GACHA
              </span>
            )}
            {showAction && !isOwned && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd?.(); }}
                className="inline-flex items-center gap-0.5 text-[9px] font-serif text-sage border border-sage/40 bg-sage/10 hover:bg-sage/20 rounded px-1.5 py-0.5 transition-colors"
              >
                <Plus className="w-2.5 h-2.5" /> Dimiliki
              </button>
            )}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 bg-parchment min-h-0">
          {/* Portrait — self-stretch to fill card height */}
          <div
            className={`w-28 flex-shrink-0 relative self-stretch border-r ${isOwned ? "border-sage/20 bg-sage/5" : "border-gold/20 bg-gold/5"}`}
          >
            <Image
              src={`/images/heroes/banner/${hero.id}.jpg`}
              alt={hero.name}
              fill
              className="object-cover object-top"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-parchment/50 to-transparent pointer-events-none" />
          </div>

          {/* Info */}
          <div className="flex-1 p-2.5 min-w-0">
            {/* Name + title */}
            <p className="font-serif text-sm text-ink font-semibold leading-tight">{hero.name}</p>
            {hero.title && (
              <p className="text-[10px] text-ink-muted italic font-[var(--font-fell)] leading-tight mb-1.5">{hero.title}</p>
            )}

            {/* Fields */}
            <div className="border-t border-parchment-dark pt-1.5 space-y-0.5 mb-1.5">
              <div className="flex gap-1.5">
                <span className="text-[9px] text-stone font-serif w-10 flex-shrink-0 pt-0.5">Role</span>
                <span className="text-[9px] text-ink-muted leading-relaxed">{hero.role}</span>
              </div>
              <div className="flex gap-1.5">
                <span className="text-[9px] text-stone font-serif w-10 flex-shrink-0">Posisi</span>
                <span className="text-[9px] text-ink">{POSITION_LABEL[hero.position] ?? hero.position}</span>
              </div>
            </div>

            {/* Skills */}
            <div className="border-t border-parchment-dark pt-1.5 space-y-1">
              {hero.skills.map((skill, i) => (
                <div key={i} className="flex gap-1.5 items-start">
                  <span className="text-[9px] font-serif text-stone flex-shrink-0 w-5">Lv{skill.level}</span>
                  <p className="text-[9px] text-ink-muted leading-relaxed">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer stats ── */}
        {hero.stats && (
          <div className={`flex-shrink-0 border-t px-3 py-1.5 grid grid-cols-4 gap-1 ${isOwned ? "border-sage/20 bg-sage/5" : "border-gold/20 bg-gold/5"}`}>
            {[
              { label: "ATK", value: hero.stats.atk.toLocaleString() },
              { label: "DEF", value: hero.stats.def.toLocaleString() },
              { label: "HP",  value: hero.stats.hp.toLocaleString() },
              { label: "PWR", value: hero.stats.power.toLocaleString() },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-[8px] font-serif text-stone uppercase tracking-wider">{label}</p>
                <p className="text-[10px] font-serif text-ink font-medium">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ── Compact mode (non-roster) ── */
  return (
    <div
      className={`
        border border-parchment-dark rounded-lg p-4 transition-all duration-200
        hover:shadow-md hover:scale-[1.01] hover:-translate-y-0.5
        ${isOwned
          ? "bg-parchment border-l-2 border-l-sage hover:border-sage/60"
          : "bg-gold/5 border-l-2 border-l-gold hover:border-gold/60"}
      `}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <HeroAvatar hero={hero} size="sm" />
        <HeroBadge type={hero.type} />
        {isOwned ? (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-sage/40 bg-sage/10 text-sage font-serif tracking-wider">
            ✓ DIMILIKI
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-gold bg-gold/35 text-white font-serif tracking-wider font-semibold">
            <Sparkles className="w-3 h-3" /> GACHA
          </span>
        )}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-serif text-ink font-medium">{hero.name}</span>
          <span className="text-xs text-ink-muted italic font-[var(--font-fell)]">· {hero.role}</span>
        </div>
        {showAction && !isOwned && (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd?.(); }}
            className="ml-auto inline-flex items-center gap-1 text-[10px] font-serif text-sage border border-sage/40 bg-sage/10 hover:bg-sage/20 rounded px-2 py-0.5 transition-colors flex-shrink-0"
          >
            <Plus className="w-3 h-3" /> Dimiliki
          </button>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2 flex-wrap">
        {hero.stats && (
          <span className="text-[10px] font-serif text-stone bg-stone/10 border border-stone/20 rounded px-1.5 py-0.5">
            ⚔ {hero.stats.power.toLocaleString()}
          </span>
        )}
        <p className="text-sm text-ink-muted italic font-[var(--font-fell)] leading-relaxed flex-1">
          {hero.notes}
        </p>
      </div>
    </div>
  );
}
