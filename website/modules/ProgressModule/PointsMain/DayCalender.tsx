import { Calendar, Event, View, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DoubleCircleProgress from "./DoubleCircleProgress";
// import { Dispatch, SetStateAction } from "react";

import { oneDayInMS } from "@hooks/myProgram/useBadgeProgressCalender";
// import { DayStepDoc } from "@hooks/progress/useUserPreviousSteps";

const locales = {
  "en-US": require("date-fns"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export type resourceType = "workout" | "diet" | "steps";
// interface DateHeaderProps {
//   label: string;
//   date: Date;

//   workoutRecs: {
//     [date: string]: dayRecommendation;
//   };
//   nutritionRecs: {
//     [date: string]: dayRecommendation;
//   };
//   stepDocs: {
//     [date: string]: DayStepDoc;
//   };

//   selectedMonth: Date;
//   type: selectedFpSectionType;
//   dayStepTarget: number;
// }

// const CustomDateHeader: React.FC<DateHeaderProps> = ({
//   date,
//   label,
//   workoutRecs,
//   nutritionRecs,
//   stepDocs,
//   selectedMonth,
//   type,
//   dayStepTarget,
// }) => {
//   // console.log("selectedMonth", selectedMonth.getMonth());
//   const isCurrentMonth = date.getMonth() === selectedMonth.getMonth();
//   // console.log("isCurrentMonth", isCurrentMonth);

//   const dayObj = {
//     date: getDateStr(date),
//   };

//   const { workoutProgress, nutritionProgress, stepProgress } =
//     getProgressValues(
//       workoutRecs,
//       nutritionRecs,
//       stepDocs,
//       dayObj.date,
//       type,
//       dayStepTarget
//     );

//   // console.log("dayObj", dayObj.date);

//   // console.log("date", date, workoutProgress, nutritionProgress, stepProgress);

//   // const recomendation: dayRecommendationWithNutrition = dayRecs[dayObj.date];

//   return isCurrentMonth ? (
//     <div className="w-full h-full flex flex-col items-center">
//       <div className="w-full h-full py-2 sm:p-4 flex  relative ">
//         <DoubleCircleProgress
//           progress1={workoutProgress}
//           progress2={nutritionProgress}
//           progress3={stepProgress}
//           color1={"#6D55D1"}
//           color2={"#EE7200"}
//           color3={"#A5DAFF"}
//           inactiveColor1={"#fff"}
//           inactiveColor2={"#fff"}
//           inactiveColor3={"#fff"}
//           centerText={label}
//         />
//       </div>
//     </div>
//   ) : null;
// };
interface DayCalendarProps {
  // currentMonth: Date;
  // setCurrentMonth: Dispatch<SetStateAction<Date>>;
  // workoutRecs: {
  //   [date: string]: dayRecommendation;
  // };
  // nutritionRecs: {
  //   [date: string]: dayRecommendation;
  // };
  // stepDocs: {
  //   [date: string]: DayStepDoc;
  // };
  // type: selectedFpSectionType;
  // dayStepTarget: number;
  // viewStyle: View;
  // onViewChange: (v: View) => void;
  events: Event[];
  setStartTime: (st: number) => void;
  setEndTime: (en: number) => void;
}
const DayCalendar: React.FC<DayCalendarProps> = ({
  // currentMonth,
  // setCurrentMonth,
  // workoutRecs,
  // nutritionRecs,
  // stepDocs,
  // type,
  // dayStepTarget,
  // viewStyle,
  // onViewChange,
  events,
  setStartTime,
  setEndTime,
}) => {
  // const handleNavigate = (newDate: any) => {
  //   console.log(newDate);
  //   setCurrentMonth(newDate);
  // };
  // console.log("events", events.length);
  // events.map((item) => console.log({ st: item.start, title: item.title }));
  const onRangeChange = (
    range:
      | Date[]
      | {
          start: Date;
          end: Date;
        },
    view?: View | undefined
  ) => {
    // console.log("range", range);
    if (Array.isArray(range)) {
      if (range.length > 1) {
        setStartTime(range[0].getTime());
        setEndTime(range[range.length - 1].getTime());
      } else {
        const st = range[0].getTime();
        setStartTime(st);
        setEndTime(st + oneDayInMS);
      }
    } else {
      setStartTime(range.start.getTime());
      setEndTime(range.end.getTime());
    }
  };

  return (
    <>
      <div className="calendars">
        <div>
          <Calendar
            localizer={localizer}
            style={{ height: 700 }}
            // onView={onViewChange}
            // view={viewStyle}
            // views={{
            //   // day: true,
            //   // week: true,
            //   month: true,
            //   agenda: true,
            //   // year: Year
            // }}
            // events={viewStyle !== "month" ? events : []}
            events={events}
            toolbar={true}
            onRangeChange={onRangeChange}
            // components={{
            //   month: {
            //     dateHeader: (props) => (
            //       <CustomDateHeader
            //         {...props}
            //         workoutRecs={workoutRecs}
            //         nutritionRecs={nutritionRecs}
            //         stepDocs={stepDocs}
            //         selectedMonth={currentMonth}
            //         type={type}
            //         dayStepTarget={dayStepTarget}
            //       />
            //     ),
            //   },
            // }}
            // onNavigate={handleNavigate}
          />
        </div>
      </div>
    </>
  );
};
export default DayCalendar;
