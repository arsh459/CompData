import { EventInterface } from "@models/Event/Event";
import { UserInterface } from "@models/User/User";
import React, { useState } from "react";
// import CirclePercentV2 from "./CircleRings/CirclePercentV2";
import GoalModal from "./GoalModal";
import GoalModalWidget from "./GoalModalWidget";
// import GoalWidgetNav from "./GoalProgramContainer/GoalWidgetNav";

import YourGoalData from "./YourGoalData";
interface Props {
  user?: UserInterface;
  game?: EventInterface;
}
const GoalWidget: React.FC<Props> = ({ user, game }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sampleData = [
    { percent: 60, color: "#2096E8" },
    { percent: 70, color: "#F19B38" },

    { percent: 60, color: "#F15454" },
  ];
  return (
    <div className="rounded-xl flex flex-col h-full justify-between border border-[#797979] py-4 px-4 mx-2 bg-gradient-to-b from-[#2B2B2B] to-black">
      <div className="flex items-center justify-between mt-4 ">
        <h5 className="text-white font-semibold">30km Marathon </h5>
        <h5 className="text-[#F19B38]">Lvl 3</h5>
      </div>

      <div className="flex justify-between  py-2 gap-2">
        <div>
          {/* <CirclePercentV2 circleSize={180} data={sampleData} /> */}
        </div>
        <YourGoalData />
      </div>
      <div className=" py-2">
        <GoalModalWidget isOpen={isOpen} setIsOpen={setIsOpen} />
        <GoalModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          circleSize={180}
          data={sampleData}
        />
      </div>
    </div>
  );
};

export default GoalWidget;
