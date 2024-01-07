import { weEventTrack } from "@analytics/webengage/user/userLog";
import { appStore, playStore, playStoreWhite } from "@constants/icons/iconURLs";
import ButtonWithIconV2 from "@templates/LandingPage/V2/components/ButtonWithIconV2";
import StarRating from "@templates/LandingPage/V2/DetailedInfo/StarRating";
import clsx from "clsx";
import { useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import CountUp from "react-countup";
import CircleComp from "./CircleComp";

const rating = 5;

export const androidBranchURL = "https://socialboat.app.link/sbandroid";
export const iosBranchURL = "https://socialboat.app.link/sbIOS";

interface Props {
  origin: string;
  showChange?: boolean;
}

const JoinRevolutionV2: React.FC<Props> = ({ origin, showChange }) => {
  const ref = useRef<null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const onIOS = () => {
    weEventTrack("landing_clickIOS", {});
  };
  const onAndroid = () => {
    weEventTrack("landing_clickAndroid", {});
  };

  return (
    <div
      ref={ref}
      className="w-full max-w-screen-lg mx-auto flex flex-col sm:flex-row-reverse justify-center items-center p-4"
    >
      <div className="w-4/5 sm:w-2/5">
        <CircleComp HWString="w-full">
          <div className="flex flex-col justify-center items-center">
            <h3
              className={clsx(
                "font-baib  text-4xl sm:text-6xl lg:text-8xl",
                showChange && " text-white"
              )}
            >
              {inView ? (
                <CountUp end={rating} decimals={1} duration={0.5} />
              ) : (
                <span>{inView ? rating : 0}</span>
              )}
            </h3>
            <StarRating rating={rating} />
            <p className="text-white/80 text-xs sm:text-sm lg:text-base font-popL">
              Average app rating
            </p>
          </div>
        </CircleComp>
      </div>
      <div className="w-8 aspect-1" />
      <div
        className="w-full sm:w-3/5 flex flex-col justify-center"
        id="get_started"
      >
        <h3 className="w-full text-4xl sm:text-5xl lg:text-6xl text-center md:text-left font-popSB leading-tight text-transparent bg-clip-text bg-gradient-to-br from-[#B269FF] via-[#E3C6FF] to-[#D45FFF]">
          {showChange ? "Make a change today" : "Download SocialBoat"}
        </h3>

        <div className="grid gap-4 sm:gap-6 sm:grid-flow-col justify-center sm:justify-start auto-cols-[minmax(0,_200px)] pt-10">
          <Link passHref href={androidBranchURL}>
            <ButtonWithIconV2
              btnText={"App Store"}
              onClick={onIOS}
              iconImgSrc={appStore}
              iconImgSrcWithHttp={true}
              imgStyle="w-5 aspect-1 mr-2"
              textColor={"#000"}
              btnStyle="w-full flex justify-center items-center p-3 rounded-full bg-white text-black font-popR"
            />
          </Link>
          <Link passHref href={iosBranchURL}>
            <ButtonWithIconV2
              onClick={onAndroid}
              btnText={"Play Store"}
              iconImgSrc={showChange ? playStoreWhite : playStore}
              iconImgSrcWithHttp={true}
              textColor={showChange ? "#fff" : "#000"}
              imgStyle="w-6 aspect-1 mr-3"
              btnStyle="w-full flex justify-center items-center p-3 rounded-full bg-white text-black font-popR"
              bgColor={showChange ? "#000" : "#fff"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinRevolutionV2;
