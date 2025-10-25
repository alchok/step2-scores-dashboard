┘
import type { ScoreDef } from "../score.types";
import { coin } from "../utils/random";

const OTTAWA: ScoreDef = {
  id: "ottawa_ankle",
  name: "Ottawa Ankle/Foot Rules",
  tags: ["Trauma","ED"],
  learn: {
    purpose: "Indications for ankle/foot X‑ray after acute injury.",
    criteria: [
      { key: "Ankle pain in malleolar zone + (post edge/tip lat or med malleolus tender) OR unable to bear weight" },
      { key: "Foot pain in midfoot zone + (navicular OR base 5th metatarsal tender) OR unable to bear weight" },
    ],
    actions: ["If any positive → X‑ray"],
    caveats: ["Not for penetrating trauma / polytrauma / diminished sensation / gross deformity"],
  },
  drill: () => {
    const malleolarPain = coin(0.6), postLat = coin(0.3), postMed = coin(0.3), midfootPain = coin(0.5), nav = coin(0.25), base5 = coin(0.25), canBear = coin(0.7);
    const anklePos = malleolarPain && (postLat || postMed || !canBear);
    const footPos = midfootPain && (nav || base5 || !canBear);
    const needXR = anklePos || footPos;
    return { stem: [`Malleolar pain ${malleolarPain?"Yes":"No"}; Post‑lat ${postLat?"Yes":"No"}; Post‑med ${postMed?"Yes":"No"}`, `Midfoot pain ${midfootPain?"Yes":"No"}; Nav ${nav?"Yes":"No"}; Base5 ${base5?"Yes":"No"}`, `Bear weight now/in ED ${canBear?"Yes":"No"}`], truth: { text: needXR?"Rule positive → X‑ray":"Rule negative → No X‑ray", tier: needXR?"Image":"No image" }, explain: [ anklePos?"Ankle rule positive":"Ankle rule negative", footPos?"Foot rule positive":"Foot rule negative" ] };
  },
};
export default OTTAWA;