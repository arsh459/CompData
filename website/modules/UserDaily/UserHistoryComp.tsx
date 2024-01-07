import { UserInterface } from "@models/User/User";
import { format } from "date-fns";
import Link from "next/link";
import BadgeName from "./BadgeName";
import { useUserActivities } from "./hooks/useUserActivities";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

interface Props {
  user: UserInterface;
}

const getTimeStr = (unix?: number) => {
  if (unix) {
    return format(new Date(unix), "yyyy-MM-dd");
  }

  return "";
};

const UserHistoryComp: React.FC<Props> = ({ user }) => {
  const authSignUp = getTimeStr(user.authSignupTime);
  const workoutStart = getTimeStr(user.recommendationConfig?.start);
  const nutritionStart = getTimeStr(user.recommendationConfig?.nutritionStart);

  const { workoutActs, dietActs } = useUserActivities(user.uid);

  const [loading, setLoading] = useState<boolean>(false);
  const recalculate = async () => {
    setLoading(true);

    axios({
      url: "/api/recalculate",
      method: "POST",
      data: {
        uid: user.uid,
      },
      params: { uid: user.uid },
    })
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  return (
    <div className="p-4 ">
      <div className="p-4 border">
        <p>Name: {user?.name}</p>
        <p>UID: {user?.uid}</p>
        <BadgeName id={user.badgeId} keyStr="Workout" />
        <BadgeName id={user.nutritionBadgeId} keyStr="Diet Plan" />

        <div className="pt-4">
          <p>SignUp Start: {authSignUp}</p>
          <p>Workout Start: {workoutStart}</p>
          <p>Diet Start: {nutritionStart}</p>
        </div>
        <Link href={`/admin/u/${user.uid}`}>
          <p className="underline text-red-500">CHECK User Details</p>
        </Link>

        <div className="flex">
          {loading ? (
            <p>Loading</p>
          ) : (
            <Button variant="contained" onClick={recalculate}>
              Recalculate Rings
            </Button>
          )}
        </div>
      </div>
      <div className="bg-blue-50 border">
        <p className="text-xl">Workouts</p>
        {workoutActs.map((item) => {
          const fp = Math.round((item.calories ? item.calories : 0) / 300);
          return (
            <div className="flex py-2" key={item.id ? item.id : item.postId}>
              <p className="pr-8">
                {item.date
                  ? item.date
                  : item.createdOn
                  ? format(new Date(item.createdOn), "yyyy-MM-dd")
                  : "No Date"}
              </p>
              <p className="text-green-500 pr-8">{fp} FP</p>
              <p className="font-medium ">{item.activityName}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-red-50 pt-10 border">
        <p className="text-xl">DIET</p>
        {dietActs.map((item) => {
          const fp = Math.round((item.calories ? item.calories : 0) / 300);
          return (
            <div className="flex py-2" key={item.id ? item.id : item.postId}>
              <p className="pr-8">
                {item.date
                  ? item.date
                  : item.createdOn
                  ? format(new Date(item.createdOn), "yyyy-MM-dd")
                  : "No Date"}
              </p>
              <p className="text-green-500 pr-8">{fp} FP</p>
              <p className="font-medium ">{item.activityName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserHistoryComp;
