import { useSeriesCombined } from "@hooks/workouts/useSeriesCombined";
// import { useSeriesLives } from "@hooks/workouts/useSeriesLives";
// import { useSeriesNutritionPlans } from "@hooks/workouts/useSeriesNutritionPlans";
// import { useSeriesWorkouts } from "@hooks/workouts/useSeriesWorkouts";
// import {
//   deleteLive,
//   deleteNutrition,
//   deleteWorkout,
// } from "@models/Workouts/createUtils";
// import { LiveClass } from "@models/Workouts/LiveClass";
// import { NutritionPlan } from "@models/Workouts/NutritionPlan";
// import { Workout } from "@models/Workouts/Workout";
// import { useEffect, useState } from "react";

// import WorkoutCard from "@templates/community/workouts/WorkoutCard";
// import WorkoutDisplay from "./WorkoutCard";

interface Props {
  seriesId: string;
}

const WorkoutList: React.FC<Props> = ({ seriesId }) => {
  const { listItems } = useSeriesCombined(seriesId);

  // const [listItems, setListItems] = useState<
  //   (Workout | NutritionPlan | LiveClass)[]
  // >([]);

  // console.log("list", listItems);

  // const onDelete = async (
  //   id: string,
  //   type?: "nutrition" | "workout" | "live"
  // ) => {
  //   if (type === "nutrition") {
  //     await deleteNutrition(seriesId, id);
  //   } else if (type === "live") {
  //     await deleteLive(seriesId, id);
  //   } else {
  //     await deleteWorkout(seriesId, id);
  //   }
  // };
  // const onEdit = () => {};
  return (
    <div className="">
      {listItems.length > 0 ? (
        <div>
          <p className="text-2xl text-gray-700 font-semibold text-center">
            All workouts in Series
          </p>
        </div>
      ) : null}
      <div className="flex flex-wrap pt-4">
        {listItems.map((item) => {
          // console.log("item", item);
          return (
            <div key={item.id} className="pb-4 sm:pr-4">
              {/* <WorkoutDisplay
                name={item.name}
                description={item.description}
                media={item.media}
                calories={item.calories}
                day={item.day}
                onDelete={() => onDelete(item.id, item.type)}
                onEdit={onEdit}
                editLink={
                  item.type === "nutrition"
                    ? `/createNutrition?seriesId=${seriesId}&id=${item.id}`
                    : item.type === "live"
                    ? `/createLive?seriesId=${seriesId}&id=${item.id}`
                    : `/createWorkout?seriesId=${seriesId}&id=${item.id}`
                }
              /> */}
            </div>
          );
        })}

        <div className="h-10" />
      </div>
    </div>
  );
};

export default WorkoutList;
