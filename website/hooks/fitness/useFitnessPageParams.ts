import { useAuth } from "@hooks/auth/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface fitnessPageQuery {
  uid?: string;
  state?: "success" | "fail";
  leaderKey?: string;
  eventKey?: string;
  workout?: string;
}

export const useFitnessPageParams = () => {
  const router = useRouter();
  const q = router.query as fitnessPageQuery;

  const [loading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { user } = useAuth();

  // console.log("q", q);

  useEffect(() => {
    if (router.isReady) {
      if (
        q.state === "success" &&
        q.leaderKey &&
        q.eventKey &&
        q.workout === "TRUE" &&
        user?.terraUser?.user_id
      ) {
        setTimeout(
          () =>
            router.push(
              `https://socialboat.live/${q.leaderKey}/${q.eventKey}/workout`
            ),
          200
        );
      } else if (
        q.state === "success" &&
        q.leaderKey &&
        q.eventKey &&
        q.workout === "FALSE" &&
        user?.terraUser?.user_id
      ) {
        setTimeout(
          () =>
            router.push(`https://socialboat.live/${q.leaderKey}/${q.eventKey}`),
          200
        );
      } else if (
        q.state === "success" &&
        q.leaderKey &&
        user?.terraUser?.user_id
      ) {
        setTimeout(
          () => router.push(`https://${q.leaderKey}.socialboat.live`),
          200
        );
      } else if (
        q.state === "success" &&
        !q.leaderKey &&
        user?.terraUser?.user_id
      ) {
        setTimeout(() => router.push(`https://socialboat.live/workoutV2`), 200);
      } else if (q.state === "fail" && q.leaderKey) {
        setError("The integration failed. Please try again soon.");
        const ldr = q.leaderKey.split("?")[0];

        console.log("ldr", ldr);

        console.log(`https://${q.leaderKey}.socialboat.live`);
        setTimeout(() => router.push(`https://${ldr}.socialboat.live`), 200);
      }
    }
  }, [
    router,
    q.uid,
    q.state,
    q.leaderKey,
    q.workout,
    q.eventKey,
    user?.terraUser?.user_id,
  ]);

  return {
    loading,
    error,
  };
};
