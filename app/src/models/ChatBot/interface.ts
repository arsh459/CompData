import { ToolResponseCall } from "@models/config/Tools";
import { sbFunctions } from "@utils/GptToolsFunction/fetchFunctionCalls";
import { buttonParams } from "./chatBotButtonInterface";

export interface GPTUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export type roleTypes = "user" | "system" | "assistant" | "tool";

export type roomStatus = "active" | "inactive";
export type userRoomStatus = "online" | "offline";
export type requestStatusForRoom =
  | "backend-running"
  | "backend-requested"
  | "backend-error"
  | "backend-completed";

export type gptModels =
  | "gpt-3.5-turbo"
  | "gpt-4"
  | "gpt-4-1106-preview"
  | "gpt-4-vision-preview";

//users/diu / rooms / roomId
export interface Room {
  id: string;
  title?: string;
  chatImage?: string;
  createdOn: number;
  updatedOn: number;
  systemPrompt?: string;
  // imagePrompt?: string;
  // titlePrompt?: string;
  model?: gptModels;
  usage?: GPTUsage;
  tokenLimit?: number; // 4096

  roomPromptsForUser?: string[];

  status?: roomStatus; //  active | inactive
  unreadMessages?: number; // update unread messages here
  requestStatus?: requestStatusForRoom;

  lastMessage?: string;

  restartConvPopup?: boolean;
}

export interface realtimeDBRoom {
  id: string;
  status?: roomStatus; //  active | inactive
  requestStatus?: requestStatusForRoom;
}

export type transcribeStatusType = "Uploading" | "Success" | "Failed" | "idle";

export interface ChatMessage {
  id: string;
  content: string;
  role: roleTypes;
  createdOn: number;
  tool_call_id?: string;
  name?: sbFunctions;
  tool_calls?: ToolResponseCall[];
  audioTag?: boolean;
  transcribeStatus?: transcribeStatusType;
  audioFile?: string;
  buttonParams?: buttonParams;
}

export interface GPTMessage {
  role: roleTypes;
  content: string;
}

export interface ContentInterface {
  type: "text" | "image_url";
  text?: string;
  image_url?: {
    url: string;
  };
}
export interface GPTVisionMessage {
  role: roleTypes;
  content: ContentInterface[];
}

// /users/uid/rooms/roomId/messages/messageId
export interface MessageResponse {
  id: string;
  numMessages: number; // 10 messages
  messages: ChatMessage[];
  createdOn: number;
  updatedOn: number;

  // remove chat from context
  inContext?: boolean;
}

export interface GPTChoice {
  message: GPTMessage;
  finish_reason: "stop";
  index: number;
}

export interface TurboResponse {
  id: string;
  object: "chat.completion";
  created: number;
  model: gptModels; // "gpt-4"; //"gpt-3.5-turbo" ,
  usage: GPTUsage;
  choices: GPTChoice[];
}

export interface AdditionalGPTBodyObj {
  temperature: number;
  top_p: number;
  max_tokens: number;
  presence_penalty: number;
  frequency_penalty: number;
}
