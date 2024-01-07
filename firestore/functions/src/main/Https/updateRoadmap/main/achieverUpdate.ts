import {
  AchievementPathData,
  AchievementPathDataItem,
} from "../../../../models/User/User";
import { awardMap } from "../../addBadge/path/constants";
import { getAchieverForMonthAwardUID } from "../../addBadge/path/utils";
import { ONE_DAY_MS } from "../../period/getPeriodArray";

export const getRelevantAchiever = async (
  uid: string,
  monthItem: AchievementPathDataItem,
  month: AchievementPathData,
) => {
  if (monthItem.type) {
    const awardId = awardMap[monthItem.type];
    if (awardId && month.startTime) {
      const monthAward = await getAchieverForMonthAwardUID(
        uid,
        awardId,
        month.startTime + ONE_DAY_MS,
      );

      return monthAward;
    }
  }

  return undefined;
};
