import { getUserById } from "../../../../models/User/Methods";
import { AchievementPathDataItemTypes } from "../../../../models/User/User";
import { awardMap } from "../../addBadge/path/constants";
import { getAchieverForType } from "../../addBadge/path/utils";

export const achieverUpdateWrapper = async (
  uid: string,
  type: AchievementPathDataItemTypes,
) => {
  const awardId = awardMap[type];
  const user = await getUserById(uid);
  if (awardId && user) {
    const achievers = await getAchieverForType(uid, awardId);

    for (const achiever of achievers) {
      console.log("achiever", achiever);
      //target
      //countNeeded
      //comparisonType
      //type
      //  achiever.
      //
      // if you lose, then lose all future badges
      // ach, ach, ach.
      // may, june, july, aug.
      //
      // roadmapChange
      // goal is changed
      // if badge earned, create new. if not earned, change
      //
      //
    }
  }
};
