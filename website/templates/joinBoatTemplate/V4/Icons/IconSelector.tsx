import DumbbellIcon from "./DumbbellIcon";
import FitIcon from "./FitIcon";
import HomeIcon from "./HomeIcon";
import MuscleIcon from "./MuscleIcon";
import OutdoorIcon from "./OutdoorIcon";
import RecoveryIcon from "./RecoveryIcon";
import RunIcon from "./RunIcon";
import WeightIcon from "./WeightIcon";

export type iconTypes =
  | "weight"
  | "muscle"
  | "run"
  | "recovery"
  | "fit"
  | "home"
  | "dumbbell"
  | "outdoor";

interface Props {
  iconType: iconTypes;
  color?: string;
}

const IconSelector: React.FC<Props> = ({ iconType, color }) => {
  switch (iconType) {
    case "weight":
      return <WeightIcon color={color} />;
    case "muscle":
      return <MuscleIcon color={color} />;
    case "run":
      return <RunIcon color={color} />;
    case "recovery":
      return <RecoveryIcon color={color} />;
    case "fit":
      return <FitIcon color={color} />;
    case "home":
      return <HomeIcon color={color} />;
    case "dumbbell":
      return <DumbbellIcon color={color} />;
    case "outdoor":
      return <OutdoorIcon color={color} />;
    default:
      return null;
  }
};

export default IconSelector;
