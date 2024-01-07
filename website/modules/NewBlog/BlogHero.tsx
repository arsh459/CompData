import Link from "next/link";
import React from "react";

const BlogHero = () => {
  return (
    <>
      <div className="absolute inset-0">
        <img
          src="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/Rectangle_427_eLv_04VEW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675149803111"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <InsideHero />
    </>
  );
};

export default BlogHero;

const InsideHero = () => {
  return (
    <div className="w-full absolute  inset-0 top-1/4  max-w-5xl mx-auto lg:px-4  flex justify-center max-h-fit lg:justify-start  ">
      <div className="p-6 max-w-xs lg:max-w-lg bg-[#0000001A] backdrop-blur-3xl rounded-3xl w-[90%]">
        <h1 className="font-popR text-2xl text-[#F3F3F3]">SocialBoat Blog</h1>
        <p className="text-sm font-light text-[#EAEAEA85]">
          Health, fitness and diet tips on weight loss, PCOD treatment, fixing
          acne and hairloss by experts
        </p>
        <div className="mt-5 text-white cursor-pointer text-center bg-gradient-to-br from-[#FF33A1CC] to-[#FF337CCC] max-w-fit lg:max-w-[133px] px-6 py-1.5   rounded-3xl">
          <Link href={`/interests`} className="">
            <p>Join</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
