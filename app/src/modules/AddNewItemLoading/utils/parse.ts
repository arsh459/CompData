import {
  MealTypes,
  NutritionFacts,
  SubTask,
  SubTaskElement,
  Task,
} from "@models/Tasks/Task";
import { GptNutrientData, GptNutrientReceivedData } from "./gpt";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { CookingType } from "@providers/AddNewItem/useAddNewItem";
import { AWSMedia } from "@models/Media/MediaTypeInterface";

export function convertToTaskType(
  content: GptNutrientData[],
  uid: string,
  cookingType?: CookingType,
  mealType?: MealTypes,
  media?: AWSMedia
) {
  let id = uuidv4();
  let now = Date.now();
  let taskName: string = content
    .map((item) => item.Constituent_Name)
    .join(" with ");

  let nutrientsFactsObj = {
    protien: 0,
    carbs: 0,
    fibre: 0,
    fats: 0,
    kcal: 0,
    fp: 0,
  };

  let subTasksComplete = content.map((item) => {
    // console.log("item", item);

    let id = uuidv4();

    const protein = getNumberValue(item.Protein_in_gm_based_on_first_4_keys);
    const carbs = getNumberValue(item.Carbs_in_gm_based_on_first_4_keys);
    const fibre = getNumberValue(item.Fiber_in_gm_based_on_first_4_keys);
    const fats = getNumberValue(item.Fats_in_gm_based_on_first_4_keys);

    const nutritionFats: NutritionFacts = {
      protein,
      carbs,
      fibre,
      fats,
    };

    let originalKcal = getNumberValue(
      item.Kilo_Calories_in_Kcal_based_on_first_4_keys
    );
    let kcal: number;
    kcal = 4 * protein + 4 * carbs + 9 * fats;

    let subTaskObj: SubTask = {
      id: id,
      fp: 1,
      taskName: item.Constituent_Name,
      nutrientValues: nutritionFats,
      kcal: kcal,
      gptInfo: {
        gptServingType: item.Standard_Quantity_Unit,
        gptServingValue: getNumberValue(item.Standard_Quantity),
        gptSubTaskName: item.Constituent_Name,
        gramEquivalent: getNumberValue(item.Standard_Quantity_gram_Equivalent),
        assumption: item.Assumption,
        creatorId: uid,
        nutrientValues: nutritionFats, // keep in gpt info also
        kcal: originalKcal || kcal,
      },
      gptGeneratedNutrition: true,
    };

    if (cookingType) {
      subTaskObj.cookingType = cookingType;
    }

    let subTaskElementObject: SubTaskElement = {
      subTaskId: id,
      qty: 1,
    };

    nutrientsFactsObj.fibre += nutritionFats.fibre ? nutritionFats.fibre : 0;
    nutrientsFactsObj.carbs += nutritionFats.carbs ? nutritionFats.carbs : 0;
    nutrientsFactsObj.fats += nutritionFats.fats ? nutritionFats.fats : 0;
    nutrientsFactsObj.protien += nutritionFats.protein
      ? nutritionFats.protein
      : 0;
    nutrientsFactsObj.kcal += kcal;
    nutrientsFactsObj.fp += 1;

    return {
      subTaskObj: subTaskObj,
      subTaskElementObject: subTaskElementObject,
    };
  });

  let subTaskElementArray: SubTaskElement[] = subTasksComplete.map(
    (item) => item.subTaskElementObject
  );

  let subTaskArray: SubTask[] = subTasksComplete.map((item) => item.subTaskObj);

  let taskObj: Task = {
    id: id,
    createdOn: now,
    updatedOn: now,
    userId: uid,
    gptGeneratedNutrition: true,
    taskType: "nutrition",
    name: taskName,
    mealTypes: mealType ? mealType : "Breakfast",
    nutritionFacts: {
      protein: nutrientsFactsObj.protien,
      carbs: nutrientsFactsObj.carbs,
      fats: nutrientsFactsObj.fats,
      fibre: nutrientsFactsObj.fibre,
    },
    fitPoints: nutrientsFactsObj.fp,
    kcal: nutrientsFactsObj.kcal,
    subTasks: subTaskElementArray,
  };

  if (media) {
    taskObj.thumbnails = media;
  }

  return {
    taskObj: taskObj,
    subTaskArray: subTaskArray,
  };
}

export function convertToGptNutrientData(
  parsedContentReceived: GptNutrientReceivedData[]
) {
  let result: GptNutrientData[] = [];
  parsedContentReceived.map((item) => {
    let obj = {
      Constituent_Name: item.name,
      Standard_Quantity: item.quantity,
      Standard_Quantity_Unit: item.unit,
      Standard_Quantity_gram_Equivalent: item.gram_eq,
      Assumption: item.assumption,
      Kilo_Calories_in_Kcal_based_on_first_4_keys: item.kcal,
      Protein_in_gm_based_on_first_4_keys: item.protein,
      Carbs_in_gm_based_on_first_4_keys: item.carbs,
      Fats_in_gm_based_on_first_4_keys: item.fats,
      Fiber_in_gm_based_on_first_4_keys: item.fiber,
    };
    result.push(obj);
  });

  return result;
}

export const getNumberValue = (val: string | number) => {
  if (typeof val === "string") {
    return Math.round(parseFloat(val) * 10) / 10;
  } else {
    return val;
  }
};
