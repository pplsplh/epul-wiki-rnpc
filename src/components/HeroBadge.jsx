import { heroTypes } from "../data/heroes.js";

/**
 * HeroBadge — displays hero type as a styled pill
 * @param {{ type: string, size?: "sm" | "md" }} props
 */
export default function HeroBadge({ type, size = "md" }) {
  const style = heroTypes[type] || heroTypes["Fighter"];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-display)",
        fontSize: size === "sm" ? "0.6rem" : "0.65rem",
        letterSpacing: "0.1em",
        padding: size === "sm" ? "2px 7px" : "3px 10px",
        borderRadius: "99px",
        border: `0.5px solid ${style.border}`,
        background: style.bg,
        color: style.color,
        whiteSpace: "nowrap",
        flexShrink: 0,
        minWidth: 58,
        textAlign: "center",
      }}
    >
      {type}
    </span>
  );
}
