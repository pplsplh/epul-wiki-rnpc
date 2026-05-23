import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";

const INPUT_DIR  = "./public/images";
const OUTPUT_DIR = "./public/images/heroes/banner";

// Source: 1920×1080 emulator screenshots
// Left nav: 0-260, character art: 260-900, right stats: 900+, currency bar top ~70px, buttons bottom ~100px
const CROP = { left: 760, top: 80, width: 380, height: 960 };

const HEROES = [
  "sera", "ignis", "ria", "isabel", "muriel",
  "eluna", "ceria", "louis", "poby", "penny", "edel", "rina",
];

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const hero of HEROES) {
    const input  = path.join(INPUT_DIR,  `${hero}.jpg`);
    const output = path.join(OUTPUT_DIR, `${hero}.jpg`);

    try {
      await sharp(input)
        .extract(CROP)
        .jpeg({ quality: 95 })
        .toFile(output);
      console.log(`✓ ${hero}`);
    } catch (err) {
      console.error(`✗ ${hero}: ${err.message}`);
    }
  }

  console.log("\nDone — output: public/images/heroes/banner/");
}

main();
