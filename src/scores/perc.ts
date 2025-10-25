┘
import type { ScoreDef } from "../score.types";
import { coin } from "../utils/random";

const PERC: ScoreDef = {
  id: "perc",
  name: "PERC — Rule‑out PE (very low risk)",
  tags: ["Pulm","ED"],
  learn: {
    purpose: "If pretest is very low and ALL 8 negative → forgo testing.",
    criteria: [
      { key: "Age < 50" }, { key: "HR < 100" }, { key: "O2 sat ≥ 95%" }, { key: "No hemoptysis" },
      { key: "No unilateral leg swelling" }, { key: "No recent surgery/trauma" }, { key: "No prior DVT/PE" }, { key: "No estrogen use" },
    ],
    actions: ["All 8 met → no D‑dimer/imaging", "Any failed → test"],
    caveats: ["Use only if gestalt very low & vitals stable"],
  },
  drill: () => {
    const c = [
      { k: "Age <50", ok: coin(0.7) }, { k: "HR <100", ok: coin(0.7) }, { k: "O2 ≥95%", ok: coin(0.7) },
      { k: "No hemoptysis", ok: coin(0.85) }, { k: "No unilateral swelling", ok: coin(0.7) },
      { k: "No recent surg/trauma", ok: coin(0.8) }, { k: "No prior DVT/PE", ok: coin(0.85) }, { k: "No estrogen", ok: coin(0.85) }
    ];
    const pass = c.every(x => x.ok);
    return { stem: c.map(x => `${x.k}: ${x.ok?"Yes":"No"}`), truth: { text: pass?"PERC negative":"PERC not met", tier: pass?"No test":"Test" }, explain: [ pass?"All 8 satisfied":"One or more failed" ] };
  },
};
export default PERC;