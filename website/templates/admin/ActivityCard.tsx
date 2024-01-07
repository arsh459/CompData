// import { useUser } from "@hooks/auth/useUser";
import Loading from "@components/loading/Loading";
import { useRawActivities } from "@hooks/activities/useRawActivities";
import { Activity } from "@models/Activities/Activity";
import { useState } from "react";
import { terraResyncDay_internal } from "./resync";
// import { Link } from "@mui/material";

interface Props {
  activity: Activity;
}

const ActivityCard: React.FC<Props> = ({ activity }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  // const [daySync, setFirestoreDaySync] = useState<string>();

  const { rawActivities, actSum } = useRawActivities(
    activity.authorUID,
    activity.postId,
    true
  );

  const resyncAct = async () => {
    if (activity.authorUID && activity.date) {
      setLoading(true);
      try {
        const response = await terraResyncDay_internal(
          activity.authorUID,
          activity.date
        );
        setLoading(false);

        // console.log(response);
        if (response?.details) {
          let didError = false;
          // let erroredDays = '';
          for (const uid of Object.keys(response.details)) {
            if (!response.details[uid]) {
              didError = true;
            }
          }

          if (didError) {
            setError(true);
            // setFirestoreDaySync(response.details)
          }
        }

        // if (status === "failed") {
        //   setError(true);
        // } else {
        //   setError(false);
        // }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
        setError(true);
      }
    }
  };

  const date = activity.createdOn
    ? new Date(activity.createdOn).toString()
    : "No date";

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">{activity.calories} cals</p>
          {loading ? (
            <div className="flex items-center">
              <Loading fill="#ff735c" width={24} height={24} />
            </div>
          ) : (
            <p
              className="text-xs text-orange-500 cursor-pointer"
              onClick={resyncAct}
            >
              {`Resync ${error ? ` - errored` : ""}`}
            </p>
          )}
        </div>
        <p className="text-sm">TS: {date}</p>
        <p className="text-sm">Bucket: {activity.date}</p>
        <p className="text-sm text-green-500">
          {activity.source ? activity.source : "Manual"}
        </p>
      </div>

      <div className="pt-2">
        <div className="flex items-center">
          <p className="text-sm font-semibold">{`Raw data:`}</p>
          <p className="text-sm pl-1">{`${actSum}cals`}</p>
        </div>
        {rawActivities.map((item) => {
          return (
            <div key={item.metadata.summary_id} className="w-full">
              <div className="flex items-center justify-between pb-0.5">
                <p className="text-xs text-gray-500">
                  {item.metadata.start_time
                    ? new Date(item.metadata.start_time).toDateString()
                    : ""}
                </p>
                <p className="text-xs text-gray-500">{item.metadata.name}</p>
                <p className="text-xs text-gray-700 font-semibold">
                  {Math.round(
                    item.calories_data.net_activity_calories
                      ? item.calories_data.net_activity_calories
                      : 0
                  )}{" "}
                  cals
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityCard;
