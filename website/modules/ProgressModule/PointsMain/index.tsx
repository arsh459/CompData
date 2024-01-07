import ViewSelectorGeneric from "@components/ViewSelectorGeneric";
// import { useFetchAllDayRecsBetween } from "@hooks/progress/useAllDayRecsBet";
// import { useDayRecsBetween } from "@hooks/progress/useDayRecsBet";
import { UserInterface } from "@models/User/User";
import ProgressHeader from "@modules/ProgressModule/Components/ProgressHeader";
import { endOfMonth, getUnixTime, startOfMonth } from "date-fns";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import DayCalender from "./DayCalender";
import { selectedFpSectionType } from "./utils";
// import { useUserPreviousSteps } from "@hooks/progress/useUserPreviousSteps";
// import { View } from "react-big-calendar";
import { useActivityInRange } from "@hooks/progress/useActivityEventsInRange";
import LoadingModal from "@components/loading/LoadingModal";
interface Props {
  remoteUser: UserInterface;
}

const st = getUnixTime(startOfMonth(Date.now())) * 1000; // Get Unix timestamp
const en = getUnixTime(endOfMonth(Date.now())) * 1000;

const PointsMain: React.FC<Props> = ({ remoteUser: user }) => {
  // const [currentMonth, setCurrentMonth] = useState(new Date());
  // const [viewStyle, setViewStyle] = useState<View>("month");
  const [startTime, setStartTime] = useState<number>(st);
  const [endTime, setEndTime] = useState<number>(en);
  // const startOfMonthUnix = getUnixTime(startOfMonth(currentMonth)) * 1000; // Get Unix timestamp
  // const endOfMonthUnix = getUnixTime(endOfMonth(currentMonth)) * 1000;

  // const onViewChange = (v: View) => {
  // setViewStyle(v);
  // };

  // console.log("startOfMonthUnix", new Date(startOfMonthUnix));
  // console.log("endOfMonthUnix", new Date(endOfMonthUnix));

  // const { dateRecs } = useDayRecsBetween(
  //   user.uid,
  //   "workout",
  //   user?.badgeId,
  //   startOfMonthUnix,
  //   endOfMonthUnix
  // );
  // const { dateRecs: dayRecsNutri } = useDayRecsBetween(
  //   user.uid,
  //   "nutrition",
  //   user?.nutritionBadgeId,
  //   startOfMonthUnix,
  //   endOfMonthUnix
  // );

  // const { dataAllRecs } = useFetchAllDayRecsBetween(
  //   user.uid,
  //   user?.badgeId,
  //   user?.nutritionBadgeId,
  //   startOfMonthUnix,
  //   endOfMonthUnix
  // );

  // const { dayStepDocs } = useUserPreviousSteps(
  //   user.uid,
  //   startOfMonthUnix,
  //   endOfMonthUnix
  // );

  // console.log("workout", dateRecs);

  // console.log("diet", dayRecsNutri);
  // console.log("steps", dayStepDocs);

  const router = useRouter();
  const onBack = () => {
    router.back();
  };
  const [selectedView, setSelectedView] =
    useState<selectedFpSectionType>("All");

  const views = [
    {
      label: "All",
      onPress: () => setSelectedView("All"),
    },
    {
      label: "Workout",
      onPress: () => setSelectedView("Workout"),
    },
    {
      label: "Steps",
      onPress: () => setSelectedView("Steps"),
    },
    {
      label: "Diet",
      onPress: () => setSelectedView("Diet"),
    },
  ];

  const { events, loading } = useActivityInRange(
    user.uid,
    startTime,
    endTime,
    selectedView
  );

  // const data = getDataByView(selectedView, dateRecs, dayRecsNutri, dataAllRecs);
  return (
    <div className="w-screen h-screen relative z-0">
      <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
      <div className="w-full max-w-screen-lg h-full mx-auto ">
        <ProgressHeader onBack={onBack} text={`${user?.name}'s Journey `} />
        <div className="  bg-[#FFECF5] rounded-3xl p-4 w-full ">
          <div className=" flex flex-1  mx-4   justify-between">
            {/* <div className={clsx("flex  justify-center items-center")}>
              <button
                className={clsx(
                  "w-4 iphoneX:w-6 aspect-1 cursor-pointer aspect-1"
                )}
                onClick={() => {}}
              >
                <ChevronLeftIcon color="#5F647E" />
              </button>
              <div className="w-2" />
              <div
                className="flex flex-row justify-center items-center my-2 py-2"
                style={
                  {
                    // width: (currStr ? 4 : text.length) * (width >= iPhoneX ? 24 : 20),
                  }
                }
              >
                <p className="text-[#525252] px-8 text-xl iphoneX:text-2xl font-baib">
                  March 2023
                </p>
              </div>
              <div className="w-2" />
              <button
                className={clsx(
                  "w-4 iphoneX:w-6 aspect-1 cursor-pointer aspect-1"
                )}
                onClick={() => {}}
              >
                <ChevronRightIcon color="#5F647E" />
              </button>
            </div> */}
            <ViewSelectorGeneric
              views={views}
              currView={selectedView}
              containerStyleTw="bg-[#FFD2E9] flex-1  md:flex-[.6] m-4"
            />
          </div>
        </div>
        {loading ? (
          <LoadingModal width={100} height={100} fill="#ff4266" fixed={true} />
        ) : null}
        <div>
          {/* <Calendar onChange={() => {}} value={value} /> */}
          <DayCalender
            // currentMonth={currentMonth}
            events={events}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            // setCurrentMonth={setCurrentMonth}
            // viewStyle={viewStyle}
            // onViewChange={onViewChange}
            // workoutRecs={dateRecs}
            // nutritionRecs={dayRecsNutri}
            // stepDocs={dayStepDocs}
            // type={selectedView}
            // dayStepTarget={user.dailyStepTarget ? user.dailyStepTarget : 3000}
          />
        </div>
      </div>
    </div>
  );
};

export default PointsMain;
