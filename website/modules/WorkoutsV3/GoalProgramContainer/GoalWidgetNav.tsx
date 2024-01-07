import clsx from "clsx";
import React from "react";

export type navItemsType = "goal" | "Track Goal" | "prizes" | "team";
// const navItems: navItemsType[] = ["goal", "prizes", "team"];

interface Props {
  selectedNav: navItemsType;
  navItems: navItemsType[];
  setSelectedNav: (val: navItemsType) => void;
}
const GoalWidgetNav: React.FC<Props> = ({
  selectedNav,
  navItems,
  setSelectedNav,
}) => {
  return (
    <div className="flex bg-[#333333] rounded-[1.3rem]">
      {navItems.map((item, index) => {
        return (
          <div key={`${item}-${index}`} className="flex-1 w-1/3 cursor-pointer">
            <p
              className={clsx(
                "py-1 iphoneX:py-2 iphoneX:text-lg rounded-full capitalize text-center transition-all",
                selectedNav === item
                  ? "bg-[#4F4F4F] text-white font-medium"
                  : "text-white/25"
              )}
              onClick={() => setSelectedNav(item)}
            >
              {item}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default GoalWidgetNav;
