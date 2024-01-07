import { useInView, motion } from "framer-motion";
import { useRef } from "react";

interface Props {
  imgUrl: string;
}

const StepSingleImg: React.FC<Props> = ({ imgUrl }) => {
  const ref = useRef<null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="md:pb-4 flex flex-1 flex-grow justify-center items-center"
    >
      <motion.img
        initial={{ x: 0, y: -40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1 }}
        src={imgUrl}
        className="object-contain px-4 h-3/4 max-h-[500px] mx-auto"
      />
    </div>
  );
};

export default StepSingleImg;
