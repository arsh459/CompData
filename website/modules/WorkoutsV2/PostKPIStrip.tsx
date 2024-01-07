import { getElapsedSecondsString } from "@modules/PaymentPopover/utils";
import PostKPI from "./PostKPI";

interface Props {
  points?: number;
  time?: number;
  activityName?: string;
  rank?: number;
  pointsString?: string;
}

const PostKPIStrip: React.FC<Props> = ({
  points,
  time,
  activityName,
  rank,
  pointsString,
}) => {
  return (
    <div>
      <p className="text-gray-700 font-semibold text-2xl pb-2 capitalize">
        {activityName}
      </p>
      <div className="flex justify-start">
        {pointsString ? (
          <div>
            <PostKPI kpiString={pointsString} icon="flame" label="Points" />
          </div>
        ) : typeof points === "number" ? (
          <div>
            <PostKPI kpi={points} icon="flame" label="Points" />
          </div>
        ) : null}
        {typeof time === "number" ? (
          <div className="pl-8">
            <PostKPI
              kpi={getElapsedSecondsString(time)}
              icon="clock"
              textColor="gray"
              label="Time"
            />
          </div>
        ) : (
          <div className="pl-8">
            <PostKPI
              kpiString={pointsString}
              icon="clock"
              textColor="gray"
              label="Points"
            />
          </div>
        )}
        {typeof rank === "number" ? (
          <div className="pl-8">
            <PostKPI kpi={rank} textColor="gray" icon="trophy" label="Rank" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PostKPIStrip;
