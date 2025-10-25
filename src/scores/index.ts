┘
import type { ScoreDef } from "../score.types";
import CURB65 from "./curb65";
import WELLS_PE from "./wells_pe";
import PERC from "./perc";
import HEART from "./heart";
import WELLS_DVT from "./wells_dvt";
import OTTAWA from "./ottawa";
import CCSR from "./ccsr";
import GCS from "./gcs";

export const SCORES: ScoreDef[] = [CURB65, WELLS_PE, PERC, HEART, WELLS_DVT, OTTAWA, CCSR, GCS];
export const TAGS = ["All","ED","Pulm","Cardio","Trauma","Neuro","Vascular","IM"] as const;

//   .filter(Boolean);