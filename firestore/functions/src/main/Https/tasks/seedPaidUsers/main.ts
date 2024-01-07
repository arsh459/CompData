import { NutritionTarget } from "../../../../models/User/User";
import { seedUserFuncInterface } from "./interface";
import { v4 as uuidv4 } from "uuid";

export const mainSeedUser = async (usersToSeed: seedUserFuncInterface[]) => {
  console.log("users", usersToSeed);

  for (const user of usersToSeed) {
    const nutritionFacts: NutritionTarget = {
      carbs: user.carbs,
      fats: user.fats,
      fiber: user.fiber,
      id: uuidv4(),
      kcal: user.kcal,
      protein: user.protein,
      start: user.start,
      end: user.end,
    };

    console.log("nutritionFacts", nutritionFacts);

    // get nutrition facts
  }
};
