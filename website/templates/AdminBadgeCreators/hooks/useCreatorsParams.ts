import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface tasksQuery {
  gameId?: string;
  badgeId?: string;
}

export type taskQueryKeys = "gameId" | "badgeId";

export const useCreatorsParams = () => {
  const router = useRouter();
  const q = router.query as tasksQuery;

  const [gameId, setGameId] = useState<string>("");
  const [badgeId, setBadgeId] = useState<string>("");

  useEffect(() => {
    if (router.isReady) {
      setGameId(q.gameId ? q.gameId : "");
      setBadgeId(q.badgeId ? q.badgeId : "");
    }
  }, [router, q]);

  return {
    gameId,
    badgeId,
  };
};
