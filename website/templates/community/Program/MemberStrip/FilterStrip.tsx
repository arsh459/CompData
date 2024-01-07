import clsx from "clsx";
import { tabs } from "@hooks/community/useEventRanks";

const tabsData: tabs[] = ["Players", "Coaches", "My Team"];

interface Props {
  selectedTab: tabs;
  onClick: (newVal: tabs) => void;
  // isAdmin: boolean;
  // eventId?: string;
}

const FilterStrip: React.FC<Props> = ({
  // eventId,
  selectedTab,
  onClick,
  // isAdmin,
}) => {
  return (
    <>
      <div className="flex items-center justify-start w-full">
        {tabsData.map((item) => {
          return (
            <div
              key={item}
              onClick={() => onClick(item)}
              className={clsx(
                "w-1/3 py-4 cursor-pointer",
                "bg-blue-800",
                "shadow-sm",
                selectedTab === item
                  ? "border-b-4 border-white"
                  : "border-b-4 border-blue-800"
              )}
            >
              <p
                className={clsx(
                  "text-center",
                  "text-lg",
                  "uppercase",
                  selectedTab === item
                    ? "text-white font-semibold"
                    : "text-gray-200"
                )}
              >
                {item === "Coaches" ? "Teams" : item}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FilterStrip;
