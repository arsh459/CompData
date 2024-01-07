import {
  // toAbhiteg,
  // toAbhitegPhone,
  // toSaurav,
  toSauravPhone,
  // toSwapnil,
  toSwapnilPhone,
} from "../../../constants/email/contacts";
import {
  handleHostUpdateOnWelcome,
  handleTeamLeaderWelcome,
} from "../../../main/FirestoreTriggers/onPaymentCreate/handleHostUpdateOnSignup";
import { handleUserWelcome } from "../../../main/FirestoreTriggers/onPaymentCreate/handleWelcomeMessage";
import { getSbEventById } from "../../sbEvent/getUtils";
import { getUserById } from "../../User/Methods";
import { canMessageGo } from "./messageState";
import { getExplainerVideo } from "./newTeam/handleNewTeamInvite";

export const welcomeMessageToEvent = async (
  eventId: string,
  userId: string,
) => {
  const user = await getUserById(userId);

  if (user) {
    const eventObj = await getSbEventById(eventId);

    if (eventObj) {
      const leader = await getUserById(eventObj.ownerUID);

      const parentObj = await getSbEventById(
        eventObj.parentId ? eventObj.parentId : "",
      );

      const explainer = getExplainerVideo(parentObj?.id);

      if (user.phone && canMessageGo(user)) {
        try {
          await handleUserWelcome(
            user.phone,
            explainer,
            user.name,
            leader?.name,
            eventObj.name,
            leader?.userKey,
            eventObj?.eventKey,
          );
        } catch (error) {
          console.log("error in user phone");
        }
      }

      if (leader?.phone && leader?.userKey && eventObj.eventKey) {
        try {
          // creator update
          await handleTeamLeaderWelcome(
            leader.phone,
            leader.userKey,
            eventObj.eventKey,
            leader.name,
            user.name,
          );
        } catch (error) {
          console.log("error in creator message");
        }
      }

      // user update
      await handleHostUpdateOnWelcome(
        toSwapnilPhone,
        leader?.userKey ? leader.userKey : "",
        eventObj.eventKey ? eventObj.eventKey : "",
        leader?.name,
        user.name,
        user.phone ? user.phone : "",
        user.email ? user.email : "",
      );

      // user update
      // await handleHostUpdateOnWelcome(
      //   toAbhitegPhone,
      //   leader?.userKey ? leader.userKey : "",
      //   eventObj.eventKey ? eventObj.eventKey : "",
      //   leader?.name,
      //   user.name,
      //   user.phone ? user.phone : "",
      //   user.email ? user.email : "",
      // );

      // user update
      await handleHostUpdateOnWelcome(
        toSauravPhone,
        leader?.userKey ? leader.userKey : "",
        eventObj.eventKey ? eventObj.eventKey : "",
        leader?.name,
        user.name,
        user.phone ? user.phone : "",
        user.email ? user.email : "",
      );

      return true;
    }
  }

  return false;
};
