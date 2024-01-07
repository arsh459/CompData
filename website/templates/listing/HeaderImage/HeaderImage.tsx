import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
import React from "react";
// import MediaCarousel from "./MediaCarousel";
import MediaCarouselV2 from "./MediaCarouselV2";
// import { heroVideo } from "./constants";

interface Props {
  headerVideo?: string;
  editing: boolean;
  active: boolean;
  media: (CloudinaryMedia | AWSMedia)[];
  live?: boolean;
}
const HeaderImage: React.FC<Props> = ({
  media,
  headerVideo,
  editing,
  live,
  active,
}) => {
  // console.log("media", media);
  return (
    <div className={clsx("relative", "")}>
      <div>
        {headerVideo ? (
          <video
            preload="auto"
            autoPlay
            loop
            muted={true}
            controls={false}
            src={headerVideo}
            className={clsx(
              "object-cover w-full h-full shadow-xl"
              // "opacity-50 bg-black"
            )}
            playsInline
          />
        ) : media.length > 0 ? (
          <MediaCarouselV2
            media={media}
            size={!live ? "small" : "45vh"}
            live={live}
            paused={true}
            rounded={false}
          />
        ) : (
          <div
            className={clsx(
              "w-full h-48 rounded-t-xl",
              "shadow-sm",
              // editing ? "cursor-pointer" : "",
              // !active && editing
              // ? "opacity-40 bg-black hover:opacity-0 hover:shadow-2xl"
              // : "bg-gradient-to-b from-white to-gray-100",

              "flex items-end pl-5 pb-2 cursor-pointer"
            )}
          >
            <p
              className={clsx(
                "text-2xl font-semibold",
                editing && !active ? "text-gray-400" : "text-gray-700"
              )}
            >
              {editing ? "Add media" : "A beautiful image"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderImage;
