import { firestore } from "firebase-admin";
import { createNewPost, saveNewPostV2 } from "../../../models/Post/createUtils";
import { getChildEvents } from "../../../models/sbEvent/getUtils";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
import { getUserById } from "../../../models/User/Methods";

export const handleChallengeEnd = async (
  now: sbEventInterface,
  prev: sbEventInterface,
) => {
  if (
    now.state === "finished" &&
    prev.state !== "finished" &&
    now.eventType === "challenge" &&
    !now.parentId
  ) {
    const childEvents = await getChildEvents(now.id);

    for (const childEvent of childEvents) {
      const host = await getUserById(childEvent.ownerUID);
      const newPost = createNewPost(
        childEvent.ownerUID,
        childEvent.id,
        childEvent.ownerUID,
        "public",
        undefined,
        host?.name,
        host?.profileImage,
        true,
        undefined,
        undefined,
        "post",
        "leaderboard",
        now.id,
      );

      await saveNewPostV2(
        firestore()
          .collection("sbEvents")
          .doc(childEvent.id)
          .collection("postsV2")
          .doc(newPost.id),
        newPost,
      );
    }
  }
};
