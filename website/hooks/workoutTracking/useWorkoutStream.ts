import { WorkoutActivity } from "@models/Workouts/WorkoutActivity";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";

export const useWorkoutStream = (
  // user?: UserInterface,
  seriesId?: string,
  videoId?: string,
  uid?: string,
  type?: "workout" | "nutrition" | "live"
) => {
  const [userStream, setUserStream] = useState<WorkoutActivity>();
  const [loading, setLoading] = useState<boolean>(true);
  // efernce
  useEffect(() => {
    if (seriesId && videoId && uid) {
      const now = new Date();

      const seriesRef = doc(db, "workouts", seriesId);
      const videoRef = doc(
        seriesRef,
        type === "workout"
          ? "exercises"
          : type === "nutrition"
          ? "nutrition"
          : "lives",
        videoId
      );
      const q = query(
        collection(videoRef, "streams"),
        where(
          "date",
          "==",
          `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
        ),
        where("uid", "==", uid)
      );

      const unsubscribe = onSnapshot(q, (docs) => {
        if (docs.docs.length > 0) {
          const remote = docs.docs[0].data() as WorkoutActivity;
          setUserStream(remote);
        }
        setLoading(false);
      });

      return () => {
        unsubscribe();
        setLoading(false);
      };
    }
  }, [seriesId, videoId, uid, type]);

  return {
    userStream,
    loading,

    // setUserStream,
    setLoading,
  };
};

/**
if (streaming)
onProgress -> increment seconds + 1

onPause -> paused


 */
