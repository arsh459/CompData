import { buttonParams } from "@models/ChatBot/chatBotButtonInterface";
import { Tool } from "@models/config/Tools";
import { useUserStore } from "@providers/user/store/useUserStore";
import { startOfDay, getTime } from "date-fns";
import { getUserDietDetails } from "../general/generators/getUserDietDetails";

export interface go_to_diet_plan_screen_interface {
  date: string;
}

export interface go_to_diet_plan_screen_callBack_interface {}

export const go_to_diet_plan_screen = async ({
  date,
}: go_to_diet_plan_screen_interface): Promise<buttonParams | string> => {
  let nutritionBadgeId = useUserStore.getState().user?.nutritionBadgeId;
  const status = await getUserDietDetails(date);
  console.log("status", status);

  if (!status) {
    const dayStartUnix = getTime(startOfDay(new Date(date)));
    return {
      type: "go_to_diet_plan_screen",
      navigationArguments: {
        badgeId: nutritionBadgeId,
        selectedUnix: dayStartUnix,
      },
      screenName: "NutritionScreen",
      text: `Go to diet plan on ${date}`,
      callBackType: "go_to_diet_plan_screen",
      callBackParams: {},
    };
  }
  return status;
};

export const go_to_diet_plan_screen_tool: Tool = {
  type: "function",
  function: {
    name: "go_to_diet_plan_screen",
    description:
      "This function is used to show a navigation button on screen to navigate the user to DietPlan screen on a particular date.",
    parameters: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description:
            "It is the date on which user see its diet plan, It is in the format of yyyy-mm-dd for the proper processing. For example: 2023-11-01. If it is not provided assume its for today",
        },
      },
      required: ["date"],
    },
  },
};
