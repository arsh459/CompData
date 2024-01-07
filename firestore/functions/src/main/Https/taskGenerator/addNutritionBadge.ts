import { Badge, WorkoutLevel } from "../../../models/Prizes/Badges";
import { v4 as uuidv4 } from "uuid";
import { UserInterface } from "../../../models/User/User";
import { getUserById } from "../../../models/User/Methods";
import * as admin from "firebase-admin";
import { TEAM_ALPHABET_GAME } from "../../../constants/challenge";
import { getWeightlossTargetType } from "../addBadge/goal/createUserPath";
import { createNutritionTarget } from "../addBadge/dietCalculations/dietCalculator";

export const addNutritionBadge = async (uid: string) => {
  const user = await getUserById(uid);
  // console.log("hiii");

  if (user && !user.nutritionBadgeId) {
    const updatedUser = await updateTargetParams(user);

    const trackingBadge = createNewBadge(updatedUser);
    console.log("Creating new badge", trackingBadge);

    const batch = admin.firestore().batch();

    const now = Date.now();
    batch.update(admin.firestore().collection("users").doc(uid), {
      nutritionBadgeId: trackingBadge.id,
      nutritionBadgeIdEnrolled: trackingBadge.id,
      [`recommendationConfig.nutritionStart`]: now,
      [`recommendationConfig.badgeConfig.${trackingBadge.id}.start`]: now,
    });

    batch.set(
      admin
        .firestore()
        .collection("sbEvents")
        .doc(TEAM_ALPHABET_GAME)
        .collection("badges")
        .doc(trackingBadge.id),
      trackingBadge,
    );

    await batch.commit();
  } else {
    console.log("badge present");
  }
};

/// @arsh - add media
const createNewBadge = (user: UserInterface): Badge => {
  return {
    id: uuidv4(),

    badgeId: "independent",

    prizes: [],
    rankStart: 1,
    name: `${user.name ? `${user.name}'s` : "Your"} Free Nutrition Plan`,
    description:
      "This plan is created for you by our AI. To get a treatment centric plan, subscribe to SocialBoat PRO",
    frequency: "weekly",
    priority: 1,
    pinned: false,
    primaryCoach: "sakhiAI",
    workoutLevels: createWorkoutLevelsForTrackingBadge(user),
  };
};

const createWorkoutLevelsForTrackingBadge = (user: UserInterface) => {
  const wkLevels: WorkoutLevel[] = [];
  for (let i: number = 0; i <= 6; i++) {
    wkLevels.push({
      day: i,
      nbFitpoints: 10,
      nbWorkouts: 0,
      nutrition: {
        carbs: user.dailyCarbTarget ? user.dailyCarbTarget : 0,
        fats: user.dailyFatsTarget ? user.dailyFatsTarget : 0,
        fiber: user.dailyFiberTarget ? user.dailyFiberTarget : 0,
        protein: user.dailyProteinTarget ? user.dailyProteinTarget : 0,
        kcal: user.dailyKCalTarget ? user.dailyKCalTarget : 0,
      },
    });
  }

  return wkLevels;
};

export const updateTargetParams = async (user: UserInterface) => {
  if (
    !user?.dailyKCalTarget ||
    !user.dailyCarbTarget ||
    !user.dailyProteinTarget ||
    !user.dailyFatsTarget ||
    !user.dailyFiberTarget
  ) {
    // create target
    const transformationData = user?.thingsToWorkOn;
    console.log("Targets absent. Adding them");

    if (transformationData) {
      const wtDelta = getWeightlossTargetType(transformationData);

      const { dailyKCalTarget, protein, carbs, fats, fiber } =
        createNutritionTarget(user, wtDelta);

      // update
      await admin.firestore().collection("users").doc(user.uid).update({
        dailyKCalTarget,
        dailyProteinTarget: protein,
        dailyCarbTarget: carbs,
        dailyFatsTarget: fats,
        dailyFiberTarget: fiber,
      });

      let updatedUser = {
        ...user,
        dailyKCalTarget,
        dailyProteinTarget: protein,
        dailyCarbTarget: carbs,
        dailyFatsTarget: fats,
        dailyFiberTarget: fiber,
      };

      return updatedUser;
    }
  }

  return user;
};
