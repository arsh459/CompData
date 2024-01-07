// import SocialBoatSVG from "@components/logo/SocialBoatSVG";
// import SocialBoatSVG from "@components/logo/SocialBoatSVG";
import { Cast } from "@models/Cast/Cast";
import { updatePlaybackState } from "@models/Cast/utils";
import MuxVideo from "@mux/mux-video-react";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import { getURLToFetch } from "@templates/listing/HeaderImage/utils";
// import { intervalToDuration } from "date-fns";
import {
  useEffect,
  useRef,
  useState,
  // useState
} from "react";
import { useTaskStream } from "./hooks/useTaskStream";
import FPProgress from "./FPProgress";

// const magicNum = 16;
const saveInt = 15;
interface Props {
  cast: Cast;
  screenHeight: number;
}

const Stream: React.FC<Props> = ({ cast, screenHeight }) => {
  //   const [duration, setDuration] = useState<Duration>();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loadedVideo, setVideoLoadState] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timer>();
  const positionData = useRef<{
    totalSec: number;
    storeVal: number;
    currentVal: number;
  }>({ totalSec: 0, currentVal: 0, storeVal: 0 });
  const { onUpdateProgress, selectedActivity, checked, fpProgress, taskFP } =
    useTaskStream(cast.userUID, cast.activityId);

  const onPlay = () => {
    updatePlaybackState(cast.id, "play");

    // clear previous timers
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const interval = setInterval(() => {
      positionData.current.storeVal++;
    }, 1000);
    intervalRef.current = interval;
  };
  const onPause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    updatePlaybackState(cast.id, "pause");
  };

  // toggle play state
  const onToggleState = () => {
    if (!loadedVideo) {
    } else if (cast.taskState === "init" || cast.taskState === "pause") {
      onPlay();
    } else if (cast.taskState === "play") {
      onPause();
    }
  };

  const onSeek = () => {
    const currentTime = videoRef.current?.currentTime;
    const durationSec = positionData.current.totalSec;

    if (durationSec) {
      const progress = (currentTime ? currentTime : 0) / durationSec;
      const storeProgress = positionData.current.storeVal / durationSec;
      onUpdateProgress(progress, storeProgress);
    }
  };

  const onProgress = () => {
    const currentTime = videoRef.current?.currentTime;

    if (currentTime) {
      // update store value

      positionData.current.currentVal = currentTime;
      const durationSec = positionData.current.totalSec;

      if (Math.floor(currentTime) % saveInt === 0 && durationSec) {
        const progress = currentTime / durationSec;
        const storeProgress = positionData.current.storeVal / durationSec;
        // Code here for storing task progress
        onUpdateProgress(progress, storeProgress);
        // console.log({ progress, action: "general" });
      }
    }
  };

  const onEnded = () => {
    // console.log("on ENDED");
    const durationSec = positionData.current.totalSec;
    const storeProgress = positionData.current.storeVal / durationSec;

    onUpdateProgress(1, storeProgress);
  };
  // const onSeeked = () => {
  //   console.log("seeked");
  // };
  const onLoad = () => {
    // console.log("on load");
    const videoDuration = videoRef.current?.duration;
    // console.log("videoDuration", videoDuration);
    // console.log("selectedActivity?.progress", selectedActivity?.progress);
    if (videoDuration) {
      positionData.current.totalSec = videoDuration;

      if (selectedActivity?.progress && selectedActivity.progress < 1) {
        positionData.current.currentVal =
          selectedActivity?.progress * videoDuration;

        // console.log(
        //   "selectedActivity?.progress * videoDuration",
        //   selectedActivity?.progress * videoDuration
        // );

        // seek to video
        if (videoRef.current?.currentTime) {
          videoRef.current.currentTime =
            selectedActivity?.progress * videoDuration;
        }
      }

      // save fp
      if (selectedActivity?.fpProgress) {
        const stSeconds = Math.round(
          selectedActivity?.fpProgress * videoDuration
        );

        positionData.current.storeVal = stSeconds;
      }
    }

    setVideoLoadState(true);
  };

  // console.log("pos", positionData.current);

  const [initDone, setInitDone] = useState<boolean>(false);
  useEffect(() => {
    if (videoRef.current && cast.taskState) {
      if (cast.taskState === "play") {
        if (positionData.current.currentVal && !initDone) {
          videoRef.current.currentTime = positionData.current.currentVal;
          videoRef.current.play();
          setInitDone(true);
        } else {
          videoRef.current.play();
        }
        // videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [cast.taskState, initDone]);

  // console.log("init", initDone, cast?.taskState, checked);

  // console.log("ts", cast.taskState);

  //   const handleTimeUpdate = (e: any) => {
  //     setDuration(
  //       intervalToDuration({
  //         start: 0,
  //         end: Math.round(e.target.currentTime * 1000),
  //       })
  //     );
  //   };

  //   const zeroPad = (num: number | undefined) => String(num).padStart(2, "0");

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative z-0">
      {cast.taskMedia || cast.taskPlaybackId ? (
        <div className="w-full h-full relative z-0">
          {!checked && cast.activityId ? null : cast.taskPlaybackId ? (
            <div className="w-full h-full">
              <MuxVideo
                ref={videoRef}
                loop={false}
                onProgress={onProgress}
                onSeeked={onSeek}
                onEnded={onEnded}
                onLoad={onLoad}
                // onLoadedData={onLoad}
                onLoadedMetadata={onLoad}
                controls={true}
                className="w-full h-full object-contain"
                onPlay={onPlay}
                onPause={onPause}
                playsInline={true}
                streamType="on-demand"
                metadata={{
                  video_id: cast.taskName ? cast.taskName : "",
                  video_title: cast.taskName ? cast.taskName : "",
                  viewer_user_id: cast.userUID ? cast.userUID : "",
                }}
                playbackId={cast.taskPlaybackId}
              />
            </div>
          ) : cast.taskMedia ? (
            <div className="w-full h-full">
              <video
                preload="auto"
                className="w-full h-full object-contain"
                playsInline={true}
                controls={true}
                loop={false}
                muted={false}
                ref={videoRef}
                onProgress={onProgress}
                onSeeked={onSeek}
                onPlay={onPlay}
                onPause={onPause}
                // onSeeked={onSeeked}
                onEnded={onEnded}
                onLoad={onLoad}
              >
                <source
                  type="video/mp4"
                  src={getURLToFetch(
                    cast.taskMedia,
                    1000,
                    getHeight(cast.taskMedia, 1000)
                  )}
                />
              </video>
            </div>
          ) : null}
          {fpProgress > 0 ? (
            <FPProgress
              tone="light"
              fpProgress={fpProgress}
              taskFp={taskFP || 0}
            />
          ) : null}
        </div>
      ) : null}
      {cast.taskState === "play" || cast.taskState === "pause" ? null : (
        // <>
        //   <div
        //     className="absolute left-0 right-0 flex justify-between items-center"
        //     style={{
        //       top: screenHeight / magicNum,
        //       paddingInline: screenHeight / magicNum,
        //     }}
        //   >
        //     <div className="w-20 h-20 p-4 border border-[#7D91C3] rounded-full">
        //       <SocialBoatSVG color="#7D91C3" />
        //     </div>
        //     {duration ? (
        //       <p
        //         className="italic text-white text-4xl"
        //         style={{ fontFamily: "BaiJamjuree-Bold" }}
        //       >
        //         {`${zeroPad(duration.minutes)}:${zeroPad(duration.seconds)}`}
        //       </p>
        //     ) : null}
        //     <div className="w-20 h-20" />
        //   </div>
        //   <div
        //     className="absolute left-0"
        //     style={{
        //       bottom: screenHeight / magicNum,
        //       paddingInline: screenHeight / magicNum,
        //     }}
        //   >
        //     <div className="p-4 bg-[#1618263D] border border-[#465373] rounded-2xl backdrop-blur-xl">
        //       <p
        //         className="italic text-white text-4xl"
        //         style={{ fontFamily: "BaiJamjuree-Bold" }}
        //       >
        //         {cast.taskName}
        //       </p>
        //       <p
        //         className="italic text-white text-2xl"
        //         style={{ fontFamily: "BaiJamjuree-Bold" }}
        //       >
        //         20 Reps HardCoded
        //       </p>
        //     </div>
        //   </div>
        // </>
        <div
          onClick={onToggleState}
          className="absolute z-50 inset-0 bg-[#1618263D] backdrop-blur-xl flex justify-center items-center"
        >
          <p
            className="italic text-white text-5xl capitalize"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {!loadedVideo
              ? "Loading ..."
              : cast.taskState === "init"
              ? "Start Task"
              : `Task ${cast.taskState}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default Stream;
