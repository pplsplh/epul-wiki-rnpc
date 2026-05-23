# Rellion — Journey Roadmap

Strategy guide dan roadmap untuk game **RELLION: NPC Survival**, dibangun dengan React + Vite.

## Stack

- **React 18** — UI components
- **Vite** — dev server dan bundler
- **Pure CSS** — Frieren-inspired aesthetic (no Tailwind, no UI library)

## Setup

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Build untuk production
npm run build
```

## Struktur Folder

```
rellion-roadmap/
├── src/
│   ├── components/
│   │   ├── PhaseBlock.jsx     # Collapsible roadmap phase card
│   │   ├── FormationGrid.jsx  # 5-slot deploy formation visual
│   │   ├── HeroCard.jsx       # Hero info card (collapsible skills)
│   │   ├── HeroBadge.jsx      # Type badge pill (Support/Fighter/dll)
│   │   └── HeroRoster.jsx     # Full roster page dengan filter
│   ├── data/
│   │   ├── heroes.js          # Semua hero data + skills
│   │   └── phases.js          # Roadmap phase data (Early→End Game)
│   ├── styles/
│   │   └── globals.css        # Frieren palette + typography
│   ├── App.jsx                # Main app + navigation
│   └── main.jsx               # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Cara Edit

### Tambah hero baru
Edit `src/data/heroes.js` — tambahkan object baru ke array `heroes`.

### Update formasi
Edit `src/data/phases.js` — ubah array `formation` di phase yang sesuai.

### Update tips/strategi
Edit `src/data/phases.js` — ubah array `sections[].items` di phase yang sesuai.

### Ganti warna tema
Edit CSS variables di `src/styles/globals.css` di bagian `:root`.

## Notes untuk Claude Code

- Semua data dipisah di `src/data/` — edit di sini dulu sebelum ubah komponen
- Komponen sudah modular, tiap file satu tanggung jawab
- Styling pakai inline styles + CSS variables, tidak ada Tailwind
- Belum ada routing — kalau mau tambah halaman baru, bisa pakai React Router
