import DistanceIconSvg from "./DistanceIconSvg";
import PaceIconSvg from "./PaceIconSvg";
import TimeIconSvg from "./TimeIconSvg";
import WeightIconSvg from "./WeightIconSvg";
import RepsIconSvg from "./RepsIconSvg";
import CharactersIconSvg from "./CharactersIconSvg";
import WordsIconSvg from "./WordsIconSvg";
import SentencesphyIconSvg from "./SentencesphyIconSvg";
import FitpointIconSvg from "./FitpointIconSvg";
import LevelIconSvg from "./LevelIconSvg";
import TaskIconSvg from "./TaskIconSvg";
import { iconGoalType } from "@models/Tasks/SystemKPIs";
import clsx from "clsx";

// export {
//   DistanceIconSvg,
//   PaceIconSvg,
//   TimeIconSvg,
//   WeightIconSvg,
//   RepsIconSvg,
//   CharactersIconSvg,
//   WordsIconSvg,
//   SentencesphyIconSvg,
//   FitpointIconSvg,
//   LevelIconSvg,
//   TaskIconSvg,
// };

interface Props {
  iconType: iconGoalType;
  color?: string;
  size?: "small" | "medium" | "large";
}

const IconSelector: React.FC<Props> = ({ iconType, color, size }) => {
  return (
    <div
      className={clsx(
        "inline-block",
        iconType === "characters" ||
          iconType === "words" ||
          iconType === "sentencesphy"
          ? size === "small"
            ? "w-10 iphoneX:w-16 h-4 iphoneX:h-5"
            : size === "large"
            ? "w-24 iphoneX:w-28 h-8 iphoneX:h-12"
            : "w-16 iphoneX:w-20 h-6 iphoneX:h-8"
          : size === "small"
          ? "w-4 iphoneX:w-6 h-4 iphoneX:h-6"
          : size === "large"
          ? "w-8 iphoneX:w-12 h-8 iphoneX:h-12"
          : "w-6 iphoneX:w-8 h-6 iphoneX:h-8"
      )}
      style={{ verticalAlign: "middle" }}
    >
      {iconType === "distance" ? (
        <DistanceIconSvg color={color} />
      ) : iconType === "pace" ? (
        <PaceIconSvg color={color} />
      ) : iconType === "reps" ? (
        <RepsIconSvg color={color} />
      ) : iconType === "time" ? (
        <TimeIconSvg color={color} />
      ) : iconType === "weight" ? (
        <WeightIconSvg color={color} />
      ) : iconType === "characters" ? (
        <CharactersIconSvg color={color} />
      ) : iconType === "words" ? (
        <WordsIconSvg color={color} />
      ) : iconType === "sentencesphy" ? (
        <SentencesphyIconSvg color={color} />
      ) : iconType === "fitpoint" ? (
        <FitpointIconSvg color={color} />
      ) : iconType === "level" ? (
        <LevelIconSvg color={color} />
      ) : iconType === "task" ? (
        <TaskIconSvg color={color} />
      ) : (
        <PaceIconSvg color={color} />
      )}
    </div>
  );
};

export default IconSelector;
