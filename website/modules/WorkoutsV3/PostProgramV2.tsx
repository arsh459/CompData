import UppyWidget from "@components/Uppy";
import { useNewPost } from "@hooks/community/useNewPost";
import { usePinnedPost } from "@hooks/community/usePinnedPost";
import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import { saveNewPostWithActivity } from "@models/Posts/createUtils";
import { UserInterface } from "@models/User/User";
import TopClose from "@templates/community/Program/Feed/TopClose";
import mixpanel from "@config/mixpanel";
import * as Sentry from "@sentry/browser";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { useState } from "react";
import PostInteraction from "./PostInteraction";
import { auth } from "@config/firebase";
import UploadTaskCta from "@modules/WorkoutsV3/UploadTaskCta";

interface Props {
  onBack: () => void;
  user: UserInterface;
  taskId: string;
  gameId: string;
  eventId: string;
  coachUID: string;
  postId?: string;
  onGoToTeam: () => void;
}

const PostWorkoutV2: React.FC<Props> = ({
  onBack,
  user,
  taskId,
  gameId,
  eventId,
  coachUID,
  postId,
  onGoToTeam,
}) => {
  const { pinnedPost } = usePinnedPost(postId, gameId, postId ? true : false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { task } = useWorkoutTask(taskId);

  const { newPost, onMediaUpload } = useNewPost(
    coachUID,
    "private",
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

  // console.log("new h", newPost?.media);

  const onDone = () => {
    // if (newPost?.media.length) {
    setIsOpen(true);
    // }
  };

  const onPost = async () => {
    // console.log("posting here", newPost?.media);
    if (newPost?.media.length === 0) {
      setIsOpen(false);
    } else if (newPost && task) {
      const authUID = auth.currentUser?.uid;
      // console.log("posting here 2", newPost?.media);
      try {
        try {
          mixpanel.track("workout_post_submit_request", {
            text_length: newPost.text.length,
            media_length: newPost.media.length,
            postId: newPost.id,
            teamId: eventId,
            authUID: authUID ? authUID : "",
            postAuthorId: newPost.creatorId,
            possible_points: task.fitPoints,
            task_name: task.name,
            task_by: task.userId,
          });

          // event track
          weEventTrack("workout_post_submit_request", {
            text_length: newPost.text.length,
            media_length: newPost.media.length,
            postId: newPost.id,
            teamId: eventId,
            authUID: authUID ? authUID : "",
            postAuthorId: newPost.creatorId,
            possible_points: task.fitPoints ? task.fitPoints : 0,
            task_name: task.name ? task.name : "no_name",
            task_by_uid: task.userId ? task.userId : "no_name",
          });
        } catch (error) {
          Sentry.captureException(error);
        }

        // console.log("posting");
        await saveNewPostWithActivity(
          eventId,
          newPost,
          task,
          gameId,
          pinnedPost?.post ? true : false,
          pinnedPost?.ref
        );

        // console.log("posted");

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
        } catch (error) {
          Sentry.captureException(error);
        }

        console.log("GOing to team request");
        onGoToTeam();
        console.log("GOing to team");
      } catch (error) {
        setIsOpen(false);
        Sentry.captureException(error);
      }
    }
  };

  return (
    <>
      <div className="w-full min-h-screen p-4 flex flex-col">
        <div className="flex justify-end items-center">
          <TopClose
            onCloseModal={onBack}
            sizeString="w-6 iphoneX:w-8 h-6 iphoneX:h-8 object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-2xl iphoneX:text-3xl text-[#335E7D] font-medium text-center">
            Record your workout
          </p>
          <div className="flex-1 flex flex-col py-8">
            <div
              className="my-2 iphoneX:my-4 flex-1 flex justify-center items-center max-h-[500px]"
              style={{
                backgroundImage:
                  "url('https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Component_1_xlx6itUNwI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659081016743)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            />

            <p className="text-sm iphoneX:text-lg text-[#335E7D] text-center">
              Use your camera app to record a video of the task and upload it
              here
            </p>
          </div>

          <div className="py-2 iphoneX:py-4">
            <UppyWidget
              uid={user.uid}
              screenName={"post-workout"}
              taskName={task?.name ? task.name : "task-screen"}
              onUpload={onMediaUpload}
              onDoneClick={onDone}
            >
              <UploadTaskCta onClick={() => {}} text="Upload task" />
            </UppyWidget>
          </div>
        </div>
      </div>
      <PostInteraction
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onGoToTeam={onPost}
      />
    </>
  );
};

export default PostWorkoutV2;
