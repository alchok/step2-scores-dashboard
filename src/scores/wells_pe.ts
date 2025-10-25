┘
import type { ScoreDef } from "../score.types";
import { rnd, coin } from "../utils/random";

const WELLS_PE: ScoreDef = {
  id: "wells_pe",
  name: "Wells — Pulmonary Embolism",
  tags: ["Pulm","ED"],
  learn: {
    purpose: "Estimate PE probability (2‑tier or 3‑tier).",
    criteria: [
      { key: "Clinical signs of DVT", points: 3 },
      { key: "PE more likely than alternate dx", points: 3 },
      { key: "HR > 100", points: 1.5 },
      { key: "Recent immobilization/surgery", points: 1.5 },
      { key: "Previous DVT/PE", points: 1.5 },
      { key: "Hemoptysis", points: 1 },
      { key: "Active cancer", points: 1 },
    ],
    tiers: [
      { label: "2‑tier", range: "≤4 Unlikely · >4 Likely" },
      { label: "3‑tier", range: "0–1 Low · 2–6 Mod · ≥7 High" },
    ],
    actions: ["Unlikely: PERC or D‑dimer", "Likely: CTPA or V/Q"],
    caveats: ["Only apply PERC if gestalt very low and stable"],
  },
  drill: () => {
    const signsDVT = coin(0.4), peLikely = coin(0.5), hr = rnd(70, 125, 0);
    const immob = coin(0.35), prev = coin(0.3), hemop = coin(0.15), ca = coin(0.2);
    let score = 0;
    if (signsDVT) score += 3; if (peLikely) score += 3; if (hr > 100) score += 1.5;
    if (immob) score += 1.5; if (prev) score += 1.5; if (hemop) score += 1; if (ca) score += 1;
    const twoTier = score <= 4 ? "Unlikely" : "Likely";
    const threeTier = score >= 7 ? "High" : score >= 2 ? "Moderate" : "Low";
    return {
      stem: [
        `DVT signs ${signsDVT?"Yes":"No"}`, `Alt dx less likely ${peLikely?"Yes":"No"}`, `HR ${hr}`,
        `Immobilization ${immob?"Yes":"No"}`, `Prior DVT/PE ${prev?"Yes":"No"}`, `Hemoptysis ${hemop?"Yes":"No"}`, `Cancer ${ca?"Yes":"No"}`
      ],
      truth: { text: `Total ${score.toFixed(1)} → ${twoTier} (${threeTier})`, score },
      explain: ["≤4 Unlikely → PERC/D‑dimer; >4 Likely → Imaging"],
    };
  },
};
export default WELLS_PE;