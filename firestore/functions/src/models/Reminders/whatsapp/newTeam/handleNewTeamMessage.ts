import {
  sbAppDL,
  // toAbhitegPhone,
  toSauravPhone,
  toSwapnilPhone,
} from "../../../../constants/email/contacts";
import { whatsappChannelId } from "../../../../main/Https/messagebird/constants/identifiers";
import { Param, sendHSM } from "../../../Conversations/sendHSM";
import { getSbEventById } from "../../../sbEvent/getUtils";
import { getUserById } from "../../../User/Methods";

export const handleNewTeamMessage = async (
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
          const params = generateTeamParams(
            parentEvent.name,
            eventObj.name,
            author.name,
            author.userKey,
            eventObj.eventKey,
          );

          // await sendHSM(toAbhitegPhone, whatsappChannelId, "new_team", params);

          await sendHSM(toSauravPhone, whatsappChannelId, "new_team", params);

          await sendHSM(toSwapnilPhone, whatsappChannelId, "new_team", params);

          // to creator
          await sendHSM(author.phone, whatsappChannelId, "new_team", params);

          return true;
        }
      }
    }
  }

  return false;
};

const generateTeamParams = (
  parentName: string,
  teamName?: string,
  name?: string,
  userKey?: string,
  eventKey?: string,
): Param[] => {
  return [
    { default: name ? `*${name.trim()}*` : "there" },
    { default: parentName ? `${parentName.trim()}` : "game" },
    { default: teamName ? `*${teamName.trim()}*` : "Unnamed team" },
    {
      default: sbAppDL,
      // userKey && eventKey
      //   ? `*https://socialboat.live/${encodeURI(userKey)}/${encodeURI(
      //       eventKey,
      //     )}*`
      //   : "https://socialboat.live/teams",
    },
  ];
};
