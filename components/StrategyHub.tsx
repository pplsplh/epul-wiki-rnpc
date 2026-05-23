"use client";

import { useState } from "react";
import { heroes, getHeroById } from "@/data/heroes";
import { synergyRules } from "@/data/synergies";
import { HeroAvatar } from "./HeroAvatar";
import { TierListBoard } from "./TierListBoard";
import { FormationBuilder } from "./FormationBuilder";

const RATING_BADGE: Record<string, string> = {
  S: "bg-gold text-ink",
  A: "bg-sage text-parchment",
  B: "bg-frost text-parchment",
};

const RATING_CARD: Record<string, string> = {
  S: "border-gold/50 bg-gold/10",
  A: "border-sage/50 bg-sage/10",
  B: "border-frost/50 bg-frost/10",
};

const SORTED_SYNERGIES = [...synergyRules].sort((a, b) => {
  const order: Record<string, number> = { S: 0, A: 1, B: 2 };
  return order[a.rating] - order[b.rating];
});

export function StrategyHub() {
  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-5 lg:items-start space-y-4 lg:space-y-0">

      {/* Col 1–2 — Sinergi Reference */}
      <div className="lg:col-span-2 space-y-3">
        <div className="bg-parchment border border-parchment-dark rounded-xl p-5">
          <h2 className="font-serif text-lg text-ink mb-1">Daftar Sinergi</h2>
          <p className="text-xs text-ink-muted mb-4">Semua kombinasi hero yang memiliki efek sinergi, diurutkan berdasarkan rating</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SORTED_SYNERGIES.map((rule) => (
              <div
                key={rule.id}
                className={`flex gap-3 p-3 rounded-lg border ${RATING_CARD[rule.rating] ?? "border-parchment-dark"}`}
              >
                <span className={`text-xs font-serif font-bold px-2 py-0.5 rounded self-start flex-shrink-0 ${RATING_BADGE[rule.rating] ?? ""}`}>
                  {rule.rating}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-serif text-ink font-medium mb-0.5">{rule.label}</p>
                  <p className="text-xs text-ink-muted leading-relaxed mb-2">{rule.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {rule.heroes.map((hid) => {
                      const h = getHeroById(hid);
                      if (!h) return null;
                      return (
                        <div key={hid} className="flex items-center gap-1 border border-parchment-dark rounded-full px-1.5 py-0.5 bg-parchment">
                          <HeroAvatar hero={h} size="sm" className="w-4 h-4 rounded-full" />
                          <span className="text-[9px] font-serif text-ink">{h.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Col 3 — Formasi + Tier List */}
      <div className="lg:col-span-1 space-y-4">
        <FormationBuilder />
        <TierListBoard />
      </div>

    </div>
  );
}
