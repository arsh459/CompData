import MediaCard from "@components/MediaCard";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Badge } from "@models/Prizes/PrizeV2";
import { getGradient } from "@modules/ExploreAll/utils";
import { MotionValue, useTransform, motion } from "framer-motion";
import Link from "next/link";

interface Props {
  badges: Badge[];
  scrollYProgress: MotionValue<number>;
  handleBack?: () => void;
}

const ExploreBadgeList: React.FC<Props> = ({
  badges,
  scrollYProgress,
  handleBack,
}) => {
  const translateY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <div className="flex w-full h-3/4 max-w-6xl mx-auto snap-end  flex-col relative z-0">
      <motion.div
        style={{ translateY, opacity }}
        className="absolute bottom-full left-0 w-1/2 flex items-start overflow-hidden py-4"
      >
        <div onClick={handleBack}>
          <ArrowLeftIcon className="w-6 sm:w-9 lg:w-12 aspect-1" />
        </div>
        <p className="flex-1 font-popSB text-base sm:text-3xl lg:text-5xl text-white mx-2 md:mx-4">
          Explore Workouts
        </p>
      </motion.div>
      <div className="flex-1 bg-black/30 border md:border-2 border-b-0 backdrop-blur-3xl overflow-y-scroll scrollbar-hide rounded-t-2xl sm:rounded-t-[47px] lg:rounded-t-[50px] border-white border-opacity-20 p-4 sm:p-5 lg:p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-center justify-center">
        {badges?.map((each, index) => (
          <Link
            key={each.id}
            href={`/coursePage/${each.id}`}
            className="rounded-3xl group"
            style={{
              backgroundImage: getGradient(
                each.bgLinearColors2 || each.bgLinearColors
              ),
            }}
          >
            <div className="w-full aspect-[328/265] overflow-hidden rounded-2xl lg:rounded-3xl relative z-0 group-hover:scale-[98%]">
              <MediaCard
                media={
                  each.id === "d3b54de8-ac46-431c-b174-ab3351729413"
                    ? each.bgImageMale
                    : each.bgImageFemale
                }
                HWClassStr="w-full h-full"
              />
              <div
                className="absolute inset-x-0 bottom-0 top-[60%] rounded-2xl lg:rounded-b-3xl"
                style={{
                  background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)`,
                }}
              />
              <div className="px-4 py-4 sm:py-5 lg:py-6 absolute bottom-0 left-0 right-0 z-10">
                <h3 className="text-white/90 text-base sm:text-lg lg:text-xl font-popM">
                  {each.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreBadgeList;
