import { sbFunctions } from "@utils/GptToolsFunction/fetchFunctionCalls";

export interface toolChoice {
  type: toolType;
  function: { name: sbFunctions };
}

export type toolType = "function";

export interface Tool {
  type: toolType;
  function: functionType;
}

export interface functionType {
  name: sbFunctions;
  description: string;
  parameters: functionParamType;
}

export interface functionParamType {
  type: "object";
  properties: { [propertyName: string]: PropertyType };
  required: string[];
}

export interface PropertyType {
  type: "string" | "number" ;
  enum?: string[]; // if string literals
  description: string;
}

export interface ToolCall extends ToolResponseCall {
  index: number;
}

export interface ToolResponseCall {
  id: string;
  type: toolType;
  function: {
    name: sbFunctions;
    arguments: any;
  };
}
