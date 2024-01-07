import { UserInterface } from "@models/User/User";
// import FinaleCard from "@modules/FinaleCard/FinaleCard";
import React, { useState } from "react";
import { DaysScroll } from "./DaysScroll";
import { EventInterface } from "@models/Event/Event";
// import {
// getCurrentMonthV3,
// getCurrentWeekV3,
// } from "@hooks/community/challengeWeekUtils/utils";
import LevelWise from "./LevelWise";
// import { useUserWorkoutTasksByLevel } from "@hooks/tasks/useUserWorkoutTasksByLevel";
// import GoalWidgetNav from "../GoalProgramContainer/GoalWidgetNav";
// import GoalWidgetHome from "../GoalProgramContainer/GoalWidgetHome";
import ToggleButton from "./ToggleButton";
// import TaskCards from "./TaskCards";
import {
  dateObject,
  useProgramTasks,
} from "@hooks/tasks/program/useProgramTasks";
// import { useUserRank } from "@hooks/activities/userUserRank";
import { UserRank } from "@models/Activities/Activity";
import SelectMonthModal from "./SelectMonthModal";
import { arrowDownBlue } from "@constants/icons/iconURLs";
// import GrandFinaleCard from "../GrandFinaleCard";
import TaskCards from "./TaskCards";
// import { Task } from "@models/Tasks/Task";
interface Props {
  user: UserInterface;
  game: EventInterface;
  rangeDate?: dateObject[];
  sprintId?: string;
  nowObj?: dateObject;
  defaultObj?: dateObject;
  roundEndUnix?: number;
  roundStartUnix?: number;
  isFinale?: boolean;
  myUserRank?: UserRank;
  userRank: number;
  onTaskClick: (id: string) => void;
  teamId: string;
}
// type SelectedType = "yourProgram" | "all";
const GameProgram: React.FC<Props> = ({
  user,
  game,
  rangeDate,
  sprintId,
  nowObj,
  roundEndUnix,
  roundStartUnix,
  isFinale,
  myUserRank,
  userRank,
  onTaskClick,
  defaultObj,
  teamId,
}) => {
  // console.log(user?.userLevelV2);

  // console.log(rangeDate, "rangeDate");
  // console.log(user?.userLevelV2, "DPO");
  // console.log(game, "ImGame");
  // // console.log(format(15, "yyyy-MM-dd"));
  // loading && console.log(tasks);

  // // game.configuration?.starts &&
  // //   console.log(
  // //     "dayElapsed",
  // //     Math.round(
  // //       (Date.now() - game.configuration?.starts / 24) * 60 * 60 * 1000
  // //     )
  // //   );
  const {
    browseBy,
    setBrowseBy,
    selectedDay,
    setDay,
    tasks,
    setLevel,
    selectedLevel,
  } = useProgramTasks(
    user?.userLevelV2,
    game.id,
    nowObj,
    defaultObj,
    game?.configuration?.starts
  );
  const [selectedMonth, setMonth] = useState<string>(
    nowObj?.monthName
      ? nowObj.monthName
      : defaultObj
      ? defaultObj.monthName
      : ""
  );

  const [isOpen, setIsOpen] = useState(false);

  // const [browseBy, setBrowseBy] = useState<SelectedType>("yourProgram");
  // const [selectedDay, setDay] = useState<string>(
  // format(new Date(), "yyyy-MM-dd")
  // );

  // console.log("selectedDay", selectedDay?.startUnix, selectedDay?.dayNumber);
  return (
    <div className="py-4">
      <div className="flex bg-white items-center text-[#417EAA] cursor-pointer font-extrabold iphoneX:text-xl">
        <ToggleButton
          selected={browseBy === "yourProgram"}
          onClick={() => setBrowseBy("yourProgram")}
          text="Your Program"
        />
        <ToggleButton
          selected={browseBy === "all"}
          onClick={() => setBrowseBy("all")}
          text="Browse All"
        />
      </div>

      {browseBy === "yourProgram" && rangeDate ? (
        <div className="bg-gradient-to-b from-white to-[#E6F1FA] py-2 mb-2">
          <div>
            <div
              onClick={() => setIsOpen(true)}
              className="py-1 border border-[#e3f1fc] mx-6 px-4 my-5 text-lg rounded-2xl bg-[#F3F9FF] text-[#59A4DA] cursor-pointer flex justify-between"
            >
              {selectedMonth ? selectedMonth : "Select Month"}
              <img src={arrowDownBlue} alt="t" />
            </div>
          </div>
          <SelectMonthModal
            daysArray={rangeDate}
            selectedMonth={selectedMonth}
            setMonth={setMonth}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <div className="flex overflow-x-scroll items-center scrollbar-hide  px-6 pb-2">
            <DaysScroll
              daysArray={rangeDate}
              nowObj={nowObj}
              selectedDay={selectedDay?.formattedDate}
              setDay={setDay}
              dayPointObj={user?.dayPointObj}
              selectedMonth={selectedMonth}
              setMonth={setMonth}
            />
          </div>
        </div>
      ) : browseBy === "all" ? (
        <div className="bg-gradient-to-b from-white to-[#E6F1FA] py-2 mb-2">
          <LevelWise
            // userLevel={user?.level}
            // gameId={game.id}
            selectedLevel={selectedLevel}
            setLevel={setLevel}
          />
        </div>
      ) : null}
      <div>
        <TaskCards
          gameStarts={game?.configuration?.starts}
          isFinaleDay={selectedDay?.isFinale}
          tasks={tasks}
          onTaskClick={onTaskClick}
          dayStartProgram={
            browseBy === "yourProgram"
              ? selectedDay?.startUnix
              : nowObj?.startUnix
              ? nowObj.startUnix
              : defaultObj?.startUnix
          }
          browseBy={browseBy}
          currentDayNumber={nowObj?.dayNumber}
          user={user}
          userRank={userRank}
          weekEndUnix={roundEndUnix}
          weekStartUnix={roundStartUnix}
          gameId={game.id}
          isFinaleActive={isFinale}
          gameType={game.configuration?.gameType}
          teamId={teamId}
        />
      </div>
    </div>
  );
};

export default GameProgram;
