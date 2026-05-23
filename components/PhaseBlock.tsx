"use client";

import { Phase, Section } from "@/types";
import { FormationGrid } from "./FormationGrid";
import { HeroCard } from "./HeroCard";
import { getHeroById } from "@/data/heroes";
import { ChevronDown, Lightbulb, AlertTriangle, Target, Users } from "lucide-react";

interface PhaseBlockProps {
  phase: Phase;
  isOpen: boolean;
  onToggle: () => void;
}

const accentBorders: Record<string, string> = {
  sage: "border-l-sage",
  gold: "border-l-gold",
};

const accentBg: Record<string, string> = {
  sage: "bg-sage/10",
  gold: "bg-gold/10",
};

function SectionIcon({ type }: { type: Section["type"] }) {
  switch (type) {
    case "tips":
      return <Lightbulb className="w-4 h-4 text-sage" />;
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-gold" />;
    case "priority":
      return <Target className="w-4 h-4 text-rose" />;
    case "heroList":
      return <Users className="w-4 h-4 text-frost" />;
  }
}

function SectionContent({ section }: { section: Section }) {
  if (section.type === "tips") {
    return (
      <ul className="space-y-1.5">
        {section.items.map((item, i) => (
          <li key={i} className="text-sm leading-relaxed pl-4 relative text-ink-muted">
            <span className="absolute left-0 text-stone">◆</span>
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
          <div
            key={i}
            className="border border-parchment-dark rounded-lg p-3 bg-parchment/60"
          >
            <p className="text-xs text-ink-muted uppercase tracking-wider font-serif mb-1">
              {item.label}
            </p>
            <p className="text-sm text-ink-soft italic font-[var(--font-fell)]">
              {item.content}
            </p>
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

  return (
    <div
      className={`
        border border-parchment-dark rounded-lg overflow-hidden
        bg-parchment/50 backdrop-blur-sm
        border-l-4 ${accentBorders[phase.accentColor] || "border-l-sage"}
        transition-all duration-300
        frieren-card relative z-[1]
      `}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-4 md:p-5 text-left flex items-start gap-4 hover:bg-parchment-dark/30 transition-colors"
      >
        <div
          className={`
            flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full
            flex items-center justify-center
            ${accentBg[phase.accentColor] || "bg-sage/10"}
            border border-parchment-dark
          `}
        >
          <span className="font-serif text-lg md:text-xl text-ink">{phase.phase}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-serif text-lg md:text-xl text-ink font-medium">
              {phase.title}
            </h3>
            <span className="text-lg">{phase.icon}</span>
          </div>
          <p className="text-sm text-ink-muted mt-0.5 italic font-[var(--font-fell)]">
            {phase.subtitle}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {phase.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-parchment-dark/50 text-ink-muted rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <ChevronDown
          className={`
            w-5 h-5 text-stone flex-shrink-0
            transition-transform duration-300
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Collapsible content */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 md:px-5 pb-5 border-t border-parchment-dark">
          <FormationGrid formation={phase.formation} />

          {phase.sections.map((section, idx) => (
            <div key={idx} className="mt-5">
              {section.title && (
                <div className="flex items-center gap-2 mb-3">
                  <SectionIcon type={section.type} />
                  <h4 className="font-serif text-sm text-ink-soft uppercase tracking-wider">
                    {section.title}
                  </h4>
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
