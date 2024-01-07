import {
  adminDashboardQuery,
  adminDashboardQueryKeys,
} from "@hooks/dashboard/useAdminDashboard";
import { getGameNameReadable } from "@templates/TaskTemplate/utils";
import { format } from "date-fns";

export const filters: {
  id: adminDashboardQueryKeys;
}[] = [
  { id: "game" },
  { id: "team" },
  { id: "dS" },
  { id: "agent" },
  { id: "state" },
  { id: "player" },
  { id: "round" },
  { id: "season" },
  { id: "taskId" },
];

const parseDatesForFilter = (dS?: string, dE?: string): string => {
  if (dS && dE) {
    const dSUnix = parseInt(dS);
    const dEUnix = parseInt(dE);

    return `${format(new Date(dSUnix), "dd MMM")} - ${format(
      new Date(dEUnix),
      "dd MMM"
    )}`;
  } else if (dS) {
    const dSUnix = parseInt(dS);
    // const dEUnix = parseInt(dE);

    return `${format(new Date(dSUnix), "dd MMM")}`;
  }

  return "Select Dates";
};

export const getFilterName = (
  id: adminDashboardQueryKeys,
  values: adminDashboardQuery
): string => {
  if (id === "game") {
    const gName = getGameNameReadable(values.game);
    return gName ? gName : "Select Game";
  } else if (id === "team") {
    return values.teamName ? values.teamName : "All Team";
  } else if (id === "dS" || id === "dE") {
    return parseDatesForFilter(values.dS, values.dE);
  } else if (id === "agent") {
    return values.agentName ? values.agentName : "All Judges";
  } else if (id === "player") {
    return values.playerName ? values.playerName : "All Players";
  } else if (id === "round") {
    return values.round ? values.round : "All Rounds";
  } else if (id === "season") {
    return values.season ? values.season : "All Seasons";
  } else if (id === "state") {
    return values.state ? values.state : "All states";
  } else if (id === "taskId") {
    return values.taskName ? values.taskName : "All Tasks";
  }

  return "";
};

export const getFilterState = (
  id: adminDashboardQueryKeys,
  values: adminDashboardQuery
): boolean => {
  if (id !== "dS" && id !== "dE" && values[id]) {
    return true;
  } else if ((id === "dS" || id === "dE") && (values.dS || values.dE)) {
    return true;
  }

  return false;
};
