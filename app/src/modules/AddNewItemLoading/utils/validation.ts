import { GptNutrientData } from "./gpt";

export function validateParsedContent(parsedContent: GptNutrientData[]) {
  if (parsedContent.length < 1) {
    return false;
  }

  let fileredArr = parsedContent.filter((item) => validateDataTypes(item));

  if (fileredArr.length > 0) {
    return false;
  }

  return true;
}

export const validateNumberType = (
  item: GptNutrientData,
  checkKey: keyof GptNutrientData
) => {
  if (typeof item[checkKey] === "number") {
    return true;
  }

  if (typeof item[checkKey] === "string") {
    const isValNAN = isNaN(parseFloat(item[checkKey] as string));
    if (!isValNAN) {
      return true;
    }
  }

  return false;
};

function validateDataTypes(item: GptNutrientData) {
  if (
    item.Assumption &&
    typeof item.Assumption === "string" &&
    validateNumberType(item, "Carbs_in_gm_based_on_first_4_keys") &&
    validateNumberType(item, "Fats_in_gm_based_on_first_4_keys") &&
    validateNumberType(item, "Fiber_in_gm_based_on_first_4_keys") &&
    validateNumberType(item, "Kilo_Calories_in_Kcal_based_on_first_4_keys") &&
    validateNumberType(item, "Protein_in_gm_based_on_first_4_keys") &&
    validateNumberType(item, "Standard_Quantity") &&
    validateNumberType(item, "Standard_Quantity_gram_Equivalent") &&
    item.Constituent_Name &&
    typeof item.Constituent_Name === "string" &&
    item.Standard_Quantity_Unit &&
    typeof item.Standard_Quantity_Unit === "string"
  ) {
    return false;
  }
  // console.log(
  //   "Assumption validation",
  //   item.Assumption && typeof item.Assumption === "string"
  // );
  // console.log(
  //   "Carbs_in_gm_based_on_first_4_keys validation",
  //   validateNumberType(item, "Carbs_in_gm_based_on_first_4_keys")
  // );
  // console.log(
  //   "Fats_in_gm_based_on_first_4_keys",
  //   validateNumberType(item, "Fats_in_gm_based_on_first_4_keys")
  // );
  // console.log(
  //   "Fiber_in_gm_based_on_first_4_keys",
  //   "fiber",
  //   validateNumberType(item, "Fiber_in_gm_based_on_first_4_keys")
  // );
  // console.log(
  //   "Kilo_Calories_in_Kcal_based_on_first_4_keys",
  //   validateNumberType(item, "Kilo_Calories_in_Kcal_based_on_first_4_keys")
  // );
  // console.log(
  //   "Protein_in_gm_based_on_first_4_keys",
  //   validateNumberType(item, "Protein_in_gm_based_on_first_4_keys")
  // );
  // console.log(
  //   "Standard_Quantity",
  //   validateNumberType(item, "Standard_Quantity")
  // );
  // console.log(
  //   "Standard_Quantity_gram_Equivalent",
  //   validateNumberType(item, "Standard_Quantity_gram_Equivalent")
  // );
  // console.log(
  //   "Constituent_Name",
  //   item.Constituent_Name && typeof item.Constituent_Name === "string"
  // );
  // console.log(
  //   "Constituent_Name",
  //   item.Standard_Quantity_Unit &&
  //     typeof item.Standard_Quantity_Unit === "string"
  // );

  return true;
}
