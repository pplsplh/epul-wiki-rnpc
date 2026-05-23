import sharp from "sharp";

const SRC = "public/images";
const OUT = "public/images/heroes";

// Source: 1920×1080 emulator screenshots
// Face/bust square crop dari character art langsung
const CROP = { left: 760, top: 80, width: 400, height: 520 };

const HEROES = ["sera","ignis","ria","isabel","muriel","eluna","ceria","louis","poby","penny","edel","rina"];

console.log("Cropping hero icons from Lv.160 portrait...\n");

for (const name of HEROES) {
  const src = `${SRC}/${name}.jpg`;
  const out = `${OUT}/${name}.jpg`;

  await sharp(src)
    .extract(CROP)
    .resize(200, 200, { fit: "cover", position: "attention" })
    .jpeg({ quality: 92 })
    .toFile(out);

  console.log(`✓ ${name}`);
}

console.log("\nDone!");
