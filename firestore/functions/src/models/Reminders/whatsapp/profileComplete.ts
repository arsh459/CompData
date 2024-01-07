import { whatsappChannelId } from "../../../main/Https/messagebird/constants/identifiers";
import { Param, sendHSM } from "../../Conversations/sendHSM";
import { getSbEventById } from "../../sbEvent/getUtils";
import { getUserById } from "../../User/Methods";
import { UserInterface } from "../../User/User";

export const profileCompleteMessage = async (uid: string, eventId: string) => {
  const user = await getUserById(uid);

  if (user) {
    if (isProfileComplete(user)) {
      return true;
    }
    const eventObj = await getSbEventById(eventId);

    if (eventObj) {
      const leader = await getUserById(eventObj.ownerUID);

      if (user.name && user.phone && leader?.name) {
        await sendHSM(
          user.phone,
          whatsappChannelId,
          "profile_complete",
          getParamsForLeader(user.name, leader.name),
        );

        return true;
      }
    }
  }

  return false;
};

const isProfileComplete = (user: UserInterface) => {
  if (
    user.name &&
    user.profileImage &&
    user.height &&
    user.weight &&
    user.fitnessGoals &&
    Object.keys(user.fitnessGoals).length > 0
  ) {
    return true;
  }

  return false;
};

const getParamsForLeader = (userName: string, coachName: string): Param[] => {
  return [
    {
      default: userName ? `${userName.trim()}` : "there",
    },
    {
      default: coachName ? `*${coachName.trim()}*` : "*Coach*",
    },
    {
      default: coachName ? `${coachName.trim()}` : "SocialBoat",
    },
  ];
};
