import { sbAppDL } from "../../../../constants/email/contacts";
import { whatsappChannelId } from "../../../../main/Https/messagebird/constants/identifiers";
import { getPointsToNextLevel } from "../../../../main/Https/refreshUserLevels/handleUserLevelReconcile";
import { getUserRankForUID } from "../../../Activity/getUtils";
import { Param, sendHSM } from "../../../Conversations/sendHSM";
import { getSbEventById } from "../../../sbEvent/getUtils";
import { getUserById } from "../../../User/Methods";

export const handleLevelUpgrade = async (
  authorId: string,
  parentId: string,
  // state: "upgrade" | "downgrade",
  //   eventId: string,
) => {
  const author = await getUserById(authorId);

  if (author) {
    if (author.phone && typeof author.userLevelV2 === "number") {
      // const link = await getCommunityLink(parentId, authorId);

      const params = generateLevelUpgradeParams(
        author.userLevelV2,
        sbAppDL, // link ? link : "https://socialboat.live/teams",
        getPointsToNextLevel(author.userLevelV2),
        author.name,
      );

      // to creator
      await sendHSM(author.phone, whatsappChannelId, "level_upgrade", params);

      return true;
    }
  }

  return false;
};

export const getCommunityLink = async (parentId: string, authorId: string) => {
  const myUserRank = await getUserRankForUID(parentId, authorId);

  const coachCommunityId = myUserRank?.coachCommunityId;
  const coachEventId = myUserRank?.coachEventId;

  if (coachCommunityId && coachEventId) {
    const coach = await getUserById(coachCommunityId);
    const coachEvent = await getSbEventById(coachEventId);

    if (coach?.userKey && coachEvent?.eventKey) {
      return `https://socialboat.live/${encodeURI(coach?.userKey)}/${encodeURI(
        coachEvent?.eventKey,
      )}`;
    }
  }

  return undefined;
};

const generateLevelUpgradeParams = (
  newLevel: number,
  link: string,
  nextLevelPoints: number,
  name?: string,
): Param[] => {
  return [
    { default: name ? `*${name.trim()}*` : "there" },
    { default: newLevel ? `*Lvl ${newLevel}*` : "*Lvl 0*" },
    { default: `*${nextLevelPoints}*` },
    { default: link ? link : "https://socialboat.live/teams" },
  ];
};
