export type HeroRarity = "owned" | "gacha";
export type HeroType = "Support" | "Fighter" | "Archer" | "Tanker";
export type HeroPosition = "front" | "mid" | "back";

export interface HeroStats {
  atk: number;
  def: number;
  hp: number;
  critChance: number;    // e.g. 15.6 (persen)
  critDmg: number;       // e.g. 201 (persen)
  atkSpeed: number;      // e.g. 100 (persen dari max)
  moveSpeed: number;     // e.g. 150.3 (persen dari max)
  power: number;         // combat power
}

export interface Hero {
  title?: string;        // epithet in-game, e.g. "Miracle Saintess"
  stats?: HeroStats;     // max level stats (Lv.160), hanya hero yang sudah dimiliki
  id: string;
  name: string;
  type: HeroType;
  rarity: HeroRarity;
  priority: number;
  skills: { level: number; desc: string }[];
  notes: string;
  role: string;
  position: HeroPosition;   // recommended row position
  synergies: string[];       // hero IDs that synergize with this hero
  imagePath?: string;        // optional: /images/heroes/[id].png
}

export interface SynergyRule {
  id: string;
  heroes: string[];          // hero IDs involved (min 2)
  type: "offensive" | "defensive" | "support";
  rating: "S" | "A" | "B";
  label: string;
  description: string;
}

export interface FormationSlot {
  order: number;
  heroId: string;
  role: string;
  delay: string;
  isGacha?: boolean;
}

export type Section =
  | { type: "tips"; title?: string; items: string[] }
  | { type: "priority"; title?: string; items: { label: string; content: string }[] }
  | { type: "heroList"; title?: string; heroIds: string[] }
  | { type: "warning"; title?: string; content: string };

export interface Phase {
  id: string;
  phase: string;
  title: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  tags: string[];
  formation: FormationSlot[];
  sections: Section[];
}
