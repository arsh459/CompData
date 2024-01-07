// import { useUserV2 } from "@hooks/auth/useUserV2";
import { useDayRec } from "@hooks/dayRecs/useDayRec";
// import { useDayRecs } from "@hooks/dayRecs/useDayRecs";
import { UserInterface } from "@models/User/User";
// import { format } from "date-fns";
import Link from "next/link";
import EditRec from "./EditRec";
// import RecommendationCard from "./RecommendationCard";
import TaskCard from "./TaskCard";
import { getTimezone } from "./utils";

interface Props {
  user: UserInterface;
  id: string;
  type: "workout" | "nutrition";
}

// const nowDate = new Date();

const DateEditorDash: React.FC<Props> = ({ user, id, type }) => {
  // console.log("date", dateUnix);

  const { recomendation, updateRec, saveRecommendationChanges, loading } =
    useDayRec(user.uid, id, type);

  // console.log(recomendation);

  return (
    <div className="p-4">
      <p>User: {user?.name}</p>
      <p className="font-bold">Date: {recomendation?.date}</p>
      <p className="font-bold text-red-500">
        AI STATUS: {recomendation?.manual ? "MANUAL" : "AUTOMATIC"}
      </p>
      <Link href={`/admin/u/${user.uid}`}>
        <p className="underline cursor-pointer">UID: {user?.uid}</p>
      </Link>

      {recomendation && !loading ? (
        <div className="pt-4">
          <EditRec
            saveRecommendationChanges={saveRecommendationChanges}
            currentRec={recomendation}
            updateRec={updateRec}
          />

          <div className="pt-8">
            <p className="font-bold text-lg">Tasks given to user</p>
            {recomendation.tasks.map((item, index) => {
              return (
                <div key={`${item.id}-${index}`} className="">
                  <TaskCard
                    manual={item.manual}
                    taskId={item.id}
                    uid={user.uid}
                    selectedUnix={recomendation.unix}
                    tz={getTimezone(user)}
                    date={recomendation.date}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DateEditorDash;
