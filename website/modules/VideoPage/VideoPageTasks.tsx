import { Badge } from "@models/Prizes/PrizeV2";
import DayHolder from "./DayHolder/DayHolder";

interface Props {
  badge: Badge;
  uid: string;
  isPro: boolean;
}

const VideoPageTasks: React.FC<Props> = ({ badge, uid, isPro }) => {
  return (
    <div className="w-full max-w-screen-md mx-auto overflow-x-hidden">
      <div className=" py-4">
        <p className="text-sm md:text-3xl     font-nunitoB text-white ">
          A Sample Plan to browse
        </p>
      </div>
      <div className="flex flex-col">
        {badge.workoutLevels &&
          badge.workoutLevels.map((item, index) => {
            return (
              <div
                key={`day-${index}`}
                // className="mb-9 border border-white flex w-full"
              >
                <DayHolder
                  slug={badge.slug}
                  badgeId={badge.id}
                  uid={uid}
                  day={item.day}
                  isPro={isPro}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default VideoPageTasks;
