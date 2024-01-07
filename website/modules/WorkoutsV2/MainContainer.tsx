import SelectWorkout from "@modules/WorkoutsV2/selectWorkout";
import InprogressWorkout from "@modules/WorkoutsV2/inProgressWorkout";
import SummaryWorkout from "@modules/WorkoutsV2/summaryWorkout";
import PostWorkout from "@modules/WorkoutsV2/postWorkout";
import { UserInterface } from "@models/User/User";
import { workoutTypes } from "@hooks/tasks/useWorkoutV2Params";
import CaptureMedia from "@modules/WorkoutsV2/captureMedia";
import WearableConnectV2 from "@templates/community/Program/WearableConnect/WearableConnectV2";
import { taskType } from "@models/Tasks/Task";
import MediaTask from "./MediaTask";

interface Props {
  user: UserInterface;
  activeTab: workoutTypes;
  onWorkoutClick: (id: string, type?: taskType) => void;
  taskId: string;
  onNavChange: (newNav: workoutTypes) => void;
  onBack: () => void;
  parentId: string;
  coachKey: string;
  eventKey: string;
  streamId: string;
  onSelfieRequest: (newId: string) => void;
  onGoToTeam: () => void;
  onStreamIdUpdate: (newId: string) => void;
}

// SHUBHAM -> Note this
// export interface SelectedWorkout {
//   name: string;
//   avatar: string;
//   cal: string;
//   rank: string;
//   time: string;
// }

const MainContainer: React.FC<Props> = ({
  user,
  activeTab,
  onWorkoutClick,
  taskId,
  onBack,
  onNavChange,
  parentId,
  coachKey,
  eventKey,
  streamId,
  onSelfieRequest,
  onGoToTeam,
  onStreamIdUpdate,
}) => {
  switch (activeTab) {
    case "wearable_prompt":
      return (
        <div>
          <WearableConnectV2
            uid={user?.uid}
            onBack={onGoToTeam}
            workout={true}
            leaderKey={coachKey}
            onSkip={() => onNavChange("select_workout")}
            eventKey={eventKey}
          />
        </div>
      );
    case "select_workout":
      return (
        <SelectWorkout
          onBack={onGoToTeam}
          isAdmin={user.role ? true : false}
          key={activeTab}
          onSelectWorkoutFn={onWorkoutClick}
        />
      );
    case "inprogress_workout":
      return (
        <>
          <InprogressWorkout
            key={activeTab}
            user={user}
            taskId={taskId}
            onNavChange={onNavChange}
            onBack={onBack}
          />
        </>
      );
    case "workout_summary":
      return (
        <SummaryWorkout
          onSelfieRequest={onSelfieRequest}
          onBack={onBack}
          parentId={parentId}
          coachKey={coachKey}
          user={user}
          taskId={taskId}
        />
      );
    case "capture_media":
      return (
        <CaptureMedia
          onStreamIdUpdate={onStreamIdUpdate}
          taskId={taskId}
          uid={user.uid}
          user={user}
          onPostRequest={() => onNavChange("post_workout")}
          onBack={onBack}
        />
      );
    case "post_workout":
      return (
        <PostWorkout
          streamId={streamId}
          taskId={taskId}
          uid={user.uid}
          user={user}
          onBack={onBack}
          parentId={parentId}
          onGoToTeam={onGoToTeam}
        />
      );
    case "media_task":
      return (
        <MediaTask
          taskId={taskId}
          user={user}
          onNextFn={() => onNavChange("post_workout")}
          onStreamIdUpdate={onStreamIdUpdate}
          onBack={() => onNavChange("select_workout")}
        />
      );
    default:
      break;
  }

  return <div />;
};

export default MainContainer;
