import IconButton from "@components/button/iconButton";
import { EventInterface } from "@models/Event/Event";
import { getHeight } from "@templates/community/Program/getAspectRatio";
// import MediaCarousel from "@templates/listing/HeaderImage/MediaCarousel";
// import { getHeight } from "@templates/community/Program/getAspectRatio";
// import MediaCarousel from "@templates/listing/HeaderImage/MediaCarousel";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { formatWithCommas } from "@utils/number";
import clsx from "clsx";
// import Link from "next/link";
import Linkify from "react-linkify";

interface Props {
  event: EventInterface;
  minWidth?: "sm";
  invitationVisible: boolean;
  onClick: () => void;
  onButtonClick: () => void;
  onDelete?: () => void;
  validEventText: string;
  invalidEventText: string;
}

const EventCard: React.FC<Props> = ({
  event,
  onClick,
  onDelete,
  onButtonClick,
  // minWidth,
  invitationVisible,
  validEventText,
  invalidEventText,
}) => {
  // console.log("event", event);
  return (
    <div
      className={clsx(
        "rounded-lg shadow-xl",
        // "min-h-[360px] md:min-h-[410px]",
        // "max-w-sm sm:w-52",
        // "w-full",
        // "pixelXl:w-44",
        // "sm:w-56",
        "w-full",
        // "max-w-xs",
        // minWidth ? "sm:w-52" : "",
        "hover:shadow-2xl cursor-pointer",
        "relative",
        "bg-white"
        // "p-2"
      )}
    >
      <div onClick={onClick}>
        {event.media.length > 0 ? (
          <div className="aspect-w-2 aspect-h-2">
            <MediaTile
              width={400}
              height={getHeight(event.media[0], 400)}
              media={event.media[0]}
              // heightString="h-40"
              rounded={true}
              live={true}
              alt="img"
              paused={true}
            />
          </div>
        ) : (
          <div />
        )}

        {/* <MediaCarousel
          paused={true}
          rounded={true}
          size="45vh"
          media={event.media}
        /> */}
      </div>
      <div className={clsx("p-2 pb-0")} onClick={onClick}>
        <p className={clsx("text-sm font-medium text-gray-800 line-clamp-2")}>
          {event.name ? event.name : `New event - ${event.id.slice(0, 4)}`}
        </p>
        <p className="text-sm text-gray-500 line-clamp-2">
          {event.description ? `${event.description} ...` : "Add description"}
        </p>
        <p className="text-sm text-gray-700">
          {event.cost
            ? `${event.currency} ${formatWithCommas(event.cost)}`
            : "Free"}
        </p>
        {!event.joinURL && invitationVisible ? (
          <p className="text-xs text-gray-700">Your join url</p>
        ) : invitationVisible ? (
          <div className="flex">
            <p className="text-xs text-gray-500">Invitation:</p>
            {/* <Link href={event.joinURL}> */}
            {/* <a target="_blank"> */}
            <p className="text-xs prose text-gray-700 pl-1 line-clamp-1">
              <Linkify>{event.joinURL}...</Linkify>
            </p>
            {/* </a> */}
            {/* </Link> */}
          </div>
        ) : null}
      </div>
      <div className="pl-2 pr-2 pb-2">
        {typeof event.cost === "number" &&
        event.name &&
        event.description &&
        event.eventKey &&
        event.media.length > 0 ? (
          // event.joinURL
          <div className="flex justify-end pt-1" onClick={onButtonClick}>
            <div className="bg-green-500 p-1 pl-2 pr-2 rounded-md shadow-md">
              <p className="text-xs text-gray-50">
                {event.soldOut ? "Sold out" : validEventText}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-end pt-1">
            <div className="bg-orange-500 p-1 pl-2 pr-2 rounded-md shadow-md">
              <p className="text-xs text-gray-50">{invalidEventText}</p>
            </div>
          </div>
        )}
      </div>

      {onDelete ? (
        <div className="absolute top-2 right-2 z-10">
          <IconButton onClick={onDelete} />
        </div>
      ) : null}
    </div>
  );
};

export default EventCard;
