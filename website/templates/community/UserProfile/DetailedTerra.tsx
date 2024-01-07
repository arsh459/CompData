import { useRawActivities } from "@hooks/activities/useRawActivities";
import { useRawActivitiesExist } from "@hooks/activities/useRawActivitiesExist";
import { useState } from "react";
import RawActivity from "./RawActivity";

interface Props {
  uid: string;
  activityId?: string;
}

const DetailedTerra: React.FC<Props> = ({ uid, activityId }) => {
  const [viewState, setViewState] = useState<boolean>(false);

  const { rawActivities } = useRawActivities(uid, activityId, viewState);
  const remote = useRawActivitiesExist(uid, activityId);
  // console.log("remote", remote);
  return (
    <div className="pl-4">
      {remote.rawActivities.length > 0 ? (
        <div className="pt-2 flex justify-end">
          <p
            className="text-gray-700 cursor-pointer text-sm"
            onClick={() => setViewState((prev) => !prev)}
          >
            {viewState ? "Show less" : "Show more"}
          </p>
        </div>
      ) : null}

      <div>
        {viewState &&
          rawActivities.map((item, index) => {
            return (
              <div key={`${activityId}-${index}`} className="pb-4 ">
                <RawActivity activity={item} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DetailedTerra;
