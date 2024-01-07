import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { getHeight } from "@templates/community/Program/getAspectRatio";
import clsx from "clsx";
// import Image from "next/image";
import React from "react";
import { getAspectRatioForGrid } from "../MediaGrid/urils";
// import ArrowIcon from "./ArrowIcon";
// import SwipeableViews from "react-swipeable-views";
// import { buildImageUrl, buildVideoUrl } from "cloudinary-build-url";
// import { RESIZE_TYPES, Gravity } from "@cld-apis/utils";
// import MediaTile from "./MediaTile";
import ScrollElement from "./ScrollElement";
// import Carousel from "react-simply-carousel";

// import { bluredImg } from "@constants/placeholder";

interface Props {
  media: (CloudinaryMedia | AWSMedia)[];
  size?: "card" | "small" | "45vh";
  rounded?: boolean;
  live?: boolean;
  paused?: boolean;
  controls?: boolean;
}
const MediaCarouselV2: React.FC<Props> = ({
  paused,
  media,
  size,
  rounded,
  live,
  controls,
}) => {
  // console.log("media", media);
  const { arString, arNumeric } = getAspectRatioForGrid(media);
  // const [index, setIndex] = useState<number>(0);

  // const onRight = () => {
  //   setIndex((prev) => prev + 1);
  // };

  // const onLeft = () => {
  //   setIndex((prev) => prev - 1);
  // };

  // console.log("index", index);

  return (
    <div className="relative">
      <div
        className={clsx("flex", "no-scrollbar overflow-scroll overflow-x-auto")}
      >
        {/* {media.length > 1 ? (
          <>
            <div className="right-2 inset-y-1/2 absolute z-10 flex flex-none">
              <ArrowIcon onClick={onRight} arrow="right" />
            </div>
            <div className="left-2 inset-y-1/2 absolute z-10 flex flex-none">
              <ArrowIcon onClick={onLeft} arrow="left" />
            </div>
          </>
        ) : null} */}

        {media.map((item, i) => {
          // console.log("url", item);
          // console.log(index, i === index);
          return (
            // <div key={item.public_id}>
            <ScrollElement
              view={false}
              paused={paused}
              media={item}
              rounded={rounded}
              arString={arString}
              arNumeric={arNumeric}
              live={live}
              key={`${item.id}-${i}`}
            />
            // </div>
          );
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
    </div>
  );
};

export default MediaCarouselV2;
