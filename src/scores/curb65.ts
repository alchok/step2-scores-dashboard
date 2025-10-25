┘
import type { ScoreDef } from "../score.types";
import { rnd, coin } from "../utils/random";

const CURB65: ScoreDef = {
  id: "curb65",
  name: "CURB‑65 — Pneumonia severity",
  tags: ["Pulm","ED"],
  learn: {
    purpose: "Risk stratify CAP; guide disposition.",
    criteria: [
      { key: "Confusion", points: 1 },
      { key: "Urea > 7 mmol/L", points: 1 },
      { key: "RR ≥ 30/min", points: 1 },
      { key: "SBP < 90 or DBP ≤ 60", points: 1 },
      { key: "Age ≥ 65", points: 1 },
    ],
    tiers: [ { label: "Low", range: "0–1" }, { label: "Moderate", range: "2" }, { label: "High", range: "3–5" } ],
    actions: ["0–1: outpatient", "2: consider obs/admit", "≥3: admit (±ICU)"],
    caveats: ["Mind the unit for urea: mmol/L on exams"],
  },
  drill: () => {
    const confusion = coin(0.35);
    const urea = rnd(3, 14, 1);
    const rr = rnd(16, 40, 0);
    const sbp = rnd(80, 135, 0);
    const dbp = rnd(50, 90, 0);
    const age = rnd(20, 92, 0);
    let score = 0;
    if (confusion) score++;
    if (urea > 7) score++;
    if (rr >= 30) score++;
    if (sbp < 90 || dbp <= 60) score++;
    if (age >= 65) score++;
    const tier = score <= 1 ? "Low" : score === 2 ? "Moderate" : "High";
    const disp = score <= 1 ? "Outpatient" : score === 2 ? "Observe/Admit" : "Admit ± ICU";
    return {
      stem: [`Age ${age}`, `Confusion ${confusion?"Yes":"No"}`, `Urea ${urea} mmol/L`, `RR ${rr}/min`, `BP ${sbp}/${dbp}`],
      truth: { text: `Score ${score} → ${tier} (${disp})`, score, tier },
      explain: [
        `+1 Confusion ${confusion?"Yes":"No"}`,
        `+1 Urea>7 ${urea>7?"Yes":"No"}`,
        `+1 RR≥30 ${rr>=30?"Yes":"No"}`,
        `+1 BP low ${(sbp<90||dbp<=60)?"Yes":"No"}`,
        `+1 Age≥65 ${age>=65?"Yes":"No"}`,
      ],
    };
  },
};
export default CURB65;