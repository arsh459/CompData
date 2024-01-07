// import SocialBoatSVG from "@components/logo/SocialBoatSVG";
// import SocialBoatSVG from "@components/logo/SocialBoatSVG";
import { taskState } from "@models/Cast/Cast";
// import { updatePlaybackState } from "@models/Cast/utils";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import MuxVideo from "@mux/mux-video-react";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import { getURLToFetch } from "@templates/listing/HeaderImage/utils";
import {
  useState,
  // useState
} from "react";
import { usePlaybackMethods } from "./hooks/usePlaybackMethods";
import FPProgress from "./FPProgress";

interface Props {
  taskMedia?: CloudinaryMedia | AWSMedia;
  playbackId?: string;
  taskName?: string;
  userUID?: string;
  activityId?: string;
  taskId: string;
}

const StreamV2: React.FC<Props> = ({
  taskMedia,
  playbackId,
  taskName,
  activityId,
  userUID,
  taskId,
}) => {
  //   const [duration, setDuration] = useState<Duration>();
  const [taskState, setTaskState] = useState<taskState>("init");

  const {
    onSeek,
    onEnded,
    onLoad,
    onProgress,
    intervalRef,
    videoRef,
    positionData,
    fpProgress,
    taskFP,
  } = usePlaybackMethods(userUID, activityId, taskState, taskId);

  const onLoadSuccess = () => {
    console.log("on load success");
    onLoad();
    setTaskState("ready");
  };

  const onPlay = () => {
    setTaskState("play");

    // clear previous timers
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const interval = setInterval(() => {
      // console.log("inc", positionData.current.storeVal);
      positionData.current.storeVal++;
    }, 1000);
    intervalRef.current = interval;
  };
  const onPause = () => {
    // console.log("pause event");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTaskState("pause");
  };

  // toggle play state
  const onToggleState = () => {
    if (taskState === "ready" || taskState === "pause") {
      onPlay();
    } else if (taskState === "play") {
      onPause();
    }
  };

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
      {taskMedia || playbackId ? (
        <div className="w-full h-full relative z-0">
          {playbackId ? (
            <MuxVideo
              ref={videoRef}
              loop={false}
              controls={true}
              onProgress={onProgress}
              // onProgress={() => console.log("on progress")}
              onSeeked={onSeek}
              // onSeeked={() => console.log("on seek")}
              onEnded={onEnded}
              // onEnded={() => console.log("on ended")}
              onLoad={onLoadSuccess}
              // onLoad={() => console.log("on load")}
              // onLoadedData={onLoadSuccess}
              // onLoadedData={() => console.log("on load data")}
              // onCanPlay={onLoadSuccess}
              // onCanPlay={() => console.log("on can play")}
              onLoadedMetadata={onLoadSuccess} //{() => console.log("meta data loaded")}
              onPlay={onPlay}
              // onPlay={() => console.log("on play")}
              onPause={onPause}
              // onPause={() => console.log("on pause")}
              className="w-full h-full object-contain"
              playsInline={true}
              streamType="on-demand"
              metadata={{
                video_id: taskName ? taskName : "",
                video_title: taskName ? taskName : "",
                viewer_user_id: userUID ? userUID : "",
              }}
              playbackId={playbackId}
            />
          ) : taskMedia ? (
            <video
              preload="auto"
              className="w-full h-full object-contain"
              playsInline={true}
              controls={true}
              loop={false}
              muted={false}
              onProgress={onProgress}
              onSeeked={onSeek}
              onPlay={onPlay}
              onPause={onPause}
              // onSeeked={onSeeked}
              onEnded={onEnded}
              onLoad={onLoadSuccess}
              onLoadedData={onLoadSuccess}
              ref={videoRef}
            >
              <source
                type="video/mp4"
                src={getURLToFetch(taskMedia, 1000, getHeight(taskMedia, 1000))}
              />
            </video>
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
      {taskState === "play" || taskState === "pause" ? null : (
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
            {taskState === "init"
              ? "Loading ..."
              : taskState === "ready"
              ? "Start Video"
              : `Task ${taskState}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default StreamV2;
