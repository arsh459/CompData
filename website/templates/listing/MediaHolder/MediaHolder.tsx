import HeaderImage from "@templates/listing/HeaderImage/HeaderImage";
import clsx from "clsx";
import MediaGridV2 from "../MediaGrid/MediaGridV2";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

interface Props {
  preview?: boolean;
  media: (CloudinaryMedia | AWSMedia)[];
}

const MediaHolder: React.FC<Props> = ({ preview, media }) => {
  return (
    <div>
      {media.length > 0 ? (
        <>
          <div id="media" className={clsx(preview ? "md:hidden" : "md:hidden")}>
            <HeaderImage
              editing={false}
              active={false}
              media={media}
              live={true}
            />
          </div>

          <div
            className={clsx(
              preview ? "hidden md:block" : "hidden md:block",
              "pb-0 p-4"
            )}
          >
            <MediaGridV2 media={media} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MediaHolder;
