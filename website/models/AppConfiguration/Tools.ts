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
  "get_period_log_dates",
  "log_period_dates",
  "swap_a_meal",
  "find_quantity_for_logging",
  "change_meal_type_of_meal",
  "go_to_meal_screen",
  "go_to_diet_plan_screen",
];

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
  type: "string" | "number";
  enum?: string[]; // if string literals
  description: string;
}
