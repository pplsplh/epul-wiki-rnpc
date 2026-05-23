import HeroBadge from "./HeroBadge.jsx";

/**
 * HeroCard — full card for a single hero
 * @param {{ hero: object, expanded?: boolean }} props
 */
export default function HeroCard({ hero, expanded = false }) {
  return (
    <div
      style={{
        border: "0.5px solid var(--parchment-dark)",
        borderRadius: "var(--radius-lg)",
        padding: "1rem 1.25rem",
        background: hero.rarity === "gacha"
          ? "rgba(196,164,74,0.04)"
          : "var(--parchment)",
        marginBottom: "0.75rem",
        borderLeft: hero.rarity === "gacha"
          ? "2px solid rgba(196,164,74,0.4)"
          : "2px solid var(--parchment-dark)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <HeroBadge type={hero.type} />
        {hero.rarity === "gacha" && (
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              padding: "2px 8px",
              borderRadius: "99px",
              border: "0.5px solid rgba(196,164,74,0.4)",
              background: "rgba(196,164,74,0.08)",
              color: "var(--gold)",
            }}
          >
            GACHA
          </span>
        )}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "var(--ink)",
          }}
        >
          {hero.name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "0.8rem",
            color: "var(--ink-muted)",
            marginLeft: "auto",
          }}
        >
          {hero.role}
        </span>
      </div>

      {/* Notes */}
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "0.88rem",
          color: "var(--ink-muted)",
          lineHeight: 1.5,
          marginBottom: expanded ? 12 : 0,
        }}
      >
        {hero.notes}
      </p>

      {/* Skills (expanded) */}
      {expanded && (
        <div style={{ marginTop: 8 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              color: "var(--ink-muted)",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Skills
          </div>
          {hero.skills.map((skill, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 5,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.6rem",
                  color: "var(--stone-light)",
                  marginTop: 3,
                  flexShrink: 0,
                  minWidth: 32,
                }}
              >
                Lv{skill.level}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.88rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.5,
                }}
              >
                {skill.desc}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
