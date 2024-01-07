import {
  baseImageKit,
  lockedIconNoKeyHole,
  // calendarIcon,
  // fpIconBlue,
  // fPointsBlack,

  // lockIcon,
  //   lockIcon,
} from "@constants/icons/iconURLs";
// import { userTaskStatus } from "@hooks/tasks/access/useIsTaskAllowed";
// import { taskFrequency } from "@models/Tasks/Task";
import clsx from "clsx";
import { format } from "date-fns";
// import { format } from "date-fns";

interface Props {
  overlay?: boolean;
  unlocksNext?: number;
  unlocksAtRank?: number;
  past?: boolean;
  earnedFp?: number;
  totalFp?: number;
}

const LockedKPI: React.FC<Props> = ({
  overlay,
  unlocksNext,
  unlocksAtRank,
  past,
  earnedFp,
  totalFp,
}) => {
  return (
    <div
      className={clsx(
        "w-full flex flex-col items-center justify-end h-full  absolute   rounded-2xl inset-0 pb-2 px-4 z-50",
        earnedFp
          ? "bg-gradient-to-t from-[#6EC576] to-[#36613AA8]"
          : overlay
          ? " bg-gradient-to-b from-smoke-500 to-black"
          : ""
      )}
    >
      {past ? null : (
        <div className="absolute inset-0 justify-center items-center flex z-50">
          <img
            src={`${baseImageKit}/tr:w-28,c-maintain_ratio/${lockedIconNoKeyHole}`}
          />
        </div>
      )}
      {past && totalFp && earnedFp !== 0 ? (
        <div className="absolute inset-0 justify-center items-center flex z-50">
          <p className="text-lg font-semibold tracking-wide text-center text-white">
            Score {earnedFp}/{totalFp} FP
          </p>
        </div>
      ) : null}

      <div className="flex items-center justify-around ">
        <p className="text-xs text-white pl-2">
          <span className="font-bold">
            {unlocksNext
              ? `Unlocking on ${format(new Date(unlocksNext), "d MMM")}`
              : unlocksAtRank
              ? `Only for top ${unlocksAtRank} ranks`
              : past
              ? "Task has expired"
              : ""}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LockedKPI;
