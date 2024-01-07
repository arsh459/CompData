import { UserInterface } from "@models/User/User";
import { format } from "date-fns";
import Link from "next/link";
import BadgeName from "./BadgeName";
import PastProgress from "./PastProgress";
import { getTimezone } from "@templates/Recommendations/utils";

interface Props {
  user: UserInterface;
}

export const getTimeStr = (unix?: number) => {
  if (unix) {
    return format(new Date(unix), "yyyy-MM-dd");
  }

  return "";
};

const UserDaily: React.FC<Props> = ({ user }) => {
  const authSignUp = getTimeStr(user.authSignupTime);
  const workoutStart = getTimeStr(user.recommendationConfig?.start);
  const nutritionStart = getTimeStr(user.recommendationConfig?.nutritionStart);

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
      </div>
      <div>
        <PastProgress uid={user.uid} tz={getTimezone(user)} />
      </div>
    </div>
  );
};

export default UserDaily;
