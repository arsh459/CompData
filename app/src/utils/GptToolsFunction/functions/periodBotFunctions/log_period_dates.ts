import { Tool } from "@models/config/Tools";
import { savePeriodInRemote } from "@modules/PeriodCalenderLogMain/utils";
import {
  getAllPeriodDates,
  getMatchPeriodGroupedArray,
} from "@providers/period/funcs/dataUtils";
import { groupConsecutiveDateStrings } from "@providers/period/funcs/utils";
import { useUserStore } from "@providers/user/store/useUserStore";

export interface log_peroid_dates_interface {
  dates: string[];
  operation: "ADD_DATE" | "REMOVE_DATE";
  removeType?: "ONLY_DATE" | "RANGE_DATE";
}

export const log_period_dates = async ({
  dates,
  operation,
  removeType,
}: log_peroid_dates_interface) => {
  const uid = useUserStore.getState().user?.uid;
  if (!uid) {
    return `Some problem in user Authentication, please try again after restarting the app`;
  }

  try {
    let savedPeriods: string[] = [];
    const { periodDates } = await getAllPeriodDates(uid);

    // Operation Performed.
    if (operation === "ADD_DATE") {
      // ADDED THE DATES
      savedPeriods = Object.keys(periodDates).concat(dates);
    } else if (operation === "REMOVE_DATE") {
      //
      if (removeType === "RANGE_DATE") {
        // get the grouped Dates

        const groupedDates = groupConsecutiveDateStrings(
          Object.keys(periodDates)
        );

        const matchedRange = getMatchPeriodGroupedArray(groupedDates, dates);

        if (!matchedRange) {
          return `Did not find any marked period to remove.`;
        }
        //

        savedPeriods = Object.keys(periodDates).filter(
          (item) => !matchedRange.includes(item)
        );
      } else {
        //

        savedPeriods = Object.keys(periodDates).filter(
          (item) => !dates.includes(item)
        );
      }
    }

    await savePeriodInRemote(uid, savedPeriods);
    return "Period Log is saved successfully.";
  } catch (error) {
    return "Server error please try again in some time";
  }
};

export const log_period_dates_tool: Tool = {
  type: "function",
  function: {
    name: "log_period_dates",
    description:
      "This function is used to log period date which can be add or remove. When user wants to add or remove period date into period tracker, this function follows steps first it takes date from user they want to add/remove. After getting the date this function display a confimation meesage with the entered date, asking the user to confirm if this is the correct date to add/remove from the tracker. The user can then confirm or cancel the action. If confirmed then only execute the function to record the date and return a success message. also in case of error this function will return error message asking user to try again later.",
    parameters: {
      type: "object",
      properties: {
        dates: {
          type: "string",
          description:
            "It is array of dates on which user want to add/remove period, it is in the format of each date: YYYY-MM-DD. Default year should current year compare from user today date. For example: if user input 12th dec then the year YYYY should be by default YYYY of user today date  [2023-10-05, 2023-10-04]. Ask the user to confirm if this is the correct date to add/remove to the tracker. If it is not specified ask the user if he/she want to add/remove period for today.",
        },
        operation: {
          type: "string",
          enum: ["ADD_DATE", "REMOVE_DATE"],
          description: "It is operation the user want to perform on dates",
        },
        removeType: {
          type: "string",
          enum: ["ONLY_DATE", "RANGE_DATE"],
          description:
            "It is type of removal the user want. ask user do they want to remove just date or whole range of periods dates. It parameter is only used if user want to remove dates. for example user tell to remove a date then ask user do they want to just remove the date or you want to remove the range of period marked date.",
        },
      },
      required: ["dates", "operation"],
    },
  },
};
