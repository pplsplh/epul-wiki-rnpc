import Image from "next/image";
import { Hero } from "@/types";

const TYPE_STYLE: Record<string, string> = {
  Support: "bg-silver/25 text-silver border-silver/30",
  Fighter: "bg-rose/25 text-rose border-rose/30",
  Archer: "bg-frost/25 text-frost border-frost/30",
  Tanker: "bg-sage/25 text-sage border-sage/30",
};

const SIZES = {
  sm: "w-9 h-9 text-sm",
  md: "w-14 h-14 text-lg",
  lg: "w-20 h-20 text-2xl",
  xl: "w-16 h-full text-3xl",
};

interface HeroAvatarProps {
  hero: Hero;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function HeroAvatar({ hero, size = "md", className = "" }: HeroAvatarProps) {
  const style = TYPE_STYLE[hero.type] ?? "bg-stone/25 text-stone border-stone/30";

  if (hero.imagePath) {
    return (
      <div className={`${SIZES[size]} relative rounded-lg overflow-hidden border ${style.split(" ").find((c) => c.startsWith("border")) ?? "border-parchment-dark"} ${className}`}>
        <Image src={hero.imagePath} alt={hero.name} fill className="object-cover object-top" />
      </div>
    );
  }

  return (
    <div className={`${SIZES[size]} ${style} rounded-lg flex items-center justify-center font-serif font-bold border flex-shrink-0 ${className}`}>
      {hero.name[0]}
    </div>
  );
}
