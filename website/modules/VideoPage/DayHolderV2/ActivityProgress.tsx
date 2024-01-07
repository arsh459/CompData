import ProgressBarDynamic from "@modules/WorkoutsV3/ProgressBarDynamic";
import clsx from "clsx";

interface Props {
  progress: number;
}

const ActivityProgress: React.FC<Props> = ({ progress }) => (
  <div
    className={clsx(
      "w-full flex items-end absolute top-0 left-0 right-0 bottom-0 pb-2 md:pb-4 px-2 md:px-4 z-50"
    )}
  >
    <div className="w-full">
      <ProgressBarDynamic
        backGround="#6D55D1"
        width={progress}
        bgEmptyColor="#FFFFFF"
        height="h-1.5"
        pill="true"
      />
    </div>
  </div>
);

export default ActivityProgress;
