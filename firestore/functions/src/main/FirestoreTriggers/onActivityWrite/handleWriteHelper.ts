import { Activity } from "../../../models/Activity/Activity";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import { getEventMetrics } from "../onActivityUpdate/getEventMetrics";
import { handleCoachEventHelper } from "./handleCoachEventHelper";
// import { handleNotifyUser } from "./handleNotify";
import { handlePrizeSummaryV2 } from "./handlePrizeSummaryV2";
import { handleUserEventHelper } from "./handleUserEventHelper";
import {
  getChallengeEndTime,
  getEndActivityRange,
  // isActivityInIfChallengeFinite,
  isActivityRelevantForChallenge,
} from "./utils";

export const handleWriteHelper = async (
  user: UserInterface,
  now: Activity,
  activityId: string,
  pre?: Activity,
) => {
  if (user.enrolledEventsWithTime) {
    const parentEventIdsUpdated: { [parentId: string]: boolean } = {};
    const parentEventIdsNotified: { [parentId: string]: boolean } = {};

    const nowTime = Date.now();

    for (const eventTimeObj of user.enrolledEventsWithTime) {
      const remoteEvent = await getSbEventById(eventTimeObj.eventId);

      if (
        remoteEvent &&
        remoteEvent.parentId &&
        remoteEvent.eventType === "challenge" &&
        !parentEventIdsUpdated[remoteEvent.parentId] // one update per parent
      ) {
        // TODO: CHECK nbMembers
        const {
          after,
          state,
          nbMembers,
          challengeLength,
          before,
          sprintLength,
          roundLength,
          sprints,
          rounds,
        } = await getEventMetrics(remoteEvent.parentId);

        if (
          after &&
          state === "active" &&
          nowTime > after && // current time should be after the challenge start
          // activity checks
          (isActivityRelevantForChallenge(
            eventTimeObj.enrolledTime,
            after,
            challengeLength,
            before,
            now.createdOn,
          ) ||
            isActivityRelevantForChallenge(
              eventTimeObj.enrolledTime,
              after,
              challengeLength,
              before,
              pre?.createdOn,
            ))
        ) {
          // notify
          if (
            now.notifyUser === "PENDING" &&
            !parentEventIdsNotified[remoteEvent.parentId]
          ) {
            // await handleNotifyUser(remoteEvent.parentId, user.uid, activityId);
            parentEventIdsNotified[remoteEvent.parentId] = true;
          }

          // only one entry
          parentEventIdsUpdated[remoteEvent.parentId] = true;
          const coach = await getUserById(remoteEvent.ownerUID);

          const rankedUsers = await handleUserEventHelper(
            user,
            remoteEvent,
            remoteEvent.parentId,
            after,
            getChallengeEndTime(nowTime, before, challengeLength), // user activities before now
            coach?.name ? coach.name : "",
            eventTimeObj.enrolledTime,
            getEndActivityRange(nowTime, before, challengeLength),
            sprintLength,
            roundLength,
            // challengeLength && before < nowTime ? before : nowTime,
          );

          // throw new Error("PAUSED");

          if (rankedUsers && sprints && rounds) {
            const coachUsers = await handleCoachEventHelper(
              remoteEvent.ownerUID,
              remoteEvent.parentId,
              remoteEvent.id,
              rankedUsers,
              after,
              remoteEvent.name,
              remoteEvent.eventKey ? remoteEvent.eventKey : "",
              sprints,
              rounds,
            );

            // save prizes
            if (coachUsers) {
              await handlePrizeSummaryV2(
                remoteEvent.parentId,
                rankedUsers,
                coachUsers,
                nbMembers,
                true,
                // sprintLength,
                // roundLength,
              );
            }
          }
        }
      }
    }
  }
};
