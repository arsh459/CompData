import { MotionValue, useTransform, motion } from "framer-motion";
import { section3Data } from "./uttils/constants";
import { memo, useMemo } from "react";
import clsx from "clsx";

const colorArr = section3Data.map((each) => each.color);

interface Props {
  currIndex: number;
  scrollYProgress: MotionValue<number>;
  half?: boolean;
}

const SliderComp: React.FC<Props> = ({ currIndex, scrollYProgress, half }) => {
  const targetArr = useMemo(
    () =>
      half
        ? ["#000000", "#000000", ...colorArr, "#000000", "#000000"]
        : colorArr,
    [half]
  );

  const delta = useMemo(() => 1 / (targetArr.length - 1), [targetArr]);
  const deltaArr = useMemo(
    () => targetArr.map((_, index) => 0 + index * delta),
    [delta, targetArr]
  );

  const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "360deg"]);
  const backgroundColor = useTransform(scrollYProgress, deltaArr, targetArr);

  return (
    <div
      className={clsx(
        half
          ? "w-full sm:w-3/5 aspect-2 overflow-hidden flex justify-center items-end mx-auto py-8"
          : "h-full aspect-1 flex justify-center items-center",
        "pointer-events-none"
      )}
    >
      <div
        className="rounded-full w-4/5 aspect-1 p-2.5"
        style={{
          background: `conic-gradient(from 0deg, ${targetArr.join(", ")})`,
        }}
      >
        <div className="w-full h-full bg-white rounded-full relative z-0">
          <motion.div
            style={{ rotate }}
            className="absolute -inset-5 -z-10 rounded-full"
          >
            <motion.div
              style={{ backgroundColor }}
              className="w-8 h-8 rounded-full p-1 mx-auto relative z-0"
            >
              <motion.div
                style={{ backgroundColor }}
                className="absolute inset-0 -z-10 rounded-full blur-md"
              />
              <div className="w-full h-full rounded-full bg-white" />
            </motion.div>
          </motion.div>

          <div
            className={clsx(
              "absolute left-0 right-0 bottom-0 flex flex-col justify-center items-center",
              half ? "top-1/2" : "top-0"
            )}
          >
            <motion.p
              className="text-2xl text-center font-canelaB"
              style={{ color: backgroundColor }}
            >
              {section3Data[currIndex].phase}
            </motion.p>
            <motion.p
              className="text-xl text-center font-nunitoB"
              style={{ color: backgroundColor }}
            >
              {section3Data[currIndex].phaseDur}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SliderComp);
