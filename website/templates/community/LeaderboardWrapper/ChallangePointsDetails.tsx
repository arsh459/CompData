import Scroll from "./Scroll";
// import { format } from "date-fns";
// import { getCalTolFP } from "../NewCommunitySection/utils";
import clsx from "clsx";
import { useCalendarView } from "@hooks/activities/useCalendarView";
import { SprintObject } from "@models/Event/Event";

interface Props {
  name?: string;
  totalPoints?: number;
  dayPointObj?: { [dayString: string]: number };
  bgColor?: string;

  gameStarts?: number;
  sprints?: SprintObject[];
  leaderboardMonth?: string;
}

const ChallangePointsDetails: React.FC<Props> = ({
  name,
  totalPoints,
  dayPointObj,
  bgColor,
  gameStarts,
  sprints,
  leaderboardMonth,
}) => {
  // console.log("da", dayPointObj);

  const { savedList } = useCalendarView(gameStarts, sprints, leaderboardMonth);

  // console.log("sa", savedList);

  return (
    <div className={clsx("bg-gradient-to-b rounded-xl", bgColor)}>
      <div className="flex p-4">
        <h6 className="place-self-center flex-1 text-lg iphoneX:text-2xl font-extrabold line-clamp-1">
          {name}
        </h6>
        <div className="w-px bg-white/25 mx-4" />
        <div className="place-self-center text-center">
          <p className="text-xl iphoneX:text-3xl font-extrabold text-[#FD6F6F]">
            {totalPoints ? totalPoints : "-"}
          </p>
          <p className="text-[10px] iphoneX:text-xs">Total FP</p>
        </div>
      </div>
      <div className="h-px bg-white/25" />
      <div>
        <div
          id="pointsContainer"
          className="grid grid-cols-3 place-items-center gap-5 p-4 h-40 overflow-y-scroll scrollbar-hide scroll-smooth"
        >
          {dayPointObj &&
            savedList.map((item) => (
              <div key={item.key} className="place-self-center text-center">
                <p className="text-lg iphoneX:text-2xl font-extrabold text-[#FD6F6F]">
                  {dayPointObj && dayPointObj[item.key]
                    ? `${dayPointObj[item.key]} FP`
                    : "-"}
                </p>
                <p className="text-[10px] iphoneX:text-xs">
                  {item.label}
                  {/* {format(new Date(key.replaceAll("-", "/")), "MMM d")} */}
                </p>
              </div>
            ))}
        </div>
        <Scroll targetId="pointsContainer" />
      </div>
    </div>
  );
};

export default ChallangePointsDetails;
