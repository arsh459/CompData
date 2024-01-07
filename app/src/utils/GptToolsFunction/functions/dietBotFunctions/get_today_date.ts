import { Tool } from "@models/config/Tools";
import { format } from "date-fns";

export interface get_today_date_interface {}

export const get_today_date = ({}: get_today_date_interface) => {
  return format(new Date(), "yyyy-MM-dd hh:mm a");
};

export const get_today_date_tool: Tool = {
  type: "function",
  function: {
    name: "get_today_date",
    description:
      "This function is used to get the today's date, it will give the today's date in yyyy-mm-dd format and time in hh:mm a format. Access it when you think time or date for today is required.",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
};
