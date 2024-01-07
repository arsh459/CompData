import { useTaskSearch } from "@hooks/search/useTaskSearch";
import { TextField } from "@mui/material";
import { Task } from "@models/Tasks/Task";
import Link from "next/link";
import {
  arrayRemove,
  arrayUnion,
  deleteField,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@config/firebase";
import DayPriorityAdder from "./DayPriorityAdder";
import { WorkoutLevel } from "@models/Prizes/PrizeV2";
import clsx from "clsx";
import { NutritionTarget } from "@models/User/User";
import DietKPI from "./DietKPI";
import { useEffect, useState } from "react";
import SingleDietKPI from "./SingleDietKPI";
// import { getMacroString } from "./utils";
import NutritionTaskDetails from "./NutritionTaskDetails";

interface Props {
  badgeId: string;
  badgeTasks?: Task[];
  dayObj?: WorkoutLevel;
  day: number;
  nutritionTarget?: NutritionTarget;
  onRefresh: () => void;
}

export interface factsObj {
  carbs: number;
  protein: number;
  fiber: number;
  kcal: number;
  fats: number;
}

const initFacts: factsObj = {
  carbs: 0,
  protein: 0,
  fiber: 0,
  kcal: 0,
  fats: 0,
};

const SingleDayAdder: React.FC<Props> = ({
  badgeId,
  badgeTasks,
  day,
  dayObj,
  onRefresh,
  nutritionTarget,
}) => {
  const { searchString, setSearchString, fetchedData } = useTaskSearch(
    "",
    true
  );

  const [facts, setFacts] = useState<factsObj>(initFacts);
  const [filteredList, setFilteredList] = useState<Task[]>([]);

  console.log("filteredList", day, filteredList);

  useEffect(() => {
    if (badgeTasks) {
      const filteredListEl = badgeTasks
        ?.filter((item) => {
          const strToCheck = `${badgeId}_${day}`;
          if (item.badgeDays && item.badgeDays.includes(strToCheck)) {
            return true;
          }
          return false;
        })
        .sort((a, b) =>
          a.badgeDayPriority &&
          b.badgeDayPriority &&
          a.badgeDayPriority[`${badgeId}_${day}`] &&
          b.badgeDayPriority[`${badgeId}_${day}`]
            ? a.badgeDayPriority[`${badgeId}_${day}`] -
              b.badgeDayPriority[`${badgeId}_${day}`]
            : 0
        );

      const trackedMetrics: factsObj = {
        fats: 0,
        carbs: 0,
        fiber: 0,
        protein: 0,
        kcal: 0,
      };

      for (const fItem of filteredListEl) {
        if (fItem.nutritionFacts) {
          trackedMetrics.fats += fItem.nutritionFacts.fats
            ? fItem.nutritionFacts.fats
            : 0;
          trackedMetrics.protein += fItem.nutritionFacts.protein
            ? fItem.nutritionFacts.protein
            : 0;
          trackedMetrics.carbs += fItem.nutritionFacts.carbs
            ? fItem.nutritionFacts.carbs
            : 0;
          trackedMetrics.fiber += fItem.nutritionFacts.fibre
            ? fItem.nutritionFacts.fibre
            : 0;
          trackedMetrics.kcal += fItem.kcal ? fItem.kcal : 0;
        }
      }

      // console.log("trackedMetrics", trackedMetrics);

      setFilteredList(filteredListEl);
      setFacts(trackedMetrics);
    }

    // console.log("Hi", day, finalTracked);
  }, [day, badgeTasks, badgeId]);

  // console.log("filteredList", filteredList?.length, badgeTasks?.map(item => item.));

  const onAddTask = async (id: string) => {
    // console.log("id", id);
    await updateDoc(doc(db, "tasks", id), {
      badgeDays: arrayUnion(`${badgeId}_${day}`),
      badgeIds: arrayUnion(badgeId),
      [`badgeDayPriority.${`${badgeId}_${day}`}`]: filteredList?.length,
    });
  };

  const removeTask = async (id: string) => {
    await updateDoc(doc(db, "tasks", id), {
      badgeDays: arrayRemove(`${badgeId}_${day}`),
      [`badgeDayPriority.${`${badgeId}_${day}`}`]: deleteField(),
    });

    onRefresh();
  };

  return (
    <div
      className={clsx(
        "border p-4",
        filteredList?.length !== dayObj?.nbWorkouts
          ? "border-purple-500 border-2"
          : ""
      )}
    >
      <div className="p-4 border mb-4">
        <p>Tasks: {dayObj?.nbWorkouts}</p>
        <p>Fit P: {dayObj?.nbFitpoints}FP</p>

        {facts ? (
          <DietKPI nutritionTarget={nutritionTarget} finalTracked={facts} />
        ) : null}
      </div>
      <div className="flex">
        <TextField
          style={{ width: "50%" }}
          placeholder={"Search Task"}
          label={"Task"}
          variant="outlined"
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          value={searchString}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="border border-red-500 p-2 flex flex-wrap">
        <p className="text-xs font-medium">Added tasks</p>
        {filteredList?.map((item) => {
          return (
            <div key={item.id} className="border max-w-[240px] mx-2 p-2">
              <p className="line-clamp-1">{item.name}</p>
              {item.mealTypes ? (
                <p className="text-blue-500 text-xs">{item.mealTypes}</p>
              ) : (
                <p className="text-red-500 text-xs font-bold">NO MEAL TYPE</p>
              )}

              {item.nutritionFacts ? (
                <div className="p-4 border">
                  <SingleDietKPI
                    keyStr="Protein"
                    value={item.nutritionFacts.protein}
                    unit="g"
                  />
                  <SingleDietKPI
                    keyStr="Carbs"
                    value={item.nutritionFacts.carbs}
                    unit="g"
                  />
                  <SingleDietKPI
                    keyStr="Fats"
                    value={item.nutritionFacts.fats}
                    unit="g"
                  />
                  <SingleDietKPI
                    keyStr="Fiber"
                    value={item.nutritionFacts.fibre}
                    unit="g"
                  />
                  <div className="pt-1">
                    <SingleDietKPI
                      keyStr="KCal"
                      value={item.kcal}
                      unit="Kcal"
                    />
                  </div>
                </div>
              ) : null}

              <div className="p-2 border">
                <p>{item.fitPoints} FP</p>
              </div>
              {item.preview ? (
                <p className="text-red-500 font-bold text-sm">
                  Preview Task - NOT VISIBLE
                </p>
              ) : null}

              <DayPriorityAdder
                badgeId={badgeId}
                taskId={item.id}
                day={day}
                dayPriorityObj={item.badgeDayPriority}
              />

              <Link href={`/admin/tasks/add?id=${item.id}`}>
                <p className="py-2 text-green-500">Edit task</p>
              </Link>
              <p className="text-red-500" onClick={() => removeTask(item.id)}>
                Remove
              </p>
            </div>
          );
        })}
      </div>

      <div className="pt-2">
        <p className="text-xs font-medium">Search results below</p>
        {fetchedData?.map((badgeD) => {
          const tk = badgeD as Task;

          return (
            <div
              onClick={() => onAddTask(tk.id)}
              key={tk.id}
              className="border cursor-pointer px-2 py-2 m-1"
            >
              <p className="text-base">{tk.name}</p>
              <NutritionTaskDetails task={tk} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleDayAdder;
