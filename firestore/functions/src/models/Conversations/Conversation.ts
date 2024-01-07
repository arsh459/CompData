import { ConversationMBInterface } from "../../main/Https/messagebird/interface";

export interface ConversationInterface extends ConversationMBInterface {
  mode: "bot" | "human" | "Holidaying";
  groupId: string;

  updatedUnix: number;
  //   travelQuery: TravelQueryInterface;
}

export interface TravelQueryInterface {
  location?:
    | {
        raw: string;
        circuitId: string;
        lat: number;
        lng: number;
      }
    | "flexible";
  dates?:
    | {
        startDate: string;
        endDate: string;
      }
    | "flexible";
  pax?:
    | {
        adults: number;
        children: number;
      }
    | "flexible";
  offbeat?: boolean | "flexible";
  rangeClassification?: "basic" | "premium" | "luxury" | "flexible";
}
