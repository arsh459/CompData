// import { iosFrame } from "@templates/LandingPage/constants";
import clsx from "clsx";
import classes from "./HowToPlay.module.css";
import LevelPyramid from "./LevelPyramid";

const { cardLevels } = classes;

interface Props {
    // image: string;
}

const StepFour: React.FC<Props> = ({}) => {
    return (
        <div
            className={clsx(
                cardLevels,
                // "h-[70vh]",
                "min-h-[400px] lg:min-h-[540px]",
                "flex items-center justify-center",
                "relative"
            )}
        >
            {/* <img
        className={clsx("rounded-3xl object-cover")}
        alt="socailBoat"
        src={image}
      /> */}
            <div className="bg-gradient-to-b from-transparent to-smoke-900 absolute top-2/3 left-0 right-0 bottom-0" />
            <LevelPyramid />
        </div>
    );
};

export default StepFour;
