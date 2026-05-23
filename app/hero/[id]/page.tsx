import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { heroes, getHeroById } from "@/data/heroes";
import { getHeroSynergies } from "@/lib/synergy";
import { HeroAvatar } from "@/components/HeroAvatar";
import { HeroBadge } from "@/components/HeroBadge";
import { HeroOwnershipAction } from "@/components/HeroOwnershipAction";
import { Divider } from "@/components/Divider";
import { ChevronLeft, Sparkles, Shield, Heart, Swords, Target } from "lucide-react";

export function generateStaticParams() {
  return heroes.map((h) => ({ id: h.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hero = getHeroById(id);
  if (!hero) return { title: "Hero Not Found" };
  return {
    title: `${hero.name} — Rellion Guide`,
    description: `${hero.role}. ${hero.notes}`,
  };
}

const RARITY_BADGE: Record<string, string> = {
  owned: "bg-sage/20 text-sage border-sage/40",
  gacha: "bg-gold/20 text-gold border-gold/40",
};

const PRIORITY_COLOR = (p: number) => {
  if (p === 1) return "text-gold";
  if (p === 2) return "text-rose";
  if (p <= 4) return "text-frost";
  return "text-stone";
};

const RATING_BADGE: Record<string, string> = {
  S: "bg-gold text-ink",
  A: "bg-sage text-parchment",
  B: "bg-frost text-parchment",
};

const RATING_CARD: Record<string, string> = {
  S: "border-gold/50 bg-gold/10",
  A: "border-sage/50 bg-sage/10",
  B: "border-frost/50 bg-frost/10",
};

export default async function HeroDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hero = getHeroById(id);
  if (!hero) notFound();

  const RATING_ORDER = { S: 0, A: 1, B: 2 };
  const synergies = getHeroSynergies(hero.id).sort((a, b) => RATING_ORDER[a.rating] - RATING_ORDER[b.rating]);

  const synergyPartnerIds = [...new Set(synergies.flatMap((r) => r.heroes).filter((hid) => hid !== hero.id))];
  const synergyPartners = synergyPartnerIds.map((hid) => getHeroById(hid)).filter(Boolean);

  return (
    <main className="min-h-screen bg-parchment-dark">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back */}
        <Link
          href="/roster"
          className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink font-serif transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Kembali ke Roster
        </Link>

        <div className="lg:grid lg:grid-cols-4 lg:gap-5 lg:items-start">

          {/* Col 1 — hero header + hero lainnya */}
          <div className="lg:col-span-1 lg:sticky lg:top-20 space-y-4 mb-4 lg:mb-0">
            {/* Hero Header — full art background */}
            <div className="relative rounded-xl overflow-hidden border border-parchment-dark">
              {hero.imagePath && (
                <div className="absolute inset-0">
                  <Image
                    src={hero.imagePath.replace("/images/heroes/", "/images/")}
                    alt=""
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/60 to-ink/20" />
                </div>
              )}

              <div className="relative z-10 p-5">
                <div className="flex items-start gap-4">
                  <HeroAvatar hero={hero} size="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <HeroBadge type={hero.type} />
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-serif font-semibold text-white ${
                        hero.rarity === "gacha"
                          ? "bg-gold/50 border-gold"
                          : "bg-sage/50 border-sage"
                      }`}>
                        {hero.rarity === "gacha" ? "✦ GACHA" : "OWNED"}
                      </span>
                      <HeroOwnershipAction heroId={hero.id} />
                    </div>
                    <h1 className="font-serif text-2xl text-parchment mb-0">{hero.name}</h1>
                    {hero.title && (
                      <p className="text-xs text-parchment/60 font-[var(--font-fell)] italic mb-0.5">{hero.title}</p>
                    )}
                    <p className="text-sm text-parchment/70 italic font-[var(--font-fell)]">{hero.role}</p>
                    <p className="text-xs font-serif mt-2 text-parchment/70">
                      Priority #{hero.priority} · {hero.position === "front" ? "Depan" : hero.position === "mid" ? "Tengah" : "Belakang"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-parchment/20">
                  <p className="text-sm text-parchment/70 leading-relaxed italic font-[var(--font-fell)]">
                    {hero.notes}
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Lainnya */}
            <div className="bg-parchment border border-parchment-dark rounded-xl p-5">
              <h2 className="font-serif text-base text-ink mb-3">Hero Lainnya</h2>
              <div className="grid grid-cols-3 gap-2">
                {heroes
                  .filter((h) => h.id !== hero.id)
                  .map((h) => (
                    <Link
                      key={h.id}
                      href={`/hero/${h.id}`}
                      className="flex flex-col items-center gap-1 p-2 border border-parchment-dark rounded-lg hover:border-gold/50 hover:bg-gold/5 transition-all text-center"
                    >
                      <HeroAvatar hero={h} size="sm" />
                      <p className="text-[9px] font-serif text-ink leading-tight">{h.name}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* Col 2 — skills + stats */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-parchment border border-parchment-dark rounded-xl p-5">
              <h2 className="font-serif text-lg text-ink mb-4">Skills</h2>
              <div className="space-y-3">
                {hero.skills.map((skill, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-10 text-center text-xs font-serif text-parchment bg-ink-muted/60 rounded px-1.5 py-0.5">
                      Lv{skill.level}
                    </span>
                    <p className="text-sm text-ink leading-relaxed">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {hero.stats && (
              <div className="bg-parchment border border-parchment-dark rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-lg text-ink">Stats Lv.160</h2>
                  <span className="text-xs font-serif text-stone bg-stone/10 border border-stone/20 rounded px-2 py-0.5">
                    ⚔ Power {hero.stats.power.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "ATK",         value: hero.stats.atk.toLocaleString() },
                    { label: "DEF",         value: hero.stats.def.toLocaleString() },
                    { label: "HP",          value: hero.stats.hp.toLocaleString() },
                    { label: "CRIT Chance", value: `${hero.stats.critChance}%` },
                    { label: "CRIT DMG",    value: `${hero.stats.critDmg}%` },
                    { label: "ATK Speed",   value: `${hero.stats.atkSpeed}%` },
                    { label: "Move Speed",  value: `${hero.stats.moveSpeed}%` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between border-b border-parchment-dark pb-2">
                      <span className="text-xs text-ink-muted font-serif">{label}</span>
                      <span className="text-sm font-serif text-ink font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Col 3-4 — sinergi */}
          <div className="lg:col-span-2 space-y-4">
            {synergies.length > 0 && (
              <div className="bg-parchment border border-parchment-dark rounded-xl p-5">
                <h2 className="font-serif text-lg text-ink mb-1">Sinergi</h2>
                <p className="text-xs text-ink-muted mb-4">Hero yang cocok dipasangkan dengan {hero.name}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {synergyPartners.map((p) => {
                    if (!p) return null;
                    return (
                      <Link
                        key={p.id}
                        href={`/hero/${p.id}`}
                        className="flex items-center gap-2 px-3 py-1.5 border border-parchment-dark rounded-lg hover:border-gold/50 hover:bg-gold/5 transition-all"
                      >
                        <HeroAvatar hero={p} size="sm" />
                        <span className="text-xs font-serif text-ink">{p.name}</span>
                      </Link>
                    );
                  })}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {synergies.map((rule) => (
                    <div key={rule.id} className={`flex gap-3 p-3 rounded-lg border ${RATING_CARD[rule.rating] ?? "border-parchment-dark"}`}>
                      <span className={`text-xs font-serif font-bold px-2 py-0.5 rounded self-start flex-shrink-0 ${RATING_BADGE[rule.rating] ?? ""}`}>
                        {rule.rating}
                      </span>
                      <div>
                        <p className="text-sm font-serif text-ink">{rule.label}</p>
                        <p className="text-xs text-ink-muted leading-relaxed">{rule.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {rule.heroes.map((hid) => {
                            const h = getHeroById(hid);
                            if (!h) return null;
                            return (
                              <span key={hid} className={`text-[9px] font-serif px-2 py-0.5 rounded-full border ${
                                hid === hero.id
                                  ? "border-gold/50 bg-gold/15 text-gold"
                                  : "border-parchment-dark text-ink-muted"
                              }`}>
                                {h.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
