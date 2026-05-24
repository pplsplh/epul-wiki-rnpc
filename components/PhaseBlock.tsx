"use client";

import { Phase, Section } from "@/types";
import { FormationGrid } from "./FormationGrid";
import { HeroCard } from "./HeroCard";
import { getHeroById } from "@/data/heroes";
import { ChevronDown, Lightbulb, AlertTriangle, Target, Users, ScrollText } from "lucide-react";

interface PhaseBlockProps {
  phase: Phase;
  isOpen: boolean;
  onToggle: () => void;
}

const XP_REWARD: Record<string, string> = {
  I: "500",  II: "1,500",  III: "3,000",  IV: "5,000",
};

const QUEST_TYPE: Record<string, string> = {
  I: "MAIN QUEST",  II: "MAIN QUEST",  III: "MAIN QUEST",  IV: "FINAL QUEST",
};

const accentBorders: Record<string, string> = {
  sage: "border-l-sage",
  gold: "border-l-gold",
};

const accentBg: Record<string, string> = {
  sage: "bg-sage/10",
  gold: "bg-gold/10",
};

const accentText: Record<string, string> = {
  sage: "text-sage",
  gold: "text-gold",
};

function SectionIcon({ type }: { type: Section["type"] }) {
  switch (type) {
    case "tips":     return <Lightbulb    className="w-4 h-4 text-sage" />;
    case "warning":  return <AlertTriangle className="w-4 h-4 text-gold" />;
    case "priority": return <Target        className="w-4 h-4 text-rose" />;
    case "heroList": return <Users         className="w-4 h-4 text-frost" />;
  }
}

const SECTION_LABEL: Record<Section["type"], string> = {
  tips:     "Objective",
  warning:  "Warning",
  priority: "Priority",
  heroList: "Target",
};

function SectionContent({ section }: { section: Section }) {
  if (section.type === "tips") {
    return (
      <ul className="space-y-1.5">
        {section.items.map((item, i) => (
          <li key={i} className="text-sm leading-relaxed pl-5 relative text-ink-muted">
            <span className="absolute left-0 top-1 w-3 h-3 border border-stone/40 rounded-sm bg-parchment flex items-center justify-center text-[7px] text-stone">✦</span>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (section.type === "warning") {
    return (
      <div className="flex gap-2 p-3 rounded-lg border border-gold/30 bg-gold/5">
        <AlertTriangle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
        <p className="text-sm text-ink-muted leading-relaxed italic font-[var(--font-fell)]">
          {section.content}
        </p>
      </div>
    );
  }

  if (section.type === "priority") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {section.items.map((item, i) => (
          <div key={i} className="border border-parchment-dark rounded-lg p-3 bg-parchment/60">
            <p className="text-xs text-ink-muted uppercase tracking-wider font-serif mb-1">{item.label}</p>
            <p className="text-sm text-ink-soft italic font-[var(--font-fell)]">{item.content}</p>
          </div>
        ))}
      </div>
    );
  }

  if (section.type === "heroList") {
    return (
      <div>
        {section.heroIds.map((id) => {
          const hero = getHeroById(id);
          return hero ? <HeroCard key={id} hero={hero} /> : null;
        })}
      </div>
    );
  }

  return null;
}

export function PhaseBlock({ phase, isOpen, onToggle }: PhaseBlockProps) {
  const xp       = XP_REWARD[phase.phase]  ?? "—";
  const questType = QUEST_TYPE[phase.phase] ?? "QUEST";
  const accent    = phase.accentColor;

  return (
    <div className={`
      border border-parchment-dark rounded-lg overflow-hidden
      bg-parchment/50 backdrop-blur-sm
      border-l-4 ${accentBorders[accent] || "border-l-sage"}
      transition-all duration-300
      frieren-card relative z-[1]
    `}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-4 md:p-5 text-left flex items-start gap-4 hover:bg-parchment-dark/30 transition-colors"
      >
        {/* Quest seal */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          <span className={`text-[8px] font-serif uppercase tracking-widest ${accentText[accent] ?? "text-sage"}`}>
            {questType}
          </span>
          <div className={`
            w-10 h-10 md:w-12 md:h-12 rounded-full
            flex items-center justify-center
            ${accentBg[accent] || "bg-sage/10"}
            border-2 ${accent === "gold" ? "border-gold/40" : "border-sage/40"}
            relative
          `}>
            <span className="font-serif text-lg md:text-xl text-ink">{phase.phase}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-serif text-lg md:text-xl text-ink font-medium">{phase.title}</h3>
            <span className="text-lg">{phase.icon}</span>
          </div>
          <p className="text-sm text-ink-muted mt-0.5 italic font-[var(--font-fell)]">{phase.subtitle}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {phase.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 bg-parchment-dark/50 text-ink-muted rounded-full font-serif">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* XP reward + chevron */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <ChevronDown className={`w-5 h-5 text-stone transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          <span className={`text-[10px] font-serif px-2 py-0.5 rounded border ${
            accent === "gold"
              ? "text-gold border-gold/40 bg-gold/10"
              : "text-sage border-sage/40 bg-sage/10"
          }`}>
            EXP +{xp}
          </span>
        </div>
      </button>

      {/* Collapsible content */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 md:px-5 pb-5 border-t border-parchment-dark">
          <FormationGrid formation={phase.formation} />

          {phase.sections.map((section, idx) => (
            <div key={idx} className="mt-5">
              {section.title && (
                <div className="flex items-center gap-2 mb-3">
                  <SectionIcon type={section.type} />
                  <span className={`text-[9px] font-serif uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                    section.type === "warning"
                      ? "text-gold border-gold/30 bg-gold/10"
                      : section.type === "priority"
                      ? "text-rose border-rose/30 bg-rose/10"
                      : section.type === "heroList"
                      ? "text-frost border-frost/30 bg-frost/10"
                      : "text-sage border-sage/30 bg-sage/10"
                  }`}>
                    {SECTION_LABEL[section.type]}
                  </span>
                  <h4 className="font-serif text-sm text-ink-soft tracking-wide">{section.title}</h4>
                </div>
              )}
              <SectionContent section={section} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
