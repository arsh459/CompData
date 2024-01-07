import { AchievementPathData } from "../../../../models/User/User";
import { getAchieverInRange } from "../path/utils";

export const cleanRoadmapFrill = async (
  uid: string,
  roadmap: AchievementPathData[],
) => {
  console.log("Roadmap length", roadmap.length);
  const toTrashIds: string[] = [];
  if (roadmap.length) {
    const stTime = roadmap[0].startTime;
    console.log("Roadmap start", stTime, stTime ? new Date(stTime) : "");
    if (stTime) {
      const oldTrash = await removeUnachieved(uid, 0, stTime);

      toTrashIds.push(...oldTrash);
    }

    const endTime = roadmap[roadmap.length - 1].endTime;
    console.log("Roadmap endTime", endTime);
    if (endTime) {
      const futureTrash = await removeUnachieved(uid, endTime, endTime * 10);

      toTrashIds.push(...futureTrash);
    }
  }

  return toTrashIds;
};

const removeUnachieved = async (uid: string, start: number, end: number) => {
  const achieversInRange = await getAchieverInRange(uid, start, end);

  const toRemoveIds: string[] = [];

  for (const achiever of achieversInRange) {
    if (achiever.awardStatus !== "WON") {
      console.log("FRILL TRASH", achiever.title);
      toRemoveIds.push(achiever.id);
    }
  }

  return toRemoveIds;
};
