import { AchievementPathData, UserInterface } from "../../../models/User/User";
import {
  deleteGoalAchievementPath,
  getAllAchievmentPaths,
  saveGoalAchievementPath,
} from "../../../models/User/roadmap";
import { addAchieversToRoadmap } from "./achiever/addAchievers";
import { saveAchievers } from "./achiever/saveUtils";
import {
  genrateMonthsData,
  handleRoadmapUpdateToUser,
} from "./path/createUtils";

export const updateRoadmapHelper = async (updatedUser: UserInterface) => {
  console.log("NEW ROADMAP");
  const monthsDataNew = await genrateMonthsData(updatedUser);

  // mark completed
  const { monthItems, completedTargets } = await handleRoadmapUpdateToUser(
    updatedUser,
    monthsDataNew,
  );

  // get saved roadmap
  const savedAchievementPath = await getAllAchievmentPaths(
    updatedUser.uid,
    "asc",
  );

  console.log();
  console.log();
  const { toDelete, toPreserve } =
    filterOutPastAchievements(savedAchievementPath);
  const nowRoadmap: AchievementPathData[] = [...toPreserve, ...monthItems];

  console.log();
  console.log();
  console.log("now map", nowRoadmap.length);
  let j: number = 0;
  for (const mapItem of nowRoadmap) {
    console.log();
    console.log(
      j,
      "map",
      mapItem.title?.text,
      " goals:",
      mapItem.items?.length,
    );
    j++;
  }

  await deleteGoalAchievementPath(updatedUser.uid, toDelete);
  await saveGoalAchievementPath(updatedUser.uid, nowRoadmap);

  // add badges
  const { achieversToAdd, achieversToRemove, totalTargets } =
    await addAchieversToRoadmap(updatedUser.uid, updatedUser, nowRoadmap);

  console.log("completed targets", completedTargets);
  console.log("total targets", totalTargets);

  await saveAchievers(
    updatedUser.uid,
    achieversToAdd,
    achieversToRemove,
    totalTargets,
    completedTargets,
  );
};

const filterOutPastAchievements = (
  oldRoadmap: AchievementPathData[],
  //   newRoadmap: AchievementPathData[],
) => {
  console.log();
  console.log();
  console.log("REMOVING STALE ROADMAP | PRESERVING PAST ROADMAP");
  const now = Date.now();

  const toPreserve: AchievementPathData[] = [];
  const toDelete: AchievementPathData[] = [];

  let i: number = 0;
  for (const mapItem of oldRoadmap) {
    if (mapItem.endTime && mapItem.endTime < now) {
      console.log(i, "preserve", mapItem.title?.text);
      console.log();
      toPreserve.push(mapItem);
    } else {
      console.log(i, "delete", mapItem.title?.text);
      console.log();
      toDelete.push(mapItem);
    }

    i++;
  }

  return { toPreserve, toDelete };
};
