┘
import type { ScoreDef } from "../score.types";
import { rnd, choice } from "../utils/random";

const HEART: ScoreDef = {
  id: "heart",
  name: "HEART — ED chest pain",
  tags: ["Cardio","ED"],
  learn: {
    purpose: "Predict MACE; guide discharge vs obs vs invasive.",
    criteria: [
      { key: "History 0/1/2" }, { key: "ECG 0/1/2" }, { key: "Age <45=0 · 45–64=1 · ≥65=2" }, { key: "Risk factors 0/1/2 (≥3 or CAD=2)" }, { key: "Troponin 0/1/2" },
    ],
    tiers: [ { label: "Low", range: "0–3" }, { label: "Moderate", range: "4–6" }, { label: "High", range: "7–10" } ],
    actions: ["0–3 discharge ± serial trops", "4–6 obs/serials", "7–10 early invasive"],
  },
  drill: () => {
    const hist = choice([0,1,2]); const ecg = choice([0,1,2]); const age = rnd(20, 90, 0);
    const agePts = age >= 65 ? 2 : age >= 45 ? 1 : 0; const rfCount = rnd(0, 6, 0);
    const rfPts = rfCount >= 3 ? 2 : rfCount >= 1 ? 1 : 0; const trop = choice([0,1,2]);
    const total = hist + ecg + agePts + rfPts + trop; const tier = total <= 3 ? "Low" : total <= 6 ? "Moderate" : "High";
    return { stem: [`Hist ${hist} / ECG ${ecg} / Trop ${trop}`, `Age ${age} (pts ${agePts})`, `Risk factors ${rfCount} (pts ${rfPts})`], truth: { text: `Score ${total} → ${tier}`, score: total, tier }, explain: ["Sum elements → tier"] };
  },
};
export default HEART;