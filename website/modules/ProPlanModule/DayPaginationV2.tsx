import RestDayIcon from "@components/SvgIcons/RestDayIcon";
import StarIcon from "@components/SvgIcons/StarIcon";
import TripleArrowRightIcon from "@components/SvgIcons/TripleArrowRightIcon";
import { dayObj } from "@hooks/myProgram/useBadgeProgressCalender";
import { Day } from "@hooks/myProgram/useWorkoutPreference";
import clsx from "clsx";
import { format, isToday } from "date-fns";
import React, { useEffect, useRef, useState } from "react";

interface DayPaginationProps {
  currentPage: number;
  items: dayObj[];
  onPageChange: (pageNumber: number) => void;
  workoutDays: Day[];
  startUnixDayStart: number;
  onClick: (obj: dayObj) => void;
}

const DayPaginationV2: React.FC<DayPaginationProps> = ({
  currentPage,
  items,
  onPageChange,
  workoutDays,
  startUnixDayStart,
  onClick,
}) => {
  const [initScroll, setinitScroll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);

  const handleClick = (pageNumber: number, obj: dayObj) => {
    onPageChange(pageNumber);
    onClick(obj);
  };

  const handleNextClick = () => {
    const container = containerRef.current;
    if (container) {
      const containerWidth = container.offsetWidth;
      const scrollAmount = containerWidth * 0.8; // Adjust the scroll amount as needed
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handlePreviousClick = () => {
    const container = containerRef.current;
    if (container) {
      const containerWidth = container.offsetWidth;
      const scrollAmount = containerWidth * -0.8; // Adjust the scroll amount as needed
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  useEffect(() => {
    if (todayRef.current && items && !initScroll) {
      todayRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setinitScroll(true);
    }
  }, [todayRef, items, initScroll]);

  return (
    <div className="bg-black/60 relative z-0 backdrop-blur-3xl flex items-center flex-1 overflow-x-scroll scrollbar-hide rounded-full">
      {currentPage > 0 && (
        <div
          onClick={handlePreviousClick}
          className="text-white cursor-pointer px-4 md:px-6"
        >
          <div className="w-5 md:w-6 h-3 md:h-4 rotate-180">
            <TripleArrowRightIcon />
          </div>
        </div>
      )}
      <div
        className="flex items-center p-1 gap-3 md:gap-4 overflow-x-scroll scrollbar-hide snap-mandatory snap-x"
        ref={containerRef}
      >
        {items?.map((day) => {
          const targetDay = format(day.unix, "EEEE").toLowerCase() as Day;
          const restDay = !workoutDays?.includes(targetDay);
          const today = isToday(day.unix);
          return (
            <div
              key={day.date}
              onClick={() => handleClick(day.unix, day)}
              className={clsx(
                "text-center min-w-[80px] sm:min-w-[100px] lg:min-w-[115px] py-1.5 sm:py-2 lg:py-2.5 font-popSB transition-all duration-300 cursor-pointer text-[10px] sm:text-xs md:text-sm lg:text-base snap-center",

                currentPage === day.unix
                  ? "bg-white/70 rounded-full text-[#262327]"
                  : today
                  ? "bg-white/10 text-white rounded-full"
                  : "text-white"
              )}
            >
              {restDay && day.unix > startUnixDayStart ? (
                <div className="flex items-center gap-1 justify-center px-2">
                  <div className="w-3 sm:w-4 lg:w-5 aspect-1">
                    <RestDayIcon
                      color={currentPage === day.unix ? "#414041" : "#FFFFFFB2"}
                    />
                  </div>
                  <p className="">Rest Day</p>
                </div>
              ) : startUnixDayStart === day.unix ? (
                <div className="flex items-center gap-1 justify-center px-2">
                  <div className="w-3 sm:w-3.5 lg:w-4 aspect-1 ">
                    <StarIcon
                      color={currentPage === day.unix ? "#414041" : "#FFFFFFB2"}
                    />
                  </div>
                  {today ? (
                    <div ref={todayRef}>Today</div>
                  ) : (
                    <p className="">{format(day.unix, "d LLL")}</p>
                  )}
                </div>
              ) : today ? (
                <div ref={todayRef}>Today</div>
              ) : (
                format(day.unix, "d LLL")
              )}
            </div>
          );
        })}
      </div>

      <div onClick={handleNextClick} className="text-white cursor-pointer px-6">
        <div className="w-5 md:w-6 h-3 md:h-4 ">
          <TripleArrowRightIcon />
        </div>
      </div>
    </div>
  );
};

export default DayPaginationV2;
