import DoubleCircularProgress from "@components/SvgIcons/DoubleCircularProgress";
// import HexaPercentIcon from "@components/SvgIcons/HexaPercentIcon";
import {
  blackFlameIcon,
  // fireIconWhiteFrame16,
} from "@constants/icons/iconURLs";
import { useFetchAllDayRecsBetween } from "@hooks/progress/useAllDayRecsBet";
import { getBaseStreak } from "@hooks/progress/utils";
import {
  dayRecommendationWithNutrition,
  UserInterface,
} from "@models/User/User";
import clsx from "clsx";
import { format, getDate } from "date-fns";
import React from "react";
import { getDateStr } from "../PointsMain/utils";

interface Props {
  user: UserInterface;
}
const FitpointStreakMain: React.FC<Props> = ({ user }) => {
  const now = new Date();
  const dayToday = now.getDay();

  const daysToMonday = dayToday - 1 >= 0 ? dayToday - 1 : 0;
  const nowStartDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  );
  const nowStart = nowStartDate.getTime();

  const now_St = nowStart - daysToMonday * 24 * 60 * 60 * 1000;
  const baseStreak = getBaseStreak(
    now_St,
    user?.dailyFPTarget ? user.dailyFPTarget : 100
  );
  const { dataAllRecs } = useFetchAllDayRecsBetween(
    user.uid,
    user?.badgeId,
    user?.nutritionBadgeId,
    baseStreak[0].unix,
    nowStart
  );

  return (
    <div className="w-full aspect-[416/152] flex flex-col rounded-3xl bg-[#E170A8]">
      <div className="flex items-center py-2 text-white justify-between px-4">
        <div className="flex items-center  ">
          <img src={blackFlameIcon} className="w-3 aspect-[16/21] " />
          <p className="text-base font-nunitoM pl-2">
            Current Fitpoints Streak
          </p>
        </div>
        <div>{/* <p className="text-base font-nunitoM ">4 weeks</p> */}</div>
      </div>
      <div className="flex  px-4 flex-1 bg-white  rounded-b-3xl py-2 items-center gap-4 justify-between">
        {baseStreak.map((item, idx) => {
          const dayObj = {
            date: getDateStr(new Date(item.date)),
          };
          const recomendation: dayRecommendationWithNutrition =
            dataAllRecs[dayObj.date];

          const day = format(new Date(item.unix), "EEEEEE");

          const dateNumber = getDate(new Date(item.unix));
          const isToday = day === format(new Date(), "EEEEEE");
          const isFuture = item.isFuture;
          return (
            <div className="flex flex-col" key={item.id}>
              <p
                className={clsx(
                  "text-center text-[#494949]",
                  isToday && "bg-[#836BE9] px-2 text-white rounded-full",
                  "mb-4"
                )}
              >
                {day}
              </p>

              <div className="w-10 h-w-10 relative ">
                <DoubleCircularProgress
                  progress1={
                    isFuture
                      ? 0
                      : (recomendation?.doneFP || 0) /
                        (recomendation?.taskFP || 1)
                  }
                  progress2={
                    isFuture
                      ? 0
                      : (recomendation?.doneFPNutri || 0) /
                        (recomendation?.taskFPNutri || 1)
                  }
                  color1={"#6D55D1"}
                  color2={"#EE7200"}
                  inactiveColor1={"#fff"}
                  inactiveColor2={"#fff"}
                  textValue={dateNumber}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FitpointStreakMain;
