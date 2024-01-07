import React from "react";
import MentionedByV2 from "./MentionedByV2";
import Link from "next/link";
interface Props {
  onPlansClick: () => void;
  route?: string;
  btnText: string;
  heroImg?: string;
}
const HeroV3Right: React.FC<Props> = ({
  onPlansClick,
  route,
  btnText,
  heroImg,
}) => {
  return (
    <>
      <div className="h-full flex items-end">
        <img
          src={
            heroImg
              ? heroImg
              : "https://ik.imagekit.io/socialboat/tr:w-700,c-maintain_ratio,fo-auto/Frame_1000000812__1__JsZR0m-yZ.png?updatedAt=1689754354606"
          }
          alt=""
          className="w-full h-full lg:h-[90%] self-end object-contain object-bottom"
        />
      </div>
      <div className="absolute left-0 right-0 bottom-0 top-1/2 lg:hidden bg-gradient-to-t from-[#E67AFD] to-[#E67AFD00]" />
      <div className="absolute w-11/12 max-w-md h-full items-center flex flex-col justify-end lg:hidden">
        <div className="cursor-pointer pb-4 w-full">
          <Link href={route || "/start"}>
            <p className="bg-white w-full text-center  backdrop-blur-lg   text-black px-6 py-3.5 rounded-full font-popM text-base">
              {btnText}
            </p>
          </Link>
        </div>
        <div className="cursor-pointer pb-4 w-full">
          <Link href="/plans">
            <p
              onClick={onPlansClick}
              className="bg-black/50 w-full text-center  backdrop-blur-lg  text-white px-6 py-3.5 rounded-full font-popM text-base"
            >
              Our Plans
            </p>
          </Link>
        </div>
        <MentionedByV2 />
      </div>
    </>
  );
};

export default HeroV3Right;
