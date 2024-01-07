import { eventLiveState } from "@hooks/workouts/live/useLiveAccess";
import { WorkoutActivity } from "@models/Workouts/WorkoutActivity";
import { format } from "date-fns";
import FloatingFooter from "./FloatingFooter";

interface Props {
  onJoin: () => void;
  eventState: eventLiveState;
  earliestStartTime: number;
  state?: "active" | "inactive";
  userStream?: WorkoutActivity;
  onLeaveLiveVideo: () => void;
}

const LiveFloatingFooter: React.FC<Props> = ({
  onJoin,
  eventState,
  earliestStartTime,
  state,
  onLeaveLiveVideo,
}) => {
  console.log("eventState", eventState);
  return (
    <>
      {eventState === "upcoming" ? (
        <div className="sticky bottom-0 left-0 right-0 z-50">
          <div className="border-t rounded-t-lg shadow-2xl p-2 bg-white">
            <div className="flex items-center justify-center">
              <p className="text-2xl text-gray-500 text-center font-medium">{`Starting at:`}</p>
              <p className="text-2xl text-red-500 text-center font-medium pl-1">{`${format(
                new Date(earliestStartTime),
                "h:mmaaa d MMM"
              )}`}</p>
            </div>
          </div>
        </div>
      ) : eventState === "ongoing" && state === "active" ? (
        <div className="sticky bottom-0 left-0 right-0 z-50">
          <FloatingFooter
            // leftText={`₹${formatWithCommas(series.cost)}`}
            cta={"Leave live"}
            appearance="ghost"
            onClick={onLeaveLiveVideo}
            link={``}
          />
        </div>
      ) : eventState === "ongoing" ? (
        <div className="sticky bottom-0 left-0 right-0 z-50">
          <FloatingFooter
            // leftText={`₹${formatWithCommas(series.cost)}`}
            cta={"Join now"}
            appearance="contained"
            onClick={onJoin}
            link={``}
          />
        </div>
      ) : null}
    </>
  );
};

export default LiveFloatingFooter;
