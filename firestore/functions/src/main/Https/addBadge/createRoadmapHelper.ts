import * as admin from "firebase-admin";
import {
  genrateMonthsData,
  handleRoadmapUpdateToUser,
} from "./path/createUtils";
import { UserInterface } from "../../../models/User/User";
import { saveGoalAchievementPath } from "../../../models/User/roadmap";
import { addAchieversToRoadmap } from "./achiever/addAchievers";
import { saveAchievers } from "./achiever/saveUtils";

export const createRoadmapHelper = async (
  updatedUser: UserInterface,
  updateMap?: boolean,
) => {
  const pathDocs = await admin
    .firestore()
    .collection("users")
    .doc(updatedUser.uid)
    .collection("goalAchievementPath")
    .get();

  const shouldCreateMap = updateMap || pathDocs.docs.length === 0;

  console.log();
  console.log();
  console.log();
  console.log("shouldCreateMap", shouldCreateMap);

  if (shouldCreateMap) {
    // deleting previous roadmap
    const docsToDelete = pathDocs.docs.map((each) => each.ref.delete());
    await Promise.all(docsToDelete);

    // creates the roadmap
    const monthsDataNew = await genrateMonthsData(updatedUser);

    // mark completed
    const { monthItems, completedTargets } = await handleRoadmapUpdateToUser(
      updatedUser,
      monthsDataNew,
    );

    console.log();
    console.log("COMPLETED ROADMAP", completedTargets);
    console.log();

    await saveGoalAchievementPath(updatedUser.uid, monthItems);

    // add badges
    const { achieversToAdd, achieversToRemove, totalTargets } =
      await addAchieversToRoadmap(updatedUser.uid, updatedUser, monthItems);

    await saveAchievers(
      updatedUser.uid,
      achieversToAdd,
      achieversToRemove,
      totalTargets,
      completedTargets,
    );
  }
};
