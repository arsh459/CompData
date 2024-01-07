import clsx from "clsx";
import { leaderboardStepsData } from "../../constants";

interface Props {}

const LeaderboardSteps: React.FC<Props> = ({}) => {
  return (
    <div>
      {leaderboardStepsData.map((item, i) => {
        return (
          <div
            key={item.name}
            className={clsx(i === 0 ? "" : "", "mb-1 relative")}
          >
            <div
              className={clsx(
                " py-2 rounded-md",
                // "bg-red-50",
                i === 0 ? "mx-2 px-4" : "mx-6 px-2",
                "flex justify-between items-center",
                "z-50"
              )}
            >
              <div className="flex">
                <p className="text-[#F6FF9A] font-mont italic ">0{item.rank}</p>
                <p className="text-[#F6FF9A] font-mont italic pl-2 ">
                  {item.name}
                </p>
              </div>

              <p className="text-[#F6FF9A] font-mont italic ">
                {`${item.points}pts`}
              </p>
            </div>

            <div
              className={clsx(
                "absolute  top-0 left-0 right-0 bottom-0",
                "bg-white opacity-50 px-4 py-2 rounded-md",
                i === 0 ? "mx-2" : "mx-6",
                "z-20"
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LeaderboardSteps;
