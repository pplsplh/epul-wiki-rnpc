"use client";
import { useState } from "react";
import FormationGrid from "./FormationGrid.jsx";
import HeroCard from "./HeroCard.jsx";
import { heroes } from "../data/heroes.js";

/**
 * PhaseBlock — collapsible roadmap phase card
 * @param {{ phase: object }} props
 */
export default function PhaseBlock({ phase }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        border: open
          ? `0.5px solid ${phase.accentColor}55`
          : "0.5px solid var(--parchment-dark)",
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem 1.5rem",
        background: "var(--parchment)",
        cursor: "pointer",
        transition: "border-color 0.22s, box-shadow 0.22s",
        boxShadow: open ? "0 4px 20px rgba(42,36,32,0.08)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={() => setOpen((v) => !v)}
    >
      {/* Phase accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: phase.accentColor,
          borderRadius: "3px 0 0 3px",
          opacity: open ? 1 : 0.5,
          transition: "opacity 0.22s",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "0.5px solid var(--parchment-dark)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
              background: "rgba(42,36,32,0.03)",
            }}
          >
            {phase.icon}
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                color: "var(--ink-muted)",
                textTransform: "uppercase",
              }}
            >
              {phase.phase}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                fontWeight: 600,
                color: "var(--ink)",
                marginTop: 1,
              }}
            >
              {phase.title}
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 13,
            color: "var(--ink-muted)",
            paddingTop: 4,
            transition: "transform 0.22s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          ▾
        </div>
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginTop: 12,
        }}
      >
        {phase.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              padding: "3px 9px",
              borderRadius: "99px",
              border: "0.5px solid var(--parchment-dark)",
              color: "var(--ink-muted)",
              background: "rgba(42,36,32,0.03)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Body */}
      {open && (
        <div
          style={{
            marginTop: "1.25rem",
            borderTop: "0.5px solid var(--parchment-dark)",
            paddingTop: "1.25rem",
            animation: "fadeIn 0.25s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Formation */}
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
            Formation Deploy
          </div>
          <div
            style={{
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: "0.82rem",
              color: "var(--ink-muted)",
              marginBottom: 8,
            }}
          >
            deploy 2 hero pertama → setiap 10 detik +1 hero berikutnya
          </div>
          <FormationGrid formation={phase.formation} />

          {/* Sections */}
          {phase.sections.map((section, i) => (
            <div key={i} style={{ marginTop: 20 }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  color: "var(--ink-muted)",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                {section.title}
              </div>

              {section.type === "heroList" && (
                <div>
                  {section.heroIds.map((id) => {
                    const hero = heroes.find((h) => h.id === id);
                    return hero ? <HeroCard key={id} hero={hero} /> : null;
                  })}
                </div>
              )}

              {section.type === "tips" && (
                <ul style={{ listStyle: "none" }}>
                  {section.items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.45rem",
                          color: "var(--stone-light)",
                          marginTop: 7,
                          flexShrink: 0,
                        }}
                      >
                        ◆
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9rem",
                          color: "var(--ink-muted)",
                          lineHeight: 1.6,
                        }}
                        dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }}
                      />
                    </li>
                  ))}
                </ul>
              )}

              {section.type === "priority" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                  }}
                >
                  {section.items.map((item, j) => (
                    <div
                      key={j}
                      style={{
                        border: "0.5px solid var(--parchment-dark)",
                        borderRadius: "var(--radius-md)",
                        padding: "10px 12px",
                        background: "rgba(42,36,32,0.03)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "0.62rem",
                          letterSpacing: "0.1em",
                          color: "var(--ink-muted)",
                          marginBottom: 4,
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-italic)",
                          fontStyle: "italic",
                          fontSize: "0.88rem",
                          color: "var(--ink-soft)",
                        }}
                      >
                        {item.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.type === "warning" && (
                <div
                  style={{
                    border: "0.5px solid rgba(196,164,74,0.35)",
                    borderRadius: "var(--radius-md)",
                    padding: "10px 14px",
                    background: "rgba(196,164,74,0.06)",
                    fontFamily: "var(--font-italic)",
                    fontStyle: "italic",
                    fontSize: "0.85rem",
                    color: "var(--gold)",
                    lineHeight: 1.5,
                  }}
                >
                  ⚠ {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
