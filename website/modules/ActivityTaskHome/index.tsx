import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useBadge } from "@hooks/badges/useBadge";
import { useTaskActivityWithUser } from "@hooks/myProgram/useTaskActivityWithUser";
import { useUserRelevantActs } from "@hooks/myProgram/useUserRelevantActs";
import { Task } from "@models/Tasks/Task";
import { UserInterface } from "@models/User/User";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import React from "react";
import ActivtyDetailLeft from "./ActivtyDetailLeft";
import FitpointsEarnedActivity from "./FitpointsEarnedActivity";
interface Props {
  user: UserInterface;
  task: Task;
}

const ActivityTaskHome: React.FC<Props> = ({ task, user }) => {
  const { badge } = useBadge(TEAM_ALPHABET_GAME, user?.badgeId);
  const { userRelevantActs } = useUserRelevantActs(user?.uid, task?.id);
  const { taskDoneLists } = useTaskActivityWithUser(task?.id);
  console.log({ userRelevantActs, taskDoneLists });
  const img = badge?.bgImageMale || badge?.badgeBGImage;

  return (
    <>
      <div className="w-full aspect-[1440/667] h-[600px] object-cover ">
        <div className="fixed inset-0 -z-10 w-full h-full">
          {img ? (
            <MediaTile
              media={img}
              alt="media"
              width={2400}
              height={getHeight(img, 2400)}
              thumbnail={img}
              objectString="object-cover object-top"
              noControls={true}
              paused={true}
              muted={true}
            />
          ) : null}
        </div>
        <div className="absolute  left-0 right-0 -bottom-10  max-w-6xl h-fit  mx-auto rounded-[50px] flex items-end p-12 bg-[#00000059]">
          <div className="flex w-full gap-4 items-center">
            <ActivtyDetailLeft task={task} />
            <div className="w-px h-80 bg-white/30 mx-4"></div>
            <FitpointsEarnedActivity
              task={task}
              taskDoneLists={taskDoneLists}
              userRelevantActs={userRelevantActs}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityTaskHome;
