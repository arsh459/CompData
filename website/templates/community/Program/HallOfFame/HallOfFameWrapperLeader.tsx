import HallOfFame from "./HallOfFame";
import HallOfFameEvent from "./HallOfFameEvent";

interface Props {
  uid?: string;
  eventId?: string;
  live: boolean;
}

const HallOfFameWrapper: React.FC<Props> = ({ eventId, uid, live }) => {
  // console.log("eventId", eventId);
  return (
    <div>
      {eventId ? (
        <HallOfFameEvent eventId={eventId} />
      ) : (
        <HallOfFame uid={uid} live={live} />
      )}
    </div>
  );
};

export default HallOfFameWrapper;
