import { Phase } from "@/types";

export const phases: Phase[] = [
  {
    id: "phase-1",
    phase: "I",
    title: "The Wanderer's Beginning",
    subtitle: "Early Game",
    icon: "🌱",
    accentColor: "sage",
    tags: ["Starter Formation", "Debuff Core"],
    formation: [
      { order: 1, heroId: "sera",   role: "Buffer",    delay: "t=0"   },
      { order: 2, heroId: "ignis",  role: "Debuffer",  delay: "t=0"   },
      { order: 3, heroId: "ria",    role: "Burst DPS", delay: "t+10s" },
      { order: 4, heroId: "muriel", role: "Bruiser",   delay: "t+20s" },
      { order: 5, heroId: "isabel", role: "CRIT DPS",  delay: "t+30s" },
    ],
    sections: [
      {
        type: "priority",
        title: "Upgrade Priority",
        items: [
          { label: "🔴 Prioritas utama", content: "Sera → Ignis → Ria" },
          { label: "🟡 Setelahnya",      content: "Isabel → Eluna/Muriel" },
        ],
      },
      {
        type: "tips",
        title: "Strategi Awal",
        items: [
          "Deploy Sera di t=0 — buff ATK+20% dan Speed+15% harus aktif sebelum DPS masuk.",
          "Ignis langsung setelah Sera — DMG taken +15% ke semua musuh jadi force multiplier semua hero.",
          "Ria deploy setelah buff aktif untuk burst maksimal — Teleport 360% ATK single target.",
          "Isabel sebagai sustained carry di belakang — CRIT chance +70% scaling kuat seiring waktu.",
          "Muriel atau Eluna di front sebagai bruiser sementara sampai Louis didapat.",
        ],
      },
      {
        type: "tips",
        title: "Progression Tips",
        items: [
          "Unlock Alchemy Gem System duluan — boost offline gains paling signifikan.",
          "Klaim resource offline setiap login — kapasitas penyimpanan ada batasnya.",
          "Daily tasks setiap hari — sumber resource F2P paling stabil dan konsisten.",
        ],
      },
      {
        type: "warning",
        title: "Yang Perlu Diperhatikan",
        content:
          "Fase ini belum punya dedicated tanker. Muriel atau Eluna bisa cover posisi front sementara, tapi tidak sekuat Louis untuk konten mid-game ke atas.",
      },
    ],
  },
  {
    id: "phase-2",
    phase: "II",
    title: "The Dungeon Trials",
    subtitle: "Mid Game",
    icon: "⚔️",
    accentColor: "gold",
    tags: ["Louis Priority Pull", "Debuff Stack", "+30% DMG Combo"],
    formation: [
      { order: 1, heroId: "louis",  role: "Main Tank",  delay: "t=0",   isGacha: true },
      { order: 2, heroId: "sera",   role: "Buffer",     delay: "t=0"                  },
      { order: 3, heroId: "ignis",  role: "Debuffer",   delay: "t+10s"                },
      { order: 4, heroId: "ria",    role: "Burst DPS",  delay: "t+20s"                },
      { order: 5, heroId: "isabel", role: "CRIT DPS",   delay: "t+30s"                },
    ],
    sections: [
      {
        type: "heroList",
        title: "Priority Pull Phase Ini",
        heroIds: ["louis", "poby"],
      },
      {
        type: "tips",
        title: "Kenapa Louis Prioritas #1",
        items: [
          "Taunt luas → semua musuh fokus ke Louis, DPS di belakang aman full damage.",
          "DMG taken +15% ke musuh yang taunted — stack dengan Ignis jadi +30% total.",
          "Shield 30% max HP — survival tim jauh lebih kuat untuk konten dungeon dan raid.",
          "Tanpa Louis, formasi rentan terhadap AoE heavy dari boss mid-game ke atas.",
        ],
      },
      {
        type: "tips",
        title: "Combo Debuff Stack",
        items: [
          "Ignis + Louis = musuh take +30% DMG dari semua sumber — ini core synergy terkuat.",
          "Poby DEF -20% stackable → tambah lagi damage spike, terutama saat Ria burst.",
          "Sera buff aktif SEBELUM Ria deploy — timing ini krusial untuk output maksimal.",
          "Buka dungeon runs harian dan multi-boss raids — sumber equipment upgrade terbaik.",
        ],
      },
    ],
  },
  {
    id: "phase-3",
    phase: "III",
    title: "The Ancient Depths",
    subtitle: "Late Game",
    icon: "🏛️",
    accentColor: "sage",
    tags: ["Isabel Main Carry", "CRIT Investment", "Triple Debuff"],
    formation: [
      { order: 1, heroId: "louis",  role: "Shield+Taunt", delay: "t=0",   isGacha: true },
      { order: 2, heroId: "sera",   role: "Buff+Heal",    delay: "t=0"                  },
      { order: 3, heroId: "ignis",  role: "DMG+15%",      delay: "t+10s"                },
      { order: 4, heroId: "poby",   role: "DEF Shred",    delay: "t+15s", isGacha: true },
      { order: 5, heroId: "isabel", role: "CRIT Main",    delay: "t+30s"                },
    ],
    sections: [
      {
        type: "tips",
        title: "Isabel Jadi Main Carry",
        items: [
          "CRIT chance +70% + CRIT DMG +40% — scaling terkuat di late game dengan full debuff stack.",
          "Investasi equipment CRIT ke Isabel duluan sebelum hero lain.",
          "Sera buff aktif → Ignis + Louis +30% → Poby DEF -20% → Isabel CRIT = damage paling optimal.",
          "Ria tetap bisa masuk di slot Poby jika Poby belum ada — burst assassin tetap relevan.",
        ],
      },
      {
        type: "tips",
        title: "Raid & Dungeon Strategy",
        items: [
          "Louis taunt aktif sebelum boss AoE besar — shield 30% max HP jadi buffer kritis.",
          "Skill timing makin penting — perhatikan cooldown cycle tiap hero.",
          "Ceria bisa masuk sebagai flex DPS jika ada slot — DEF shred stack dengan debuffer lain.",
          "Upgrade Limit Break hero core (Sera, Ignis) jika dapat dupe dari gacha.",
        ],
      },
    ],
  },
  {
    id: "phase-4",
    phase: "IV",
    title: "The Realm's True End",
    subtitle: "End Game",
    icon: "👑",
    accentColor: "gold",
    tags: ["Full Synergy", "S-Rank Combo", "Meta Optimized"],
    formation: [
      { order: 1, heroId: "louis",  role: "Shield+Taunt", delay: "t=0",   isGacha: true },
      { order: 2, heroId: "sera",   role: "Buff+Heal",    delay: "t=0"                  },
      { order: 3, heroId: "ignis",  role: "DMG+15%",      delay: "t+10s"                },
      { order: 4, heroId: "ria",    role: "360% ATK",     delay: "t+20s"                },
      { order: 5, heroId: "isabel", role: "CRIT Main",    delay: "t+30s"                },
    ],
    sections: [
      {
        type: "tips",
        title: "Full Synergy Chain (S-Rank)",
        items: [
          "Louis taunt + shield → DPS di belakang aman, semua damage terfokus ke tank.",
          "Sera buff → ATK+20% + Speed+15% ke seluruh tim sebelum DPS aksi.",
          "Ignis + Louis → DMG taken +30% ke semua musuh dari semua sumber.",
          "Ria burst 360% ATK di window debuff aktif → damage spike tertinggi.",
          "Isabel CRIT sustained → damage stabil tinggi di setiap cycle.",
        ],
      },
      {
        type: "tips",
        title: "Flex & Situational",
        items: [
          "Poby masuk gantikan Ria di konten yang butuh sustained damage — DEF shred -20% stack semua debuffer.",
          "Ceria gantikan Ria di konten AoE heavy — DEF -20% + burst AoE lebih konsisten.",
          "Eluna sebagai alt tank jika konten butuh double tank atau Louis cooldown kritis.",
          "Rina multi-hit sangat diuntungkan debuff stack — tiap hit kena +15% dari Ignis.",
        ],
      },
      {
        type: "tips",
        title: "Meta & Long-Term",
        items: [
          "Dupe hero core (Sera, Ignis) dari gacha → Limit Break naik = stat dan skill makin kuat.",
          "Balance patch bisa mengubah meta — pantau update game secara berkala.",
          "Mechanic tersembunyi (trait, elemental, positioning grid) belum terungkap — siap re-evaluate.",
          "SSR hero baru dari event/gacha → cek synergy di Formation Builder sebelum masuk roster.",
        ],
      },
    ],
  },
];
