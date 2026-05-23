import Link from "next/link";
import { RoadmapAccordion } from "@/components/RoadmapAccordion";
import { Divider } from "@/components/Divider";
import { HeroShowcase } from "@/components/HeroShowcase";
import { Sparkles, ChevronRight, Map, Users, Swords } from "lucide-react";

const FEATURES = [
  { icon: Map,      title: "Interactive Roadmap", desc: "Panduan dari early game sampai end game dengan formasi optimal." },
  { icon: Users,    title: "Hero Database",        desc: "Info lengkap skill dan priority untuk semua hero owned & gacha." },
  { icon: Swords,   title: "Formation Guide",      desc: "Deploy timing dan combo synergy untuk maximum damage output." },
  { icon: Sparkles, title: "F2P Friendly",         desc: "Strategi optimal tanpa perlu whale. Maximize resource efficiency." },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroShowcase />

      {/* ── Features ── */}
      <section className="py-20 px-4 bg-parchment">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">Your Journey Awaits</h2>
            <p className="text-ink-muted max-w-2xl mx-auto">
              Everything you need to master Rellion: NPC Survival dari dasar sampai jadi pro player.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-xl border border-parchment-dark hover:border-gold/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-lg bg-sage/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-sage" />
                </div>
                <h3 className="font-serif text-lg text-ink mb-2">{title}</h3>
                <p className="text-sm text-ink-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section id="roadmap" className="bg-parchment-dark">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-2">
              {"The Wanderer's Guide"}
            </h2>
            <p className="text-ink-muted italic font-[var(--font-fell)] text-sm md:text-base">
              F2P Strategy from Early to End Game
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-sage-pale/50 border border-sage-light rounded-lg mb-6">
            <Sparkles className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-ink-soft font-medium">Tap any phase to expand</p>
              <p className="text-xs text-ink-muted mt-1">
                View formation details, deploy timing, and strategic tips
              </p>
            </div>
          </div>
          <Divider />
        </div>

        <div className="max-w-4xl mx-auto px-4 pb-12">
          <RoadmapAccordion />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-deep-forest">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl text-parchment mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-sage-light mb-8 max-w-xl mx-auto">
            Master setiap phase, optimize formasi, dan jadilah pemain terbaik di Rellion: NPC Survival.
          </p>
          <Link
            href="/roster"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold/90 text-ink font-serif rounded-md transition-colors"
          >
            Start Your Adventure <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-4 bg-ink">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="font-serif text-parchment">Rellion Guide</span>
          </div>
          <p className="text-sm text-stone-light text-center">
            Fan-made guide dengan Frieren-inspired aesthetic. Game by DAERI SOFT.
          </p>
          <p className="text-xs text-stone">Made with ✦ for F2P players</p>
        </div>
      </footer>
    </main>
  );
}
