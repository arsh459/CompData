// import { EventInterface } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";

interface Props {
  // userEvent: EventInterface;
  selected: boolean;
  onClick: () => void;
  enrolled?: boolean;
  subtitle?: string;
  eventName: string;
  eventMedia?: (CloudinaryMedia | AWSMedia)[];
}

const EventCircle: React.FC<Props> = ({
  // userEvent,
  selected,
  onClick,
  enrolled,
  subtitle,
  eventName,
  eventMedia,
}) => {
  // console.log("selected", selected, userEvent.name);
  return (
    <div
      className="flex flex-col items-center w-28 cursor-pointer"
      onClick={onClick}
    >
      <div
        className={clsx(
          "relative",
          "bg-gray-200 w-20 h-20 rounded-full shadow-sm",
          selected ? "border-4 border-blue-500" : "border-2"
        )}
      >
        {eventMedia && eventMedia.length > 0 ? (
          <MediaTile
            media={eventMedia[0]}
            widthString="w-18"
            heightString="h-18"
            roundedString="rounded-full"
            alt="crs-img"
            width={100}
            height={100}
          />
        ) : null}

        {enrolled ? null : (
          <div className="absolute -bottom-1 -left-1">
            <img
              className="w-5 h-5 object-cover"
              alt="locked"
              src="https://img.icons8.com/material-rounded/96/000000/lock--v1.png"
            />
          </div>
        )}
      </div>
      <div className="pt-2">
        <p
          className={clsx(
            " text-sm text-center line-clamp-2 capitalize",
            selected ? "font-bold text-gray-900" : "text-gray-700"
          )}
        >
          {eventName}
        </p>
        {subtitle ? (
          <p
            className={clsx(
              "text-gray-500 text-xs text-center line-clamp-1 capitalize",
              selected ? "font-semibold" : ""
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
};
export default EventCircle;
