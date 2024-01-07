import { Param, sendHSM } from "../../../models/Conversations/sendHSM";
import {
  getChildEvents,
  getSbEventsInList,
} from "../../../models/sbEvent/getUtils";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
import { getUsersForEvent } from "../../../models/User/Methods";
import { whatsappChannelId } from "../../Https/messagebird/constants/identifiers";

const activeChallenges = ["f220bbb1-a8a1-4c29-83ef-21bc0b1b123a"];

export const handlePrizeNotif = async () => {
  // get all activie challenges
  const sbEvents = await getSbEventsInList(activeChallenges);
  //   const after = new Date("Mon Nov 29 2021").getTime();

  for (const parentEvent of sbEvents) {
    await handlePrize(parentEvent);
    // await handleMorningNotificationForEvent(parentEvent, after, reminderTime);
  }
};

const handlePrize = async (event: sbEventInterface) => {
  // get child events
  const childEvents = await getChildEvents(event.id);

  const usersSent: { [uid: string]: boolean } = {};
  for (const child of childEvents) {
    const allMembers = await getUsersForEvent(child.id);
    for (const member of allMembers) {
      const params: Param[] = [
        {
          default: `${member.name ? `${member.name.trim()}` : "there"}`,
        },
        {
          default: `${
            event.name ? `*${event.name.trim()}*` : "fitness challenge"
          }`,
        },
        {
          default: `*8pm*`,
        },
        {
          default: `https://www.instagram.com/socialboat.live/?hl=en`,
        },
        {
          default: `SocialBoat`,
        },
      ];

      if (!member.unsubscribe && member.phone && !usersSent[member.uid]) {
        try {
          await sendHSM(
            member.phone,
            whatsappChannelId,
            "prize_ceramony",
            params,
          );
          usersSent[member.uid] = true;
        } catch (error) {
          console.log("error in sending", member.name);
        }
      }
    }
  }
};
