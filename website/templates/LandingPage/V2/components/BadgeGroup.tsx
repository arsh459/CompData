import { RefObject } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import ShieldBadge from "./ShieldBadge";

const prizes = [
  "https://ik.imagekit.io/socialboat/Group_649_1ycNZ_P6kf.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889562",
  "https://ik.imagekit.io/socialboat/Group_657_6GEEHdrs5w.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889346",
  "https://ik.imagekit.io/socialboat/Group_655_j_ZbTiMU5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889267",
  "https://ik.imagekit.io/socialboat/Group_639_9jM-nt3PQJ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889489",
  "https://ik.imagekit.io/socialboat/Group_641_syX97Rp_6N.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889514",
  "https://ik.imagekit.io/socialboat/Group_646_AKgoBqWH45.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889481",
  "https://ik.imagekit.io/socialboat/Group_658_jFOdR3VLN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889337",
  "https://ik.imagekit.io/socialboat/Group_647_p8TvBMEJ19.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889454",
  "https://ik.imagekit.io/socialboat/Group_648_IeczVgnzfZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889446",
];

interface Props {
  refObj: RefObject<HTMLDivElement>;
  scrollYProgress: MotionValue<number>;
  scrollPos: number;
  badgeRatio: number;
  scaleNum: number;
  isAnimated: boolean;
}

interface PropsStill {
  refObj: RefObject<HTMLDivElement>;
  scaleNum: number;
}

const BadgeGroup: React.FC<Props> = ({
  refObj: ref,
  scrollYProgress,
  scrollPos,
  badgeRatio,
  scaleNum,
  isAnimated,
}) => {
  let badgewidth = 0;

  function useScale(num: number) {
    const scale = useTransform(
      scrollYProgress,
      [scrollPos, scrollPos + 0.1],
      [scaleNum, num]
    );
    return isAnimated ? num : scale;
  }

  function useOpacity() {
    const opacity = useTransform(
      scrollYProgress,
      [scrollPos, scrollPos + 0.1],
      [0, 1]
    );
    return isAnimated ? 1 : opacity;
  }

  function useSlideLeft(num: number) {
    const SlideLeft = useTransform(
      scrollYProgress,
      [scrollPos, scrollPos + 0.1],
      [0, -num]
    );
    return isAnimated ? -num : SlideLeft;
  }

  const useSlideRight = (num: number) => {
    const SlideRight = useTransform(
      scrollYProgress,
      [scrollPos, scrollPos + 0.1],
      [0, num]
    );
    return isAnimated ? num : SlideRight;
  };

  const scale = useTransform(
    scrollYProgress,
    [0, scrollPos],
    [
      ref.current
        ? ref.current.clientHeight / (ref.current.clientWidth * badgeRatio)
        : 0,
      scaleNum,
    ]
  );

  const tranlateY = useTransform(
    scrollYProgress,
    [0, scrollPos],
    [-(ref.current ? ref.current.clientHeight * (2 / 3) : 0), 0]
  );

  const opacity = useTransform(scrollYProgress, [0, scrollPos], [0, 1]);

  const Item = (index: number, temp: number) => (
    <div key={`item-${index}`}>
      <motion.div
        style={{
          scale: useScale(scaleNum - 0.04 * index),
          translateX: useSlideLeft(temp),
          opacity: useOpacity(),
          zIndex: -(index + 2),
        }}
        className="absolute inset-0"
      >
        <ShieldBadgeHelper brandImageURL={prizes[4 - index]} />
      </motion.div>
      <motion.div
        style={{
          scale: useScale(scaleNum - 0.04 * index),
          translateX: useSlideRight(temp),
          opacity: useOpacity(),
          zIndex: -(index + 2),
        }}
        className="absolute inset-0"
      >
        <ShieldBadgeHelper brandImageURL={prizes[4 + index]} />
      </motion.div>
    </div>
  );

  return (
    <>
      <motion.div
        style={{
          scale: isAnimated ? scaleNum : scale,
          translateY: isAnimated ? 0 : tranlateY,
          opacity: isAnimated ? 1 : opacity,
        }}
        className="absolute inset-0"
      >
        <ShieldBadgeHelper brandImageURL={prizes[4]} />
      </motion.div>
      {Array.from(Array(4)).map((_, index) => {
        const temp = ref.current
          ? ref.current.clientWidth * (scaleNum - 0.04 * (index + 1))
          : 0;
        badgewidth = badgewidth + temp * (1 - scaleNum);
        return Item(index + 1, badgewidth);
      })}
    </>
  );
};
export const BadgeGroupStill: React.FC<PropsStill> = ({
  refObj: ref,
  scaleNum,
}) => {
  let badgewidth = 0;

  const Item = (index: number, temp: number) => (
    <div key={`item-${index}`}>
      <div
        style={{
          transform: `scale(${scaleNum - 0.04 * index})`,
          translate: -temp,
          zIndex: -(index + 2),
        }}
        className="absolute inset-0"
      >
        <ShieldBadgeHelper brandImageURL={prizes[4 - index]} />
      </div>
      <div
        style={{
          transform: `scale(${scaleNum - 0.04 * index})`,
          translate: temp,
          zIndex: -(index + 2),
        }}
        className="absolute inset-0"
      >
        <ShieldBadgeHelper brandImageURL={prizes[4 + index]} />
      </div>
    </div>
  );

  return (
    <>
      <div
        style={{
          transform: `scale(${scaleNum})`,
        }}
        className="absolute inset-0"
      >
        <ShieldBadgeHelper brandImageURL={prizes[4]} />
      </div>
      {Array.from(Array(4)).map((_, index) => {
        const temp = ref.current
          ? ref.current.clientWidth * (scaleNum - 0.04 * (index + 1))
          : 0;
        badgewidth = badgewidth + temp * (1 - scaleNum);
        return Item(index + 1, badgewidth);
      })}
    </>
  );
};

export default BadgeGroup;

interface PropsShieldBadgeHelper {
  brandImageURL: string;
}

const ShieldBadgeHelper: React.FC<PropsShieldBadgeHelper> = ({
  brandImageURL,
}) => {
  return (
    <div className="w-full h-full relative z-0">
      <ShieldBadge badgeId="shield" />
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-full aspect-[88/94] flex justify-center items-center">
          <div className="w-1/3 aspect-1 rounded-full bg-white/50 blur-3xl -translate-y-20" />
        </div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-full aspect-[88/94]">
          <div
            className="translate-y-10"
            style={{ width: "100%", height: "56%" }}
          >
            <img
              src={brandImageURL}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
