import { Badge } from "@models/Prizes/PrizeV2";
import { UserInterface } from "@models/User/User";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import DayPaginationV2 from "@modules/ProPlanModule/DayPaginationV2";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { MotionValue, useTransform, motion } from "framer-motion";
import Tasks from "./Tasks";
import {
  dayObj,
  useBadgeProgressCalender,
} from "@hooks/myProgram/useBadgeProgressCalender";
import { getStartTime } from "@modules/ProPlanModule/utils";
import {
  Day,
  useWorkoutPreference,
} from "@hooks/myProgram/useWorkoutPreference";
import { format } from "date-fns";
import RestartDemo from "./RestartDemo";

interface Props {
  badge: Badge;
  user: UserInterface;
  scrollYProgress: MotionValue<number>;
  handleBack?: () => void;
  setLoading: (val: boolean) => void;
}

const PlanList: React.FC<Props> = ({
  badge,
  user,
  scrollYProgress,
  handleBack,
  setLoading,
}) => {
  const translateY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const st = getStartTime(user, badge?.id, "workout");

  const { workoutDays } = useWorkoutPreference(user);

  const {
    calender,
    selectedUnix,
    selectedtDate,
    setSelectedDate,
    setSelectedUnix,
    setSelectedWeekDay,
    startUnixDayStart,
    todayUnix,
  } = useBadgeProgressCalender(st);

  const dayObjArr: dayObj[] = calender.flat();
  const isLastDay = dayObjArr[dayObjArr?.length - 1]?.unix === selectedUnix;
  const targetDay = format(new Date(selectedUnix), "EEEE").toLowerCase() as Day;
  const restDay = !workoutDays.includes(targetDay);

  const onClick = (obj: dayObj) => {
    setSelectedDate(obj.date);
    setSelectedWeekDay(obj.day);
    setSelectedUnix(obj.unix);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col max-w-6xl mx-auto px-4 snap-end">
        <motion.div
          style={{ translateY, opacity }}
          className="flex py-6 md:py-8 gap-2 md:gap-4 items-end select-none"
        >
          <div
            className="flex-[0.05] aspect-1 cursor-pointer"
            onClick={handleBack}
          >
            <ArrowLeftIcon className="w-full h-full" color="#FFFFFF" />
          </div>

          {badge?.courseDecorImage ? (
            <div className="flex-[0.3] md:flex-[0.25]">
              <MediaTile
                media={badge.courseDecorImage}
                alt="media"
                width={232}
                height={getHeight(badge.courseDecorImage, 232)}
                objectString="object-cover object-top"
              />
            </div>
          ) : null}

          <DayPaginationV2
            items={dayObjArr}
            currentPage={selectedUnix}
            onPageChange={setSelectedUnix}
            workoutDays={workoutDays}
            startUnixDayStart={startUnixDayStart}
            onClick={onClick}
          />
        </motion.div>

        <Tasks
          badge={badge}
          startUnix={st}
          todayUnix={todayUnix}
          user={user}
          restDay={restDay}
          isLastDay={isLastDay}
          selectedtDate={selectedtDate}
          selectedUnix={selectedUnix}
          startUnixDayStart={startUnixDayStart}
        />
      </div>

      <RestartDemo
        startUnixDayStart={startUnixDayStart}
        badge={badge}
        user={user}
        setLoading={setLoading}
      />
    </>
  );
};

export default PlanList;
