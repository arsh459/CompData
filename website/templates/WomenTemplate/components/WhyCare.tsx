import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";

interface Props {
  imgUrl: string;
  imgStyle: string;
  otherElements: JSX.Element;
  alt?: string;
}

const WhyCare: React.FC<Props> = ({
  imgUrl,
  imgStyle,
  children,
  otherElements,
  alt,
}) => {
  const childRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    target: childRef,
    offset: ["end end", "start start"],
  });

  const [offsetFromTop, setOffsetFromTop] = useState<number>(0);
  const [scrollheight, setScrollHeight] = useState<number>(0);

  const opacity = useTransform(scrollY, [offsetFromTop, scrollheight], [1, 0]);
  const filter = useTransform(
    scrollY,
    [offsetFromTop, scrollheight],
    ["blur(0px)", "blur(20px)"]
  );

  useEffect(() => {
    if (childRef.current) {
      const screenHeight = window.innerHeight;
      const offsetTop = childRef.current.offsetTop;
      const clientHeight = childRef.current.clientHeight;
      setOffsetFromTop(offsetTop);
      setScrollHeight(offsetTop + clientHeight - screenHeight);
    }
  }, [childRef, childRef.current?.offsetTop, childRef.current?.clientHeight]);

  return (
    <div ref={childRef} className="relative z-0">
      <motion.div
        className="sticky top-0 w-screen h-screen -z-10 pl-8 flex justify-center items-end overflow-hidden"
        style={{ opacity, filter }}
      >
        <img
          src={imgUrl}
          className={clsx(
            "min-w-[600px] sm:min-w-[1000px] mx-8 object-contain",
            imgStyle
          )}
          alt={alt ? alt : "women group image"}
        />
      </motion.div>
      <div className="absolute top-0 left-0 right-0 h-screen flex justify-center items-center">
        {children}
      </div>
      {otherElements}
    </div>
  );
};

export default WhyCare;
