import MediaCard from "@components/MediaCard";
import { UserInterface } from "@models/User/User";
import Link from "next/link";
import { useState, useEffect } from "react";
import OKIcon from "../icons/OkIcon";
import clsx from "clsx";

interface Props {
  influencer: UserInterface;
  route: string;
  gynaePage?: boolean;
}

const Hero: React.FC<Props> = ({ influencer, route, gynaePage }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const screenHeight = window.innerHeight;
      if (window.scrollY >= screenHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-screen h-screen max-w-screen-xl mx-auto flex flex-col-reverse lg:flex-row lg:justify-between justify-center items-center relative z-0">
      <div className="w-full lg:w-1/2 self-end lg:h-full flex flex-col justify-start items-start sm:items-center sm:justify-center  lg:items-stretch px-9 py-5 sm:p-5 xs:flex-1 iphoneX:flex-none ">
        <div className="w-fit px-2 h-12 bg-white bg-opacity-10 rounded-xl backdrop-blur-3xl flex justify-center items-center mb-4 sm:mb-8 xs:ml-0  sm:mx-auto lg:ml-0">
          <div className="xs:px-2 sm:px-6 xs:h-3 sm:h-4 text-center text-[#A8E723] xs:text-xs sm:text-sm font-medium font-['Poppins-SemiBold']  tracking-[0.06em] flex">
            <div className="w-3 aspect-[13/13]">
              <OKIcon />
            </div>
            <div className="ml-1">{influencer.name} Recommends</div>
          </div>
        </div>

        <h1 className="text-[#EEE9FF] font-pJSSB text-3xl sm:text-5xl lg:text-[58px] text-left sm:text-center lg:text-left  font-bold lg:leading-[62.29px] tracking-wide">
          {influencer.landingContent?.heading}
        </h1>
        <h3 className="text-white/80 text-xs sm:text-base lg:text-lg my-4 text-left sm:text-center lg:text-left font-popR">
          {influencer.landingContent?.subtitle}
        </h3>

        {isVisible ? (
          <div className="w-full items-center  xs:hidden lg:flex md:relative xs:bottom-0 xs:right-0 xs:transition-opacity xs:opacity-100 xs:backdrop-blur-lg lg:justify-start xs:justify-center xs:h-20 xs:z-40">
            <Link
              passHref
              href={route || "/start"}
              className="md:mr-4 w-full max-w-[275px] bg-[#A8E723]  backdrop-blur-lg rounded-[12px]"
            >
              <p className=" text-center text-[#521D7A] px-14 py-3.5  font-popM text-base">
                Start Now
              </p>
            </Link>
          </div>
        ) : (
          <></>
        )}
        {/* <Link passHref href={route} className="w-full sm:w-1/2 mt-5">
          <div
            className={clsx(
              "w-full   font-popM text-center p-3 text-sm iphoneX:text-base",
              "text-[#521D7A] bg-[#A8E723] rounded-xl"
            )}
          >
            Start Now
          </div>
        </Link> */}
      </div>

      <div className="w-full h-1/2 lg:w-1/2 lg:h-2/3 flex justify-center items-center p-4 relative z-0 ">
        {influencer.landingContent?.img ? (
          <MediaCard
            media={influencer.landingContent?.img}
            HWClassStr="h-full"
            objectString="object-contain"
          />
        ) : (
          <img
            src={`https://ik.imagekit.io/socialboat/tr:w-400,h-472,c-maintain-ratio,fo-auto/Frame%201000001134_nkphZfuJH.png?updatedAt=1699108183838`}
            className={clsx("h-full object-contain")}
            alt="gynaec-program"
          />
        )}
      </div>
    </div>
  );
};

export default Hero;
