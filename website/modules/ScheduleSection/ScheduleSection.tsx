import { useBadgeTasks } from "@hooks/badges/useBadgeTasks";
import axios from "axios";
import { useState } from "react";
import SingleDayAdder from "./SingleDayAdder";
import { useBadgeListener } from "@hooks/badges/useBadgeListener";
import UserSelectorForBadge from "./UserSelectorForBadge";
import { UserInterface } from "@models/User/User";

import { useActiveNutritionTarget } from "@hooks/configs/useActiveNutritionTarget";
// import TaskBank from "./TaskBank";

interface Props {
  gameId: string;
  badgeId: string;
}

const dayArray = Array.apply(null, Array(90));

const ScheduleSection: React.FC<Props> = ({ gameId, badgeId }) => {
  const { badge } = useBadgeListener(gameId, badgeId);
  const { tasksInBadge } = useBadgeTasks(badgeId);
  const [selectedUser, setSelectedUser] = useState<UserInterface>();
  const [loading, setLoading] = useState<boolean>(false);

  const { nutritionTarget } = useActiveNutritionTarget(selectedUser?.uid);

  const onRefresh = async () => {
    if (tasksInBadge.length) {
      try {
        setLoading(true);
        const res = await axios({
          url: "/api/rec/badgeRefresh",
          method: "POST",
          params: { badgeId: badgeId, reconcile: true },
        });
        console.log("res", res);
        setLoading(false);
      } catch (e) {
        alert("Request failed");
        setLoading(false);
      }
    }
  };

  const hardRefresh = async () => {
    if (tasksInBadge.length) {
      try {
        setLoading(true);
        const res = await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/badgeUpdate`,
          method: "POST",
          params: { badgeId: badgeId, recreate: true },
        });
        console.log("res", res);
        setLoading(false);
      } catch (e) {
        alert("Request failed");
        setLoading(false);
      }
    }
  };

  const futureRefresh = async () => {
    if (tasksInBadge.length) {
      try {
        setLoading(true);
        const res = await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/badgeUpdate`,
          method: "POST",
          params: { badgeId: badgeId, recreate: false },
        });
        console.log("res", res);
        setLoading(false);
      } catch (e) {
        alert("Request failed");
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4">
      <p className="text-lg font-medium">{badge?.name}</p>
      {loading ? null : tasksInBadge.length ? (
        <div className="flex py-4">
          <div className="pl-0">
            <p
              onClick={onRefresh}
              className="text-green-500 text-sm cursor-pointer underline"
            >
              Update BADGE
            </p>
            <p className="text-xs font-light">(Updates badge changes)</p>
          </div>

          <div className="pl-4">
            <p
              onClick={futureRefresh}
              className="text-blue-500 text-sm cursor-pointer underline"
            >
              Future Refresh Users
            </p>
            <p className="text-xs font-light">
              (Will only update tasks in future)
            </p>
          </div>

          <div className="pl-4">
            <p
              onClick={hardRefresh}
              className="text-red-500 text-sm cursor-pointer underline"
            >
              HARD Refresh Users
            </p>
            <p className="text-xs font-light">
              Will update assigned tasks in PAST & FUTURe
            </p>
          </div>
        </div>
      ) : null}

      <div className="py-4">
        <UserSelectorForBadge
          badgeId={badgeId}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>

      {/* <div>
        <TaskBank tasks={tasksInBadge} />
      </div> */}

      {dayArray.map((_, index) => {
        const isPresentArr = badge?.workoutLevels
          ? badge?.workoutLevels.filter((item) => item.day === index)
          : [];

        return (
          <div className="p-2" key={`day-${index}`}>
            <div className="flex items-center">
              <p>Day {index}</p>
              {/* {isPresentArr.length ? (
                <div className="ml-2 pl-4 border">
                  <p className="pl-4 text-xs text-green-500">Present</p>
                  <p>Tk: {isPresentArr[0].nbWorkouts}</p>
                  <p>FP: {isPresentArr[0].nbFitpoints}</p>
                </div>
              ) : null} */}
            </div>

            <SingleDayAdder
              day={index}
              nutritionTarget={nutritionTarget}
              dayObj={isPresentArr[0] ? isPresentArr[0] : undefined}
              badgeId={badgeId}
              onRefresh={onRefresh}
              badgeTasks={tasksInBadge}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleSection;
