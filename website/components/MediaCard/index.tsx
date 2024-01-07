import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  media?: CloudinaryMedia | AWSMedia;
  thumbnail?: CloudinaryMedia | AWSMedia;
  setIsPaused?: (val: boolean) => void;
  HWClassStr?: string;
  heightString?: string;
  widthString?: string;
  webEngageEventname?: string;
  playIconUrl?: string;
  roundedString?: string;
  objectString?: string;
}

const MediaCard: React.FC<Props> = ({
  media,
  thumbnail,
  setIsPaused,
  HWClassStr,
  heightString,
  widthString,
  webEngageEventname,
  playIconUrl,
  roundedString,
  objectString,
}) => {
  const [paused, setPaused] = useState<boolean>(true);
  const [noControls, setNoControls] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const targetRef = useCallback(
    (node) => {
      const handlePlay = () => {
        setPaused(false);
        setNoControls(false);
        setIsPaused && setIsPaused(false);
      };

      const handlePause = (e: any) => {
        if (e.target.readyState >= 2) {
          setPaused(true);
          setNoControls(true);
          setIsPaused && setIsPaused(true);
        }
      };

      if (observer.current) observer.current?.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((element) => {
            if (element.isIntersecting) {
              element.target.addEventListener("play", handlePlay);
              element.target.addEventListener("pause", handlePause);
            } else {
              element.target.removeEventListener("play", handlePlay);
              element.target.removeEventListener("pause", handlePause);
              const targetEle = element.target as HTMLVideoElement;
              targetEle.pause();
              handlePause(element);
            }
          });
        },
        { threshold: 0.5 }
      );

      if (node) observer?.current.observe(node);
    },
    [setIsPaused]
  );

  return (
    <>
      {media ? (
        <div
          className={clsx(
            "relative z-0 flex justify-center items-center",
            HWClassStr ? HWClassStr : "w-full h-full",
            roundedString
          )}
        >
          {media.resource_type === "video" && setIsPaused && paused ? (
            <div
              className={clsx(
                "absolute inset-0 z-10 bg-black/50 flex justify-center items-center",
                roundedString
              )}
            >
              <img
                src={
                  playIconUrl
                    ? playIconUrl
                    : "https://img.icons8.com/ios-glyphs/50/FFFFFF/play--v1.png"
                }
                className="cursor-pointer"
                onClick={(e: any) => {
                  e.target.parentElement.nextElementSibling.play();
                  weEventTrack(
                    webEngageEventname
                      ? webEngageEventname
                      : "unknown_mediaPlay",
                    { mediaId: media.id }
                  );
                }}
              />
            </div>
          ) : null}
          <MediaTile
            media={media}
            alt="media"
            width={400}
            height={getHeight(media, 400)}
            paused={paused}
            noControls={noControls}
            muted={false}
            targetRef={targetRef}
            heightString={heightString}
            widthString={widthString}
            thumbnail={thumbnail}
            roundedString={roundedString}
            objectString={objectString}
          />
        </div>
      ) : null}
    </>
  );
};

export default MediaCard;
