import { Tool } from "@models/config/Tools";

export interface get_period_log_dates_interface {
  dates: string[];
}

export const get_period_log_dates = ({
  dates,
}: get_period_log_dates_interface) => {
  return dates;
};

export const get_period_log_dates_tool: Tool = {
  type: "function",
  function: {
    name: "get_period_log_dates",
    description:
      "This function is used to retrive period log or remove dates from the users message. It is accessed whenever user want to log or remove thier period it return array of dates in the format of YYYY-MM-DD. period dates can be single date, period starting date and also can to inbetween dates. For example: [2023-11-22, 2023-12-04]. ALWAYS ask used if they want to log or remove dates as their period they asked as YES/NO then return the array of dates.",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
};
