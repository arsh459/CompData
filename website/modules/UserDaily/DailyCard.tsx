import { goalObj, StepsDoc } from "@models/User/User";
import clsx from "clsx";
import { useTodayTasks } from "./hooks/useTodayTasks";
import TaskList from "./TaskList";

interface Props {
  goalObj?: goalObj;
  stepObj?: StepsDoc;
  date: string;
  uid: string;
  tz: string;
}

const DailyCard: React.FC<Props> = ({ uid, goalObj, date, stepObj, tz }) => {
  //   console.log(dts);
  const { fetchState, getUserActs, activities } = useTodayTasks(uid, date, tz);

  return (
    <div
      className={clsx(
        "p-4 m-4",
        goalObj && goalObj.achievedFP
          ? "border-green-500 border-2"
          : goalObj && goalObj.achievedFP === 0
          ? "border-yellow-500 border"
          : "border"
      )}
    >
      <p>Date: {date}</p>
      {goalObj ? (
        <>
          <p>
            FP: {goalObj.achievedFP}/{goalObj.targetFP}
          </p>
          <p>Tasks: {goalObj.nbWorkouts}</p>
          {fetchState === "UNKNOWN" ? (
            <p
              onClick={getUserActs}
              className="text-sm text-red-500 cursor-pointer underline"
            >
              See Workouts
            </p>
          ) : fetchState === "FETCHING" ? (
            <p className="text-sm text-red-500">Loading...</p>
          ) : (
            <TaskList activities={activities} />
          )}
        </>
      ) : (
        <p>NO ACTIVITY</p>
      )}

      <div className="pt-4">
        {stepObj ? (
          <div>
            <p>Steps: {stepObj.steps}</p>
          </div>
        ) : (
          <div>
            <p>NO STEPS</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyCard;
