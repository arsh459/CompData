import { getUserById } from "../../../models/User/Methods";
// import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
// import { UserRank } from "../../../models/Activity/Activity";
// import {
//   reRankUsers,
//   reRankUsers_distance,
//   reRankUsers_speed,
//   reRankUsers_streak,
//   reRankUsers_week,
// } from "../../../models/Activity/handleRanking";
import { getAllUserRanks } from "../../../models/Activity/getUtils";
// import {
//   reconcileUser_activities,
//   saveRankedUsers,
// } from "../../../models/Activity/createUtils";
import { sendHSM } from "../../../models/Conversations/sendHSM";
import { whatsappChannelId } from "../messagebird/constants/identifiers";

export const sendGlobalMessage = async (eventId: string) => {
  //   const newRanks: UserRank[] = [];
  //   const {
  //     // calCriterion,
  //     // judgeCrit,
  //     challengeLength,
  //     streakLengthTh,
  //     calThForStreak,
  //     after,
  //     before,
  //   } = await getEventMetrics(eventId);

  const userRanks = await getAllUserRanks(eventId);
  //   console.log("userRanks", userRanks.length);

  const sendUIDs: { [uid: string]: boolean } = {};
  let i: number = 0;
  for (const userRank of userRanks) {
    const user = await getUserById(userRank.uid);

    // console.log("user", user?.name);

    if (
      user &&
      user.name &&
      user.phone &&
      !sendUIDs[user.uid]
      //   user.phone === "+919811800046"
    ) {
      sendUIDs[user.uid] = true;
      i += 1;
      await sendHSM(user.phone, whatsappChannelId, "live_update", [
        { default: user.name.trim() },
        { default: "https://www.instagram.com/socialboat.live/?hl=en" },
      ]);

      console.log(i, user.name, user.phone);
    }
  }
};
