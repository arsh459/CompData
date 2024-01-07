import { iosFrame } from "@templates/LandingPage/constants";
import clsx from "clsx";
import classes from "./HowToPlay.module.css";
import LeaderboardSteps from "./LeaderboardSteps";

const { cardPoints } = classes;

interface Props {
  //   image: string;
}

const StepThree: React.FC<Props> = ({}) => {
  return (
    <div
      className={clsx(
        cardPoints,
        // "h-[70vh]",
        "min-h-[400px] lg:min-h-[540px]",
        "flex items-center justify-center",
        "relative"
      )}
    >
      <div className="pt-16 md:pt-0">
        <div className="relative w-72">
          <img
            src={iosFrame}
            className={clsx(
              // i === 1 ? "h-96" : "h-72",
              "object-cover w-full"
            )}
          />
          <div className="absolute top-8 left-8 w-56">
            <p className="text-base pb-1 text-left text-white pl-8 font-mont">
              Leaderboards
            </p>
            <LeaderboardSteps />
            <div className="bg-gradient-to-b from-transparent to-black z-50 absolute top-20 left-4 right-4 bottom-0 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-transparent to-smoke-900 absolute top-2/3 left-0 right-0 bottom-0" />
    </div>
  );
};

export default StepThree;
