import useIntersectionPlay from "@hooks/utils/useIntersectionPlay";
import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PanImg from "./PanImg";

interface Props {
  imgArr?: string[];
  nameArr?: string[];
  personImg?: string;
  preventAutoChange?: boolean;
  videoLink?: string;
  slide?: boolean;
  pan?: boolean;
  personImgStyleTW?: string;
}

const LandingFeatures: React.FC<Props> = ({
  children,
  imgArr,
  nameArr,
  personImg,
  preventAutoChange,
  videoLink,
  slide,
  pan,
  personImgStyleTW,
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLImageElement>(null);
  const { videoRef } = useIntersectionPlay(true);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const func = (length: number) => {
      setTimeout(async () => {
        await controls.start({
          opacity: [1, 0],
          translateX: slide ? [0, -250] : undefined,
          transition: {
            duration: 1,
            ease: "easeInOut",
          },
        });
        setSelectedIndex((prev) => (prev + 1) % length);
        await controls.start({
          opacity: [0, 1],
          translateX: slide ? [250, 0] : undefined,
          transition: {
            duration: 1,
            ease: "easeInOut",
          },
        });
        func(length);
      }, 3000);
    };
    if (!preventAutoChange && imgArr) {
      func(imgArr.length);
    }
  }, [controls, imgArr, preventAutoChange, slide]);

  return (
    <div className="px-8 py-16 sm:py-20 lg:py-24 text-white flex-1 flex items-center flex-wrap-reverse justify-evenly max-w-screen-xl mx-auto overflow-hidden">
      <div className="w-full lg:w-1/2 pt-4 sm:pt-0 max-w-md text-left">
        {nameArr ? (
          <p className="text-5xl md:text-7xl text-center md:text-left font-baib">
            Workout for
            <br />
            <motion.span
              className="text-[#FF4165] whitespace-nowrap"
              animate={controls}
            >
              {nameArr[selectedIndex]}
            </motion.span>
          </p>
        ) : null}
        {children}
      </div>
      <div className={clsx("relative w-full max-w-md", personImg && "mb-28")}>
        {videoLink ? (
          <video
            className="w-[200%] aspect-[9/10] object-cover"
            autoPlay={false}
            ref={videoRef}
            playsInline
            preload="auto"
            muted={true}
            controls={false}
            src={videoLink}
            loop={true}
          />
        ) : imgArr && pan ? (
          <PanImg imgArr={imgArr} />
        ) : imgArr ? (
          <motion.img
            animate={controls}
            onAbort={() => console.log("here")}
            src={imgArr[selectedIndex]}
            ref={ref}
          />
        ) : null}
        {personImg ? (
          <div
            className={clsx(
              "absolute  translate-x-1/4 -translate-y-1/2 flex justify-end items-end",
              personImgStyleTW ? personImgStyleTW : "right-0 top-1/2"
            )}
          >
            <img
              src={personImg}
              className={clsx("w-2/3 object-contain")}
              alt="person image"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LandingFeatures;
