import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import LiveLabel from "@templates/liveVideo/LiveVideoHeader/LiveLabel";
import clsx from "clsx";
// import { getHeight } from "../../getAspectRatio";
import Linkify from "react-linkify";
// import MediaGridV2 from "@templates/listing/MediaGrid/MediaGridV2";
import MediaCarouselV2 from "@templates/listing/HeaderImage/MediaCarouselV2";
import { playbackId } from "@models/Posts/Post";
import MuxVideo from "@mux/mux-video-react";
import { useEffect, useState } from "react";

interface Props {
  text?: string;
  live?: boolean;
  media?: (CloudinaryMedia | AWSMedia)[];
  pin?: boolean;
  lineClamp?: number;
  playbackIds?: { [streamId: string]: playbackId[] };
  muxStreamIds?: string[];
  onClick: () => void;
}

const MainContent: React.FC<Props> = ({
  text,
  live,
  media,
  lineClamp,
  pin,
  onClick,
  playbackIds,
  muxStreamIds,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 2000);
  }, []);

  return (
    <div>
      <div onClick={onClick} className="cursor-pointer">
        <p
          className={clsx(
            lineClamp ? "line-clamp-2" : "",
            "prose break-words",
            "whitespace-pre-wrap",
            // "text-gray-600 text-sm",
            pin ? "text-xl" : ""
          )}
        >
          <Linkify>{text}</Linkify>
        </p>
      </div>

      <div className="flex pb-1 pt-2 items-center">
        {live ? <LiveLabel text="Live session" noShadow={true} /> : null}
      </div>

      <div className="">
        <div>
          {/* {media?.map((item) => {
            return (
              <div className={clsx("")} key={item.path}>
                <MediaTile
                  rounded={true}
                  media={item}
                  alt="coursemedia"
                  // heightString="max-h-[200px]"
                  width={400}
                  height={getHeight(item, 400)}
                />
              </div>
            );
          })} */}

          {media && media.length ? (
            <>
              {/* <div className="hidden sm:block">
                <MediaGridV2
                  media={media.slice(0, media.length)}
                  rounded="none"
                />
              </div>
              <div className="sm:hidden">
                <MediaCarouselV2
                  media={media}
                  size={"45vh"}
                  live={true}
                  paused={true}
                  rounded={false}
                />
              </div> */}
              <div className="w-4/5  mx-auto overflow-x-scroll">
                <MediaCarouselV2
                  media={media}
                  size={"45vh"}
                  live={true}
                  paused={true}
                  rounded={false}
                />
              </div>
            </>
          ) : muxStreamIds && loaded && playbackIds ? (
            <div className="flex overflow-scroll overflow-x-auto">
              {muxStreamIds.map((item) => {
                const playbacks = playbackIds[item];

                return (
                  playbacks &&
                  playbacks.map((item2) => {
                    return (
                      <div key={item2.id} className="border flex-none">
                        <MuxVideo
                          // preload="auto"

                          // playsInline={true}
                          // autoPlay={false}
                          // loop={false}
                          // controls={true}
                          envKey="b4807k3idstj5va36eav0u9nh"
                          streamType="on-demand"
                          // debug={true}
                          controls={true}
                          playbackId={item2.id}
                          metadata={{
                            video_id: "video-id-54321",
                            video_title: "Test video title",
                            viewer_user_id: "user-id-007",
                          }}
                          type="hls"
                          src={`https://stream.mux.com/${item2.id}.m3u8`}
                          // src={`https://stream.mux.com/${item.id}/low.mp4`}
                        />
                      </div>
                    );
                  })
                );
              })}
            </div>
          ) : null}
          {/* {false && media && media.length > 0 ? (
            <div className={clsx("")}>
              <MediaTile
                rounded={true}
                media={media[0]}
                alt="coursemedia"
                // heightString="max-h-[200px]"
                width={400}
                height={getHeight(media[0], 400)}
              />
            </div>
          ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
