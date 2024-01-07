import RankingComponent from "./RankingComponent";
import TaskDoneSwiper from "./TaskDoneSwiper";
import EarnedFitPoint from "./EarnedFitPoint";
import WaveBtn from "@components/WaveBtn";
import ProgramCard from "../ProgramWrapper/ProgramComponents/ProgramCard";
import { communityQueryV3 } from "@hooks/community/v2/useCommunityParamsV3";
import TaskDetails from "./TaskDetails";
import { getCalTolFP, getTaskTotalFP } from "./utils";
import { useCommunityPostClick } from "@hooks/community/useCommunityPostClick";
import { UserInterface } from "@models/User/User";
import CreateModal from "../Program/CreateModal/CreateModal";
import UserImage from "@templates/listing/Header/UserImage";
import { SprintObject } from "@models/Event/Event";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { Post } from "@models/Posts/Post";

interface Props {
  gameId: string;
  postId: string;
  urlState: communityQueryV3;
  signedInUser: UserInterface;
  baseShareURL: string;
  onGoBack: () => void;
  onQueryChange: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;

  eventId: string;
  communityId: string;
  gameStarts?: number;
  sprints?: SprintObject[];

  eventKey: string;
  leaderKey: string;
  yesterday: string;
  dayBefore: string;
  onEditPost: (post: Post) => void;
  // isPostClickOpen: boolean;
  // setIsPostClickOpen: (val: boolean) => void;
}

const PostClick: React.FC<Props> = ({
  gameId,
  postId,
  urlState,
  signedInUser,
  baseShareURL,
  onGoBack,
  onQueryChange,
  eventId,
  communityId,
  eventKey,
  leaderKey,
  yesterday,
  dayBefore,
  onEditPost,
  // isPostClickOpen,
  // setIsPostClickOpen,
}) => {
  const isPostClickOpen = urlState.postId ? true : false;
  const { pinnedPost, adminReview, task, taskDoneLists, onNextTaskDone } =
    useCommunityPostClick(postId, gameId, isPostClickOpen);

  // console.log(
  //   "pinnedPost open",
  //   pinnedPost?.post?.id,
  //   isPostClickOpen,
  //   pinnedPost?.post?.creatorName
  // );

  return (
    <CreateModal
      onBackdrop={onGoBack}
      onButtonPress={onGoBack}
      isOpen={isPostClickOpen}
      heading=""
      onCloseModal={onGoBack}
      bgData="bg-transparent fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div
        id="postClickEle"
        className="w-full h-full bg-gradient-to-b from-[#F3F6F8] to-white overflow-y-scroll"
      >
        <div className="sticky top-0 z-10 bg-[#F3F6F8] flex justify-between items-center h-16 iphoneX:h-20 px-4">
          <div
            className="cursor-pointer"
            onClick={() => {
              // setIsPostClickOpen(false);
              onGoBack();
            }}
          >
            <img
              src={`https://ik.imagekit.io/socialboat/Component_5_BYt6BOh13.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650970656691`}
              alt="Back Icon"
              className="w-6 iphoneX:w-8"
            />
          </div>
          <UserImage
            image={signedInUser.profileImage}
            name={signedInUser.name}
            pointer="cursor-default"
            unknown={!signedInUser.profileImage && !signedInUser.name}
            boxWidth="w-10 iphoneX:w-12"
            boxHeight="h-10 iphoneX:h-12"
          />
        </div>
        {pinnedPost?.post && pinnedPost.ref ? (
          <ProgramCard
            post={pinnedPost.post}
            postRef={pinnedPost.ref}
            urlState={urlState}
            signedInUser={signedInUser}
            baseShareURL={baseShareURL}
            totalFitPoints={getTaskTotalFP(task?.awardLevels)}
            isPostClick={true}
            onQueryChange={onQueryChange}
            gameId={gameId}
            eventId={eventId}
            communityId={communityId}
            eventKey={eventKey}
            teamKey={leaderKey}
            yesterday={yesterday}
            dayBefore={dayBefore}
            onEditPost={onEditPost}
            // setIsPostClickOpen={setIsPostClickOpen}
          />
        ) : null}

        <TaskDetails
          activityName={task?.name}
          text={task?.rules}
          userLevel={task?.level}
        />

        {adminReview.length > 0 && adminReview[0].reviewStatus !== "PENDING" ? (
          <EarnedFitPoint
            earnedFP={getCalTolFP(adminReview[0]?.calories)}
            totalFP={getTaskTotalFP(task?.awardLevels)}
            reviewStatus={adminReview[0].reviewStatus}
            tags={adminReview[0].activeMessage?.tags}
            awardLevels={task?.awardLevels}
            message={adminReview[0].activeMessage?.text}
          />
        ) : null}

        <RankingComponent
          taskDoneLists={taskDoneLists}
          onNextTaskDone={onNextTaskDone}
        />

        <TaskDoneSwiper
          taskDoneLists={taskDoneLists}
          urlState={urlState}
          onQueryChange={onQueryChange}
          // setIsPostClickOpen={setIsPostClickOpen}
        />

        <p className="text-lg iphoneX:text-2xl italic font-semibold text-[#203c51c7] text-center">
          Wanna earn more fitpoints, <br /> Start this workout!
        </p>

        <div className="w-48 mx-auto py-2.5 iphoneX:py-4">
          <a
            href={`/${leaderKey}/${eventKey}/workout?tab=task_preview&summaryType=${
              task?.labels?.length ? task.labels[0] : "cardio"
            }&taskId=${task?.id}`}
            onClick={() =>
              weEventTrack("gameCommunityPost_startWorkout", {
                taskName: task?.name ? task.name : "no_taskName",
              })
            }
          >
            <WaveBtn text="Start Workout" />
          </a>
        </div>
      </div>
    </CreateModal>
  );
};

export default PostClick;
