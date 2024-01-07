import { whatsappChannelId } from "../../../main/Https/messagebird/constants/identifiers";
import { Activity } from "../../Activity/Activity";
import { getUserActivityAfter } from "../../Activity/getUtils";
import { Param, sendHSM } from "../../Conversations/sendHSM";

export const hasWorkedOutToday = async (
  uid: string,
  after: number,
  before: number,
) => {
  // console.log("after", after);
  // console.log("uid", uid);
  const activitiesAfter = await getUserActivityAfter(uid, after, before);

  // console.log("activitiesAfter", activitiesAfter);
  const sumCals = calSum(activitiesAfter);

  if (sumCals) {
    return true;
  }

  return false;
};

const calSum = (activities: Activity[]) => {
  let cal: number = 0;
  for (const act of activities) {
    cal += act.calories ? act.calories : 0;
  }

  return cal;
};

export const handleMissedMessage = async (
  toPhone: string,
  toName: string,
  coachName: string,
  rank?: number,
  calories?: number,
  streakScore?: number,
) => {
  if (toPhone) {
    await sendHSM(
      toPhone,
      whatsappChannelId,
      "missed_class",
      missedYouMessageParams(toName, rank, calories, streakScore, coachName),
    );
  }
};

const missedYouMessageParams = (
  toName: string,
  rank?: number,
  calories?: number,
  streakScore?: number,
  coachName?: string,
): Param[] => {
  return [
    { default: toName ? `${toName.trim()}` : "" },
    { default: rank ? `*${rank}*` : "-" },
    { default: calories ? `*${Math.round(calories)}*` : "-" },
    { default: streakScore ? `*${streakScore}*` : "-" },
    { default: coachName ? `${coachName.trim()}` : "" },
  ];
};
