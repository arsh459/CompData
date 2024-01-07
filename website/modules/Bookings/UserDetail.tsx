import { useUserV2 } from "@hooks/auth/useUserV2";
import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";
import { UserInterface } from "@models/User/User";
import BadgeName from "@modules/UserDaily/BadgeName";
import Recommendations from "./Recommendations";
import Link from "next/link";
import SlotStatusAdder from "./SlotStatusAdder";
import UserCheckpoints from "./UserCheckpoints";
// import SlotStatusAdder from "./SlotStatusAdder";

interface Props {
  user: UserInterface;
  showSlotLink: boolean;
}

const UserDetail: React.FC<Props> = ({ user, showSlotLink }) => {
  const { expiryString } = usePaidStatus(user.uid);
  const motivatedUser = useUserV2(user.motivatedBy);
  return (
    <div>
      <div className="pt-8">
        <p>User Details</p>
        <p className="text-red-500">PAID STATUS: {expiryString}</p>
        <p className="text-green-500">
          Referred By:{" "}
          {motivatedUser?.user?.name ? motivatedUser.user.name : "SocialBoat"}
        </p>
        <p>Name: {user?.name}</p>
        <p>UID: {user?.uid}</p>
        <p>Phone: {user?.phone}</p>
        <p>Email: {user?.email}</p>
        <p>Gender: {user?.gender}</p>
        <p>Age: {user?.age}</p>
        <p>Current weight: {user?.weight}</p>
        <p>Current Height: {user?.height}</p>
        <p>Desired weight: {user?.desiredWeight}</p>
        <p>Current body: {user?.currentBodyType}</p>
        <p>Desired body: {user?.desiredBodyType}</p>
        <p>Fitness Goal: {user?.fitnessGoal?.join(", ")}</p>
        <p>PCOS Symptoms: {user?.pcosSymptoms?.join(", ")}</p>
        <p>PCOS diagnosed time: {user?.diagnosedPeriod}</p>
        <p>Current Cycle Length: {user?.cycleLength}</p>
        <p className="font-medium">
          Workout frequency:{" "}
          {user?.workoutFrequency === "1_3"
            ? "1 to 3 times/week"
            : user?.workoutFrequency === "2_5"
            ? "2 to 5 times /week"
            : user?.workoutFrequency}
        </p>
        <p>Fitness Goal: {user?.fitnessGoal?.join(", ")}</p>

        <p>Fitness Concerns: {user?.fitnessConcerns?.join(", ")}</p>
        <p>Reps: {user?.repsCount}</p>

        <p>Pace in month: {user?.paceOfAchievementInMonth}</p>
        <p>Difficulty: {user?.difficulty}</p>
        <p>FP Target: {user?.dailyFPTarget}</p>
        <p>Step Target: {user?.dailyStepTarget}</p>
        <p>KCal Target: {user?.dailyKCalTarget}</p>

        <p>Can send notifications: {user.tokens?.length ? "TRUE" : "FALSE"}</p>

        <BadgeName keyStr="Workouts: " id={user.badgeId} />
        <BadgeName keyStr="Diets: " id={user.nutritionBadgeId} />

        <p className="text-lg font-medium pb-2">
          Onboarding Status {user?.onboardingCallStatus}
        </p>

        {showSlotLink ? (
          <div>
            <Link href={`/admin/bookings`}>
              <p>To update Slot status</p>
            </Link>
            <div className="pt-4">
              <p className="text-lg font-medium pb-2">
                CALL STATUS. WILL NOT UDPATE PAGER STATUS
              </p>
              <SlotStatusAdder user={user} />
            </div>
          </div>
        ) : null}

        <UserCheckpoints user={user} />

        <Recommendations uid={user.uid} />
      </div>
    </div>
  );
};

export default UserDetail;
