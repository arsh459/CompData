import { format } from "date-fns";
import { useState } from "react";
import MonthSelectorModal from "./MonthSelectorModal";

interface Props {
  monthStrings: { key: string; value: string }[];
  currentMonth: string;
  selectedMonth: string;
  onLeaderboardMonthChange: (newMonth: string) => void;
  after?: number;
}

const MonthSelector: React.FC<Props> = ({
  monthStrings,
  currentMonth,
  selectedMonth,
  onLeaderboardMonthChange,
  after,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <MonthSelectorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        months={monthStrings}
        selectedMonth={selectedMonth}
        currentMonth={currentMonth}
        onMonthClick={onLeaderboardMonthChange}
      />
      <div
        className="py-2 bg-white border cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {after && after > Date.now() ? (
          <div>
            <p className="text-2xl text-center capitalize font-semibold text-gray-500">
              Game starts {`${format(new Date(after), "dMMM h:mmaaa")}`}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            {monthStrings.map((item) => {
              return (
                <div key={`${item.key}-m`}>
                  {item.key === selectedMonth ? (
                    <p className="text-2xl text-center capitalize font-semibold text-gray-500">
                      {item.value}
                    </p>
                  ) : null}
                </div>
              );
            })}

            {monthStrings.length > 1 ? (
              <div className="pl-2 ">
                <img
                  src="https://img.icons8.com/material-sharp/96/000000/chevron-down.png"
                  className="w-5 h-5 object-cover"
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default MonthSelector;
