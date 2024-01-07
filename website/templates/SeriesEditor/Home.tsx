import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import MediaTile from "@templates/listing/HeaderImage/MediaTile";
// import {
//   getAspectRatioV2,
//   getHeight,
// } from "@templates/community/Program/getAspectRatio";
// import clsx from "clsx";
import { Link } from "@mui/material";
import Button from "@components/button";
import WorkoutList from "./WorkoutList";

interface Props {
  // id?: string;
  name?: string;
  description?: string;
  thumbnail?: CloudinaryMedia;
  onEdit: () => void;
  navToSelector: () => void;
  cost?: number;
  seriesId: string;
  seriesKey: string;
}

const SeriesHome: React.FC<Props> = ({
  // id,
  name,
  description,
  thumbnail,
  onEdit,
  cost,
  seriesId,
  navToSelector,
  seriesKey,
}) => {
  // console.log("seriesId", seriesId);
  // console.log("workouts", workouts);

  return (
    <div>
      <div className="pt-4">
        <p className="text-3xl text-gray-700 font-semibold ">Series Created</p>

        <div className="pt-1 flex  flex-col">
          {/* {thumbnail ? (
            <div className="w-full sm:w-[220px]">
              <div className={clsx(getAspectRatioV2(thumbnail))}>
                <MediaTile
                  media={thumbnail}
                  width={400}
                  height={getHeight(thumbnail, 400)}
                  alt="thumbail"
                />
              </div>
            </div>
          ) : null} */}
          <div className="pt-1">
            <p className="font-medium ">Name:</p>
            <p className="">{name}</p>
          </div>
          <div className="pt-2">
            <p className="font-medium ">Description:</p>
            <div className="max-w-lg">
              <p className="">{description}</p>
            </div>
          </div>
          <div className="pt-2">
            <p className="font-medium ">Cost:</p>
            <p className="">₹{cost}</p>
          </div>

          <div className="flex justify-left pt-2">
            <div className="flex ">
              <Link href={`/workout/${seriesKey}`} target="_blank">
                <Button appearance="contained">
                  <p className="font-semibold text-white">Live URL</p>
                </Button>
              </Link>
            </div>
            <div className="flex pl-2" onClick={navToSelector}>
              <Button appearance="ghost">
                <p className="text-gray-700 font-semibold">See All Series</p>
              </Button>
            </div>
            <div className="flex pl-2">
              <Button appearance="ghost" onClick={onEdit}>
                <p className="text-gray-700 font-semibold">Edit Series</p>
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-4 flex">
          <Link href={`/createWorkout?seriesId=${seriesId}`} target="_blank">
            <div className="cursor-pointer flex rounded-lg justify-center items-center p-2 shadow-sm hover:shadow-md border-orange-500 border-2 w-full sm:w-[240px]">
              <p className="text-gray-700 text-center font-semibold">
                Add workout video
              </p>
            </div>
          </Link>
          <div className="pl-2">
            <Link
              href={`/createNutrition?seriesId=${seriesId}`}
              target="_blank"
            >
              <div className="cursor-pointer flex rounded-lg justify-center items-center p-2 shadow-sm hover:shadow-md border-orange-500 border-2 w-full sm:w-[240px]">
                <p className="text-gray-700 text-center font-semibold">
                  Add nutrition plan
                </p>
              </div>
            </Link>
          </div>
          <div className="pl-2">
            <Link href={`/createLive?seriesId=${seriesId}`} target="_blank">
              <div className="cursor-pointer flex rounded-lg justify-center items-center p-2 shadow-sm hover:shadow-md border-orange-500 border-2 w-full sm:w-[240px]">
                <p className="text-gray-700 text-center font-semibold">
                  Add Live class
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <WorkoutList seriesId={seriesId} />
      </div>
    </div>
  );
};

export default SeriesHome;
