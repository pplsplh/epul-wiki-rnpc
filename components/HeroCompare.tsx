"use client";

import { useState } from "react";
import { heroes, getHeroById } from "@/data/heroes";
import { synergyRules } from "@/data/synergies";
import { getHeroSynergies } from "@/lib/synergy";
import { Hero } from "@/types";
import { HeroAvatar } from "./HeroAvatar";
import { HeroBadge } from "./HeroBadge";
import { ChevronDown } from "lucide-react";

const STAT_LABELS = [
  { key: "power",      label: "Power",       suffix: "" },
  { key: "atk",        label: "ATK",         suffix: "" },
  { key: "def",        label: "DEF",         suffix: "" },
  { key: "hp",         label: "HP",          suffix: "" },
  { key: "critChance", label: "CRIT Chance", suffix: "%" },
  { key: "critDmg",    label: "CRIT DMG",    suffix: "%" },
  { key: "atkSpeed",   label: "ATK Speed",   suffix: "%" },
  { key: "moveSpeed",  label: "Move Speed",  suffix: "%" },
] as const;

type StatKey = typeof STAT_LABELS[number]["key"];

const RATING_BADGE: Record<string, string> = {
  S: "bg-gold text-ink",
  A: "bg-sage text-parchment",
  B: "bg-frost text-parchment",
  C: "bg-stone text-parchment",
};

const heroesWithStats = heroes.filter((h) => h.stats);

function HeroPicker({ selected, onChange, exclude }: {
  selected: Hero | null;
  onChange: (h: Hero | null) => void;
  exclude?: string;
}) {
  const [open, setOpen] = useState(false);
  const options = heroesWithStats.filter((h) => h.id !== exclude);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-3 border border-parchment-dark rounded-xl bg-parchment hover:border-gold/50 transition-all"
      >
        {selected ? (
          <>
            <HeroAvatar hero={selected} size="md" />
            <div className="flex-1 text-left min-w-0">
              <p className="font-serif text-ink font-medium">{selected.name}</p>
              <p className="text-xs text-ink-muted">{selected.role}</p>
            </div>
          </>
        ) : (
          <div className="flex-1 text-left">
            <p className="font-serif text-ink-muted text-sm">Pilih hero...</p>
          </div>
        )}
        <ChevronDown className={`w-4 h-4 text-ink-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-parchment border border-parchment-dark rounded-xl shadow-lg overflow-hidden max-h-64 overflow-y-auto">
          <button
            onClick={() => { onChange(null); setOpen(false); }}
            className="w-full text-left px-4 py-2.5 text-xs text-stone font-serif hover:bg-parchment-dark transition-colors border-b border-parchment-dark"
          >
            — Kosongkan
          </button>
          {options.map((h) => (
            <button
              key={h.id}
              onClick={() => { onChange(h); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-parchment-dark transition-colors ${
                selected?.id === h.id ? "bg-gold/10" : ""
              }`}
            >
              <HeroAvatar hero={h} size="sm" />
              <div className="flex-1 text-left min-w-0">
                <p className="font-serif text-sm text-ink">{h.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <HeroBadge type={h.type} />
                </div>
              </div>
              <span className="text-[10px] text-stone font-serif">
                ⚔ {h.stats!.power.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SkillsColumn({ hero }: { hero: Hero | null }) {
  if (!hero) return <div className="p-3 text-center text-xs text-stone italic">—</div>;
  return (
    <div className="p-3 space-y-2.5">
      {hero.skills.map((sk, i) => (
        <div key={i} className="flex gap-2 items-start">
          <span className="text-[10px] text-stone font-serif flex-shrink-0 mt-0.5 w-6">Lv{sk.level}</span>
          <p className="text-xs text-ink-muted leading-relaxed">{sk.desc}</p>
        </div>
      ))}
    </div>
  );
}

function SynergiesColumn({ hero, otherHeroId }: { hero: Hero | null; otherHeroId?: string }) {
  if (!hero) return <div className="p-3 text-center text-xs text-stone italic">—</div>;
  const rules = getHeroSynergies(hero.id);
  if (rules.length === 0) {
    return <div className="p-3 text-xs text-stone italic">Tidak ada sinergi khusus.</div>;
  }
  return (
    <div className="p-3 space-y-3.5">
      {rules.map((rule) => {
        const partners = rule.heroes.filter((id) => id !== hero.id);
        return (
          <div key={rule.id}>
            {/* Partner names — di atas */}
            <div className="flex flex-wrap gap-1 mb-1">
              {partners.map((id) => {
                const p = getHeroById(id);
                if (!p) return null;
                const isOther = id === otherHeroId;
                return (
                  <span
                    key={id}
                    className={`text-[9px] font-serif px-1.5 py-0.5 rounded-full border ${
                      isOther
                        ? "border-gold/50 bg-gold/10 text-gold"
                        : "border-parchment-dark text-stone"
                    }`}
                  >
                    {p.name}
                  </span>
                );
              })}
            </div>
            {/* Rating + label */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className={`text-[9px] font-serif font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${RATING_BADGE[rule.rating]}`}>
                {rule.rating}
              </span>
              <p className="text-[11px] font-serif text-ink leading-tight">{rule.label}</p>
            </div>
            {/* Description — di bawah */}
            <p className="text-[10px] text-ink-muted leading-relaxed">{rule.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export function HeroCompare() {
  const [heroA, setHeroA] = useState<Hero | null>(null);
  const [heroB, setHeroB] = useState<Hero | null>(null);

  const showStats  = !!(heroA?.stats && heroB?.stats);
  const showExtra  = !!(heroA || heroB);

  function getWinner(key: StatKey): "a" | "b" | "tie" {
    if (!heroA?.stats || !heroB?.stats) return "tie";
    const a = heroA.stats[key] as number;
    const b = heroB.stats[key] as number;
    if (a > b) return "a";
    if (b > a) return "b";
    return "tie";
  }

  const sharedRules = heroA && heroB
    ? synergyRules.filter((r) => r.heroes.includes(heroA.id) && r.heroes.includes(heroB.id))
    : [];

  const SectionHeader = ({ label }: { label: string }) => (
    <div className="grid grid-cols-3 border-b border-parchment-dark">
      <div className="p-2.5 text-center border-r border-parchment-dark">
        {heroA && <p className="text-xs font-serif text-ink-muted">{heroA.name}</p>}
      </div>
      <div className="p-2.5 text-center flex items-center justify-center">
        <p className="text-[10px] font-serif text-stone uppercase tracking-widest">{label}</p>
      </div>
      <div className="p-2.5 text-center border-l border-parchment-dark">
        {heroB && <p className="text-xs font-serif text-ink-muted">{heroB.name}</p>}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Pickers */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-serif text-ink-muted mb-2 text-center tracking-wider">HERO A</p>
          <HeroPicker selected={heroA} onChange={setHeroA} exclude={heroB?.id} />
        </div>
        <div>
          <p className="text-xs font-serif text-ink-muted mb-2 text-center tracking-wider">HERO B</p>
          <HeroPicker selected={heroB} onChange={setHeroB} exclude={heroA?.id} />
        </div>
      </div>

      {/* VS divider */}
      {showExtra && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-parchment-dark" />
          <span className="text-xs font-serif text-stone tracking-widest">✦ VS ✦</span>
          <div className="flex-1 h-px bg-parchment-dark" />
        </div>
      )}

      {/* Stats table */}
      {showStats ? (
        <div className="bg-parchment border border-parchment-dark rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 border-b border-parchment-dark">
            <div className="p-3 text-center">
              <HeroAvatar hero={heroA!} size="sm" className="mx-auto mb-1" />
              <p className="text-xs font-serif text-ink font-medium">{heroA!.name}</p>
            </div>
            <div className="p-3 text-center flex items-center justify-center">
              <p className="text-[10px] font-serif text-stone uppercase tracking-widest">Stat</p>
            </div>
            <div className="p-3 text-center">
              <HeroAvatar hero={heroB!} size="sm" className="mx-auto mb-1" />
              <p className="text-xs font-serif text-ink font-medium">{heroB!.name}</p>
            </div>
          </div>

          {STAT_LABELS.map(({ key, label, suffix }) => {
            const winner = getWinner(key);
            const valA   = heroA!.stats![key] as number;
            const valB   = heroB!.stats![key] as number;
            return (
              <div key={key} className="grid grid-cols-3 border-b border-parchment-dark last:border-0">
                <div className={`p-3 text-center ${winner === "a" ? "bg-sage/10" : ""}`}>
                  <p className={`font-serif text-sm font-medium ${winner === "a" ? "text-sage" : "text-ink"}`}>
                    {valA.toLocaleString()}{suffix}
                    {winner === "a" && <span className="ml-1 text-[10px]">▲</span>}
                  </p>
                </div>
                <div className="p-3 text-center flex items-center justify-center">
                  <p className="text-[10px] font-serif text-ink-muted">{label}</p>
                </div>
                <div className={`p-3 text-center ${winner === "b" ? "bg-sage/10" : ""}`}>
                  <p className={`font-serif text-sm font-medium ${winner === "b" ? "text-sage" : "text-ink"}`}>
                    {valB.toLocaleString()}{suffix}
                    {winner === "b" && <span className="ml-1 text-[10px]">▲</span>}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : showExtra ? (
        <p className="text-center text-sm text-ink-muted italic font-[var(--font-fell)] py-2">
          Pilih hero kedua untuk mulai perbandingan stats.
        </p>
      ) : null}

      {/* Skills */}
      {showExtra && (
        <div className="bg-parchment border border-parchment-dark rounded-xl overflow-hidden">
          <SectionHeader label="Skills" />
          <div className="grid grid-cols-2 divide-x divide-parchment-dark">
            <SkillsColumn hero={heroA} />
            <SkillsColumn hero={heroB} />
          </div>
        </div>
      )}

      {/* Shared synergy highlight */}
      {sharedRules.length > 0 && (
        <div className="bg-gold/5 border border-gold/30 rounded-xl p-4">
          <p className="text-[10px] font-serif text-gold tracking-[0.2em] uppercase mb-3">
            ✦ Sinergi Langsung {heroA!.name} + {heroB!.name} ✦
          </p>
          <div className="space-y-2">
            {sharedRules.map((rule) => (
              <div key={rule.id} className="flex gap-2.5 items-start">
                <span className={`text-[10px] font-serif font-bold px-2 py-0.5 rounded flex-shrink-0 ${RATING_BADGE[rule.rating]}`}>
                  {rule.rating}
                </span>
                <div>
                  <p className="text-sm font-serif text-ink">{rule.label}</p>
                  <p className="text-xs text-ink-muted leading-relaxed">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Synergies */}
      {showExtra && (
        <div className="bg-parchment border border-parchment-dark rounded-xl overflow-hidden">
          <SectionHeader label="Sinergi" />
          <div className="grid grid-cols-2 divide-x divide-parchment-dark">
            <SynergiesColumn hero={heroA} otherHeroId={heroB?.id} />
            <SynergiesColumn hero={heroB} otherHeroId={heroA?.id} />
          </div>
        </div>
      )}
    </div>
  );
}
