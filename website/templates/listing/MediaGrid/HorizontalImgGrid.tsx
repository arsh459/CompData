import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
import MediaTile from "../HeaderImage/MediaTile";
import { getRoundedString, getSpanForElement } from "./urils";

interface Props {
  media: (CloudinaryMedia | AWSMedia)[];
  arNumeric: number;
  arString: string;
  rounded?: "none";
}

const widthElement = 400;

const HorizontalImgGrid: React.FC<Props> = ({
  media,
  arNumeric,
  arString,
  rounded,
}) => {
  return (
    <>
      {media.slice(0, 5).map((item, index) => {
        return (
          <div
            key={item.id}
            className={clsx(
              getSpanForElement(media.length, index, arNumeric),
              rounded === "none"
                ? "border-1 border-whote"
                : "border-4 border-white"
            )}
          >
            <MediaTile
              media={item}
              width={widthElement}
              height={Math.round(widthElement / arNumeric)}
              alt={`img-${index}`}
              paused={true}
              heightString={media.length <= 2 ? "max-h-[480px]" : ""}
              roundedString={getRoundedString(media.length, index)}
            />
          </div>
        );
      })}
    </>
  );
};

export default HorizontalImgGrid;
