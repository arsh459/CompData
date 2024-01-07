import { UserInterface } from "@models/User/User";
import { workoutTypes } from "@hooks/tasks/useWorkoutV3Params";
import TaskPreview from "./TaskPreview";
import PreviewWorkout from "./PreviewWorkout";
import {
  getCurrentMonth,
  getCurrentWeekV3,
} from "@hooks/community/challengeWeekUtils/utils";
import { labelType } from "@models/Tasks/Task";
import { EventInterface } from "@models/Event/Event";

interface Props {
  user: UserInterface;
  activeTab: "task_preview" | "preview_workout";
  taskId: string;
  onBack: () => void;
  summaryType?: labelType;
  onNavChange: (newNav: workoutTypes, replace?: boolean) => void;
  onWorkoutClick: (id: string) => void;
  gameId: string;
  game: EventInterface;
  eventId: string;
  baseShareURL: string;
  leaderKey: string;
  shareCustomWorkout: () => void;
}

const WorkoutPreviewHolder: React.FC<Props> = ({
  user,
  summaryType,
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
}) => {
  const { roundEndUnix, roundStartUnix, isFinale } = getCurrentWeekV3(
    game?.configuration?.rounds,
    game?.configuration?.starts,
    game?.configuration?.challengeLength
  );

  const sprintId = getCurrentMonth(
    game?.configuration?.sprints,
    game?.configuration?.starts,
    game?.configuration?.challengeLength
  );

  switch (activeTab) {
    case "preview_workout":
      return (
        <PreviewWorkout
          summaryType={summaryType}
          shareCustomWorkout={shareCustomWorkout}
          game={game}
          leaderKey={leaderKey}
          userLevel={user.userLevelV2 ? user.userLevelV2 : 0}
          onBack={onBack}
          onNavChange={onNavChange}
          onWorkoutClick={onWorkoutClick}
          isAdmin={user.role === "admin"}
          uid={user.uid}
          roundStartUnix={roundStartUnix}
          roundEndUnix={roundEndUnix}
          isFinale={isFinale}
          sprintId={sprintId}
          activeFitPointsV2={user.activeFitPointsV2}
          sprints={game?.configuration?.sprints}
          eventStarts={game?.configuration?.starts}
          rounds={game?.configuration?.rounds}
          challengeLength={game?.configuration?.challengeLength}
        />
      );
    case "task_preview":
      return (
        <TaskPreview
          onBack={onBack}
          taskId={taskId}
          gameId={gameId}
          eventId={eventId}
          goToPost={() => onNavChange("post_workout")}
          uid={user.uid}
          userLevel={user.userLevelV2}
          baseShareURL={baseShareURL}
          roundStartUnix={roundStartUnix}
        />
      );

    default:
      return null;
  }
};

export default WorkoutPreviewHolder;
