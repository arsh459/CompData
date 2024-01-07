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

const VerticalImgGrid: React.FC<Props> = ({
  media,
  arNumeric,
  arString,
  rounded,
}) => {
  return (
    <>
      {media.slice(0, 5).map((item, index) => {
        if (index <= 1) {
          // console.log("here", index);
          return (
            <div
              key={`${item.id}-${index}`}
              // key={}
              className={clsx(
                // "row-span-2 col-span-2",

                getSpanForElement(media.length, index, arNumeric),
                // "bg-gray-200 ",
                media.length > 2 ? arString : "",

                // "aspect-w-3 aspect-h-4",

                rounded === "none"
                  ? "border-2 border-white"
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
                roundedString={getRoundedString(media.length, index, rounded)}
              />
            </div>
          );
        } else if (index === 2 && media.length !== 3) {
          return (
            <div
              key={`${item.id}-${index}`}
              className={clsx(
                getSpanForElement(media.length, index, arNumeric)
                // "col-span-1 row-span-2",
                // "bg-gray-200 "
              )}
            >
              <div
                className={clsx(
                  arString,
                  rounded === "none"
                    ? "border-2 border-white"
                    : "border-4 border-white"
                )}
              >
                <MediaTile
                  media={item}
                  width={widthElement}
                  height={Math.round(widthElement / arNumeric)}
                  alt={`img-${index}`}
                  paused={true}
                  roundedString={getRoundedString(media.length, index, rounded)}
                />
              </div>

              <div
                className={clsx(
                  arString,
                  rounded === "none"
                    ? "border-2 border-white"
                    : "border-4 border-white"
                )}
              >
                <MediaTile
                  media={media[3]}
                  width={widthElement}
                  height={Math.round(widthElement / arNumeric)}
                  alt={`img-${index}`}
                  paused={true}
                  roundedString={getRoundedString(
                    media.length,
                    index + 1,
                    rounded
                  )}
                />
              </div>
            </div>
          );
        } else if (index === 2 && media.length === 3) {
          return (
            <div
              key={`${item.id}-${index}`}
              className={clsx(
                // "row-span-2 col-span-2",
                getSpanForElement(media.length, index, arNumeric),
                // "bg-gray-200",
                arString,
                rounded === "none"
                  ? "border-2 border-white"
                  : "border-4 border-white"
              )}
            >
              <MediaTile
                media={item}
                width={widthElement}
                height={Math.round(widthElement / arNumeric)}
                alt={`img-${index}`}
                paused={true}
                roundedString={getRoundedString(media.length, index, rounded)}
              />
            </div>
          );
        } else if (index === 4) {
          return (
            <div
              key={`${item.id}-${index}`}
              className={clsx(
                getSpanForElement(media.length, index, arNumeric),
                // "row-span-2 col-span-2",
                // "bg-gray-200",
                arString,
                rounded === "none"
                  ? "border-2 border-white"
                  : "border-4 border-white"
              )}
            >
              <MediaTile
                media={item}
                width={widthElement}
                height={Math.round(widthElement / arNumeric)}
                alt={`img-${index}`}
                paused={true}
                roundedString={getRoundedString(media.length, index, rounded)}
              />
            </div>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default VerticalImgGrid;
