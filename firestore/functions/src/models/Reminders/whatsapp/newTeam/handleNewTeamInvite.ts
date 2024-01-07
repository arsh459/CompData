import { RUNNER_GAME, WOMENS_GAME } from "../../../../constants/challenge";
import { sbAppDL } from "../../../../constants/email/contacts";
import { whatsappChannelId } from "../../../../main/Https/messagebird/constants/identifiers";
import { Param, sendHSM } from "../../../Conversations/sendHSM";
import { getSbEventById } from "../../../sbEvent/getUtils";
import { getUserById } from "../../../User/Methods";

export const handleNewTeamInviteMessage = async (
  authorId: string,
  eventId: string,
) => {
  const author = await getUserById(authorId);
  const eventObj = await getSbEventById(eventId);

  if (author && eventObj) {
    if (eventObj.parentId) {
      const parentEvent = await getSbEventById(eventObj.parentId);

      if (parentEvent) {
        if (author.phone) {
          const params = generateTeamInviteParams(
            parentEvent.name,
            getExplainerVideo(parentEvent.id),
            author.name,
            author.userKey,
            eventObj.eventKey,
          );

          // to creator
          await sendHSM(
            author.phone,
            whatsappChannelId,
            "share_with_friends",
            params,
          );

          return true;
        }
      }
    }
  }

  return false;
};

const generateTeamInviteParams = (
  parentName: string,
  explainerVideo: string,
  name?: string,
  userKey?: string,
  eventKey?: string,
): Param[] => {
  return [
    { default: name ? `*${name.trim()}*` : "there" },
    { default: parentName ? `${parentName.trim()}` : "game" },
    {
      default: sbAppDL,
      // userKey && eventKey
      //   ? `*https://socialboat.live/${userKey}/${eventKey}*`
      //   : "https://socialboat.live/teams",
    },
    {
      default: explainerVideo,
    },
    { default: name ? `*${name.trim()}*` : "there" },
  ];
};

export const getExplainerVideo = (parentId?: string) => {
  return "https://www.youtube.com/shorts/yHJE1TbKIRg";

  if (parentId === RUNNER_GAME) {
    return "https://www.youtube.com/watch?v=hr7xHQz4FKk";
  } else if (parentId === WOMENS_GAME) {
    return "https://www.youtube.com/shorts/bNkGVoh9Nvg";
  } else {
    return "https://www.youtube.com/watch?v=i1FR3N5JcME&list=PLFkXhbX4PMHZgsbYsdQA3jRtvV1fhGntU";
  }
};
