import { plusAnim } from "@templates/LandingPage/constants";
import clsx from "clsx";
import classes from "./HowToPlay.module.css";

const { cardTask } = classes;

interface Props {
  image: string;
}

const StepTwo: React.FC<Props> = ({ image }) => {
  return (
    <div
      className={clsx(
        cardTask,
        // "h-[70vh]",
        "min-h-[400px] lg:min-h-[540px]",
        "flex items-end",
        "relative"
      )}
    >
      <div className="absolute left-10 top-10">
        <p className="text-[#5BE3FF] text-5xl font-mont">15,237pts</p>
      </div>
      <div className="absolute right-10 top-10">
        <img
          className={clsx("rounded-3xl object-cover")}
          alt="plus"
          src={plusAnim}
        />
      </div>
      <img
        className={clsx("rounded-3xl object-cover")}
        alt="socailBoat"
        src={image}
      />
      <div className="bg-gradient-to-b from-transparent to-smoke-900 absolute top-2/3 left-0 right-0 bottom-0" />
    </div>
  );
};

export default StepTwo;
