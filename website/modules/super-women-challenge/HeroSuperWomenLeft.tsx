import Link from "next/link";
import React, { useEffect, useState } from "react";

import moment from "moment";

interface Props {
  route?: string;
  btnText: string;
  roundName?: string;
  start: number;
  end: number;
  shortDescription?: string;
}

const HeroSuperWomenLeft: React.FC<Props> = ({
  route,
  btnText,
  roundName,
  start,
  end,
  shortDescription,
}) => {
  const formattedStart = moment(start).format("Do MMM");
  const formattedEnd = moment(end).format("Do MMM");
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
    <>
      <div className="w-full lg:pt-5">
        <div className="w-fit h-12 bg-white bg-opacity-10 rounded-xl backdrop-blur-3xl flex justify-center items-center mb-8 xs:ml-0 sm:mx-auto  lg:ml-0">
          <div className="xs:px-2 sm:px-6 xs:h-3 sm:h-4 text-center text-white text-opacity-70 xs:text-xs sm:text-sm font-medium font-['Poppins-Regular']  tracking-[0.06em]">
            Starting from {formattedStart} - {formattedEnd}
          </div>
        </div>

        <div className="w-full lg:w-full lg:max-w-none mx-auto flex-1 lg:mb-8 xs:mb-6 xs:text-center lg:text-left ">
          <h1 className="xs:font-popM md:font-popSB text-[#EEE9FF] leading-10 xs:text-4xl xs:text-left sm:text-center lg:text-left lg:text-7xl tracking-wider">
            {roundName ? roundName : "Superwoman Challenge"}
          </h1>
        </div>

        <div className="lg:mb-16 xs:mb-10 ">
          <div className="font-['Poppins-Regular'] tracking-wide leading-5 xs:text-xs xs:font-extralight sm:text-base md:text-lg xs:text-left sm:text-center lg:text-left">
            {shortDescription
              ? shortDescription
              : "Providing you with the Best Fitness Habit Builder specifically for Woman"}
          </div>
        </div>

        <div
          className="grid sm:grid-cols-3 xs:grid-cols-2 gap-x-3 gap-y-5
         lg:mb-16 xs:mb-10"
        >
          <div className="border-l-4 border-[#ffffff80] pl-4 ">
            <div className="text-[#EEE9FF] xs:text-xl lg:text-3xl leading-8 tracking-wider font-['Poppins-Regular'] xs:font-light md:font-semibold  mb-1">
              30000+
            </div>
            <div className="text-[#EEE9FF] font-['Poppins-Regular'] xs:text-[9px] lg:text-sm xs:font-light md:font-medium tracking-wider">
              Women
            </div>
          </div>
          <div className="border-l-4 border-[#ffffff80] pl-4">
            <div className="text-[#EEE9FF] xs:text-xl lg:text-3xl leading-8 tracking-wider font-['Poppins-Regular'] xs:font-light md:font-semibold  mb-1">
              4kg+
            </div>
            <div className="text-[#EEE9FF] font-['Poppins-Regular'] xs:text-[9px] lg:text-sm xs:font-light md:font-medium tracking-wider">
              Average Weightloss
            </div>
          </div>
          <div className="border-l-4 border-[#ffffff80] pl-4">
            <div className="text-[#EEE9FF] xs:text-xl lg:text-3xl leading-8 tracking-wider font-['Poppins-Regular'] xs:font-light md:font-semibold  mb-1">
              80%
            </div>
            <div className="text-[#EEE9FF] font-['Poppins-Regular'] xs:text-[9px] lg:text-sm xs:font-light md:font-medium tracking-wider">
              Regularized Periods
            </div>
          </div>
        </div>

        {isVisible ? (
          <div className="w-full items-center  xs:hidden lg:flex md:relative xs:bottom-0 xs:right-0 xs:transition-opacity xs:opacity-100 xs:backdrop-blur-lg lg:justify-start xs:justify-center xs:h-20 xs:z-40">
            <Link
              passHref
              href={route || "/start"}
              className="md:mr-4 w-full max-w-[275px] bg-[#A8E723]  backdrop-blur-lg rounded-[12px]"
            >
              <p className=" text-center text-[#521D7A] px-14 py-3.5  font-popM text-base">
                Join Challenge
              </p>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default HeroSuperWomenLeft;
