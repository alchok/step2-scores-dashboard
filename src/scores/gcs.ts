┘
import type { ScoreDef } from "../score.types";
import { choice } from "../utils/random";

const GCS: ScoreDef = {
  id: "gcs",
  name: "GCS — Glasgow Coma Scale",
  tags: ["Neuro","ED"],
  learn: {
    purpose: "Baseline neuro severity.",
    criteria: [
      { key: "Eye (E): 4 spont · 3 speech · 2 pain · 1 none" },
      { key: "Verbal (V): 5 oriented · 4 confused · 3 words · 2 sounds · 1 none" },
      { key: "Motor (M): 6 obeys · 5 localizes · 4 withdraws · 3 flexion · 2 extension · 1 none" },
    ],
    tiers: [ { label: "Severe", range: "≤8" }, { label: "Moderate", range: "9–12" }, { label: "Mild", range: "13–15" } ],
    actions: ["≤8: airway vigilance/ICU consult"],
  },
  drill: () => {
    const E = choice([1,2,3,4]); const V = choice([1,2,3,4,5]); const M = choice([1,2,3,4,5,6]);
    const total = E+V+M; const tier = total<=8?"Severe": total<=12?"Moderate":"Mild";
    return { stem: [`Eye ${E}`, `Verbal ${V}`, `Motor ${M}`], truth: { text: `Total ${total} → ${tier}`, score: total, tier }, explain: ["E+V+M"] };
  },
};
export default GCS;