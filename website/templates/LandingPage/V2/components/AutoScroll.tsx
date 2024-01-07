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
  isReverseFlow?: boolean;
}

const AutoScroll: React.FC<Props> = ({
  children,
  pauseAnimationOnHover,
  isReverseFlow,
}) => {
  const baseX = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const x = useTransform(baseX, (v) => `${wrap(0, -scrollWidth, v)}px`);
  const [pauseAnimation, setPauseAnimation] = useState<boolean>(false);

  useAnimationFrame(() => {
    if (!pauseAnimation) {
      baseX.set(baseX.get() - (isReverseFlow ? -1 : 1));
    }
  });

  useEffect(() => {
    if (children && ref.current) {
      // console.log("Hi");
      setScrollWidth(ref.current.children[0].children[0].clientWidth);
    }
  }, [children]);

  return (
    <div
      ref={ref}
      style={{ overflow: "hidden" }}
      onMouseEnter={() =>
        setPauseAnimation(pauseAnimationOnHover ? pauseAnimationOnHover : false)
      }
      onMouseLeave={() => setPauseAnimation(false)}
    >
      <motion.div style={{ x, display: "flex" }}>
        {children}
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
};

export default AutoScroll;
