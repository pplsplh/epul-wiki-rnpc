import { heroes } from "@/data/heroes";
import { synergyRules } from "@/data/synergies";
import { Hero, SynergyRule } from "@/types";

export interface SynergyAnalysis {
  activeSynergies: SynergyRule[];
  score: number;
  rating: "S" | "A" | "B" | "C" | "-";
  composition: {
    hasTank: boolean;
    hasSupport: boolean;
    hasCarry: boolean;
    hasDebuffer: boolean;
  };
  warnings: string[];
  suggestions: string[];
}

export function analyzeSynergies(heroIds: string[]): SynergyAnalysis {
  const activeSynergies = synergyRules.filter(
    (rule) => rule.heroes.every((id) => heroIds.includes(id))
  );

  const score = activeSynergies.reduce((sum, rule) => {
    return sum + (rule.rating === "S" ? 3 : rule.rating === "A" ? 2 : 1);
  }, 0);

  const placed = heroIds
    .map((id) => heroes.find((h) => h.id === id))
    .filter((h): h is Hero => h !== undefined);

  const DEBUFFERS = ["ignis", "poby", "eluna", "penny", "ceria", "edel"];

  const composition = {
    hasTank: placed.some((h) => h.type === "Tanker"),
    hasSupport: placed.some((h) => h.type === "Support"),
    hasCarry: placed.some((h) => h.type === "Archer" || h.id === "ria" || h.id === "penny" || h.id === "ceria"),
    hasDebuffer: placed.some((h) => DEBUFFERS.includes(h.id)),
  };

  const warnings: string[] = [];
  if (heroIds.length > 0 && !composition.hasTank)
    warnings.push("Tidak ada Tanker — front line rentan di battle panjang");
  if (heroIds.length > 0 && !composition.hasSupport)
    warnings.push("Tidak ada Support — tidak ada healer atau buffer");

  const suggestions: string[] = [];
  if (!heroIds.includes("sera"))
    suggestions.push("Sera wajib di semua formasi — core buffer & healer");
  if (!heroIds.includes("ignis"))
    suggestions.push("Tambahkan Ignis untuk +15% DMG amp ke semua musuh");
  if (!composition.hasTank && !heroIds.includes("louis"))
    suggestions.push("Louis (Gacha #1) sangat direkomendasikan sebagai frontline");
  if (!composition.hasTank && !heroIds.includes("eluna") && heroIds.includes("ignis"))
    suggestions.push("Eluna bisa jadi alt tank jika Louis belum ada");

  let rating: SynergyAnalysis["rating"] = "-";
  if (heroIds.length === 0) {
    rating = "-";
  } else if (score >= 8) {
    rating = "S";
  } else if (score >= 5) {
    rating = "A";
  } else if (score >= 2) {
    rating = "B";
  } else {
    rating = "C";
  }

  return { activeSynergies, score, rating, composition, warnings, suggestions };
}

export function getHeroSynergies(heroId: string): SynergyRule[] {
  return synergyRules.filter((rule) => rule.heroes.includes(heroId));
}
