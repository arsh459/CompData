import { AISuggest } from "../../../../models/Task/Task";
import {
  generateSubTaskGpt,
  subTaskTransformer,
  validateDishName,
} from "../utils/dishNameFunctions/utils";

interface ErrorInterface {
  status: false;
  message: { error: string };
}
interface MessageInterface {
  status: true;
  message: { data: AISuggest };
}
export const subTaskAIGenerationMain = async (
  name?: string,
): Promise<ErrorInterface | MessageInterface> => {
  if (!name) {
    return {
      status: false,
      message: { error: "Provide subTask name" },
    };
  }

  const validity = await validateDishName(name);
  if (!validity) {
    return {
      status: false,
      message: { error: "Dish Name Validity Failed" },
    };
  }

  const generateSubTask = await generateSubTaskGpt(validity.validity);

  if (!generateSubTask) {
    return {
      status: false,
      message: { error: "Validation Failed" },
    };
  }

  const convertedData = subTaskTransformer(generateSubTask, validity.validity);

  if (!convertedData) {
    return {
      status: false,
      message: { error: "Conversion Failed" },
    };
  }

  return {
    status: true,
    message: { data: convertedData },
  };
};
