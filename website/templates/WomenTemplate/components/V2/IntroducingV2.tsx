import { womenKettlebell2 } from "@constants/icons/iconURLs";
import { WomenImg } from "../Background";
import { FlameWaveBgV2 } from "./FlameWaveBg";

const IntroducingV2 = () => {
  return (
    <div className="w-full relative z-0 border-b border-white/20">
      <div className="w-full max-w-screen-lg mx-auto h-screen relative z-0">
        <WomenImg
          imgUrl={womenKettlebell2}
          clstr="absolute right-0 bottom-0 -z-10 h-2/3 lg:h-full"
        />
        <div className="w-full lg:w-1/2 h-1/2 lg:h-1/2 flex justify-center items-center p-4">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl  font-popM">
            Introducing the{" "}
            <span className="font-nunitoEB text-[#FF33A1]">SuperWoman</span>{" "}
            Program
          </h2>
        </div>
      </div>
      <FlameWaveBgV2 clsStr="absolute left-0 right-0 bottom-0 lg:-bottom-12 object-contain -z-20 lg:z-20" />
    </div>
  );
};

export default IntroducingV2;
