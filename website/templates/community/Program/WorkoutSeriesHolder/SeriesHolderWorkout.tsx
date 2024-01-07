import { LiveClass } from "@models/Workouts/LiveClass";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import { WorkoutSeries } from "@models/Workouts/Series";
import { Workout } from "@models/Workouts/Workout";
import TodaysCards from "./TodaysCards";
import WorkoutPlaceholder from "./WorkoutPlaceholder";

interface Props {
  isOwner?: boolean;
  currSeries?: WorkoutSeries;
  dayActs: { [serId: string]: (Workout | NutritionPlan | LiveClass)[] };
  dayLives: { [serId: string]: (Workout | NutritionPlan | LiveClass)[] };
  globalLives?: { [serId: string]: (Workout | NutritionPlan | LiveClass)[] };
  // dayNumber: number;
  enrolledSeries?: string[];
  onPostCreate: () => void;
  onOpenAdder: () => void;
  dayNutrition: { [serId: string]: (Workout | NutritionPlan | LiveClass)[] };
  parentId: string;
  communityId: string;
  communityKey: string;
}

const SeriesHolderWorkout: React.FC<Props> = ({
  parentId,
  dayActs,
  dayLives,
  enrolledSeries,
  currSeries,
  isOwner,
  dayNutrition,
  onPostCreate,
  communityKey,
  onOpenAdder,
  globalLives,
  communityId,
}) => {
  // const currSeries = workoutSeries.length > 0 ? workoutSeries[0] : undefined;
  const enrolled = currSeries
    ? enrolledSeries?.includes(currSeries?.id)
    : false;

  return (
    <div className="">
      {currSeries ? (
        <>
          {/* <div>
            <p className="text-lg font-semibold text-gray-700">
              {currSeries.name}
            </p>
          </div> */}

          {dayActs[currSeries.id] ||
          dayNutrition[currSeries.id] ||
          dayLives[currSeries.id] ? (
            <div className="pt-4">
              <TodaysCards
                isOwner={isOwner}
                parentId={parentId}
                communityKey={communityKey}
                // dayNumber={dayNumber}
                communityId={communityId}
                seriesId={currSeries.id}
                dayActivities={
                  dayActs[currSeries.id] ? dayActs[currSeries.id] : []
                }
                dayNutritionPlans={
                  dayNutrition[currSeries.id] ? dayNutrition[currSeries.id] : []
                }
                dayLivePlans={
                  dayLives[currSeries.id] ? dayLives[currSeries.id] : []
                }
                enrolled={enrolled}
                seriesKey={currSeries.seriesKey}
                costSeries={currSeries.cost}
                onAddPlan={onOpenAdder}
              />
            </div>
          ) : isOwner ? (
            <div className="flex justify-center">
              <div className="w-3/4">
                <WorkoutPlaceholder
                  heading="Add Workout/diet for today"
                  icon="https://img.icons8.com/color/96/000000/stepper.png"
                  buttonText={`Add plan for Day`}
                  subtext="Help your teammates achieve their fitness goals and suggest what to do"
                  // buttonLink={`/createWorkout?seriesId=${currSeries.id}`}
                  onClick={onOpenAdder}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-3/4">
                <WorkoutPlaceholder
                  heading="Go for a walk & Burn 500 cals"
                  icon="https://img.icons8.com/color/144/000000/walking--v2.png"
                  buttonText="Share workout"
                  subtext="Share your workout screenshot to get exciting rewards"
                  onClick={onPostCreate}
                />
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default SeriesHolderWorkout;
