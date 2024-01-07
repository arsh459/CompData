import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";
import { getHeight } from "../../getAspectRatio";
// import AllReviews from "./AllReviews";
// import PostDate from "./PostDate";

interface Props {
  text?: string;
  media?: (CloudinaryMedia | AWSMedia)[];
  // reviewCount: number;
  // updatedOn: number;
  // sessionName?: string;
}

const PostContent: React.FC<Props> = ({
  // updatedOn,
  text,
  media,
  // reviewCount,
  // sessionName,
}) => {
  return (
    <div>
      <div className="flex">
        {media && media.length > 0 ? (
          <div className="w-1/3">
            <div
              className={
                clsx()
                // getAspectRatio(media[0]),
                // media[0].format === "pdf" ? "pb-0" : ""
              }
            >
              <MediaTile
                media={media[0]}
                width={400}
                height={getHeight(media[0], 400)}
                roundedString="rounded-sm"
                alt="user"
              />
            </div>
          </div>
        ) : null}

        <div
          className={clsx(
            media && media.length > 0
              ? "pl-4 w-2/3 flex flex-col justify-between"
              : "w-full"
          )}
        >
          <p className="text-gray-500 text-sm prose">{text ? text : ""}</p>

          {/* <div className="pt-2 flex justify-end">
            <PostDate date={updatedOn} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PostContent;
