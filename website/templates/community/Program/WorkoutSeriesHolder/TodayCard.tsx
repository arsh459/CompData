import { PlayIcon } from "@heroicons/react/solid";
import { useLiveAccess } from "@hooks/workouts/live/useLiveAccess";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { format } from "date-fns";
// import { Workout } from "@models/Workouts/Workout";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";
// import { getHeight } from "../getAspectRatio";

interface Props {
  // dayActivity: Workout;
  locked: boolean;
  media?: CloudinaryMedia | AWSMedia;
  name?: string;
  calories?: number;
  label: "nutrition" | "video" | "live";
  description?: string;
  calorieString?: string;
  badgeColor?: string;
  times?: string[];
  duration?: number;
  days?: number[];
  //   costSeries: number;
}

const TodaysCard: React.FC<Props> = ({
  name,
  calories,
  locked,
  media,
  label,
  description,
  calorieString,
  badgeColor,
  duration,
  times,
  days,
}) => {
  const { eventState, earliestStartTime } = useLiveAccess(
    times,
    duration,
    days
  );

  // console.log("eventState", eventState);

  return (
    <div className="">
      <div className="relative">
        {media ? (
          <div className="bg-gray-200 rounded-lg">
            <MediaTile
              media={media}
              width={400}
              height={400}
              alt="img"
              gif={true}
              paused={true}
              // noControls={true}
              rPlayer={true}
              roundedString="rounded-lg"
              placeholderOnly={true}
            />
          </div>
        ) : (
          <div className="w-44 h-44 rounded-lg bg-gray-100" />
        )}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer">
          <div className="">
            <PlayIcon className="w-12 h-12 object-cover" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white z-0"></div>

        <div className="absolute bottom-2 left-2">
          <div className={clsx(badgeColor, "px-2 py-1 rounded-lg")}>
            <p className="text-sm font-semibold text-white capitalize">
              {eventState === "upcoming" && earliestStartTime > 0
                ? `Starts ${format(
                    new Date(earliestStartTime),
                    "h:mmaaa d MMM"
                  )}`
                : eventState === "ongoing"
                ? `Live now`
                : label}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-0.5">
        <p className="text-gray-700 font-semibold">{name}</p>
        <p className="text-gray-500 text-sm line-clamp-2">{description}</p>
        <div className="flex pt-0 items-center">
          {locked ? (
            <img
              className="w-5 h-5 object-cover"
              alt="locked"
              src="https://img.icons8.com/material-rounded/96/000000/lock--v1.png"
            />
          ) : (
            <img
              className={clsx("w-4 h-4", " object-cover")}
              src={
                "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/58/000000/external-fire-emergency-vitaliy-gorbachev-flat-vitaly-gorbachev.png"
              }
            />
          )}

          <p className="text-gray-700 text-base md:text-sm pl-1">
            {calorieString}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodaysCard;
