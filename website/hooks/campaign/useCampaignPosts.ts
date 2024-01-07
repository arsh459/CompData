import { CampaignPost } from "@models/Event/Campaign";
import { db } from "config/firebase";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useCampaignPosts = (eventId?: string) => {
  const [campaingPosts, setCampaignPosts] = useState<CampaignPost[]>([]);

  useEffect(() => {
    if (eventId) {
      const ref = collection(doc(db, "sbEvents", eventId), "campaign");
      const listener = onSnapshot(ref, (docs) => {
        const remotePosts: CampaignPost[] = [];
        if (docs.docs.length > 0) {
          for (const remotePost of docs.docs) {
            remotePosts.push(remotePost.data() as CampaignPost);
          }
        }

        setCampaignPosts(remotePosts);

        return () => {
          if (listener) {
            listener();
          }
        };
      });
    }
  }, [eventId]);

  return {
    campaingPosts,
  };
};
