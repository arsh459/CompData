import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BadgeGroup, { BadgeGroupStill } from "./BadgeGroup";
import clsx from "clsx";

const scaleNum = 0.2;
const scrollPos = 0.4;
const badgeRatio = 88 / 94;

const RewardPrizes = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  const y = useTransform(
    scrollYProgress,
    [scrollPos - 0.1, scrollPos + 0.1],
    [1000, 0]
  );

  const opacity1 = useTransform(
    scrollYProgress,
    [scrollPos + 0.1, scrollPos + 0.15],
    [0, 0.15]
  );

  const opacity2 = useTransform(
    scrollYProgress,
    [scrollPos, scrollPos + 0.1],
    [0, 1]
  );

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0.6) {
        setIsAnimated(true);
      }
    });
  }, [scrollYProgress]);

  return (
    <div
      className={clsx(
        "w-full flex justify-center items-center max-w-screen-xl mx-auto px-4 h-[50vh] sm:h-[65vh] lg:h-[80vh]"
      )}
    >
      <div
        ref={ref}
        className="w-full max-w-screen-lg h-[150vh] flex flex-col justify-center items-center relative z-0"
      >
        <BadgeGroup
          refObj={ref}
          scrollYProgress={scrollYProgress}
          badgeRatio={badgeRatio}
          scaleNum={scaleNum}
          scrollPos={scrollPos}
          isAnimated={isAnimated}
        />
        <motion.div
          style={{
            width: ref.current ? ref.current.clientWidth : 0,
            height: ref.current
              ? ref.current.clientWidth * scaleNum * badgeRatio
              : 0,
            y: !isAnimated ? y : 0,
          }}
          className="flex flex-col justify-center items-center relative"
        >
          <p
            style={{
              fontFamily: "BaiJamjuree-Bold",
            }}
            className="absolute bottom-full text-2xl sm:text-4xl xl:text-6xl text-center text-white pb-5"
          >
            Unlock Rewards &#38; Cash prizes
            <br /> by working out for{" "}
            <span className="text-[#FF3E62]">10 mins</span>
          </p>
          <motion.div
            className="absolute -translate-y-1/2 rotate-180 w-full pointer-events-none"
            style={{
              top:
                (ref.current
                  ? ref.current.clientWidth * scaleNum * badgeRatio
                  : 0) * 1.75,
              height: ref.current ? ref.current.clientHeight : 0,
              opacity: !isAnimated ? opacity1 : 0.15,
            }}
          >
            <BadgeGroupStill refObj={ref} scaleNum={scaleNum} />
          </motion.div>
        </motion.div>
        <motion.div
          className="bg-[#262544] w-full max-w-screen-md aspect-2 -translate-y-1/4 rounded-t-full blur-3xl"
          style={{
            opacity: !isAnimated ? opacity2 : 1,
            position: "absolute",
            zIndex: -1000,
          }}
        />
      </div>
    </div>
  );
};

export default RewardPrizes;
