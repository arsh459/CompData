import {
  format,
  parse,
  startOfWeek,
  getDay,
  isBefore,
  isAfter,
} from "date-fns";
import {
  Calendar,
  NavigateAction,
  View,
  dateFnsLocalizer,
} from "react-big-calendar";
import enUS from "date-fns/locale/en-US";
import { Dispatch, SetStateAction, useState } from "react";
import RightArrowSlimIcon from "@components/SvgIcons/RightArrowSlimIcon";

const now = new Date(Date.now());

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Props {
  dateComp?: (date: Date) => JSX.Element;
  curr: Date;
  setCurr: Dispatch<SetStateAction<Date>>;
  border?: boolean;
  headerColor?: string;
  headerTextColor?: string;
  min?: Date;
  max?: Date;
}

const CalenderMounth: React.FC<Props> = ({
  dateComp,
  curr,
  setCurr,
  border,
  headerColor,
  headerTextColor,
  min,
  max,
}) => {
  const [navigationState, setNavigationState] = useState<
    "left" | "right" | "both"
  >(max && isBefore(now, max) ? "both" : "left");

  const minDate = min || new Date(now.getFullYear() - 100, 0, 1, 0, 0, 0, 0);
  const maxDate =
    max ||
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

  const handleNavigate = (
    newDate: Date,
    view: View,
    action: NavigateAction
  ) => {
    console.log("here");
    if (action === "NEXT" || action === "PREV") {
      setCurr(newDate);

      const isBeforeMin = isBefore(newDate, minDate);
      const isAfterMax = isAfter(newDate, maxDate);

      setNavigationState(isBeforeMin ? "right" : isAfterMax ? "left" : "both");
    }
  };

  const comp = (date: Date) =>
    dateComp ? (
      dateComp(date)
    ) : (
      <div className="w-full aspect-[90/80] sm:aspect-[90/60] max-h-[100px] flex justify-center items-center text-[#535353] font-nunitoR text-xs sm:text-sm">
        {format(date, "d")}
      </div>
    );

  return (
    <Calendar
      max={new Date()}
      className="CalenderMounth"
      localizer={localizer}
      views={{ month: true }}
      onNavigate={handleNavigate}
      components={{
        toolbar: (prop) => (
          <div
            className="w-full aspect-[670/50] flex justify-between items-center rounded-xl p-2 sm:p-4"
            style={{
              fontFamily: "Nunito-SemiBold",
              borderWidth: border ? 1.5 : 0,
              borderColor: border ? headerTextColor || "#535353" : undefined,
              backgroundColor: border ? undefined : headerColor || "#FFFFFF",
            }}
          >
            <button
              disabled={navigationState === "right"}
              onClick={() => prop.onNavigate("PREV")}
              className="w-[3%] min-w-[12px] aspect-1 cursor-pointer rotate-180"
            >
              {navigationState === "right" ? null : (
                <RightArrowSlimIcon color={headerTextColor || "#535353"} />
              )}
            </button>
            <p
              style={{ color: headerTextColor || "#535353" }}
              className="text-sm sm:text-base"
            >
              {format(curr, "MMMM yyyy")}
            </p>
            <button
              disabled={navigationState === "left"}
              onClick={() => prop.onNavigate("NEXT")}
              className="w-[3%] min-w-[12px] aspect-1 cursor-pointer"
            >
              {navigationState === "left" ? null : (
                <RightArrowSlimIcon color={headerTextColor || "#535353"} />
              )}
            </button>
          </div>
        ),
        month: {
          header: (props) => (
            <p className="w-full aspect-[90/70] sm:aspect-[90/60] max-h-[100px] flex justify-center items-center text-[#535353] font-nunitoM text-sm">
              {props.label.slice(0, 3)}
            </p>
          ),
          dateHeader: (props) =>
            curr.getMonth() === props.date.getMonth() ? comp(props.date) : null,
        },
      }}
    />
  );
};

export default CalenderMounth;
