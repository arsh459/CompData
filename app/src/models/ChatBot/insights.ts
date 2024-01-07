import { GPTUsage, gptModels, roleTypes } from "./interface";

export interface AutoRoom {
  id: AutoRoomIDs;
  createdOn: number;
  initialPrompt: string;
  model?: gptModels;
  usage?: GPTUsage;
  tokenLimit?: number; // 4096
}

export interface AutoMessageResponse {
  id: string;
  messages: AutoChatMessage[];
  createdOn: number;
  updatedOn: number;
  numMessages: number;

  inContext: boolean;
}

export interface AutoChatMessage {
  id: string;
  content: string;
  role: roleTypes;
  createdOn: number;

  parsingType?: "Insight";
}

export type AutoRoomIDs = "YOGA" | "DIET";
export const autoRooms: AutoRoomIDs[] = ["DIET", "YOGA"];
