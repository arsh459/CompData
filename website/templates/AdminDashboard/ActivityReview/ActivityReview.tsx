// import { useAdminDashboard } from "@hooks/dashboard/useAdminDashboard";
import { useActivityById } from "@hooks/activities/useActivityById";
import { useActivityReviews } from "@hooks/activities/useActivityReviews";
import { usePostWithRef } from "@hooks/activities/usePostWithRef";
import { useAntStream } from "@hooks/tasks/useAntStream";
// import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
// import { useTask } from "@hooks/tasks/useTask";
import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import { UserInterface } from "@models/User/User";
import FitPointTable from "@modules/WorkoutsV3/FitPointTable";
import TaskMedia from "@modules/WorkoutsV3/TaskMedia";
import UserPhoto from "@templates/community/Program/Feed/PostView/UserPhoto";
// import { getHeight } from "@templates/community/Program/getAspectRatio";
import PostContentWrapper from "@templates/community/Program/Post/Content/PostContentWrapper";
// import MediaTile from "@templates/listing/HeaderImage/MediaTile";
// import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { format } from "date-fns";
import Header from "../Header";
import MessageContainer from "./MessageContainer";
import PreviousActivities from "./PreviousActivities";
import TicketHolder from "./TicketHolder";
// import Filter from "./Filter";
// import FilterHolder from "./FilterHolder";
// import Header from "./Header";
// import TaskCardsHolder from "./TaskResults/TaskCardsHolder";

interface Props {
  user: UserInterface;
  activityId: string;
  uid: string;
}

const ActivityReview: React.FC<Props> = ({ user, activityId, uid }) => {
  const { act } = useActivityById(uid, activityId);
  const { post } = usePostWithRef(act?.postRef);
  const { messages } = useActivityReviews(uid, activityId);
  const { stream } = useAntStream(post?.antStreamId);
  const { task } = useWorkoutTask(
    act?.taskId
      ? act.taskId
      : act?.source === "terra"
      ? "8102ff1a-d65a-42bf-9156-d21597aec944"
      : ""
  );

  // console.log("post", post?.gameId, post?.eventId, post?.postContent);
  // console.log("", act);
  // console.log("post", post);
  // console.log("messages", messages);
  // console.log("a", task);

  return (
    <div className="py-4">
      <div>
        <Header name={user.name} img={user.profileImage} />
      </div>
      <div className="px-4 pt-8">
        <div className="flex  flex-wrap items-center">
          <p className="text-2xl font-bold text-gray-700">{task?.name}</p>

          <p className="text-2xl pl-4 font-bold text-red-500">
            {act?.reviewStatus}
          </p>

          <p className="text-xl pl-4 font-bold pt-4 text-blue-500">
            Activity WATCH TIME: {act?.videoWatchedSeconds}
          </p>
          <p className="pb-4">Task SKIP TIME: {task?.videoIntroDur}</p>
          <p className="text-2xl pl-4 font-bold text-green-500">
            Media:{" "}
            {(post?.media.length ? post?.media.length : 0) +
              (post?.streamId?.length ? post?.streamId?.length : 0)}
          </p>

          {/* <p className="text-2xl pl-4 font-bold text-red-500">
            {post?.live ? "Live" : "Done by user"}
          </p> */}

          <p className="text-2xl pl-4 font-bold text-blue-500">
            {task?.gameTask ? "(Game Task)" : ""}
          </p>
        </div>
        <div className="pt-4">
          <UserPhoto
            name={post?.creatorName}
            img={post?.creatorImg}
            teamName={post?.teamName}
            updatedOn={post?.updatedOn}
            onImgClick={() => {}}
          />

          <div className="flex flex-col md:flex-row">
            <div className="w-[480px] flex  flex-col">
              <PostContentWrapper
                onClick={() => {}}
                muxStreamIds={post?.muxStreamIds}
                playbackIds={post?.muxPlaybackIds}
                text={post?.text}
                live={false}
                antMedia={stream?.media}
                media={post?.media}
                pin={true}
                viewLevel="session"
                parentId={post?.gameId}
                communityId={post?.eventId}
                postContent={post?.postContent}
                postView={"public"}
                isViewerOwner={post?.creatorId === user.uid}
                prizes={[]}
              />
            </div>
            <div className="flex flex-col w-full max-w-[480px] justify-center items-center md:items-start pt-2 md:pt-0 md:px-8 ">
              <div className="px-4">
                <p className="text-xl text-center md:text-left font-semibold text-gray-700">
                  Rules
                </p>
                <p>{task?.rules}</p>
              </div>
              <div className="flex">
                <FitPointTable task={task} />
              </div>
            </div>
            <div className="w-[280px] hidden md:block">
              <p className="text-xl text-center md:text-left font-semibold text-gray-700">
                Task details
              </p>
              {task?.avatar ? (
                <TaskMedia
                  taskName={task.name}
                  media={task.avatar}
                  uid={task.userId}
                  fitPoints={task.fitPoints}
                  level={task.level}
                  taskDuration={task.durationMinutes}
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex pt-4">
          <div>
            <p className="text-2xl font-medium text-gray-700">
              Score: {act?.calories ? Math.floor(act?.calories / 300) : "0"}FP
            </p>

            {act?.createdOn ? (
              <p className="text-lg text-gray-700">
                {`Actv time: 
                ${format(new Date(act?.createdOn), "h:mm a dd-MM-yyyy")}`}
              </p>
            ) : null}
            {post?.updatedOn ? (
              <p className="text-lg text-gray-700">
                {`Post time: ${format(
                  new Date(post?.updatedOn),
                  "h:mm a dd-MM-yyyy"
                )}`}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <PreviousActivities
            parentIds={task?.parentTaskIds}
            taskId={task?.id}
            uid={uid}
            // teamId={act?.teamId}
            // gameType={selectedEvent?.configuration?.gameType}
          />
        </div>

        <div>
          <TicketHolder
            activityId={activityId}
            uid={uid}
            numTickets={act?.reviewRequestedBy?.length}
          />
        </div>

        {act ? (
          <div className="pt-8">
            <MessageContainer
              task={task}
              activity={act}
              post={post}
              messages={messages}
              user={user}
              // uid={uid}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ActivityReview;
