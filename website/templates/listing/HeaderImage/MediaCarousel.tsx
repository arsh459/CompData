import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { getHeight } from "@templates/community/Program/getAspectRatio";
import clsx from "clsx";
// import Image from "next/image";
import React from "react";
// import { buildImageUrl, buildVideoUrl } from "cloudinary-build-url";
// import { RESIZE_TYPES, Gravity } from "@cld-apis/utils";
import MediaTile from "./MediaTile";
// import { bluredImg } from "@constants/placeholder";

interface Props {
  media: CloudinaryMedia[];
  size?: "card" | "small" | "45vh";
  rounded?: boolean;
  live?: boolean;
  paused?: boolean;
  controls?: boolean;
}
const MediaCarousel: React.FC<Props> = ({
  paused,
  media,
  size,
  rounded,
  live,
  controls,
}) => {
  // console.log("media", media);
  return (
    <div
      className={clsx("flex", "no-scrollbar overflow-scroll overflow-x-auto")}
    >
      {media.map((item, index) => {
        // console.log("url", item);
        // if (item.resource_type === "image") {
        return (
          <div
            key={item.public_id}
            className={clsx(
              size === "small"
                ? "w-full h-[288px] flex-none"
                : size === "45vh"
                ? "w-full flex-none"
                : // : "aspect-w-9 aspect-h-16"

                  "w-full h-36 flex-none"
            )}
          >
            <MediaTile
              width={900}
              height={900}
              media={item}
              // widthString="w-36"
              // heightString="h-36"
              rounded={rounded}
              alt={`img-${index}`}
              paused={paused}
              live={live}
            />
          </div>
        );
        // }
      })}
      {media.length === 0 ? (
        <div
          className={clsx(
            "bg-gray-200",
            rounded ? "rounded-lg" : "",
            size === "small"
              ? "w-full h-[288px] flex-none"
              : size === "45vh"
              ? "w-full max-h-[45vh] flex-none"
              : "w-full h-36 flex-none"
          )}
        ></div>
      ) : null}
    </div>
  );
};

export default MediaCarousel;
