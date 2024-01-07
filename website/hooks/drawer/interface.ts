import { formLabelValues, pinValues } from "@components/drawers/constants";

export interface dashboardQuery {
  eventId?: string;
  pinLevel?: pinValues;
  formLevel?: formLabelValues;
}

export type dashboardQueryKeys = "eventId" | "pinLevel" | "formLevel";

export interface editChallengeQuery {
  eventId?: string;
  formLevel?: formLabelValues;
}

export type editChallengeQueryKeys = "eventId" | "formLevel";
