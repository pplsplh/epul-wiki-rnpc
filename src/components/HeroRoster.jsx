"use client";
import { useState } from "react";
import { heroes } from "../data/heroes.js";
import HeroCard from "./HeroCard.jsx";

const FILTERS = ["All", "Owned", "Gacha", "Support", "Fighter", "Archer", "Tanker"];

/**
 * HeroRoster — full hero collection page with filter
 */
export default function HeroRoster() {
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = heroes.filter((h) => {
    if (filter === "All") return true;
    if (filter === "Owned") return h.rarity === "owned";
    if (filter === "Gacha") return h.rarity === "gacha";
    return h.type === filter;
  });

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem" }}>
      {/* Page title */}
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "var(--ink-muted)",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          Rellion — Hero Collection
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.8rem",
            fontWeight: 600,
            color: "var(--ink)",
          }}
        >
          Roster & Skills
        </h1>
      </div>

      {/* Filter pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: "1.5rem",
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              padding: "4px 12px",
              borderRadius: "99px",
              border: filter === f
                ? "0.5px solid var(--sage)"
                : "0.5px solid var(--parchment-dark)",
              background: filter === f
                ? "rgba(122,158,138,0.12)"
                : "transparent",
              color: filter === f ? "var(--sage)" : "var(--ink-muted)",
              cursor: "pointer",
              transition: "all 0.18s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Hero list */}
      {filtered.map((hero) => (
        <div
          key={hero.id}
          onClick={() =>
            setExpandedId(expandedId === hero.id ? null : hero.id)
          }
          style={{ cursor: "pointer" }}
        >
          <HeroCard hero={hero} expanded={expandedId === hero.id} />
        </div>
      ))}
    </div>
  );
}
