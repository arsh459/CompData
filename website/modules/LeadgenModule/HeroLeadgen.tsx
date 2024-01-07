import { weEventTrack } from "@analytics/webengage/user/userLog";
import MarqueeImage from "@components/MarqueeImage";
import WaveBtn from "@components/WaveBtn";
import { ProvenResultDataV3 } from "@templates/WomenTemplate/utils";
import Link from "next/link";
import React from "react";
const images = [
  "https://ik.imagekit.io/socialboat/tr:w-700,c-maintain_ratio,fo-auto/Frame_1_VHNZ1jZfu.png?updatedAt=1689425902197",
  "https://ik.imagekit.io/socialboat/tr:w-700,c-maintain_ratio,fo-auto/Frame_2_9Y0RYq9Z2.png?updatedAt=1689425905165",
  "https://ik.imagekit.io/socialboat/tr:w-700,c-maintain_ratio,fo-auto/Frame_3__W0POqniw.png?updatedAt=1689425898894",
  "https://ik.imagekit.io/socialboat/tr:w-700,c-maintain_ratio,fo-auto/Frame_4_c0u4LKSXjR.png?updatedAt=1689425910046",
  "https://ik.imagekit.io/socialboat/tr:w-700,c-maintain_ratio,fo-auto/Frame_5_zTVEhvEak.png?updatedAt=1689425909891",
];

interface Props {
  subtitle: string;
  strongTitle: string;
  title: string;
  route: string;
}

const HeroLeadgen: React.FC<Props> = ({
  title,
  route,
  strongTitle,
  subtitle,
}) => {
  const onCTAClick = () => {
    weEventTrack("leadgen_clickStartJourney", {});
  };
  return (
    <>
      <div className="absolute -z-10 opacity-10 left-0 right-0 pt-16 ">
        <MarqueeImage
          height="xs:h-[60vh] iphoneX:h-[58vh] sm:h-[66vh]"
          images={images}
          direction="left"
        />
      </div>
      {/* <div className="absolute -z-10 opacity-10 left-0 right-0 top-1/3 h-1/3 ">
        <MarqueeImage images={images.reverse()} direction="right" />
      </div> */}

      <div className="max-w-screen-md mx-auto pt-28 relative z-0">
        <h1 className="text-3xl sm:text-4xl text-white/80 lg:text-5xl w-4/5 xs:w-[90%] iphoneX:w-[85%] sm:w-4/5 mx-auto  md:w-full  sm:text-center  font-popM">
          <span className="text-white font-popSB">{strongTitle}</span>
          {title}
        </h1>
        <div className="sm:pt-7 pb-10 xs:pt-2.5">
          <h2 className="text-sm sm:text-xl font-popR   text-white/80 w-4/5 xs:w-[90%] iphoneX:w-[85%] sm:w-4/5 mx-auto  md:w-full  sm:text-center">
            {subtitle}
          </h2>
        </div>
        {/* bg-white/20 border border-white/50 */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 w-11/12 xs:w-[90%] iphoneX:w-[85%] sm:w-[90%] md:w-[80%] lg:w-full mx-auto gap-y-8 lg:gap-x-4  py-6 lg:px-4 iphoneX:bg-white/20  iphoneX:border-white/50 iphoneX:border iphoneX:rounded-2xl iphoneX:backdrop-blur-[14px]"
          // style={{ backdropFilter: "blur(14px)" }}
        >
          {ProvenResultDataV3.map((item, index) => {
            return (
              <div
                key={`Proven Result text ${index}`}
                className="w-full flex flex-1 justify-center items-center  sm:px-0"
              >
                <div className="w-36 flex lg:justify-center items-center  xs:justify-between ">
                  <div>
                    <img
                      src={item.media}
                      alt={`Proven Result icon ${index}`}
                      className="w-7 aspect-[1/1] object-contain mr-3"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p
                      className=" text-xs sm:text-sm text-white  font-popR whitespace-pre-wrap"
                      style={{ lineHeight: "16px" }}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-10" />
        <Link
          href={route}
          className="hidden   sm:block max-w-sm  mx-auto sm:px-2.5 sm:py-2 cursor-pointer "
        >
          <WaveBtn
            text="Book FREE Consultation"
            textColor="#000000"
            gotoComponent={onCTAClick}
            color1="#ffffff"
            textStyleTw="text-black text-base font-popM "
            styleContainerTw="max-w-sm  mx-auto "
          />
        </Link>
        <Link href={route}>
          <div
            onClick={onCTAClick}
            className="block cursor-pointer sm:hidden bg-white w-4/5 text-center rounded-full mx-auto"
          >
            <p className="text-black px-10 py-4 text-base font-popM">
              Book FREE consultation
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default HeroLeadgen;
