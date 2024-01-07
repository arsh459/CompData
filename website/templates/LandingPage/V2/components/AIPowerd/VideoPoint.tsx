import useIntersectionPlay from "@hooks/utils/useIntersectionPlay";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import PointAddSvg from "./PointAddSvg";

const VideoPoint = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);
  const { videoRef } = useIntersectionPlay(!shouldAnimate);

  const handleVideoEnd = () => {
    setShouldAnimate(true);
  };

  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(200px)",
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
      className="w-screen max-w-screen-xl mx-auto flex flex-col justify-center items-center py-28"
    >
      <div
        style={{
          fontFamily: "BaiJamjuree-Bold",
        }}
        className="flex justify-center items-center"
      >
        <h2 className="text-2xl sm:text-4xl xl:text-6xl text-center text-white">
          Scan your body movements to
          <br />
          give you Most Accurate data.
        </h2>
      </div>
      <div className="h-16" />
      <div className="w-full flex justify-center items-center">
        <div className="w-1/2 max-w-md relative z-0">
          <video
            className="w-[200%] aspect-[9/10] object-cover"
            autoPlay={false}
            ref={videoRef}
            playsInline
            preload="auto"
            muted={true}
            controls={false}
            // loop={true}
            src="https://sbusermedia.s3.ap-south-1.amazonaws.com/webapp/Track-5.mp4"
            onEnded={handleVideoEnd}
          />
          <div className="absolute left-[80%] bottom-0 w-1/2 lg:w-full max-w-[300px]">
            <PointAddSvg shouldAnimate={shouldAnimate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPoint;
