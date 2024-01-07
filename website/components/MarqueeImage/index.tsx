import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useMotionValue,
  wrap,
  useAnimationFrame,
} from "framer-motion";
import clsx from "clsx";

interface Props {
  images: string[];
  direction: "left" | "right";
  height?: string;
}

const MarqueeImage: React.FC<Props> = ({
  images,
  direction = "left",
  height,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const baseX = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const x = useTransform(baseX, (v) => `${wrap(0, -scrollWidth, v)}px`);

  useAnimationFrame(() => {
    const speed = direction === "right" ? 1 : -1;
    baseX.set(baseX.get() + speed);
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
    <div
      ref={targetRef}
      className={`w-screen ${height ? "" : "h-screen"} flex flex-col`}
    >
      <div
        ref={ref}
        className={clsx(height ? height : "h-[33%]", `w-full overflow-hidden`)}
      >
        <motion.div style={{ x }} className="w-[350vh] h-full flex">
          {images &&
            [...images, ...images]?.map((each, index) => (
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

export default MarqueeImage;
