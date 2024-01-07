import { Tool } from "@models/config/Tools";
import { retryCalls } from "@modules/AddNewItemLoading/utils/gpt";
import { fetchConfigDetails } from "../general/config/fetchConfigDetails";
import { getLoggingQuantityFromGpt } from "../general/gptCalls/getLoggingQuantity";
import fetchSubTaskById from "../general/subTasks/fetchSubTaskById";
import { getMetricDetailsForSubTaskinGramOrMl } from "../general/subTasks/getMetricsDetailsForSubTask";
import { fetchTaskById } from "../general/tasks/nutrition/fetchTaskById";

export interface find_quantity_for_logging_interface {
  quantityByUser: string;
  mealUniqueId: string;
  dishUniqueId: string;
}

export const find_quantity_for_logging = async ({
  quantityByUser,
  mealUniqueId,
  dishUniqueId,
}: find_quantity_for_logging_interface) => {
  console.log("quantity by user", quantityByUser);
  const task = await fetchTaskById(mealUniqueId);
  const config = await fetchConfigDetails();
  let subTaskDetails = await fetchSubTaskById(dishUniqueId);
  if (
    !task ||
    !subTaskDetails ||
    !config ||
    !task.subTasks ||
    task?.subTasks.length < 1
  ) {
    return "No able to find the meal please try again.";
  }
  let subTask = task.subTasks.filter((each) => {
    return each.subTaskId === dishUniqueId;
  });

  if (subTask.length < 1) {
    return "No able to find the meal please try again.";
  }

  let subTaskQty = subTask[0].qty || 1;
  const metric = getMetricDetailsForSubTaskinGramOrMl(
    subTaskDetails,
    config?.nutritionMetrics
  );

  let servingValue =
    subTaskDetails.servingValue || subTaskDetails.gptInfo?.gptServingValue || 1;
  let servingType =
    subTaskDetails.servingType ||
    subTaskDetails.gptInfo?.gptServingType ||
    "piece";

  subTaskDetails = {
    ...subTaskDetails,
    recommendedQty: servingValue * subTaskQty,
    unitForRecomendedQuantity: servingType,
    loggingEquivalentToRecommendedQty: subTaskQty,
    qtyStep: subTaskDetails.qtyStep || 0.5,
  };
  let metricUnit = undefined;
  if (metric && metric.value) {
    subTaskDetails.gramEquivalentToRecommendedQty = metric.value * subTaskQty;
    metricUnit = metric.unit;
  }

  const content = `dish name is ${
    subTaskDetails.taskName ? subTaskDetails.taskName : ""
  }, recommendedQty is ${subTaskDetails.recommendedQty} ${
    subTaskDetails.unitForRecomendedQuantity
  }, ${
    subTaskDetails.gramEquivalentToRecommendedQty
      ? `gramEquivalentToRecommendedQty is ${
          subTaskDetails.gramEquivalentToRecommendedQty
        } ${metricUnit ? metricUnit : ""}`
      : ""
  }, loggingEquivalentToRecommendedQty is ${
    subTaskDetails.loggingEquivalentToRecommendedQty
  }, quantity given by user :- ${quantityByUser}`;

  // console.log(content);

  const response = await retryCalls(async () => {
    return await getLoggingQuantityFromGpt(
      config.apiKey,
      content,
      "gpt-4-1106-preview"
    );
  }, 2);

  if (!response) {
    const responseV2 = await retryCalls(async () => {
      return await getLoggingQuantityFromGpt(config.apiKey, content);
    }, 2);

    if (!responseV2) {
      return "No able to process the quantity provided by you, kindly provide it in appropriate units.";
    }

    return responseV2;
  }

  return response;
};
export const find_quantity_for_logging_tool: Tool = {
  type: "function",
  function: {
    name: "find_quantity_for_logging",
    description:
      "This function is used to get the quantity to be logged in a dish for the of quantity provided by the user. This value generated by this will be used by tool provided for logging.",
    parameters: {
      type: "object",
      properties: {
        quantityByUser: {
          type: "string",
          description:
            "It is the quantity that user wants to log in for that particular dish.It can be in any unit. Please make sure to send it right as user wanted",
        },
        mealUniqueId: {
          type: "string",
          description:
            "It is unique 36 character length id of the meal in which user wants to log the particular dish.",
        },
        dishUniqueId: {
          type: "string",
          description:
            "It is unique 36 character length id of the dish which user wants to log.",
        },
      },
      required: ["quantityByUser", "mealUniqueId", "dishUniqueId"],
    },
  },
};