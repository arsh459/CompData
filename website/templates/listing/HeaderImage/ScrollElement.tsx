import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { getHeight } from "@templates/community/Program/getAspectRatio";
import clsx from "clsx";
// import Image from "next/image";
import React from "react";
// import { getAspectRatioForGrid } from "../MediaGrid/urils";
// import ArrowIcon from "./ArrowIcon";
// import SwipeableViews from "react-swipeable-views";
// import { buildImageUrl, buildVideoUrl } from "cloudinary-build-url";
// import { RESIZE_TYPES, Gravity } from "@cld-apis/utils";
import MediaTile from "./MediaTile";
// import Carousel from "react-simply-carousel";

// import { bluredImg } from "@constants/placeholder";

interface Props {
  media: CloudinaryMedia | AWSMedia;
  //   size?: "card" | "small" | "45vh";
  rounded?: boolean;
  live?: boolean;
  paused?: boolean;
  //   controls?: boolean;
  arNumeric: number;
  arString: string;
  view: boolean;
}
const ScrollElement: React.FC<Props> = ({
  paused,
  media,
  rounded,
  live,
  arString,
  arNumeric,
  view,
}) => {
  //   const element = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     if (view && element && element.current) {
  //       console.log("HERE I am");
  //       const timer = setTimeout(() => {
  //         element?.current?.scrollIntoView({
  //           behavior: "smooth",
  //           block: "center",
  //         });
  //       }, 100);

  //       return () => {
  //         if (timer) {
  //           clearTimeout(timer);
  //         }
  //       };
  //     }
  //   }, [view]);

  // console.log("arString", arString, arNumeric, Math.round(900 / arNumeric));

  return (
    <div className={clsx(arString, "w-full  flex-none")}>
      <MediaTile
        width={900}
        height={Math.round(900 / arNumeric)}
        media={media}
        // rPlayer={true}
        // rPlayer={true}
        // widthString="w-36"
        // heightString="h-36"
        rounded={rounded}
        alt={`img`}
        // rPlayer={true}
        paused={paused}
        live={live}
      />
    </div>
  );
};

export default ScrollElement;
