┘
import type { ScoreDef } from "../score.types";
import { coin } from "../utils/random";

const WELLS_DVT: ScoreDef = {
  id: "wells_dvt",
  name: "Wells — DVT",
  tags: ["Vascular","ED"],
  learn: {
    purpose: "Pretest probability for DVT.",
    criteria: [
      { key: "Active cancer", points: 1 }, { key: "Paralysis/paresis/immobile leg", points: 1 }, { key: "Bedridden >3d or major surg ≤12w", points: 1 },
      { key: "Tenderness deep veins", points: 1 }, { key: "Entire leg swollen", points: 1 }, { key: "Calf swelling >3 cm", points: 1 },
      { key: "Pitting edema confined to symptomatic leg", points: 1 }, { key: "Collateral superficial veins", points: 1 }, { key: "Previous DVT", points: 1 },
      { key: "Alternative dx ≥ likely", points: -2 },
    ],
    tiers: [ { label: "2‑tier", range: "<2 Unlikely · ≥2 Likely" }, { label: "3‑tier (opt)", range: "0 Low · 1–2 Mod · ≥3 High" } ],
    actions: ["Unlikely → D‑dimer first", "Likely → Ultrasound"],
  },
  drill: () => {
    const f = { cancer: coin(0.2), paralysis: coin(0.2), bed: coin(0.25), tender: coin(0.4), entire: coin(0.25), calf: coin(0.35), edema: coin(0.35), collat: coin(0.2), prev: coin(0.25), alt: coin(0.4) };
    let s = 0; s += f.cancer?1:0; s += f.paralysis?1:0; s += f.bed?1:0; s += f.tender?1:0; s += f.entire?1:0; s += f.calf?1:0; s += f.edema?1:0; s += f.collat?1:0; s += f.prev?1:0; s += f.alt?-2:0;
    const tier = s>=2?"Likely":"Unlikely";
    return { stem: [`Cancer ${f.cancer?"Yes":"No"}; Paralysis ${f.paralysis?"Yes":"No"}; Bed/surg ${f.bed?"Yes":"No"}`, `Tender ${f.tender?"Yes":"No"}; Entire leg ${f.entire?"Yes":"No"}; Calf>3cm ${f.calf?"Yes":"No"}`, `Edema uni ${f.edema?"Yes":"No"}; Collateral ${f.collat?"Yes":"No"}; Prev DVT ${f.prev?"Yes":"No"}; Alt dx ≥ likely ${f.alt?"Yes":"No"}`], truth: { text: `Total ${s} → ${tier}`, score: s, tier }, explain: ["<2 D‑dimer · ≥2 US"] };
  },
};
export default WELLS_DVT;