import { gptModels } from "./Room";

export const gptConfig = {
  temperature: 1,
  top_p: 1,
  n: 1,
  stream: false,
  max_tokens: 100,
  modelLimit: 4096,
  model: "gpt-4-1106-preview" as gptModels,
};
