# CLAUDE.md

Rellion: NPC Survival — Interactive Strategy Roadmap & Hero Guide.
Panduan strategi F2P dari early game sampai end game, dengan Frieren-inspired aesthetic.

## Stack
- Next.js 14 (App Router) + TypeScript strict
- Tailwind CSS (custom Frieren palette)
- Lucide React (icons)
- sharp (image processing — crop hero portraits)
- Google Fonts: Cinzel, Crimson Pro, IM Fell English
- Deploy: Vercel, repo: github.com/pplsplh/rellion-roadmap

## Tentang Game
RELLION: NPC Survival — mobile idle RPG dari DAERI SOFT (Android/iOS, rilis Mei 2026).
Gameplay: formation-based battle, NPC automation, resource management, alchemy gem system.
Player profile: F2P, daily login, goal = enjoy progression + kuasai hero combinations.

## Halaman & Fitur

| Route | Halaman | Keterangan |
|-------|---------|------------|
| `/` | Landing + Roadmap | Hero section, features, PhaseBlocks, CTA, footer |
| `/roster` | Hero Roster | Filter hero, owned/gacha divider, tap → detail |
| `/hero/[id]` | Hero Detail | Stats Lv.160, skills, sinergi, hero lainnya (SSG) |
| `/builder` | Formation Builder | Drag/klik atur formasi, analisis sinergi otomatis |
| `/tierlist` | Tier List | Drag & tap-to-assign, tersimpan di localStorage |

## Struktur Folder
```
app/
├── layout.tsx                  # font import, metadata global
├── page.tsx                    # landing page (hero section + roadmap)
├── roster/page.tsx             # hero roster
├── builder/page.tsx            # formation builder
├── tierlist/page.tsx           # tier list interaktif
└── hero/[id]/page.tsx          # hero detail (SSG via generateStaticParams)

components/
├── Nav.tsx                     # sticky nav: Roadmap | Roster | Builder | Tier List
├── PhaseBlock.tsx              # collapsible phase card
├── FormationGrid.tsx           # 5-slot deploy order visual (pakai HeroAvatar)
├── FormationBuilder.tsx        # drag/klik builder + analisis sinergi
├── TierListBoard.tsx           # tier list S/A/B/C (drag desktop, tap mobile)
├── HeroCard.tsx                # kartu hero (avatar, badge, action button di kanan)
├── HeroBadge.tsx               # type badge pill (Support/Fighter/Archer/Tanker)
├── HeroAvatar.tsx              # portrait hero (gambar atau fallback initial)
├── HeroRoster.tsx              # roster + filter + divider owned/belum dimiliki
└── Divider.tsx                 # ornamental divider ✦

data/
├── heroes.ts                   # 12 hero: skills, stats Lv.160, title, synergies, imagePath
├── phases.ts                   # data 4 phase roadmap
└── synergies.ts                # 15 synergy rules (rating S/A/B)

hooks/
└── useOwnedHeroes.ts           # localStorage: isOwned, addOwned, removeOwned

lib/
├── synergy.ts                  # analyzeSynergies(), getHeroSynergies()
└── utils.ts                    # helper functions

types/
└── index.ts                    # semua TypeScript types

scripts/
└── crop-icon.mjs               # crop portrait Lv.160 dari screenshot game → public/images/heroes/

public/images/
├── heroes/                     # 12 portrait hero (200×200 jpg, crop dari screenshot)
├── frieren-bg.jpg              # background landing page
└── tierlist-hero.jpg           # tier list image asli (arsip)
```

## TypeScript Types Utama
```typescript
type HeroRarity   = "owned" | "gacha";
type HeroType     = "Support" | "Fighter" | "Archer" | "Tanker";
type HeroPosition = "front" | "mid" | "back";

interface HeroStats {
  atk: number; def: number; hp: number;
  critChance: number; critDmg: number;
  atkSpeed: number; moveSpeed: number;
  power: number;
}

interface Hero {
  id: string; name: string; title?: string;
  type: HeroType; rarity: HeroRarity;
  priority: number; position: HeroPosition;
  role: string; notes: string;
  skills: { level: number; desc: string }[];
  synergies: string[];        // hero IDs
  imagePath?: string;
  stats?: HeroStats;          // Lv.160 max, hanya hero yang sudah di-screenshot
}

interface SynergyRule {
  id: string; heroes: string[];
  type: "offensive" | "defensive" | "support";
  rating: "S" | "A" | "B";
  label: string; description: string;
}
```

## Hero Database

### Dimiliki (owned)
| Hero | Title | Type | Stats (ATK/DEF/HP) | Power |
|------|-------|------|--------------------|-------|
| Sera | Miracle Saintess | Support | 1237/525/3543 | 11,572 |
| Ignis | Dragon Knight | Fighter | 1455/1178/4532 | 15,209 |
| Ria | Black Market Broker | Fighter | 1244/734/4127 | 12,559 |
| Isabel | Bounty Hunter | Archer | 1265/734/3555 | 12,363 |
| Muriel | Royal Guard | Fighter | 1005/962/4532 | 11,826 |
| Eluna | Potion Merchant | Tanker | 1237/740/5485 | 12,956 |
| Ceria | Tactics Instructor | Fighter | 1005/962/4532 | 11,826 |

### Belum Dimiliki (gacha wishlist)
| Hero | Title | Type | Stats (ATK/DEF/HP) | Power |
|------|-------|------|--------------------|-------|
| Louis | Captain of the Royal Guard | Tanker | 548/1191/5509 | 10,081 |
| Poby | Postman | Support | 1237/525/3543 | 11,572 |
| Penny | Banker | Fighter | 773/962/5485 | 10,773 |
| Edel | Court Mage | Archer | 1244/518/3543 | 11,595 |
| Rina | Grand Mage of Error | Archer | 1244/518/3543 | 11,595 |

### Sistem Gacha
- Semua hero berasal dari gacha — owned = sudah punya, gacha = wishlist
- Dupe bagus → meningkatkan Limit Break hero
- Jangan skip dupe hero core (Sera, Ignis)

## Fitur Ownership (localStorage)
- `BASE_OWNED` = hero dengan `rarity: "owned"` di data — tidak bisa di-remove via UI
- Hero gacha bisa ditambah ke koleksi via tombol "+ Dimiliki" di dalam kartu
- Storage key: `rellion_owned_heroes`
- Tier list custom juga tersimpan di localStorage: `rellion_tierlist`

## Identitas Visual — Frieren Aesthetic

### Palette
```
sage: #7a9e8a    gold: #c4a44a    silver: #9ca8b0
rose: #8a5a6a    frost: #7090a0   stone: #8a8070
parchment: #f5f0e8    parchment-dark: #e8e0d0
ink: #2a2420    ink-soft: #3d3530    ink-muted: #6a6058
deep-forest: #3a4a3a
```

### Typography
- **Cinzel** — heading, nav, badge, label
- **Crimson Pro** — body, deskripsi, notes
- **IM Fell English** — flavor text, italic, quote

### Tone
- Parchment, muted sage, gold — seperti manuskrip kuno
- Bukan dark fantasy, bukan neon — elegant, melancholic, timeless
- Animasi subtle, tidak ada flash/glow berlebihan
- **Mobile-first** — breakpoint `md:` untuk desktop enhancement

## Konvensi
- Bahasa: Indonesia, panggil "Epul" atau "bro"
- TypeScript strict — tidak ada `any`
- Komponen modular, satu file satu komponen
- Tailwind utility classes, warna via config — tidak hardcode hex di JSX
- Data dipisah di `data/` — update data tidak perlu ubah komponen

## Hindari
- Tambah dependency tanpa diskusi
- Hardcode warna hex di komponen
- Ubah skema warna Frieren palette
- Commit/push otomatis tanpa konfirmasi
- Refactor besar tanpa diminta
- Font selain Cinzel/Crimson Pro/IM Fell English
