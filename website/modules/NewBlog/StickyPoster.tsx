import Link from "next/link";
import React from "react";
import { stickyData } from "./utils";

const StickyPoster = () => {
  return (
    <div className="sticky left-0 right-0 top-[25vh]  bg-gradient-to-r from-[#D53190] to-[#D43273] py-4 rounded-3xl w-4/5 mx-auto lg:mx-0  mt-16 backdrop-blur-3xl">
      <div className="w-4/5 mx-auto ">
        <p className=" text-lg md:text-xl font-popR lg:text-2xl text-[#F3F3F3]">
          {stickyData.mainTitle}
        </p>
        {stickyData.data.map((i) => {
          return (
            <div className="flex items-center my-6" key={i.imgUrl}>
              <img src={i.imgUrl} alt="" className="w-4 h-4 mr-2" />
              <p className="text-[#F3F3F3] font-popR   text-xs md:text-sm lg:text-base">
                {i.text}
              </p>
            </div>
          );
        })}
      </div>
      <Link href={stickyData.link} target="_blank">
        <div className="bg-white rounded-full cursor-pointer  mx-auto w-4/5">
          <p className="text-sm font-popR font-medium py-2.5 text-center text-[#585858]">
            {stickyData.btnText}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default StickyPoster;
