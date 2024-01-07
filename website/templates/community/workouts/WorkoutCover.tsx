import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { getHeight } from "../Program/getAspectRatio";

interface Props {
  cover?: CloudinaryMedia | AWSMedia;
  paused?: boolean;
  noControls?: boolean;
  accessible?: boolean;
  handleStreaming?: () => void;
  onProgress?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  playing?: boolean;
}

const WorkoutCover: React.FC<Props> = ({
  cover,
  paused,
  noControls,
  accessible,
  handleStreaming,
  onProgress,
  onPause,
  onEnd,
  playing,
}) => {
  // console.log("cover", cover);
  return (
    <div>
      {cover ? (
        <div className="w-full">
          <MediaTile
            media={cover}
            roundedString="md:rounded-lg shadow-sm"
            alt="cover"
            width={600}
            paused={paused}
            noControls={noControls}
            height={getHeight(cover, 600)}
            rPlayer={true}
            accessible={accessible}
            onPlay={handleStreaming}
            onProgress={onProgress}
            onPause={onPause}
            onEnd={onEnd}
            playing={playing}
          />
        </div>
      ) : (
        <div className="w-full bg-gray-100 h-[50vh]" />
      )}
    </div>
  );
};

export default WorkoutCover;
