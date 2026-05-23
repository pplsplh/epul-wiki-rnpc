"use client";
import { useState } from "react";
import { phases } from "./data/phases.js";
import PhaseBlock from "./components/PhaseBlock.jsx";
import HeroRoster from "./components/HeroRoster.jsx";
import "./styles/globals.css";

const NAV = [
  { id: "roadmap", label: "Roadmap" },
  { id: "roster",  label: "Hero Roster" },
];

export default function App() {
  const [tab, setTab] = useState("roadmap");

  return (
    <div style={{ minHeight: "100vh", background: "var(--parchment)" }}>
      {/* ── Navigation ── */}
      <nav
        style={{
          borderBottom: "0.5px solid var(--parchment-dark)",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: 24,
          height: 52,
          position: "sticky",
          top: 0,
          background: "var(--parchment)",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--ink)",
            letterSpacing: "0.1em",
            marginRight: 8,
          }}
        >
          RELLION
        </span>
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => setTab(n.id)}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: tab === n.id ? "var(--sage)" : "var(--ink-muted)",
              background: "none",
              border: "none",
              borderBottom: tab === n.id ? "1.5px solid var(--sage)" : "1.5px solid transparent",
              paddingBottom: 2,
              cursor: "pointer",
              transition: "color 0.18s, border-color 0.18s",
            }}
          >
            {n.label}
          </button>
        ))}
      </nav>

      {/* ── Roadmap Tab ── */}
      {tab === "roadmap" && (
        <main style={{ maxWidth: 720, margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>
          {/* Header */}
          <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                color: "var(--ink-muted)",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Strategy Guide · F2P Edition
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: 600,
                color: "var(--ink)",
                letterSpacing: "0.1em",
                marginBottom: 6,
              }}
            >
              Journey Roadmap
            </h1>
            <p
              style={{
                fontFamily: "var(--font-italic)",
                fontStyle: "italic",
                fontSize: "0.95rem",
                color: "var(--ink-muted)",
              }}
            >
              dari awal perjalanan menuju end of the realm
            </p>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                margin: "1.25rem auto 0",
                maxWidth: 340,
              }}
            >
              <div style={{ flex: 1, height: "0.5px", background: "var(--parchment-dark)" }} />
              <span style={{ fontSize: 14, color: "var(--stone-light)", opacity: 0.7 }}>✦</span>
              <div style={{ flex: 1, height: "0.5px", background: "var(--parchment-dark)" }} />
            </div>
          </header>

          {/* Phase blocks */}
          {phases.map((phase, i) => (
            <div key={phase.id}>
              <PhaseBlock phase={phase} />
              {/* Connector */}
              {i < phases.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "-4px 0",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: "0.5px",
                      height: 28,
                      background: "var(--parchment-dark)",
                    }}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Footer note */}
          <div
            style={{
              marginTop: "2.5rem",
              borderTop: "0.5px solid var(--parchment-dark)",
              paddingTop: "1.5rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-italic)",
                fontStyle: "italic",
                fontSize: "0.82rem",
                color: "var(--ink-muted)",
                lineHeight: 1.6,
              }}
            >
              Roadmap ini dibangun dari hero yang pasti dimiliki. Hero gacha diperlakukan sebagai
              variabel — bukan guarantee. Update roadmap sesuai meta patch terbaru.
            </p>
          </div>
        </main>
      )}

      {/* ── Roster Tab ── */}
      {tab === "roster" && <HeroRoster />}
    </div>
  );
}
