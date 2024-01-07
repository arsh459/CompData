import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { Workout } from "@models/Workouts/Workout";
import EditPostSection from "@templates/campaignTemplate/EditPostSection";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";

interface Props {
  // workout: Workout;
  onEdit: () => void;
  onDelete: () => void;
  editLink: string;
  media?: CloudinaryMedia;
  name?: string;
  description?: string;
  day?: number;
  calories?: number;
}

const WorkoutDisplay: React.FC<Props> = ({
  name,
  description,
  day,
  calories,
  onDelete,
  onEdit,
  editLink,
  media,
}) => {
  return (
    <div className="w-full sm:w-[240px] shadow-md">
      <div>
        {media ? (
          <MediaTile
            media={media}
            alt="media"
            paused={true}
            noControls={true}
            rPlayer={true}
            width={400}
            height={getHeight(media, 400)}
          />
        ) : null}
      </div>
      <div className="p-4">
        <p className="text-lg text-gray-700 font-semibold">{name}</p>
        <p className="text-base text-gray-500 line-clamp-2">{description}</p>
        <p className="text-sm text-gray-700 font-semibold">
          {day ? `Day ${day}` : "Day 0"}
        </p>
        <p className="text-sm text-gray-700 font-semibold">
          {calories ? `${calories} calories` : "0 cals"}
        </p>

        <div className="pt-1">
          <EditPostSection
            size="medium"
            onDelete={onDelete}
            onEdit={onEdit}
            editLink={editLink}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutDisplay;
