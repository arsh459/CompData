import clsx from "clsx";
import Link from "next/link";
import React from "react";
interface BannerProps {
  heading?: string;
  btnText?: string;
  btnStyleTw?: string;
}
const Banner: React.FC<BannerProps> = ({ btnText, heading, btnStyleTw }) => {
  return (
    <div className={clsx(" w-full", btnStyleTw ? btnStyleTw : "pt-32")}>
      <div className="w-full  md:p-4 max-w-6xl flex justify-center  mx-auto oh">
        <div className="w-[90%] mx-auto lg:mx-0  md:w-full max-w-5xl flex flex-col md:flex-row justify-between items-center p-6 gap-4  md:p-12 rounded-3xl bg-gradient-to-br from-[#D53190] to-[#D43273]">
          <p className="font-popR text-lg w-full md:w-2/3 text-[#F3F3F3] md:text-2xl">
            {heading}
          </p>
          <Link
            // href={"https://api.whatsapp.com/send?phone=919958730020&text=Hi!"}
            href="/start?origin=blog"
            target="_blank"
            className="bg-white  cursor-pointer rounded-full w-full flex-1 flex items-center justify-center md:w-1/5 lg:w-1/4 "
          >
            <>
              <p className="text-xs md:text-sm lg:text-base font-popR  py-2.5 text-center text-[#585858]">
                {btnText}
              </p>
            </>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
