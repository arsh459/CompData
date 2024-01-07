// import { updateStreakState } from "../../../models/Activity/createUtils";
import { getRankForUser } from "../../../models/Activity/getUtils";
// import { getStreakPrize } from "../../../models/Prizes/getStreakPrize";
// import { saveStreakReward } from "../../../models/Prizes/createSummary";
// import { createStreakReward } from "../../../models/Prizes/createUtils";
// import { getStreakPrize } from "../../../models/Prizes/getStreakPrize";
import {
  getChildEvents,
  getSbEventsInList,
} from "../../../models/sbEvent/getUtils";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
import { getUsersForEvent } from "../../../models/User/Methods";
import { getEventMetricsForEventObj } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";

const activeChallenges = ["f220bbb1-a8a1-4c29-83ef-21bc0b1b123a"];

export const handleStreakPrize = async () => {
  // get all activie challenges
  const sbEvents = await getSbEventsInList(activeChallenges);

  for (const parentEvent of sbEvents) {
    const { after, challengeLength, calThForStreak, streakLengthTh } =
      getEventMetricsForEventObj(parentEvent);

    if (after) {
      await handleEventStreak(
        parentEvent,
        after,
        challengeLength,
        calThForStreak,
        streakLengthTh,
      );
    }
  }
};

const handleEventStreak = async (
  event: sbEventInterface,
  after: number,
  challengeLength: number,
  calThForStreak: number,
  streakLengthTh: number,
) => {
  // get child events
  const childEvents = await getChildEvents(event.id);

  for (const child of childEvents) {
    const allMembers = await getUsersForEvent(child.id);
    for (const member of allMembers) {
      const userRank = await getRankForUser(event.id, member.uid);

      if (!userRank?.onStreak) {
        // streak presnt
        // await getStreakPrize(
        //   after,
        //   calThForStreak,
        //   challengeLength,
        //   streakLengthTh,
        //   child.id,
        //   userRank,
        // );
        // if (isStreak && userRank) {
        // await updateStreakState(event.id, userRank);
        // }
      }
    }
  }
};
