// import SelectWorkout from "@modules/WorkoutsV3/SelectWorkout";
import { UserInterface } from "@models/User/User";
import { workoutTypes } from "@hooks/tasks/useWorkoutV3Params";
// import ComponentWrapper from "./ComponentWrapper";
// import CreateYourOwnTask from "./CreateYourOwnTask";
// import ConnectWearables from "./ConnectWearables";
// import WearableInfo from "./WearableInfo";
// import ConnectYourWearable from "./ConnectYourWearable";
// import WearableConnected from "./WearableConnected";
// import PreviewWorkout from "./PreviewWorkout";
// import TaskPreview from "./TaskPreview";
// import PostWorkout from "./PostWorkout";
import { labelType } from "@models/Tasks/Task";
import { EventInterface } from "@models/Event/Event";
import { weEventTrack } from "@analytics/webengage/user/userLog";
// import WorkoutPreviewHolder from "./WorkoutPreviewHolder";
// import ProgramHome from "./ProgramHome/ProgramHome";
import WorkoutPreviewHolderV2 from "./WorkoutPreviewHolderV2";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
import PostWorkoutV2 from "./PostProgramV2";
// import mixpanel from "@config/mixpanel";

interface Props {
  user: UserInterface;
  activeTab: workoutTypes;
  taskId: string;
  onBack: () => void;
  onWorkoutClick: (id: string) => void;
  summaryType?: labelType;
  onSummaryClick: (summaryType: labelType) => void;
  onGoToTeam: () => void;
  onNavChange: (newNav: workoutTypes, replace?: boolean) => void;
  onNavReplace: (newNav: workoutTypes) => void;
  onTerraWorkout: () => void;
  gameId: string;
  leaderKey: string;
  coachUID: string;
  eventKey: string;
  eventId: string;
  game: EventInterface;
  postId?: string;
  teamName?: string;
  freeDaysLeft?: number;
  subStatus: subscriptionStatus;
}

const MainContainerV2: React.FC<Props> = ({
  user,
  activeTab,
  summaryType,
  taskId,
  onBack,
  onNavChange,
  onGoToTeam,
  onWorkoutClick,
  onTerraWorkout,
  onSummaryClick,
  subStatus,

  freeDaysLeft,
  gameId,
  leaderKey,
  eventKey,
  game,
  eventId,
  coachUID,
  postId,
  onNavReplace,
  teamName,
}) => {
  //   console.log("activeTab", activeTab);
  const shareCustomWorkout = (screenName: string) => {
    weEventTrack("startWorkout_shareCustomWorkout", {
      gameName: game.name,
      teamName: teamName ? teamName : "no_teanName",
      screenName,
    });
  };

  switch (activeTab) {
    case "select_workout":
    case "task_preview":
      return (
        <WorkoutPreviewHolderV2
          user={user}
          freeDaysLeft={freeDaysLeft}
          subStatus={subStatus}
          activeTab={activeTab}
          taskId={taskId}
          onBack={onBack}
          onGoToTeam={onGoToTeam}
          summaryType={summaryType}
          coachUID={coachUID}
          eventKey={eventKey}
          onNavChange={onNavChange}
          onWorkoutClick={onWorkoutClick}
          gameId={game.id}
          game={game}
          eventId={eventId}
          baseShareURL={`https://www.socialboat.live/${encodeURI(
            leaderKey
          )}/${encodeURI(eventKey)}`}
          leaderKey={leaderKey}
          shareCustomWorkout={() => shareCustomWorkout("preview_workout")}
        />
      );
    case "post_workout":
      return (
        // <PostWorkout
        //   gameId={gameId}
        //   postId={postId}
        //   eventId={eventId}
        //   coachUID={coachUID}
        //   onBack={onBack}
        //   onGoToTeam={onGoToTeam}
        //   user={user}
        //   taskId={taskId}
        //   eventStarts={game.eventStarts}
        //   roundLength={game.roundLength}
        //   sprintLength={game.sprintLength}
        //   onNavReplace={onNavReplace}
        // />
        <PostWorkoutV2
          onBack={onBack}
          user={user}
          taskId={taskId}
          gameId={gameId}
          eventId={eventId}
          coachUID={coachUID}
          postId={postId}
          onGoToTeam={onGoToTeam}
        />
      );
    default:
      return null;
  }
};

export default MainContainerV2;
