import { LiveClass } from "@models/Workouts/LiveClass";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import { Workout } from "@models/Workouts/Workout";
import Badge from "./Badge";
import { millisecondsToStr } from "./utils";
import WorkoutMedia from "./WorkoutMedia";

interface Props {
  workout: Workout | LiveClass | NutritionPlan;
  enrolled?: boolean;
}

const WorkoutCardContent: React.FC<Props> = ({ workout, enrolled }) => {
  return (
    <div className="flex bg-white border-b rounded-lg shadow-sm cursor-pointer md:max-h-36">
      {workout.media ? (
        <WorkoutMedia
          media={workout.media}
          isFree={workout.isFree}
          enrolled={enrolled}
        />
      ) : null}
      <div className="flex flex-col justify-between w-3/4 px-4 py-2">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-700">
                {workout.name}
              </p>
              {workout.isFree ? (
                <div className="pl-0">
                  <Badge text="Free" />
                </div>
              ) : !enrolled ? (
                // <div className="pl-1">
                //   <div className="p-1 px-2 bg-orange-500 rounded-md">
                //     <p className="text-xs font-semibold text-white">Paid</p>
                //   </div>
                // </div>
                <div className="pl-0">
                  <img
                    className="object-cover w-5 h-5"
                    alt="locked"
                    src="https://img.icons8.com/material-rounded/96/000000/lock--v1.png"
                  />
                </div>
              ) : null}
            </div>
            <p className="text-sm text-gray-500 md:text-sm line-clamp-2">
              {workout.description}
            </p>
          </div>

          <div>
            {workout.type === "nutrition" ? (
              <p className="font-semibold text-orange-500 no-underline">Diet</p>
            ) : workout.type === "live" ? (
              <p className="font-semibold text-orange-500 no-underline">
                Live class
              </p>
            ) : workout.type === "workout" ? (
              <p className="font-semibold text-orange-500 no-underline">
                Video
              </p>
            ) : null}
          </div>
        </div>
        {workout.type === "workout" && workout.media?.duration ? (
          <p className="text-sm font-medium text-gray-700 md:text-sm">
            {millisecondsToStr(workout.media.duration * 1000)}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default WorkoutCardContent;
