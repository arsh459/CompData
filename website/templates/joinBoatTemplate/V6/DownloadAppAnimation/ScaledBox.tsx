import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingModal from "@components/loading/LoadingModal";

const boxGap = 75;
const boxAspect = 0.7;

interface Props {
  setAnimationState: (val: "cards" | "none") => void;
}

const ScaledBox: React.FC<Props> = ({ setAnimationState }) => {
  const [data, setData] = useState<{ scale: number; bowArr: number[] }>();

  useEffect(() => {
    let scale = 1;
    const bowArr: number[] = [];
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width > height) {
      let index = 0;
      let smallestBowWidth = (height / 3.5) * boxAspect;
      scale = Math.round(width / smallestBowWidth);
      while (smallestBowWidth <= width) {
        bowArr.push(smallestBowWidth / boxAspect);
        smallestBowWidth += boxGap + Math.pow(index, 2);
        index++;
      }
    } else {
      let index = 0;
      let smallestBowHeight = height / 3.5;
      scale = Math.round(height / smallestBowHeight);
      while (smallestBowHeight <= height) {
        bowArr.push(smallestBowHeight);
        smallestBowHeight += boxGap + Math.pow(index, 2);
        index++;
      }
    }

    setData({ scale, bowArr });
  }, [setAnimationState]);

  return data ? (
    <motion.div
      key="scale"
      className="w-full h-full relative z-0"
      animate={{ scale: data.scale }}
      transition={{
        ease: "linear",
        duration: Math.min(Math.max(1, data.scale / 2), 2.5),
        delay: 0.2,
      }}
      onAnimationComplete={() => setAnimationState("none")}
      onAnimationStart={() =>
        setTimeout(() => {
          setAnimationState("cards");
        }, Math.min(Math.max(1, data.scale / 2), 2.5) * 500)
      }
    >
      {data.bowArr.map((each, index) => (
        <div
          key={`Box-${index}`}
          className="absolute inset-0 z-0 flex justify-center items-center"
        >
          <div>
            <svg width={each * boxAspect} height={each} fill="none">
              <rect
                x={index / 2}
                y={index / 2}
                width={each * boxAspect - index}
                height={each - index}
                rx={each / 4}
                strokeWidth={index}
                stroke="url(#prefix_paint_linear)"
              />
              <defs>
                <linearGradient
                  id="prefix_paint_linear"
                  x1={0}
                  y1={0}
                  x2={1000}
                  y2={1000}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#53E0FF" />
                  <stop offset="25%" stopColor="#4C89F4" />
                  <stop offset="100%" stopColor="#AB37F2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      ))}
    </motion.div>
  ) : (
    <LoadingModal
      fill="#ff735c"
      width={50}
      height={50}
      fixed={true}
      noBg={true}
    />
  );
};

export default ScaledBox;
