import { weEventTrack } from "@analytics/webengage/user/userLog";
import MarqueeImage from "@components/MarqueeImage";
import WaveBtn from "@components/WaveBtn";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { useRef } from "react";
const images = [
  "https://ik.imagekit.io/socialboat/tr:w-700,c-maintain_ratio,fo-auto/Frame_1_VHNZ1jZfu.png?updatedAt=1689425902197",
  "https://ik.imagekit.io/socialboat/tr:w-700,c-maintain_ratio,fo-auto/Frame_2_9Y0RYq9Z2.png?updatedAt=1689425905165",
  "https://ik.imagekit.io/socialboat/tr:w-700,c-maintain_ratio,fo-auto/Frame_3__W0POqniw.png?updatedAt=1689425898894",
  "https://ik.imagekit.io/socialboat/tr:w-700,c-maintain_ratio,fo-auto/Frame_4_c0u4LKSXjR.png?updatedAt=1689425910046",
  "https://ik.imagekit.io/socialboat/tr:w-700,c-maintain_ratio,fo-auto/Frame_5_zTVEhvEak.png?updatedAt=1689425909891",
];
const JoinTheArmy = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onCTAClick = () => {
    weEventTrack("leadgen_clickStartJourney", {});
  };
  return (
    <div className="mt-36">
      <h2
        className={clsx(
          "font-pJSSB text-center xs:text-[28px] sm:text-4xl lg:text-5xl",
          "bg-clip-text text-[#DCCBFF]",
          "w-full xs:px-2 sm:px-4 xs:mb-16 sm:mb-24 lg:mb-32 py-2",
          "block opacity-100 xs:text-center sm:text-center"
        )}
      >
        Join The Tribe Today
      </h2>
      <div className="w-screen relative z-0 ">
        <div ref={ref}>
          <div className="absolute -z-10 opacity-10 left-0 right-0 ">
            <MarqueeImage
              images={images}
              direction="left"
              height={"h-[33vh]"}
            />
          </div>
          <div className="max-w-screen-md mx-auto relative z-0 flex items-center h-[33vh] justify-center">
            <div className="">
              <Link
                href={"/start?challenge=true"}
                className="hidden xs:block max-w-sm  mx-auto sm:px-2.5 sm:py-2 cursor-pointer "
              >
                <WaveBtn
                  text="Enter Challenge"
                  textColor="#3E135F"
                  gotoComponent={onCTAClick}
                  color1="#A8E723"
                  textStyleTw="text-[#3E135F] text-lg font-pJSSM "
                  styleContainerTw="max-w-lg mx-auto "
                  svgComp={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={324}
                      height={113}
                      fill="none"
                    >
                      <g className="rippleRectAnimation">
                        <rect
                          width={324}
                          height={113}
                          fill="#A8E723"
                          fillOpacity={0.5}
                          rx={30}
                        />
                        <rect
                          width={304}
                          height={97}
                          x={10}
                          y={8}
                          fill="#A8E723"
                          fillOpacity={0.5}
                          rx={24}
                        />
                      </g>
                      <rect
                        width={284}
                        height={77}
                        x={20}
                        y={18}
                        fill="#A8E723"
                        rx={17}
                      />
                    </svg>
                  }
                />
              </Link>
              {/* <Link href={"/start"}>
          <div
            onClick={onCTAClick}
            className="block cursor-pointer sm:hidden bg-white w-4/5 text-center rounded-full mx-auto"
          >
            <p className="text-black px-10 py-4 text-base font-popM">
              Book FREE consultation
            </p>
          </div>
        </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTheArmy;
