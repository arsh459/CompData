import { CloudinaryMedia } from "../sbEvent/CloudinaryMedia";
import { sessionTypes } from "../sbEvent/sbEvent";
import { Post } from "./Post";
import { v4 as uuidv4 } from "uuid";
import { firestore } from "firebase-admin";

export const createNewPost = (
  communityId: string,
  eventId: string,
  creatorId: string,
  view: "public" | "private",
  cohortId?: string,
  creatorName?: string,
  creatorImg?: CloudinaryMedia,
  byAdmin?: boolean,
  score?: number,
  // sessionId?: string,
  sessionName?: string,
  initalSessionType?: sessionTypes,
  postContent?: "leaderboard",
  leaderboardEventId?: string,
): Post => {
  return {
    id: uuidv4(),
    text: "",
    media: [],
    updatedOn: Date.now(),

    communityId,
    eventId,
    creatorId,
    ...(cohortId ? { cohortId: cohortId } : {}),
    ...(initalSessionType ? { sessionType: initalSessionType } : {}),
    ...(creatorName ? { creatorName: creatorName } : {}),
    ...(creatorImg ? { creatorImg: creatorImg } : {}),
    ...(score ? { score: score } : { score: 0 }),
    ...(byAdmin ? { byAdmin: byAdmin } : {}),
    ...(sessionName ? { sessionName: sessionName } : {}),
    ...(postContent ? { postContent } : {}),
    ...(leaderboardEventId ? { leaderboardEventId } : {}),
    view,
  };
};

export const saveNewPostV2 = async (
  ref: firestore.DocumentReference,
  newPost: Post,
) => {
  await ref.set(newPost);
};
