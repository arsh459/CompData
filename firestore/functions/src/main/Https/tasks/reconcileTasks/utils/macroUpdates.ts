import {
  NutrientKey,
  NutritionFacts,
  SubTask,
} from "../../../../../models/Task/Task";

export const getUpdatedMacros = (
  macros: NutritionFacts,
  subTask: SubTask,
  nutritentKey: NutrientKey,
  qty: number,
) => {
  if (subTask.nutrientValues && subTask.nutrientValues[nutritentKey]) {
    console.log(`${nutritentKey}: ${subTask.nutrientValues[nutritentKey]}`);

    const valI = subTask.nutrientValues[nutritentKey] as number;
    const val = valI * qty;

    if (macros[nutritentKey]) {
      //@ts-ignore
      macros[nutritentKey] += val;
    } else {
      macros[nutritentKey] = val;
    }

    return macros;
  }

  if (
    subTask.gptInfo &&
    subTask.gptInfo.nutrientValues &&
    subTask.gptInfo?.nutrientValues[nutritentKey]
  ) {
    console.log(
      `${nutritentKey}: ${subTask.gptInfo?.nutrientValues[nutritentKey]}`,
    );

    const valI = subTask.gptInfo?.nutrientValues[nutritentKey] as number;
    const val = valI * qty;

    if (macros[nutritentKey]) {
      //@ts-ignore
      macros[nutritentKey] += val;
    } else {
      macros[nutritentKey] = val;
    }

    return macros;
  }

  return macros;
};

export const getUpdatedKCal = (
  baseKCal: number,
  subTask: SubTask,
  qty: number,
) => {
  let baseKCalInt = baseKCal;

  if (subTask.kcal) {
    const subTaskKCal = subTask.kcal ? subTask.kcal : 0;
    console.log(`KCal: ${subTaskKCal}`);

    baseKCalInt += subTaskKCal * qty;

    return baseKCalInt;
  }

  if (subTask.gptInfo && subTask.gptInfo.kcal) {
    const subTaskKCal = subTask.kcal ? subTask.kcal : 0;
    console.log(`KCal: ${subTaskKCal}`);

    baseKCalInt += subTaskKCal * qty;
  }

  return baseKCalInt;
};
