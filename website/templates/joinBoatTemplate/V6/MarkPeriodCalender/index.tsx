import CalenderMounthWithInfiniteScroll from "@components/CustomCalender/CalenderMounthWithInfiniteScroll";
import { useTodayDate } from "@hooks/myProgram/useTodayDate";
import PeriodDayWithEdit from "@modules/ProgressModule/PeriodTracker/PeriodDayWithEdit";
import { useCurrentPeriodStore } from "@modules/ProgressModule/PeriodTracker/store/periodStore";
import { isFuture } from "date-fns";
import { useEffect } from "react";
import OnboardPeriodSave from "./OnboardPeriodSave";
import { sectionTypes } from "@hooks/joinBoat/V6/useSection";
import { getMonthEditScrollIndex } from "./utils";

interface Props {
  userId?: string;
  target: "markLastPeriod" | "markBeforeLastPeriod";
  onSaveAndNext: (
    sec: sectionTypes,
    periodLength?: number,
    cycleLength?: number
  ) => Promise<void>;
  title: string;
  highlightedTitle: string;
  highlightedColor: string;
}

const MarkPeriodCalender: React.FC<Props> = ({
  target,
  userId,
  onSaveAndNext,
  title,
  highlightedTitle,
  highlightedColor,
}) => {
  const { todayUnix } = useTodayDate();
  const splidedTitle = `__${title}__`.split(highlightedTitle);

  const {
    months,
    initMonth,
    onPrevious,
    prepolulateData,
    lastMarkedPeriodDate,
  } = useCurrentPeriodStore((state) => ({
    months: state.editMonths,
    initMonth: state.onMonthEditView,
    onPrevious: state.onPreviousMonth,
    prepolulateData: state.prepolulatePeriodDates,
    lastMarkedPeriodDate: state.lastMarkedPeriodDate,
  }));

  useEffect(() => {
    initMonth(todayUnix);
    if (userId) {
      prepolulateData(userId);
    }
  }, [todayUnix, userId, prepolulateData, initMonth]);

  const dateComp = (date: Date) => {
    const isFutureDate = isFuture(date);

    return (
      <div
        className="w-full aspect-[12/16] sm:aspect-[90/60] max-h-[100px] flex flex-col justify-center items-center"
        style={{ opacity: isFutureDate ? 0.5 : 1 }}
      >
        <PeriodDayWithEdit
          date={date}
          bgColor="#343150"
          selectedColor={highlightedColor}
        />
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      <p
        className="text-[#F1F1F1] text-xl p-4"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {splidedTitle[0].replaceAll("__", "")}
        <span
          style={{ color: highlightedColor }}
        >{` ${highlightedTitle} `}</span>
        {splidedTitle[1].replaceAll("__", "")}
      </p>

      <div className="w-full flex-1 relative z-0">
        <div className="absolute inset-0 px-4">
          <CalenderMounthWithInfiniteScroll
            months={months.map((each) => new Date(each.monthStartUnix))}
            onEndReached={onPrevious}
            reverse={true}
            headerColors={
              target === "markBeforeLastPeriod"
                ? ["#D660FF", "#6792FF"]
                : ["#FF6069", "#FF67A7"]
            }
            dateComp={dateComp}
            intialScrollIndex={getMonthEditScrollIndex(
              lastMarkedPeriodDate,
              target === "markBeforeLastPeriod"
            )}
          />
        </div>
      </div>

      <OnboardPeriodSave
        target={target}
        onSaveAndNext={onSaveAndNext}
        userId={userId}
        noteText={
          target === "markLastPeriod"
            ? "Add atleast one period date to proceed further"
            : "Add one more period dates from your last period to proceed further"
        }
        noteTextColor={highlightedColor}
      />
    </div>
  );
};

export default MarkPeriodCalender;
