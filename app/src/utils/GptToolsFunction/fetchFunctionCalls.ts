import {
  get_diet_plan_details,
  get_diet_plan_details_interface,
  get_diet_plan_details_tool,
} from "./functions/dietBotFunctions/get_diet_plan_details";
import {
  get_today_date,
  get_today_date_interface,
  get_today_date_tool,
} from "./functions/dietBotFunctions/get_today_date";
import {
  log_a_meal_in_diet,
  log_a_meal_in_diet_interface,
  log_a_meal_in_diet_tool,
} from "./functions/dietBotFunctions/log_a_meal_in_diet_plan";
import {
  create_a_meal,
  create_a_meal_interface,
  create_a_meal_tool,
} from "./functions/dietBotFunctions/create_a_meal";
import {
  get_meal_type_based_on_time,
  get_meal_type_based_on_time_interface,
  get_meal_type_based_on_time_tool,
} from "./functions/dietBotFunctions/get_meal_type_based_on_time";
import {
  get_all_meal_types,
  get_all_meal_types_interface,
  get_all_meal_types_tool,
} from "./functions/dietBotFunctions/get_all_meal_types";
import {
  add_meal_to_diet_plan,
  add_meal_to_diet_plan_interface,
  add_meal_to_diet_plan_tool,
} from "./functions/dietBotFunctions/add_meal_to_diet_plan";
import {
  swap_a_meal,
  swap_a_meal_interface,
  swap_a_meal_tool,
} from "./functions/dietBotFunctions/swap_a_meal";
import {
  find_quantity_for_logging,
  find_quantity_for_logging_interface,
  find_quantity_for_logging_tool,
} from "./functions/dietBotFunctions/find_quantity_for_logging";
import {
  change_meal_type_of_meal,
  change_meal_type_of_meal_interface,
  change_meal_type_of_meal_tool,
} from "./functions/dietBotFunctions/change_meal_type_of_meal";
import {
  go_to_meal_screen,
  go_to_meal_screen_interface,
  go_to_meal_screen_tool,
} from "./functions/buttonCalls/go_to_meal_screen";
import {
  go_to_diet_plan_screen,
  go_to_diet_plan_screen_interface,
  go_to_diet_plan_screen_tool,
} from "./functions/buttonCalls/go_to_diet_plan_screen";

import {
  get_period_cycle_data,
  get_period_cycle_data_interface,
  get_period_cycle_data_tool,
} from "./functions/periodBotFunctions/get_period_cycle_data";
import {
  log_period_dates,
  log_period_dates_tool,
  log_peroid_dates_interface,
} from "./functions/periodBotFunctions/log_period_dates";
import {
  get_period_log_dates,
  get_period_log_dates_interface,
  get_period_log_dates_tool,
} from "./functions/periodBotFunctions/get_period_log_dates";

export type sbFunctions =
  | "get_diet_plan_details"
  | "get_today_date"
  | "log_a_meal_in_diet"
  | "create_a_meal"
  | "get_meal_type_based_on_time"
  | "get_all_meal_types"
  | "add_meal_to_diet_plan"
  | "get_period_cycle_data"
  | "get_period_log_dates"
  | "log_period_dates"
  | "swap_a_meal"
  | "find_quantity_for_logging"
  | "change_meal_type_of_meal"
  | "go_to_meal_screen"
  | "go_to_diet_plan_screen";

export const functionList: sbFunctions[] = [
  "get_diet_plan_details",
  "get_today_date",
  "log_a_meal_in_diet",
  "create_a_meal",
  "get_meal_type_based_on_time",
  "get_all_meal_types",
  "add_meal_to_diet_plan",
  "get_period_cycle_data",
  "log_period_dates",
  "swap_a_meal",
  "find_quantity_for_logging",
  "change_meal_type_of_meal",
  "go_to_meal_screen",
  "go_to_diet_plan_screen",
];

export const fetchFunctionTools = (toolName: sbFunctions) => {
  switch (toolName) {
    case "get_diet_plan_details":
      return get_diet_plan_details_tool;
    case "get_today_date":
      return get_today_date_tool;
    case "log_a_meal_in_diet":
      return log_a_meal_in_diet_tool;
    case "create_a_meal":
      return create_a_meal_tool;
    case "get_meal_type_based_on_time":
      return get_meal_type_based_on_time_tool;
    case "get_all_meal_types":
      return get_all_meal_types_tool;
    case "add_meal_to_diet_plan":
      return add_meal_to_diet_plan_tool;
    case "get_period_cycle_data":
      return get_period_cycle_data_tool;
    case "get_period_log_dates":
      return get_period_log_dates_tool;
    case "log_period_dates":
      return log_period_dates_tool;
    case "swap_a_meal":
      return swap_a_meal_tool;
    case "find_quantity_for_logging":
      return find_quantity_for_logging_tool;
    case "change_meal_type_of_meal":
      return change_meal_type_of_meal_tool;
    case "go_to_meal_screen":
      return go_to_meal_screen_tool;
    case "go_to_diet_plan_screen":
      return go_to_diet_plan_screen_tool;
    default:
      return null;
  }
};

export const fetchFunctionCalls = async (
  name: sbFunctions,
  agrumentsFetched: any
) => {
  switch (name) {
    case "get_diet_plan_details":
      return await get_diet_plan_details(
        agrumentsFetched as get_diet_plan_details_interface
      );

    case "get_today_date":
      return await get_today_date(agrumentsFetched as get_today_date_interface);

    case "log_a_meal_in_diet":
      return await log_a_meal_in_diet(
        agrumentsFetched as log_a_meal_in_diet_interface
      );

    case "create_a_meal":
      return await create_a_meal(agrumentsFetched as create_a_meal_interface);

    case "get_meal_type_based_on_time":
      return await get_meal_type_based_on_time(
        agrumentsFetched as get_meal_type_based_on_time_interface
      );

    case "get_all_meal_types":
      return await get_all_meal_types(
        agrumentsFetched as get_all_meal_types_interface
      );

    case "add_meal_to_diet_plan":
      return await add_meal_to_diet_plan(
        agrumentsFetched as add_meal_to_diet_plan_interface
      );
    case "get_period_cycle_data":
      return await get_period_cycle_data(
        agrumentsFetched as get_period_cycle_data_interface
      );
    case "get_period_log_dates":
      return await get_period_log_dates(
        agrumentsFetched as get_period_log_dates_interface
      );
    case "log_period_dates":
      return await log_period_dates(
        agrumentsFetched as log_peroid_dates_interface
      );

    case "swap_a_meal":
      return await swap_a_meal(agrumentsFetched as swap_a_meal_interface);

    case "find_quantity_for_logging":
      return find_quantity_for_logging(
        agrumentsFetched as find_quantity_for_logging_interface
      );

    case "change_meal_type_of_meal":
      return change_meal_type_of_meal(
        agrumentsFetched as change_meal_type_of_meal_interface
      );

    case "go_to_meal_screen":
      return await go_to_meal_screen(
        agrumentsFetched as go_to_meal_screen_interface
      );

    case "go_to_diet_plan_screen":
      return await go_to_diet_plan_screen(
        agrumentsFetched as go_to_diet_plan_screen_interface
      );

    default:
      return null;
  }
};
