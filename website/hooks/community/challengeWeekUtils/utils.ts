import { dateObject } from "@hooks/tasks/program/useProgramTasks";
import { RoundObject, SprintObject } from "@models/Event/Event";
import { addDays, format } from "date-fns";

// unixStart
// unixEnd
// 24*60*60*1000
// dayPointObj

export const getCurrentWeekV3 = (
  rounds?: RoundObject[],
  after?: number,
  challengeLength?: number
) => {
  if (after && rounds) {
    const { currentTimeToUse } = timeToUseForNow(after, challengeLength);
    // console.log("sp", sprints);

    const days = Math.floor((currentTimeToUse - after) / (24 * 60 * 60 * 1000));

    // console.log("days", days);
    // console.log("sprintLength", sprintLength);
    // console.log("after", after);
    // console.log("days", days, `month-${Math.floor(days / 28)}`);
    let roundStart: number = 0;
    // let roundEndUnix = after;
    let roundStartUnix = after;
    for (const round of rounds) {
      // sprint end
      let roundEnd: number = roundStart + round.length;
      const roundEndUnix = roundStartUnix + round.length * 24 * 60 * 60 * 1000;

      if (days >= roundStart && days < roundEnd) {
        // console.log("r", round.id);
        return {
          roundStartUnix,
          roundEndUnix,
          isFinale: round.isFinale,
          roundId: round.id,
        };
      }

      roundStart = roundEnd;
      roundStartUnix = roundEndUnix;
    }
  }

  return {
    roundStartUnix: undefined,
    roundEndUnix: undefined,
    isFinale: undefined,
    roundId: undefined,
  };
};
const getRangeDates = (
  startDate: number,
  endDate: number,
  sprintRounds: RoundObject[]
) => {
  // const days = differenceInDays(endDate, startDate);
  const now = format(new Date(), "yyyy-MM-dd");
  let nowObj: dateObject | undefined = undefined;

  let i: number = 0;
  const rangeList: dateObject[] = [];
  for (const round of sprintRounds) {
    const isRoundFinale = round.isFinale;
    const isRoundWarmup = round.isWarmup;
    // let dNumber: number = 0;
    for (let j: number = 0; j < round.length; j++) {
      // dayNumber
      // i += j;
      // dNumber += j;
      let curr: number;
      if (isRoundWarmup) {
        curr = -1;
      } else {
        curr = i + j;
      }
      // const

      const fDate = format(addDays(startDate, curr), "yyyy-MM-dd");
      const dt = new Date(fDate);
      const startUnix = new Date(
        dt.getFullYear(),
        dt.getMonth(),
        dt.getDate(),
        0,
        0,
        0,
        0
      ).getTime();

      // console.log("curr", curr);
      // console.log("fDate", fDate);
      // console.log("dt", dt);
      // console.log("startUnix", startUnix);

      const fMonth = format(dt, "LLLL yy");
      const dayName = format(dt, "E");

      // console.log("fMonth", fMonth);
      // console.log("dayName", dayName);
      // console.log("now", now);
      // console.log("");

      if (fDate === now) {
        nowObj = {
          dayNumber: curr,
          formattedDate: fDate,
          dayName,
          monthName: fMonth,
          startUnix: startUnix,
          isFinale: isRoundFinale ? isRoundFinale : false,
          isWarmup: isRoundWarmup ? isRoundWarmup : false,
        };
      }

      rangeList.push({
        dayNumber: curr,
        formattedDate: fDate,
        dayName,
        monthName: fMonth,
        startUnix: startUnix,
        isFinale: isRoundFinale ? isRoundFinale : false,
        isWarmup: isRoundWarmup ? isRoundWarmup : false,
      });
    }

    // console.log("r", round.length, round.name);

    if (!isRoundWarmup) i += round.length;
  }

  return {
    result: rangeList,
    nowObj,
  };

  // const result = [...Array.from(Array(days).keys())].map((i) => {
  //   // console.log(
  //   //   i,
  //   //   "to Be added in start Date",
  //   //   format(addDays(startDate, i), "d")
  //   // );

  //   const fDate = format(addDays(startDate, i), "yyyy-MM-dd");
  //   const dt = new Date(fDate);
  //   const startUnix = new Date(
  //     dt.getFullYear(),
  //     dt.getMonth(),
  //     dt.getDate(),
  //     0,
  //     0,
  //     0,
  //     0
  //   ).getTime();
  //   // console.log(format(parseISO(fDate), "E"), "FMONTH");
  //   const fMonth = format(dt, "LLLL yy");
  //   const dayName = format(dt, "E");

  //   if (fDate === now) {
  //     nowObj = {
  //       dayNumber: i,
  //       formattedDate: fDate,
  //       dayName,
  //       monthName: fMonth,
  //       startUnix: startUnix,
  //     };
  //   }

  //   return {
  //     dayNumber: i,
  //     formattedDate: fDate,
  //     dayName,
  //     monthName: fMonth,
  //     startUnix: startUnix,
  //   };
  // });
  // return { result, nowObj };
};
export const getCurrentMonthV3 = (
  sprints?: SprintObject[],
  after?: number,
  challengeLength?: number,
  rounds?: RoundObject[],
  timeToUse?: number,
  pinnedSprintId?: string
) => {
  // console.log("heree", after, sprints, rounds);
  if (after && sprints && rounds) {
    let currentTimeToUse: number = -1;
    if (timeToUse) {
      currentTimeToUse = timeToUse;
    } else {
      const tmp = timeToUseForNow(after, challengeLength);
      currentTimeToUse = tmp.currentTimeToUse;
    }

    // console.log("currentTimeToUse", new Date(currentTimeToUse));

    const days = Math.floor((currentTimeToUse - after) / (24 * 60 * 60 * 1000));

    // console.log("days", days);

    // console.log("d", days);
    // console.log(
    //   "after",
    //   after,
    //   "sprints",
    //   sprints,
    //   challengeLength,
    //   "challengeLength"
    // ); //challenge start
    // console.log("days", days, `month-${Math.floor(days / 28)}`, "rea");
    let sprintStart: number = 0;
    // let roundEndUnix = after;
    let sprintStartUnix = after;

    for (const sprint of sprints) {
      // sprint end
      let sprintEnd: number = sprintStart + sprint.length;
      const sprintEndUnix =
        sprintStartUnix + sprint.length * 24 * 60 * 60 * 1000;

      // console.log("s", sprint.id, pinnedSprintId);

      if (
        (days >= sprintStart && days < sprintEnd) ||
        (pinnedSprintId && pinnedSprintId === sprint.id)
      ) {
        const sprintRounds = rounds.filter(
          (item) => item.sprintId === sprint.id
        );

        const { result, nowObj } = getRangeDates(
          sprintStartUnix,
          sprintEndUnix,
          sprintRounds
        );
        return {
          sprintStartUnix,
          sprintEndUnix,
          rangeDate: result,
          nowObj,
          sprintId: sprint.id,
        };
      }

      sprintStart = sprintEnd;
      sprintStartUnix = sprintEndUnix;
    }

    if (sprints?.length) {
      const fallbackSprint = sprints[0];
      const lastSprintId = sprints[sprints.length - 1].id;
      const fallbackSprintId = fallbackSprint.id;
      const sprintRounds = rounds.filter(
        (item) => item.sprintId === fallbackSprintId
      );

      const fallbackSprintStart = after;
      const fallbackSprintEnd =
        after + fallbackSprint.length * 24 * 60 * 60 * 1000;

      const { result, nowObj } = getRangeDates(
        fallbackSprintStart,
        fallbackSprintEnd,
        sprintRounds
      );

      return {
        fallbackSprintStart,
        fallbackSprintEnd,
        rangeDate: result,
        nowObj,
        fallbackSprintId,
        defaultObj: result[0],
        lastSprintId,
      };
    }
  }

  return {
    StartUnix: undefined,
    sprintEndUnix: undefined,
    sprintId: undefined,
    rangeDate: undefined,
  };
};

export const getCurrentWeekStartV2 = (
  rounds?: RoundObject[],
  after?: number,
  challengeLength?: number
) => {
  if (after && rounds) {
    const { currentTimeToUse } = timeToUseForNow(after, challengeLength);
    // console.log("sp", sprints);

    const days = Math.floor((currentTimeToUse - after) / (24 * 60 * 60 * 1000));

    // console.log("days", days);
    // console.log("sprintLength", sprintLength);
    // console.log("after", after);
    // console.log("days", days, `month-${Math.floor(days / 28)}`);
    let roundStart: number = 0;
    for (const round of rounds) {
      // sprint end
      let roundEnd: number = roundStart + round.length;

      if (days >= roundStart && days < roundEnd) {
        return round.id;
      }
      roundStart = roundEnd;
    }
  }

  return `week-0`;
};

const getSprintDayRange = (sprints: SprintObject[], sprintId: string) => {
  let sprintStart: number = 0;
  for (const sprint of sprints) {
    // sprint end
    let sprintEnd: number = sprintStart + sprint.length;

    if (sprint.id === sprintId) {
      return {
        sprintStart,
        sprintEnd,
      };
    }
    sprintStart = sprintEnd;
  }

  return {
    sprintStart: -1,
    sprintEnd: -1,
  };
};

export const getCurrentRoundSprint = (
  sprints?: SprintObject[],
  rounds?: RoundObject[],
  starts?: number
) => {
  if (rounds && sprints && starts) {
    const now = Date.now();
    const days = Math.floor((now - starts) / (24 * 60 * 60 * 1000));

    if (days >= 0) {
      let roundStart: number = 0;
      for (const round of rounds) {
        // sprint end
        let roundEnd: number = roundStart + round.length;

        if (days >= roundStart && days < roundEnd) {
          const selectedRoundId = round.id;
          const selectedSprintId = round.sprintId;

          const { sprintStart, sprintEnd } = getSprintDayRange(
            sprints,
            selectedSprintId
          );

          if (sprintStart !== -1 && sprintEnd !== -1) {
            return {
              selectedRoundId,
              selectedSprintId,
              roundStart,
              roundEnd,
              sprintStart,
              sprintEnd,
              days,
            };
          }
        }
        roundStart = roundEnd;
      }
    } else {
      const selectedRoundId = rounds[0].id;
      const selectedSprintId = rounds[0].sprintId;

      const { sprintStart, sprintEnd } = getSprintDayRange(
        sprints,
        selectedSprintId
      );

      if (sprintStart !== -1 && sprintEnd !== -1) {
        return {
          selectedRoundId,
          selectedSprintId,
          roundStart: 0,
          roundEnd: rounds[0].length,
          sprintStart,
          sprintEnd,
          days,
        };
      }
    }
  }
};

export const getCurrentMonthForPurchase = (
  sprints?: SprintObject[],
  after?: number,
  challengeLength?: number,
  activeSprintId?: string
) => {
  if (after && sprints && !activeSprintId) {
    return getCurrentMonthV2(sprints, after, challengeLength);
  } else if (after && sprints) {
    const { currentTimeToUse } = timeToUseForNow(after, challengeLength);
    const days = Math.floor((currentTimeToUse - after) / (24 * 60 * 60 * 1000));

    let sprintStart: number = 0;
    let startUnix = after;
    // let sprintNumber: number = 0;
    // let selectedSprint: number = 0;
    for (const sprint of sprints) {
      // sprint end
      let sprintEnd: number = sprintStart + sprint.length;
      const sprintEndTime = startUnix + sprint.length * 24 * 60 * 60 * 1000;

      // console.log("days", days, sprint.id, sprintEnd);

      if (sprint.id === activeSprintId) {
        return {
          start: startUnix,
          end: sprintEndTime,
          id: sprint.id,
          sprint: sprint,
          currentSprintDay: days - sprintStart,
        };
      }

      startUnix = sprintEndTime;
      // sprintNumber++;
      sprintStart = sprintEnd;
    }
  }

  return {
    start: undefined,
    end: undefined,
    id: undefined,
    sprint: undefined,
    currentSprintDay: -1,
  };
};

export const getCurrentMonthV2 = (
  sprints?: SprintObject[],
  after?: number,
  challengeLength?: number
) => {
  if (after && sprints) {
    const { currentTimeToUse } = timeToUseForNow(after, challengeLength);
    // console.log("sp", sprints);

    const days = Math.floor((currentTimeToUse - after) / (24 * 60 * 60 * 1000));

    // console.log("days", days);
    // console.log("sprintLength", sprintLength);
    // console.log("after", after);
    // console.log("days", days, `month-${Math.floor(days / 28)}`);
    let sprintStart: number = 0;
    let startUnix = after;
    // let sprintNumber: number = 0;
    // let selectedSprint: number = 0;
    for (const sprint of sprints) {
      // sprint end
      let sprintEnd: number = sprintStart + sprint.length;
      const sprintEndTime = startUnix + sprint.length * 24 * 60 * 60 * 1000;

      if (days >= sprintStart && days < sprintEnd) {
        return {
          start: startUnix,
          end: sprintEndTime,
          id: sprint.id,
          sprint: sprint,
          currentSprintDay: days - sprintStart,
        };
      }

      startUnix = sprintEndTime;
      // sprintNumber++;
      sprintStart = sprintEnd;
    }
  }

  return {
    start: undefined,
    end: undefined,
    id: undefined,
    sprint: undefined,
    currentSprintDay: -1,
  };
};

export const getCurrentMonth = (
  sprints?: SprintObject[],
  after?: number,
  challengeLength?: number
) => {
  if (after && sprints) {
    const { currentTimeToUse } = timeToUseForNow(after, challengeLength);
    // console.log("sp", sprints);

    const days = Math.floor((currentTimeToUse - after) / (24 * 60 * 60 * 1000));

    // console.log("days", days);
    // console.log("sprintLength", sprintLength);
    // console.log("after", after);
    // console.log("days", days, `month-${Math.floor(days / 28)}`);
    let sprintStart: number = 0;
    // let sprintNumber: number = 0;
    // let selectedSprint: number = 0;
    let selectedSprintId: string = "month-0";
    for (const sprint of sprints) {
      // sprint end
      let sprintEnd: number = sprintStart + sprint.length;

      if (days >= sprintStart && days < sprintEnd) {
        selectedSprintId = sprint.id;
        break;
      }

      // sprintNumber++;
      sprintStart = sprintEnd;
    }

    return selectedSprintId;
  }

  return "month-0";
};

export const getDaysInChallenge = (after: number) => {
  const now = Date.now();
  const days = Math.floor((now - after) / (24 * 60 * 60 * 1000));

  if (days > 0) {
    return days;
  }

  return 0;
};

export const getRoundsInSprint = (
  sprintLength: number,
  roundLength: number
) => {
  return Math.floor(sprintLength / roundLength);
};

export const getCurrentWeek = (
  sprintLength: number,
  roundLength: number,
  after: number
) => {
  const days = getDaysInChallenge(after);

  // current sprint
  const currentSprint = Math.floor(days / sprintLength);
  const roundsInSprint = getRoundsInSprint(sprintLength, roundLength);

  // const absRounds = days/roundLength;

  // currentSprint start
  const currentSprintStart = currentSprint * sprintLength;

  // relative days
  const relativeDays = days - currentSprintStart;

  // relative week number
  const relativeWeekNumber = Math.floor(relativeDays / roundLength);
  const actualWeekNumber = relativeWeekNumber + roundsInSprint * currentSprint;

  const relativeDeltaSeconds =
    relativeWeekNumber * (roundLength * 24 * 60 * 60 * 1000);

  const totalDeltaSeconds =
    relativeDeltaSeconds + sprintLength * currentSprint * 24 * 60 * 60 * 1000;

  return {
    weekStartsUnix: after + totalDeltaSeconds,
    currentWeekNumber: actualWeekNumber,
    // currentWeekStart: after +
    // currentWeekNumber: relativeWeekNumber + roundsInSprint * currentSprint
  };

  // const inActiveDays: number[] = [];
  // for (let i:number= 0; i < days; i++){

  // }
};

export const timeToUseForNow = (
  challengeStarts: number,
  challengeLength?: number
) => {
  let endTime: number | undefined = undefined;
  const now = Date.now();
  if (challengeLength) {
    endTime = challengeStarts + 24 * 60 * 60 * 1000 * challengeLength;
  }

  return {
    now,
    endTime,
    currentTimeToUse: endTime && endTime < now ? endTime : now,
  };
};

/**
 * 
 * 
Game
- startUnix: timestamp 
- now: Date.now()

daysElapsed <- Math.round(now - startUnix / 24 * 60 * 60 * 1000)

sprintStart - D0
sprintEnd - D30
now - 15 - D15






- sprints: {} sprintObject {} - length of each sprint
- rounds: {}



 * 
 * 
 * 
 * 
 */
