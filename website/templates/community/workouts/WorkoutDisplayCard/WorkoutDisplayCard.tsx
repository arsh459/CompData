import { Workout } from "@models/Workouts/Workout";
// import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { Link } from "@mui/material";
// import WorkoutMedia from "./WorkoutMedia";
import WorkoutCardContent from "./WorkoutCardContent";
import { LiveClass } from "@models/Workouts/LiveClass";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";

interface Props {
  seriesKey: string;
  workout: Workout | LiveClass | NutritionPlan;
  label: string;
  enrolled?: boolean;
  authRequest: () => void;
  preview?: boolean;
  onPreviewClick?: () => void;
  leaderKey?: string;
  eventKey?: string;
  // onAccess: () => {};
}

const WorkoutDisplayCard: React.FC<Props> = ({
  workout,
  label,
  seriesKey,
  enrolled,
  authRequest,
  preview,
  onPreviewClick,
  leaderKey,
  eventKey,
  // onAccess,
}) => {
  return (
    <div>
      {label ? (
        <>
          <div className="h-8" />
          <div className="flex items-center h-10 px-4">
            <p className="font-semibold text-gray-500 md:text-xl">{label}</p>
          </div>
        </>
      ) : (
        <div className="" />
      )}

      {!preview && (workout.isFree || enrolled) ? (
        <Link
          href={
            workout.type === "live"
              ? `/workout/${seriesKey}/live/${workout.liveKey}`
              : workout.type === "nutrition"
              ? `/workout/${seriesKey}/nutrition/${workout.planKey}`
              : workout.videoKey
              ? `/workout/${seriesKey}/${workout.videoKey}`
              : ""
          }
        >
          <WorkoutCardContent workout={workout} enrolled={enrolled} />
        </Link>
      ) : !preview ? (
        <div onClick={authRequest} className="cursor-pointer">
          <WorkoutCardContent workout={workout} enrolled={enrolled} />
        </div>
      ) : preview ? (
        <Link href={`/joinBoat/${leaderKey}/${eventKey}`}>
          <WorkoutCardContent workout={workout} enrolled={enrolled} />
        </Link>
      ) : null}
    </div>
  );
};

export default WorkoutDisplayCard;
