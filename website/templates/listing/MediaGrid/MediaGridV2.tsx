import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
// import MediaTile from "../HeaderImage/MediaTile";
import HorizontalImgGrid from "./HorizontalImgGrid";
import {
  getAspectRatioForGrid,
  getGridColumns,
  //   getRoundedString,
  //   getSpanForElement,
} from "./urils";
import VerticalImgGrid from "./VerticalImgGrid";

interface Props {
  media: (CloudinaryMedia | AWSMedia)[];
  rounded?: "none";
}

const MediaGridV2: React.FC<Props> = ({ media, rounded }) => {
  const { arString, arNumeric, ar } = getAspectRatioForGrid(media);
  // console.log("arString", arString, arNumeric, ar);
  return (
    <div
      className={clsx(
        media.length === 1 ? "flex justify-center" : "grid",

        getGridColumns(media.length, arNumeric)
      )}
    >
      {ar > 1.5 && media.length >= 5 ? (
        <HorizontalImgGrid
          media={media}
          rounded={rounded}
          arNumeric={arNumeric}
          arString={arString}
        />
      ) : (
        <VerticalImgGrid
          media={media}
          rounded={rounded}
          arNumeric={arNumeric}
          arString={arString}
        />
      )}
    </div>
  );
};

export default MediaGridV2;

/**
 {media.slice(0, 5).map((item, index) => {
        if (index <= 1) {
          //   console.log("here", index);
          return (
            <div
              // key={}
              className={clsx(
                // "row-span-2 col-span-2",

                getSpanForElement(media.length, index, arNumeric),
                // "bg-gray-200 ",
                media.length > 2 ? arString : "",

                // "aspect-w-3 aspect-h-4",

                "border-4 border-white"
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
        } else if (index === 2 && media.length !== 3) {
          return (
            <div
              className={clsx(
                getSpanForElement(media.length, index, arNumeric)
                // "col-span-1 row-span-2",
                // "bg-gray-200 "
              )}
            >
              <div className={clsx(arString, "border-4 border-white")}>
                <MediaTile
                  media={item}
                  width={widthElement}
                  height={Math.round(widthElement / arNumeric)}
                  alt={`img-${index}`}
                  paused={true}
                  roundedString={getRoundedString(media.length, index)}
                />
              </div>

              <div className={clsx(arString, "border-4 border-white")}>
                <MediaTile
                  media={media[3]}
                  width={widthElement}
                  height={Math.round(widthElement / arNumeric)}
                  alt={`img-${index}`}
                  paused={true}
                  roundedString={getRoundedString(media.length, index + 1)}
                />
              </div>
            </div>
          );
        } else if (index === 2 && media.length === 3) {
          return (
            <div
              className={clsx(
                // "row-span-2 col-span-2",
                getSpanForElement(media.length, index, arNumeric),
                // "bg-gray-200",
                arString,
                "border-4 border-white"
              )}
            >
              <MediaTile
                media={item}
                width={widthElement}
                height={Math.round(widthElement / arNumeric)}
                alt={`img-${index}`}
                paused={true}
                roundedString={getRoundedString(media.length, index)}
              />
            </div>
          );
        } else if (index === 4) {
          return (
            <div
              className={clsx(
                getSpanForElement(media.length, index, arNumeric),
                // "row-span-2 col-span-2",
                // "bg-gray-200",
                arString,
                "border-4 border-white"
              )}
            >
              <MediaTile
                media={item}
                width={widthElement}
                height={Math.round(widthElement / arNumeric)}
                alt={`img-${index}`}
                paused={true}
                roundedString={getRoundedString(media.length, index)}
              />
            </div>
          );
        } else {
          return null;
        }
      })}
 */
