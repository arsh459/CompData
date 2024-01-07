import { NOISE_CANCELLATION_TH } from "@constants/gameStats";

import { FirestoreTerra } from "@models/Terra/TerraUser";
import clsx from "clsx";
import { format } from "date-fns";

interface Props {
  item: FirestoreTerra;
}

const RawActivityLine: React.FC<Props> = ({ item }) => {
  //   console.log("rawActivities", rawActivities);

  return (
    <div key={item.metadata?.summary_id} className="flex justify-between">
      <div className="flex">
        <p className="text-gray-500 text-xs pr-4">{item.device_data.name}</p>

        <p className="text-gray-500 text-xs pr-4">
          {typeof item.metadata.upload_type === "number" &&
          item.metadata.upload_type === 0
            ? "Unknown"
            : item.metadata.upload_type === 1
            ? "Automatic"
            : item.metadata.upload_type === 2
            ? "Manual"
            : ""}
        </p>

        <p className="text-gray-500 text-xs">
          {item.metadata.start_time
            ? format(new Date(item.metadata.start_time), "hh:mmaaa")
            : "NA"}
        </p>

        <p className="text-gray-500 text-xs">
          -
          {item.metadata.end_time
            ? format(new Date(item.metadata.end_time), "hh:mmaaa")
            : "NA"}
        </p>
      </div>
      <p
        className={clsx(
          "text-gray-700 text-xs pl-8",
          item.calories_data.net_activity_calories &&
            item.calories_data.net_activity_calories < NOISE_CANCELLATION_TH
            ? "line-through"
            : ""
        )}
      >
        {" "}
        {item.calories_data.net_activity_calories
          ? Math.round(item.calories_data.net_activity_calories)
          : "0"}{" "}
        cals
      </p>
    </div>
  );
};

export default RawActivityLine;
