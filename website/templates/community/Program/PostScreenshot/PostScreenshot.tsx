import Button from "@components/button";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { getHeight } from "@templates/community/Program/getAspectRatio";
// import ScreenshotGuidelines from "./ScreenshotGuidelines";

interface Props {
  postWorkout: () => void;
}

const runningVideo = {
  resource_type: "video",
  format: "mp4",
  path: "v1642174721/video_4_secx8g.mp4",
  public_id: "v1642174721/video_4_secx8g",
  width: 3840,
  height: 2160,
} as CloudinaryMedia;

const PostScreenshot: React.FC<Props> = ({ postWorkout }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm pb-4">
      <div className="pb-2">
        <MediaTile
          noControls={true}
          media={runningVideo}
          roundedString="rounded-t-lg"
          width={400}
          height={getHeight(runningVideo, 400)}
          alt="video"
        />
      </div>
      <div>
        <p className="text-gray-700 text-center text-2xl font-semibold">
          {"Already worked out?"}
        </p>
        <p className="text-gray-500 text-center px-4">
          Post a screenshot of your workout and win exciting rewards
        </p>

        <div className="flex justify-center pt-2">
          <Button appearance="contained" onClick={postWorkout}>
            Post workout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostScreenshot;
