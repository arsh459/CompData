import React from "react";
import { HelpYouWinData } from "./HelpYouWin";
interface Props {
  data: HelpYouWinData;
}
const CardForHelpYouIn: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-[#000000]/25 my-2 w-full h-full rounded-2xl flex justify-center items-center flex-col gap-y-3 lg:gap-7">
      <img src={data?.img} alt="" className="w-9 h-9 md:w-12 md:h-12 " />
      <p
        className="text-center text-white text-opacity-90 text-sm md:text-base fopR pt-1 px-2 md:px-0 w-4/5  "
        style={{ lineHeight: 1 }}
      >
        {data?.text}
      </p>
    </div>
  );
};

export default CardForHelpYouIn;
