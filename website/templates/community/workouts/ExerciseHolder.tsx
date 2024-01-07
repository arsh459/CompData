import { useSeriesCombined } from "@hooks/workouts/useSeriesCombined";
// import { useSeriesNutritionPlans } from "@hooks/workouts/useSeriesNutritionPlans";
// import { useSeriesWorkouts } from "@hooks/workouts/useSeriesWorkouts";
// import { getLabels, getPreviousWorkout } from "./WorkoutDisplayCard/utils";
import WorkoutDisplayCard from "./WorkoutDisplayCard/WorkoutDisplayCard";

interface Props {
  seriesId: string;
  seriesKey: string;
  enrolled?: boolean;
  authRequest: () => void;
  preview?: boolean;
  onPreviewClick?: () => void;
  leaderKey?: string;
  eventKey?: string;
}

const ExerciseHolder: React.FC<Props> = ({
  seriesId,
  seriesKey,
  enrolled,
  authRequest,
  preview,
  onPreviewClick,
  leaderKey,
  eventKey,
}) => {
  const { listItems } = useSeriesCombined(seriesId);

  // const { workouts } = useSeriesWorkouts(seriesId);
  // const {nutritionPlans} = useSeriesNutritionPlans(seriesId);

  // console.log("workouts", workouts);

  return (
    <div className="pt-0 shadow-sm ">
      {listItems.length > 0 ? (
        <div className="px-4 py-2 bg-white rounded-lg ">
          <p className="text-2xl text-center text-gray-500">
            {preview ? "What's the program?" : "Workouts"}
          </p>
        </div>
      ) : null}
      <div className="pt-2 md:flex md:flex-wrap">
        {listItems.map((item, index, orArr) => {
          // const { prevWorkout } = getPreviousWorkout(orArr, index);
          // const { label } = getLabels(item, prevWorkout);

          // console.log("item", item.name, item.videoKey);

          return (
            <div className="md:w-full md:pr-2" key={item.id}>
              <WorkoutDisplayCard
                enrolled={enrolled}
                workout={item}
                label={""}
                seriesKey={seriesKey}
                authRequest={authRequest}
                preview={preview}
                onPreviewClick={onPreviewClick}
                leaderKey={leaderKey}
                eventKey={eventKey}

                // onAccess={onAccess}
              />
            </div>
          );
        })}
      </div>
      <div className="h-10" />
    </div>
  );
};

export default ExerciseHolder;
