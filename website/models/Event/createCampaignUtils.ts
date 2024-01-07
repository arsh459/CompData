import { CampaignPost } from "./Campaign";
import { v4 as uuidv4 } from "uuid";
import { db } from "config/firebase";
import { setDoc, doc, deleteDoc } from "firebase/firestore";

export const createCampaignPost = (
  eventId: string,
  creatorId: string
): CampaignPost => {
  return {
    id: uuidv4(),
    media: [],
    mediaStyle: "post",
    caption: "",
    tags: "",
    hashtags: "",
    eventId,
    creatorId,
  };
};

export const saveCampaignPost = async (
  campaignPost: CampaignPost,
  eventId: string
) => {
  const ref = doc(doc(db, "sbEvents", eventId), "campaign", campaignPost.id);

  await setDoc(ref, campaignPost);
};

export const deleteCampaignPost = async (postId: string, eventId: string) => {
  const ref = doc(doc(db, "sbEvents", eventId), "campaign", postId);

  await deleteDoc(ref);
};
