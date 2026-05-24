"use client";

import { useState } from "react";
import { phases } from "@/data/phases";
import { PhaseBlock } from "./PhaseBlock";
import { WorldMap } from "./WorldMap";
import { Map, List } from "lucide-react";

export function RoadmapSection() {
  const [view,    setView]    = useState<"map" | "list">("map");
  const [openId,  setOpenId]  = useState<string | null>(null);

  function handleMapSelect(id: string) {
    const next = openId === id ? null : id;
    setOpenId(next);
    if (next) {
      setTimeout(() => {
        document.getElementById("phase-detail")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 80);
    }
  }

  return (
    <div>
      {/* View toggle */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setView("map")}
          className={`inline-flex items-center gap-1.5 text-xs font-serif px-4 py-1.5 rounded-full border transition-all ${
            view === "map"
              ? "border-gold bg-gold/10 text-gold"
              : "border-parchment-dark text-ink-muted hover:border-gold/40"
          }`}
        >
          <Map className="w-3.5 h-3.5" /> Map View
        </button>
        <button
          onClick={() => setView("list")}
          className={`inline-flex items-center gap-1.5 text-xs font-serif px-4 py-1.5 rounded-full border transition-all ${
            view === "list"
              ? "border-sage bg-sage/10 text-sage"
              : "border-parchment-dark text-ink-muted hover:border-sage/40"
          }`}
        >
          <List className="w-3.5 h-3.5" /> List View
        </button>
      </div>

      {/* Map view */}
      {view === "map" && (
        <div className="space-y-4">
          <WorldMap activeId={openId} onSelect={handleMapSelect} />

          {!openId && (
            <p className="text-center text-xs text-ink-muted font-[var(--font-fell)] italic py-2">
              — Klik lokasi di peta untuk melihat detail phase —
            </p>
          )}

          {openId && (
            <div id="phase-detail">
              {phases
                .filter((p) => p.id === openId)
                .map((phase) => (
                  <PhaseBlock
                    key={phase.id}
                    phase={phase}
                    isOpen
                    onToggle={() => setOpenId(null)}
                  />
                ))}
            </div>
          )}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="space-y-4">
          {phases.map((phase) => (
            <PhaseBlock
              key={phase.id}
              phase={phase}
              isOpen={openId === phase.id}
              onToggle={() => setOpenId(openId === phase.id ? null : phase.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
