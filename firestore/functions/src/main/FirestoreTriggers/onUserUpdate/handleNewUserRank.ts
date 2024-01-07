import { createActivityForTerra } from "../../../models/Activity/createActivityForTerra";
import {
  getRankForUser,
  saveNewActivity,
} from "../../../models/Activity/getUtils";

import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { UserInterface } from "../../../models/User/User";
import {
  // formatDate,
  getDayStartIST,
  getFormattedDateForUnix,
  // getISTVariantForTime,
} from "../../PubSub/activityTracker/utils";
// import { getEventMetricsForEventObj } from "../onActivityUpdate/getEventMetrics";

export const handleNewUserRank = async (
  eventId: string,
  user: UserInterface,
) => {
  const remoteTeam = await getSbEventById(eventId);
  // console.log(
  //   "remoteTeam",
  //   remoteTeam?.name,
  //   remoteTeam?.parentId,
  //   remoteTeam?.eventType,
  // );

  // entry in team
  if (remoteTeam?.eventType === "challenge" && remoteTeam.parentId) {
    const baseTeam = await getSbEventById(remoteTeam.parentId);

    // get game
    if (baseTeam) {
      const userRank = await getRankForUser(baseTeam?.id, user.uid);

      // const { after } = getEventMetricsForEventObj(baseTeam);

      if (!userRank) {
        const now = Date.now();
        const dayStart = getDayStartIST(now);
        // const istVar = getISTVariantForTime(
        //   new Date(after + 24 * 60 * 60 * 1000),
        // );
        const formattedDate = getFormattedDateForUnix(dayStart);

        const act = createActivityForTerra(formattedDate, 0, user, dayStart);
        await saveNewActivity(user.uid, act, []);
      }
    }
  } else if (remoteTeam?.eventType === "challenge") {
    const userRank = await getRankForUser(remoteTeam?.id, user.uid);

    // const { after } = getEventMetricsForEventObj(remoteTeam);
    if (!userRank) {
      const now = Date.now();
      const dayStart = getDayStartIST(now);
      // const istVar = getISTVariantForTime(
      //   new Date(after + 24 * 60 * 60 * 1000),
      // );
      const formattedDate = getFormattedDateForUnix(dayStart);
      const act = createActivityForTerra(formattedDate, 0, user, dayStart);
      await saveNewActivity(user.uid, act, []);
    }
  }
};
