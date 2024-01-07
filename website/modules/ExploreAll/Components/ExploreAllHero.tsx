import { exploreAllWorkoutImg } from "@constants/icons/iconURLs";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import useWindowDimensions from "@hooks/utils/useWindowDimensions";
import { MotionValue, useTransform, motion } from "framer-motion";
import { useRouter } from "next/router";

const lg = 1024;

interface Props {
  scrollYProgress: MotionValue<number>;
}

const ExploreAllHero: React.FC<Props> = ({ scrollYProgress }) => {
  const { width } = useWindowDimensions();
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", width >= lg ? "50%" : "35%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex w-full h-1/3 sm:h-2/5 lg:h-3/5 max-w-6xl mx-auto pt-24 overflow-hidden snap-start">
      <motion.div style={{ opacity }} className="w-1/2 flex py-12 gap-2">
        <div
          onClick={handleBack}
          className="h-7 sm:h-12 lg:h-[72px] flex justify-center items-center"
        >
          <ArrowLeftIcon className="w-5 sm:w-[26px] lg:w-8 aspect-1 text-white" />
        </div>
        <p className="font-popSB text-xl sm:text-5xl lg:text-7xl text-white">
          <span className="font-canelaL text-white/70"> Want to</span> <br />
          <span>
            Explore <span className="text-white/70">All</span>
          </span>{" "}
          <br />
          <span>
            <span className="text-white/70">our</span> Workouts
          </span>
        </p>
      </motion.div>

      <motion.img
        src={exploreAllWorkoutImg}
        className="w-1/2 object-contain object-left-bottom"
        alt="want to explore all"
        style={{ translateY, scale }}
      />
    </div>
  );
};

export default ExploreAllHero;
