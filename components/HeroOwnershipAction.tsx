"use client";

import { useOwnedHeroes, BASE_OWNED } from "@/hooks/useOwnedHeroes";
import { Plus } from "lucide-react";

export function HeroOwnershipAction({ heroId }: { heroId: string }) {
  const { isOwned, addOwned, removeOwned } = useOwnedHeroes();

  const owned  = isOwned(heroId);
  const isBase = BASE_OWNED.has(heroId);

  if (isBase) return null;

  if (owned) return null;

  return (
    <button
      onClick={() => addOwned(heroId)}
      className="inline-flex items-center gap-1.5 text-xs font-serif text-white border border-sage bg-sage/50 hover:bg-sage/70 rounded-lg px-3 py-1.5 transition-colors"
    >
      <Plus className="w-3.5 h-3.5" /> Tambah ke koleksi
    </button>
  );
}
