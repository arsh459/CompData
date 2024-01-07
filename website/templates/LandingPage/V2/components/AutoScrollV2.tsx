import { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface Props {
  pauseAnimationOnHover?: boolean;
}

const AutoScrollV2: React.FC<Props> = ({ children, pauseAnimationOnHover }) => {
  const baseX = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const x = useTransform(baseX, (v) => `${wrap(0, -scrollWidth, v)}px`);
  const [pauseAnimation, setPauseAnimation] = useState<boolean>(false);

  useAnimationFrame(() => {
    if (!pauseAnimation) {
      baseX.set(baseX.get() - 1);
    }
  });

  useEffect(() => {
    if (ref.current) {
      // calculate the total width of the elements
      const elementWidths = Array.from(ref.current.children[0].children).map(
        (element) => element.clientWidth
      );
      const totalWidth = elementWidths.reduce((acc, width) => acc + width, 0);

      // set the scroll width to the total width of the elements
      console.log(totalWidth); // add this line to check the calculated width
      setScrollWidth(totalWidth);
    }
  }, [children]);

  return (
    <div
      ref={ref}
      style={{ overflow: "hidden" }}
      onMouseEnter={() => setPauseAnimation(!!pauseAnimationOnHover)}
      onMouseLeave={() => setPauseAnimation(false)}
    >
      <motion.div style={{ x, display: "flex" }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
};

export default AutoScrollV2;
