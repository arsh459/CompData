import { CoachRank, UserRank } from "@models/Activities/Activity";
import { GameKPITarget, gameTypes } from "@models/Event/Event";
// import { SystemKPIs } from "@models/Tasks/SystemKPIs";
import { UserInterface } from "@models/User/User";
import React, { useState } from "react";
import BottomButtons from "./BottomButtons";
// import GoalModal from "../GoalModal";
// import GoalModalWidget from "../GoalModalWidget";
import GoalProgressWidget from "./GoalProgressWidget";
import GoalTasks from "./GoalTasks";
import GoalWidgetNav, { navItemsType } from "./GoalWidgetNav";
import PrizeList from "./PrizeList";
import TeamNotifications from "./TeamNotifications";
import { getGoalProgressParams } from "./utils";
// const sampleData = [
//   { percent: 75, color: "#2096E8" },
//   { percent: 70, color: "#F19B38" },

//   { percent: 60, color: "#F15454" },
// ];

interface Props {
  gameId: string;
  // gameTasks?: string[];
  uid: string;

  sprintId?: string;
  roundId?: string;
  myUserRank?: UserRank;
  leaderKey: string;
  coachUID: string;
  kpis: GameKPITarget[];

  eventKey: string;
  user: UserInterface;
  teamId: string;
  navItems: navItemsType[];
  bottomButtons: boolean;
  leftLink?: string;
  rightLink?: string;
  hidePlayNow?: boolean;
  lastSprintId?: string;
  gameType?: gameTypes;
  myCoachRank?: CoachRank;

  // roundStartUnix?: number;
}

const GoalWidgetWorkout: React.FC<Props> = ({
  gameId,
  // gameTasks,
  uid,
  sprintId,
  roundId,
  myUserRank,
  leaderKey,
  coachUID,
  eventKey,
  user,
  teamId,
  navItems,
  bottomButtons,
  leftLink,
  rightLink,
  kpis,
  hidePlayNow,
  lastSprintId,
  myCoachRank,
  gameType,
  // roundStartUnix,
}) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedNav, setSelectedNav] = useState<navItemsType>("goal");

  // const { goals } = useGameGoals(gameTasks);

  const kpiList = getGoalProgressParams(
    // kpis.filter((item) => item.kpi !== "streak"),
    kpis,
    sprintId,
    myUserRank,
    lastSprintId,
    myCoachRank,
    gameType
  );
  // console.log("game", gameTasks);
  // console.log("kpiList", kpiList, kpis);
  // console.log(
  //   kpiList[0]?.progress,
  //   kpiList[1],
  //   kpiList[2],
  //   taskProgressObj,
  //   goals,
  //   gameTasks
  // );

  return (
    <>
      <div className="py-4">
        <GoalWidgetNav
          selectedNav={selectedNav}
          navItems={navItems}
          setSelectedNav={setSelectedNav}
        />
      </div>
      {selectedNav === "Track Goal" ? (
        <div className="h-48 overflow-scroll no-scrollbar scrollbar-hide">
          <GoalTasks uid={uid} gameId={gameId} />
        </div>
      ) : selectedNav === "goal" ? (
        <div className="overflow-scroll no-scrollbar scrollbar-hide">
          <GoalProgressWidget data={kpiList} />
          {bottomButtons && leftLink && rightLink ? (
            <div className="pt-4">
              <BottomButtons leftLink={leftLink} rightLink={rightLink} />
            </div>
          ) : null}
        </div>
      ) : selectedNav === "prizes" ? (
        <div className="h-48 overflow-y-scroll no-scrollbar scrollbar-hide">
          <PrizeList
            gameId={gameId}
            sprintId={sprintId}
            roundId={roundId}
            myUserRank={myUserRank}
            uid={user.uid}
            user={user}
            eventKey={eventKey}
            coachUID={coachUID}
            leaderKey={leaderKey}
            isGoalWidget={true}
            hidePlayNow={hidePlayNow}
            gameKPIs={kpis}
            gameType={gameType}
          />
        </div>
      ) : selectedNav === "team" ? (
        <div className="h-48">
          <TeamNotifications
            gameId={gameId}
            teamId={teamId}
            leaderKey={leaderKey}
          />
        </div>
      ) : null}
    </>
  );
};

export default GoalWidgetWorkout;
