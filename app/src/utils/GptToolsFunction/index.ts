import { Tool } from "@models/config/Tools";
import { sbFunctions } from "@utils/GptToolsFunction/fetchFunctionCalls";
import { fetchFunctionCalls, fetchFunctionTools } from "./fetchFunctionCalls";

const fetchToolObjects = (toolNames?: sbFunctions[]) => {
  let toolObjectArray: Tool[] = [];
  if (toolNames && toolNames.length > 0) {
    toolNames.forEach((toolName) => {
      const tool = fetchFunctionTools(toolName);
      if (tool) {
        toolObjectArray.push(tool);
      }
    });
  }
  return toolObjectArray;
};

export { fetchToolObjects, fetchFunctionTools, fetchFunctionCalls };
