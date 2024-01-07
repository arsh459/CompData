import { UserInterface } from "@models/User/User";
import { workoutTypes } from "@hooks/tasks/useWorkoutV3Params";
// import TaskPreview from "./TaskPreview";
// import PreviewWorkout from "./PreviewWorkout";
// import { getCurrentMonth } from "@hooks/community/challengeWeekUtils/utils";
import { labelType } from "@models/Tasks/Task";

// import { workoutTypes } from "@hooks/tasks/useWorkoutV3Params";
// import ComponentWrapper from "./ComponentWrapper";
// import CreateYourOwnTask from "./CreateYourOwnTask";
// import ConnectWearables from "./ConnectWearables";
// import WearableInfo from "./WearableInfo";
// import ConnectYourWearable from "./ConnectYourWearable";
// import WearableConnected from "./WearableConnected";
// import PreviewWorkout from "./PreviewWorkout";
// import TaskPreview from "./TaskPreview";
// import PostWorkout from "./PostWorkout";
// import { labelType } from "@models/Tasks/Task";
import { EventInterface } from "@models/Event/Event";
// import Header from "../Header";
import GameProgram from "./GameProgram/GameProgram";
// import GoalWidget from "./GoalWidget";
import GoalProgramContainer from "./GoalProgramContainer/GoalProgramContainer";
// import GoalWidgetHome from "./GoalProgramContainer/GoalWidgetHome";
import GoalWidgetWorkout from "./GoalProgramContainer/GoalWidgetWorkout";
import {
  getCurrentMonthV3,
  getCurrentWeekV3,
} from "@hooks/community/challengeWeekUtils/utils";
import { useUserRank } from "@hooks/activities/userUserRank";
import HeaderProgram from "./ProgramHome/HeaderProgram";
import TaskPreviewV2 from "./TaskPreviewV2";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
import { useCoachRank } from "@hooks/activities/useCoachRank";
// import HeaderProgram from "../HeaderProgram";
// import mixpanel from "@config/mixpanel";

interface Props {
  user: UserInterface;
  activeTab: "task_preview" | "select_workout";
  taskId: string;
  onBack: () => void;
  onGoToTeam: () => void;
  summaryType?: labelType;
  onNavChange: (newNav: workoutTypes, replace?: boolean) => void;
  onWorkoutClick: (id: string) => void;
  gameId: string;
  game: EventInterface;
  eventId: string;
  baseShareURL: string;
  leaderKey: string;
  shareCustomWorkout: () => void;
  coachUID: string;
  eventKey: string;
  freeDaysLeft?: number;
  subStatus: subscriptionStatus;
}

const WorkoutPreviewHolderV2: React.FC<Props> = ({
  user,
  summaryType,
  freeDaysLeft,
  activeTab,
  taskId,
  onBack,
  onNavChange,
  gameId,
  game,
  onWorkoutClick,
  eventId,
  baseShareURL,
  leaderKey,
  shareCustomWorkout,
  coachUID,
  eventKey,
  subStatus,
  onGoToTeam,
}) => {
  const { roundEndUnix, roundStartUnix, isFinale, roundId } = getCurrentWeekV3(
    game?.configuration?.rounds,
    game?.configuration?.starts,
    game?.configuration?.challengeLength
  );
  const { rangeDate, sprintId, nowObj, defaultObj, lastSprintId } =
    getCurrentMonthV3(
      game.configuration?.sprints,
      game.configuration?.starts,
      game.configuration?.challengeLength,
      game.configuration?.rounds,
      undefined,
      game.configuration?.pinnedSprintId
    );

  const { myUserRank } = useUserRank(game.id, user.uid);
  const { myCoachRank } = useCoachRank(
    game.id,
    game.configuration?.gameType === "team" ? coachUID : undefined
  );
  const userRank =
    myUserRank?.monthlyRank && sprintId
      ? myUserRank?.monthlyRank[sprintId]
      : -1;

  // console.log("s here", roundStartUnix);

  switch (activeTab) {
    case "select_workout":
      return (
        <>
          <HeaderProgram
            onBack={onGoToTeam}
            freeDaysLeft={
              freeDaysLeft && freeDaysLeft >= 0 ? freeDaysLeft : undefined
            }
            heading={game.name}
          />
          <GoalProgramContainer
            total={1}
            topRightText={`Lvl ${user.userLevelV2 ? user.userLevelV2 : 0}`}
          >
            <GoalWidgetWorkout
              uid={user.uid}
              teamId={eventId}
              // gameTasks={game.configuration?.goals}
              kpis={game.configuration?.kpis ? game.configuration.kpis : []}
              gameId={game.id}
              sprintId={sprintId}
              lastSprintId={lastSprintId}
              roundId={roundId}
              myUserRank={myUserRank}
              myCoachRank={myCoachRank}
              gameType={game.configuration?.gameType}
              leaderKey={leaderKey}
              coachUID={coachUID}
              eventKey={eventKey}
              user={user}
              navItems={
                game.configuration?.topNav
                  ? game.configuration.topNav
                  : ["goal", "Track Goal", "team"]
              }
              bottomButtons={false}
              hidePlayNow={true}
              // roundStartUnix={roundStartUnix}
            />
          </GoalProgramContainer>
          <GameProgram
            user={user}
            game={game}
            myUserRank={myUserRank}
            roundEndUnix={roundEndUnix}
            roundStartUnix={roundStartUnix}
            isFinale={isFinale}
            userRank={userRank}
            rangeDate={rangeDate}
            nowObj={nowObj}
            defaultObj={defaultObj}
            sprintId={sprintId}
            onTaskClick={onWorkoutClick}
            teamId={eventId}
          />
        </>
      );
    case "task_preview":
      return (
        <TaskPreviewV2
          onBack={() => onNavChange("select_workout")}
          taskId={taskId}
          gameId={gameId}
          eventId={eventId}
          goToPost={() => onNavChange("post_workout")}
          uid={user.uid}
          userLevel={user.userLevelV2}
          baseShareURL={baseShareURL}
          roundStartUnix={roundStartUnix}
          isFinaleActive={nowObj?.isFinale}
          rank={userRank}
          currentDayNumber={nowObj?.dayNumber}
          gameType={game.configuration?.gameType}
          gameStarts={game.configuration?.starts}
          dayStartProgram={
            nowObj?.startUnix ? nowObj.startUnix : defaultObj?.startUnix
          }
        />
      );

    default:
      return null;
  }
};

export default WorkoutPreviewHolderV2;
