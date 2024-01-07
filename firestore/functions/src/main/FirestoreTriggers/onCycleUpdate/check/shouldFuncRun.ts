import { Cycle } from "../../../../models/User/User";
import { allPhases } from "../../../Https/period/utils";

export const shouldFuncRun = (nowCycle: Cycle, prevCycle: Cycle): boolean => {
  if (
    nowCycle.startDate !== prevCycle.startDate ||
    nowCycle.endDate !== prevCycle.endDate
  ) {
    return true;
  }

  for (const phase of allPhases) {
    if (
      nowCycle.phaseSplits[phase].length !== prevCycle.phaseSplits[phase].length
    ) {
      return true;
    }
  }

  return false;
};
