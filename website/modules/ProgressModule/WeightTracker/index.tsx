import NavWrapper from "@components/NavWrapper";
import ViewSelectorGeneric from "@components/ViewSelectorGeneric";
import useAllTimeData from "@hooks/progress/useAllTimeData";
import useAvgData from "@hooks/progress/useAvgData";
import { UserInterface } from "@models/User/User";
import ActivityLog from "@modules/ProgressModule/Components/ActivityLog";
import AddLogBtn from "@modules/ProgressModule/Components/AddLogBtn";
import ProgressHeader from "@modules/ProgressModule/Components/ProgressHeader";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEarliestWeight } from "./utils";
import WeightDetail from "./WeightDetail";
import { getCurrentWeekRangeV2 } from "../utils/weekRangeUtils";
import { getMonthRange } from "../utils/mounthRangeUtils";
import { getChartDataForView } from "../utils/chartUtils";
import { graphDataInterface, selectedFpSectionType } from "../interface";
import MixedChart from "../Components/MixedChart";

interface Props {
  remoteUser: UserInterface | undefined;
}

const WeightTracker: React.FC<Props> = ({ remoteUser: user }) => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };
  const [selectedView, setSelectedView] =
    useState<selectedFpSectionType>("All Time");
  const { allData, maxWeight } = useAllTimeData(
    "weight",
    "dailyWeight",
    user?.uid
  );
  // console.log({ allData });
  const allTimeVal = allData?.map((i, idx) => {
    return idx > 4
      ? ({
          averageValue: i.weight,

          bar: maxWeight,
          weekStr: format(new Date(i.date), "dd MMM"),
        } as graphDataInterface)
      : ({
          averageValue: i.weight,
          default: idx + 1,
          bar: maxWeight,
          weekStr: format(new Date(i.date), "dd MMM"),
        } as graphDataInterface);
  });
  const { currentWeekData, weeklyAvgs, currentWeekNumber } = useAvgData(
    "weight",
    "dailyWeight",
    user?.uid
  );
  // console.log({ currentWeekData, weeklyAvgs, loading, currentWeekNumber });
  const { weight } = useEarliestWeight(user?.uid);

  const latestWeight = weight?.weight ? weight.weight : user?.weight || 0;
  // console.log(currentWeekData?.weekDataObj, "week");

  const { weightGraphData } = getCurrentWeekRangeV2(
    currentWeekData?.weekDataObj ? currentWeekData?.weekDataObj : [],
    latestWeight,
    maxWeight
  );
  // console.log(weight, latestWeight, weightGraphData, "weightGraphData");

  const { dataSetMonth } = getMonthRange(
    currentWeekNumber,
    weeklyAvgs,
    latestWeight
  );
  // console.log({ dataSetMonth }, "dsm");

  const valMonth = [0, 1, 2, 3, 4].map((i, idx) => {
    return idx > 3
      ? ({
          ...weeklyAvgs[i],
          averageValue: dataSetMonth[i],
          bar: maxWeight,
        } as graphDataInterface)
      : ({
          ...weeklyAvgs[i],
          default: i + 1,
          averageValue: dataSetMonth[i],
          bar: maxWeight,
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
    dataSetMonth?.length ? valMonth : [],
    weightGraphData
  );

  return (
    <div className="w-screen h-screen relative z-0">
      <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
      <div className="w-full max-w-screen-lg h-full mx-auto ">
        <ProgressHeader
          onBack={onBack}
          text={`${user?.name}'s Weight Journey `}
        />
        <div className="  bg-[#FFECF5] rounded-3xl flex-1 p-4  md:flex">
          <div className="flex-1  md:flex-[.6]  mx-4    overflow-y-scroll">
            <ViewSelectorGeneric
              views={views}
              currView={selectedView}
              containerStyleTw="bg-[#FFD2E9]  m-4"
            />

            {chartData?.length ? (
              <MixedChart
                chartType="weight"
                data={chartData}
                maxWeight={maxWeight}
              />
            ) : (
              <p className="text-center">
                Not found Sufficient Data to build chart{" "}
              </p>
            )}
          </div>
          <div className="p-4 flex-1  md:flex-[.4] flex  flex-col justify-between gap-8 ">
            <WeightDetail user={user} />
            <NavWrapper
              baseLink={`/admin/patients/${user?.uid}/progress/weight`}
              link="add"
            >
              <AddLogBtn text="Weight" />
            </NavWrapper>
          </div>
        </div>
        <ActivityLog remoteUser={user} hideSection="weight" />
      </div>
    </div>
  );
};

export default WeightTracker;
