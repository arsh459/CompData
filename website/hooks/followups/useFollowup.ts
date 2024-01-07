import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { followupAgent, userFollowup } from "@models/User/User";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { format } from "date-fns";

export const useFollowup = (uid?: string, id?: string) => {
  const [followup, setFollowup] = useState<userFollowup>();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleSinglefollowup = async () => {
      if (uid && id) {
        setLoading(true);

        const remoteDoc = await getDoc(
          doc(doc(db, "users", uid), "followups", id)
        );
        if (remoteDoc.data()) {
          setFollowup(remoteDoc.data() as userFollowup);
        } else {
          setFollowup({
            id: uuidv4(),
            createdOn: Date.now(),
            followupAgent: "saurav",
            notes: "",
            followupDate: "",
            followupTime: Date.now(),
          });
        }
      }
    };

    handleSinglefollowup();
  }, [uid, id]);

  const onUpdateFollowupDate = (followupDate: Date | null) => {
    setFollowup((p) => {
      if (p && followupDate) {
        return {
          ...p,
          followupDate: format(new Date(followupDate), "yyyy-MM-dd"),
          followupTime: new Date(followupDate).getTime(),
        };
      }
    });
  };

  const onUpdateFollowupNotes = (notes: string) => {
    setFollowup((p) => {
      if (p) {
        return {
          ...p,
          notes,
        };
      }
    });
  };

  const onUpdateFollowupAgent = (agent: followupAgent) => {
    setFollowup((p) => {
      if (p) {
        return {
          ...p,
          followupAgent: agent,
        };
      }
    });
  };

  const onUpdateFollowupType = (type: "diet" | "habit") => {
    setFollowup((p) => {
      if (p) {
        return {
          ...p,
          type: type,
        };
      }
    });
  };

  const router = useRouter();
  const onSave = async () => {
    if (uid && followup?.id) {
      await setDoc(
        doc(doc(db, "users", uid), "followups", followup?.id),
        followup
      );

      router.back();
    }
  };

  return {
    followup,
    loading,
    onUpdateFollowupDate,
    onUpdateFollowupAgent,
    onUpdateFollowupNotes,
    onSave,
    onUpdateFollowupType,
  };
};
