import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { buildImageUrl } from "cloudinary-build-url";
// import { RESIZE_TYPES } from "@cld-apis/utils";
import clsx from "clsx";
import ReactPlayer from "react-player";
// import { useState } from "react";
import { getURLToFetch } from "./utils";

interface Props {
  media: CloudinaryMedia | AWSMedia;
  rounded?: boolean;
  alt: string;
  paused?: boolean;
  live?: boolean;
  roundedString?: string;
  heightString?: string;
  widthString?: string;
  width: number;
  height: number;
  unlocked?: boolean;
  noControls?: boolean;
  rPlayer?: boolean;
  accessible?: boolean;
  placeholderOnly?: boolean;
  onPlay?: () => void;
  onProgress?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  playing?: boolean;
  gif?: boolean;
  forceHeight?: boolean;
  muted?: boolean;
  targetRef?: (node: any) => void;
  thumbnail?: CloudinaryMedia | AWSMedia;
  objectString?: string;
}

const MediaTile: React.FC<Props> = ({
  media,
  rounded,
  forceHeight,
  alt,
  paused,
  live,
  gif,
  roundedString,
  heightString,
  widthString,
  width,
  height,
  unlocked,
  noControls,
  rPlayer,
  accessible,
  placeholderOnly,
  onPlay,
  onProgress,
  onPause,
  onEnd,
  playing,
  muted,
  targetRef,
  thumbnail,
  objectString,
}) => {
  // const [errored, setError] = useState<boolean>(false);
  // console.log("err", errored);

  // console.log(
  //   "media",
  //   // media.url,
  //   getURLToFetch(media, width, height, forceHeight)
  // );
  if (
    media.resource_type === "image"
    //  && media.format !== "pdf"
  ) {
    return (
      <img
        src={getURLToFetch(media, width, height, forceHeight)}
        //src={`https://res.cloudinary.com/htt-holidaying-travel-technologies/image/upload/w_${width},h_${height},c_fill/${media.public_id}.jpg`}
        // src={buildImageUrl(media.path, {
        //   cloud: {
        //     cloudName: "htt-holidaying-travel-technologies",
        //   },
        //   transformations: {
        //     resize: {
        //       width: width,
        //       height: height,
        //       type: RESIZE_TYPES.FILL,
        //     },
        //     gravity: Gravity.Auto,
        //   },
        // })}
        // src={`${cloudinaryBaseURL}/${item.resource_type}/upload/h_300,c_fill,g_auto,q_100/${item.path}`}
        className={clsx(
          widthString ? widthString : "w-full",
          heightString ? heightString : "h-full",
          objectString ? objectString : "object-cover",
          // media.format === "pdf" ? "mb-10" : "",
          // "h"
          roundedString ? roundedString : rounded ? "rounded-lg" : ""
        )}
        alt={alt}
      />
    );
  }

  // else if (media.resource_type === "image" && media.format === "pdf") {
  //     return (
  //         <div className="relative">
  //             <img
  //                 // src={item.secure_url}
  //                 // layout="fill"
  //                 // objectFit="fill"
  //                 // width={width}
  //                 // height={height}
  //                 // layout="fixed"
  //                 // placeholder="blur"
  //                 // blurDataURL={bluredImg}
  //                 // loading="lazy"
  //                 src={buildImageUrl(media.path, {
  //                     cloud: {
  //                         cloudName: "htt-holidaying-travel-technologies",
  //                     },
  //                     transformations: {
  //                         resize: {
  //                             width: width,
  //                             height: height,
  //                             type: RESIZE_TYPES.FILL,
  //                         },
  //                         // gravity: Gravity.Auto,
  //                     },
  //                 })}
  //                 // src={`${cloudinaryBaseURL}/${item.resource_type}/upload/h_300,c_fill,g_auto,q_100/${item.path}`}
  //                 className={clsx(
  //                     widthString ? widthString : "w-full",
  //                     heightString ? heightString : "h-full",
  //                     "object-cover",
  //                     // media.format === "pdf" ? "mb-10" : "",
  //                     // "h"
  //                     roundedString
  //                         ? roundedString
  //                         : rounded
  //                         ? "rounded-lg"
  //                         : ""
  //                 )}
  //                 alt={alt}
  //             />
  //             {media.format === "pdf" ? (
  //                 <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-gray-200">
  //                     <a href={media.url} target="_blank" rel="noreferrer">
  //                         <p className="text-sm text-center text-gray-700 underline">
  //                             Open pdf
  //                         </p>
  //                     </a>
  //                 </div>
  //             ) : null}
  //         </div>
  //     );
  // }
  else if (media.resource_type === "video" && !rPlayer) {
    return (
      <video
        preload="auto"
        playsInline={true}
        autoPlay={!paused ? true : false}
        loop={!paused ? true : false}
        muted={muted}
        // height={`${height}`}
        // width={`${width}`}
        // onLoad={(e) => e.}
        // muted={!live ? true : false}
        poster={
          thumbnail ? getURLToFetch(thumbnail, width, height, forceHeight) : ""
        }
        controls={noControls ? false : true}
        ref={targetRef}
        // poster={`${buildVideoUrl(media.path, {
        //   cloud: {
        //     cloudName: "htt-holidaying-travel-technologies",
        //   },
        //   transformations: {
        //     resize: {
        //       width: width,
        //       height: height,
        //       type: RESIZE_TYPES.FILL,
        //     },
        //   },
        // })}.gif`}
        // poster={`https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload${
        //     errored ? `/` : `/c_fill,w_${width},h_${height}/`
        // }${media.public_id}.jpg`}
        // src={media.secure_url}
        // onError={() => setError(true)}
        // src={`https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload${
        //     errored ? `/` : `/c_fill,w_${width},h_${height}/`
        // }${media.public_id}.mp4`}
        // src={`${buildVideoUrl(media.path, {
        //   cloud: {
        //     cloudName: "htt-holidaying-travel-technologies",
        //   },
        //   transformations: {
        //     resize: {
        //       width: width,
        //       height: height,
        //       type: RESIZE_TYPES.CROP,
        //     },
        //   },
        // })}.${media.format}`}
        // src={item.secure_url}
        className={clsx(
          "w-full",
          heightString ? heightString : "h-full",
          objectString ? objectString : "object-cover",
          roundedString ? roundedString : rounded ? "rounded-lg" : ""
        )}
      >
        <source
          type="video/mp4"
          src={getURLToFetch(media, width, height, forceHeight)}
        />
      </video>
    );
  } else if (media.resource_type === "video" && gif) {
    // return (
    //   <video
    //     src={`https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/e_preview/${media.public_id}.mp4`}
    //     className={clsx(
    //       widthString ? widthString : "w-full",
    //       heightString ? heightString : "h-full",
    //       "object-cover"
    //     )}
    //     autoPlay={true}
    //     playsInline={true}
    //     // loop={true}
    //     muted={true}
    //     // alt={alt}
    //   />
    // );

    return (
      <img
        // src={`https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/${media.public_id}.jpg`}
        src={getURLToFetch(media, width, height, forceHeight)}
        className={clsx(
          widthString ? widthString : "w-full",
          heightString ? heightString : "h-full",
          objectString ? objectString : "object-cover"
        )}
        // autoPlay={true}
        // playsInline={true}
        // loop={true}
        // muted={true}
        // alt={alt}
      />
    );
  } else if (media.resource_type === "video" && rPlayer) {
    return (
      <ReactPlayer
        // playing
        controls={accessible}
        onPlay={onPlay}
        // onPlay={(e) => console.log(e)}
        onProgress={onProgress}
        onPause={onPause}
        onEnded={onEnd}
        playing={playing}
        width="100%"
        height="100%"
        url={getURLToFetch(media, width, height, forceHeight)}
        // url={`${buildVideoUrl(media.path, {
        //     cloud: {
        //         cloudName: "htt-holidaying-travel-technologies",
        //     },
        //     transformations: {
        //         resize: {
        //             width: width,
        //             height: height,
        //             type: RESIZE_TYPES.FILL,
        //         },
        //         // gravity: Gravity.FaceCenter,
        //     },
        // })}.${media.format}`}
      />
    );
  } else {
    return <div className="w-full h-full bg-gray-50" />;
  }
};

export default MediaTile;

// const getDataFromURL = (url: string) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       fetch(url)
//         .then((response) => response.text())
//         .then((data) => {
//           resolve(data);
//         });
//     }, 2000);
//   });
