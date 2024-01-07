import Fireicon from "../../public/icons/FireIcon";
import BackIcon from "../../public/icons/BackIcon";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
// import { getHeight } from "@templates/community/Program/getAspectRatio";
import Divider from "@components/divider/Divider";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useWorkoutTrackingTasks } from "@hooks/tasks/useWorkoutTrackingTasks";
import { UserInterface } from "@models/User/User";
import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import {
  getFitPointString,
  getProgressFitPoint,
  getTimerSecondsString,
} from "@modules/PaymentPopover/utils";
import { capitalize } from "@mui/material";
import VoidWorkoutModal from "./VoidWorkoutModal";
import { workoutTypes } from "@hooks/tasks/useWorkoutV2Params";
import LeaveWorkoutModal from "./LeaveWorkoutModal";

interface Props {
  user: UserInterface;
  taskId: string;
  onBack: () => void;
  onNavChange: (newTab: workoutTypes) => void;
}

// startTime
// now in js
// stream second calculation absolute basis difference

const InprogressWorkout: React.FC<Props> = ({
  taskId,
  onBack,
  user,
  onNavChange,
}) => {
  const {
    handleStreaming,
    streamState,
    streamedSeconds,
    stopWorkoutModal,
    onVoidWorkout,
    closeWarningModal,
    onPauseWorkout,
    onRequestLeaveLive,

    // onRequestLeave,
    // onEnd,
    // onPlay,
    // onLeaveLiveVideo,
    userStream,
  } = useWorkoutTrackingTasks(user, taskId);

  const { task } = useWorkoutTask(taskId);

  // console.log("userStream", userStream);

  const { prog, round } = getProgressFitPoint(
    userStream?.streamedSeconds,
    task?.durationMinutes
  );

  const onFinishWorkout = () => {
    onPauseWorkout();
    onNavChange("workout_summary");
  };

  // on leave workout
  const onRequestLeaveWorkout = async () => {
    // active state
    // if (userStream?.state === "active") {
    // } else {
    // }

    await onPauseWorkout();
    onBack();
  };

  // return <div></div>;

  // const workoutResult = { time: "1:10:15", cal: "300", rank: "132" };
  return (
    <>
      <VoidWorkoutModal
        isOpen={stopWorkoutModal === "void"}
        onEnd={onVoidWorkout}
        onBackdrop={closeWarningModal}
        onButtonPress={closeWarningModal}
        onCloseModal={closeWarningModal}
      />
      <LeaveWorkoutModal
        isOpen={stopWorkoutModal === "leave"}
        onLeaveWorkout={onRequestLeaveWorkout}
        points={round}
        onCloseModal={closeWarningModal}
      />
      <div className="bg-gray-100 text-center shadow">
        <div
          className="text-left m-4 mt-0 pt-6 flex items-center text-2xl"
          onClick={onRequestLeaveLive}
        >
          <BackIcon style={{ height: "30", width: "30", fill: "gray" }} />{" "}
        </div>
        <div className="">
          {task?.avatar && (
            <MediaTile
              alt={task?.name ? task.name : "task"}
              media={task?.avatar}
              width={400}
              height={300}
            />
          )}
          {/* <h1 className="text-3xl font-bold mt-5">{selectedWorkout?.name}</h1>
          <h1 className="text-2xl font-bold mt-5 text-gray-700 flex justify-center">
            <Fireicon style={{ height: "30", width: "30" }} /> &nbsp;
            {selectedWorkout?.cal} Cal/hr
          </h1> */}
        </div>
      </div>
      <div className="mt-5 px-4">
        <h1 className="text-3xl text-gray-700 font-semibold ">
          {capitalize(task?.name ? task?.name : "")}
        </h1>
        <p className="text-xl flex items-center pt-1 text-gray-500">
          <Fireicon style={{ height: "25", width: "25" }} /> &nbsp;
          {getFitPointString(task?.fitPoints, task?.durationMinutes)}
        </p>
      </div>

      <div className="py-4 px-4">
        <Divider />
      </div>

      <div className="">
        <div className="px-4 py-3 text-7xl text-gray-600 text-center font-semibold w-full">
          <span>{getTimerSecondsString(streamedSeconds)}</span>
        </div>

        <div className="flex  justify-center pt-12">
          <p className="text-center text-4xl text-orange-500 font-semibold">
            {prog}%
          </p>
        </div>
        <div className="flex justify-center px-4 pt-4">
          <div className="h-2 relative overflow-hidden w-full ">
            <div className="w-full h-full bg-gray-200 absolute"></div>
            <div
              className="h-full bg-green-500 absolute"
              style={{
                width: `${prog}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="flex  justify-center pt-4">
          <Fireicon style={{ height: "25", width: "25" }} /> &nbsp;
          <p className="text-center text-xl text-gray-500 font-semibold">
            Points: {round}
          </p>
        </div>
      </div>

      <div className="h-20" />

      {/* <div className="flex items-center mt-8 mx-4 text-xl text-gray-700 font-medium">
        <div className="w-1/2  rounded m-3 p-4 shadow text-center">
          <span className="inline-block mb-3">
            <Fireicon style={{ height: "65", width: "65" }} />
          </span>
          <div>
            <p>{workoutResult.cal} points / hr</p>{" "}
          </div>
        </div>
        <div className="w-1/2  rounded m-3 p-4 shadow text-center">
          <span className="inline-block mb-3">
            <ChampionIcon style={{ height: "65", width: "65" }} />
          </span>
          <div>Rank : {workoutResult.rank} </div>
        </div>
      </div> */}

      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
        <BottomNavComV2
          cta={
            userStream?.id && streamState === "streaming"
              ? "Pause"
              : userStream?.id && streamState === "paused"
              ? "Resume"
              : "Start"
          }
          cta2={userStream?.id ? "Finish Workout" : ""}
          onClick2={onFinishWorkout}
          onClick={handleStreaming}
        />
      </div>
      {/* <div className="flex items-center justify-center bg-slate-200 h-20 fixed bottom-0 left-0 right-0">
        <div
          className="font-bold bg-orange-600 text-white shadow rounded-full text-xl px-6 py-2"
          onClick={() => onStopWorkoutFn("leave_workout")}
        >
          Stop workout
        </div>
      </div> */}
    </>
  );
};

export default InprogressWorkout;
