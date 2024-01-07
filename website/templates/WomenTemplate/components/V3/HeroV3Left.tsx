import Link from "next/link";
import React from "react";
import Typewriter from "typewriter-effect";
import MentionedByV2 from "./MentionedByV2";

const words = ["PCOS", "Thyroid"];

interface Props {
  route?: string;
  btnText: string;
}

const HeroV3Left: React.FC<Props> = ({ route, btnText }) => {
  return (
    <>
      <div className="w-full pt-5">
        <div className="w-11/12 lg:w-full max-w-md lg:max-w-none mx-auto flex-1">
          <h1 className="font-popSB text-[#EEE9FF] text-4xl iphoneX:text-5xl lg:text-7xl">
            <span className="">#1 Menstrual Wellness AI for </span>
            <span className="relative z-0">
              <span aria-hidden={true} className="opacity-0">
                Thyroid
              </span>
              <span className="absolute left-0 top-0 bottom-0 right-0 z-10 flex items-center text-[#B3FF87]">
                <Typewriter
                  options={{
                    strings: words,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </span>
          </h1>
        </div>

        <div className="w-full  pt-12 items-center hidden lg:flex">
          <Link
            passHref
            href={route || "/start"}
            className="md:mr-4 w-full  max-w-[200px] bg-white  backdrop-blur-lg  rounded-full"
          >
            <p className=" text-center text-black px-6 py-3.5  font-popM text-base">
              {btnText}
            </p>
          </Link>
          <Link
            passHref
            href={`/plans`}
            className="mr-4 w-full  max-w-[200px] bg-black/50 font-popL backdrop-blur-lg  rounded-full"
          >
            <p className=" text-center text-white px-6 py-3.5  font-popM text-base">
              Our Plans
            </p>
          </Link>
        </div>
      </div>

      <div className="w-full hidden lg:block">
        <MentionedByV2 />
      </div>
    </>
  );
};

export default HeroV3Left;
