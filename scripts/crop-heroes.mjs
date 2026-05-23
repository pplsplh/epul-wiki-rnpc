import sharp from "sharp";
import { mkdir } from "fs/promises";
import { existsSync } from "fs";

const SRC = "public/images/tierlist-hero.jpg";
const OUT = "public/images/heroes";

await mkdir(OUT, { recursive: true });

// Koordinat berdasarkan layout tier list
// Label column kiri: ~170px, setiap hero: ~143px wide
const LEFT = 170;
const W = 140; // (1014 - 170) / 6 = 140.7 → 140px per hero

const ROWS = [
  { y: 0,   h: 200 }, // S tier
  { y: 200, h: 220 }, // A tier
  { y: 420, h: 210 }, // B tier
];

// Map posisi → nama hero (tier C & SKIP dilewati)
const HEROES = [
  // S tier (row 0)
  { row: 0, col: 0, name: "ignis"  },
  { row: 0, col: 1, name: "sera"   },
  { row: 0, col: 2, name: "edel"   },
  { row: 0, col: 3, name: "rina"   },
  { row: 0, col: 4, name: "louis"  },
  { row: 0, col: 5, name: "muriel" },
  // A tier (row 1)
  { row: 1, col: 0, name: "ria"    },
  { row: 1, col: 1, name: "penny"  },
  { row: 1, col: 2, name: "poby"   },
  { row: 1, col: 3, name: "ceria"  },
  // B tier (row 2)
  { row: 2, col: 0, name: "eluna"  },
  { row: 2, col: 1, name: "isabel" },
];

console.log("Cropping hero images...\n");

for (const hero of HEROES) {
  const { y, h } = ROWS[hero.row];
  const x = LEFT + hero.col * W;
  const outPath = `${OUT}/${hero.name}.jpg`;

  await sharp(SRC)
    .extract({ left: x, top: y, width: W, height: h })
    .resize(200, 200, { fit: "cover", position: "top" })
    .jpeg({ quality: 90 })
    .toFile(outPath);

  console.log(`✓ ${hero.name.padEnd(8)} → ${outPath}`);
}

console.log("\nDone! 12 hero images cropped.");
