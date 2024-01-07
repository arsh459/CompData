import { getDayStartIST } from "../../../main/PubSub/activityTracker/utils";
import { getRankForUser } from "../../Activity/getUtils";
import { getSbEventById } from "../../sbEvent/getUtils";
import { sbEventInterface } from "../../sbEvent/sbEvent";
import { getUserById, getUsersForEvent } from "../../User/Methods";
import { handleMissedMessage, hasWorkedOutToday } from "./eveningUils";

export const eveningNotificationV2 = async (
  eventId: string,
  parentId: string,
) => {
  const childEvent = await getSbEventById(eventId);

  if (childEvent) {
    await handleEveningNotificationForChildEventV2(childEvent, parentId);
  }

  return true;
};

export const handleEveningNotificationForChildEventV2 = async (
  childEvent: sbEventInterface,
  parentId: string,
) => {
  const allMembers = await getUsersForEvent(childEvent.id);
  const now = Date.now();
  const dayStart = getDayStartIST(now);

  // console.log("dayStart", dayStart, now);

  const coach = await getUserById(childEvent.ownerUID);

  if (coach) {
    for (const member of allMembers) {
      const userRank = await getRankForUser(parentId, member.uid);
      const works = await hasWorkedOutToday(member.uid, dayStart, now);

      // console.log("member", member.name, works);
      if (
        !works &&
        member.phone &&
        member.name &&
        coach.name
        // member.phone === "+919811800046"
      ) {
        await handleMissedMessage(
          member.phone,
          member.name,
          coach.name,
          userRank?.rank,
          userRank?.totalCalories,
          userRank?.streakScore,
        );
      }
    }
  }
};
