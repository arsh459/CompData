import { figureOutline } from "@templates/LandingPage/constants";
import clsx from "clsx";
import classes from "./HowToPlay.module.css";

const { cardFitnessFun } = classes;

interface Props {
  image: string;
}

const StepOne: React.FC<Props> = ({ image }) => {
  return (
    <div
      className={clsx(
        cardFitnessFun,
        // "h-[70vh]",
        "min-h-[400px] lg:min-h-[540px]",
        "flex items-end",
        "relative"
        // "max-w-xl"
      )}
    >
      <div className="relative">
        <img
          className={clsx("rounded-3xl object-cover z-10")}
          alt="socailBoat"
          src={image}
        />
        <div className="absolute bottom-4 right-0 z-0">
          <img
            className={clsx("rounded-3xl object-cover")}
            alt="plus"
            src={figureOutline}
          />
        </div>
      </div>
      <div className="bg-gradient-to-b from-transparent to-smoke-900 absolute top-2/3 left-0 right-0 bottom-0" />
    </div>
  );
};

export default StepOne;
