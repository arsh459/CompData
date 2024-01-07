import { UserRankV2 } from "@models/Rounds/interface";
// import { dayMS } from "@providers/period/periodStore";
import { format } from "date-fns";

export const getDeltaFPs = (userRank: UserRankV2, today: number) => {
  // const yesterday = today - dayMS;
  // const yesterdayDate = format(new Date(yesterday), "yyyy-MM-dd");
  const todayDate = format(new Date(today), "yyyy-MM-dd");

  // console.log("yes", yesterdayDate, todayDate, userRank.name, userRank.fpObj);

  // const yesterdayFP =
  //   userRank.fpObj && userRank.fpObj[yesterdayDate]
  //     ? userRank.fpObj[yesterdayDate]
  //     : 0;
  const todayFP =
    userRank.fpObj && userRank.fpObj[todayDate] ? userRank.fpObj[todayDate] : 0;

  const delta = todayFP; //- yesterdayFP;

  if (delta > 0) {
    return delta;
  }

  return 0;
};
