import {
  AchievementPathData,
  AchievementPathDataItem,
  AchievementPathDataItemStatusType,
  UserInterface,
} from "../../../../models/User/User";
import { v4 as uuidv4 } from "uuid";
import { createBaseAchiever } from "../../../../models/awards/getUtils";
import {
  Achiever,
  achieverProgress,
} from "../../../../models/awards/interface";
import { ONE_DAY_MS } from "../../period/getPeriodArray";
import { compareKPI } from "../../updateRoadmap/main/handleProgressUpdate";
import { awardMap } from "../path/constants";
import { getAchieverForTypeMonth } from "../path/utils";
import { format } from "date-fns";
import { cleanRoadmapFrill } from "./removeUnachieved";

export const addAchieversToRoadmap = async (
  uid: string,
  user: UserInterface,
  roadmap: AchievementPathData[],
) => {
  // const now = Date.now();
  const achieversToAdd: Achiever[] = [];
  let achieversToRemove: string[] = [];
  let totalTargets: number = 0;

  for (const month of roadmap) {
    console.log("");
    console.log("");
    console.log(
      "month",
      month.startTime
        ? format(new Date(month.startTime), "dd MMM yy")
        : "No Start Date",
    );

    const allAwardsForMonth = await getAchieverForMonth(uid, month);
    const awardAchieverMap = createAchieverMap(allAwardsForMonth);

    const idsToKeep: { [id: string]: boolean } = {};
    let itemNumber: number = 0;

    if (month.items) {
      for (const monthItem of month.items) {
        const achieverInDB = getAchieverFromMap(monthItem, awardAchieverMap);
        console.log("");
        console.log(
          "item in month: ",
          itemNumber,
          " monthItem:",
          monthItem.type,
          " DB state:",
          achieverInDB ? "PRESENT" : "ABSENT",
          month.startTime &&
            month.endTime &&
            `Start:${format(
              new Date(month.startTime),
              "dd-MM-yyyy",
            )} End:${format(new Date(month.endTime), "dd-MM-yyyy")}`,
        );

        totalTargets++;

        let id: string = uuidv4();
        if (achieverInDB?.id) {
          idsToKeep[achieverInDB.id] = true;
          id = achieverInDB.id;

          console.log("ACHIEVER ID KEPT", achieverInDB.title);
        }

        // achieverInDB is won, create new achiever
        // achieverInDB is present, overwrite
        // achieverInDB is absent, new achiever

        itemNumber++;
        const st = await compareKPI(
          user,
          monthItem,
          month.startTime,
          month.endTime,
        );

        console.log("st", st);
        // throw new Error("PAUSED");

        const newAchiever = createNewAchieverFunc(
          uid,
          monthItem,
          month,
          st?.progress,
          monthItem.text,
          month.startTime ? month.startTime + itemNumber * 1000 : undefined,
          st?.status,
          st?.progressText,
          id,
          st?.steps,
          st?.stepSize,
          monthItem.countNeeded,
          month.startTime
            ? format(new Date(month.startTime), "MMMM")
            : undefined,
          achieverInDB,
          st?.unlockedOn,
        );

        console.log("newAchiever", newAchiever);

        if (newAchiever) {
          achieversToAdd.push(newAchiever);
          console.log(
            "achiever added",
            newAchiever.id,
            " Status:",
            st?.status,
            " Subtitle:",
            st?.progressText,
          );
        } else {
          console.log("achiever creation failed");
        }
      }
    }

    achieversToRemove = getAchieversToRemove(
      idsToKeep,
      allAwardsForMonth,
      achieversToRemove,
    );
  }

  console.log();
  console.log();
  // remove achievers before roadmap started (unachieved)
  const frillTrash = await cleanRoadmapFrill(uid, roadmap);

  // remove achievers after roadmap (unachieved)

  console.log();
  console.log();
  console.log("achieversToRemove", achieversToRemove);
  console.log("achieversToAdd", achieversToAdd.length);
  console.log("frillTrash", frillTrash.length);
  console.log("total targets", totalTargets);
  console.log();
  console.log();

  // throw new Error("PAUSED");

  return {
    achieversToRemove: [...achieversToRemove, ...frillTrash],
    achieversToAdd,
    totalTargets,
  };
};

const getAchieverForMonth = async (uid: string, month: AchievementPathData) => {
  if (month.startTime) {
    return await getAchieverForTypeMonth(uid, month.startTime + ONE_DAY_MS);
  }

  return [];
};

const getAchieverFromMap = (
  monthItem: AchievementPathDataItem,
  map: { [id: string]: Achiever },
) => {
  if (monthItem.type) {
    const awardId = awardMap[monthItem.type];
    if (awardId) {
      if (map[awardId]) {
        return map[awardId];
      }
    }
  }

  return undefined;
};

const createAchieverMap = (achievers: Achiever[]) => {
  const mapByAwardId: { [id: string]: Achiever } = {};
  for (const achiever of achievers) {
    if (achiever.awardId) {
      mapByAwardId[achiever.awardId] = achiever;
    }
  }

  return mapByAwardId;
};

const createNewAchieverFunc = (
  uid: string,
  monthItem: AchievementPathDataItem,
  month: AchievementPathData,
  progress?: achieverProgress,
  title?: string,
  createdTime?: number,
  status?: AchievementPathDataItemStatusType,
  progressText?: string,
  previousId?: string,
  steps?: number,
  stepSize?: number,
  totalCount?: number,
  mainLabel?: string,
  previousAchiever?: Achiever,
  unlockOn?: number,
) => {
  if (monthItem.type) {
    const awardId = awardMap[monthItem.type];
    if (awardId && month.startTime && month.endTime) {
      return createBaseAchiever(
        uid,
        month.startTime,
        month.endTime,
        awardId,
        progress,
        // monthItem.comparisonType,
        // monthItem.type,
        // monthItem.target,
        // monthItem.countNeeded,
        month.startTime + ONE_DAY_MS,
        createdTime,
        title,
        status,
        progressText,
        previousId,
        steps,
        stepSize,
        totalCount,
        mainLabel,
        previousAchiever,
        unlockOn,
      );
    }
  }

  return undefined;
};

const getAchieversToRemove = (
  idsToKeep: { [id: string]: boolean },
  achieversFromDB: Achiever[],
  toRemoveIds: string[],
) => {
  // 1,2,3
  // 1,2,3,4,5

  for (const achiever of achieversFromDB) {
    if (!idsToKeep[achiever.id]) {
      toRemoveIds.push(achiever.id);
    }
  }

  return toRemoveIds;
};
