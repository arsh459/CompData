import { periodDateType } from "@models/User/User";
import { memo } from "react";
import { CalendarDate } from "./store/interface";
import {
  formatedDate,
  getBottomBackgroundColor,
  getCalenderDate,
  getMainBackgroundColorCalendar,
} from "./store/utils";
import { useTodayDate } from "@hooks/myProgram/useTodayDate";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { useCurrentPeriodStore } from "./store/periodStore";

const PeriodDayWithoutEdit: React.FC<{ date?: Date; textColor?: string }> = ({
  date,
  textColor,
}) => {
  const calendarDate: CalendarDate | undefined = date
    ? getCalenderDate(date)
    : undefined;

  if (calendarDate) {
    return <HelperComp {...calendarDate} textColor={textColor} />;
  } else {
    return <div className="w-1/5 aspect-1 bg-teal-200" />;
  }
};

export default memo(PeriodDayWithoutEdit, (prev, now) => {
  return formatedDate(prev.date) === formatedDate(now.date);
});

const HelperComp: React.FC<
  CalendarDate & {
    textColor?: string;
  }
> = ({ currentDate: date, unix, visibleDate, textColor }) => {
  const { today, todayUnix } = useTodayDate();

  const isFuture = unix > todayUnix;

  const { stateOfCal, symptomsPresent, firstCycleStart } =
    useCurrentPeriodStore((state) => {
      const periodDateObj = state.periodDateObjStore[date];

      // startOfLog
      const firstCycle = state.cyclesArray[state.cyclesArray.length - 1];
      const firstCycleStart = firstCycle?.startUnix;

      // for dates before cycle start, show dead state
      const symptomList = periodDateObj?.loggedSymptoms
        ? Object.keys(periodDateObj?.loggedSymptoms)
        : [];

      if (periodDateObj) {
        return {
          stateOfCal: periodDateObj.type,
          symptomsPresent: symptomList.length ? true : false,
          firstCycleStart,
        };
      } else {
        return {
          stateOfCal: "UNKNOWN" as periodDateType,
          symptomsPresent: false,
          firstCycleStart,
        };
      }
    });

  const onClick = useCurrentPeriodStore(
    (state) => state.toggleMonthlySelectedDate
  );

  const isToday = today === date;
  const colorsMain = getMainBackgroundColorCalendar(stateOfCal, "#535353");
  const colorsBottom = getBottomBackgroundColor(stateOfCal, symptomsPresent);

  const isDotted = isFuture || stateOfCal === "ESTIMATED_PERIOD" ? true : false;

  return (
    <div
      onClick={
        unix < firstCycleStart
          ? undefined
          : () => {
              onClick(date);
              weEventTrack("calendar_clickDate", {});
            }
      }
      className="p-1 cursor-default"
    >
      <p
        className="text-[10px] text-center pb-1"
        style={{
          opacity: isToday ? 1 : 0,
          color: `${textColor || "#FFFFFF"}80`,
        }}
      >
        Today
      </p>
      <div className="w-full aspect-1 rounded-full">
        <div
          className="relative z-0 aspect-1 mx-auto flex flex-col justify-center items-center border rounded-full"
          style={{
            backgroundColor: colorsMain.backgroundColor,
            borderColor: colorsMain.borderColor,
            borderStyle: isDotted ? "dotted" : "solid",
          }}
        >
          <p
            className="text-xs p-1"
            style={{
              color:
                unix < firstCycleStart
                  ? `${textColor || "#FFFFFF"}4D`
                  : colorsMain.textColor,
            }}
          >
            {parseInt(visibleDate)}
          </p>
          <div className="absolute -bottom-1/2 left-0 right-0 z-10 flex flex-col items-center">
            <div
              className="w-3/5 aspect-1"
              style={{
                backgroundColor: colorsBottom.backgroundColor,
                borderColor: colorsBottom.borderColor,
                borderWidth: 1,
                borderRadius: 1000,
                borderStyle: isDotted ? "dotted" : "solid",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

memo(HelperComp, (prev, now) => {
  return prev.currentDate === now.currentDate;
});
