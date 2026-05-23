import { HeroType } from "@/types";

const typeColors: Record<HeroType, { bg: string; text: string }> = {
  Support: { bg: "bg-frost/60",  text: "text-white" },
  Fighter: { bg: "bg-sage/60",   text: "text-white" },
  Archer:  { bg: "bg-gold/60",   text: "text-white" },
  Tanker:  { bg: "bg-rose/60",   text: "text-white" },
};

interface HeroBadgeProps {
  type: HeroType;
  className?: string;
}

export function HeroBadge({ type, className = "" }: HeroBadgeProps) {
  const colors = typeColors[type];
  
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 
        text-xs font-serif tracking-wide uppercase
        rounded border border-current/40
        ${colors.bg} ${colors.text}
        ${className}
      `}
    >
      {type}
    </span>
  );
}
