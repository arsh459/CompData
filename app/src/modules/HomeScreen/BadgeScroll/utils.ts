import { GameKPITarget } from "@models/Event/Event";
// import { GoalKPIList } from "@utils/goalprogram/utils";

export const getIndependedKPI = (goalKPIs?: GameKPITarget[]) => {
  if (goalKPIs) {
    let fpTarget: number = 0;
    // let streakTarget: number = 0;
    for (const goalKPI of goalKPIs) {
      // if (goalKPI.kpi === "streak") {
      //   streakTarget = goalKPI.targetValue;
      // }

      if (goalKPI.kpi === "fit_points") {
        fpTarget = goalKPI.targetValue;
      }
    }

    return { fpStr: `Get ${fpTarget}FP to Unlock`, fpTarget: fpTarget };

    // return `${fpTarget}FPs and ${streakTarget}D streak`;
  }

  return { fpStr: "", ftTarget: 0 };
};

export const getBadgeProgress = (fpTarget?: number, fpEarnt?: number) => {
  if (fpTarget && fpEarnt) {
    return Math.round((fpEarnt / fpTarget) * 100);
  }

  return 0;
};

export const getEndingIn = (
  currentRoundId?: string,
  roundEndUnix?: number,
  rounds?: string[]
) => {
  const now = Date.now();
  const currentRound =
    currentRoundId && rounds?.includes(currentRoundId) ? true : false;
  if (roundEndUnix) {
    const msLeft = roundEndUnix - now;

    if (msLeft > 24 * 60 * 60 * 1000) {
      const days = Math.floor(msLeft / (24 * 60 * 60 * 1000));
      const hours = Math.round(
        (msLeft - days * 24 * 60 * 60 * 1000) / (1000 * 60 * 60)
      );

      return {
        timeStr: `${days}D ${hours}H`,
        label: currentRound ? "Ending in" : "Starting in",
      };
    } else {
      const hours = Math.floor(msLeft / (60 * 60 * 1000));
      const minutes = Math.round(
        (msLeft - hours * 60 * 60 * 1000) / (1000 * 60)
      );

      return {
        timeStr: `${hours}H ${minutes}M`,
        label: currentRound ? "Ending in" : "Starting in",
      };
    }
  } else {
    return {
      timeStr: "",
      label: "",
    };
  }
};
