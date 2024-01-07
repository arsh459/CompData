import { useRef, useState } from "react";
// import { useInView } from "framer-motion";
import LogoColor from "./LogoColor";
import useIntersectionPlay from "@hooks/utils/useIntersectionPlay";

const AIPowerd = () => {
  const ref = useRef(null);
  // const isInView = useInView(ref, { once: true });
  const [isPlayed, setIsPlayed] = useState<boolean>(false);
  const { videoRef } = useIntersectionPlay(!isPlayed);

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div
        ref={ref}
        className="w-screen max-w-screen-xl mx-auto relative z-0 flex justify-center items-center py-28 md:py-40"
      >
        {/* <LogoColor opacity={isInView ? 0.25 : 1} width={width} /> */}
        <LogoColor opacity={0.25} />
        <div
          style={{
            fontFamily: "BaiJamjuree-Bold",
            // transform: isInView ? "none" : "translateY(1000px)",
            transition: "all 500ms cubic-bezier(0.17, 0.55, 0.55, 1)",
          }}
          className="absolute inset-0 flex justify-center items-center"
        >
          <h2 className="text-2xl sm:text-4xl xl:text-6xl text-center text-white">
            Real time <span className="text-[#FF3E62]">AI Powered</span>
            <br /> Fitness Scoring
          </h2>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center pb-28 md:pb-40">
        <video
          className="w-full aspect-1 md:aspect-[16/9] object-cover"
          ref={videoRef}
          autoPlay={false}
          playsInline
          preload="auto"
          muted={true}
          controls={false}
          src="https://ik.imagekit.io/socialboat/track_meter_JHZ5EG9WZ.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1667468706296"
          loop={false}
          onEnded={() => setIsPlayed(true)}
        />
      </div>
    </div>
  );
};

export default AIPowerd;
