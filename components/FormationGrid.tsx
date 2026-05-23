import { FormationSlot } from "@/types";
import { getHeroById } from "@/data/heroes";
import { HeroBadge } from "./HeroBadge";
import { HeroAvatar } from "./HeroAvatar";
import { Sparkles } from "lucide-react";

interface FormationGridProps {
  formation: FormationSlot[];
}

export function FormationGrid({ formation }: FormationGridProps) {
  return (
    <div className="mt-4">
      <h4 className="font-serif text-sm text-ink-muted uppercase tracking-wider mb-3">
        Formation Deploy Order
      </h4>
      <div className="grid grid-cols-1 gap-2">
        {formation.map((slot) => {
          const hero = getHeroById(slot.heroId);
          if (!hero) return null;
          
          return (
            <div
              key={slot.order}
              className={`
                flex items-center gap-3 p-3
                bg-parchment border border-parchment-dark rounded-lg
                ${slot.isGacha ? "border-l-2 border-l-gold" : ""}
              `}
            >
              {/* Order number */}
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-sage/20 flex items-center justify-center">
                <span className="font-serif text-sm text-sage">{slot.order}</span>
              </div>

              {/* Avatar */}
              <HeroAvatar hero={hero} size="md" />

              {/* Hero info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-ink font-medium">{hero.name}</span>
                  {slot.isGacha && (
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <HeroBadge type={hero.type} />
                  <span className="text-xs text-ink-muted">{slot.role}</span>
                </div>
              </div>
              
              {/* Timing */}
              <div className="flex-shrink-0 text-right">
                <span className="font-serif text-xs text-stone bg-stone-light/50 px-2 py-1 rounded">
                  {slot.delay}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-3 flex items-center gap-4 text-xs text-ink-muted">
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-gold" />
          <span>Gacha Hero</span>
        </div>
        <div className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Variable</span>
        </div>
      </div>
    </div>
  );
}
