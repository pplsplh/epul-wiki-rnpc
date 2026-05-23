"use client";

import { useState } from "react";
import { phases } from "@/data/phases";
import { PhaseBlock } from "./PhaseBlock";

export function RoadmapAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {phases.map((phase) => (
        <PhaseBlock
          key={phase.id}
          phase={phase}
          isOpen={openId === phase.id}
          onToggle={() => setOpenId(openId === phase.id ? null : phase.id)}
        />
      ))}
    </div>
  );
}
