import { sbAppDL } from "../../../constants/email/contacts";
import { getParamsForReplyPost } from "../../../main/FirestoreTriggers/onPaymentCreate/handleWhatsappMessage";
// import { onReplyPost_email } from "../../../main/FirestoreTriggers/utils/sendgrid";
import { whatsappChannelId } from "../../../main/Https/messagebird/constants/identifiers";
import { sendHSM } from "../../Conversations/sendHSM";
import {
  getParentPost,
  getPostLevel1,
  getPostLevel2,
} from "../../Post/getUtils";
import { getSbEventById } from "../../sbEvent/getUtils";
import { getUserById } from "../../User/Methods";

const getPostAndReply = async (
  eventId: string,
  parentPostId: string,
  newPostId: string,
  childPostId?: string,
) => {
  if (childPostId) {
    const parentPost = await getPostLevel1(eventId, parentPostId, childPostId);
    // console.log("p", newPostId);
    const reply = await getPostLevel2(
      eventId,
      parentPostId,
      newPostId,
      childPostId,
    );

    return {
      parentPost,
      reply,
    };
  } else {
    const parentPost = await getParentPost(eventId, parentPostId);
    const reply = await getPostLevel1(eventId, parentPostId, newPostId);

    return {
      parentPost,
      reply,
    };
  }
};

export const postReplyMessage = async (
  eventId: string,
  parentPostId: string,
  newPostId: string,
  childPostId?: string,
) => {
  // console.log("eventId", eventId);
  // console.log("parentPostId", parentPostId);
  // console.log("newPostId", newPostId);
  // console.log("childPostId", childPostId);

  const { parentPost, reply } = await getPostAndReply(
    eventId,
    parentPostId,
    newPostId,
    childPostId,
  );

  // console.log("parentPost", parentPost?.creatorName);
  // console.log("reply", reply?.creatorName);

  if (parentPost && reply) {
    // author Team
    const eventObj = await getSbEventById(eventId);
    const gameId = eventObj?.parentId;

    // console.log("eventObj", eventObj?.name);

    if (eventObj && gameId) {
      const oldAuthor = await getUserById(parentPost.creatorId);
      const newAuthor = await getUserById(reply.creatorId);
      const host = await getUserById(eventObj.ownerUID);

      const participatingWith =
        oldAuthor?.participatingInGameWithTeam &&
        oldAuthor?.participatingInGameWithTeam[gameId];

      // console.log("oldAuthor", oldAuthor?.name);
      // console.log("newAuthor", newAuthor?.name);
      // console.log("host", host?.name);

      if (
        // oldAuthor?.name &&
        // newAuthor?.name &&
        // eventObj.name &&
        participatingWith &&
        host?.userKey &&
        oldAuthor?.phone &&
        eventObj.eventKey &&
        // oldAuthor.email &&
        !oldAuthor.unsubscribe
      ) {
        const teamLeaderUID = participatingWith.ownerUID;

        const captain = await getUserById(teamLeaderUID);
        const teamId = participatingWith.teamId;
        const coachTeam = await getSbEventById(teamId);

        // user update
        await handleReplyMessage(
          captain?.userKey ? captain?.userKey : "",
          oldAuthor?.name,
          newAuthor?.name,
          coachTeam?.name ? coachTeam?.name : "",
          host.name,
          // eventObj.id,
          parentPostId,
          oldAuthor.phone,
          // oldAuthor.email,
          coachTeam?.eventKey ? coachTeam?.eventKey : "",
        );

        return true;
      }
    }
  }

  return false;
};

const handleReplyMessage = async (
  leaderKey: string,
  repliedToName: string | undefined,
  authorName: string | undefined,
  eventName: string | undefined,
  creatorName: string | undefined,
  // eventId: string,
  parentPostId: string,
  repliedToPhone: string,
  // repliedToEmail: string | undefined,
  eventKey: string,
) => {
  const link = sbAppDL;

  // const link = `https://socialboat.live/${encodeURI(leaderKey)}/${encodeURI(
  //   eventKey,
  // )}?postId=${parentPostId}`;

  if (repliedToPhone) {
    const params = getParamsForReplyPost(
      repliedToName,
      authorName,
      eventName,
      link,
      creatorName,
    );

    // console.log("p", params);
    // throw new Error("ERROR");

    try {
      await sendHSM(repliedToPhone, whatsappChannelId, "post_reply", params);
    } catch (error) {
      console.log("error in post whatsapp message", error);
    }
  }

  // if (repliedToEmail) {
  //   try {
  //     await onReplyPost_email(
  //       repliedToEmail,
  //       repliedToName,
  //       authorName,
  //       creatorName,
  //       eventName,
  //       link,
  //     );
  //   } catch (error) {
  //     console.log("error in post email", error);
  //   }
  // }
};
