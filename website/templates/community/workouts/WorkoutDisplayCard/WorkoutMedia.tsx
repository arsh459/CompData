// import { Workout } from "@models/Workouts/Workout";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
// import { Link } from "@mui/material";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

interface Props {
  media?: CloudinaryMedia | AWSMedia;
  enrolled?: boolean;
  isFree: boolean;
}

const WorkoutMedia: React.FC<Props> = ({ media, enrolled, isFree }) => {
  return (
    <div className="w-1/4 md:w-1/2 relative">
      {media ? (
        <MediaTile
          width={400}
          height={400}
          media={media}
          paused={true}
          alt="workout"
          roundedString="md:rounded-lg"
          noControls={true}
        />
      ) : (
        <div className="bg-gray-100 w-1/4 h-[100px]" />
      )}
      {enrolled || isFree ? null : (
        <div className="bg-smoke-500 w-full h-full z-10 absolute left-0 right-0 bottom-0 top-0 md:rounded-lg" />
      )}
    </div>
  );
};

export default WorkoutMedia;
