import { Badge } from "@models/Prizes/PrizeV2";
import DayHolderV2 from "@modules/VideoPage/DayHolderV2/DayHolderV2";

interface Props {
  badge: Badge;
  uid: string;
}

const MyProgramTasks: React.FC<Props> = ({ badge, uid }) => {
  return (
    <div className="w-full max-w-screen-md mx-auto overflow-x-hidden">
      <div className=" py-4">
        <p className="text-sm md:text-3xl     font-nunitoB text-white ">
          What all will be in the course
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
                <DayHolderV2
                  slug={badge.slug}
                  badgeId={badge.id}
                  uid={uid}
                  day={item.day}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyProgramTasks;
