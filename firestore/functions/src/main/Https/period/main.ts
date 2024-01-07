import {
  getUserById,
  getUserCycles,
  getUserPeriodDates,
} from "../../../models/User/Methods";
import { getUserTimezone } from "../taskGenerator/generateReminders";
import {
  findNumberOfFutureCycles,
  getFuturePeriodDates,
  mergePastAndFuture,
} from "./futureUtils";
import { handleCycleResponse } from "./getPeriodArray";
import { savePeriodData } from "./saveUtils";
import { filterOutFutureDates, groupConsecutiveDateStrings } from "./utils";

export const mainPeriodHandler = async (
  uid: string,
  newPeriodDates: string[],
  deleteOld: boolean,
) => {
  const user = await getUserById(uid);

  console.log("user", user?.name);

  if (user?.uid) {
    const tzString = getUserTimezone(
      user.recommendationConfig?.timezone?.tzString,
    );

    console.log("tzString", tzString);

    // if period dates exist
    if (newPeriodDates.length) {
      // find only period dates

      console.log("newPeriodDates", newPeriodDates);

      const onlyPastOrPresentDates = filterOutFutureDates(
        newPeriodDates,
        tzString,
      );

      console.log("onlyPastOrPresentDates", onlyPastOrPresentDates);

      const sortedResponse = groupConsecutiveDateStrings(
        onlyPastOrPresentDates,
      );

      console.log("sortedResponse", sortedResponse);

      const { pastUserCycles, currentUserCycle } = await getUserCycles(uid);

      const {
        cyclesToSave,
        periodObjsToSave,
        // cyclesToDelete,
        needsFuture,
        lastCycleLength,
        lastPeriodLength,
      } = await handleCycleResponse(
        sortedResponse,
        tzString,
        pastUserCycles,
        deleteOld,
        user.periodTrackerObj?.inputCycleLength,
        user.periodTrackerObj?.inputPeriodLength,
        currentUserCycle,
      );

      // console.log("cyclesToSave", cyclesToSave.length);
      // console.log("cyclesToDelete", cyclesToDelete.length);

      // console.log("cyclesToSave", cyclesToSave.length);
      // console.log("periodObjsToSave", periodObjsToSave.length);

      // is there a need for future cycles
      const { numberOfCycles, date } = findNumberOfFutureCycles(
        periodObjsToSave,
        needsFuture,
        lastCycleLength,
        tzString,
      );

      console.log("Future cycles", numberOfCycles);
      console.log("Last date", date);

      const { futureCycles, futurePeriodDates } = getFuturePeriodDates(
        date,
        lastPeriodLength,
        lastCycleLength,
        numberOfCycles,
        tzString,
        pastUserCycles,
      );

      const { finalCycles, cyclesToDelete, finalPeriodDates } =
        mergePastAndFuture(
          pastUserCycles,
          cyclesToSave,
          periodObjsToSave,
          futureCycles,
          futurePeriodDates,
        );

      console.log("finalPeriodDates", finalPeriodDates.length);
      console.log("final cycles", Object.keys(finalCycles).length);
      console.log("Cycles delete", Object.keys(cyclesToDelete).length);

      // throw new Error("PAUSED");

      const { cycleDateMap, allCycleDates } = await getUserPeriodDates(
        user?.uid,
      );

      await savePeriodData(
        uid,
        finalCycles,
        finalPeriodDates,
        cycleDateMap,
        allCycleDates,
        cyclesToDelete,
        deleteOld,
      );

      console.log("SAVED");
    }
  }

  // save relevant information in db
};

/**
 * periodDates
 * // createPeriodDates
 *
 * // changePeriodDates
 *
 * // refreshPeriodDates
 *
 * // nextMonth
 *
 *
 */
