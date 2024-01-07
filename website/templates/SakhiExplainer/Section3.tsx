import { chatAiIcon } from "@constants/icons/iconURLs";
import { MotionValue, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Section3DataType } from "./uttils/interface";
import SliderComp from "./SliderComp";

interface Props {
  currIndex: number;
  setCurrIndex: () => void;
  scrollYProgress: MotionValue<number>;
}

export const Section3Item: React.FC<Section3DataType & Props> = ({
  text,
  highlightedText,
  image,
  currIndex,
  setCurrIndex,
  scrollYProgress,
}) => {
  const ref = useRef<null>(null);
  const splitedText = text.split(highlightedText);
  const inView = useInView(ref, { amount: 1 });

  useEffect(() => {
    if (inView) {
      setCurrIndex();
    }
  }, [inView, setCurrIndex]);

  return (
    <div className="snap-center w-full h-screen flex flex-col justify-center items-center">
      <div className="w-full sm:w-3/5 aspect-2 mt-12 py-8 lg:hidden" />

      <div
        ref={ref}
        className="flex-1 lg:w-4/5 max-w-xl lg:max-w-none flex flex-col justify-center items-center p-4 lg:p-8"
      >
        <div className="w-full h-full sm:h-max bg-white rounded-3xl flex flex-row gap-4 lg:gap-8 p-4 lg:p-8">
          <div className="w-full lg:w-2/5 flex flex-col">
            <div className="w-full flex flex-row">
              <img
                src={chatAiIcon}
                className="w-11 aspect-[1.5] mr-2 object-contain"
              />
              <p className="font-nunitoB text-xl iphoneX:text-2xl text-transparent bg-clip-text bg-gradient-to-tr from-[#1FE9FF] via-[#53A2FF] to-[#E753FF]">
                Sakhi
              </p>
            </div>
            <p
              className="w-full text-sm iphoneX:text-base text-[#756E96] py-4"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {splitedText[0]}
              <span className="text-[#7B5BFF]">{highlightedText}</span>
              {splitedText[1]}
            </p>
            <div className="w-full flex-1 sm:aspect-[300/212] relative z-0">
              <div className="absolute inset-0 z-0">
                <img src={image} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 justify-center items-center">
            <SliderComp
              currIndex={currIndex}
              scrollYProgress={scrollYProgress}
            />
          </div>
        </div>
      </div>

      <div className="w-full h-28 lg:hidden" />
    </div>
  );
};
