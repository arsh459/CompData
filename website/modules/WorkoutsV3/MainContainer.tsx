// import SelectWorkout from "@modules/WorkoutsV3/SelectWorkout";
import { UserInterface } from "@models/User/User";
import { workoutTypes } from "@hooks/tasks/useWorkoutV3Params";
import ComponentWrapper from "./ComponentWrapper";
import CreateYourOwnTask from "./CreateYourOwnTask";
import ConnectWearables from "./ConnectWearables";
import WearableInfo from "./WearableInfo";
import ConnectYourWearable from "./ConnectYourWearable";
import WearableConnected from "./WearableConnected";
// import PreviewWorkout from "./PreviewWorkout";
// import TaskPreview from "./TaskPreview";
import PostWorkout from "./PostWorkout";
import { labelType } from "@models/Tasks/Task";
import { EventInterface } from "@models/Event/Event";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import WorkoutPreviewHolder from "./WorkoutPreviewHolder";
import ProgramHome from "./ProgramHome/ProgramHome";
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
}

const MainContainer: React.FC<Props> = ({
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

  // console.log("activeTab", activeTab);
  switch (activeTab) {
    case "select_workout":
      return (
        // <SelectWorkout
        //   onBack={onGoToTeam}
        //   gameId={gameId}
        //   rounds={game.configuration?.rounds}
        //   gameStarts={game.configuration?.starts}
        //   onSummaryClick={onSummaryClick}
        //   gotoComponent={() => onNavChange("create_workout")}
        // />

        <ProgramHome
          user={user}
          onWorkoutClick={onWorkoutClick}
          leaderKey={leaderKey}
          coachUID={coachUID}
          eventKey={eventKey}
          game={game}
          teamId={eventId}
          onBack={onGoToTeam}
        />
      );
    case "create_workout":
      return (
        <ComponentWrapper onBack={() => onNavChange("select_workout")}>
          <CreateYourOwnTask
            gotoComponent={() => {
              onNavChange("connect_wearables");
              shareCustomWorkout("create_workout");
            }}
          />
        </ComponentWrapper>
      );
    case "connect_wearables":
      return (
        <ComponentWrapper onBack={() => onNavChange("create_workout")}>
          <ConnectWearables
            goToUpload={() => {
              onTerraWorkout();
              weEventTrack("startWorkout_connectWearable", {});
            }}
            gotoComponent={() => {
              onNavChange(
                user.terraUser ? "wearable_connected" : "wearable_info"
              );
              weEventTrack("startWorkout_connectWearable", {
                screenName: "connect_wearables",
              });
            }}
          />
        </ComponentWrapper>
      );
    case "wearable_info":
      return (
        <ComponentWrapper onBack={() => onNavChange("connect_wearables")}>
          <WearableInfo
            uid={user.uid}
            leaderKey={leaderKey}
            eventKey={eventKey}
          />
        </ComponentWrapper>
      );
    case "connect_your_wearable":
      return (
        <ConnectYourWearable
          gotoComponent={() => onNavChange("wearable_connected", true)}
          terraUser={user.terraUser}
        />
      );
    case "wearable_connected":
      return (
        <ComponentWrapper onBack={() => onNavChange("wearable_info")}>
          <WearableConnected
            uid={user.uid}
            terraUser={user.terraUser}
            gotoComponent={() => onNavChange("connect_wearables")}
            onPost={onTerraWorkout}
          />
        </ComponentWrapper>
      );
    case "preview_workout":
    case "task_preview":
      return (
        <WorkoutPreviewHolder
          user={user}
          activeTab={activeTab}
          taskId={taskId}
          onBack={onBack}
          summaryType={summaryType}
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
        <PostWorkout
          gameId={gameId}
          postId={postId}
          eventId={eventId}
          coachUID={coachUID}
          onBack={onBack}
          onGoToTeam={onGoToTeam}
          user={user}
          taskId={taskId}
          eventStarts={game.eventStarts}
          roundLength={game.roundLength}
          sprintLength={game.sprintLength}
          onNavReplace={onNavReplace}
        />
      );
    default:
      return null;
  }
};

export default MainContainer;
