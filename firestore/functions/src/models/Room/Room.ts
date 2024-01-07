export interface GPTUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export type roomStatus = "active" | "inactive";
export type requestStatusForRoom =
  | "backend-running"
  | "backend-requested"
  | "backend-error"
  | "backend-completed";
export type gptModels = "gpt-3.5-turbo" | "gpt-4" | "gpt-4-1106-preview";
export type gptTaskType =
  | "customNutritionTask"
  | "customNutritionTaskV2"
  | "subTaskGeneration"
  | "dishNameValidation";

export type roleTypes = "user" | "system" | "assistant" | "tool";

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
  unreadMessages?: number;
  lastMessage?: string;
}

export interface realtimeDBRoom {
  id: string;
  status?: roomStatus; //  active | inactive
  requestStatus?: requestStatusForRoom;
}

export type sbFunctions =
  | "get_diet_plan_details"
  | "get_today_date"
  | "log_a_meal_in_diet"
  | "create_a_meal"
  | "get_meal_type_based_on_time"
  | "get_all_meal_types"
  | "add_meal_to_diet_plan"
  | "swap_a_meal"
  | "find_quantity_for_logging"
  | "change_meal_type_of_meal";

export type toolType = "function";

export interface ToolResponseCall {
  id: string;
  type: toolType;
  function: {
    name: sbFunctions;
    arguments: any;
  };
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
}

export interface GPTMessage {
  role: "system" | "user" | "assistant"; // roleTypes;
  content: string;
}

// /users/uid/rooms/roomId/messages/messageId
export interface MessageResponse {
  id: string;
  numMessages: number; // 10 messages
  messages: ChatMessage[];
  createdOn: number;
  updatedOn: number;
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
  model: gptModels;
  usage: GPTUsage;
  choices: GPTChoice[];
}

export type genImageSizes =
  | "256x256"
  | "512x512"
  | "1024x1024"
  | "1792x1024"
  | "1024x1792"
  | null;

export type genImageResponseFormat = "url" | "b64_json" | null;
export interface gptPrompts {
  id: string;
  type: gptTaskType;
  prompt: GPTMessage[];
  model: gptModels;
  temperature: number;
  top_p: number;
  max_tokens: number;
  presence_penalty: number;
  frequency_penalty: number;
}
