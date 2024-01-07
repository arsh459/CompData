import { updateMotivator, updateOrigin } from "@models/User/createUtils";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useOrgDetails = (uid?: string) => {
  const router = useRouter();

  // const q = router.query as { org?: string };
  const q = router.query as {
    origin?: string | string[];
    coach?: string;
    utm_source?: string;
  };

  useEffect(() => {
    // console.log("Hi I am here");
    const updateUserReferrer = async () => {
      uid &&
        updateOrigin(
          uid,
          q.origin && typeof q.origin === "string" ? q.origin : ""
        );

      uid &&
        q.coach &&
        updateMotivator(uid, q.coach, q.utm_source ? q.utm_source : "");
    };

    if (router.isReady) {
      // console.log("here");
      updateUserReferrer();
    }
  }, [uid, q.origin, q.coach, router.isReady, q.utm_source]);
};
