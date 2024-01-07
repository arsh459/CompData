import MoreText from "@components/MoreText/MoreText";
import { Link } from "@mui/material";

interface Props {
  eventName?: string;
  eventDescription?: string;
  creatorName?: string;
  creatorKey?: string;
  creatorUID: string;
  // onProfilePress: () => void;
}

const EventBrief: React.FC<Props> = ({
  eventDescription,
  eventName,
  creatorName,
  creatorKey,
  creatorUID,
  // onProfilePress,
}) => {
  return (
    <div>
      <p className="text-gray-700 text-4xl font-semibold">{eventName}</p>

      <div className="flex">
        <Link href={`/p/${creatorUID}`}>
          <div className="flex items-center pb-1">
            <p className="text-gray-700 text-sm">By</p>
            <p className="text-orange-500 font-bold text-sm pl-1 underline cursor-pointer">
              {creatorName}
            </p>
          </div>
        </Link>
      </div>

      {eventDescription ? (
        <MoreText text={eventDescription} numChars={140} />
      ) : null}
    </div>
  );
};

export default EventBrief;
