import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import TaskSubmitV3 from "@modules/Workout/ProgramDetails/TaskSubmitV3";
import { useRoute } from "@react-navigation/native";
import { UploadTaskParams } from "./UploadTask";
import { useWorkoutTaskZustand } from "@hooks/program/useWorkoutTaskZustand";

const UploadTaskV2 = () => {
  const route = useRoute();
  useScreenTrack();

  const params = route.params as UploadTaskParams;

  const { initDone } = useWorkoutTaskZustand(
    params.taskId,
    params.attemptedDate
  );

  // console.log("main load");

  return (
    // <SubscriptionProvider>
    // <PlainTaskProvider selectedTaskId={params.taskId}>
    <TaskSubmitV3 initDone={initDone} />
    // </PlainTaskProvider>
    // </SubscriptionProvider>
  );
};

export default UploadTaskV2;

/**
 * create post, activity and stream on init
 * start and pause stream.
 *
 */
