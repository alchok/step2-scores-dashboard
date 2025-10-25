┘
import type { ScoreDef } from "../score.types";
import { rnd, coin, choice } from "../utils/random";

const TEMPLATE_SCORE: ScoreDef = {
  id: "example_id",
  name: "Example Name",
  tags: ["ED"],
  learn: {
    purpose: "One‑line purpose.",
    criteria: [
      { key: "Criterion A", points: 1 },
      { key: "Criterion B", points: 2 },
    ],
    tiers: [ { label: "Low", range: "0–1" }, { label: "High", range: "≥2" } ],
    actions: ["What to do at each tier."],
    caveats: ["Test‑day caveat here."],
  },
  drill: () => {
    const A = coin(0.5);
    const B = coin(0.3);
    const score = (A?1:0) + (B?2:0);
    const tier = score >= 2 ? "High" : "Low";
    return {
      stem: [ `Criterion A ${A?"Yes":"No"}`, `Criterion B ${B?"Yes":"No"}` ],
      truth: { text: `Total ${score} → ${tier}`, score, tier },
      explain: ["Add up points; map to tier."],
    };
  },
};
export default TEMPLATE_SCORE;