import { UserRank } from "../../../models/Activity/Activity";
import { Param, sendHSM } from "../../../models/Conversations/sendHSM";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
import { UserInterface } from "../../../models/User/User";
import { whatsappChannelId } from "../../Https/messagebird/constants/identifiers";

export const unpaidWorkoutDaily = async (
  coachEvent: sbEventInterface,
  toUser: UserInterface,
  toUserRank: UserRank | undefined,
  coachKey?: string,
  coachName?: string,
) => {
  if (toUser.name && coachEvent.name && coachName && toUser.phone) {
    const msgParams = createParamsForDailyMessage(
      toUser.name,
      toUserRank?.rank ? toUserRank?.rank : 0,
      toUserRank?.totalCalories ? Math.round(toUserRank?.totalCalories) : 0,
      toUserRank?.streakScore ? toUserRank.streakScore : 0,
      `https://${coachKey}.socialboat.live`,
      coachName,
    );

    try {
      await sendHSM(
        toUser.phone,
        whatsappChannelId,
        "challenge_update_l1",
        msgParams,
      );
    } catch (error) {
      console.log("error in workout create", toUser.phone);
    }
  }
};

const createParamsForDailyMessage = (
  toUserName: string,
  rank: number,
  calories: number,
  streakScore: number,
  link: string,
  coachName: string,
): Param[] => {
  return [
    {
      default: toUserName ? `${toUserName.trim()}` : "there",
    },
    {
      default: rank ? `*${rank}*` : "-",
    },
    {
      default: calories ? `*${calories}*` : "-",
    },
    {
      default: streakScore ? `*${streakScore}*` : "-",
    },
    {
      default: link ? `${link}` : "",
    },
    {
      default: coachName ? `${coachName}` : "",
    },
  ];
};
