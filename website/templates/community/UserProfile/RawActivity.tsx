import Divider from "@components/divider/Divider";
import { FirestoreTerra } from "@models/Terra/TerraUser";

interface Props {
  activity: FirestoreTerra;
}

const RawActivity: React.FC<Props> = ({ activity }) => {
  return (
    <div>
      {activity.metadata.start_time && activity.metadata.end_time ? (
        <div className="">
          <p className="text-base font-medium cursor-pointer text-gray-700">{`${new Date(
            activity.metadata.start_time
          ).toLocaleTimeString("default", {
            hour: "2-digit",
            hourCycle: "h12",
            minute: "2-digit",
          })} - ${new Date(activity.metadata.end_time).toLocaleTimeString(
            "default",
            {
              hour: "2-digit",
              hourCycle: "h12",
              minute: "2-digit",
            }
          )}`}</p>
          {activity.calories_data.net_activity_calories ? (
            <p className="text-gray-500 font-medium">
              {Math.round(activity.calories_data.net_activity_calories)}{" "}
              calories
            </p>
          ) : null}
          {activity.device_data ? (
            <div className="flex items-center">
              <p className="text-sm text-gray-500 font-medium pr-1">
                Logged with
              </p>
              <p className="text-blue-500 text-sm font-semibold capitalize">
                {`${
                  activity.device_data.manufacturer
                    ? activity.device_data.manufacturer
                    : ""
                } ${activity.device_data.name}`}
              </p>
            </div>
          ) : null}

          <div className="pt-4">
            <Divider />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RawActivity;
