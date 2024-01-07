import { memo } from "react";
import { useCurrentPeriodStore } from "./store/periodStore";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import TickCheck from "@components/SvgIcons/TickCheck";
import { formatedDate, getCalenderDate } from "./store/utils";

const PeriodDayWithEdit: React.FC<{
  date?: Date;
  textColor?: string;
  bgColor?: string;
  selectedColor?: string;
}> = ({ date, textColor, bgColor, selectedColor }) => {
  const calenderDate = date ? getCalenderDate(date) : undefined;

  const dateString = calenderDate?.currentDate;
  const timestamp = calenderDate?.unix;
  const day = calenderDate?.visibleDate;

  const onClick = useCurrentPeriodStore((state) => state.logPeriod);
  const isPeriod = useCurrentPeriodStore((state) => {
    if (dateString) {
      const dateType = state.selectedState[dateString];
      return dateType === "PERIOD";
    }

    return undefined;
  });

  const isFuture = timestamp && timestamp > Date.now();

  if (onClick) {
    return (
      <div
        onClick={
          isFuture
            ? undefined
            : () => {
                onClick(dateString || "");
                weEventTrack("calendar_logPeriod", {});
              }
        }
        className="w-2/5 sm:w-1/5 flex flex-col justify-center items-center rounded-xl py-2"
        style={{ cursor: isFuture ? "default" : "pointer" }}
      >
        <p
          className="text-xs pb-1"
          style={{
            fontFamily: "Nunito-Regular",
            color: isPeriod
              ? selectedColor || selectedColor
              : textColor || "#FFFFFF",
          }}
        >
          {day}
        </p>
        <div
          className="w-full aspect-1 rounded-full p-[20%]"
          style={{
            backgroundColor: isFuture
              ? undefined
              : isPeriod
              ? selectedColor || "tomato"
              : bgColor,
          }}
        >
          {isPeriod ? <TickCheck color={"#fff"} /> : null}
        </div>
      </div>
    );
  } else {
    return <div className="w-1/5 aspect-1" />;
  }
};

export default memo(PeriodDayWithEdit, (prev, now) => {
  return formatedDate(prev.date) === formatedDate(now.date);
});
