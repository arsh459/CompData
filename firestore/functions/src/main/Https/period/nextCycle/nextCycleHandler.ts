import { Cycle, PeriodDateObj } from "../../../../models/User/User";
import { getDateBucket } from "../../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
import { getFuturePeriodDates } from "../futureUtils";
import { ONE_DAY_MS } from "../getPeriodArray";

export const handleNextCycle = async (
  lastObj: PeriodDateObj,
  tzString: string,
  cycle: Cycle,
) => {
  const startUnix = lastObj.unix + ONE_DAY_MS;
  const date = getDateBucket(tzString, startUnix);

  const lastPeriodLength =
    cycle.phaseSplits.PERIOD.length + cycle.phaseSplits.ESTIMATED_PERIOD.length;
  const lastCycleLength = cycle.length;

  const { futureCycles, futurePeriodDates } = getFuturePeriodDates(
    date,
    lastPeriodLength,
    lastCycleLength,
    1,
    tzString,
    {},
  );

  return {
    futureCycles,
    futurePeriodDates,
  };
};
