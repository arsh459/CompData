// import { UserInterface } from "@models/User/User";
// import FinaleCard from "@modules/FinaleCard/FinaleCard";
import React from "react";
// import GrandFinaleCard from "../GrandFinaleCard";
// import GoalProgramCard from "../GoalProgramCard";
// import RoundedCircleButton from "./RoundedCircleButton";
import clsx from "clsx";
// import { format } from "date-fns";
// import { DaysScroll } from "../DaysScroll";
// import { EventInterface } from "@models/Event/Event";
// import { getCurrentMonthV3 } from "@hooks/community/challengeWeekUtils/utils";
// import LevelWise from "../LevelWise";
// import { useUserWorkoutTasksByLevel } from "@hooks/tasks/useUserWorkoutTasksByLevel";
// import GoalWidgetNav from "../GoalProgramContainer/GoalWidgetNav";
// import GoalWidgetHome from "../GoalProgramContainer/GoalWidgetHome";
interface Props {
  text: string;
  onClick: () => void;
  selected: boolean;
}
// type SelectedType = "yourProgram" | "all";
const ToggleButton: React.FC<Props> = ({ text, onClick, selected }) => {
  return (
    <p
      className={clsx(
        "flex-1 whitespace-nowrap",
        "p-2 mx-4 text-center rounded-xl",
        selected
          ? "text-white bg-gradient-to-t from-[#0075E0] to-[#00AAE0]"
          : "text-[#417EAA]"
      )}
      onClick={onClick}
    >
      {text}
    </p>
  );
};

export default ToggleButton;
