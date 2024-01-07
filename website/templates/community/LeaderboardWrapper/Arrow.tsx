import { CoachRank, UserRank } from "@models/Activities/Activity";
import clsx from "clsx";

interface Props {
  each: UserRank | CoachRank;
  yesterday: string;
  dayBefore: string;
  size?: "small";
}

// previousRanks: {[id: string]: rank}

const Arrow: React.FC<Props> = ({ each, yesterday, dayBefore, size }) => {
  //   console.log("nowString", nowString, now_1_String);

  const nowPts =
    each?.dayPointObj && each?.dayPointObj[yesterday]
      ? each?.dayPointObj[yesterday]
      : 0;
  const nowPts_1 =
    each?.dayPointObj && each?.dayPointObj[dayBefore]
      ? each?.dayPointObj[dayBefore]
      : 0;

  //   console.log(nowPts, nowPts_1);

  return (
    <div className="flex-none">
      {" "}
      {nowPts >= nowPts_1 ? (
        <img
          src={`https://ik.imagekit.io/socialboat/Vector__1__ZLQsNpRMC.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652679703971`}
          alt="leading icon"
          className={clsx(size ? "w-3 h-3" : "")}
        />
      ) : (
        <img
          src={`https://ik.imagekit.io/socialboat/Vector__2__9zNUk8sqF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652679703967`}
          alt="laging icon"
          className={clsx(size ? "w-3 h-3" : "")}
        />
      )}
    </div>
  );
};

export default Arrow;
