import { useUserRelevantActsCount } from "@hooks/myProgram/useUserRelevantActCount";
import { Task } from "@models/Tasks/Task";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";
import ActivityProgress from "./ActivityProgress";
import BottomActivityElements from "./BottomActivityElements";
import DoneActivity from "./DoneActivity";
import ExpireOrUnlockIn from "./ExpireOrUnlockIn";
import BuyProPlan from "./BuyProPlan";
import Link from "next/link";
import { useIsTaskAllowedV5 } from "@hooks/tasks/useIsTaskAllowedV5";

interface Props {
  slug?: string;
  item: Task;
  uid: string;
  selectedUnix: number;
  isPro: boolean;
  todayUnix: number;
  startUnixDayStart: number;
}

const TaskCardElementV2: React.FC<Props> = ({
  item,
  uid,
  slug,
  selectedUnix,
  isPro,
  startUnixDayStart,
  todayUnix,
}) => {
  const { earnedFP, taskStatus, selectedActivity, unlocksIn } =
    useIsTaskAllowedV5(
      selectedUnix,
      0.95,
      isPro,
      uid,
      startUnixDayStart,
      todayUnix,
      item,
      false
    );

  const { userRelevantActsCount } = useUserRelevantActsCount(uid, item.id);

  return (
    <Link
      href={
        taskStatus === "play"
          ? `/program/${slug}/${item.id}${
              selectedActivity ? `?activityId=${selectedActivity.id}` : ""
            }`
          : "#"
      }
    >
      <div
        key={item.id}
        className={clsx(
          "group flex flex-col w-full rounded-3xl flex-1 scale-95",
          taskStatus !== "expired" &&
            !unlocksIn &&
            taskStatus !== "pro" &&
            "hover:scale-100"
        )}
      >
        <div
          className={clsx(
            "relative z-0 w-full flex-1 aspect-[328/203] border mg:border-2 rounded-2xl md:rounded-3xl overflow-hidden",
            taskStatus === "pro" || taskStatus === "expired" || unlocksIn
              ? "cursor-[url('https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,f-auto/Component_126__1__9z2RXx63g.png'),_pointer] border-white"
              : taskStatus === "done"
              ? "border-[#17EA5F] cursor-[url('https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,f-auto/Component_124_MQcE0p6Lp.png'),_pointer]"
              : (!userRelevantActsCount && !unlocksIn) ||
                selectedActivity?.progress
              ? "cursor-[url('https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,f-auto/Component_125_q8JFEtTOjU.png'),_pointer] border-white"
              : "border-white"
          )}
        >
          {item.thumbnails ? (
            <MediaTile
              media={item.thumbnails}
              alt={item.name ? item.name : "workout task"}
              width={378}
              height={getHeight(item.thumbnails, 378)}
            />
          ) : null}

          {taskStatus === "pro" ? (
            <BuyProPlan />
          ) : selectedActivity?.progress && taskStatus != "done" ? (
            <ActivityProgress progress={selectedActivity?.progress * 100} />
          ) : null}
          {earnedFP && taskStatus === "done" ? (
            <DoneActivity
              earnedFP={earnedFP}
              item={item}
              actId={selectedActivity?.id}
              slug={slug}
            />
          ) : taskStatus === "expired" || unlocksIn ? (
            <ExpireOrUnlockIn taskStatus={taskStatus} unlocksIn={unlocksIn} />
          ) : null}
        </div>

        <div className="flex-1">
          <BottomActivityElements
            earnedFP={earnedFP}
            item={item}
            taskStatus={taskStatus}
            userRelevantActsCount={userRelevantActsCount}
            unlocksIn={unlocksIn}
            progress={selectedActivity?.progress}
            isPro={isPro}
          />
        </div>
      </div>
    </Link>
  );
};

export default TaskCardElementV2;
