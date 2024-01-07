import { sendHSMV3 } from "../../../models/Conversations/sendHSMV2";
import { getUpcomingRound } from "../../../models/Rounds/getUserRankV2";
import { UserInterface } from "../../../models/User/User";
import { getFormattedDateForUnixWithTZ } from "../../PubSub/activityTracker/utils";
import { getTimezone } from "../onActivityUpdateV2/dateBucket";

export const sendChallengeJoinNotification = async (
  userNow: UserInterface,
  userPre: UserInterface,
) => {
  if (userNow.challengeJoined && !userPre.challengeJoined && userNow.phone) {
    // get round
    const tz = getTimezone(userNow);

    const upcomingRound = await getUpcomingRound();
    if (upcomingRound?.start) {
      const formattedDate = getFormattedDateForUnixWithTZ(
        upcomingRound?.start,
        tz,
        "Do MMM YYYY",
      );

      await sendHSMV3(
        userNow.phone,
        "challenge_confirmation_2",
        [userNow.name ? userNow.name : "there", formattedDate],
        undefined,
        [
          "https://sbusermedia.s3.ap-south-1.amazonaws.com/notifications/Challenge+Announcement+(1)+(1).mp4",
        ],
      );
    }
  }
};
