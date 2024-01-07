import { dateObject } from "@hooks/tasks/program/useProgramTasks";
// import clsx from "clsx";
import { format, parseISO } from "date-fns";
import React, { useEffect, useRef } from "react";
import RoundedCircleButton from "./RoundedCircleButton";
interface Props {
  daysArray?: dateObject[];
  selectedDay?: string;
  nowObj?: dateObject;
  setDay: (val: dateObject) => void;
  // finale?: string;
  dayPointObj?: {
    [day: string]: number;
  };
  selectedMonth: string;
  setMonth: (val: string) => void;
}

const now = new Date();
const nowUnix = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  0,
  0,
  0,
  0
).getTime();
const nowFormatted = format(now, "yyyy-MM-dd");

export const DaysScroll: React.FC<Props> = ({
  daysArray,
  selectedDay,
  setDay,
  // finale,
  dayPointObj,
  nowObj,
  selectedMonth,
  setMonth,
}) => {
  const fieldRef = useRef<HTMLInputElement>(null);

  // console.log("field", fieldRef.current);

  useEffect(() => {
    if (fieldRef && fieldRef.current) {
      fieldRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        // block: "start",
      });
    }
  }, [fieldRef, selectedMonth]);

  return (
    <>
      {daysArray
        ? daysArray.map((day, index) => {
            let state: "past" | "now" | "future" | "unknown" = "unknown";
            const dt = new Date(day.formattedDate).getTime();

            if (nowFormatted === day.formattedDate) {
              state = "now";
            } else if (dt < nowUnix) {
              state = "past";
            } else {
              state = "future";
            }

            let bgColor: string = "";
            let ringColor: string = "";
            let textColor: string = "text-white";
            // finale
            if (day.isFinale) {
              bgColor = "#000";
              ringColor = "#C03B4E";
              textColor = "text-[#F2D56F]";
            }
            // now
            else if (state === "now") {
              bgColor = "#0085E0";
              ringColor = "#0085E0";
            } else if (state === "future") {
              // future
              bgColor = "#ADADAD";
              ringColor = "#ADADAD";
            } else if (
              state === "past" &&
              dayPointObj &&
              dayPointObj[day.formattedDate]
            ) {
              // past done
              bgColor = "#6EC576";
              ringColor = "#6EC576";
            } else {
              bgColor = "#ADADAD";
              ringColor = "#ADADAD";
            }

            // selected
            const isSelectedDay = day.formattedDate === selectedDay;
            return (
              <div
                key={`${day}-${index}`}
                ref={state === "now" ? fieldRef : null}
                className="cursor-pointer mr-12 flex flex-col justify-center items-center"
                onClick={() => setDay(day)}
              >
                <span className="mb-2 text-center" style={{ color: bgColor }}>
                  {day.dayName}
                </span>
                <RoundedCircleButton
                  bgColor={bgColor}
                  noRing={isSelectedDay ? false : true}
                  ringColor={ringColor}
                  textColor={textColor}
                  text={format(parseISO(day.formattedDate), "d")}
                  lockedOverlay={state === "future"}
                  MainCircleHWString={isSelectedDay ? "" : "h-10 w-10"}
                  RingHWString="h-12 w-12"
                />
                {day.isWarmup ? (
                  <span className="mt-2 text-center" style={{ color: bgColor }}>
                    Warmup
                  </span>
                ) : null}
              </div>
            );
          })
        : null}
    </>
  );
};
