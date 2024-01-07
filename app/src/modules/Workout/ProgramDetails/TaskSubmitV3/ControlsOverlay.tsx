import CustomControlsV2 from "./CustomControlsV2";
import { useWorkoutVideoStore } from "./utils/useWorkoutVideoStore";

interface Props {}

const ControlsOverlay: React.FC<Props> = ({}) => {
  const contentModalState = useWorkoutVideoStore(
    (state) => state.contentModalState
  );

  // console.log("contentModalState", contentModalState);

  if (contentModalState !== "controls") {
    return null;
  }

  return <CustomControlsV2 />;
};

export default ControlsOverlay;
