import { liveRedCircle } from "@constants/icons/iconURLs";
import React from "react";
interface Props {
  taskName?: string;
  taskFp?: number;
  topText?: string;
}
const UnlockedOverlay: React.FC<Props> = ({ taskFp, taskName, topText }) => {
  return (
    <>
      <div className="text-white iphoneX:text-xl italic h-1/4 absolute rounded-lg w-full top-0 right-0 left-0 p-2  bg-gradient-to-b from-black to-transparent">
        <div className="flex  ">
          <img src={liveRedCircle} alt="liveRedCircle" />
          <span className="flex-1 pl-2 line-clamp-1">{topText}</span>
        </div>
      </div>
      <div className="text-white  iphoneX:text-xl italic  h-1/4 items-center  absolute p-2 bottom-0 right-0 left-0 rounded-lg bg-gradient-to-t from-black to-transparent">
        <div className="flex justify-between  items-end h-full ">
          <p className="line-clamp-1">{taskName}</p>
          <p>{taskFp}FP</p>
        </div>
      </div>
    </>
  );
};

export default UnlockedOverlay;
