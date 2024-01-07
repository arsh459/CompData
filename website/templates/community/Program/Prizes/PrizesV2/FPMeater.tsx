import clsx from "clsx";

interface Props {
  // totalPoints?: number;
  // myPoints?: number;
  description: string;
  canFinish: boolean;
  progress: number;
  total: number;
  pts: number;
  isGoalWidget?: boolean;
  percent?: boolean;
}

const FPMeater: React.FC<Props> = ({
  description,
  progress,
  pts,
  total,
  canFinish,
  isGoalWidget,
  percent,
}) => {
  // const progress = Math.floor(
  //   ((myPoints ? myPoints : 0) / (totalPoints ? totalPoints : 0)) * 100
  // );

  const progressA = progress < 10 ? 10 : progress > 100 ? 100 : progress;
  const diffrence = total - pts;

  return (
    <div
      className={clsx(
        isGoalWidget ? "text-xs iphoneX:text-sm" : "text-sm iphoneX:text-base",
        "font-light text-gray-50"
      )}
    >
      {progressA === 100 && canFinish ? (
        <p>
          Congratulations! You have <span className="font-bold">unlocked</span>{" "}
          this achievement.
        </p>
      ) : progressA === 100 ? (
        <p>
          Wohoo! You are currently <span className="font-bold">winning! </span>
          Keep the rank up
        </p>
      ) : percent ? (
        <p>{description}</p>
      ) : total ? (
        <p>
          Earn <span className="font-bold">{diffrence} FPs</span> more to win
          and redeem rewards
        </p>
      ) : (
        <p>{description}</p>
      )}
      {/* {total ? ( */}
      <div className="bg-[#262626] rounded-full w-full my-4 mt-4 relative">
        <div
          className="bg-gradient-to-r from-[#6AA0D1] to-[#60ABC3] rounded-full h-1.5"
          style={{ width: `${progressA}%` }}
        />
        <p
          className={clsx(
            progressA >= 80 ? "-translate-x-full" : "-translate-x-1/2",
            "absolute top-full w-max py-0.5 iphoneX:py-1.5",
            progressA === 100 ? "font-bold" : ""
          )}
          style={{ left: `${progressA}%` }}
        >
          {progressA === 100 && canFinish
            ? "Done"
            : percent
            ? `${pts === 0 ? `< 1` : `${pts}`}%`
            : `${pts} FP`}
        </p>
      </div>
      {/* ) : null} */}
    </div>
  );
};

export default FPMeater;
