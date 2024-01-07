import { Activity } from "../../../models/Activity/Activity";
import { getUserActivityAfter } from "../../../models/Activity/getUtils";
import { UserInterface } from "../../../models/User/User";
import { getDayStartForTz_DATE } from "../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
import { getUserTimezone } from "../taskGenerator/generateReminders";
import {
  getAllRecsForUserAndType,
  // updateRec,
} from "../taskGenerator/getterSetter";

export const handleRecalculation = async (
  uid: string,
  type: "workout" | "nutrition",
  user: UserInterface,
) => {
  const tzString = getUserTimezone(
    user.recommendationConfig?.timezone?.tzString,
  );

  const allWorkoutRecs = await getAllRecsForUserAndType(uid, type);
  const sortedRecs = allWorkoutRecs.sort((x, y) => x.unix - y.unix);

  const userDateActivities: { [date: string]: Activity[] } = {};

  for (const rec of sortedRecs) {
    const start = getDayStartForTz_DATE(tzString, rec.date);
    if (start) {
      const end = start + 24 * 60 * 60 * 1000;

      let userDayActs: Activity[] = [];
      if (userDateActivities[rec.date]) {
        userDayActs = userDateActivities[rec.date];
      } else {
        //   console.log("start", start, end);
        userDayActs = await getUserActivityAfter(uid, start, end);
        //   console.log(
        //     "userDayActs",
        //     userDayActs.map((item) => item.activityName),
        //   );
        userDateActivities[rec.date] = userDayActs;
      }

      let tkFP: number = 0;
      for (const task of rec.tasks) {
        const relevantActs = userDayActs.filter(
          (item) => item.taskId === task.id,
        );

        const earnedFP = relevantActs.reduce((acc, item) => {
          const cals = item.calories ? item.calories : 0;
          const fp = Math.round(cals / 300);
          return acc + fp;
        }, 0);

        tkFP += earnedFP;
      }

      // recalculated
      if (rec.doneFP !== tkFP) {
        // await updateRec(uid, rec.id, tkFP);
        console.log(rec.date, rec.doneFP, tkFP, rec.taskFP);
      }
    }
  }
};
