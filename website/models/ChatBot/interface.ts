export interface GPTMessage {
  role: roleTypes;
  content: string;
}

export type roleTypes = "user" | "system" | "assistant";

export const roleTypesArray: roleTypes[] = ["system", "user", "assistant"];

export type gptModels =
  | "gpt-3.5-turbo"
  | "gpt-4"
  | "gpt-4-1106-preview"
  | "gpt-4-vision-preview";
