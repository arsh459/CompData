import { CheckIcon } from "@heroicons/react/solid";
import React from "react";
import { ListCardBonus } from "./utils";

interface Props {
  plan: ListCardBonus;
  headingColor?: string;
}

const BonusListCard: React.FC<Props> = ({ plan, headingColor }) => {
  return (
    <div className="flex-1">
      <div
        className={`flex flex-row px-2.5 m-4 my-5  items-center rounded-[20px]`}
      >
        <div className="w-9">
          <img src={plan.iconUri} className="w-full aspect-1 rounded-full" />
        </div>
        <div className="flex-1 p-2.5">
          {plan.mainText && (
            <p
              className={`text-sm md:text-lg font-nunitoM ${
                headingColor ? headingColor : "text-[#FFFFFFB2]"
              }`}
            >
              {plan.mainText}
            </p>
          )}
        </div>
        {/* <img
          src={rightArrowIconBonusList}
          className="w-5 iphoneX:w-7 aspect-1"
        /> */}
        <div className="w-fit">
          <CheckIcon className="w-5 aspect-[10/7]" />
        </div>
      </div>
    </div>
  );
};

export default BonusListCard;
