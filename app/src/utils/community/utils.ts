import {
  monthStateInterface,
  weekStateInterface,
} from "@hooks/challenge/useChallengeWeeks";
import { ReviewMessage, reviewStatus } from "@models/Activity/Activity";

export const getCalTolFP = (calories?: number) => {
  return calories ? Math.floor(calories / 300) : 0;
};

export const getTaskTotalFP = (arr?: { text: string; fitPoints: number }[]) => {
  let totalFP = 0;
  if (arr) {
    arr.forEach((item) => {
      if (totalFP < item.fitPoints) {
        totalFP = item.fitPoints;
      }
    });
  }
  return totalFP;
};

export const getUserScore = (score: number, user?: string) => {
  if (score <= 100 && score >= 95) {
    return `${user ? user : "User"} is in the top 5 %`;
  } else if (score < 95 && score >= 70) {
    return `${user ? user : "User"} is in the top 30 %`;
  } else if (score < 70 && score >= 50) {
    return `${user ? user : "User"} is in the top 50 %`;
  } else if (score < 50 && score >= 30) {
    return `50 % are ahead of ${user ? user : "User"}`;
  } else if (score < 30 && score >= 5) {
    return `70 % are ahead of ${user ? user : "User"}`;
  } else {
    return ``;
  }
};

const getUserScoreString = (score: number) => {
  if (score <= 100 && score >= 90) {
    return "Olympian effort";
  } else if (score < 90 && score >= 70) {
    return "You're an athlete!";
  } else if (score < 70 && score >= 50) {
    return `Great effort!`;
  } else if (score < 50) {
    return `Fair effort`;
  } else {
    return ``;
  }
};

export const getScore = (earnedFp?: number, total?: number) => {
  let eFP = earnedFp ? earnedFp : 0;
  let totalFP = total ? total : 1;

  return (eFP / totalFP) * 100;
};

export const getUserScoreStringV2 = (score: number) => {
  if (score <= 100 && score >= 90) {
    return "This was an Olympian effort";
  } else if (score < 90 && score >= 70) {
    return "You're an athlete!";
  } else if (score < 70 && score >= 50) {
    return `This was a Great effort!`;
  } else if (score < 50) {
    return `Fair effort. Level up soon`;
  } else {
    return ``;
  }
};

export const getReason = (message?: ReviewMessage) => {
  if (message?.tags && Object.keys(message.tags).length) {
    const filtered = Object.keys(message.tags).filter(
      (item) => message.tags && message.tags[item]
    );
    return filtered.join(", ");
  }
  if (message?.text) {
    return message.text;
  }

  return "Please contact support";
};

export const getReviewMessage = (
  message?: string,
  tags?: { [tag: string]: boolean },
  reviewStatus?: reviewStatus,
  earnedFP?: number,
  totalFP?: number
) => {
  // if (tags && Object.keys(tags).length) {
  //   const filtered = Object.keys(tags).filter((item) => tags[item]);
  //   return filtered.join(", ");
  // }

  if (message) {
    return message;
  }

  if (earnedFP && totalFP) {
    const score = Math.round((earnedFP / totalFP) * 100);
    return getUserScoreString(score);
  }

  if (reviewStatus === "SAVED" || reviewStatus === "REVIEWED") {
    return reviewStatus.toLocaleLowerCase();
  }

  return "-";
};

export const getSprintRoundHeadings = (
  leaderboardWeeks: weekStateInterface[],
  leaderboardMonths: monthStateInterface[],
  selectedWeek?: string,
  selectedMonth?: string
) => {
  const sprint = leaderboardMonths.filter((each) => each.key === selectedMonth);

  if (selectedWeek === "overall") {
    return {
      roundName: "Overall",
      sprintName: sprint.length > 0 ? sprint[0].label : "-",
    };
  }

  const round = leaderboardWeeks.filter((each) => each.key === selectedWeek);

  return {
    roundName: round.length > 0 ? round[0].label : "-",
    sprintName: sprint.length > 0 ? sprint[0].label : "-",
  };
};

export const getLederboardDetailsHeading = (
  period: "month" | "week" | undefined,
  leaderboardWeeks: weekStateInterface[],
  leaderboardMonths: monthStateInterface[],
  selectedWeek?: string,
  selectedMonth?: string
) => {
  if (period === "week" && selectedWeek !== "overall") {
    const temp = leaderboardWeeks.filter((each) => each.key === selectedWeek);
    if (temp.length > 0) {
      return temp[0].value;
    }
  } else {
    const temp = leaderboardMonths.filter((each) => each.key === selectedMonth);
    if (temp.length > 0) {
      return temp[0].value;
    }
  }

  return "--";

  // switch (period) {
  //   case "week" && selectedWeek !== 'overall':
  //     if (selectedWeek) {
  //       if (selectedWeek === "overall") return "Overall";
  //       const temp = leaderboardWeeks.filter(
  //         (each) => each.key === selectedWeek
  //       );
  //       if (temp.length > 0) {
  //         return temp[0].value;
  //       }
  //     }
  //     return "--";
  //   case "month":
  //     if (selectedMonth) {
  //       const temp = leaderboardMonths.filter(
  //         (each) => each.key === selectedMonth
  //       );
  //       if (temp.length > 0) {
  //         return temp[0].value;
  //       }
  //     }
  //     return "--";
  //   default:
  //     return "--";
  // }
};
