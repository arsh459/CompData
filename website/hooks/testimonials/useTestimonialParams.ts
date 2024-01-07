import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface testimonialQuery {
  eventKey?: string;
  id?: string;
}

export type testimonialQueryKeys = "eventKey" | "leaderKey" | "id";

export const useTestimonialParams = () => {
  const router = useRouter();
  const q = router.query as testimonialQuery;

  const [eventKey, setEventKey] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    if (router.isReady) {
      if (q.id === "new") {
        setId("");
      } else {
        setEventKey(q.eventKey ? q.eventKey : "");
        setId(q.id ? q.id : "");
      }
    }
  }, [router, q]);

  return {
    id,
    eventKey,
  };
};
