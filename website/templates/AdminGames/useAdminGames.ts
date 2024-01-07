import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface adminGamesQuery {
  gameId?: string;
}

export type adminGamesQueryKeys = "gameId";

export const useAdminGames = () => {
  const [urlState, setURLState] = useState<adminGamesQuery>();

  const router = useRouter();
  const q = router.query as adminGamesQuery;

  useEffect(() => {
    if (router.isReady) {
      setURLState(q);
    }
  }, [router.isReady, q]);

  const onQueryChange = (gameId: string) => {
    q.gameId = gameId;
    const querry = Object.keys(q).map((key) => key + "=" + q[key as adminGamesQueryKeys]).join("&");
    router.push(`?${querry}`, undefined, { shallow: true });
  };

  const onGoBack = () => {
    router.back();
  };

  return {
    urlState,
    onQueryChange,
    onGoBack,
  };
};
