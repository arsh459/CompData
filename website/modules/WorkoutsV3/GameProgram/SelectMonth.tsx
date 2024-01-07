import { dateObject } from "@hooks/tasks/program/useProgramTasks";
import clsx from "clsx";
// import { format, parseISO } from "date-fns";
import React from "react";
interface Props {
  daysArray: dateObject[];
  selectedMonth: string;
  setMonth: (val: string) => void;
  onClose: () => void;
}
const SelectMonth: React.FC<Props> = ({
  daysArray,
  setMonth,
  selectedMonth,
  onClose,
}) => {
  const onMonthSelect = (val: string) => {
    setMonth(val);
    onClose();
  };
  return (
    <div className=" flex flex-col py-2 text-[#59A4DA] mx-auto ">
      <div className="flex py-3 items-center mx-6">
        <span
          onClick={() => onMonthSelect("")}
          className="flex-[0.7] whitespace-nowrap cursor-pointer"
        >
          All
        </span>
        <img
          src="https://ik.imagekit.io/socialboat/Vector__5__oHzOEHDGu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656615127230"
          className={clsx(selectedMonth ? "hidden" : "ml-4 w-4 h-4 ")}
        />
      </div>
      {daysArray &&
        Array.from(new Set(daysArray.map((i) => i.monthName))).map(
          (monthName, index) => {
            return (
              <div
                key={`${monthName}-${index}`}
                className="flex py-3 items-center mx-6"
              >
                <span
                  onClick={() => onMonthSelect(monthName)}
                  className={clsx(
                    "flex-[0.7] whitespace-nowrap text-lg cursor-pointer",
                    monthName === selectedMonth ? "font-semibold" : ""
                  )}
                >
                  {monthName}
                </span>
                <img
                  src="https://ik.imagekit.io/socialboat/Vector__5__oHzOEHDGu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656615127230"
                  className={clsx(
                    monthName !== selectedMonth ? "hidden" : "ml-4 w-4 h-4"
                  )}
                />
              </div>
            );
          }
        )}
    </div>
  );
};

export default SelectMonth;
