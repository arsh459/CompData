import {
  CHALLENGE_ONE,
  FAT_BURNER_CHALLENGE,
  FAT_BURNER_GAME,
  WFH_CHALLENGE,
} from "../../../constants/challenge";
import { getAllPosts } from "../../../models/Post/getUtils";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
// import { updateOne } from "../../../utils/firestore/fetchOne";
// import * as admin from "firebase-admin";
import { format } from "date-fns";

export const seedParentPostId = async (after?: number) => {
  const remPosts = await getAllPosts(after);

  const baseEvents: { [eventId: string]: sbEventInterface } = {};
  //   const parentEvents: { [eventId: string]: sbEventInterface } = {};

  let i: number = 0;
  for (const post of remPosts) {
    if (post.post.eventId && !baseEvents[post.post.eventId]) {
      const baseEvent = await getSbEventById(post.post.eventId);
      if (baseEvent) baseEvents[baseEvent.id] = baseEvent;
    }

    const postedIn = post.post.eventId
      ? baseEvents[post.post.eventId]
      : undefined;

    if (postedIn) {
      let parentId: string = "";
      if (postedIn.parentId) {
        parentId = postedIn.parentId;
      } else if (
        !postedIn.parentId &&
        (post.post.eventId === CHALLENGE_ONE ||
          post.post.eventId === WFH_CHALLENGE ||
          post.post.eventId === FAT_BURNER_CHALLENGE ||
          post.post.eventId === FAT_BURNER_GAME)
      ) {
        parentId = post.post.eventId;
      }

      if (parentId) {
        console.log(
          i,
          parentId,
          post.post.text,
          format(new Date(post.post.updatedOn), "MMM Do yyyy h:mma"),
        );
        await post.ref.update({
          gameId: parentId,
          teamName: postedIn.name ? postedIn.name : "",
        });
      }
    }

    i++;
  }
};
