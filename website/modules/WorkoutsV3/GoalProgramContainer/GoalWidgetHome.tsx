import React, { useState } from "react";
import GoalModal from "../GoalModal";
import GoalModalWidget from "../GoalModalWidget";
// import BottomButtons from "./BottomButtons";
// import GoalProgressWidget from "./GoalProgressWidget";
// import GoalWidgetNav from "./GoalWidgetNav";
// import PrizeList from "./PrizeList";
import TeamList from "./TeamList";
const sampleData = [
  { percent: 100, color: "#2096E8" },
  { percent: 70, color: "#F19B38" },

  { percent: 60, color: "#F15454" },
];
interface Props {
  isGoalSection?: boolean;
}

const GoalWidgetHome: React.FC<Props> = ({ isGoalSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNav] = useState("goal");

  return (
    <div>
      {!isGoalSection && (
        <></>
        // <GoalWidgetNav
        //   selectedNav={selectedNav}
        //   setSelectedNav={setSelectedNav}
        // />
      )}
      {!isGoalSection && selectedNav === "prizes" && (
        <div className="text-white">{/* <PrizeList /> */}</div>
      )}
      {!isGoalSection && selectedNav === "team" && (
        <div className="text-white">
          <TeamList />
        </div>
      )}
      {!isGoalSection && selectedNav === "goal" && (
        <>
          <div className="my-4">
            {/* <GoalProgressWidget
              circleSize={180}
              data={sampleData}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              distance={139}
              pace={7}
              time={79}
            /> */}
          </div>
          {/* <BottomButtons /> */}
        </>
      )}
      {isGoalSection && (
        <>
          <div className="my-4">
            {/* <GoalProgressWidget
              circleSize={180}
              data={sampleData}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              distance={139}
              pace={7}
              time={79}
            /> */}
          </div>
          <GoalModalWidget isOpen={isOpen} setIsOpen={setIsOpen} />
          <GoalModal
            circleSize={180}
            data={sampleData}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            distance={139}
            pace={7}
            time={79}
          />
        </>
      )}
    </div>
  );
};

export default GoalWidgetHome;
