import TaskCardElementV2 from "@modules/VideoPage/DayHolderV2/TaskCardElementV2";
import RestDayIcon from "@components/SvgIcons/RestDayIcon";
import clsx from "clsx";

import { Badge } from "@models/Prizes/PrizeV2";
import { UserInterface } from "@models/User/User";
import { useDayRecom } from "@hooks/myProgram/useDayRecom";
import { useTasksMain } from "@hooks/myProgram/useTasksMain";
import { getPastText } from "../utils";
import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";

interface Props {
  badge: Badge;
  restDay: boolean;
  isLastDay: boolean;
  selectedtDate: string;
  selectedUnix: number;
  startUnix?: number;
  startUnixDayStart: number;
  todayUnix: number;
  user: UserInterface;
}

const Tasks: React.FC<Props> = ({
  badge,
  restDay,
  isLastDay,
  todayUnix,
  startUnix,
  selectedtDate,
  selectedUnix,
  user,
  startUnixDayStart,
}) => {
  const { status } = usePaidStatus(user.uid);
  const { recommendation, error, fetch } = useDayRecom(
    selectedtDate,
    "workout",
    user?.uid,
    badge?.id
  );

  const { tasks } = useTasksMain(
    false,
    recommendation?.manual && recommendation.overrideBadgeId
      ? recommendation.overrideBadgeId
      : recommendation?.badgeId,
    recommendation?.manual && typeof recommendation.overrideDay === "number"
      ? recommendation.overrideDay
      : recommendation?.day,
    recommendation?.tasks,
    restDay
  );

  const pastText = getPastText(selectedUnix, startUnix);

  return (
    <div className="flex-1 bg-black/30 border-2 border-b-0 backdrop-blur-3xl overflow-y-scroll scrollbar-hide rounded-t-3xl sm:rounded-t-[47px] lg:rounded-t-[50px] border-white border-opacity-20 p-2 sm:p-4 lg:p-6">
      {pastText ? (
        <div className="flex w-4/5 mx-auto items-center justify-center h-full">
          <p className="text-3xl  font-nunitoM  pl-4 text-white">{pastText}</p>
        </div>
      ) : fetch || error ? (
        <div className="flex w-4/5 mx-auto items-center justify-center h-full">
          <p className="text-3xl  font-nunitoM  pl-4 text-white">{error}</p>
        </div>
      ) : restDay ? (
        <div className="flex w-4/5 mx-auto items-center justify-center h-full">
          <div className="w-full max-w-[120px] aspect-[132/159]">
            <RestDayIcon />
          </div>
          <p className="text-3xl  font-nunitoM  pl-4 text-white">
            You can change the settings <br /> from your mobile app for rest{" "}
            <br /> day
          </p>
        </div>
      ) : (
        <div
          className={clsx(
            "text-white w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 items-center justify-center"
          )}
        >
          {user?.uid &&
            tasks?.map((item) => {
              return (
                <TaskCardElementV2
                  key={item.id}
                  item={item}
                  startUnixDayStart={startUnixDayStart}
                  uid={user?.uid}
                  slug={badge?.slug}
                  selectedUnix={selectedUnix}
                  isPro={status !== "LOADING" && status === "ACTIVE"}
                  todayUnix={todayUnix}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Tasks;
