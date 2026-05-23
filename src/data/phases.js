export const phases = [
  {
    id: "early",
    phase: "Phase I",
    title: "The Wanderer's Beginning",
    subtitle: "Early Game",
    icon: "🌱",
    accentColor: "#7a9e8a",
    tags: ["Early Game", "Hero Foundation", "Formation Setup"],
    formation: [
      { order: 1, heroId: "sera", role: "Support", delay: "t=0s" },
      { order: 2, heroId: "ignis", role: "Debuffer", delay: "t=0s" },
      { order: 3, heroId: "ria", role: "Burst DPS", delay: "t+10s" },
      { order: 4, heroId: "muriel", role: "Bruiser", delay: "t+20s" },
      { order: 5, heroId: "isabel", role: "CRIT DPS", delay: "t+30s" },
    ],
    sections: [
      {
        title: "Upgrade Priority",
        type: "priority",
        items: [
          { label: "🔴 Utama dulu", content: "Sera → Ignis → Ria" },
          { label: "🟡 Setelahnya", content: "Isabel → Muriel" },
        ],
      },
      {
        title: "Sistem yang harus di-unlock duluan",
        type: "tips",
        items: [
          "Alchemy Gem System — prioritas utama, ini yang paling boost offline gains secara exponential.",
          "Klaim resource offline setiap kali login — kapasitas ada batasnya, jangan biarkan terlalu lama.",
          "Selesaikan daily tasks setiap hari — sumber resource paling stabil untuk F2P.",
        ],
      },
      {
        title: "Gap kritis saat ini",
        type: "warning",
        content: "Belum punya Tanker (Louis/Eluna). Muriel bisa cover sementara tapi tidak bisa absorb heavy hits di mid game.",
      },
    ],
  },
  {
    id: "mid",
    phase: "Phase II",
    title: "The Dungeon Trials",
    subtitle: "Mid Game",
    icon: "⚔️",
    accentColor: "#9ca8b0",
    tags: ["Mid Game", "Team Synergy", "Dungeon"],
    formation: [
      { order: 1, heroId: "louis", role: "Tank", delay: "t=0s", isGacha: true },
      { order: 2, heroId: "sera", role: "Support", delay: "t=0s" },
      { order: 3, heroId: "ignis", role: "Debuffer", delay: "t+10s" },
      { order: 4, heroId: "ria", role: "Burst DPS", delay: "t+20s" },
      { order: 5, heroId: "isabel", role: "CRIT DPS", delay: "t+30s" },
    ],
    sections: [
      {
        title: "Target hero gacha (prioritas)",
        type: "heroList",
        heroIds: ["louis", "poby", "eluna"],
      },
      {
        title: "Combo debuff yang harus diaktifkan",
        type: "tips",
        items: [
          "Ignis (DMG taken +15%) + Louis (DMG taken +15%) = musuh take +30% damage dari semua sumber.",
          "Poby (DEF -20%) + debuff tadi = damage spike signifikan, terutama untuk Ria burst skill.",
          "Sera buff harus aktif sebelum Ria deploy — timing ini krusial untuk damage optimal.",
        ],
      },
      {
        title: "Konten yang dibuka",
        type: "tips",
        items: [
          "Dungeon runs — prioritas clear tiap hari, sumber equipment upgrade terbaik.",
          "Multi-boss raids — koordinasi skill timing mulai penting, jangan asal deploy.",
        ],
      },
    ],
  },
  {
    id: "late",
    phase: "Phase III",
    title: "The Ancient Depths",
    subtitle: "Late Game",
    icon: "✨",
    accentColor: "#c4a44a",
    tags: ["Late Game", "CRIT Build", "Raid Meta"],
    formation: [
      { order: 1, heroId: "louis", role: "Shield+Taunt", delay: "t=0s", isGacha: true },
      { order: 2, heroId: "sera", role: "Buff+Heal", delay: "t=0s" },
      { order: 3, heroId: "ignis", role: "DMG+15%", delay: "t+10s" },
      { order: 4, heroId: "ria", role: "360% ATK", delay: "t+20s" },
      { order: 5, heroId: "isabel", role: "CRIT Main", delay: "t+30s" },
    ],
    sections: [
      {
        title: "Isabel jadi main carry",
        type: "tips",
        items: [
          "CRIT chance +70% + CRIT DMG +40% — carry terkuat di roster saat late game scaling.",
          "Investasikan equipment dengan CRIT stat ke Isabel terlebih dahulu.",
          "Sera buff harus selalu aktif sebelum Isabel unleash skill besar.",
        ],
      },
      {
        title: "Strategi raid",
        type: "tips",
        items: [
          "Skill timing jadi pembeda utama — perhatikan cooldown cycle setiap hero.",
          "Louis taunt harus aktif sebelum boss menggunakan serangan AoE besar — shield 30% max HP vital.",
          "Muriel self-heal trigger di <30% HP — berguna sebagai last-resort di raid hard mode.",
        ],
      },
    ],
  },
  {
    id: "end",
    phase: "Phase IV",
    title: "The Realm's True End",
    subtitle: "End Game",
    icon: "👁️",
    accentColor: "#8a5a6a",
    tags: ["End Game", "Optimization", "Full Synergy"],
    formation: [
      { order: 1, heroId: "louis", role: "Shield+Taunt", delay: "t=0s", isGacha: true },
      { order: 2, heroId: "sera", role: "Buff+Heal", delay: "t=0s" },
      { order: 3, heroId: "ignis", role: "DMG+15%", delay: "t+10s" },
      { order: 4, heroId: "ria", role: "360% ATK", delay: "t+20s" },
      { order: 5, heroId: "isabel", role: "CRIT Main", delay: "t+30s" },
    ],
    sections: [
      {
        title: "Full synergy layer",
        type: "tips",
        items: [
          "Louis taunt + shield → semua damage ke tank, DPS aman bergerak.",
          "Sera buff aktif → semua DPS dapat ATK+20% dan speed+15%.",
          "Ignis + Louis → DMG taken +30% ke semua musuh.",
          "Ria burst 360% ATK di window debuff aktif → maximum damage spike.",
          "Isabel CRIT scaling → sustained damage tertinggi di late cycle.",
        ],
      },
      {
        title: "Hal yang bisa mengubah roadmap ini",
        type: "tips",
        items: [
          "Dapat hero SSR dari gacha dengan kit lebih kuat → re-evaluate formasi dari Phase II.",
          "Game update / balance patch → meta bisa berubah, pantau terus.",
          "Mechanic tersembunyi (trait, elemental, positioning grid) belum terungkap → bisa shift priority.",
        ],
      },
      {
        title: "Catatan F2P",
        type: "warning",
        content: "Roadmap ini dibangun dari hero yang pasti kamu punya. Setiap hero gacha diperlakukan sebagai variabel — bukan guarantee. Tanpa Louis, Isabel + Ria + Muriel tetap bisa push konten dengan formasi agresif.",
      },
    ],
  },
];
