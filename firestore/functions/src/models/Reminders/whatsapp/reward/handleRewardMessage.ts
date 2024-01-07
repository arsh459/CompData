import { sbAppDL } from "../../../../constants/email/contacts";
import { whatsappChannelId } from "../../../../main/Https/messagebird/constants/identifiers";
import { getAllUserRanksForCoach } from "../../../Activity/getUtils";
import { Param, sendHSM } from "../../../Conversations/sendHSM";
import { getSbEventById } from "../../../sbEvent/getUtils";
import { getUserById } from "../../../User/Methods";
import { getProgressForTask, updateUIDForReminder } from "../../getUtils";

export const handleRewardMessage = async (
  id: string,
  rewardName: string,
  positionName: string,
  communityId: string,
  winnerId: string,
  parentId: string,
  postId: string,
) => {
  const uidsDone = await getProgressForTask(id);

  const user = await getUserById(winnerId);
  const coach = await getUserById(communityId);

  const rankObjs = await getAllUserRanksForCoach(parentId, communityId);
  // console.log("rankObjs", rankObjs);

  if (rankObjs.length) {
    const eventId = rankObjs[0].coachEventId;

    const coachEvent = await getSbEventById(eventId);

    if (coachEvent?.eventKey) {
      for (const rankObj of rankObjs) {
        if (
          rankObj.uid !== winnerId &&
          !uidsDone[rankObj.uid] &&
          !user?.unsubscribe
        ) {
          const toRank = await getUserById(rankObj.uid);

          if (toRank?.phone) {
            // console.log("here");
            await sendHSM(
              toRank.phone,
              // "+919811800046",
              whatsappChannelId,
              "reward_update",
              generateRewardParams(
                positionName,
                rewardName,
                `https://socialboat.live/${encodeURI(
                  coach?.userKey ? coach?.userKey : "",
                )}/${encodeURI(
                  coachEvent.eventKey ? coachEvent.eventKey : "",
                )}?postId=${postId}`,
                toRank.name,
                user?.name,
              ),
            );

            // throw new Error("HI");
          }

          await updateUIDForReminder(id, rankObj.uid);
        } else if (
          rankObj.uid === winnerId &&
          !uidsDone[rankObj.uid] &&
          !user?.unsubscribe
        ) {
          const toRank = await getUserById(rankObj.uid);
          const game = await getSbEventById(parentId);

          if (toRank?.phone) {
            // console.log("here");
            await sendHSM(
              toRank.phone,
              // "+919811800046",
              whatsappChannelId,
              "reward_winner",
              generateWinnerParams(
                positionName,
                rewardName,
                `https://socialboat.live/${encodeURI(
                  coach?.userKey ? coach?.userKey : "",
                )}/${encodeURI(
                  coachEvent.eventKey ? coachEvent.eventKey : "",
                )}?postId=${postId}`,
                toRank.name,
                game?.name,
              ),
            );

            // throw new Error("HI");
          }

          await updateUIDForReminder(id, rankObj.uid);
        }
      }
    }
  }

  return true;
};

const generateRewardParams = (
  positionName: string,
  rewardName: string,
  link: string,
  name?: string,
  winnerName?: string,
): Param[] => {
  return [
    { default: name ? `*${name.trim()}*` : "there" },
    { default: winnerName ? `*${winnerName.trim()}*` : "athlete" },
    { default: `*${positionName}*` },
    { default: `*${rewardName}*` },
    {
      default: sbAppDL, // link
    },
  ];
};

const generateWinnerParams = (
  positionName: string,
  rewardName: string,
  link: string,
  name?: string,
  gameName?: string,
): Param[] => {
  return [
    { default: name ? `*${name.trim()}*` : "there" },
    { default: `*${positionName}*` },
    { default: gameName ? `*${gameName.trim()}*` : "SocialBoat Fitness game" },
    { default: `*${rewardName}*` },
    {
      default: sbAppDL, //link
    },
  ];
};
