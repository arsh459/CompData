import { useEffect, useRef, useState } from "react";
import { RecommendationV2CardData } from "../data/data";
import RecommendationCard from "./RecommendationCard";
import {
  motion,
  // useAnimation,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap,
} from "framer-motion";

const RecommendationSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(0, -scrollWidth, v)}px`);
  useAnimationFrame(() => {
    baseX.set(baseX.get() - 1);
  });

  useEffect(() => {
    if (ref.current) {
      const elementWidths = Array.from(ref.current.children).map(
        (element) => element.clientWidth
      );
      const totalWidth = elementWidths.reduce((acc, width) => acc + width, 0);

      setScrollWidth(totalWidth);
    }
  }, []);
  return (
    <div ref={ref} className=" w-screen overflow-hidden">
      <motion.div
        style={{ x }}
        className="w-[450vh] px-8 grid grid-flow-col grid-rows-1  gap-8 my-12  items-center"
      >
        {[...RecommendationV2CardData ,...RecommendationV2CardData ].map((item, index) => {
          return <RecommendationCard key={index} index={index} item={item} />;
        })}
      </motion.div>
    </div>
  );
};

export default RecommendationSection;
