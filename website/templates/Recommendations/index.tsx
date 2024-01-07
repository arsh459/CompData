import { useUserV2 } from "@hooks/auth/useUserV2";
import { allDayUpdate } from "@hooks/dayRecs/useDayRec";
import { useDayRecs } from "@hooks/dayRecs/useDayRecs";
// import Filter from "@templates/AdminDashboard/Filter";
// import DatesModal from "@templates/AdminDashboard/FilterModal/DatesModal";
// import { getFilterName } from "@templates/AdminDashboard/FilterModal/utils";
// import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import clsx from "clsx";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
// import { useState } from "react";
import DateModal from "./DateModal";
import { useCalendar } from "./hooks/useCalendar";
import RecommendationCard from "./RecommendationCard";
import { getTimezone } from "./utils";

interface Props {
  uid: string;
  type: "workout" | "nutrition";
  toggleType: (newType: "workout" | "nutrition") => void;
}

// const nowDate = new Date();
// const now = new Date(
//   nowDate.getFullYear(),
//   nowDate.getMonth(),
//   nowDate.getDate(),
//   0,
//   0,
//   0,
//   0
// ).getTime();
// const now_7 = now + 7 * 24 * 60 * 60 * 1000;

// console.log(now, now_7);

const RecommendationsDashboard: React.FC<Props> = ({
  uid,
  type,
  toggleType,
}) => {
  const { st, en, q } = useCalendar();

  const { user } = useUserV2(uid);
  const tz = getTimezone(user);

  // const router = useRouter();
  // const q = router.query as { dS?: string; dE?: string };

  // const st = q?.dS ? parseInt(q.dS) : now;
  // const en = q?.dE ? parseInt(q.dE) : now_7;
  const [loading, setLoading] = useState<boolean>(false);

  const { recomendations, refreshPage } = useDayRecs(
    uid,
    st,
    en,
    type,
    type === "workout" ? user?.badgeId : user?.nutritionBadgeId
  );
  const coach = useUserV2(user?.recommendationConfig?.primaryWorkoutCoach);

  // const [modalState, setModalState] = useState<boolean>(false);
  // const onCloseModal = () => setModalState(false);
  // const onOpenModal = () => setModalState(true);

  const refreshRecs = async () => {
    setLoading(true);

    // console.log(st, en);
    // console.log((en - st) / (24 * 60 * 60 * 1000));

    await allDayUpdate(uid, 7, type, true, true);

    refreshPage();
    setLoading(false);
  };
  // console.log(recomendations);

  return (
    <div className="p-4">
      <p>User: {user?.name}</p>
      <Link href={`/admin/u/${user?.uid}`}>
        <p className="underline cursor-pointer">UID: {user?.uid}</p>
      </Link>
      <p>Daily FP: {user?.dailyFPTarget}</p>
      <p>Daily Kcal: {user?.dailyKCalTarget}</p>
      <p>Daily Step: {user?.dailyStepTarget}</p>
      <p className="font-medium">
        Base Tier: {user?.recommendationConfig?.baseTier}
      </p>
      {user?.recommendationConfig?.start ? (
        <p className="font-medium">
          Workout Start Time:{" "}
          {format(new Date(user.recommendationConfig?.start), "dMMM h:mmaaa")}
        </p>
      ) : (
        <p className="font-medium text-red-500">WORKOUT NOT STARTED</p>
      )}
      {user?.recommendationConfig?.nutritionStart ? (
        <p className="font-medium">
          Diet Start Time:{" "}
          {format(
            new Date(user.recommendationConfig?.nutritionStart),
            "dMMM h:mmaaa"
          )}
        </p>
      ) : (
        <p className="font-medium text-red-500">DIET NOT STARTED</p>
      )}
      <p className="font-bold">
        Primary Coach: {coach.user?.name ? coach.user.name : "MIX"}
      </p>
      <div className="py-2">
        <p className="">Workout Days: </p>
        <div className="flex flex-wrap w-1/2">
          {user?.recommendationConfig?.workoutDays &&
            user?.recommendationConfig.workoutDays.map((item) => {
              return (
                <div key={item} className="pr-2">
                  <p className="text-gray-700">{item}</p>
                </div>
              );
            })}

          {!user?.recommendationConfig?.workoutDays ? (
            <div className="pr-2">
              <p className="text-gray-700">ALL Days</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="py-4 flex">
        {loading ? (
          <p className="text-red-500 underline text-lg font-bold cursor-pointer">
            Loading ...
          </p>
        ) : (
          <p
            onClick={refreshRecs}
            className="text-red-500 underline text-lg font-bold cursor-pointer"
          >
            Refresh
          </p>
        )}

        <Link href={`/admin/teamCheck/${user?.uid}`}>
          <p className="text-green-500 underline text-lg px-4 font-bold cursor-pointer">
            Edit
          </p>
        </Link>
      </div>

      <div className="py-4">
        <DateModal q={q} />
      </div>

      <div className="flex items-center py-4 text-lg">
        <p
          onClick={() => toggleType("workout")}
          className={clsx(
            type === "workout" ? "underline font-bold" : "",
            "pr-4 text-blue-500"
          )}
        >
          Workouts
        </p>
        <p
          onClick={() => toggleType("nutrition")}
          className={clsx(
            type === "nutrition" ? "underline font-bold" : "",
            "pr-4 text-red-500"
          )}
        >
          Diet
        </p>
      </div>

      <div className="pt-4  ">
        {recomendations.map((item) => {
          return (
            <div
              key={item.id}
              className={clsx(
                "border p-4 mb-4",
                item.manual ? "border-red-500 border-2" : ""
              )}
            >
              <RecommendationCard tz={tz} uid={uid} rec={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationsDashboard;
