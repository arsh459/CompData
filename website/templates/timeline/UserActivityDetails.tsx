import { usePostWithRef } from "@hooks/activities/usePostWithRef";
import { useRawActivities } from "@hooks/activities/useRawActivities";
import { Activity } from "@models/Activities/Activity";
import clsx from "clsx";
import { format } from "date-fns";
import PostSnippet from "./PostSnippet";
import RawActivityLine from "./RawActivityLine";

interface Props {
  uid: string;
  activity: Activity;
}

const UserActivityDetails: React.FC<Props> = ({ activity, uid }) => {
  const { rawActivities, actSum, countedSum } = useRawActivities(
    uid,
    activity.id,
    true
  );

  const { post } = usePostWithRef(activity.postRef);

  // console.log(post);

  // console.log("actSum", actSum);
  // console.log("countedSum", countedSum);
  // console.log(activity);

  return (
    <div className="border px-4 py-2 shadow-sm">
      <p>{activity.activityName}</p>
      <p
        className={clsx(
          activity.source === "terra"
            ? "text-green-500"
            : activity.source === "task"
            ? "text-red-500"
            : "text-blue-500"
        )}
      >
        {activity.source}
      </p>

      {activity.createdOn ? (
        <div className="py-2">
          <p className="text-gray-700 text-sm">
            Created: {format(new Date(activity.createdOn), "h:mmaaa d MMM")}
          </p>
          <p className="text-gray-700 text-sm">
            Duration:{" "}
            {activity.timeInSeconds ? `${activity.timeInSeconds}s` : "no time"}
          </p>
        </div>
      ) : null}

      <div className="flex pt-2">
        <p className="text-gray-500 text-sm pr-2">{activity.calories} cals</p>
        <p className="text-gray-500 text-sm">
          {activity.fitPointsV2 ? activity.fitPointsV2 : "0"} pts
        </p>
      </div>

      <div className="pt-2">
        {rawActivities.map((item) => {
          return (
            <div key={item.metadata?.summary_id}>
              <RawActivityLine item={item} />
            </div>
          );
        })}
        <div className="flex justify-end pt-2">
          <div className="">
            <p className="text-xs text-right text-gray-500 line-through">
              Total: {actSum}
            </p>
            <p className="text-green-500 text-right font-semibold text-xs">
              Count: {countedSum}
            </p>
          </div>
        </div>
      </div>

      {post ? (
        <div className="pt-4">
          <p className="text-sm text-gray-700 font-semibold">Post:</p>
          <PostSnippet post={post} />
        </div>
      ) : null}
    </div>
  );
};

export default UserActivityDetails;
