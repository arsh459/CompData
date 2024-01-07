import { ToolCall } from "@models/config/Tools";

export interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: Usage;
  choices: Choice[];
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface Choice {
  delta: Delta;
  index: number;
  finish_reason: string | null;
}

export interface Delta {
  content: string;
  tool_calls: ToolCall[];
}
