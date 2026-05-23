import { heroes } from "../data/heroes.js";

/**
 * FormationGrid — renders the 5-slot deploy formation
 * @param {{ formation: Array<{ order: number, heroId: string, role: string, delay: string, isGacha?: boolean }> }} props
 */
export default function FormationGrid({ formation }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "6px",
        margin: "10px 0",
      }}
    >
      {formation.map((slot) => {
        const hero = heroes.find((h) => h.id === slot.heroId);
        return (
          <div
            key={slot.order}
            style={{
              border: slot.isGacha
                ? "0.5px solid rgba(196,164,74,0.4)"
                : "0.5px solid var(--parchment-dark)",
              borderRadius: "var(--radius-md)",
              padding: "8px 4px",
              textAlign: "center",
              background: slot.isGacha
                ? "rgba(196,164,74,0.06)"
                : "rgba(42,36,32,0.03)",
              position: "relative",
            }}
          >
            {slot.isGacha && (
              <span
                style={{
                  position: "absolute",
                  top: 3,
                  right: 4,
                  fontSize: "0.5rem",
                  fontFamily: "var(--font-display)",
                  color: "var(--gold)",
                  letterSpacing: "0.05em",
                }}
              >
                gacha
              </span>
            )}
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.58rem",
                color: "var(--ink-muted)",
                letterSpacing: "0.08em",
                marginBottom: 2,
              }}
            >
              {slot.order === 1 || slot.order === 2
                ? `① Deploy`
                    .replace("①", `${"①②③④⑤"[slot.order - 1]}`)
                : `${"①②③④⑤"[slot.order - 1]} Deploy`}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: slot.isGacha ? "var(--gold)" : "var(--ink)",
                marginBottom: 2,
              }}
            >
              {hero?.name || slot.heroId}
            </div>
            <div
              style={{
                fontFamily: "var(--font-italic)",
                fontStyle: "italic",
                fontSize: "0.68rem",
                color: "var(--ink-muted)",
              }}
            >
              {slot.role}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.58rem",
                color: "var(--stone-light)",
                marginTop: 4,
                letterSpacing: "0.04em",
              }}
            >
              {slot.delay}
            </div>
          </div>
        );
      })}
    </div>
  );
}
