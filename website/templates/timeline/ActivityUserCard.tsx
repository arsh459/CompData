import { Activity } from "@models/Activities/Activity";
import { format } from "date-fns";
import UserActivityDetails from "./UserActivityDetails";

interface Props {
  dtBucket: string;
  start: number;
  end: number;
  uid: string;
  activities?: Activity[];
}

const ActivityUserCard: React.FC<Props> = ({
  activities,
  start,
  end,
  dtBucket,
  uid,
}) => {
  // console.log("item", item);

  return (
    <div className="shadow-sm p-4 border rounded-md">
      <div>
        <p className="text-gray-700 font-semibold text-lg">{dtBucket}</p>
        <p className="text-gray-700 text-sm">
          {`${format(new Date(start), "h:mmaaa d MMM")} - 
          ${format(new Date(end), "h:mmaaa d MMM")}`}
        </p>

        <div className="flex flex-wrap pt-4">
          {activities?.map((item) => {
            return (
              <div key={item.postId} className="flex pr-2 pb-2">
                <UserActivityDetails uid={uid} activity={item} />
              </div>
            );
          })}
        </div>
        {/* <p className="text-gray-700 text-lg">{item.activityName}</p>
        <p className="text-gray-500 text-base">{item.source}</p>
        <p className="text-gray-500 text-base">
          {item.createdOn
            ? format(new Date(item.createdOn), "h:mmaaa d MMM")
            : "Unknown"}
        </p> */}
      </div>
    </div>
  );
};

export default ActivityUserCard;
