import useWindowDimensions from "@hooks/utils/useWindowDimensions";
import { useEffect } from "react";
import BadgeGroupV2 from "./BadgeGroupV2";

const RevardPrizesV2 = () => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    console.log(width);
  }, [width]);

  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col justify-center items-center relative z-0">
      <p
        style={{
          fontFamily: "BaiJamjuree-Bold",
        }}
        className="absolute bottom-full text-2xl sm:text-4xl xl:text-6xl text-center text-white pb-5"
      >
        Unlock Rewards &#38; Cash prizes
        <br /> by working out for{" "}
        <span className="text-[#FF3E62]">10 mins</span>
      </p>
      <BadgeGroupV2 badgewidth={width > 1000 ? 150 : width > 500 ? 100 : 50} />
      <div className="opacity-25" style={{ transform: "scaleY(-1)" }}>
        <BadgeGroupV2
          badgewidth={width > 1000 ? 150 : width > 500 ? 100 : 50}
        />
      </div>
      <div className="bg-[#262544] absolute inset-0 -z-50 max-w-screen-md -translate-y-1/4 rounded-t-full blur-3xl" />
    </div>
  );
};

export default RevardPrizesV2;
