import { UserInterface, workType } from "../../../../models/User/User";
import {
  bmrFemaleCalculatorMifflin,
  bmrMaleCalculatorMifflin,
} from "../calculateKCalTarget";
import { getWeightlossMonths } from "../path/createRoadmapUtils";

export const createNutritionTarget = (
  user: UserInterface,
  weightWork?: workType,
) => {
  let workPerStep: number = 0;
  if (weightWork) {
    const monthsNeeded = getWeightlossMonths(weightWork);
    workPerStep =
      (weightWork.delta ? weightWork.delta : 0) /
      (monthsNeeded ? monthsNeeded : 1);
  }

  const { dailyKCalTarget } = calculateNutritionParams(user, workPerStep);
  const { protein, carbs, fats, fiber } = getSplitOfMacros(dailyKCalTarget);

  console.log();
  console.log(
    `protein: ${protein}g | carbs: ${carbs}g | fats: ${fats}g | fiber: ${fiber}g`,
  );

  return {
    dailyKCalTarget,
    protein,
    carbs,
    fats,
    fiber,
  };
};

const getSplitOfMacros = (targetKCal: number) => {
  const proteinKCal = targetKCal * 0.3;
  const fatsKCal = targetKCal * 0.3;
  const carbsKCal = targetKCal * 0.4;

  return {
    protein: proteinKCal / 4,
    fats: fatsKCal / 9,
    carbs: carbsKCal / 4,
    fiber: 25,
  };
};

const calculateNutritionParams = (
  user: UserInterface,
  monthlyTargetDelta: number,
) => {
  const userBMR = getBMR(user);
  const tdeeMultiplyer = getWorkoutMultiplyer(user);

  const tdee = userBMR * tdeeMultiplyer;

  const weeklyDelta = monthlyTargetDelta / 4;
  const weeklyDeficit = weeklyDelta * 7700;
  const weeklyIntakeToManage = tdee * 7;
  const weeklyTarget = -weeklyDeficit + weeklyIntakeToManage;

  const dailyTarget = weeklyTarget / 7;

  // console.log("monthlyTargetDelta", monthlyTargetDelta);
  // console.log("weeklyDelta", weeklyDelta);
  // console.log("weeklyDeficit", weeklyDeficit);

  // eat - out =
  // 1400 - 1600 = -200

  console.log();
  console.log(
    `BMR: ${userBMR}KCal | TDEE: ${tdee}KCal | Target Monthly Loss: ${monthlyTargetDelta}Kg | Weekly Deficit: ${weeklyDeficit}KCal | Weekly management ${weeklyIntakeToManage}KCal | weeklyTarget ${weeklyTarget}KCal | Daily: ${dailyTarget}KCal`,
  );

  return {
    dailyKCalTarget: dailyTarget,
    tdee,
    userBMR,
    weeklyDelta,
    weeklyDeficit,
  };
  // const avgDailyIntake = weeklyDeficit
};

const getBMR = (user: UserInterface) => {
  let bmr: number = 1600;

  if (user.gender === "male" && user.weight && user.height) {
    bmr = bmrMaleCalculatorMifflin(
      user.weight,
      user.height,
      user.age ? user.age : 25,
    );
  } else if (user.weight && user.height) {
    bmr = bmrFemaleCalculatorMifflin(
      user.weight,
      user.height,
      user.age ? user.age : 25,
    );
  }

  return bmr;
};

const getWorkoutMultiplyer = (user: UserInterface) => {
  let tdeeMultiplyer = 1.2;
  if (user.workoutFrequency === "1_3") {
    tdeeMultiplyer = 1.375;
  } else if (user.workoutFrequency === "2_5") {
    tdeeMultiplyer = 1.375;
  } else if (user.workoutFrequency === "everyday") {
    tdeeMultiplyer = 1.55;
  }

  return tdeeMultiplyer;
};
