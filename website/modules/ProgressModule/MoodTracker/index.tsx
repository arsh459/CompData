import NavWrapper from "@components/NavWrapper";
import ViewSelectorGeneric from "@components/ViewSelectorGeneric";
import useAllTimeData from "@hooks/progress/useAllTimeData";
import useAvgData from "@hooks/progress/useAvgData";
import { UserInterface } from "@models/User/User";
import ActivityLog from "@modules/ProgressModule/Components/ActivityLog";
import ProgressHeader from "@modules/ProgressModule/Components/ProgressHeader";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import AddLogBtn from "../Components/AddLogBtn";
import { getEmojiByMood, getMoodString } from "./utils";
import { getChartDataForView } from "../utils/chartUtils";
import { graphDataInterface, selectedFpSectionType } from "../interface";
import MixedChart from "../Components/MixedChart";

interface Props {
  remoteUser: UserInterface | undefined;
}

const MoodTracker: React.FC<Props> = ({ remoteUser: user }) => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };
  const [selectedView, setSelectedView] =
    useState<selectedFpSectionType>("All Time");
  const { allData } = useAllTimeData("mood", "dailyMood", user?.uid);
  const allTimeVal = allData?.map((i, idx) => {
    return idx > 4
      ? ({
          averageValue: i.mood,

          bar: 5,
          weekStr: format(new Date(i.date), "dd MMM"),
        } as graphDataInterface)
      : ({
          averageValue: i.mood,
          default: idx + 1,
          bar: 5,
          weekStr: format(new Date(i.date), "dd MMM"),
        } as graphDataInterface);
  });

  const {
    currentWeekData,
    today: todayMood,
    weeklyAvgs,
  } = useAvgData("mood", "dailyMood", user?.uid);

  const valMonth = [0, 1, 2, 3, 4].map((i) => {
    return { ...weeklyAvgs[i], default: i + 1, bar: 5 } as graphDataInterface;
  });

  const weekly = (currentWeekData && currentWeekData.weekDataObj) || [];
  const finWeek = weekly.map((i, idx) => {
    return idx > 4
      ? ({
          averageValue: i.mood,

          bar: 5,
          weekStr: format(new Date(i.date), "iiiiii"),
        } as graphDataInterface)
      : ({
          averageValue: i.mood,
          default: idx + 1,
          bar: 5,
          weekStr: format(new Date(i.date), "iiiiii"),
        } as graphDataInterface);
  });

  const views = [
    {
      label: "All Time",
      onPress: () => setSelectedView("All Time"),
    },
    {
      label: "Monthly",
      onPress: () => setSelectedView("Monthly"),
    },
    {
      label: "Weekly",
      onPress: () => setSelectedView("Weekly"),
    },
  ];
  const chartData = getChartDataForView(
    selectedView,
    allTimeVal,
    weeklyAvgs?.length ? valMonth : [],
    finWeek
  );
  return (
    <div className="w-screen h-screen relative z-0">
      <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
      <div className="w-full max-w-screen-lg h-full mx-auto ">
        <ProgressHeader
          onBack={onBack}
          text={`${user?.name}'s Mood Journey `}
        />
        <div className="  bg-[#FFECF5] rounded-3xl p-4 w-full md:flex">
          <div className="   flex-[.6]  mx-4    overflow-y-scroll">
            {chartData?.length ? (
              <MixedChart chartType="mood" data={chartData} />
            ) : (
              <p className=" text-center">
                Not found Sufficient Data to build chart{" "}
              </p>
            )}
            <ViewSelectorGeneric
              views={views}
              currView={selectedView}
              containerStyleTw="bg-[#FFD2E9]  m-4"
            />
          </div>
          <div className="p-4   flex-[.4] flex flex-col justify-between gap-8 ">
            <div className="bg-[#FFD2E9] w-full aspect-[388/331] flex flex-col justify-around rounded-xl p-4 px-8 flex-1">
              <div className="flex justify-between">
                <p className=" w-1/2 text-2xl font-nunitoSB text-[#4A4A4A] iphoneX:text-2xl">
                  Your average mood of the day is{" "}
                  <span className="text-[#D3A400]">
                    {getEmojiByMood(todayMood || 0).text}
                  </span>
                </p>
                <img
                  src={getEmojiByMood(todayMood || 0).icon}
                  className="w-1/2 max-w-[91px] aspect-[91/83]"
                />
              </div>
              <p className="text-[#4A4A4A] pt-8 iphoneX:text-base text-sm">
                {getMoodString(todayMood)}{" "}
                {/* <span className="text-[#51FF8C]">{"footerSubText"}</span> */}
              </p>
            </div>
            <NavWrapper
              baseLink={`/admin/patients/${user?.uid}/progress/mood`}
              link="add"
            >
              <AddLogBtn text="Mood" />
            </NavWrapper>
          </div>
        </div>
        <ActivityLog remoteUser={user} hideSection="mood" />
      </div>
    </div>
  );
};

export default MoodTracker;
