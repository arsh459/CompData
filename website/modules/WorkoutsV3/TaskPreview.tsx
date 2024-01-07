import { useState } from "react";
import Header from "./Header";
import TaskMedia from "./TaskMedia";
// import WaveBtn from "@components/WaveBtn";
// import LevelModal from "@templates/community/UserProfile/LevelModal";
import ScrollDown from "./ScrollDown";
import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import Linkify from "react-linkify";
// import { getFitPointsLeft } from "@templates/community/UserProfile/utils";
// import InfoBtn from "@components/InfoBtn";
import FitPointTable from "./FitPointTable";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { usePreviousActivityByFrequency } from "@hooks/tasks/usePreviousActivityByFrequency";
import { getTaskProgress, canUserCheckin } from "./utils/taskProgress";
import TaskSubmitModal from "./TaskSubmitModal/TaskSubmitModal";
// import { useWorkoutTaskStream } from "@hooks/tasks/useWorkoutTaskStream";
// import Loading from "@components/loading/Loading";
// import { useTask } from "@hooks/tasks/useTask";
import TaskProgress from "./TaskProgress";
import UploadTaskCta from "./UploadTaskCta";
import { saveCheckinActivity } from "@models/Posts/createUtils";
import SimilerTasks from "./SimilerTasks";

// import { useIsTaskAllowedV2 } from "@hooks/tasks/access/useIsTaskAllowedV2";

interface Props {
  onBack: () => void;
  taskId: string;
  goToPost: () => void;

  // fitPoints?: number;
  // level?: number;
  gameId: string;
  eventId: string;
  uid: string;
  userLevel?: number;
  baseShareURL: string;
  roundStartUnix?: number;
}

const TaskPreview: React.FC<Props> = ({
  // fitPoints,
  // level,
  // percent,
  onBack,
  eventId,
  gameId,
  // gotoComponent,
  goToPost,
  taskId,
  uid,
  userLevel,
  baseShareURL,
  roundStartUnix,
}) => {
  const { task } = useWorkoutTask(taskId);

  // useIsTaskAllowedV2(
  //   userLevel,
  //   task,
  //   "",
  //   "",
  //   uid,
  //   gameId,
  //   false,
  //   "",
  //   "",
  //   "yourProgram"
  // );

  const { userActivities } = usePreviousActivityByFrequency(
    true,
    gameId,
    task?.id,
    uid,
    task?.taskFrequency,
    roundStartUnix
  );

  const { canPost, currentPts, progress } = getTaskProgress(
    userActivities,
    task?.fitPoints ? task.fitPoints : 0,
    uid
  );

  const possiblePts = (task?.fitPoints ? task.fitPoints : 0) - currentPts;

  const { canCheckIn } = canUserCheckin(userActivities, task?.canCheckIn);

  const onUserCheckIn = async () => {
    if (task && canCheckIn) {
      // console.log("here");
      await saveCheckinActivity(eventId, gameId, uid, task);
    }

    setIsOpen(false);
    onBack();
  };

  // console.log("canPost", canPost);
  // console.log("currentPts", currentPts);
  // console.log("progress", progress);
  // console.log("userActivities", userActivities);
  // console.log("canCheckIn", canCheckIn);

  // get max fitpoints till now
  // get progress
  // canCheckIn
  // canPost

  // get activity for user

  // const { userStream } = useWorkoutTaskStream(taskId, uid);

  // const onNext = () => {
  //   if (userStream?.media?.length) {
  //     goToPost();
  //   } else {
  //     gotoComponent();
  //   }
  // };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);

  return (
    <div id="scrollableElement" className="w-full">
      <Header onBack={onBack} color="#1E394D" classStr="p-4" />
      <TaskSubmitModal
        isOpen={isOpen}
        onBackdrop={onClose}
        onCloseModal={onClose}
        canCheckin={canCheckIn}
        onCheckinClick={onUserCheckIn}
        onPostClick={() => {
          goToPost();
          weEventTrack("startWorkout_taskPreviewTaskStartClick", {
            taskName: task?.name ? task.name : "no_taskName",
          });
        }}
      />

      <TaskMedia
        taskName={task?.name}
        media={task?.avatar}
        thumbnails={task?.thumbnails}
        uid={task?.userId}
        fitPoints={task?.fitPoints}
        level={task?.level}
        taskDuration={task?.durationMinutes}
      />

      <div className="p-4 text-[#335E7D]">
        {task && progress > 0 ? (
          <div className="py-4">
            <h3 className="text-2xl font-extrabold pb-2">
              Your Progress for the task
            </h3>
            <TaskProgress
              canPost={canPost}
              possiblePts={possiblePts}
              progress={progress}
            />
          </div>
        ) : null}
        {task?.rules ? (
          <>
            <h3 className="text-2xl font-extrabold">Rules to remember</h3>
            <p className="py-4 prose break-words whitespace-pre-wrap">
              <Linkify>{task?.rules}</Linkify>
            </p>
          </>
        ) : null}
        {/* <div className="flex justify-between items-center">
          <h3 className="text-2xl font-extrabold">What are levels?</h3>
          <InfoBtn
            tone="dark"
            onClick={() => {
              setIsOpen(true);
              weEventTrack("startWorkout_taskPreviewLevelsIClick", {});
            }}
          />
        </div>
        <p className="py-4">
          User levels measure how fit you are. As you complete tasks, you can
          become an Olympian and unlock exclusive access to Special SB Games.
        </p> */}

        {task && progress === 0 ? (
          <div className="py-4">
            <h3 className="text-2xl font-extrabold pb-2">
              Your Progress for the task
            </h3>
            <TaskProgress
              canPost={canPost}
              possiblePts={possiblePts}
              progress={progress}
            />
          </div>
        ) : null}

        {canPost ? (
          <>
            <FitPointTable task={task} />
            {/* <div className="w-48 mx-auto">
          <WaveBtn text="Start" gotoComponent={() => setIsOpen(true)} />
        </div> */}
            <UploadTaskCta onClick={() => setIsOpen(true)} />
          </>
        ) : (
          <SimilerTasks
            gameId={gameId}
            userId={uid}
            userLevel={userLevel ? userLevel : 0}
            baseShareURL={baseShareURL}
          />
        )}
      </div>

      {/* <LevelModal
        isOpen={false}
        onBackdrop={onClose}
        onButtonPress={onClose}
        onCloseModal={onClose}
        fitPoints={getFitPointsLeft(fitPoints)}
        level={level}
        percent={Math.round(percent ? percent : 0 * 100)}
      /> */}

      <ScrollDown targetId="scrollableElement" />
    </div>
  );
};

export default TaskPreview;
