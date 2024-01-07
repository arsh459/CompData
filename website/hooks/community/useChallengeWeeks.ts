import { RoundObject, SprintObject } from "@models/Event/Event";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { timeToUseForNow } from "./challengeWeekUtils/utils";

export interface monthStateInterface {
  key: string;
  value: string;
  label: string;
}

export interface weekStateInterface {
  key: string;
  value: string;
  month: string;
  label: string;
}

export const useChallengeWeeks = (
  sprints: SprintObject[],
  rounds: RoundObject[],
  challengeStarts?: number,
  challengeLength?: number
) => {
  const [weekStrings, setWeekStrings] = useState<weekStateInterface[]>([]);
  const [monthStrings, setMonthStrings] = useState<monthStateInterface[]>([]);
  const [weekString, setWeekString] = useState<string>("");
  const [monthString, setMonthString] = useState<string>("");

  useEffect(() => {
    const firstCall = () => {
      if (challengeStarts) {
        const { currentTimeToUse } = timeToUseForNow(
          challengeStarts,
          challengeLength
        );

        const days = Math.floor(
          (currentTimeToUse - challengeStarts) / (24 * 60 * 60 * 1000)
        );

        const weekArray: weekStateInterface[] = [];
        // let wk: number = 0;
        let currentWeek: string = "";
        let weekStart: number = 0;
        let weekStartUnix: number = challengeStarts;
        let startDateWeek: string = "";
        for (let wk: number = 0; wk < rounds.length; wk++) {
          const monthForWeek = rounds[wk].sprintId;

          const weekEndUnix =
            weekStartUnix + rounds[wk].length * 24 * 60 * 60 * 1000;

          startDateWeek = format(new Date(weekStartUnix), "dMMM");
          const endDate = format(new Date(weekEndUnix), "dMMM h:mmaaa");

          if (days >= weekStart) {
            weekArray.push({
              key: rounds[wk].id,
              // value: rounds[wk].name,
              value: `${startDateWeek} - ${endDate}`,
              month: monthForWeek,
              label: rounds[wk].name,
            });
          }

          const weekEnd = weekStart + rounds[wk].length;
          // console.log(weekStart, weekEnd, rounds[wk].length, days);
          if (days >= weekStart && days < weekEnd) {
            currentWeek = rounds[wk].id;
          }

          weekStart = weekEnd;
          weekStartUnix = weekEndUnix;
        }

        // console.log("weekArray", weekArray);

        // let roundDays: number = 0;
        // for (const round of rounds) {
        // }

        const monthArray: monthStateInterface[] = [];
        let sprintStart: number = challengeStarts;
        let startDate: string = "";
        let sprintStartDay: number = 0;
        let currentMonth: string = "";

        for (let i: number = 0; i < sprints.length; i++) {
          const sprint = sprints[i];

          const startUnix = sprintStart;
          const endUnix = startUnix + sprint.length * 24 * 60 * 60 * 1000;

          startDate = format(new Date(startUnix), "dMMM");

          // console.log("startDate", startDate, sprint.length);

          const endDate = format(new Date(endUnix), "dMMM h:mmaaa");

          // console.log("end", endDate);

          if (days >= sprintStartDay) {
            monthArray.push({
              value: `${startDate} - ${endDate}`,
              key: sprint.id,
              label: sprint.name,
            });
          }

          sprintStart = endUnix;

          const sprintEndDay = sprintStartDay + sprints[i].length;
          if (days >= sprintStartDay && days < sprintEndDay) {
            currentMonth = sprint.id;
          }

          sprintStartDay = sprintEndDay;
        }

        setWeekStrings(weekArray.reverse());
        setWeekString(currentWeek);

        setMonthStrings(monthArray);
        setMonthString(currentMonth);
      }
    };

    firstCall();
    const interval = setInterval(firstCall, 3600 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [challengeStarts, challengeLength, sprints, rounds]);

  return {
    weekStrings,
    monthStrings,
    weekString,
    monthString,
  };
};
