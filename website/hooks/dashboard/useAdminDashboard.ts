// import { RUNNER_GAME } from "@constants/gameStats";
import { getQueryParamsForAdminDashboard } from "@hooks/drawer/utils";
import { reviewStatus } from "@models/Activities/Activity";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface adminDashboardQuery {
  game?: string;
  team?: string;
  dS?: string;
  dE?: string;
  agent?: string | "ALL";
  state?: reviewStatus | "ALL";
  player?: string;
  round?: string;
  season?: string;
  taskId?: string;

  teamName?: string;
  agentName?: string;
  playerName?: string;
  taskName?: string;
  page?: string;
  onlyPositive?: string;
}

export type adminDashboardQueryKeys =
  | "game"
  | "team"
  | "dS"
  | "dE"
  | "agent"
  | "state"
  | "player"
  | "round"
  | "season"
  | "teamName"
  | "agentName"
  | "playerName"
  | "taskName"
  | "taskId";

export const useAdminDashboard = () => {
  const [urlState, setURLState] = useState<adminDashboardQuery>();

  const router = useRouter();
  const q = router.query as adminDashboardQuery;

  useEffect(() => {
    if (router.isReady) {
      setURLState(q);
    }
  }, [router.isReady, q]);

  const onPageChange = (newPage: number) => {
    q.page = `${newPage}`;
    router.push(getQueryParamsForAdminDashboard(q), undefined, {
      shallow: true,
    });
  };

  const onClearFilter = (type: adminDashboardQueryKeys | "NOT_VISIBLE") => {
    if (type === "agent") {
      q.agent = "";
      q.agentName = "";
    } else if (type === "dS" || type === "dE") {
      q.dS = "";
      q.dE = "";
    } else if (type === "player") {
      q.player = "";
      q.playerName = "";
    } else if (type === "round") {
      q.round = "";
    } else if (type === "season") {
      q.season = "";
    } else if (type === "game") {
      q.game = "";
    } else if (type === "team") {
      q.team = "";
      q.teamName = "";
    } else if (type === "taskId") {
      q.taskId = "";
      q.taskName = "";
    } else if (type === "state") {
      delete q.state;
    }

    router.push(getQueryParamsForAdminDashboard(q), undefined, {
      shallow: true,
    });
  };

  return {
    urlState,
    onPageChange,
    onClearFilter,
  };
};
