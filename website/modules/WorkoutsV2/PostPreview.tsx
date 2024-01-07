import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import Image from "next/image";
import PostKPIStrip from "./PostKPIStrip";

interface Props {
  img?: string;
  points?: number;
  time?: number;
  activityName?: string;
  rank?: number;
  media?: (CloudinaryMedia | AWSMedia)[];
}

const PostPreview: React.FC<Props> = ({
  rank,
  img,
  points,
  time,
  activityName,
  media,
}) => {
  //   console.log("img", img);
  //   console.log("img", points);
  //   console.log("img", time);
  //   console.log("img", activityName);
  return (
    <div>
      <div className="">
        {img ? (
          <>
            <Image alt="selfie" src={img} width="375" height="300" />
            <div className="pt-1">
              <PostKPIStrip
                points={points}
                time={time}
                activityName={activityName}
                rank={rank}
              />
            </div>
          </>
        ) : media && media.length > 0 ? (
          <div>
            <MediaTile
              roundedString="rounded-md shadow-md"
              media={media[0]}
              width={375}
              height={300}
              alt="media"
            />
            <div className="pt-1">
              <PostKPIStrip
                // points={points}
                pointsString="In review"
                // time={"time"}
                activityName={activityName}
                rank={rank}
              />
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-md w-full h-72 shadow-sm" />
        )}
      </div>
    </div>
  );
};

export default PostPreview;
