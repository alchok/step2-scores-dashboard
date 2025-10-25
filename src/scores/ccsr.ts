┘
import type { ScoreDef } from "../score.types";
import { coin } from "../utils/random";

const CCSR: ScoreDef = {
  id: "canadian_cspine",
  name: "Canadian C‑Spine Rule",
  tags: ["Trauma","ED"],
  learn: {
    purpose: "Clear C‑spine in alert, stable trauma pts.",
    criteria: [
      { key: "High‑risk: age ≥65, dangerous mechanism, paresthesias" },
      { key: "Low‑risk enabling assessment: simple rear‑end, sitting in ED, ambulatory, delayed neck pain, no midline tenderness" },
      { key: "Active ROM: rotate neck 45° left & right" },
    ],
    actions: ["Any high‑risk → Image", "Low‑risk present AND rotates 45° bilat → No image", "Else → Image"],
    caveats: ["Not for intoxicated, uncooperative, unstable, distracting injury"],
  },
  drill: () => {
    const age65 = coin(0.25), dangerous = coin(0.25), paresthesia = coin(0.1), lowRisk = coin(0.5), midline = coin(0.4), canRotate = coin(0.6);
    const anyHigh = age65 || dangerous || paresthesia;
    const lowAllows = lowRisk && !midline;
    const noImg = !anyHigh && lowAllows && canRotate;
    const decision = anyHigh ? "Image" : noImg ? "No image" : "Image";
    return { stem: [`Age≥65 ${age65?"Yes":"No"}; Dangerous mech ${dangerous?"Yes":"No"}; Paresthesias ${paresthesia?"Yes":"No"}`, `Low‑risk present ${lowRisk?"Yes":"No"}; Midline tender ${midline?"Yes":"No"}`, `Rotate 45° bilat ${canRotate?"Yes":"No"}`], truth: { text: decision, tier: decision }, explain: [ anyHigh?"High‑risk present → Image" : lowAllows? (canRotate?"Low‑risk + ROM OK → No image":"ROM limited → Image") : "No low‑risk clearance → Image" ] };
  },
};
export default CCSR;