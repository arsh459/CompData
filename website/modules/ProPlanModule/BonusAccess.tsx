import React from "react";
import BonusListCard from "./BonusListCard";
import { bonusListCard } from "./utils";

const BonusAccess = () => {
  return (
    <div className="mt-0 rounded-[35px]">
      <div>
        <p className="text-sm iphoneX:text-base md:text-3xl font-nunitoB py-4 text-white">
          Bonus Access
        </p>
      </div>
      {bonusListCard.map((plan, index) => (
        <BonusListCard
          key={`${plan.mainText}-${index}`}
          plan={plan}
          headingColor="text-[#FFFFFFB2]"
        />
      ))}
    </div>
  );
};

export default BonusAccess;
