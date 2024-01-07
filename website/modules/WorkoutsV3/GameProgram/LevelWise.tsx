// import { useUserWorkoutTasksByLevel } from "@hooks/tasks/useUserWorkoutTasksByLevel";
import { getLevelColorV3 } from "@templates/LandingPage/levelColor";
import React from "react";
// import GoalProgramCard from "./GoalProgramCard";
import RoundedCircleButton from "./RoundedCircleButton";

interface Props {
  // userLevel?: number;
  // gameId?: string;
  selectedLevel: number;
  setLevel: (newLevel: number) => void;
}

const LevelWise: React.FC<Props> = ({ selectedLevel, setLevel }) => {
  // const [selectedLevel, setLevel] = useState<number>(userLevel ? userLevel : 1);
  // const { tasks } = useUserWorkoutTasksByLevel(selectedLevel, gameId);
  return (
    <>
      <div className="flex items-center   py-2 scrollbar-hide w-full justify-evenly">
        {[1, 2, 3, 4, 5].map((lvl, index) => {
          return (
            <div key={`${lvl}-${index}`} onClick={() => setLevel(lvl)}>
              <RoundedCircleButton
                bgColor={getLevelColorV3(lvl).color}
                ringColor={getLevelColorV3(lvl).color}
                text={`Lvl ${lvl}`}
                noRing={!(selectedLevel === lvl)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LevelWise;
