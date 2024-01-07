import { getTimedActivitiesToday } from "../../../models/Activity/getUtils";
import { NutritionFacts } from "../../../models/Task/Task";
import {
  NutritionConsumption,
  dayRecommendation,
} from "../../../models/User/User";
import * as admin from "firebase-admin";
import { ONE_DAY_MS } from "../../Https/period/getPeriodArray";
import { getAllPreviousDayRecs } from "../../Https/taskGenerator/getterSetter";
import { getDayStartForTz } from "../onActivityUpdateV2/dateBucket";
// import { getTask } from "../../../models/Task/getUtils";

export const badgeDayUpdateV3 = async (
  uid: string,
  date: string,
  type: "workout" | "nutrition",
  tz: string,
) => {
  const pastRecs = await getAllPreviousDayRecs(uid, date, type);

  for (const rec of pastRecs) {
    const { doneFP, nutrition } = await singleRecUpdate(uid, rec, tz);

    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("dayRecommendations")
      .doc(rec.id)
      .update({
        doneFP: doneFP,
        ...(nutrition ? { consumedNutrition: nutrition } : {}),
      });
  }
};

const singleRecUpdate = async (
  uid: string,
  rec: dayRecommendation,
  tz: string,
) => {
  let doneFP: number = 0;
  let nutrition: NutritionConsumption | undefined = undefined;

  const recStartInt = rec.unix;

  const recStart = getDayStartForTz(tz, recStartInt);
  const recEnd = rec.unix + ONE_DAY_MS;

  console.log("recStart", recStart);
  console.log("recEnd", recEnd);

  console.log("tasks", rec.tasks.length);

  for (const taskRec of rec.tasks) {
    const relevantActs = await getTimedActivitiesToday(
      uid,
      recStart,
      recEnd,
      taskRec.id,
    );

    // const tk = await getTask(taskRec.id);

    console.log("RELEVANT ACTS", relevantActs.length);

    // if act is there
    if (relevantActs.length) {
      for (const relevantAct of relevantActs) {
        const calories = relevantAct.calories ? relevantAct.calories : 0;
        const fp = Math.round(calories / 300);
        doneFP += fp;

        // console.log("macros", relevantAct.macros);
        // console.log("totalKcalConsumed", relevantAct.totalKcalConsumed);

        if (rec.type === "nutrition" && relevantAct.macros) {
          nutrition = addNutritionFactsToRec(
            relevantAct.macros,
            nutrition,
            relevantAct.totalKcalConsumed,
          );

          //   console.log(
          //     "nutrition",
          //     relevantAct.macros,
          //     relevantAct.totalKcalConsumed,
          //     nutrition,
          //   );
          // //   console.log("tk", tk?.nutritionFacts, tk?.kcal);
          //   console.log();
        }
      }
    }
  }

  //   console.log("final", nutrition);

  return {
    doneFP,
    nutrition,
  };
};

export const addNutritionFactsToRec = (
  consumption: NutritionFacts,
  totalConsumptionInt?: NutritionConsumption,
  kcal?: number,
) => {
  let totalConsumption = totalConsumptionInt;
  //   console.log("total", totalConsumption);
  if (!totalConsumption) {
    totalConsumption = { carbs: 0, fats: 0, protein: 0, fiber: 0, kcal: 0 };
  }

  if (typeof totalConsumption.carbs === "number") {
    totalConsumption.carbs += consumption.carbs ? consumption.carbs : 0;
  }

  if (typeof totalConsumption.protein === "number") {
    totalConsumption.protein += consumption.protein ? consumption.protein : 0;
  }

  if (typeof totalConsumption.fats === "number") {
    totalConsumption.fats += consumption.fats ? consumption.fats : 0;
  }

  if (typeof totalConsumption.fiber === "number") {
    totalConsumption.fiber += consumption.fibre ? consumption.fibre : 0;
  }

  if (typeof totalConsumption.kcal === "number") {
    totalConsumption.kcal += kcal ? kcal : 0;
  }

  return totalConsumption;
};
