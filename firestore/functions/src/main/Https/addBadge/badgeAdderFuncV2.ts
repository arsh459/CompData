import * as admin from "firebase-admin";
import {
  // fitnessGoalTypes,
  RecommendationConfig,
  UserInterface,
} from "../../../models/User/User";

import { getBadgeFPAndStepTargets } from "./utils";
import { badgeAlot } from "./badgeAdderFuncV3";
import {
  getTransformationData,
  // getWeightlossTarget,
  getWeightlossTargetType,
} from "./goal/createUserPath";
import { getUserById } from "../../../models/User/Methods";
import { sendRoadmapUpdateNotification } from "./goal/proNotification";
import { createRoadmapHelper } from "./createRoadmapHelper";
import { createNutritionTarget } from "./dietCalculations/dietCalculator";

export const badgeAdderFuncV2 = async (
  userObj: UserInterface,
  uid: string,
  updateMap?: boolean,
) => {
  if (uid) {
    const { badgeId, dailyFPTarget, dailyStepTarget } =
      getBadgeFPAndStepTargets(userObj);

    /** UPDATE WITH LATEST */
    // const dailyKcalTarget = getKCalTarget(userObj);

    let finalBadgeId: string = badgeId;

    const recConfig: RecommendationConfig = {
      primaryWorkoutCoach: "",
      baseTier: 0,
    };

    const newAlot = badgeAlot(userObj, userObj.motivatedBy);

    recConfig.primaryWorkoutCoach = newAlot.workoutCoach;
    finalBadgeId = newAlot.badgeId;
    const nutritionBadgeId = newAlot.dietBadgeId;

    const transformationData = await getTransformationData(userObj);

    const wtDelta = getWeightlossTargetType(transformationData);

    const { dailyKCalTarget, protein, carbs, fats, fiber } =
      createNutritionTarget(userObj, wtDelta);

    // console.log("transformationData", transformationData);

    // throw new Error("paused");

    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        thingsToWorkOn: transformationData,
        // workout badge
        badgeId: finalBadgeId,

        ...(nutritionBadgeId ? { nutritionBadgeId } : {}),
        onboarded: true,
        dailyFPTarget,
        dailyStepTarget,
        dailyKCalTarget,
        dailyProteinTarget: protein,
        dailyCarbTarget: carbs,
        dailyFatsTarget: fats,
        dailyFiberTarget: fiber,
        ...(recConfig.primaryWorkoutCoach
          ? {
              [`recommendationConfig.primaryWorkoutCoach`]:
                recConfig.primaryWorkoutCoach,
            }
          : {}),
      });

    const updatedUser = await getUserById(uid);
    if (updatedUser) {
      await createRoadmapHelper(updatedUser, updateMap);

      if (updateMap) {
        await sendRoadmapUpdateNotification(updatedUser.uid, updatedUser.name);
      }
    }
  }
};
