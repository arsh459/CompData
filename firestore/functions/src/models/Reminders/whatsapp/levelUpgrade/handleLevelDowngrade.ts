import { sbAppDL } from "../../../../constants/email/contacts";
import { whatsappChannelId } from "../../../../main/Https/messagebird/constants/identifiers";
// import { getPointsToNextLevel } from "../../../../main/Https/refreshUserLevels/handleUserLevelReconcile";
// import { getUserRankForUID } from "../../../Activity/getUtils";
import { Param, sendHSM } from "../../../Conversations/sendHSM";
// import { getSbEventById } from "../../../sbEvent/getUtils";
import { getUserById } from "../../../User/Methods";
// import { getCommunityLink } from "./handleLevelUpgrade";

export const handleLevelDowngrade = async (
  authorId: string,
  parentId: string,
  //   eventId: string,
) => {
  const author = await getUserById(authorId);

  if (author) {
    if (author.phone && typeof author.userLevelV2 === "number") {
      // const link = await getCommunityLink(parentId, authorId);

      const params = generateLevelDowngradeParams(
        author.userLevelV2,
        sbAppDL, // link ? link : "https://socialboat.live/teams",
        author.name,
      );

      // to creator
      await sendHSM(author.phone, whatsappChannelId, "level_drop", params);

      return true;
    }
  }

  return false;
};

const generateLevelDowngradeParams = (
  newLevel: number,
  link: string,
  name?: string,
): Param[] => {
  return [
    { default: name ? `*${name.trim()}*` : "there" },
    { default: newLevel ? `*Lvl ${newLevel}*` : "*Lvl 0*" },
    { default: link ? link : "https://socialboat.live/teams" },
  ];
};
