import { saveNewPostWithActivity } from "@models/Posts/createUtils";
import WorkoutMediaSwiper from "./WorkoutMediaSwiper";
import WorkoutPostBox from "./WorkoutPostBox";
import { UserInterface } from "@models/User/User";
import { useNewPost } from "@hooks/community/useNewPost";
import UploadWorkout from "@modules/WorkoutsV3/UploadWorkout";
import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import { useState } from "react";
import Loading from "@components/loading/Loading";
import Header from "@modules/WorkoutsV3/Header";
import mixpanel from "@config/mixpanel";
// import { useCommunityPost } from "@hooks/community/v2/useCommunityPost";
import { usePinnedPost } from "@hooks/community/usePinnedPost";
import * as Sentry from "@sentry/browser";
// import { usePreviousActivities } from "@hooks/tasks/usePreviousActivities";
// import WaveBtn from "@components/WaveBtn";
// import { useRouter } from "next/router";
import { workoutTypes } from "@hooks/tasks/useWorkoutV3Params";
import { weEventTrack } from "@analytics/webengage/user/userLog";
// import { useRouter } from "next/router";

interface Props {
  onBack: () => void;
  user: UserInterface;
  taskId: string;
  gameId: string;
  coachUID: string;
  onGoToTeam: () => void;
  eventId: string;
  postId?: string;
  eventStarts?: number;
  roundLength?: number;
  sprintLength?: number;
  onNavReplace: (newNav: workoutTypes) => void;
}

const PostWorkout: React.FC<Props> = ({
  onBack,
  onGoToTeam,
  // activeTab,
  user,
  taskId,
  gameId,
  eventId,
  coachUID,
  postId,
  eventStarts,
  roundLength,
  sprintLength,
  onNavReplace,
  // onNavChange,
  // goToUpload,
}) => {
  //   const [photos, setPhotos] = useState<CloudinaryMedia[]>([]);

  // const { userStream, onDeleteMedia } = useWorkoutTrackingTasksV2(
  //   undefined,
  //   user,
  //   taskId
  // );

  const { pinnedPost } = usePinnedPost(postId, gameId, postId ? true : false);

  const { task } = useWorkoutTask(taskId);
  const [loading, setLoading] = useState<boolean>(false);

  // const { unlocksNext } = usePreviousActivities(
  //   true,
  //   task?.id,
  //   user.uid,
  //   task?.taskFrequency,
  //   eventStarts,
  //   roundLength,
  //   sprintLength,
  //   gameId
  // );

  // console.log("userActivities", unlocksNext);

  const { newPost, onUpdateText, onMediaUpload, onMediaDelete } = useNewPost(
    coachUID,
    "public",
    eventId,
    gameId,
    "",
    user.uid,
    user.name,
    user.profileImage,
    false,
    undefined,
    "",
    true,
    undefined,
    pinnedPost?.post,
    postId ? true : false,
    taskId
  );

  // console.log("eventId", newPost?.eventId, eventId);

  const onPost = async () => {
    if (newPost && task) {
      try {
        // console.log(newPost.text);

        setLoading(true);
        await saveNewPostWithActivity(
          eventId,
          newPost,
          task,
          gameId,
          pinnedPost?.post ? true : false,
          pinnedPost?.ref
        );

        try {
          mixpanel.track("workout_post", {
            text_length: newPost.text.length,
            media_length: newPost.media.length,
            possible_points: task.fitPoints,
            task_name: task.name,
            task_by: task.userId,
          });

          // event track
          weEventTrack("workout_post", {
            text_length: newPost.text.length,
            media_length: newPost.media.length,
            possible_points: task.fitPoints ? task.fitPoints : 0,
            task_name: task.name ? task.name : "no_name",
            task_by_uid: task.userId ? task.userId : "no_name",
          });
        } catch (error) {}

        onGoToTeam();
      } catch (error) {
        // console.log("error", error);
        Sentry.captureException(error);
        setLoading(false);
      }
    }
  };

  // const onGoToDiscover = () => {
  //   onNavReplace("select_workout");
  // };

  return (
    <div className="max-w-md mx-auto fixed inset-0 z-20 flex flex-col">
      {/* {unlocksNext === 0 ? ( */}
      <>
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        ) : newPost?.media.length === 0 ? (
          <UploadWorkout
            user={user}
            onUploadMedia={onMediaUpload}
            onBack={onBack}
            taskName={task?.name}
          />
        ) : newPost?.media && newPost?.media.length > 0 ? (
          <div className="flex-1 flex flex-col group">
            <div className="group-focus-within:hidden">
              <Header
                onBack={onBack}
                title="Post Workout"
                headingCenter={true}
                color="#335E7D"
                classStr="p-4"
              />
            </div>
            <div className="group-focus-within:hidden">
              <WorkoutMediaSwiper
                photos={newPost?.media}
                gotoComponent={() => {}}
                onDeleteMedia={onMediaDelete}
              />
            </div>
            <WorkoutPostBox
              text={newPost?.text}
              onPost={onPost}
              onUpdateText={onUpdateText}
              onBack={onBack}
            />
          </div>
        ) : null}
      </>
      {/* ) : (
        <div className="flex flex-col justify-center  h-screen items-center px-16">
          <p className="text-gray-700 text-4xl font-semibold text-center">
            Task already done
          </p>
          <p className="text-gray-700 text-lg text-center">
            {`This task can only be done once in a ${
              task?.taskFrequency === "daily"
                ? "day"
                : task?.taskFrequency === "weekly"
                ? "week"
                : ""
            } To get more fitpoints, discover
            tasks below`}
          </p>
          <div className="pt-4">
            <WaveBtn text="Discover tasks" gotoComponent={onGoToDiscover} />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PostWorkout;
