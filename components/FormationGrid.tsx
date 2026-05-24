import { FormationSlot } from "@/types";
import { getHeroById } from "@/data/heroes";
import { HeroAvatar } from "./HeroAvatar";
import { Sparkles, Swords } from "lucide-react";

interface FormationGridProps {
  formation: FormationSlot[];
}

const ROW_ORDER   = ["back", "mid", "front"] as const;
const ROW_LABELS  = { back: "Belakang", mid: "Tengah", front: "Depan" };

export function FormationGrid({ formation }: FormationGridProps) {
  const byPos = ROW_ORDER.reduce<Record<string, FormationSlot[]>>((acc, pos) => {
    acc[pos] = formation.filter((s) => getHeroById(s.heroId)?.position === pos);
    return acc;
  }, {});

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-3">
        <Swords className="w-4 h-4 text-rose" />
        <h4 className="font-serif text-sm text-ink-muted uppercase tracking-wider">Party Formation</h4>
      </div>

      <div className="rounded-xl overflow-hidden border border-parchment-dark">
        {/* Enemy side */}
        <div className="bg-rose/10 border-b border-rose/20 py-1.5 flex items-center justify-center">
          <span className="text-[9px] font-serif text-rose/60 uppercase tracking-[0.3em]">☠ Enemy</span>
        </div>

        {/* Battlefield rows */}
        <div
          className="bg-parchment/80 divide-y divide-parchment-dark/50"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(139,130,120,0.07) 39px,rgba(139,130,120,0.07) 40px)," +
              "repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(139,130,120,0.07) 59px,rgba(139,130,120,0.07) 60px)",
          }}
        >
          {ROW_ORDER.map((pos) => {
            const slots = byPos[pos];
            if (!slots?.length) return null;
            return (
              <div key={pos} className="px-3 py-2.5">
                <span className="text-[9px] font-serif text-stone uppercase tracking-widest mb-2 block">
                  {ROW_LABELS[pos]}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {slots.map((slot) => {
                    const hero = getHeroById(slot.heroId);
                    if (!hero) return null;
                    return (
                      <div
                        key={slot.order}
                        className={`relative flex flex-col items-center gap-1 p-2 rounded-lg border bg-parchment/95 min-w-[52px] ${
                          slot.isGacha ? "border-gold/50 shadow-sm shadow-gold/10" : "border-parchment-dark"
                        }`}
                      >
                        <span className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-sage text-white text-[8px] font-serif rounded-full flex items-center justify-center font-bold leading-none">
                          {slot.order}
                        </span>
                        {slot.isGacha && (
                          <Sparkles className="absolute -top-1.5 -right-1.5 w-3 h-3 text-gold" />
                        )}
                        <HeroAvatar hero={hero} size="sm" />
                        <span className="text-[9px] font-serif text-ink text-center leading-tight">{hero.name}</span>
                        <span className="text-[8px] font-serif text-stone bg-stone/10 px-1 rounded">{slot.delay}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Player side */}
        <div className="bg-sage/10 border-t border-sage/20 py-1.5 flex items-center justify-center">
          <span className="text-[9px] font-serif text-sage/60 uppercase tracking-[0.3em]">⚔ Player</span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-4 text-[10px] text-ink-muted font-serif">
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-sage text-white text-[8px] rounded-full flex items-center justify-center font-bold">1</span>
          <span>Deploy order</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Gacha hero</span>
        </div>
      </div>
    </div>
  );
}
