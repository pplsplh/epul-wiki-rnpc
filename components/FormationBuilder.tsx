"use client";

import { useState } from "react";
import { heroes, getHeroById } from "@/data/heroes";
import { analyzeSynergies, getHeroSynergies } from "@/lib/synergy";
import { HeroAvatar } from "./HeroAvatar";
import {
  Plus, X, Sparkles, Shield, Heart, Swords, Star,
  AlertTriangle, CheckCircle2,
} from "lucide-react";

type RowKey = "front" | "mid" | "back";

interface Slot {
  id: string;
  row: RowKey;
  heroId: string | null;
}

const INITIAL_SLOTS: Slot[] = [
  { id: "f1", row: "front", heroId: null },
  { id: "f2", row: "front", heroId: null },
  { id: "m1", row: "mid",   heroId: null },
  { id: "m2", row: "mid",   heroId: null },
  { id: "b1", row: "back",  heroId: null },
];

const ROW_META: Record<RowKey, { label: string; hint: string }> = {
  front: { label: "Depan",    hint: "Tank / Bruiser" },
  mid:   { label: "Tengah",   hint: "Support / Buffer" },
  back:  { label: "Belakang", hint: "DPS / Carry" },
};

const RATING_BADGE: Record<string, string> = {
  S: "bg-gold text-ink",
  A: "bg-sage text-parchment",
  B: "bg-frost text-parchment",
  C: "bg-stone text-parchment",
};

const RATING_CARD: Record<string, string> = {
  S: "border-gold/50 bg-gold/10",
  A: "border-sage/50 bg-sage/10",
  B: "border-frost/50 bg-frost/10",
};

export function FormationBuilder() {
  const [slots, setSlots] = useState<Slot[]>(INITIAL_SLOTS.map((s) => ({ ...s })));
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);
  const [checkHeroId, setCheckHeroId] = useState<string | null>(null);

  const placedIds = slots.map((s) => s.heroId).filter((id): id is string => id !== null);
  const analysis = analyzeSynergies(placedIds);
  const availableHeroes = heroes.filter((h) => !placedIds.includes(h.id));

  const checkHero = checkHeroId ? getHeroById(checkHeroId) : null;
  const checkSynergies = checkHeroId ? getHeroSynergies(checkHeroId) : [];

  function placeHero(slotId: string, heroId: string) {
    setSlots((prev) => prev.map((s) => (s.id === slotId ? { ...s, heroId } : s)));
    setActiveSlotId(null);
  }

  function removeHero(slotId: string, e: React.MouseEvent) {
    e.stopPropagation();
    setSlots((prev) => prev.map((s) => (s.id === slotId ? { ...s, heroId: null } : s)));
  }

  function reset() {
    setSlots(INITIAL_SLOTS.map((s) => ({ ...s })));
    setActiveSlotId(null);
    setCheckHeroId(null);
  }

  const rows: RowKey[] = ["front", "mid", "back"];

  return (
    <div className="space-y-4">
      {/* ── Formation Grid ── */}
      <div className="bg-parchment border border-parchment-dark rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-lg text-ink">Atur Formasi</h2>
            <p className="text-xs text-ink-muted">Pilih hingga 5 hero, sinergi terdeteksi otomatis</p>
          </div>
          <button
            onClick={reset}
            className="text-xs font-serif text-ink-muted hover:text-rose transition-colors border border-parchment-dark rounded px-2 py-1"
          >
            Reset
          </button>
        </div>

        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row} className="flex items-center gap-2">
              {/* Row label */}
              <div className="w-[68px] flex-shrink-0 text-right pr-1">
                <p className="text-xs font-serif text-ink">{ROW_META[row].label}</p>
                <p className="text-[9px] text-stone leading-tight">{ROW_META[row].hint}</p>
              </div>

              {/* Slots */}
              {slots
                .filter((s) => s.row === row)
                .map((slot) => {
                  const hero = slot.heroId ? getHeroById(slot.heroId) : null;
                  const isActive = activeSlotId === slot.id;

                  return hero ? (
                    <div
                      key={slot.id}
                      onClick={() => setActiveSlotId(isActive ? null : slot.id)}
                      className="relative flex-1 flex flex-col items-center gap-1 p-2 border border-parchment-dark rounded-lg bg-parchment/60 hover:border-sage/50 cursor-pointer transition-all"
                    >
                      <HeroAvatar hero={hero} size="sm" />
                      <p className="text-[10px] font-serif text-ink leading-tight text-center">{hero.name}</p>
                      <button
                        onClick={(e) => removeHero(slot.id, e)}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose/80 hover:bg-rose text-parchment rounded-full flex items-center justify-center transition-colors"
                        title="Hapus hero"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      key={slot.id}
                      onClick={() => setActiveSlotId(isActive ? null : slot.id)}
                      className={`flex-1 border-2 border-dashed rounded-lg py-3 flex flex-col items-center gap-1 transition-all ${
                        isActive
                          ? "border-sage bg-sage/10"
                          : "border-parchment-dark hover:border-sage/50"
                      }`}
                    >
                      <Plus className="w-4 h-4 text-ink-muted" />
                      <span className="text-[9px] font-serif text-ink-muted">Tambah</span>
                    </button>
                  );
                })}

              {/* Spacer for back row (only 1 slot) */}
              {row === "back" && <div className="flex-1" />}
            </div>
          ))}
        </div>
      </div>

      {/* ── Hero Picker ── */}
      {activeSlotId && (
        <div className="bg-parchment border border-sage/40 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-serif text-sage tracking-widest">PILIH HERO</p>
            <button onClick={() => setActiveSlotId(null)} className="text-ink-muted hover:text-ink">
              <X className="w-4 h-4" />
            </button>
          </div>
          {availableHeroes.length === 0 ? (
            <p className="text-sm text-ink-muted italic text-center py-4">Semua hero sudah ditempatkan.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {availableHeroes.map((hero) => (
                <button
                  key={hero.id}
                  onClick={() => placeHero(activeSlotId, hero.id)}
                  className="flex items-center gap-2 p-2 border border-parchment-dark rounded-lg hover:border-gold/60 hover:bg-gold/5 transition-all text-left"
                >
                  <HeroAvatar hero={hero} size="sm" />
                  <div className="min-w-0">
                    <p className="font-serif text-sm text-ink truncate">{hero.name}</p>
                    <p className="text-[10px] text-ink-muted">{hero.type} · {hero.role}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Synergy Analysis ── */}
      {placedIds.length >= 2 && (
        <div className="bg-parchment border border-parchment-dark rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg text-ink">Analisis Sinergi</h2>
            {analysis.rating !== "-" && (
              <span className={`px-3 py-1 rounded-full text-xs font-serif font-bold ${RATING_BADGE[analysis.rating] ?? "bg-stone/30 text-stone"}`}>
                {analysis.rating}-Rank
              </span>
            )}
          </div>

          {/* Active Synergies */}
          {analysis.activeSynergies.length > 0 ? (
            <div className="space-y-2 mb-4">
              {analysis.activeSynergies.map((rule) => (
                <div key={rule.id} className={`flex gap-3 p-3 rounded-lg border ${RATING_CARD[rule.rating] ?? "border-parchment-dark"}`}>
                  <span className={`text-xs font-serif font-bold px-2 py-0.5 rounded self-start flex-shrink-0 ${RATING_BADGE[rule.rating] ?? ""}`}>
                    {rule.rating}
                  </span>
                  <div>
                    <p className="text-sm font-serif text-ink">{rule.label}</p>
                    <p className="text-xs text-ink-muted leading-relaxed">{rule.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-muted italic mb-4">Belum ada sinergi aktif di formasi ini.</p>
          )}

          {/* Composition Check */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { has: analysis.composition.hasTank,     icon: Shield,  label: "Tank" },
              { has: analysis.composition.hasSupport,   icon: Heart,   label: "Support" },
              { has: analysis.composition.hasCarry,     icon: Star,    label: "Carry" },
              { has: analysis.composition.hasDebuffer,  icon: Swords,  label: "Debuffer" },
            ].map(({ has, icon: Icon, label }) => (
              <div
                key={label}
                className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-serif ${
                  has ? "border-sage/30 bg-sage/10 text-sage" : "border-stone/20 bg-stone/5 text-stone"
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{label}</span>
                {has
                  ? <CheckCircle2 className="w-3 h-3 ml-auto" />
                  : <X className="w-3 h-3 ml-auto opacity-40" />
                }
              </div>
            ))}
          </div>

          {/* Warnings */}
          {analysis.warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-rose mb-1.5">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <span>{w}</span>
            </div>
          ))}

          {/* Suggestions */}
          {analysis.suggestions.map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-frost mb-1.5">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <span>{s}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Cek Sinergi Hero Baru ── */}
      <div className="bg-parchment border border-parchment-dark rounded-xl p-4">
        <h2 className="font-serif text-lg text-ink mb-1">Cek Sinergi Hero Baru</h2>
        <p className="text-xs text-ink-muted mb-4">
          Baru dapet hero dari gacha? Klik hero-nya untuk lihat cocok sama siapa.
        </p>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {heroes.map((hero) => {
            const inFormation = placedIds.includes(hero.id);
            const isSelected = checkHeroId === hero.id;
            const hasSynergyWithSelected =
              !inFormation &&
              checkHeroId &&
              hero.id !== checkHeroId &&
              getHeroSynergies(checkHeroId).some((r) => r.heroes.includes(hero.id));

            return (
              <button
                key={hero.id}
                onClick={() => !inFormation && setCheckHeroId(isSelected ? null : hero.id)}
                disabled={inFormation}
                title={inFormation ? "Sudah di formasi" : hero.name}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all text-center ${
                  isSelected
                    ? "border-gold bg-gold/15 ring-1 ring-gold/40"
                    : hasSynergyWithSelected
                    ? "border-sage/60 bg-sage/10"
                    : inFormation
                    ? "border-parchment-dark opacity-40 cursor-not-allowed"
                    : "border-parchment-dark hover:border-gold/50 hover:bg-gold/5"
                }`}
              >
                <HeroAvatar hero={hero} size="sm" />
                <p className="text-[9px] font-serif text-ink leading-tight">{hero.name}</p>
              </button>
            );
          })}
        </div>

        {checkHero && (
          <div className="space-y-2">
            <p className="text-xs font-serif text-sage tracking-widest mb-3">
              SINERGI {checkHero.name.toUpperCase()} ✦
            </p>
            {checkSynergies.length === 0 ? (
              <p className="text-sm text-ink-muted italic">Tidak ada sinergi khusus untuk hero ini.</p>
            ) : (
              checkSynergies.map((rule) => {
                const partners = rule.heroes.filter((id) => id !== checkHeroId);
                const inFormationPartners = partners.filter((id) => placedIds.includes(id));
                const isFullyActive = partners.every((id) => placedIds.includes(id));
                const isPartiallyActive = inFormationPartners.length > 0 && !isFullyActive;

                return (
                  <div
                    key={rule.id}
                    className={`flex gap-3 p-3 rounded-lg border ${
                      isFullyActive
                        ? RATING_CARD[rule.rating] ?? "border-parchment-dark"
                        : isPartiallyActive
                        ? "border-sage/30 bg-sage/5"
                        : "border-parchment-dark"
                    }`}
                  >
                    <span className={`text-xs font-serif font-bold px-2 py-0.5 rounded self-start flex-shrink-0 ${RATING_BADGE[rule.rating] ?? ""}`}>
                      {rule.rating}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="text-sm font-serif text-ink">{rule.label}</p>
                        {isFullyActive && (
                          <span className="text-[9px] font-serif px-1.5 py-0.5 bg-gold/20 text-gold rounded-full">AKTIF</span>
                        )}
                        {isPartiallyActive && (
                          <span className="text-[9px] font-serif px-1.5 py-0.5 bg-sage/20 text-sage rounded-full">SEBAGIAN</span>
                        )}
                      </div>
                      <p className="text-xs text-ink-muted mb-1.5">{rule.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {partners.map((id) => {
                          const p = getHeroById(id);
                          if (!p) return null;
                          const inF = placedIds.includes(id);
                          return (
                            <span
                              key={id}
                              className={`text-[9px] font-serif px-2 py-0.5 rounded-full border ${
                                inF
                                  ? "border-sage/50 bg-sage/10 text-sage"
                                  : "border-parchment-dark text-ink-muted"
                              }`}
                            >
                              {p.name}{inF ? " ✓" : ""}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
