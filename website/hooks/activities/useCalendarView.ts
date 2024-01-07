// import { UserRank } from "@models/Activities/Activity";
import { useEffect, useState } from "react";
import { format } from "date-fns";
// import { SPRINT_LENGTH } from "@constants/gameStats";
import { SprintObject } from "@models/Event/Event";

interface dateKey {
  key: string;
  label: string;
}

export const useCalendarView = (
  //   userRank?: UserRank,
  // challengeLength?: number,
  after?: number,
  sprints?: SprintObject[],
  // roundLength?: number,
  leaderboardMonth?: string
) => {
  const [savedList, setSavedList] = useState<dateKey[]>([]);
  // const [nowIndex, setNowDate] = useState<number>(0);

  // console.log("sav", leaderboardMonth);

  useEffect(() => {
    if (after && sprints) {
      // let sprintNumber: number = 0;
      // if (leaderboardMonth) {
      // const selectedSprint = sprints.filter(
      // (item) => item.id === leaderboardMonth
      // );

      // const leaderMonthList = leaderboardMonth.split("-");
      // if (leaderMonthList.length > 1) {
      // sprintNumber = parseInt(leaderMonthList[1]);
      // }
      // }

      let sprintStart = after;
      let sprint: SprintObject | undefined = undefined;
      for (let i: number = 0; i < sprints.length; i++) {
        sprint = sprints[i];
        const sprintEnd = sprintStart + sprint.length * 24 * 60 * 60 * 1000;
        if (sprint.id === leaderboardMonth) {
          break;
        }

        sprintStart = sprintEnd;
      }

      if (sprint) {
        const dateList = getDateListV2(
          sprintStart,
          sprint.length
          // sprintNumber
        );
        setSavedList(dateList);

        // console.log("dateList", dateList);

        // const now = new Date();
        // const nowString = now.toDateString();
        // const nowDateIndex = dateList.indexOf(nowString);
        // setNowDate(nowDateIndex);
      }
    }
  }, [after, sprints, leaderboardMonth]);

  return {
    savedList,
    // nowIndex,
  };
};

// const getDateList = (start: number, length: number) => {
//   const dateList: string[] = [];
//   for (let i = 0; i < length; i++) {
//     dateList.push(new Date(start + i * 24 * 60 * 60 * 1000).toDateString());
//   }

//   return dateList;
// };

const getDateListV2 = (start: number, length: number) => {
  const dateList: dateKey[] = [];
  // console.log("sprintNumber", sprintNumber);
  // console.log("start", start);

  // const startNow = start + sprintNumber * length * 24 * 60 * 60 * 1000;

  for (let i = 0; i < length; i++) {
    const dt = new Date(start + i * 24 * 60 * 60 * 1000);

    dateList.push({
      key: format(dt, "yyyy-MM-dd"),
      label: format(dt, "MMM d"),
    });
  }

  return dateList;
};
