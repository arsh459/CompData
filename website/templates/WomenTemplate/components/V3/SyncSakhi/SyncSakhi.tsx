import KnowMoreButton from "./KnowMoreButton";
import SyncSakhiIcon from "./SyncSakhiIcon";
import SyncSakhiImage from "./SyncSakhiImage";
import TextBoxSyncSakhi from "./TextBoxSyncSakhi";
// import { useEffect, useRef, useState } from "react";
// import { MotionValue, motion, useTransform } from "framer-motion";
// import useWindowDimensions from "@hooks/utils/useWindowDimensions";

interface Props {
  // scrollY: MotionValue<number>;
}

const SyncSakhi: React.FC<Props> = ({}) => {
  // const { height } = useWindowDimensions();
  // const [startPoint, setStartPoint] = useState(0);
  // const [endPoint, setEndPoint] = useState(0);
  // const targetRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (targetRef.current) {
  //     setStartPoint(targetRef.current.offsetTop - height * 0.6);
  //     setEndPoint(
  //       targetRef.current.offsetTop - height + targetRef.current.clientHeight
  //     );
  //   }
  // }, [targetRef, height]);

  // const translateY = useTransform(
  //   scrollY,
  //   [startPoint, endPoint],
  //   ["-100%", "0%"]
  // );

  return (
    <div
      // ref={targetRef}
      className="h-screen w-screen flex flex-col justify-center items-center relative z-0"
    >
      <div className="w-full max-w-screen-lg mx-auto flex-1 flex flex-col lg:flex-row items-center justify-between pt-20 sm:pt-24 pb-4 sm:pb-8">
        <div className="w-full lg:w-2/3">
          <TextBoxSyncSakhi />
          <div className="hidden lg:flex flex-col">
            <SyncSakhiIcon />
            <KnowMoreButton />
          </div>
        </div>
        <div className="flex-1 lg:w-1/3 aspect-[291/596] mt-4 lg:mt-0 relative z-0">
          <SyncSakhiImage />
        </div>
        <div className="block lg:hidden">
          <KnowMoreButton />
        </div>
      </div>
      {/* <motion.div
        className="absolute -z-10 bg-black/30 inset-0"
        style={{ translateY }}
      /> */}
    </div>
  );
};

export default SyncSakhi;
