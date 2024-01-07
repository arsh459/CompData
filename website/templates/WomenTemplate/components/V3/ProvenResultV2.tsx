import { ProvenResultDataV2 } from "@templates/WomenTemplate/utils";
import clsx from "clsx";
import {
  MotionValue,
  useTransform,
  motion,
  useMotionValue,
  wrap,
  useAnimationFrame,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const images = [
  "https://ik.imagekit.io/socialboat/tr:w-1500,c-maintain_ratio,fo-auto/Frame_1_VHNZ1jZfu.png?updatedAt=1689425902197",
  "https://ik.imagekit.io/socialboat/tr:w-1500,c-maintain_ratio,fo-auto/Frame_2_9Y0RYq9Z2.png?updatedAt=1689425905165",
  "https://ik.imagekit.io/socialboat/tr:w-1500,c-maintain_ratio,fo-auto/Frame_3__W0POqniw.png?updatedAt=1689425898894",
  "https://ik.imagekit.io/socialboat/tr:w-1500,c-maintain_ratio,fo-auto/Frame_4_c0u4LKSXjR.png?updatedAt=1689425910046",
  "https://ik.imagekit.io/socialboat/tr:w-1500,c-maintain_ratio,fo-auto/Frame_5_zTVEhvEak.png?updatedAt=1689425909891",
];

interface Props {
  scrollY: MotionValue<number>;
}

const ProvenResultV2: React.FC<Props> = ({ scrollY }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);

  useEffect(() => {
    if (targetRef.current) {
      setStart(targetRef.current.offsetTop - targetRef.current.offsetHeight);
      setEnd(
        targetRef.current.offsetTop - targetRef.current.offsetHeight * 0.25
      );
    }
  }, [targetRef]);

  const opacity = useTransform(scrollY, [start, end], [0, 1]);
  const translateY = useTransform(scrollY, [start, end], ["100%", "0%"]);

  const baseX = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState<number>(0);
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
    <div ref={targetRef} className="w-screen h-screen flex flex-col">
      <motion.div
        style={{ opacity, translateY }}
        className="flex-1 flex flex-col justify-center items-center"
      >
        <div className="text-4xl lg:text-6xl font-popR pb-16 flex flex-col items-center bg-gradient-to-b from-[#A148D4] via-[#DC87EE] to-[#F4BCF4] text-transparent bg-clip-text py-6">
          <span>Proven results in</span>
          <span className="font-popSB text-5xl lg:text-7xl">7000+ women</span>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 gap-2 px-2">
          {ProvenResultDataV2?.map((item, index) => {
            return (
              <div
                key={`Proven Result text ${index}`}
                className="w-full flex pb-3.5 px-2 justify-center max-w-[240px] h-full items-center"
              >
                <img
                  src={item.media}
                  alt={`Proven Result icon ${index}`}
                  className="w-6 h-6 md:w-8 md:h-8 object-contain mr-2"
                />
                <p
                  className={clsx(
                    "text-sm md:text-xl font-popR text-[#D680EB]",
                    item.break ? "flex-1 md:flex-[.9]" : "flex-1"
                  )}
                  style={{ lineHeight: 1 }}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      <div ref={ref} className="w-full h-[44%] overflow-hidden border border-white">
        <motion.div style={{ x }} className="w-[350vh] h-full flex border border-red-500">
          {[...images, ...images].map((each, index) => (
            <img
              src={each}
              key={`image-group-${index + 1}`}
              alt={`image group ${index + 1}`}
              className="h-full object-contain"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProvenResultV2;
