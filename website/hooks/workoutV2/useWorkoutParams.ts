import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface tasksQuery {
  eventKey?: string;
  id?: string;
}

export type taskQueryKeys = "eventKey" | "leaderKey" | "id";

export const useTaskParams = () => {
  const router = useRouter();
  const q = router.query as tasksQuery;

  // const [eventKey, setEventKey] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    if (router.isReady) {
      // setEventKey(q.eventKey ? q.eventKey : "");
      setId(q.id ? q.id : "");
    }
  }, [router, q]);

  return {
    id,
    // eventKey,
  };
};
