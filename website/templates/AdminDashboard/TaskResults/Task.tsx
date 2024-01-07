import Button from "@components/button";
import { useActivityById } from "@hooks/activities/useActivityById";
import { usePostWithStringRef } from "@hooks/activities/usePostWithStringRef";
// import { useUser } from "@hooks/auth/useUser";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
import { useAntStream } from "@hooks/tasks/useAntStream";
// import { useCurrentEvent } from "@hooks/editEvent/useCurrentEvent";
import { Link } from "@mui/material";
import { Activity, AlgoliaActivity } from "@models/Activities/Activity";
import { getGameNameReadable } from "@templates/TaskTemplate/utils";
import clsx from "clsx";
import { format } from "date-fns";
import { useState } from "react";
import TaskAssignModal from "./TaskAssignModal";

interface Props {
  activity: AlgoliaActivity | Activity;
  onRefresh: () => void;
  noMinWidth?: boolean;
}

const Task: React.FC<Props> = ({ activity, onRefresh, noMinWidth }) => {
  // console.log(activity.postRef);
  const { post } = usePostWithStringRef(activity.postRef);
  const { user } = useUserV2(!activity.postRef ? activity.authorUID : "");

  const { selectedEvent } = useCommunityEvent(post?.eventId);
  const { stream } = useAntStream(post?.antStreamId);
  const { act } = useActivityById(
    activity.authorUID,
    activity.id ? activity.id : activity.postId
  );
  // console.log(activity.activityName);

  const [isVisible, setIsVisible] = useState<
    "JUDGE_ASSIGN" | "STATE_ASSIGN" | "HIDDEN"
  >("HIDDEN");
  const onClose = () => setIsVisible("HIDDEN");
  const onOpenJudge = () => setIsVisible("JUDGE_ASSIGN");
  const onOpenState = () => setIsVisible("STATE_ASSIGN");

  return (
    <>
      {act ? (
        <TaskAssignModal
          isVisible={isVisible}
          task={act}
          onClose={onClose}
          onRefresh={onRefresh}
        />
      ) : null}
      <div
        className={clsx(
          noMinWidth ? "" : "min-w-[300px] md:w-[300px] lg:w-[480px]",
          "p-4 border "
        )}
      >
        <div onClick={onOpenState} className="cursor-pointer">
          <p
            className={clsx(
              act?.reviewStatus
                ? "text-gray-700"
                : "font-semibold text-red-500",
              "text-lg underline  text-right "
            )}
          >
            {act?.reviewStatus ? act?.reviewStatus.toLowerCase() : "ADD STATUS"}
          </p>
        </div>

        <div onClick={onOpenJudge} className="cursor-pointer">
          <p
            className={clsx(
              act?.activeMessage?.authorName
                ? "text-gray-700"
                : "font-medium text-red-500",
              "text-base underline  text-right "
            )}
            // className="text-base font-medium underline text-right text-red-500"
          >
            {act?.activeMessage?.authorName
              ? act?.activeMessage?.authorName
              : "ASSIGN JUDGE"}
          </p>
        </div>

        <div className="pb-4">
          <p className="text-lg font-semibold text-gray-700">
            {post?.creatorName
              ? post.creatorName
              : user?.name
              ? user.name
              : activity.authorUID
              ? `UID: ${activity.authorUID}`
              : "Player name absent"}
          </p>
          <div className="flex">
            <p className="text-lg font-medium text-green-700">
              {act?.games?.length
                ? getGameNameReadable(act?.games[0])
                : "No Game"}
            </p>
            <p className="text-lg font-medium pl-2 text-blue-500">
              {selectedEvent?.name ? selectedEvent?.name : "NO TEAM"}
            </p>
          </div>
        </div>

        <div>
          {(post?.media && post?.media.length) ||
          stream?.media.length ||
          (post?.muxStreamIds && post?.muxStreamIds.length) ? (
            <>
              <p className="text-lg font-semibold text-green-500">
                Media Present
              </p>
              {/* <p className="">{post?.live ? "Live" : "Done by user"}</p> */}
            </>
          ) : (
            <p className="text-lg font-semibold text-red-700">No Media</p>
          )}
        </div>

        <div className="">
          {act?.source === "terra" ? (
            <p className="text-base text-gray-700">Terra</p>
          ) : (
            <p className="text-base text-gray-700">
              {act?.activityName ? act.activityName : act?.source}
            </p>
          )}
        </div>

        {act?.createdOn ? (
          <div className="">
            <p className="text-gray-700 text-sm">
              Created: {format(new Date(act?.createdOn), "h:mmaaa d MMM")}
            </p>
            <p className="text-gray-700 text-base font-bold">
              Points:{" "}
              {act?.calories ? `${Math.floor(act?.calories / 300)}FP` : "0 FP"}
            </p>
          </div>
        ) : null}

        <div className="flex pt-4">
          <Link
            href={`/admin/dashboard/${act?.authorUID}/${
              act?.id ? act.id : act?.postId
            }`}
            target="_blank"
          >
            <Button appearance="contained">Review</Button>
          </Link>

          {post?.gameId ? (
            <div className="pl-2">
              <Link
                href={`/feed/${post?.gameId}?postId=${post?.id}`}
                target="_blank"
              >
                <Button appearance="ghost">
                  <p className="text-gray-700">Post</p>
                </Button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Task;
