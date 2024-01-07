import { dayRecommendation } from "@models/User/User";
import BadgeName from "@modules/UserDaily/BadgeName";
import Link from "next/link";
import TaskCard from "./TaskCard";

interface Props {
  rec: dayRecommendation;
  uid: string;
  tz: string;
}

const RecommendationCard: React.FC<Props> = ({ rec, uid, tz }) => {
  return (
    <div className="">
      <div className="flex justify-between">
        <div>
          <p>{rec.date}</p>
          <BadgeName keyStr="badge Name" id={rec.badgeId} />
          <p>Day {rec.day}</p>
          {typeof rec.overrideDay === "number" ? (
            <p className="text-xs">Override Day {rec.overrideDay}</p>
          ) : null}
          {rec.propagateDate ? (
            <p className="text-blue-500 text-xs">
              Propogate Day {rec.propagateDate ? "True" : "False"}
            </p>
          ) : null}
        </div>
        <Link href={`/admin/u/${uid}/recs/${rec.id}`}>
          <p className="text-red-500 underline">Edit</p>
        </Link>
      </div>
      <div className="">
        {rec.tasks.map((item) => {
          return (
            <div key={item.id}>
              <TaskCard
                tz={tz}
                taskId={item.id}
                manual={item.manual}
                uid={uid}
                selectedUnix={rec.unix}
                date={rec.date}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationCard;
